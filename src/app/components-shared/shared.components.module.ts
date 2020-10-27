import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { LoadingComponent } from './loading/loading.component';
import { ToggleComponent } from './toggle/toggle.component';

@NgModule({
    declarations: [LoadingComponent, ToggleComponent],
    imports: [CommonModule],
    exports: [LoadingComponent, ToggleComponent],
})
export class SharedComponentsModule {}
