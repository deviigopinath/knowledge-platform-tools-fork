import { OnInit } from '@angular/core';
import { FrameworkService } from './services/framework.service';
import * as i0 from "@angular/core";
export declare class SbTaxonomyEditorComponent implements OnInit {
    private frameworkService;
    environment: any;
    taxonomyConfig: any;
    constructor(frameworkService: FrameworkService);
    ngOnInit(): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<SbTaxonomyEditorComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<SbTaxonomyEditorComponent, "sb-taxonomy-editor", never, { "environment": "environment"; "taxonomyConfig": "taxonomyConfig"; }, {}, never, never, false>;
}
