import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { PostPageComponent } from './post-page.component';

const appRoute: Routes = [
    {
        path: "", component: PostPageComponent
    },
]

@NgModule({
    declarations: [PostPageComponent],
    imports: [
        RouterModule.forChild(appRoute),
        CommonModule
    ]
})
export class PostModule { }
