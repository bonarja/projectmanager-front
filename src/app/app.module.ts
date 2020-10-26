import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app.routing';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { ColorSliderModule } from 'ngx-color/slider';
import { ColorSketchModule } from 'ngx-color/sketch';

@NgModule({
    declarations: [AppComponent],
    imports: [
        BrowserModule,
        AppRoutingModule,
        HttpClientModule,
        ColorSliderModule,
        ColorSketchModule,
    ],
    bootstrap: [AppComponent],
})
export class AppModule {}
