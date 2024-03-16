import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { PostPageComponent } from './post-page.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';

const appRoute: Routes = [
    {
        path: "", component: PostPageComponent
    },
]

@NgModule({
    declarations: [PostPageComponent],
    imports: [
        RouterModule.forChild(appRoute),
        CommonModule,
        MatButtonModule,
        ReactiveFormsModule,
        MatFormFieldModule,
    ]
})
export class PostModule { }
