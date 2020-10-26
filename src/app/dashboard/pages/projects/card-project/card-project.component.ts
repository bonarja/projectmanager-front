import { Component, Input, OnInit } from '@angular/core';
import { Project } from 'src/app/interfaces/project.interface';

@Component({
    selector: 'CardProject',
    templateUrl: './card-project.component.html',
    styleUrls: ['./card-project.component.scss'],
})
export class CardProjectComponent implements OnInit {
    @Input() project: Project;
    constructor() {}

    ngOnInit(): void {}
}
