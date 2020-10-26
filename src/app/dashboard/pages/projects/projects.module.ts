import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProjectsComponent } from './projects.component';
import { ProjectsRoutingModule } from './projects.routing';
import { CardProjectComponent } from './card-project/card-project.component';
import { ProjectCreateComponent } from './project-create/project-create.component';
import { CustomInputComponent } from 'src/app/components/custom-input/custom-input.component';
import { FormsModule } from '@angular/forms';
import { ColorSliderModule } from 'ngx-color/slider';

@NgModule({
    declarations: [
        ProjectsComponent,
        CardProjectComponent,
        ProjectCreateComponent,
        CustomInputComponent,
    ],
    imports: [
        CommonModule,
        ProjectsRoutingModule,
        FormsModule,
        ColorSliderModule,
    ],
    bootstrap: [ProjectsComponent],
})
export class ProjectsModule {}
