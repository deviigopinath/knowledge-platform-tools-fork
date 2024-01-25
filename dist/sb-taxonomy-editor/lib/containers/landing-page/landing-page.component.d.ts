import { OnInit } from '@angular/core';
import { FrameworkService } from '../../services/framework.service';
import * as i0 from "@angular/core";
export declare class LandingPageComponent implements OnInit {
    private frameworkService;
    frameworkCategories: any;
    app_strings: any;
    constructor(frameworkService: FrameworkService);
    ngOnInit(): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<LandingPageComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<LandingPageComponent, "lib-landing-page", never, {}, {}, never, never, false>;
}
