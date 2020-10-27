import { Component, Input, OnInit } from '@angular/core';

@Component({
    selector: 'Loading',
    templateUrl: './loading.component.html',
    styleUrls: ['./loading.component.scss'],
})
export class LoadingComponent implements OnInit {
    @Input() wrap: boolean = true;
    @Input() msg: string;
    constructor() {}

    ngOnInit(): void {}
}
