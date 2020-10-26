import { Component, Input, OnInit } from '@angular/core';

@Component({
    selector: 'Loader',
    templateUrl: './loader.component.html',
    styleUrls: ['./loader.component.scss'],
})
export class LoaderComponent implements OnInit {
    @Input() color: string = 'coral';
    constructor() {}

    ngOnInit(): void {}
}
