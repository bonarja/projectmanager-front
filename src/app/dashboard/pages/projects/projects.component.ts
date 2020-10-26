import { Component, OnInit } from '@angular/core';
import { Project } from 'src/app/interfaces/project.interface';
import { ApiService } from 'src/app/services/api.service';
import { CardProjectComponent } from './card-project/card-project.component';

@Component({
    selector: 'app-projects',
    templateUrl: './projects.component.html',
    styleUrls: ['./projects.component.scss'],
})
export class ProjectsComponent implements OnInit {
    showCreateProject: boolean = false;
    projects: Array<Project>;
    cssToOpenCard: any = null;
    projectOpened: Project = null;
    inAnimation: boolean = false;
    constructor(private api: ApiService) {}

    ngOnInit(): void {
        this.load();
    }
    load() {
        this.projects = [];
        this.api.getProjects().then((projects: any) => {
            this.projects = projects;
        });
    }
    getStyleProject(index: number, project: Project, act?: any) {
        if (project === this.projectOpened) return this.cssToOpenCard;
        return {
            animationDelay: 50 * (index + 1) + 'ms',
        };
    }
    // cssToOpenCard({
    //     animationDelay: 50 * Number(index) + 'ms',
    // });
    // cssToOpenCard
    //     ? { animationDelay: 50 * Number(index) + 'ms' }
    //     : cssToOpenCard;

    oncloseProjectCreate = (reload: Boolean = false) => {
        if (reload) {
            this.load();
        }
        this.showCreateProject = false;
    };
    openProject(
        project: Project,
        el: HTMLElement,
        cardProject: CardProjectComponent
    ) {
        if (this.projectOpened === project || this.inAnimation) return;

        this.projectOpened = project;
        const { left, top } = el.getBoundingClientRect();
        this.cssToOpenCard = {
            position: 'fixed',
            left: `${left}px`,
            top: `${top}px`,
            width: `${el.offsetWidth}px`,
            height: `${el.offsetHeight}px`,
        };
        cardProject.open();
    }
    closeProject = () => {
        this.inAnimation = true;
        setTimeout(() => (this.inAnimation = false), 400);
        console.log('Entra');
        this.projectOpened = null;
        this.cssToOpenCard = null;
    };
}
