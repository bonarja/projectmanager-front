import { Component, Input, OnInit } from '@angular/core';
import { Project } from 'src/app/interfaces/project.interface';
import { ProjectState } from '../projects.state.service';

@Component({
    selector: 'CardProject',
    templateUrl: './card-project.component.html',
    styleUrls: ['./card-project.component.scss'],
})
export class CardProjectComponent implements OnInit {
    @Input() project: Project;
    @Input() onclose: Function;
    isOpened: boolean = false;
    showTaskCreate: boolean = false;
    constructor(private projectState: ProjectState) {
        this.projectState.subscribe(
            (data) => (this.showTaskCreate = data.actionNewTask)
        );
    }
    ngOnInit(): void {}
    open() {
        this.isOpened = true;
    }
    close() {
        this.isOpened = false;
        this.projectState.state.actionNewTask = false;
        this.onclose();
    }
    getStyleOpened(name: string, act = null) {
        if (!this.isOpened) return {};

        return {
            description: {
                height: 'unset',
                minHeight: '150px',
            },
            cardProject: {
                height: '100%',
                cursor: 'default',
            },
            cardContent: {
                display: 'grid',
                gridTemplateRows: 'min-content min-content auto',
            },
        }[name];
    }
    // getStyleTaskOpen(name: string, act = null) {
    //     if (!this.showTaskCreate) return {};
    //     if (!this.isOpened) return {};
    //     return {
    //         showProjectInfoAndTask: {
    //             display: 'block',
    //         },
    //     }[name];
    // }
}
