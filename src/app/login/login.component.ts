import { Component, ElementRef, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginResponse } from '../interfaces/loginResponse.interface';
import { SlidePageInterface } from '../interfaces/slidepage.interface';
import { ApiService } from '../services/api.service';
import { Storage } from '../services/storage.service';

declare const SLIDEPAGE: any;

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
    sp: SlidePageInterface;
    user: LoginResponse;
    loading: boolean = true;
    constructor(
        private me: ElementRef,
        private api: ApiService,
        private storage: Storage,
        private router: Router
    ) {}

    ngOnInit(): void {
        // LOADING
        this.sp = new SLIDEPAGE({
            el: this.me.nativeElement,
            repeat: false, // default: false
            realNumber: false, // default: false
            direction: 'x', // default: x
            display: 'flex', // default: block
            transition: 300, // default: 250,
            pages: '.sp_page', // default sp_page
            onChange: ({ index }) => {
                // {current, previous, index}
                // this.setAtive(index);
            },
        });
        this.verify();
    }
    finishLoad = () => {
        if (!this.user) {
            this.loading = false;
        }
        this.api.isValidToken = true;
        this.storage.set('name', this.user.name);
        this.router.navigate(['/dashboard']);
    };
    async verify() {
        var finishIntro: boolean = false;
        var callBackOnFinish: Function = null;
        setTimeout(() => {
            finishIntro = true;

            callBackOnFinish && callBackOnFinish();
        }, 1200 + 400 + 400);
        try {
            this.user = (await this.api.auth()) as LoginResponse;
        } catch (error) {}

        if (!finishIntro) {
            callBackOnFinish = this.finishLoad;
        } else {
            this.finishLoad();
        }
    }
}
