import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import { ApiService } from '../services/api.service';
import { Storage } from '../services/storage.service';

@Injectable()
export class AuthGuard implements CanActivate {
    constructor(
        private router: Router,
        private storage: Storage,
        private api: ApiService
    ) {}

    canActivate() {
        if (this.isLogged()) return true;
        this.router.navigate(['/login']);
        return false;
    }
    isLogged = () => this.storage.get('access_token') && this.api.isValidToken;
}
