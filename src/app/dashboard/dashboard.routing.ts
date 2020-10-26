import { Component, NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from './dashboard.component';

const routes: Routes = [
    {
        path: '',
        component: DashboardComponent,
        children: [
            { path: '', redirectTo: 'home', pathMatch: 'full' },
            {
                path: 'home',
                loadChildren: () =>
                    import('./pages/home/home.module').then(
                        (m) => m.HomeModule
                    ),
            },
            {
                path: 'projects',
                loadChildren: () =>
                    import('./pages/projects/projects.module').then(
                        (m) => m.ProjectsModule
                    ),
            },
            {
                path: 'tasks',
                loadChildren: () =>
                    import('./pages/tasks/tasks.module').then(
                        (m) => m.TasksModule
                    ),
            },
        ],
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class DashboardRoutingModule {}
