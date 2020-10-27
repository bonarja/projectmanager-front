import { Component, Input, OnInit } from '@angular/core';
import { GlobalInterface } from 'src/app/interfaces/global.interface';
import { Task } from 'src/app/interfaces/task.interface';
import { ApiService } from 'src/app/services/api.service';
import { ProjectState } from '../projects.state.service';

declare const GLOBAL: GlobalInterface;

interface TaskDto {
    name: string;
    description: string;
    finish: boolean;
    project: number;
}

@Component({
    selector: 'TaskCreate',
    templateUrl: './task-create.component.html',
    styleUrls: ['./task-create.component.scss'],
})
export class TaskCreateComponent implements OnInit {
    form: TaskDto = {} as TaskDto;
    @Input() onNewTask: Function;
    constructor(private projectState: ProjectState, private api: ApiService) {}
    input = (val: any, id?: string) => {
        this.form[id] = val;
    };
    ngOnInit(): void {}
    back() {
        this.projectState.state.actionNewTask = false;
    }
    create() {
        GLOBAL.loading(true, 'Creando Tarea');
        this.form.project = this.projectState.state.projectOpened.id;
        this.api
            .taskCreate(this.form)
            .then((task: Task) => {
                // agregar nueva tarea a la lista de tareas de el proyecto o recargar tareas
                var estoyPensando = '🤔';
                if (!task) return;
                console.log(task);
                // insertar
                this.projectState.state.taskList = [task].concat(
                    this.projectState.state.taskList
                );
                // agregar una tarea mas al contador en los proyectos
                const projects = this.projectState.state.projectList.map(
                    (project) => {
                        if ((project.id = this.form.project)) {
                            project.taskCount++;
                        }
                        return project;
                    }
                );
                this.projectState.state.projectList = projects;

                GLOBAL.loading(false, 'Tarea Creada');
                this.projectState.state.actionNewTask = false;
            })
            .catch(() => {
                GLOBAL.loading(false, 'Error');
            });
    }
}
