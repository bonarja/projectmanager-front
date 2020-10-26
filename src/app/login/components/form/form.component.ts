import { Component, ElementRef, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginResponse } from 'src/app/interfaces/loginResponse.interface';
import { SlidePageInterface } from 'src/app/interfaces/slidepage.interface';
import { ApiService } from 'src/app/services/api.service';
import { Storage } from 'src/app/services/storage.service';
import { Utility } from 'src/app/services/utility.service';

interface Form {
    username: string;
    pass: string;
}

@Component({
    selector: 'LoginForm',
    templateUrl: './form.component.html',
    styleUrls: ['./form.component.scss'],
})
export class FormComponent implements OnInit {
    @Input() title: string = 'Bienvenido';
    @Input() sp: SlidePageInterface;
    constructor(
        private me: ElementRef,
        private api: ApiService,
        private utility: Utility,
        private storage: Storage,
        private router: Router
    ) {}
    ngOnInit(): void {}
    login() {
        const form = this.utility.getForm(this.me) as Form;

        console.log(form);

        this.sp.go(2); // show loading
        this.api
            .login(form)
            .then((result: LoginResponse) => {
                this.storage.set('access_token', result.token);
                this.storage.set('name', result.name);
                this.router.navigate(['/dashboard']);
            })
            .finally(() => {
                this.sp.go(0); // close loading
            });
    }
    register() {
        this.sp.go(1);
    }
}
