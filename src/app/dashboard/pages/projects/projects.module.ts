import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProjectsComponent } from './projects.component';
import { ProjectsRoutingModule } from './projects.routing';
import { CardProjectComponent } from './card-project/card-project.component';
import { ProjectCreateComponent } from './project-create/project-create.component';
import { CustomInputComponent } from 'src/app/components/custom-input/custom-input.component';
import { FormsModule } from '@angular/forms';
import { ColorSliderModule } from 'ngx-color/slider';
import { SharedComponentsModule } from 'src/app/components-shared/shared.components.module';
import { ProjectTasksComponent } from './project-tasks/project-tasks.component';
import { TaskCreateComponent } from './task-create/task-create.component';

@NgModule({
    declarations: [
        ProjectsComponent,
        CardProjectComponent,
        ProjectCreateComponent,
        CustomInputComponent,
        ProjectTasksComponent,
        TaskCreateComponent,
    ],
    imports: [
        CommonModule,
        ProjectsRoutingModule,
        FormsModule,
        ColorSliderModule,
        SharedComponentsModule,
    ],
    bootstrap: [ProjectsComponent],
})
export class ProjectsModule {}
