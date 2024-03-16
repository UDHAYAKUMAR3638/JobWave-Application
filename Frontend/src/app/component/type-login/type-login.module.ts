import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { TypeLoginComponent } from './type-login.component';
import { MatButtonModule } from '@angular/material/button';

const appRoute: Routes = [
    {
        path: "", component: TypeLoginComponent
    },
]

@NgModule({
    declarations: [TypeLoginComponent],
    imports: [
        CommonModule,
        MatButtonModule,
        RouterModule.forChild(appRoute),
    ],
    exports: [RouterModule]
})

export class TypeLoginModule { }
