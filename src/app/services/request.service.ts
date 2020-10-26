import { Injectable } from '@angular/core';
import { timeout } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { GlobalInterface } from '../interfaces/global.interface';
import { Storage } from './storage.service';

declare const GLOBAL: GlobalInterface;

type OptionsCallApi =
    | string
    | {
          path?: string;
          data?: string;
          timeout?: number;
          showErrorAlert?: boolean;
      };

@Injectable({
    providedIn: 'root',
})
export class Request {
    path: string;
    timeout_v: number;
    constructor(private http: HttpClient, private storage: Storage) {
        this.path = environment.api;
        this.timeout_v = 10000;
    }
    api(path: OptionsCallApi, ...rest: Array<any>) {
        let data: any, call: string;
        let timeout_v: number = this.timeout_v;
        let showErrorAlert: boolean = true;
        if (typeof path === 'object') {
            path.data && (data = path.data);
            path.timeout && (timeout_v = path.timeout);
            showErrorAlert = path.showErrorAlert ? true : false;
            path.path && (path = path.path);
        } else {
            path =
                (this.path.slice(-1) === '/' ? this.path : this.path + '/') +
                path;
        }
        rest.forEach((x) => {
            typeof x === 'object' ? (data = x) : (call = x);
        });
        // agregar token al data request si existe
        const token = this.storage.get('access_token');
        !data && (data = {});

        const header = {
            headers: new HttpHeaders().set(
                'Authorization',
                `Bearer ${token || ''}`
            ),
        };
        // end
        const request = (type_request: string) =>
            new Promise((done, reject) => {
                this.http[type_request](path, data, header)
                    .pipe(timeout(timeout_v))
                    .subscribe(
                        (result: any) => {
                            if (result === null) {
                                return reject('Undefined response');
                            }
                            if (
                                typeof result === 'object' &&
                                (result.error || result.errors)
                            ) {
                                if (result.error === 'NO_ACCESS') {
                                    showErrorAlert &&
                                        GLOBAL.alert('Sin Acceso');
                                    return;
                                }
                                if (result.error === 'LOGOUT') {
                                    // this.ssoEventListener.emit('logout');
                                    //FIXME: accion para desconectar
                                    return;
                                }
                                if (
                                    result.errors &&
                                    typeof result.errors === 'object' &&
                                    result.errors.errors
                                ) {
                                    result.error = JSON.stringify(
                                        result.errors.errors
                                    );
                                }
                                showErrorAlert && GLOBAL.alert(result.error);
                                return reject(result.error);
                            } else {
                                done(result);
                            }
                        },
                        (error: any) => reject(error)
                    );
            });

        const REQUESTS = (type: 'get' | 'post' | 'put' | 'path') =>
            new Promise((done, reject) => {
                request(type)
                    .then((r) => done(r))
                    .catch((err) => {
                        showErrorAlert && GLOBAL.alert(err);
                        console.log(err);
                        reject(err);
                    });
            });

        return {
            post: () => REQUESTS('post'),
            get: () => REQUESTS('get'),
            put: () => REQUESTS('put'),
            path: () => REQUESTS('path'),
        };
    }
}
