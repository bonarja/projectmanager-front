import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login.component';
import { FormComponent } from './components/form/form.component';
import { LoginRoutingModule } from './login.routing';
import { FormRegisterComponent } from './components/form-register/form-register.component';
import { SharedComponentsModule } from '../components-shared/shared.components.module';
import { LoaderComponent } from './components/loader/loader.component';

@NgModule({
    declarations: [
        LoginComponent,
        FormComponent,
        FormRegisterComponent,
        LoaderComponent,
    ],
    imports: [CommonModule, LoginRoutingModule, SharedComponentsModule],
    bootstrap: [LoginComponent],
})
export class LoginModule {}
