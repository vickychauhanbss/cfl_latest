import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { from } from 'rxjs';
import {JustJoinComponent} from "./just-join/just-join.component";
import {SafetyGuideComponent} from "./safety-guide/safety-guide.component";
export const routes: Routes = [
    {
        path: 'just-joined',
         component: JustJoinComponent
     },
     {
        path: 'safetyguide',
         component: SafetyGuideComponent
     }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class HelpSupportRoutingModule { }