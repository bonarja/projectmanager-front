import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TasksComponent } from './tasks.component';
import { TaskRoutingModule } from './task.routing';

@NgModule({
    declarations: [TasksComponent],
    imports: [CommonModule, TaskRoutingModule],
})
export class TasksModule {}
