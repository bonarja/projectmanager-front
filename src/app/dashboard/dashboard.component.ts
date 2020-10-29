import { Component, ElementRef, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from '../services/api.service';

interface Menu {
    name: string;
    path: string;
}

@Component({
    selector: 'app-dashboard',
    templateUrl: './dashboard.component.html',
    styleUrls: ['./dashboard.component.scss'],
    host: { class: 'cover relative' },
})
export class DashboardComponent implements OnInit {
    activeMenu: Menu = null;
    animate: Menu = null;
    menu: Array<Menu> = [
        { name: 'Home', path: 'home' },
        { name: 'Proyectos', path: 'projects' },
        { name: 'Tareas', path: 'tasks' },
    ];
    constructor(private router: Router, private api: ApiService) {}

    ngOnInit(): void {
        this.activeMenu = this.currentMenu;
    }
    navigate(menu: Menu) {
        this.activeMenu = menu;
        this.animate = menu;
        this.router.navigate([`/dashboard/${menu.path}`]);
    }
    get currentMenu(): Menu {
        var route = this.menu.filter((x) =>
            this.router.url.includes(`/dashboard/${x.path}`)
        );
        if (route.length) return route.pop();
        return null;
    }
    logout() {
        localStorage.clear();
        this.api.isValidToken = false;
        this.router.navigate(['/login']);
    }
}
