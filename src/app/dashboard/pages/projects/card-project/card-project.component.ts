import { Component, Input, OnInit } from '@angular/core';
import { Project } from 'src/app/interfaces/project.interface';

@Component({
    selector: 'CardProject',
    templateUrl: './card-project.component.html',
    styleUrls: ['./card-project.component.scss'],
})
export class CardProjectComponent implements OnInit {
    @Input() project: Project;
    @Input() onclose: Function;
    isOpened: boolean = false;
    constructor() {}
    ngOnInit(): void {}
    open() {
        this.isOpened = true;
    }
    close() {
        this.isOpened = false;
        this.onclose();
    }
    getStyleOpened(name: string, act = null) {
        if (!this.isOpened) return {};

        const styles = {
            description: {
                height: 'unset',
                minHeight: '150px',
            },
            cardProject: {
                height: '100%',
            },
            cardContent: {
                display: 'grid',
                gridTemplateRows: 'min-content min-content auto',
            },
        };
        return styles[name];
    }
}
