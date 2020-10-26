import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { FormRegister } from '../interfaces/register.form.interface';
import { Request } from './request.service';

@Injectable({
    providedIn: 'root',
})
export class ApiService {
    isValidToken: boolean = true; //FIXME: remove true
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
        this.request.api('login', form).post();
    getProjects = () => this.request.api('projects').post();
    projectCreate = (form: any) =>
        this.request.api('project/create', form).post();
}
