import { Component, ElementRef, Input, OnInit } from '@angular/core';
import { GlobalInterface } from 'src/app/interfaces/global.interface';
import { FormRegister } from 'src/app/interfaces/register.form.interface';
import { SlidePageInterface } from 'src/app/interfaces/slidepage.interface';
import { ApiService } from 'src/app/services/api.service';
import { Utility } from 'src/app/services/utility.service';

declare const GLOBAL: GlobalInterface;

@Component({
    selector: 'FormRegister',
    templateUrl: './form-register.component.html',
    styleUrls: ['./form-register.component.scss'],
})
export class FormRegisterComponent implements OnInit {
    @Input() title: string = 'Registrar';
    @Input() sp: SlidePageInterface;
    constructor(
        private me: ElementRef,
        private api: ApiService,
        private utility: Utility
    ) {}
    register() {
        const form = this.utility.getForm(this.me) as FormRegister;

        if (form.pass !== form.pass2) {
            return GLOBAL.alert('Las contraseñas no coinciden');
        }

        delete form.pass2;
        this.sp.go(2); // show loading
        this.api
            .register(form)
            .then((user) => {
                this.sp.go(0); // go to home login page
                GLOBAL.alert('Se ha registrado correctamente');
            })
            .catch(() => this.sp.go(1) /**go to register page */);
    }
    cancelar() {
        this.sp.go(0); // show loading
    }
    ngOnInit(): void {}
}
