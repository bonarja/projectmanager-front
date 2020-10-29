import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { GlobalInterface } from '../interfaces/global.interface';
import { LoginResponse } from '../interfaces/loginResponse.interface';
import { FormRegister } from '../interfaces/register.form.interface';
import { Request } from './request.service';

declare const GLOBAL: GlobalInterface;

@Injectable({
    providedIn: 'root',
})
export class ApiService {
    isValidToken: boolean = false;
    constructor(private request: Request) {}

    auth = () =>
        this.request
            .api({
                path: `${environment.api}/auth`,
                showErrorAlert: false,
            })
            .post();
    register = (form: FormRegister) => this.request.api('user', form).post();
    login = (form: { username: string; pass: string }) =>
        new Promise((resolve, reject) =>
            this.request
                .api({
                    path: `${environment.api}/login`,
                    data: form,
                    showErrorAlert: false,
                })
                .post()
                .then((result: LoginResponse) => {
                    resolve(result);
                })
                .catch((err) => {
                    GLOBAL.alert(err, () => {
                        localStorage.clear();
                        reject();
                    });
                })
        );
    getProjects = () => this.request.api('projects').post();
    projectCreate = (form: any) =>
        this.request.api('project/create', form).post();
    getTasks = (projectId: number) =>
        this.request.api('tasks', { project: projectId }).post();
    taskCreate = (form: any) => this.request.api('task/create', form).post();
}
