import { Component, OnInit } from '@angular/core';
import { Project } from 'src/app/interfaces/project.interface';
import { ApiService } from 'src/app/services/api.service';

@Component({
    selector: 'app-projects',
    templateUrl: './projects.component.html',
    styleUrls: ['./projects.component.scss'],
})
export class ProjectsComponent implements OnInit {
    showCreateProject: boolean = false;
    projects: Array<Project>;
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
    oncloseProjectCreate = (reload: Boolean = false) => {
        if (reload) {
            this.load();
        }
        this.showCreateProject = false;
    };
}
