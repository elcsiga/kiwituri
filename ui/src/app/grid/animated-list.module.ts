import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AnimatedListComponent } from "./animated-list.component";


@NgModule({
    imports: [
        CommonModule
    ],
    declarations: [
        AnimatedListComponent
    ],
    exports: [
        AnimatedListComponent
    ]

})
export class KitAnimatedListModule {
}
