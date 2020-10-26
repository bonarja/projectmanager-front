import { Component, ElementRef, OnInit } from '@angular/core';
import { Router } from '@angular/router';

interface Menu {
    name: string;
    path: string;
}

@Component({
    selector: 'app-dashboard',
    templateUrl: './dashboard.component.html',
    styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
    activeMenu: Menu = null;
    animate: Menu = null;
    menu: Array<Menu> = [
        { name: 'Home', path: 'home' },
        { name: 'Proyectos', path: 'projects' },
        { name: 'Tareas', path: 'tasks' },
    ];
    constructor(private router: Router, private me: ElementRef) {}

    ngOnInit(): void {
        this.activeMenu = this.currentMenu;
    }
    navigate(menu: Menu) {
        this.activeMenu = menu;
        this.animate = menu;
        // const el = this.me.nativeElement.find('.menu .item')[
        //     this.menu.indexOf(menu)
        // ];
        // if (el) {
        //     el.removeClass('zoomIn');
        //     el.css({ animationDelay: 0 });
        //     setTimeout(() => el.in('bounceIn', 'flex', 200), 20);
        // }
        this.router.navigate([`/dashboard/${menu.path}`]);
    }
    get currentMenu(): Menu {
        var route = this.menu.filter((x) =>
            this.router.url.includes(`/dashboard/${x.path}`)
        );
        if (route.length) return route.pop();
        return null;
    }
}
