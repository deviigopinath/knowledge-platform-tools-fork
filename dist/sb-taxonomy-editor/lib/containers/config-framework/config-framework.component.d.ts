import { OnInit } from '@angular/core';
import { FrameworkService } from '../../services/framework.service';
import * as i0 from "@angular/core";
export declare class ConfigFrameworkComponent implements OnInit {
    private frameworkService;
    frameworkCategories: any;
    categoriesRepresentations: any[];
    tempCategoryRepresentaions: any[];
    oldElements: any[];
    constructor(frameworkService: FrameworkService);
    ngOnInit(): void;
    updateCategory(name: any): void;
    updateTermArry(current: any, parent: any, index: any): any[];
    removeOldLine(): void;
    removeCategory(index: any): void;
    changePosition(event: any): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<ConfigFrameworkComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<ConfigFrameworkComponent, "lib-config-framework", never, {}, {}, never, never, false>;
}
