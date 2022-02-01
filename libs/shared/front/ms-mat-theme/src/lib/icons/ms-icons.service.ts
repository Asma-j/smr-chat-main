import { Injectable } from '@angular/core';
import { MatIconRegistry } from "@angular/material/icon";
import { DomSanitizer } from "@angular/platform-browser";

@Injectable({
    providedIn: 'root'
})
export class MsIconsService {

    constructor(
        private matIconRegistry: MatIconRegistry,
        private domSanitizer: DomSanitizer
        
    ) {
        console.log('int MsIconsService ');
        this.matIconRegistry.addSvgIcon(
            "googlelogo", this.domSanitizer.bypassSecurityTrustResourceUrl("../assets/svgs/Google__G__Logo.svg")
        );
        this.matIconRegistry.addSvgIcon(
            "facebooklogo", this.domSanitizer.bypassSecurityTrustResourceUrl("../assets/svgs/Facebook__F__Logo.svg")
        );
    }


}
