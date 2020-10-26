import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login.component';
import { LoaderComponent } from './components/loader/loader.component';
import { FormComponent } from './components/form/form.component';
import { LoginRoutingModule } from './login.routing';
import { FormRegisterComponent } from './components/form-register/form-register.component';

@NgModule({
    declarations: [
        LoginComponent,
        LoaderComponent,
        FormComponent,
        FormRegisterComponent,
    ],
    imports: [CommonModule, LoginRoutingModule],
    bootstrap: [LoginComponent],
})
export class LoginModule {}
