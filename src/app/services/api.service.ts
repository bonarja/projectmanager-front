import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { LoginResponse } from '../interfaces/loginResponse.interface';
import { FormRegister } from '../interfaces/register.form.interface';
import { Request } from './request.service';

@Injectable({
    providedIn: 'root',
})
export class ApiService {
    isValidToken: boolean;
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
}
