import { CdkDragDrop } from '@angular/cdk/drag-drop';
import { OnInit, EventEmitter } from '@angular/core';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';
import * as i0 from "@angular/core";
export declare class CreateCategoriesComponent implements OnInit {
    private fb;
    taxonomyInfo: any;
    updateCategory: EventEmitter<any>;
    removeCategories: EventEmitter<any>;
    changePosition: EventEmitter<any>;
    createCategoriesForm: FormGroup;
    app_strings: any;
    constructor(fb: FormBuilder);
    ngOnInit(): void;
    categories(): FormArray;
    newCategories(): FormGroup;
    addCategory(): void;
    removeCategory(i: number): void;
    initCategoryForm(): void;
    saveForm(): void;
    emitCategory(event: any): void;
    drop(event: CdkDragDrop<any[]>): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<CreateCategoriesComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<CreateCategoriesComponent, "lib-create-categories", never, { "taxonomyInfo": "taxonomyInfo"; }, { "updateCategory": "updateCategory"; "removeCategories": "removeCategories"; "changePosition": "changePosition"; }, never, never, false>;
}
