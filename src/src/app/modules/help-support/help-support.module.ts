import { NgModule } from '@angular/core';

// import { MyModalComponent } from './modals/my-modal.component';

import { HelpSupportRoutingModule } from './help-support.routing';

// Libraries 
import { SharedModule } from 'src/app/shared/shared.module';


// import { CompletetopicsComponent } from './completetopics/completetopics.component';

// In your App's module:
@NgModule({
    declarations: [
        // JustJoinComponent
        // SafetyGuideComponent,
        //     HelpsupportComponent
        // CompletetopicsComponent
    ],
    imports: [
        SharedModule
    ],
    exports: [],
    providers: [],
    entryComponents: []
})
export class HelpSupportModule {}