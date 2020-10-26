import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app.routing';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { ColorSliderModule } from 'ngx-color/slider';
import { SharedComponentsModule } from './components-shared/shared.components.module';

@NgModule({
    declarations: [AppComponent],
    imports: [
        BrowserModule,
        AppRoutingModule,
        HttpClientModule,
        ColorSliderModule,
        SharedComponentsModule,
    ],
    bootstrap: [AppComponent],
})
export class AppModule {}
