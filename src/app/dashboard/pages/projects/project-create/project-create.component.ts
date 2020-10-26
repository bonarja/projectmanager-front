import { Component, Input, OnInit } from '@angular/core';
import { GlobalInterface } from 'src/app/interfaces/global.interface';
import { ApiService } from 'src/app/services/api.service';

declare const GLOBAL: GlobalInterface;

interface Form {
    name: string;
    description: string;
    color: string;
}

@Component({
    selector: 'ProjectCreate',
    templateUrl: './project-create.component.html',
    styleUrls: ['./project-create.component.scss'],
})
export class ProjectCreateComponent implements OnInit {
    @Input() onclose: Function;
    initialColor: string = 'coral';
    dataForm: Form = {
        name: null,
        description: null,
        color: null,
    };
    constructor(private api: ApiService) {}
    changeInput = (val: any, id?: string) => {
        if (val.color && val.color.hex)
            return (this.dataForm.color = val.color.hex);
        this.dataForm[id] = val;
    };
    ngOnInit(): void {}
    close() {
        this.onclose();
    }
    createProject() {
        GLOBAL.loading(true, 'Creando Proyecto');

        this.api
            .projectCreate(this.dataForm)
            .then((p) => {
                GLOBAL.alert('Se ha creado el proyecto de manera correcta');
                this.onclose(true);
            })
            .finally(() => GLOBAL.loading(false));
        1;
    }
}
