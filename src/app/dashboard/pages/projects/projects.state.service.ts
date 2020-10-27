// BONARJA STATES
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Project } from 'src/app/interfaces/project.interface';
import { Task } from 'src/app/interfaces/task.interface';

export class ProjectStateModel {
    actionNewTask: boolean = false;
    taskList: Array<Task> = null;
    projectList: Array<Project> = null;
    projectOpened: Project = null;
}

interface ICallback {
    (arg0: ProjectStateModel): void;
}

@Injectable({
    providedIn: 'root',
})
export class ProjectState {
    private SsoSubject = new BehaviorSubject<ProjectStateModel>(
        new ProjectStateModel()
    );
    private internalState = this.SsoSubject.asObservable();
    public state: ProjectStateModel;

    constructor() {
        this.subscribe((data) => {
            this.state = data;

            Object.entries(this.state).forEach((x) => {
                this.watch(
                    this.state,
                    x[0],
                    (varName: string, varValue: any) => {
                        this.SsoSubject.next(this.state);
                    }
                );
            });
        });
    }

    private watch(context: any, varName: string, set: Function) {
        var value = context[varName];
        Object.defineProperty(context, varName, {
            set: function (v) {
                value = v;
                set && set(varName, value);
            },
            get: function () {
                return value;
            },
        });
    }

    subscribe(callback: ICallback) {
        this.internalState.subscribe((data) => callback(data));
    }

    setState(record: ProjectStateModel) {
        this.SsoSubject.next(record);
    }
}
