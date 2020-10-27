import { Component, Input, OnInit } from '@angular/core';
import { Project } from 'src/app/interfaces/project.interface';
import { Task } from 'src/app/interfaces/task.interface';
import { ApiService } from 'src/app/services/api.service';

@Component({
    selector: 'ProjectTasks',
    templateUrl: './project-tasks.component.html',
    styleUrls: ['./project-tasks.component.scss'],
})
export class ProjectTasksComponent implements OnInit {
    @Input() project: Project;
    tasks: Array<Task> = null;
    constructor(private api: ApiService) {}

    ngOnInit(): void {
        this.load();
    }
    load() {
        this.tasks = null;
        this.api.getTasks(this.project.id).then((tasks: Array<Task>) => {
            this.tasks = tasks.reverse();
        });
    }
    getColor(finish: boolean) {
        return finish
            ? {
                  backgroundColor: '#6b76cb',
              }
            : {
                  backgroundColor: '#f36031',
              };
    }
}
