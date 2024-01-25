import * as i0 from '@angular/core';
import { Injectable, Component, Input, Inject, EventEmitter, Output, Pipe, ViewEncapsulation, NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { tap, catchError, startWith, map } from 'rxjs/operators';
import { v4 } from 'uuid';
import * as i1 from '@angular/common/http';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import * as i1$1 from '@angular/router';
import { RouterModule } from '@angular/router';
import * as i1$3 from '@angular/forms';
import { Validators, ReactiveFormsModule, FormsModule } from '@angular/forms';
import * as i1$2 from '@angular/material/dialog';
import { MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import * as i5 from '@angular/common';
import { CommonModule } from '@angular/common';
import * as i5$1 from '@angular/material/form-field';
import { MatFormFieldModule, MAT_FORM_FIELD_DEFAULT_OPTIONS } from '@angular/material/form-field';
import * as i6 from '@angular/material/button';
import { MatButtonModule } from '@angular/material/button';
import * as i7 from '@angular/material/input';
import { MatInputModule } from '@angular/material/input';
import * as i8 from '@angular/material/autocomplete';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import * as i9 from '@angular/material/core';
import * as i8$1 from '@angular/material/icon';
import { MatIconModule } from '@angular/material/icon';
import * as i6$2 from '@angular/material/snack-bar';
import { MatSnackBarModule, MAT_SNACK_BAR_DEFAULT_OPTIONS } from '@angular/material/snack-bar';
import * as i11 from '@angular/material/progress-spinner';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import * as i8$2 from '@angular/material/checkbox';
import { MatCheckboxModule } from '@angular/material/checkbox';
import * as i9$1 from '@angular/material/menu';
import { MatMenuModule } from '@angular/material/menu';
import * as i6$1 from '@angular/material/card';
import { MatCardModule } from '@angular/material/card';
import * as i1$4 from '@angular/material/tabs';
import { MatTabsModule, MAT_TABS_CONFIG } from '@angular/material/tabs';
import * as i7$1 from '@angular/material/tooltip';
import { MatTooltipModule } from '@angular/material/tooltip';
import * as i7$2 from '@angular/cdk/drag-drop';
import { moveItemInArray, transferArrayItem, DragDropModule } from '@angular/cdk/drag-drop';
import { MatSelectModule } from '@angular/material/select';
import { MatTableModule } from '@angular/material/table';

class SbTaxonomyEditorService {
    constructor() { }
}
SbTaxonomyEditorService.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "14.3.0", ngImport: i0, type: SbTaxonomyEditorService, deps: [], target: i0.ɵɵFactoryTarget.Injectable });
SbTaxonomyEditorService.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "14.3.0", ngImport: i0, type: SbTaxonomyEditorService, providedIn: 'root' });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "14.3.0", ngImport: i0, type: SbTaxonomyEditorService, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root'
                }]
        }], ctorParameters: function () { return []; } });

class LocalConnectionService {
    constructor() {
        this._vars = {
            data: {
                endpoint: '',
                frameworkName: '',
                token: '',
                isApprovalRequired: false
            },
            source: 'online'
        };
        const env = JSON.parse(localStorage.getItem('environment'));
        if (env) {
            this._vars.data.endpoint = env.url;
            this._vars.data.token = env.token;
            this._vars.data.frameworkName = env.frameworkName;
            this._vars.data.isApprovalRequired = env.isApprovalRequired;
        }
    }
    get apiUrl() {
        if (this.localStorage.data.endpoint) {
            return this.localStorage.data.endpoint;
        }
        return this._vars.data.endpoint;
    }
    get token() {
        if (this.localStorage.data.token) {
            return this.localStorage.data.token;
        }
        return this._vars.data.token;
    }
    get frameworkName() {
        if (this.localStorage.data.frameworkName) {
            return this.localStorage.data.frameworkName;
        }
        return this._vars.data.frameworkName;
    }
    get connectionType() {
        if (this.localStorage.source) {
            return this.localStorage.source;
        }
        return this._vars.source;
    }
    set localStorage(val) {
        localStorage.setItem('env', JSON.stringify(val));
    }
    get localStorage() {
        const val = localStorage.getItem('env');
        if (val !== 'undefined' && val !== null) {
            return JSON.parse(localStorage.getItem('env') || `{"source":"online","data":{}}`);
        }
        return JSON.parse(`{"source":"online", "data":{}}`);
    }
    updateLocalStorage(val) {
        this.localStorage = val;
    }
    clearLocalStorage() {
        localStorage.removeItem('env');
        localStorage.removeItem('terms');
    }
    getConfigInfo() {
        return this._vars.data;
    }
}
LocalConnectionService.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "14.3.0", ngImport: i0, type: LocalConnectionService, deps: [], target: i0.ɵɵFactoryTarget.Injectable });
LocalConnectionService.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "14.3.0", ngImport: i0, type: LocalConnectionService, providedIn: 'root' });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "14.3.0", ngImport: i0, type: LocalConnectionService, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root'
                }]
        }], ctorParameters: function () { return []; } });

class FrameworkService {
    constructor(http, localConfig
    // @Inject(LibConnectionService) private config
    ) {
        // this.fillCategories()
        this.http = http;
        this.localConfig = localConfig;
        this.categoriesHash = new BehaviorSubject([]);
        // termsByCategory: BehaviorSubject<NSFramework.ITermsByCategory[] | []> = new BehaviorSubject<NSFramework.ITermsByCategory[] | []>([])
        this.isDataUpdated = new BehaviorSubject(false);
        this.currentSelection = new BehaviorSubject(null);
        this.termSubject = new BehaviorSubject(null);
        this.list = new Map();
        this.selectionList = new Map();
        this.insertUpdateDeleteNotifier = new BehaviorSubject(null);
    }
    getFrameworkInfo() {
        localStorage.removeItem('terms');
        return this.http.get(`/api/framework/v1/read/${this.environment.frameworkName}`).pipe(tap((response) => {
            this.resetAll();
            this.formateData(response);
        }), catchError((err) => {
            this.list.clear();
            this.categoriesHash.next([]);
            throw 'Error in source. Details: ' + err; // Use console.log(err) for detail
        }));
    }
    // readTerms(frameworkId, categoryId, requestBody) {
    //   return this.http.post(`/api/framework/v1/term/search?framework=${frameworkId}&category=${categoryId}`, requestBody).pipe(
    //     map((res: any) => res.result))
    // }
    createTerm(frameworkId, categoryId, requestBody) {
        return this.http.post(`/api/framework/v1/term/create?framework=${frameworkId}&category=${categoryId}`, requestBody);
    }
    updateTerm(frameworkId, categoryId, categoryTermCode, reguestBody) {
        return this.http.patch(`/api/framework/v1/term/update/${categoryTermCode}?framework=${frameworkId}&category=${categoryId}`, reguestBody);
    }
    publishFramework() {
        return this.http.post(`/api/framework/v1/publish/${this.environment.frameworkName}`, {}, { headers: { 'X-Channel-Id': this.environment.channelId } });
    }
    getUuid() {
        return v4();
    }
    updateEnvironment(env) {
        this.environment = env;
    }
    getEnviroment() {
        return this.environment;
    }
    getFrameworkId() {
        return this.frameworkId;
    }
    getNextCategory(currentCategory) {
        const currentIndex = this.categoriesHash.value.findIndex((a) => {
            return a.code === currentCategory;
        });
        let categoryLength = this.categoriesHash.getValue().length;
        /* istanbul ignore next */
        return (currentIndex + 1) <= categoryLength ? this.categoriesHash.getValue()[currentIndex + 1] : null;
    }
    getPreviousCategory(currentCategory) {
        const currentIndex = this.categoriesHash.value.findIndex((a) => {
            return a.code === currentCategory;
        });
        /* istanbul ignore next */
        return (currentIndex - 1) >= 0 ? this.categoriesHash.getValue()[currentIndex - 1] : null;
    }
    /* Not using anywhere ignore unit test */
    /* istanbul ignore next */
    getParentTerm(currentCategory) {
        const parent = this.getPreviousCategory(currentCategory) || null;
        return parent ? this.selectionList.get(parent.code) : null;
    }
    childClick(event) {
        this.currentSelection.next(event);
    }
    resetAll() {
        this.categoriesHash.next([]);
        this.currentSelection.next(null);
        this.list.clear();
    }
    isLastColumn(colCode) {
        return this.categoriesHash.value && (this.categoriesHash.value.findIndex((a) => {
            return a.code === colCode;
        })) === (this.categoriesHash.value.length - 1);
        // return false
    }
    /* Not using anywhere ignore unit test */
    /* istanbul ignore next */
    removeItemFromArray(array, item) {
        /* assign a empty array */
        var tmp = [];
        /* loop over all array items */
        for (var index in array) {
            if (array[index] !== item) {
                /* push to temporary array if not like item */
                tmp.push(array[index]);
            }
        }
        /* return the temporary array */
        return tmp;
    }
    // set setTerm(res: any) {
    //   this.termSubject.next(res)
    //   let oldTerms = ([...this.getTerm] || [])
    //   debugger
    //   if (!res.parent && res.created) {
    //     oldTerms.push(res.term)
    //   } else {
    //     if ((oldTerms.filter(ola => ola.code === res.parent.code) || []).length === 0) {
    //       if (!res.parent.children) {
    //         res.parent.children = []
    //       }
    //       res.parent.children.push(res.term)
    //       oldTerms.push(res.parent)
    //     } else {
    //       oldTerms.map(ot => {
    //         if (ot && ot.code === res.parent.code) {
    //           if (!ot.children) {
    //             ot.children = []
    //           }
    //           ot.children.push(res.term)
    //         }
    //       })
    //     }
    //   }
    //   localStorage.setItem('terms', JSON.stringify(oldTerms))
    // }
    set setTerm(res) {
        this.termSubject.next(res);
        let oldTerms = ([...this.getTerm]);
        oldTerms.push(res);
        localStorage.setItem('terms', JSON.stringify(oldTerms));
    }
    get getTerm() {
        return JSON.parse(localStorage.getItem('terms') || '[]');
    }
    /* istanbul ignore next */
    getLocalTermsByParent(parentCode) {
        const filteredData = this.getTerm.filter(x => {
            return x.parent && x.parent.category === parentCode;
        }) || [];
        return filteredData.map(x => {
            return x.term;
        });
    }
    getLocalTermsByCategory(parentCode) {
        const filteredData = this.getTerm.filter(x => {
            return x.term && x.term.category === parentCode;
        });
        return filteredData;
    }
    /* istanbul ignore next */
    getLocalTermsCategory(category) {
        const filteredData = this.getTerm.filter(x => {
            return x.category === category;
        });
        return filteredData;
    }
    formateData(response) {
        this.frameworkId = response.result.framework.code;
        // console.log('response', response);
        // // const obj = FRAMEWORK;
        // // const columns: NSFramework.IColumnView[] = [];
        // // const obj = response
        (response.result.framework.categories).forEach((a, idx) => {
            // if (idx <= 1) {
            // const localData = this.getLocalTermsCategory(a.code)
            // console.log("localData============>", localData)
            this.list.set(a.code, {
                code: a.code,
                identifier: a.identifier,
                index: a.index,
                name: a.name,
                selected: a.selected,
                status: a.status,
                description: a.description,
                translations: a.translations,
                category: a.category,
                associations: a.associations,
                config: this.getConfig(a.code),
                // children: ([...a.terms, ...localData] || []).map(c => {
                children: (a.terms || []).map(c => {
                    const associations = c.associations || [];
                    if (associations.length > 0) {
                        Object.assign(c, { children: associations });
                    }
                    return c;
                })
            });
            // }
        });
        const allCategories = [];
        this.list.forEach(a => {
            allCategories.push({
                code: a.code,
                identifier: a.identifier,
                index: a.index,
                name: a.name,
                status: a.status,
                description: a.description,
                translations: a.translations,
            });
        });
        this.categoriesHash.next(allCategories);
    }
    removeOldLine() {
        /* istanbul ignore next */
        const eles = Array.from(document.getElementsByClassName('leader-line') || []);
        /* istanbul ignore if */
        if (eles.length > 0) {
            eles.forEach(ele => ele.remove());
        }
    }
    setConfig(config) {
        this.rootConfig = config;
    }
    getConfig(code) {
        // this.rootConfig = JSON.parse(localStorage.getItem('taxonomyConfig'))
        let categoryConfig;
        const defaultConfig = this.rootConfig.filter(con => con.frameworkId === 'default')[0];
        this.rootConfig.forEach((config, index) => {
            if (this.frameworkId == config.frameworkId) {
                categoryConfig = config.config.find((obj) => obj.category == code);
            }
        });
        return categoryConfig || defaultConfig.config.find((obj) => obj.category == code);
    }
    isTermExistRemove(id) {
        let associations = [];
        let temp;
        this.selectionList.forEach((parent, i) => {
            /* istanbul ignore next */
            temp = parent.children ? parent.children.filter(child => child.identifier === id) : null;
            associations = parent.children ? parent.children.map(c => {
                return { identifier: c.identifier }; // approvalStatus: c.associationProperties?c.associationProperties.approvalStatus: 'Draft'
            }) : [];
            if (temp && temp.length) {
                associations = associations.filter((obj) => obj.identifier !== id);
                const requestBody = {
                    request: {
                        term: {
                            associations: [
                                ...associations
                            ]
                        }
                    }
                };
                this.updateTerm(this.frameworkId, parent.category, parent.code, requestBody).subscribe(res => {
                    this.publishFramework().subscribe(res => console.log(res));
                });
            }
        });
    }
}
FrameworkService.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "14.3.0", ngImport: i0, type: FrameworkService, deps: [{ token: i1.HttpClient }, { token: LocalConnectionService }], target: i0.ɵɵFactoryTarget.Injectable });
FrameworkService.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "14.3.0", ngImport: i0, type: FrameworkService, providedIn: 'root' });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "14.3.0", ngImport: i0, type: FrameworkService, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root'
                }]
        }], ctorParameters: function () { return [{ type: i1.HttpClient }, { type: LocalConnectionService }]; } });

class SbTaxonomyEditorComponent {
    constructor(frameworkService) {
        this.frameworkService = frameworkService;
    }
    ngOnInit() {
        this.frameworkService.updateEnvironment(this.environment);
        this.frameworkService.setConfig(this.taxonomyConfig);
    }
}
SbTaxonomyEditorComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "14.3.0", ngImport: i0, type: SbTaxonomyEditorComponent, deps: [{ token: FrameworkService }], target: i0.ɵɵFactoryTarget.Component });
SbTaxonomyEditorComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "14.3.0", type: SbTaxonomyEditorComponent, selector: "sb-taxonomy-editor", inputs: { environment: "environment", taxonomyConfig: "taxonomyConfig" }, ngImport: i0, template: `
        <router-outlet></router-outlet>
  `, isInline: true, dependencies: [{ kind: "directive", type: i1$1.RouterOutlet, selector: "router-outlet", outputs: ["activate", "deactivate", "attach", "detach"], exportAs: ["outlet"] }] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "14.3.0", ngImport: i0, type: SbTaxonomyEditorComponent, decorators: [{
            type: Component,
            args: [{ selector: 'sb-taxonomy-editor', template: `
        <router-outlet></router-outlet>
  ` }]
        }], ctorParameters: function () { return [{ type: FrameworkService }]; }, propDecorators: { environment: [{
                type: Input
            }], taxonomyConfig: [{
                type: Input
            }] } });

const APPROVAL = {
    INITIATE: "INITIATE",
    LEVEL1: "SEND_FOR_REVIEW_L1",
    LEVEL2: "SEND_FOR_REVIEW_L2",
    SEND_FOR_PUBLISH: "SEND_FOR_PUBLISH",
    ACTION: "INITIATE",
    SERVICE_NAME: "taxonomy",
    CREATE: "/api/workflow/taxonomy/create",
    SEARCH: "/api/workflow/taxonomy/search",
    READ: '/api/workflow/taxonomy/read',
    UPDATE: 'api/workflow/taxonomy/update',
    APPROVE: 'APPROVE',
    REJECT: 'REJECT'
};
const LIVE = 'Live';
const DRAFT = 'Draft';
;
const defaultConfig = {
    startPlug: 'disc',
    startPlugColor: 'white',
    startPlugSize: 3,
    startPlugOutlineColor: '#515151',
    endPlug: 'arrow3',
    endPlugColor: 'white',
    endPlugSize: 3,
    endPlugOutlineColor: '#515151',
    color: '#515151',
    size: 1,
    path: 'grid',
    startSocket: 'right', endSocket: 'left',
    dash: { len: 6, gap: 3 }
};
const headerLineConfig = {
    endPlugColor: '#b9b9b9',
    endPlugOutlineColor: '#b9b9b9',
    color: '#b9b9b9',
    startPlug: 'behind'
};

const labels = {
    flag: "flag",
    createNew: "Create New",
    build: "build",
    noData: "No Data Available",
    add: "add",
    pendingApproval: "Pending for Approval",
    date: "Date",
    more: "more...",
    rightArrow: "keyboard_arrow_right",
    alreadyExist: "Already Exist.",
    cancel: "Cancel",
    create: "Create",
    update: "Update",
    createCategories: "Create Categories",
    category: "Category",
    removeCircleOutline: "remove_circle_outline",
    close: "close",
    endPoint: "Enter End Point",
    token: "Enter Token",
    enterFrameworkName: "Enter Framework Name",
    frameworkName: "Framework Name",
    clear: "Clear",
    or: "Or",
    experienceTaxonomy: "Experience Taxonomy",
    playWithIt: "Let's Play with it",
    newConnection: "Create New Connection",
    categoryPreview: "Categories Preview",
    allFrac: "All Frac",
    treeView: "tree view...",
    categoryName: "Enter Category Name",
    name: "Enter Name",
    description: "Enter Description",
    area: "Enter area",
    type: "Enter type"
};

class CreateTermComponent {
    constructor(dialogRef, data, frameWorkService, fb) {
        this.dialogRef = dialogRef;
        this.data = data;
        this.frameWorkService = frameWorkService;
        this.fb = fb;
        this.name = '';
        this.termLists = [];
        this.disableCreate = false;
        this.isTermExist = false;
        this.selectedTerm = {};
        this.app_strings = labels;
    }
    ngOnInit() {
        this.termLists = this.data.columnInfo.children;
        this.initTermForm();
    }
    initTermForm() {
        this.createTermForm = this.fb.group({
            name: ['', [Validators.required]],
            description: [''],
            area: [''],
            type: ['']
        });
        this.filtedTermLists = this.createTermForm.get('name').valueChanges.pipe(startWith(''), map(value => this._filter(value || '')));
    }
    _filter(searchTxt) {
        let isExist;
        this.disableCreate = false;
        this.isTermExist = false;
        this.createTermForm.get('description').enable();
        this.createTermForm.get('area').enable();
        this.createTermForm.get('type').enable();
        // this.createTermForm.get('description').patchValue('')
        const filterValue = typeof (searchTxt) === 'object' ? this._normalizeValue(searchTxt.name) : this._normalizeValue(searchTxt);
        isExist = this.termLists.filter(term => this._normalizeValue(term.name).includes(filterValue));
        return isExist;
    }
    _normalizeValue(value) {
        return value.toLowerCase().replace(/\s/g, '');
    }
    onSelect(term) {
        this.selectedTerm = term.value;
        this.createTermForm.get('name').patchValue(term.value.name);
        this.createTermForm.get('description').patchValue(term.value.description);
        this.createTermForm.get('description').disable();
        this.createTermForm.get('area').patchValue(term.value.area);
        this.createTermForm.get('area').disable();
        this.createTermForm.get('type').patchValue(term.value.type);
        this.createTermForm.get('type').disable();
        this.disableCreate = true;
    }
    saveTerm() {
        if (this._filter(this.createTermForm.value.name).length > 0) {
            this.isTermExist = true;
            console.log('Already exist');
            return;
        }
        if (this.createTermForm.valid) {
            const term = {
                code: this.frameWorkService.getUuid(),
                name: this.createTermForm.value.name,
                description: this.createTermForm.value.description,
                status: LIVE,
                approvalStatus: DRAFT,
                parents: [
                    { identifier: `${this.data.columnInfo.identifier}` }
                ],
                additionalProperties: {}
            };
            const requestBody = {
                request: {
                    term: term
                }
            };
            this.frameWorkService.createTerm(this.data.frameworkId, this.data.columnInfo.code, requestBody).subscribe((res) => {
                requestBody.request.term['identifier'] = res.result.node_id[0];
                this.dialogClose({ term: requestBody.request.term, created: true });
                this.selectedTerm = requestBody.request.term;
                this.updateTerm();
            });
        }
    }
    updateTerm() {
        let associations = [];
        let temp;
        let counter = 0;
        let localIsExist = false;
        this.frameWorkService.selectionList.forEach((parent, i) => {
            counter++;
            temp = parent.children ? parent.children.filter(child => child.identifier === this.selectedTerm.identifier) : null;
            associations = parent.children ? parent.children.map(c => {
                return { identifier: c.identifier }; // approvalStatus: c.associationProperties?c.associationProperties.approvalStatus: 'Draft'
            }) : [];
            if (temp && temp.length) {
                this.isTermExist = true;
                return;
            }
            else {
                associations.push({ identifier: this.selectedTerm.identifier }); // approvalStatus: appConstants.DRAFT 
                this.isTermExist = false;
                const reguestBody = {
                    request: {
                        term: {
                            associations: [
                                ...associations
                            ]
                        }
                    }
                };
                // console.log('***************************',associations)
                // this.dialogClose({ term: this.selectedTerm, created: true })
                this.frameWorkService.updateTerm(this.data.frameworkId, parent.category, parent.code, reguestBody).subscribe((res) => {
                    counter--;
                    if (counter === 0) {
                        // this.selectedTerm['associationProperties']['approvalStatus'] = 'Draft';
                        this.dialogClose({ term: { ...this.selectedTerm, ...{ associationProperties: { approvalStatus: 'Draft' } } }, created: true });
                    }
                });
            }
        });
    }
    dialogClose(term) {
        this.frameWorkService.publishFramework().subscribe(res => {
            this.dialogRef.close(term);
        });
    }
}
CreateTermComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "14.3.0", ngImport: i0, type: CreateTermComponent, deps: [{ token: i1$2.MatDialogRef }, { token: MAT_DIALOG_DATA }, { token: FrameworkService }, { token: i1$3.FormBuilder }], target: i0.ɵɵFactoryTarget.Component });
CreateTermComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "14.3.0", type: CreateTermComponent, selector: "lib-create-term", ngImport: i0, template: "<div class=\"dialog\">\n    <div class=\"dialog-title\" mat-dialog-title>{{app_strings.createNew}} {{data.columnInfo.name}}</div>\n    <form [formGroup]=\"createTermForm\" novalidate (ngSubmit)=\"disableCreate?updateTerm():saveTerm()\">\n        <mat-form-field>\n            <!-- <mat-label>Enter {{data.name}} name</mat-label> -->\n            <input matInput formControlName=\"name\" placeholder=\"{{app_strings.name}}\"   [matAutocomplete]=\"auto\">\n            <mat-autocomplete #auto=\"matAutocomplete\" (optionSelected)=\"onSelect($event.option)\">\n                <mat-option *ngFor=\"let option of filtedTermLists | async\"  [value]=\"option\">\n                  {{option.name}}\n                </mat-option>\n              </mat-autocomplete>\n        </mat-form-field>\n        <mat-error *ngIf=\"isTermExist\">{{app_strings.alreadyExist}}</mat-error>\n        <mat-form-field>\n            <!-- <mat-label>Enter {{data.name}} name</mat-label> -->\n            <textarea matInput formControlName=\"description\" placeholder=\"{{app_strings.description}}\"></textarea>\n        </mat-form-field>\n        <mat-form-field>\n            <!-- <mat-label>Enter {{data.area}} area</mat-label> -->\n            <input matInput formControlName=\"name\" placeholder=\"{{app_strings.area}}\"   [matAutocomplete]=\"auto\">\n        </mat-form-field>\n        <mat-form-field>\n            <!-- <mat-label>Enter {{data.type}} type</mat-label> -->\n            <input matInput formControlName=\"name\" placeholder=\"{{app_strings.name}}\"   [matAutocomplete]=\"auto\">\n        </mat-form-field>\n         <footer class=\"actions\">\n            <button mat-raised-button color=\"default\" type=\"reset\" (click)=\"dialogClose('')\">{{app_strings.cancel}}</button>\n            <button mat-raised-button color=\"primary\" type=\"submit\" cdkFocusInitial *ngIf=\"!disableCreate\">{{app_strings.create}}</button>\n            <button mat-raised-button color=\"primary\" type=\"submit\" cdkFocusInitial *ngIf=\"disableCreate\">{{app_strings.update}}</button>\n        </footer>\n    </form>\n</div>\n", styles: [".dialog .mat-dialog-title{padding:1em;margin-bottom:0;background:#EEEEEE}.dialog .mat-form-field{width:90%;padding:0;background:#FFFFFF;margin:1em;border-radius:2px}.dialog .mat-form-field-outline{color:#fff}.dialog .mat-form-field ::ng-deep .mat-form-field-wrapper{padding-bottom:0}.dialog .mat-form-field ::ng-deep .mat-form-field-wrapper .mat-form-field-infix{padding:15px;margin-top:0;border-top:0}.dialog .mat-form-field ::ng-deep .mat-form-field-wrapper .mat-form-field-infix textarea{resize:none}.dialog .mat-form-field-disabled{background:#EEEEEE}.dialog .actions{display:flex;flex-direction:row;justify-content:space-between;padding:0 1em 1em}.dialog .mat-error{padding:0 25px;margin-top:-10px}.dialog-title{align-items:center;display:flex}::ng-deep .custom-dialog-container .mat-dialog-container{width:500px;padding:0;border-radius:0;background:#EEEEEE}@media only screen and (max-width: 1024px){::ng-deep .cdk-overlay-pane{width:40%!important}}@media only screen and (max-width: 992px){::ng-deep .cdk-overlay-pane{width:45%!important}}@media only screen and (max-width: 1024px){.dialog{font-size:12px}.dialog .dialog-title{font-size:24px;height:1em}.dialog button{font-size:12px;line-height:3.5em}.dialog .mat-raised-button{padding:0 3em}}\n"], dependencies: [{ kind: "directive", type: i5.NgForOf, selector: "[ngFor][ngForOf]", inputs: ["ngForOf", "ngForTrackBy", "ngForTemplate"] }, { kind: "directive", type: i5.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { kind: "directive", type: i1$3.ɵNgNoValidate, selector: "form:not([ngNoForm]):not([ngNativeValidate])" }, { kind: "directive", type: i1$3.DefaultValueAccessor, selector: "input:not([type=checkbox])[formControlName],textarea[formControlName],input:not([type=checkbox])[formControl],textarea[formControl],input:not([type=checkbox])[ngModel],textarea[ngModel],[ngDefaultControl]" }, { kind: "directive", type: i1$3.NgControlStatus, selector: "[formControlName],[ngModel],[formControl]" }, { kind: "directive", type: i1$3.NgControlStatusGroup, selector: "[formGroupName],[formArrayName],[ngModelGroup],[formGroup],form:not([ngNoForm]),[ngForm]" }, { kind: "directive", type: i1$3.FormGroupDirective, selector: "[formGroup]", inputs: ["formGroup"], outputs: ["ngSubmit"], exportAs: ["ngForm"] }, { kind: "directive", type: i1$3.FormControlName, selector: "[formControlName]", inputs: ["formControlName", "disabled", "ngModel"], outputs: ["ngModelChange"] }, { kind: "directive", type: i5$1.MatError, selector: "mat-error", inputs: ["id"] }, { kind: "component", type: i5$1.MatFormField, selector: "mat-form-field", inputs: ["color", "appearance", "hideRequiredMarker", "hintLabel", "floatLabel"], exportAs: ["matFormField"] }, { kind: "component", type: i6.MatButton, selector: "button[mat-button], button[mat-raised-button], button[mat-icon-button],             button[mat-fab], button[mat-mini-fab], button[mat-stroked-button],             button[mat-flat-button]", inputs: ["disabled", "disableRipple", "color"], exportAs: ["matButton"] }, { kind: "directive", type: i7.MatInput, selector: "input[matInput], textarea[matInput], select[matNativeControl],      input[matNativeControl], textarea[matNativeControl]", inputs: ["disabled", "id", "placeholder", "name", "required", "type", "errorStateMatcher", "aria-describedby", "value", "readonly"], exportAs: ["matInput"] }, { kind: "directive", type: i1$2.MatDialogTitle, selector: "[mat-dialog-title], [matDialogTitle]", inputs: ["id"], exportAs: ["matDialogTitle"] }, { kind: "component", type: i8.MatAutocomplete, selector: "mat-autocomplete", inputs: ["disableRipple"], exportAs: ["matAutocomplete"] }, { kind: "directive", type: i8.MatAutocompleteTrigger, selector: "input[matAutocomplete], textarea[matAutocomplete]", exportAs: ["matAutocompleteTrigger"] }, { kind: "component", type: i9.MatOption, selector: "mat-option", exportAs: ["matOption"] }, { kind: "pipe", type: i5.AsyncPipe, name: "async" }] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "14.3.0", ngImport: i0, type: CreateTermComponent, decorators: [{
            type: Component,
            args: [{ selector: 'lib-create-term', template: "<div class=\"dialog\">\n    <div class=\"dialog-title\" mat-dialog-title>{{app_strings.createNew}} {{data.columnInfo.name}}</div>\n    <form [formGroup]=\"createTermForm\" novalidate (ngSubmit)=\"disableCreate?updateTerm():saveTerm()\">\n        <mat-form-field>\n            <!-- <mat-label>Enter {{data.name}} name</mat-label> -->\n            <input matInput formControlName=\"name\" placeholder=\"{{app_strings.name}}\"   [matAutocomplete]=\"auto\">\n            <mat-autocomplete #auto=\"matAutocomplete\" (optionSelected)=\"onSelect($event.option)\">\n                <mat-option *ngFor=\"let option of filtedTermLists | async\"  [value]=\"option\">\n                  {{option.name}}\n                </mat-option>\n              </mat-autocomplete>\n        </mat-form-field>\n        <mat-error *ngIf=\"isTermExist\">{{app_strings.alreadyExist}}</mat-error>\n        <mat-form-field>\n            <!-- <mat-label>Enter {{data.name}} name</mat-label> -->\n            <textarea matInput formControlName=\"description\" placeholder=\"{{app_strings.description}}\"></textarea>\n        </mat-form-field>\n        <mat-form-field>\n            <!-- <mat-label>Enter {{data.area}} area</mat-label> -->\n            <input matInput formControlName=\"name\" placeholder=\"{{app_strings.area}}\"   [matAutocomplete]=\"auto\">\n        </mat-form-field>\n        <mat-form-field>\n            <!-- <mat-label>Enter {{data.type}} type</mat-label> -->\n            <input matInput formControlName=\"name\" placeholder=\"{{app_strings.name}}\"   [matAutocomplete]=\"auto\">\n        </mat-form-field>\n         <footer class=\"actions\">\n            <button mat-raised-button color=\"default\" type=\"reset\" (click)=\"dialogClose('')\">{{app_strings.cancel}}</button>\n            <button mat-raised-button color=\"primary\" type=\"submit\" cdkFocusInitial *ngIf=\"!disableCreate\">{{app_strings.create}}</button>\n            <button mat-raised-button color=\"primary\" type=\"submit\" cdkFocusInitial *ngIf=\"disableCreate\">{{app_strings.update}}</button>\n        </footer>\n    </form>\n</div>\n", styles: [".dialog .mat-dialog-title{padding:1em;margin-bottom:0;background:#EEEEEE}.dialog .mat-form-field{width:90%;padding:0;background:#FFFFFF;margin:1em;border-radius:2px}.dialog .mat-form-field-outline{color:#fff}.dialog .mat-form-field ::ng-deep .mat-form-field-wrapper{padding-bottom:0}.dialog .mat-form-field ::ng-deep .mat-form-field-wrapper .mat-form-field-infix{padding:15px;margin-top:0;border-top:0}.dialog .mat-form-field ::ng-deep .mat-form-field-wrapper .mat-form-field-infix textarea{resize:none}.dialog .mat-form-field-disabled{background:#EEEEEE}.dialog .actions{display:flex;flex-direction:row;justify-content:space-between;padding:0 1em 1em}.dialog .mat-error{padding:0 25px;margin-top:-10px}.dialog-title{align-items:center;display:flex}::ng-deep .custom-dialog-container .mat-dialog-container{width:500px;padding:0;border-radius:0;background:#EEEEEE}@media only screen and (max-width: 1024px){::ng-deep .cdk-overlay-pane{width:40%!important}}@media only screen and (max-width: 992px){::ng-deep .cdk-overlay-pane{width:45%!important}}@media only screen and (max-width: 1024px){.dialog{font-size:12px}.dialog .dialog-title{font-size:24px;height:1em}.dialog button{font-size:12px;line-height:3.5em}.dialog .mat-raised-button{padding:0 3em}}\n"] }]
        }], ctorParameters: function () { return [{ type: i1$2.MatDialogRef }, { type: undefined, decorators: [{
                    type: Inject,
                    args: [MAT_DIALOG_DATA]
                }] }, { type: FrameworkService }, { type: i1$3.FormBuilder }]; } });

class ConnectorComponent {
    constructor(dialogRef, data, frameWorkService, localScv, fb) {
        this.dialogRef = dialogRef;
        this.data = data;
        this.frameWorkService = frameWorkService;
        this.localScv = localScv;
        this.fb = fb;
        this.app_strings = labels;
    }
    ngOnInit() {
        // const requestBody = {
        //   request: {
        //     search: {
        //         status: "Draft"
        //     }
        // }
        // } 
        // this.frameWorkService.readTerms(this.data.frameworkId, this.data.categoryId, requestBody).subscribe(data => {
        //    this.termLists = data.terms
        // })
        this.initConnectorForm();
    }
    initConnectorForm() {
        this.connectorForm = this.fb.group({
            endpoint: [this.localScv.localStorage.data.endpoint,
                [Validators.required,
                    Validators.pattern(/^(?:http(s)?:\/\/)?[\w.-]+(?:\.[\w\.-]+)+[\w\-\._~:/?#[\]@!\$&'\(\)\*\+,;=.]+$/)]],
            token: [this.localScv.localStorage.data.token, [Validators.nullValidator]],
            frameworkName: [this.localScv.localStorage.data.frameworkName, [Validators.required]],
        });
    }
    saveConnection() {
        if (this.connectorForm.valid) {
            this.dialogRef.close({ source: 'online', data: this.connectorForm.value });
        }
    }
    clear() {
        this.connectorForm.reset();
        this.dialogRef.close({ source: 'online', data: {} });
    }
    dialogClose() {
        this.dialogRef.close({ source: 'online', data: {} });
    }
    loadDefault() {
        this.dialogRef.close({ source: 'offline', data: {} });
    }
}
ConnectorComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "14.3.0", ngImport: i0, type: ConnectorComponent, deps: [{ token: i1$2.MatDialogRef }, { token: MAT_DIALOG_DATA }, { token: FrameworkService }, { token: LocalConnectionService }, { token: i1$3.FormBuilder }], target: i0.ɵɵFactoryTarget.Component });
ConnectorComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "14.3.0", type: ConnectorComponent, selector: "lib-connector", ngImport: i0, template: "<div class=\"flex flex-1 flex-row-reverse pointer\">\n    <button mat-raised-button color=\"default\" (click)=\"dialogClose()\" >\n        <mat-icon mat-raised-button >{{app_strings.close}}</mat-icon>\n    </button>\n</div>\n<div class=\"dialog flex\">\n    <div class=\"flex flex-1 flex-row\">\n        <div class=\"container flex flex-1\">\n            <div class=\"side flex flex-1\">\n                <div class=\"'flex flex-2 padding-s\">\n                    <div class=\"dialog-title\" mat-dialog-title>{{app_strings.newConnection}}</div>\n                    <form [formGroup]=\"connectorForm\" novalidate (ngSubmit)=\"saveConnection()\">\n                        <mat-form-field appearance=\"outline\">\n                            <mat-label>{{app_strings.endPoint}}</mat-label>\n                            <input matInput type=\"url\" formControlName=\"endpoint\" placeholder=\"{{app_strings.endPoint}}\" />\n                        </mat-form-field>\n                        <mat-form-field appearance=\"outline\">\n                            <mat-label>{{app_strings.token}}</mat-label>\n                            <input matInput formControlName=\"token\" placeholder=\"{{app_strings.token}}\" />\n                        </mat-form-field>\n                        <mat-form-field appearance=\"outline\">\n                            <mat-label>{{app_strings.enterFrameworkName}}</mat-label>\n                            <input matInput formControlName=\"frameworkName\" placeholder=\"{{app_strings.frameworkName}}\" />\n                        </mat-form-field>\n                        <footer class=\"actions\">\n                            <button mat-raised-button color=\"default\" type=\"reset\"\n                                (click)=\"dialogClose()\">{{app_strings.cancel}}</button>\n                            <button mat-raised-button color=\"default\" type=\"reset\" (click)=\"clear()\">{{app_strings.clear}}</button>\n                            <button mat-raised-button color=\"primary\" type=\"submit\" cdkFocusInitial>{{app_strings.update}}</button>\n                        </footer>\n                    </form>\n                </div>\n            </div>\n            <div class=\"or\">\n                <div class=\"or-line\"></div>\n                <div class=\"or-label\">{{app_strings.or}}</div>\n            </div>\n            <div class=\"side flex flex-1\">\n                <div class=\"'flex flex-1 padding-s\">\n                    <div class=\"dialog-title\" mat-dialog-title>{{app_strings.experienceTaxonomy}}</div>\n                    <button mat-raised-button class=\"play\" color=\"primary\" type=\"reset\" (click)=\"loadDefault()\">\n                        {{app_strings.playWithIt}}\n                    </button>\n                </div>\n            </div>\n        </div>\u200B\n\n    </div>\n</div>", styles: [".dialog .mat-dialog-title{padding:10px 20px;margin-bottom:0;background:#EEEEEE}.dialog .mat-form-field{width:90%;padding:0;background:#FFFFFF;margin:20px;border-radius:2px}.dialog .actions{display:flex;flex-direction:row;justify-content:space-between;padding:0 20px 20px}.dialog .mat-error{padding:0 25px;margin-top:-10px}.flex-column{flex-direction:column}.flex-row{flex-direction:row}.flex-row-reverse{flex-direction:row-reverse}.flex-1{flex:1}.flex-2{flex:2}.flex{display:flex}.padding-s{padding:8px}.container{padding:1em}.side,.or{float:left;text-align:center}.side{width:40%}.or{position:relative;width:20%}.or-line{float:left;width:50%;border-right:1px solid rgb(68,50,50);height:100%}.or-label{background:#FFFFFF;color:#000;height:1em;left:50%;margin-left:-1.25em;margin-top:2em;padding:.5em;position:absolute;text-transform:uppercase;width:1em}.play{padding:20px;margin:20% auto auto;display:flex}.dialog-title{align-items:center;display:flex}::ng-deep .mat-form-field-wrapper{padding:0}@media only screen and (max-width: 1024px){::ng-deep .cdk-overlay-pane{width:70%!important;height:60%!important}}@media only screen and (max-width: 1024px){mat-icon{font-size:20px;width:1.25em;height:1.25em}.pointer .mat-raised-button{min-width:auto;padding:0 .5em;line-height:2em}.dialog.flex{height:calc(100% - 16vh);font-size:12px}.dialog.flex mat-form-field{margin:1em}.dialog .actions{padding:0}.dialog .actions button{font-size:12px;line-height:2.5em;margin:0 5px}.dialog-title{font-size:14px;height:1em}.play{padding:.6em;font-size:12px}}\n"], dependencies: [{ kind: "directive", type: i1$3.ɵNgNoValidate, selector: "form:not([ngNoForm]):not([ngNativeValidate])" }, { kind: "directive", type: i1$3.DefaultValueAccessor, selector: "input:not([type=checkbox])[formControlName],textarea[formControlName],input:not([type=checkbox])[formControl],textarea[formControl],input:not([type=checkbox])[ngModel],textarea[ngModel],[ngDefaultControl]" }, { kind: "directive", type: i1$3.NgControlStatus, selector: "[formControlName],[ngModel],[formControl]" }, { kind: "directive", type: i1$3.NgControlStatusGroup, selector: "[formGroupName],[formArrayName],[ngModelGroup],[formGroup],form:not([ngNoForm]),[ngForm]" }, { kind: "directive", type: i1$3.FormGroupDirective, selector: "[formGroup]", inputs: ["formGroup"], outputs: ["ngSubmit"], exportAs: ["ngForm"] }, { kind: "directive", type: i1$3.FormControlName, selector: "[formControlName]", inputs: ["formControlName", "disabled", "ngModel"], outputs: ["ngModelChange"] }, { kind: "component", type: i5$1.MatFormField, selector: "mat-form-field", inputs: ["color", "appearance", "hideRequiredMarker", "hintLabel", "floatLabel"], exportAs: ["matFormField"] }, { kind: "directive", type: i5$1.MatLabel, selector: "mat-label" }, { kind: "component", type: i6.MatButton, selector: "button[mat-button], button[mat-raised-button], button[mat-icon-button],             button[mat-fab], button[mat-mini-fab], button[mat-stroked-button],             button[mat-flat-button]", inputs: ["disabled", "disableRipple", "color"], exportAs: ["matButton"] }, { kind: "directive", type: i7.MatInput, selector: "input[matInput], textarea[matInput], select[matNativeControl],      input[matNativeControl], textarea[matNativeControl]", inputs: ["disabled", "id", "placeholder", "name", "required", "type", "errorStateMatcher", "aria-describedby", "value", "readonly"], exportAs: ["matInput"] }, { kind: "component", type: i8$1.MatIcon, selector: "mat-icon", inputs: ["color", "inline", "svgIcon", "fontSet", "fontIcon"], exportAs: ["matIcon"] }, { kind: "directive", type: i1$2.MatDialogTitle, selector: "[mat-dialog-title], [matDialogTitle]", inputs: ["id"], exportAs: ["matDialogTitle"] }] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "14.3.0", ngImport: i0, type: ConnectorComponent, decorators: [{
            type: Component,
            args: [{ selector: 'lib-connector', template: "<div class=\"flex flex-1 flex-row-reverse pointer\">\n    <button mat-raised-button color=\"default\" (click)=\"dialogClose()\" >\n        <mat-icon mat-raised-button >{{app_strings.close}}</mat-icon>\n    </button>\n</div>\n<div class=\"dialog flex\">\n    <div class=\"flex flex-1 flex-row\">\n        <div class=\"container flex flex-1\">\n            <div class=\"side flex flex-1\">\n                <div class=\"'flex flex-2 padding-s\">\n                    <div class=\"dialog-title\" mat-dialog-title>{{app_strings.newConnection}}</div>\n                    <form [formGroup]=\"connectorForm\" novalidate (ngSubmit)=\"saveConnection()\">\n                        <mat-form-field appearance=\"outline\">\n                            <mat-label>{{app_strings.endPoint}}</mat-label>\n                            <input matInput type=\"url\" formControlName=\"endpoint\" placeholder=\"{{app_strings.endPoint}}\" />\n                        </mat-form-field>\n                        <mat-form-field appearance=\"outline\">\n                            <mat-label>{{app_strings.token}}</mat-label>\n                            <input matInput formControlName=\"token\" placeholder=\"{{app_strings.token}}\" />\n                        </mat-form-field>\n                        <mat-form-field appearance=\"outline\">\n                            <mat-label>{{app_strings.enterFrameworkName}}</mat-label>\n                            <input matInput formControlName=\"frameworkName\" placeholder=\"{{app_strings.frameworkName}}\" />\n                        </mat-form-field>\n                        <footer class=\"actions\">\n                            <button mat-raised-button color=\"default\" type=\"reset\"\n                                (click)=\"dialogClose()\">{{app_strings.cancel}}</button>\n                            <button mat-raised-button color=\"default\" type=\"reset\" (click)=\"clear()\">{{app_strings.clear}}</button>\n                            <button mat-raised-button color=\"primary\" type=\"submit\" cdkFocusInitial>{{app_strings.update}}</button>\n                        </footer>\n                    </form>\n                </div>\n            </div>\n            <div class=\"or\">\n                <div class=\"or-line\"></div>\n                <div class=\"or-label\">{{app_strings.or}}</div>\n            </div>\n            <div class=\"side flex flex-1\">\n                <div class=\"'flex flex-1 padding-s\">\n                    <div class=\"dialog-title\" mat-dialog-title>{{app_strings.experienceTaxonomy}}</div>\n                    <button mat-raised-button class=\"play\" color=\"primary\" type=\"reset\" (click)=\"loadDefault()\">\n                        {{app_strings.playWithIt}}\n                    </button>\n                </div>\n            </div>\n        </div>\u200B\n\n    </div>\n</div>", styles: [".dialog .mat-dialog-title{padding:10px 20px;margin-bottom:0;background:#EEEEEE}.dialog .mat-form-field{width:90%;padding:0;background:#FFFFFF;margin:20px;border-radius:2px}.dialog .actions{display:flex;flex-direction:row;justify-content:space-between;padding:0 20px 20px}.dialog .mat-error{padding:0 25px;margin-top:-10px}.flex-column{flex-direction:column}.flex-row{flex-direction:row}.flex-row-reverse{flex-direction:row-reverse}.flex-1{flex:1}.flex-2{flex:2}.flex{display:flex}.padding-s{padding:8px}.container{padding:1em}.side,.or{float:left;text-align:center}.side{width:40%}.or{position:relative;width:20%}.or-line{float:left;width:50%;border-right:1px solid rgb(68,50,50);height:100%}.or-label{background:#FFFFFF;color:#000;height:1em;left:50%;margin-left:-1.25em;margin-top:2em;padding:.5em;position:absolute;text-transform:uppercase;width:1em}.play{padding:20px;margin:20% auto auto;display:flex}.dialog-title{align-items:center;display:flex}::ng-deep .mat-form-field-wrapper{padding:0}@media only screen and (max-width: 1024px){::ng-deep .cdk-overlay-pane{width:70%!important;height:60%!important}}@media only screen and (max-width: 1024px){mat-icon{font-size:20px;width:1.25em;height:1.25em}.pointer .mat-raised-button{min-width:auto;padding:0 .5em;line-height:2em}.dialog.flex{height:calc(100% - 16vh);font-size:12px}.dialog.flex mat-form-field{margin:1em}.dialog .actions{padding:0}.dialog .actions button{font-size:12px;line-height:2.5em;margin:0 5px}.dialog-title{font-size:14px;height:1em}.play{padding:.6em;font-size:12px}}\n"] }]
        }], ctorParameters: function () { return [{ type: i1$2.MatDialogRef }, { type: undefined, decorators: [{
                    type: Inject,
                    args: [MAT_DIALOG_DATA]
                }] }, { type: FrameworkService }, { type: LocalConnectionService }, { type: i1$3.FormBuilder }]; } });

class ApprovalService {
    constructor(frameworkService, http) {
        this.frameworkService = frameworkService;
        this.http = http;
        this.approvalListSubject = new BehaviorSubject([]);
        this.environment = this.frameworkService.getEnviroment();
    }
    createApproval(req) {
        req.state = APPROVAL.INITIATE;
        req.action = APPROVAL.ACTION;
        req.serviceName = APPROVAL.SERVICE_NAME;
        return this.http.post(`${APPROVAL.CREATE}`, req);
    }
    getApprovalList(req) {
        return this.http.post(`${APPROVAL.SEARCH}`, req);
    }
    getWorkflowDetails(id) {
        return this.http.get(`${APPROVAL.READ}/${id}`);
    }
    updateWorkFlowApproval(req) {
        return this.http.patch(`${APPROVAL.UPDATE}`, req);
    }
    removeDuplicates(arr) {
        return [...new Set(arr)];
    }
    setApprovalList(list) {
        this.approvalListSubject.next(list);
    }
    getUpdateList() {
        return this.approvalListSubject.asObservable();
    }
}
ApprovalService.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "14.3.0", ngImport: i0, type: ApprovalService, deps: [{ token: FrameworkService }, { token: i1.HttpClient }], target: i0.ɵɵFactoryTarget.Injectable });
ApprovalService.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "14.3.0", ngImport: i0, type: ApprovalService, providedIn: 'root' });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "14.3.0", ngImport: i0, type: ApprovalService, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root'
                }]
        }], ctorParameters: function () { return [{ type: FrameworkService }, { type: i1.HttpClient }]; } });

/* eslint-disable */
class ConnectorService {
    // assuming following structure
    // {
    //   'box1': {
    //     source: ElementRef,
    //     lines: [
    //       {
    //         target:' card2 of box1', 
    //         line: '_line prototype object'
    //       }
    //     ]
    //   }
    // }
    constructor(frameworkService) {
        this.frameworkService = frameworkService;
        this.connectorMap = {};
        // this.frameworkService.list.forEach((list, index)=> {
        //   this.connectorMap['box'+list.index]= {}
        // })
        console.log('connectorMap -------', this.connectorMap);
    }
    _drawLine(source, target, options = defaultConfig, sourceContainerId = undefined, targetContainerId = undefined) {
        console.log('sourceContainerId ::', sourceContainerId);
        console.log('targetContainerId ::', targetContainerId);
        const _options = { ...defaultConfig, ...options };
        let _line;
        if (Array.isArray(target)) {
            // target.forEach((_target) => {
            //   _line = this.renderLine(source, _target, _options);
            // });
            let connectedDots = [];
            target.forEach((_target) => {
                const tempLine = this.renderLine(source, _target, _options);
                connectedDots.push({
                    target: _target,
                    line: tempLine
                });
                if (sourceContainerId) {
                    document.querySelector(sourceContainerId) && document.querySelector(sourceContainerId).addEventListener('scroll', () => {
                        try {
                            tempLine && tempLine.position();
                        }
                        catch (e) {
                            // console.log('Error')
                        }
                    }, true);
                }
                if (targetContainerId) {
                    document.querySelector(targetContainerId) && document.querySelector(targetContainerId).addEventListener('scroll', () => {
                        try {
                            tempLine && tempLine.position();
                        }
                        catch (e) {
                            // console.log('Error')
                        }
                    }, true);
                }
                // tempLine.show('draw')
            });
            return connectedDots;
        }
        else {
            _line = this.renderLine(source, target, _options);
        }
    }
    renderLine(source, target, options) {
        let _options = {
            animOptions: { duration: 2000, timing: 'linear' },
            hide: true,
            // startSocketGravity: 50,
            // endSocketGravity: [-30, 50]
        };
        let _line;
        if (target.targetType === 'id') {
            _line = new LeaderLine(source, document.getElementById(target.target), _options);
        }
        else {
            _line = new LeaderLine(source, target.target, _options);
        }
        _line.endPlugOutline = true;
        _line.startPlugOutline = true;
        // _line.positionByWindowResize = false;
        _line.setOptions(options);
        _line.show('draw');
        // this.elmWrapper.appendChild(document.querySelector('.leader-line:last-of-type'));
        // this.position(_line)
        return _line;
    }
    updateConnectorsMap(map) {
        this.connectorMap = map;
    }
    position(line) {
        this.elmWrapper.style.transform = 'none';
        var rectWrapper = this.elmWrapper.getBoundingClientRect();
        // Move to the origin of coordinates as the document
        this.elmWrapper.style.transform = 'translate(' +
            ((rectWrapper.left + pageXOffset) * -1) + 'px, ' +
            ((rectWrapper.top + pageYOffset) * -1) + 'px)';
        line.position();
    }
    removeAllLines() {
        if (this.connectorMap) {
            for (const key in this.connectorMap) {
                // Remove all n-1 lines and keep only current selection, also clear n+1 lines
                if (this.connectorMap[key] && this.connectorMap[key].lines && this.connectorMap[key].lines.length > 0) {
                    const lines = this.connectorMap[key].lines;
                    lines.forEach(async (element, index) => {
                        await element.line && element.line.remove();
                        lines.splice(index, 1);
                    });
                    this.connectorMap[key].lines = lines;
                }
            }
        }
        // to reset connector map after clearing all the lines
        this.updateConnectorsMap({});
    }
}
ConnectorService.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "14.3.0", ngImport: i0, type: ConnectorService, deps: [{ token: FrameworkService }], target: i0.ɵɵFactoryTarget.Injectable });
ConnectorService.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "14.3.0", ngImport: i0, type: ConnectorService });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "14.3.0", ngImport: i0, type: ConnectorService, decorators: [{
            type: Injectable
        }], ctorParameters: function () { return [{ type: FrameworkService }]; } });

class ConfirmDialogBoxComponent {
    constructor(dialogRef, data, frameworkService) {
        this.dialogRef = dialogRef;
        this.data = data;
        this.frameworkService = frameworkService;
    }
    ngOnInit() { }
    removeAssociation() {
        this.frameworkService.isTermExistRemove(this.data);
        this.dialogRef.close();
    }
}
ConfirmDialogBoxComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "14.3.0", ngImport: i0, type: ConfirmDialogBoxComponent, deps: [{ token: i1$2.MatDialogRef }, { token: MAT_DIALOG_DATA }, { token: FrameworkService }], target: i0.ɵɵFactoryTarget.Component });
ConfirmDialogBoxComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "14.3.0", type: ConfirmDialogBoxComponent, selector: "confirm-dialog-box", ngImport: i0, template: "<div mat-dialog-content>\n  <h4>Are you sure want to remove Association?</h4>\n</div>\n<div mat-dialog-actions>\n  <button mat-raised-button mat-dialog-close >No</button>\n  <button mat-raised-button color=\"primary\" cdkFocusInitial (click)=\"removeAssociation()\">yes</button>\n</div>\n", styles: [".mat-dialog-actions{justify-content:right}\n"], dependencies: [{ kind: "component", type: i6.MatButton, selector: "button[mat-button], button[mat-raised-button], button[mat-icon-button],             button[mat-fab], button[mat-mini-fab], button[mat-stroked-button],             button[mat-flat-button]", inputs: ["disabled", "disableRipple", "color"], exportAs: ["matButton"] }, { kind: "directive", type: i1$2.MatDialogClose, selector: "[mat-dialog-close], [matDialogClose]", inputs: ["aria-label", "type", "mat-dialog-close", "matDialogClose"], exportAs: ["matDialogClose"] }, { kind: "directive", type: i1$2.MatDialogContent, selector: "[mat-dialog-content], mat-dialog-content, [matDialogContent]" }, { kind: "directive", type: i1$2.MatDialogActions, selector: "[mat-dialog-actions], mat-dialog-actions, [matDialogActions]", inputs: ["align"] }] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "14.3.0", ngImport: i0, type: ConfirmDialogBoxComponent, decorators: [{
            type: Component,
            args: [{ selector: 'confirm-dialog-box', template: "<div mat-dialog-content>\n  <h4>Are you sure want to remove Association?</h4>\n</div>\n<div mat-dialog-actions>\n  <button mat-raised-button mat-dialog-close >No</button>\n  <button mat-raised-button color=\"primary\" cdkFocusInitial (click)=\"removeAssociation()\">yes</button>\n</div>\n", styles: [".mat-dialog-actions{justify-content:right}\n"] }]
        }], ctorParameters: function () { return [{ type: i1$2.MatDialogRef }, { type: undefined, decorators: [{
                    type: Inject,
                    args: [MAT_DIALOG_DATA]
                }] }, { type: FrameworkService }]; } });

class TermCardComponent {
    constructor(frameworkService, localConnectionService, approvalService, dialog) {
        this.frameworkService = frameworkService;
        this.localConnectionService = localConnectionService;
        this.approvalService = approvalService;
        this.dialog = dialog;
        this.isApprovalRequired = false;
        this.approvalList = [];
        this.app_strings = labels;
        this.isSelected = new EventEmitter();
        this.selectedCard = new EventEmitter();
    }
    set data(value) {
        this._data = value;
        //  if(this._data)
        //    this.createTimeline(this._data[0].id)
        this._data.children.highlight = false;
    }
    get data() {
        return this._data;
    }
    ngOnInit() {
        this.isApprovalRequired = this.localConnectionService.getConfigInfo().isApprovalRequired;
        // console.log(this._data)
        this.updateApprovalStatus();
    }
    cardClicked(data, cardRef) {
        // this.data.selected = true
        if (this.frameworkService.isLastColumn(this.data.category)) {
            return;
        }
        this.isSelected.emit({ element: this.data.children, isSelected: !data.selected });
        this.frameworkService.currentSelection.next({ type: this.data.category, data: data.children, cardRef });
    }
    handleProductClick(term, event) {
        this.selectedCard.emit({ term: term, checked: event.checked });
    }
    updateApprovalStatus() {
        const id = this._data.children.identifier;
        this.approvalService.getUpdateList().subscribe((list) => {
            this.approvalList = list.map(item => item.identifier);
            if (this.approvalList) {
                if (this.approvalList.includes(id)) {
                    this._data.children.highlight = true;
                }
            }
        });
    }
    getColor(indexClass, cardRef, property, data) {
        let config = this.frameworkService.getConfig(data.category);
        if (cardRef.classList.contains('selected') && property === 'bgColor') {
            return config.color;
        }
        if (property === 'border') {
            let borderColor;
            if (cardRef.classList.contains((indexClass).toString())) {
                borderColor = "8px solid" + config.color;
            }
            return borderColor;
        }
    }
    remove(id) {
        this.dialog.open(ConfirmDialogBoxComponent, {
            data: id,
            width: '400px',
            panelClass: 'custom-dialog-container'
        });
        // this.frameworkService.isTermExistRemove(id);
    }
}
TermCardComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "14.3.0", ngImport: i0, type: TermCardComponent, deps: [{ token: FrameworkService }, { token: LocalConnectionService }, { token: ApprovalService }, { token: i1$2.MatDialog }], target: i0.ɵɵFactoryTarget.Component });
TermCardComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "14.3.0", type: TermCardComponent, selector: "lib-term-card", inputs: { data: "data" }, outputs: { isSelected: "isSelected", selectedCard: "selectedCard" }, ngImport: i0, template: "<ng-container [ngSwitch]=\"( (data && data?.cardSubType) || 'cardMinimal')\">\n    <ng-container *ngSwitchCase=\"'standard'\" [ngTemplateOutlet]=\"cardStandard\"></ng-container>\n    <ng-container *ngSwitchCase=\"'space-saving'\" [ngTemplateOutlet]=\"cardSpaceSaving\"></ng-container>\n    <ng-container *ngSwitchDefault [ngTemplateOutlet]=\"cardMinimal\"></ng-container>\n</ng-container>\n\n<ng-template #cardMinimal>\n    <div #cardRef class=\"term-card clickable {{data.index}}\" (click)=\"cardClicked(data, cardRef)\"\n        [ngClass]=\"[data.children.selected?'selected':'', data.children.approvalStatus === 'Draft'? 'inDraft':'',\n    data.children.associationProperties?.approvalStatus === 'Draft' && isApprovalRequired && !approvalList.length || data.children.highlight && isApprovalRequired ? 'inAssociationDraft':'']\"\n        id=\"{{data.children.name}}\"\n        [ngStyle]=\"{'background-color':getColor(data.index,cardRef,'bgColor',data),'border-left': getColor(data.index,cardRef,'border',data)}\">\n        <!-- (click)=\"data.selected=!data.selected\" -->\n        <div class=\"term-card-parent\">\n            <!-- <Below element is to show id on top left of the card> -->\n            <!-- <div class=\"id\" [hidden]=\"true\">{{data.children.code}}</div> -->\n            <div class=\"term-card-content\">\n                <div class=\"card-title\">{{data.children.name}}</div>\n                <!-- <span>++{{data.children.selected}}+++</span>\n                <span>=={{data.children.status}}==</span>  -->\n                <div class=\"card-description\">{{data.children.description}} </div>\n                \n            </div>\n        </div>\n        <button mat-icon-button  (click)=\"$event.stopPropagation()\" [matMenuTriggerFor]=\"menu\" aria-label=\"Remove terms Association\">\n            <mat-icon>more_vert</mat-icon>\n          </button>\n          <mat-menu #menu=\"matMenu\" class=\"term-dropdown\">\n            <button mat-menu-item (click)=\"remove(data.children.identifier)\">\n              <mat-icon>delete</mat-icon>\n              <span>Remove</span>\n            </button>\n        </mat-menu>\n        <!-- <p>{{data.children.approvalStatus}}, {{data.children.associationProperties?.approvalStatus}}</p> -->\n        <!-- *ngIf=\"!data.isViewOnly && data.children.approvalStatus === 'Draft' && isApprovalRequired\" -->\n        <div class=\"term-card-checkbox\">\n            <mat-checkbox color=\"primary\" *ngIf=\"data.children.approvalStatus === 'Draft' && isApprovalRequired && !approvalList.length || \n            data.children.associationProperties?.approvalStatus === 'Draft' && isApprovalRequired && !approvalList.length ||\n            data.children.highlight && isApprovalRequired\" [checked]=\"data.children.highlight\" class=\"termSelection\"\n                (change)=\"handleProductClick(data.children, $event)\" (click)=\"$event.stopPropagation()\"></mat-checkbox>\n            <!-- data.children.highlight?'highlight':'' -->\n            <mat-icon color=\"primary\" class=\"approve-flag\"\n                *ngIf=\"data.children.highlight && isApprovalRequired\">{{app_strings.flag}}</mat-icon>\n        </div>\n    </div>\n</ng-template>\n\n<ng-template #cardStandard>\n    <div>\n        {{data.children.name}}\n    </div>\n    <div>\n        {{data.children.description}}\n    </div>\n</ng-template>\n\n<ng-template #cardSpaceSaving>\n    <div>\n        {{data.children.name}}\n    </div>\n</ng-template>", styles: [".term-card{border:1px solid #EEEEEE;padding:.5em;margin:0 0 1em;background-color:#fff;border-radius:8px;overflow:hidden;position:relative;z-index:45;box-shadow:#0000001a 0 1px 3px,#0000000f 0 1px 2px}.term-card .termSelection{position:absolute;right:10px;top:10px}.term-card .term-card-parent{display:flex;width:90%}.term-card .term-card-parent .term-card-content{white-space:initial;position:relative;margin-left:.5em}.term-card .term-card-parent .term-card-content .card-title{margin-bottom:.5em}.term-card .term-card-parent .term-card-content .card-description{opacity:.5}.term-card .term-card-checkbox{width:10%}.term-card .mat-menu-trigger{position:absolute;top:0;right:0;z-index:1000}.term-card.selected{color:#fff;border-style:none}.clickable{cursor:pointer}.approve-flag{position:absolute;right:5px;top:35px;font-size:24px}.mat-menu-item{width:200px}::ng-deep .cdk-overlay-pane:has(.mat-menu-panel.term-dropdown){width:200px}.mat-menu-panel .term-dropdown{padding:10px 0}::ng-deep .custom-dialog-container .mat-dialog-container{background:#fff;padding:20px}\n"], dependencies: [{ kind: "directive", type: i5.NgClass, selector: "[ngClass]", inputs: ["class", "ngClass"] }, { kind: "directive", type: i5.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { kind: "directive", type: i5.NgTemplateOutlet, selector: "[ngTemplateOutlet]", inputs: ["ngTemplateOutletContext", "ngTemplateOutlet", "ngTemplateOutletInjector"] }, { kind: "directive", type: i5.NgStyle, selector: "[ngStyle]", inputs: ["ngStyle"] }, { kind: "directive", type: i5.NgSwitch, selector: "[ngSwitch]", inputs: ["ngSwitch"] }, { kind: "directive", type: i5.NgSwitchCase, selector: "[ngSwitchCase]", inputs: ["ngSwitchCase"] }, { kind: "directive", type: i5.NgSwitchDefault, selector: "[ngSwitchDefault]" }, { kind: "component", type: i6.MatButton, selector: "button[mat-button], button[mat-raised-button], button[mat-icon-button],             button[mat-fab], button[mat-mini-fab], button[mat-stroked-button],             button[mat-flat-button]", inputs: ["disabled", "disableRipple", "color"], exportAs: ["matButton"] }, { kind: "component", type: i8$1.MatIcon, selector: "mat-icon", inputs: ["color", "inline", "svgIcon", "fontSet", "fontIcon"], exportAs: ["matIcon"] }, { kind: "component", type: i8$2.MatCheckbox, selector: "mat-checkbox", inputs: ["disableRipple", "color", "tabIndex"], exportAs: ["matCheckbox"] }, { kind: "component", type: i9$1.MatMenu, selector: "mat-menu", exportAs: ["matMenu"] }, { kind: "component", type: i9$1.MatMenuItem, selector: "[mat-menu-item]", inputs: ["disabled", "disableRipple", "role"], exportAs: ["matMenuItem"] }, { kind: "directive", type: i9$1.MatMenuTrigger, selector: "[mat-menu-trigger-for], [matMenuTriggerFor]", exportAs: ["matMenuTrigger"] }] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "14.3.0", ngImport: i0, type: TermCardComponent, decorators: [{
            type: Component,
            args: [{ selector: 'lib-term-card', template: "<ng-container [ngSwitch]=\"( (data && data?.cardSubType) || 'cardMinimal')\">\n    <ng-container *ngSwitchCase=\"'standard'\" [ngTemplateOutlet]=\"cardStandard\"></ng-container>\n    <ng-container *ngSwitchCase=\"'space-saving'\" [ngTemplateOutlet]=\"cardSpaceSaving\"></ng-container>\n    <ng-container *ngSwitchDefault [ngTemplateOutlet]=\"cardMinimal\"></ng-container>\n</ng-container>\n\n<ng-template #cardMinimal>\n    <div #cardRef class=\"term-card clickable {{data.index}}\" (click)=\"cardClicked(data, cardRef)\"\n        [ngClass]=\"[data.children.selected?'selected':'', data.children.approvalStatus === 'Draft'? 'inDraft':'',\n    data.children.associationProperties?.approvalStatus === 'Draft' && isApprovalRequired && !approvalList.length || data.children.highlight && isApprovalRequired ? 'inAssociationDraft':'']\"\n        id=\"{{data.children.name}}\"\n        [ngStyle]=\"{'background-color':getColor(data.index,cardRef,'bgColor',data),'border-left': getColor(data.index,cardRef,'border',data)}\">\n        <!-- (click)=\"data.selected=!data.selected\" -->\n        <div class=\"term-card-parent\">\n            <!-- <Below element is to show id on top left of the card> -->\n            <!-- <div class=\"id\" [hidden]=\"true\">{{data.children.code}}</div> -->\n            <div class=\"term-card-content\">\n                <div class=\"card-title\">{{data.children.name}}</div>\n                <!-- <span>++{{data.children.selected}}+++</span>\n                <span>=={{data.children.status}}==</span>  -->\n                <div class=\"card-description\">{{data.children.description}} </div>\n                \n            </div>\n        </div>\n        <button mat-icon-button  (click)=\"$event.stopPropagation()\" [matMenuTriggerFor]=\"menu\" aria-label=\"Remove terms Association\">\n            <mat-icon>more_vert</mat-icon>\n          </button>\n          <mat-menu #menu=\"matMenu\" class=\"term-dropdown\">\n            <button mat-menu-item (click)=\"remove(data.children.identifier)\">\n              <mat-icon>delete</mat-icon>\n              <span>Remove</span>\n            </button>\n        </mat-menu>\n        <!-- <p>{{data.children.approvalStatus}}, {{data.children.associationProperties?.approvalStatus}}</p> -->\n        <!-- *ngIf=\"!data.isViewOnly && data.children.approvalStatus === 'Draft' && isApprovalRequired\" -->\n        <div class=\"term-card-checkbox\">\n            <mat-checkbox color=\"primary\" *ngIf=\"data.children.approvalStatus === 'Draft' && isApprovalRequired && !approvalList.length || \n            data.children.associationProperties?.approvalStatus === 'Draft' && isApprovalRequired && !approvalList.length ||\n            data.children.highlight && isApprovalRequired\" [checked]=\"data.children.highlight\" class=\"termSelection\"\n                (change)=\"handleProductClick(data.children, $event)\" (click)=\"$event.stopPropagation()\"></mat-checkbox>\n            <!-- data.children.highlight?'highlight':'' -->\n            <mat-icon color=\"primary\" class=\"approve-flag\"\n                *ngIf=\"data.children.highlight && isApprovalRequired\">{{app_strings.flag}}</mat-icon>\n        </div>\n    </div>\n</ng-template>\n\n<ng-template #cardStandard>\n    <div>\n        {{data.children.name}}\n    </div>\n    <div>\n        {{data.children.description}}\n    </div>\n</ng-template>\n\n<ng-template #cardSpaceSaving>\n    <div>\n        {{data.children.name}}\n    </div>\n</ng-template>", styles: [".term-card{border:1px solid #EEEEEE;padding:.5em;margin:0 0 1em;background-color:#fff;border-radius:8px;overflow:hidden;position:relative;z-index:45;box-shadow:#0000001a 0 1px 3px,#0000000f 0 1px 2px}.term-card .termSelection{position:absolute;right:10px;top:10px}.term-card .term-card-parent{display:flex;width:90%}.term-card .term-card-parent .term-card-content{white-space:initial;position:relative;margin-left:.5em}.term-card .term-card-parent .term-card-content .card-title{margin-bottom:.5em}.term-card .term-card-parent .term-card-content .card-description{opacity:.5}.term-card .term-card-checkbox{width:10%}.term-card .mat-menu-trigger{position:absolute;top:0;right:0;z-index:1000}.term-card.selected{color:#fff;border-style:none}.clickable{cursor:pointer}.approve-flag{position:absolute;right:5px;top:35px;font-size:24px}.mat-menu-item{width:200px}::ng-deep .cdk-overlay-pane:has(.mat-menu-panel.term-dropdown){width:200px}.mat-menu-panel .term-dropdown{padding:10px 0}::ng-deep .custom-dialog-container .mat-dialog-container{background:#fff;padding:20px}\n"] }]
        }], ctorParameters: function () { return [{ type: FrameworkService }, { type: LocalConnectionService }, { type: ApprovalService }, { type: i1$2.MatDialog }]; }, propDecorators: { data: [{
                type: Input
            }], isSelected: [{
                type: Output
            }], selectedCard: [{
                type: Output
            }] } });

class TaxonomyColumnViewComponent {
    constructor(frameworkService, connectorService, approvalService) {
        this.frameworkService = frameworkService;
        this.connectorService = connectorService;
        this.approvalService = approvalService;
        this.connectorMapping = {};
        this.updateTaxonomyTerm = new EventEmitter(true);
        this.updateTermList = new EventEmitter();
        this.cardsCount = new EventEmitter();
        this.columnData = [];
        this.childSubscription = null;
        this.newTermSubscription = null;
        this.termshafall = [];
    }
    ngOnChanges(changes) { }
    ngOnInit() {
        this.subscribeEvents();
        if (this.column.index === 1) {
            this.approvalService.getUpdateList().subscribe((list) => {
                this.approvalTerm = list.filter(item => this.column.code === item.category);
                if (this.approvalTerm) {
                    this.approvalTerm.forEach((term, i) => {
                        this.column.children.forEach((lel, j) => {
                            if (lel.identifier === term.identifier) {
                                if (!this.isExists(term)) {
                                    this.termshafall.push(lel);
                                }
                            }
                        });
                    });
                    // this.termshafall = [...this.termshafall]
                    this.column.children.forEach((tr, i) => {
                        if (!this.isExists(tr)) {
                            this.termshafall.push(tr);
                        }
                    });
                    this.columnData = this.termshafall;
                    this.cardsCount.emit({ category: this.columnData[0].category, count: this.columnData.length });
                }
            });
        }
        this.connectorMapping = this.connectorService.connectorMap;
        // this.frameworkService.isDataUpdated.subscribe(() => {
        //   this.ngOnInit()
        // })
    }
    isExists(e) {
        let temp = [];
        return temp.includes(e.identifier);
        temp = this.termshafall.map(t => t.identifier);
    }
    /* istanbul ignore next */
    subscribeEvents() {
        if (this.childSubscription) {
            this.childSubscription.unsubscribe();
        }
        this.childSubscription = this.frameworkService.currentSelection.subscribe(e => {
            if (!e) {
                return;
            }
            else if (e.type === this.column.code) {
                this.updateTaxonomyTerm.emit({ isSelected: true, selectedTerm: e.data });
                this.columnData = (this.columnData || []).map(item => {
                    if (item.code === e.data.code) {
                        item.selected = true;
                    }
                    else {
                        item.selected = false;
                    }
                    return item;
                });
                this.setConnectors(e.cardRef, this.columnData, 'SINGLE');
                return;
                // console.log("SKIP: from subscription===>", "FOR " + this.category, e)
            }
            else {
                const next = this.frameworkService.getNextCategory(e.type);
                // // console.log("ADD: from subscription===>", "FOR " + this.category, next, this.children)
                if (next && next.code === this.column.code) {
                    //   const back = this.frameworkService.getPreviousCategory(this.column.code)
                    //   console.log('current Saved ===========>', this.frameworkService.getLocalTermsByCategory(this.column.code))
                    //   const localTerms = []
                    //   this.frameworkService.getLocalTermsByCategory(this.column.code).forEach(f => {
                    // debugger
                    //     const lst = back ? this.frameworkService.selectionList.get(back.code) : null; //can use current
                    //     if (lst && f.parent.identifier === lst.identifier) {
                    //       localTerms.push(f.term)
                    //     }
                    //   })
                    //   // get last parent and filter Above
                    //   this.columnData = [...localTerms, ...(e.data.children || [])]
                    //     .filter(x => {
                    //       return x.category == this.column.code
                    //     }).map(mer => {
                    //       //**read local children for next */
                    //       // const nextChildren = this.frameworkService.getLocalTermsByParent(this.column.code)
                    //       // console.log("Saved ======================+>", nextChildren)
                    //       /**reset Next level children */
                    //       // this.column.children = this.column.children.map(col => { col.selected = false; return col })
                    //       // mer.selected = false
                    //       mer.children = ([...this.column.children.filter(x => { return x.code === mer.code }).map(a => a.children)].shift() || [])
                    //       return mer
                    //     })
                    //   // this.updateTerms()
                    setTimeout(() => {
                        /* istanbul ignore next */
                        this.setConnectors(e.cardRef, next && next.index < this.column.index ? [] : this.columnData, 'ALL');
                    }, 100);
                    // console.log(this.columnData)
                }
                if (next && next.index < this.column.index) {
                    this.columnData = [];
                }
            }
        });
        if (this.newTermSubscription) {
            this.newTermSubscription.unsubscribe();
        }
        this.newTermSubscription = this.frameworkService.insertUpdateDeleteNotifier.subscribe(e => {
            if (e && e.action) {
                const next = this.frameworkService.getNextCategory(e.action);
                if (this.column.code === next.code && e.type === 'select') {
                    this.insertUpdateHandler(e, next);
                }
            }
        });
    }
    /* istanbul ignore next */
    insertUpdateHandler(e, next) {
        const back = this.frameworkService.getPreviousCategory(this.column.code);
        // console.log('current Saved ===========>', this.frameworkService.getLocalTermsByCategory(this.column.code))
        const localTerms = [];
        this.frameworkService.getLocalTermsByCategory(this.column.code).forEach(f => {
            const selectedParent = back ? this.frameworkService.selectionList.get(back.code) : null; //can use current
            if (selectedParent && ((f.parent.code === selectedParent.code) || (f.parent.identifier && (f.parent.identifier === selectedParent.identifier)))) {
                localTerms.push(f.term);
            }
        });
        // get last parent and filter Above
        this.columnData = [...localTerms, ...(e.data.children || [])]
            .filter(x => {
            return x.category == this.column.code;
        }).map(mer => {
            //**read local children for next */
            // const nextChildren = this.frameworkService.getLocalTermsByParent(this.column.code)
            // console.log("Saved ======================+>", nextChildren)
            /**reset Next level children */
            this.column.children = this.column.children.map(col => { col.selected = false; return col; });
            mer.selected = false;
            mer.children = ([...this.column.children.filter(x => { return x.code === mer.code; }).map(a => a.children)].shift() || []);
            return mer;
        });
        if (this.columnData.length > 0) {
            this.cardsCount.emit({ category: this.columnData[0].category, count: this.columnData.length });
        }
        else {
            this.cardsCount.emit({ category: this.column.code, count: 0 });
        }
        // this.updateTerms()
        // console.log(this.columnData)
    }
    updateSelection1(data) { }
    updateSelection(selection) {
        // console.log(selection.element.code, selection.isSelected)
        // if(this.column.code==='medium'){
        // console.log( this.column.children)
        // }
        // if (selection.element.category === this.column.code) {
        //   this.updateTaxonomyTerm.emit({ isSelected: selection.isSelected, selectedTerm: selection.element })
        // }
        // this.column.children = this.column.children.map(col => {
        //   if (col.code === selection.element.code) {
        //     col.selected = true
        //   } else {
        //     col.selected = false
        //   }
        //   return col
        // })
        console.log(selection);
    }
    get columnItems() {
        // const selected = this.column.children.filter(f => { return f.selected })
        // if (selected.length > 0) {
        //   const data = this.columnData.map(cd => {
        //     cd.selected = this.column.children.filter(f => { return cd.identifier === f.identifier }).map(s => s.selected)[0]
        //     return cd
        //   })
        //   return data
        // } else {
        return this.columnData;
        // }
    }
    /* istanbul ignore next */
    setConnectors(elementClicked, columnItem, mode) {
        this.removeConnectors(elementClicked, 'box' + (this.column.index - 1), this.column.index - 1);
        // console.log('mode', mode)
        // console.log('child ', columnItem)
        // console.log('elementClicked', elementClicked)
        // console.log('connectorMapping', this.connectorMapping)
        if (mode === 'ALL') {
            // let tempconnectorMapping = {}
            // this.connectorService.updateConnectorsMap(tempconnectorMapping)
            // {
            //   ['column' + (this.column.index- 1)]: ''
            // }
            const ids = columnItem.map((c, i) => {
                return this.column.code + 'Card' + (i + 1);
            });
            /* istanbul ignore  */
            this.connectorMapping['box' + (this.column.index - 1)] = { source: elementClicked, lines: (ids || []).map(id => { return { target: id, line: '', targetType: 'id' }; }) };
            this.connectorService.updateConnectorsMap(this.connectorMapping);
            // console.log('next', next)
            const connectionLines = this.connectorService._drawLine(this.connectorMapping['box' + (this.column.index - 1)].source, this.connectorMapping['box' + (this.column.index - 1)].lines, null, '#box' + (this.column.index - 1), '#box' + this.column.index);
            this.connectorMapping['box' + (this.column.index - 1)].lines = connectionLines;
            // console.log('this.connectorMapping :: ----------------------', this.connectorMapping)
            // if (cat.code === 'board') {
            //   this.connectorService._drawLine('box0card0', this.connectorMapping['board']['box0card0'], {
            //     startPlug: 'disc', endPlug: 'disc', color: 'black'
            //   }, 'box0', 'box1')
            // } else if (cat.code === 'medium') {
            //   this.connectorService._drawLine('box1card1', this.connectorMapping['medium']['box1card1'], {
            //     startPlug: 'disc', endPlug: 'disc', color: 'black'
            //   }, 'box0', 'box1')
            // } else if (cat.code === 'gradeLevel') {
            //   this.connectorService._drawLine('box2card7', this.connectorMapping['grade']['box2card7'], {
            //     startPlug: 'disc', endPlug: 'disc', color: 'black'
            //   }, 'box0', 'box1')
        }
        else {
            // console.log('inside else')
            // console.log('this.column', this.column)
            const item = this.column.children.findIndex(c => c.selected) + 1;
            if (this.column.index > 1) {
                this.connectorMapping['box' + (this.column.index - 1)].lines = [{ target: elementClicked, line: '', targetType: 'element' }];
                this.connectorService.updateConnectorsMap(this.connectorMapping);
                const connectionLines = this.connectorService._drawLine(this.connectorMapping['box' + (this.column.index - 1)].source, this.connectorMapping['box' + (this.column.index - 1)].lines, null, '#box' + (this.column.index - 1), '#box' + this.column.index);
                this.connectorMapping['box' + (this.column.index - 1)].lines = connectionLines;
                // console.log('this.connectorMapping :: ----------------------', this.connectorMapping)
            }
        }
        this.connectorService.updateConnectorsMap(this.connectorMapping);
    }
    /* istanbul ignore next */
    removeConnectors(currentElement, prevCol, currentIndex) {
        console.log('prevCol ------------', prevCol);
        if (this.connectorMapping) {
            for (const key in this.connectorMapping) {
                // Remove all n-1 lines and keep only current selection, also clear n+1 lines
                if (this.connectorMapping[key] && this.connectorMapping[key].lines && this.connectorMapping[key].lines.length > 0) {
                    const lines = this.connectorMapping[key].lines;
                    lines.forEach(async (element, index) => {
                        if (element != currentElement && prevCol == key) {
                            await element.line && element.line.remove();
                            lines.splice(index, 1);
                        }
                    });
                    this.connectorMapping[key].lines = lines;
                }
                // remove all n+2 lines, if clicks previous columns and tree was already drilled down
                let count = currentIndex + 2;
                let nextCol = `box${count}`;
                if (this.connectorMapping[nextCol] && this.connectorMapping[nextCol].lines && this.connectorMapping[nextCol].lines.length > 0) {
                    const lines = this.connectorMapping[nextCol].lines;
                    lines.forEach(async (element, index) => {
                        await element.line && element.line.remove();
                        lines.splice(index, 1);
                    });
                    this.connectorMapping[nextCol].lines = null;
                }
            }
        }
    }
    selectedCard(event) {
        this.updateTermList.emit(event);
    }
    ngOnDestroy() {
        if (this.childSubscription) {
            this.childSubscription.unsubscribe();
        }
    }
}
TaxonomyColumnViewComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "14.3.0", ngImport: i0, type: TaxonomyColumnViewComponent, deps: [{ token: FrameworkService }, { token: ConnectorService }, { token: ApprovalService }], target: i0.ɵɵFactoryTarget.Component });
TaxonomyColumnViewComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "14.3.0", type: TaxonomyColumnViewComponent, selector: "lib-taxonomy-column-view", inputs: { column: "column", containerId: "containerId" }, outputs: { updateTaxonomyTerm: "updateTaxonomyTerm", updateTermList: "updateTermList", cardsCount: "cardsCount" }, usesOnChanges: true, ngImport: i0, template: "<ng-container *ngIf=\"columnItems && columnItems.length > 0; else noDataTemplate;\">\n    <ng-container *ngFor=\"let child of columnItems; let j = index\">\n        <div #cardEle id=\"{{column.code}}Card{{j+1}}\" >\n            <lib-term-card\n                [data]=\"{'children': child, 'selected' : false, 'category':column.code, cardSubType: 'minimal', isViewOnly:false,'index':column.index}\"\n                (isSelected)=\"updateSelection1($event)\" (selectedCard)=\"selectedCard($event)\">\n            </lib-term-card>\n        </div>\n    </ng-container>\n</ng-container>\n<ng-template #noDataTemplate>\n    <!-- <div>No {{column.name}} associated</div> -->\n</ng-template>\n", styles: [".flex{display:flex}.w-full{width:100%}.mb1{margin-bottom:1em}flex-center{flex-wrap:nowrap;align-items:start;justify-content:center}.flex-1{flex:1}.felx-col{flex-direction:column}.padding-x2{padding:0 2.5em}.heightFix{height:100vh;overflow:hidden}.cat-columns:hover{overflow-y:scroll}.container{overflow-y:scroll;scrollbar-width:none;-ms-overflow-style:none}.container::-webkit-scrollbar{width:0;height:0}#this{display:none}#this:target{display:block}\n"], dependencies: [{ kind: "directive", type: i5.NgForOf, selector: "[ngFor][ngForOf]", inputs: ["ngForOf", "ngForTrackBy", "ngForTemplate"] }, { kind: "directive", type: i5.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { kind: "component", type: TermCardComponent, selector: "lib-term-card", inputs: ["data"], outputs: ["isSelected", "selectedCard"] }] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "14.3.0", ngImport: i0, type: TaxonomyColumnViewComponent, decorators: [{
            type: Component,
            args: [{ selector: 'lib-taxonomy-column-view', template: "<ng-container *ngIf=\"columnItems && columnItems.length > 0; else noDataTemplate;\">\n    <ng-container *ngFor=\"let child of columnItems; let j = index\">\n        <div #cardEle id=\"{{column.code}}Card{{j+1}}\" >\n            <lib-term-card\n                [data]=\"{'children': child, 'selected' : false, 'category':column.code, cardSubType: 'minimal', isViewOnly:false,'index':column.index}\"\n                (isSelected)=\"updateSelection1($event)\" (selectedCard)=\"selectedCard($event)\">\n            </lib-term-card>\n        </div>\n    </ng-container>\n</ng-container>\n<ng-template #noDataTemplate>\n    <!-- <div>No {{column.name}} associated</div> -->\n</ng-template>\n", styles: [".flex{display:flex}.w-full{width:100%}.mb1{margin-bottom:1em}flex-center{flex-wrap:nowrap;align-items:start;justify-content:center}.flex-1{flex:1}.felx-col{flex-direction:column}.padding-x2{padding:0 2.5em}.heightFix{height:100vh;overflow:hidden}.cat-columns:hover{overflow-y:scroll}.container{overflow-y:scroll;scrollbar-width:none;-ms-overflow-style:none}.container::-webkit-scrollbar{width:0;height:0}#this{display:none}#this:target{display:block}\n"] }]
        }], ctorParameters: function () { return [{ type: FrameworkService }, { type: ConnectorService }, { type: ApprovalService }]; }, propDecorators: { column: [{
                type: Input
            }], containerId: [{
                type: Input
            }], updateTaxonomyTerm: [{
                type: Output
            }], updateTermList: [{
                type: Output
            }], cardsCount: [{
                type: Output
            }] } });

class ActionBarComponent {
    constructor(frameworkService) {
        this.frameworkService = frameworkService;
        this.sendApproval = new EventEmitter();
        this.closeAction = new EventEmitter();
        this.app_strings = labels;
    }
    ngOnInit() {
    }
    SendForApproval() {
        this.sendApproval.emit('');
    }
    closeActionBar() {
        this.closeAction.emit('');
    }
    getApproveLevelText(res) {
        if (!res) {
            return;
        }
        return `Approve ${res.substr(res.lastIndexOf('_') + 1, res.length)}`;
    }
}
ActionBarComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "14.3.0", ngImport: i0, type: ActionBarComponent, deps: [{ token: FrameworkService }], target: i0.ɵɵFactoryTarget.Component });
ActionBarComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "14.3.0", type: ActionBarComponent, selector: "lib-action-bar", inputs: { actionType: "actionType", configType: "configType" }, outputs: { sendApproval: "sendApproval", closeAction: "closeAction" }, ngImport: i0, template: "<!-- *ngIf=\"configType !=='APPROVED' && actionType\" -->\n<mat-card class=\"action-bar\">\n    <div class=\"action-bar-buttons\">\n        <div>\n            <button mat-raised-button color=\"default\" (click)=\"closeActionBar()\">{{app_strings.cancel}}</button>\n        </div>\n        <div>\n            <button mat-raised-button color=\"primary\" (click)=\"SendForApproval()\">\n                {{actionType? getApproveLevelText(configType) :'Send for Approval'}}  \n           </button>\n        </div>\n    </div>\n        <!-- <button mat-raised-button color=\"primary\" (click)=\"publishFramwork()\">Publish</button> -->\n        <!-- <button *ngIf=\"actionType\" mat-button color=\"primary\">\n            <mat-icon color=\"primary\">flag</mat-icon>\n            Terms tobe Approve\n       </button> -->\n\n</mat-card>", styles: [".action-bar{position:fixed;bottom:0;left:0;width:100%;display:flex;justify-content:space-between;box-shadow:0 -1px 2px 1px #ccc;border-radius:0;height:10%;align-items:center;z-index:50;padding:0}.action-bar .mat-raised-button{padding:0 4em}.action-bar-buttons{display:flex;justify-content:space-between;width:100%;padding:0 10px}.action .mat-checkbox{margin-right:20px}@media only screen and (max-width: 1024px){.action-bar-buttons button{font-size:12px}.action-bar-buttons .mat-raised-button{padding:0 3em}}\n"], dependencies: [{ kind: "component", type: i6.MatButton, selector: "button[mat-button], button[mat-raised-button], button[mat-icon-button],             button[mat-fab], button[mat-mini-fab], button[mat-stroked-button],             button[mat-flat-button]", inputs: ["disabled", "disableRipple", "color"], exportAs: ["matButton"] }, { kind: "component", type: i6$1.MatCard, selector: "mat-card", exportAs: ["matCard"] }] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "14.3.0", ngImport: i0, type: ActionBarComponent, decorators: [{
            type: Component,
            args: [{ selector: 'lib-action-bar', template: "<!-- *ngIf=\"configType !=='APPROVED' && actionType\" -->\n<mat-card class=\"action-bar\">\n    <div class=\"action-bar-buttons\">\n        <div>\n            <button mat-raised-button color=\"default\" (click)=\"closeActionBar()\">{{app_strings.cancel}}</button>\n        </div>\n        <div>\n            <button mat-raised-button color=\"primary\" (click)=\"SendForApproval()\">\n                {{actionType? getApproveLevelText(configType) :'Send for Approval'}}  \n           </button>\n        </div>\n    </div>\n        <!-- <button mat-raised-button color=\"primary\" (click)=\"publishFramwork()\">Publish</button> -->\n        <!-- <button *ngIf=\"actionType\" mat-button color=\"primary\">\n            <mat-icon color=\"primary\">flag</mat-icon>\n            Terms tobe Approve\n       </button> -->\n\n</mat-card>", styles: [".action-bar{position:fixed;bottom:0;left:0;width:100%;display:flex;justify-content:space-between;box-shadow:0 -1px 2px 1px #ccc;border-radius:0;height:10%;align-items:center;z-index:50;padding:0}.action-bar .mat-raised-button{padding:0 4em}.action-bar-buttons{display:flex;justify-content:space-between;width:100%;padding:0 10px}.action .mat-checkbox{margin-right:20px}@media only screen and (max-width: 1024px){.action-bar-buttons button{font-size:12px}.action-bar-buttons .mat-raised-button{padding:0 3em}}\n"] }]
        }], ctorParameters: function () { return [{ type: FrameworkService }]; }, propDecorators: { actionType: [{
                type: Input
            }], configType: [{
                type: Input
            }], sendApproval: [{
                type: Output
            }], closeAction: [{
                type: Output
            }] } });

class TaxonomyViewComponent {
    constructor(frameworkService, localSvc, dialog, approvalService, router, _snackBar, connectorSvc) {
        this.frameworkService = frameworkService;
        this.localSvc = localSvc;
        this.dialog = dialog;
        this.approvalService = approvalService;
        this.router = router;
        this._snackBar = _snackBar;
        this.connectorSvc = connectorSvc;
        this.approvalList = [];
        this.isApprovalView = false;
        this.sentForApprove = new EventEmitter();
        this.mapping = {};
        this.heightLighted = [];
        this.localList = [];
        this.showPublish = false;
        this.newTermSubscription = null;
        this.loaded = {};
        this.showActionBar = false;
        this.approvalRequiredTerms = [];
        this.draftTerms = [];
        this.isLoading = false;
        this.categoryList = [];
        this.app_strings = labels;
    }
    ngOnInit() {
        this.init();
        this.showActionBar = this.isApprovalView ? true : false;
    }
    ngOnChanges() {
        this.draftTerms = this.approvalList;
    }
    init() {
        this.initConfig();
        this.frameworkService.getFrameworkInfo().subscribe(res => {
            this.connectorSvc.removeAllLines();
            this.updateLocalData();
            this.frameworkService.categoriesHash.value.forEach((cat) => {
                this.loaded[cat.code] = true;
            });
            this.isLoading = false;
            setTimeout(() => {
                this.drawHeaderLine(res.result.framework.categories.length);
            }, 500);
        });
    }
    updateTaxonomyTerm(data) {
        this.updateFinalList(data);
        this.updateSelection(data.selectedTerm.category, data.selectedTerm.code);
        // if (this.heightLighted.length === 0) {
        //   this.heightLighted.push(data.selectedTerm);
        //   return
        // }
        // this.heightLighted.every((cat, i) => {
        //   if (cat.element.category.toLowerCase() === data.selectedTerm.element.category.toLowerCase()) {
        //     this.heightLighted[i] = data.selectedTerm
        //     return false
        //   } else {
        //     this.heightLighted.push(data.selectedTerm);
        //     return false
        //   }
        // })
    }
    updateSelection(category, selectedTermCode) {
        this.frameworkService.list.get(category).children.map(item => {
            item.selected = selectedTermCode === item.code ? true : false;
            return item;
        });
    }
    //need to refactor at heigh level
    updateFinalList(data) {
        if (data.isSelected) {
            // data.selectedTerm.selected = data.isSelected
            this.frameworkService.selectionList.set(data.selectedTerm.category, data.selectedTerm);
            const next = this.frameworkService.getNextCategory(data.selectedTerm.category);
            if (next && next.code) {
                this.frameworkService.selectionList.delete(next.code);
            }
            // notify next
            this.frameworkService.insertUpdateDeleteNotifier.next({ action: data.selectedTerm.category, type: 'select', data: data.selectedTerm });
        }
        if (data.colIndex === 0 && !data.isSelected) {
            this.isLoading = true;
            setTimeout(() => {
                this.init();
            }, 3000);
        }
        // insert in colum 
        // if (data.parentData) {
        //   this.frameworkService.list.get(data.selectedTerm.category).children.push(data.selectedTerm)
        //   const parent = this.frameworkService.getPreviousCategory(data.selectedTerm.category)
        //   if (parent && parent.code) {
        //     // insert in parent 
        //     this.frameworkService.list.get(parent.code).children.map(a => {
        //       if (data.parentData && a.code === data.parentData.code) {
        //         if (!a.children) {
        //           a.children = []
        //         }
        //         a.children.push(data.selectedTerm)
        //       }
        //     })
        //     this.frameworkService.isDataUpdated.next(true)
        //   }
        // } else if (!data.parentData && !data.isSelected) {
        //   this.frameworkService.list.get(data.selectedTerm.category).children.push(data.selectedTerm)
        // }
        setTimeout(() => {
            this.loaded[data.selectedTerm.category] = true;
        }, 100);
    }
    isEnabled(columnCode) {
        return !!this.frameworkService.selectionList.get(columnCode);
    }
    openCreateTermDialog(column, colIndex) {
        if (!this.isEnabled(column.code)) {
            const dialog = this.dialog.open(CreateTermComponent, {
                data: { columnInfo: column, frameworkId: this.frameworkService.getFrameworkId(), selectedparents: this.heightLighted, colIndex: colIndex },
                width: '400px',
                panelClass: 'custom-dialog-container'
            });
            dialog.afterClosed().subscribe(res => {
                if (!res) {
                    return;
                }
                if (res && res.created) {
                    this.showPublish = true;
                }
                this.loaded[res.term.category] = false;
                // wait
                const parentColumn = this.frameworkService.getPreviousCategory(res.term.category);
                res.parent = null;
                if (parentColumn) {
                    res.parent = this.frameworkService.selectionList.get(parentColumn.code);
                    res.parent.children ? res.parent.children.push(res.term) : res.parent['children'] = [res.term];
                    // res.parent.associations?.push(res)
                }
                // this.frameworkService.setTerm = res;
                this.updateFinalList({ selectedTerm: res.term, isSelected: false, parentData: res.parent, colIndex: colIndex });
                // this.frameworkService.insertUpdateDeleteNotifier.next({ type: 'insert', action: res.parent.code, data: res.term })
            });
        }
    }
    get list() {
        // console.log('this.frameworkService.list :: ',this.frameworkService.list)
        // if (this.localList.length === 0) {
        //   this.updateLocalData()
        // }
        // return this.localList
        return Array.from(this.frameworkService.list.values());
    }
    drawHeaderLine(len) {
        const options = { ...defaultConfig, ...headerLineConfig };
        for (let i = 1; i <= len; i++) {
            const startEle = document.querySelector(`#box${i}count`);
            const endEle = document.querySelector(`#box${i}Header`);
            if (startEle && endEle) {
                new LeaderLine(startEle, endEle, options);
            }
        }
    }
    getColumn(columnCode) {
        return this.frameworkService.list.get(columnCode);
    }
    updateLocalData() {
        // this.localList = Array.from(this.frameworkService.list.values()).map(lst => {
        //   const selectedTerm = this.frameworkService.selectionList.get(lst.code)
        //   lst.children.map(ch => { ch.selected = selectedTerm && ch.identifier === selectedTerm.identifier })
        //   return lst
        // })
    }
    // get updatedCategories() {
    //   return this.updateTerms()
    // }
    // updateTerms(_term?: any) {
    //   const finalList = []
    //   this.list.forEach((category, idx) => {
    //     const localTerms = this.frameworkService.getLocalTermsByColumn(category.code)
    //     for (let j = 0; j < localTerms.length; j += 1) {
    // const previous = this.frameworkService.getPreviousCategory(category.code)
    // if (previous && finalList[idx - 1]) {
    //   finalList[idx - 1].children.forEach(lastParent => {
    //     localTerms[j].parent.forEach(parent => {
    //       if (lastParent.code === parent.element.code) {
    //         console.log("parent.element.code============>", parent.element.code)
    //         if (!lastParent.children) {
    //           lastParent.children = []
    //         }
    //         if (lastParent.children.findIndex(c => c.code === localTerms[j].code) === -1) {
    //           lastParent.children.unshift(localTerms[j])
    //         }
    //       }
    //     })
    //   });
    // }
    //       if (category.code === localTerms[j].category) {
    //         category.children.push(localTerms[j])
    //       }
    //     }
    //     finalList.push(category)
    //   })
    //   return finalList
    // }
    // if (localTerms.length > 0) {
    //   this.columnData.push(...localTerms)
    //   this.column.children.forEach(col => {
    //     localTerms.forEach(loc => {
    //       if (col.code !== loc.code) {
    //         loc.selected=true
    //         this.column.children.push(loc)
    //       }
    //     })
    // this.column.children.push(...localTerms)
    // }
    // }
    // get list() {
    //   let termsWithDraftStatus = []
    //   console.log('this.frameworkService.list :: ',this.frameworkService.list)
    //   this.frameworkService.list.forEach((cat,i) => {
    //       termsWithDraftStatus = cat.children.filter(t => t.approvalStatus === 'Draft')
    //       this.updateDraftStatusTerms(termsWithDraftStatus)
    //   })
    //   this.showActionBar = this.approvalRequiredTerms.length > 1 ? true:false
    //   return this.frameworkService.list
    // }
    newConnection() {
        const dialog = this.dialog.open(ConnectorComponent, {
            data: {},
            width: '90%',
            // panelClass: 'custom-dialog-container' 
        });
        dialog.afterClosed().subscribe((res) => {
            if ((res.source === 'online' && res.data.endpoint) || (res.source === 'offline')) {
                this.localSvc.localStorage = res;
                this.init();
            }
            else if (res.source === 'online' && !res.data.endpoint) {
                this.localSvc.localStorage = res;
                this.init();
            }
        });
    }
    updateDraftStatusTerms(event) {
        if (event.checked) {
            this.draftTerms.push(event.term);
        }
        else {
            this.draftTerms = this.draftTerms.filter(d => event.term.identifier !== d.identifier);
        }
        this.showActionBar = this.draftTerms.length > 0 ? true : false;
    }
    getNoOfCards(event) {
        if (this.categoryList.length > 0 && event.category !== '') {
            let index = this.categoryList.findIndex((obj) => obj.category == event.category);
            if (index > -1) {
                this.categoryList.splice(index);
            }
        }
        if (event.category == '') {
            this.categoryList[this.categoryList.length - 1].count = 0;
        }
        this.categoryList.push(event);
    }
    sendForApproval() {
        if (!this.isApprovalView) {
            let parentList = [];
            this.list.forEach(ele => {
                const t = ele.children.filter(term => term.selected === true);
                if (t[0]) {
                    parentList.push(t[0]);
                }
            });
            const req = {
                updateFieldValues: [...parentList, ...this.draftTerms]
            };
            this.approvalService.createApproval(req).subscribe(res => {
                this.frameworkService.removeOldLine();
                this._snackBar.open('Terms successfully sent for Approval.', 'cancel');
                // this.router.navigate(['/approval'])
                // this.showActionBar = false;
            });
        }
        else {
            this.sentForApprove.emit(this.draftTerms);
            console.log(this.draftTerms);
        }
    }
    closeActionBar(e) {
        this.showActionBar = false;
    }
    initConfig() {
        if (this.environment) {
            this.frameworkService.updateEnvironment(this.environment);
            this.frameworkService.setConfig(this.taxonomyConfig);
        }
    }
    ngOnDestroy() {
        this.frameworkService.removeOldLine();
    }
}
TaxonomyViewComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "14.3.0", ngImport: i0, type: TaxonomyViewComponent, deps: [{ token: FrameworkService }, { token: LocalConnectionService }, { token: i1$2.MatDialog }, { token: ApprovalService }, { token: i1$1.Router }, { token: i6$2.MatSnackBar }, { token: ConnectorService }], target: i0.ɵɵFactoryTarget.Component });
TaxonomyViewComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "14.3.0", type: TaxonomyViewComponent, selector: "lib-taxonomy-view", inputs: { approvalList: "approvalList", isApprovalView: "isApprovalView", workFlowStatus: "workFlowStatus", environment: "environment", taxonomyConfig: "taxonomyConfig" }, outputs: { sentForApprove: "sentForApprove" }, usesOnChanges: true, ngImport: i0, template: "<div class=\"flex flex-1 connectionSettings hide\">\n    <button mat-raised-button color=\"accent\" (click)=\"newConnection()\">\n        <mat-icon>{{app_strings.build}}</mat-icon>\n    </button>\n</div>\n\n<div *ngIf=\"list && list.length > 0\" class=\"flex heightFix \">\n    <ng-container *ngFor=\"let column of list; let i = index;\">\n        <div class=\"flex-1 felx-col  col-container containers{{list.length}}\" id=\"box{{i+1}}Container\">\n            <div class=\"category-heading-sticky\">\n                <div class=\"category-heading-container\">\n                    <div class='category-header'>\n                        <div class=\"category-header-items\" id=\"box{{i}}Header\">\n                            <mat-icon [ngStyle]=\"{'color':column.config.color}\">{{column.config.icon}}</mat-icon>\n                            <h4>{{column.name}}</h4>\n                            <ng-container *ngIf=\"i != 0 && categoryList?.length > 0; else firstColumn\">\n                                <ng-container *ngFor=\"let category of categoryList\">\n                                    <ng-container *ngIf=\"(column.code == category.category) && column.index !== 1\">\n                                        <span>{{category.count}}</span>\n                                    </ng-container>\n                                </ng-container>\n                            </ng-container>\n                            <ng-template #firstColumn>\n                                <span *ngIf=\"i == 0\" id=\"box{{i+1}}count\">{{column.children.length}}</span>\n                            </ng-template>\n                            <div class=\"arrow\" id=\"box{{i+1}}count\"></div>\n                        </div>\n                    </div>\n                    <div class=\"mb1\" *ngIf=\"!isApprovalView\">\n                        <button [disabled]=\"isEnabled(column.code)\" class=\"w-full addCardButton\" mat-stroked-button\n                            color=\"primary\" (click)=\"openCreateTermDialog(column, i)\">\n                            {{app_strings.createNew}} {{column.name}}\n                            <mat-icon>{{app_strings.add}}</mat-icon>\n                        </button>\n                    </div>\n                </div>\n            </div>\n            <!-- {{column.code}} -->\n            <div class=\"padding-x2 cat-columns container\" id=\"box{{i+1}}\">\n                <lib-taxonomy-column-view *ngIf=\"loaded[column.code]\" #selectedTaxonomyTerm [column]=\"column\"\n                    [containerId]=\"'box'+(i+1)\" (updateTaxonomyTerm)=\"updateTaxonomyTerm($event)\"\n                    (updateTermList)=\"updateDraftStatusTerms($event)\" (cardsCount)=\"getNoOfCards($event)\">\n                </lib-taxonomy-column-view>\n            </div>\n        </div>\n    </ng-container>\n    <lib-action-bar *ngIf=\"showActionBar\" [actionType]=\"isApprovalView\" [configType]=\"workFlowStatus\"\n        (sendApproval)=\"sendForApproval()\" (closeAction)=\"closeActionBar($event)\"></lib-action-bar>\n</div>\n<div *ngIf=\"!(list && list.length > 0 )\" class=\"flex heightFix \">\n    <h1>{{app_strings.noData}}</h1>\n<div>\n<div *ngIf=\"isLoading\" class=\"spinner\">\n    <mat-spinner></mat-spinner>\n</div>\n    ", styles: [".connectionSettings{flex-direction:row-reverse;z-index:40;position:fixed;padding:0 4px 4px 0;bottom:0;right:0;display:none}.flex{display:flex}.w-full{width:100%;align-items:center;display:flex}.w-full.mat-stroked-button{padding:.25em .8em;text-align:left;border:2px dotted #b1b1b1;color:#666;border-radius:8px}.w-full.mat-stroked-button .mat-icon{position:absolute;top:0%;right:3%;height:100%;display:flex;align-items:center}.mb1{margin-bottom:1em}flex-center{flex-wrap:nowrap;align-items:start;justify-content:center}.flex-1{flex:1}.felx-col{flex-direction:column}.padding-x2{padding:0 2.5em}.heightFix{height:100%;width:100%;justify-content:space-around;margin-top:30px}.cat-columns{position:relative;height:inherit}.col-container{height:inherit}.category-heading-sticky{top:0;position:sticky;width:100%;background:#fff;margin-bottom:5px;z-index:10}.category-heading-container{box-sizing:content-box;position:relative;display:block;padding:1px 2.5em}.category-heading-container .category-header{display:flex;align-items:center}.category-heading-container .category-header-items{display:flex;align-items:center;padding:0 10px}.category-heading-container .category-header h4{padding:0 10px;color:#00000080}.category-heading-container .category-header span{background-color:#f0f0f0;padding:2px 6px;border-radius:6px}.cat-columns:hover{overflow-y:scroll}.container{overflow-y:auto;scrollbar-width:none;-ms-overflow-style:none;height:calc(100% - 16vh)}.container::-webkit-scrollbar{width:0;height:0}.spinner{position:fixed;display:flex;top:50%;left:50%}.arrow{left:30px;position:relative}@media only screen and (max-width: 1024px){::ng-deep mat-checkbox .mat-checkbox-inner-container{height:.8em;width:.8em}}@media only screen and (max-width: 1024px){.containers4{max-width:250px;font-size:10px}.containers5{max-width:230px}.containers6{max-width:150px}.containers7{max-width:100px}.w-full{height:3.5em}.w-full.mat-stroked-button{font-size:8px}.padding-x2,.category-heading-container{padding:0 2em}mat-icon{font-size:12px;width:1.25em;height:1.25em}.connectionSettings .mat-raised-button{min-width:auto;padding:0 .5em;line-height:2em}}@media only screen and (max-width: 992px){.containers4{max-width:220px;font-size:9px}.padding-x2,.category-heading-container{padding:0 1.5em}}@media only screen and (max-width: 768px){.containers4{max-width:165px;font-size:8px}.w-full{height:2.5em}.padding-x2,.category-heading-container{padding:0 1em}mat-icon{font-size:8px;width:1em;height:1em}.connectionSettings .mat-raised-button{min-width:auto;padding:0 .3em;line-height:1.5em}}\n"], dependencies: [{ kind: "directive", type: i5.NgForOf, selector: "[ngFor][ngForOf]", inputs: ["ngForOf", "ngForTrackBy", "ngForTemplate"] }, { kind: "directive", type: i5.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { kind: "directive", type: i5.NgStyle, selector: "[ngStyle]", inputs: ["ngStyle"] }, { kind: "component", type: i6.MatButton, selector: "button[mat-button], button[mat-raised-button], button[mat-icon-button],             button[mat-fab], button[mat-mini-fab], button[mat-stroked-button],             button[mat-flat-button]", inputs: ["disabled", "disableRipple", "color"], exportAs: ["matButton"] }, { kind: "component", type: i8$1.MatIcon, selector: "mat-icon", inputs: ["color", "inline", "svgIcon", "fontSet", "fontIcon"], exportAs: ["matIcon"] }, { kind: "component", type: i11.MatProgressSpinner, selector: "mat-progress-spinner, mat-spinner", inputs: ["color", "diameter", "strokeWidth", "mode", "value"], exportAs: ["matProgressSpinner"] }, { kind: "component", type: TaxonomyColumnViewComponent, selector: "lib-taxonomy-column-view", inputs: ["column", "containerId"], outputs: ["updateTaxonomyTerm", "updateTermList", "cardsCount"] }, { kind: "component", type: ActionBarComponent, selector: "lib-action-bar", inputs: ["actionType", "configType"], outputs: ["sendApproval", "closeAction"] }] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "14.3.0", ngImport: i0, type: TaxonomyViewComponent, decorators: [{
            type: Component,
            args: [{ selector: 'lib-taxonomy-view', template: "<div class=\"flex flex-1 connectionSettings hide\">\n    <button mat-raised-button color=\"accent\" (click)=\"newConnection()\">\n        <mat-icon>{{app_strings.build}}</mat-icon>\n    </button>\n</div>\n\n<div *ngIf=\"list && list.length > 0\" class=\"flex heightFix \">\n    <ng-container *ngFor=\"let column of list; let i = index;\">\n        <div class=\"flex-1 felx-col  col-container containers{{list.length}}\" id=\"box{{i+1}}Container\">\n            <div class=\"category-heading-sticky\">\n                <div class=\"category-heading-container\">\n                    <div class='category-header'>\n                        <div class=\"category-header-items\" id=\"box{{i}}Header\">\n                            <mat-icon [ngStyle]=\"{'color':column.config.color}\">{{column.config.icon}}</mat-icon>\n                            <h4>{{column.name}}</h4>\n                            <ng-container *ngIf=\"i != 0 && categoryList?.length > 0; else firstColumn\">\n                                <ng-container *ngFor=\"let category of categoryList\">\n                                    <ng-container *ngIf=\"(column.code == category.category) && column.index !== 1\">\n                                        <span>{{category.count}}</span>\n                                    </ng-container>\n                                </ng-container>\n                            </ng-container>\n                            <ng-template #firstColumn>\n                                <span *ngIf=\"i == 0\" id=\"box{{i+1}}count\">{{column.children.length}}</span>\n                            </ng-template>\n                            <div class=\"arrow\" id=\"box{{i+1}}count\"></div>\n                        </div>\n                    </div>\n                    <div class=\"mb1\" *ngIf=\"!isApprovalView\">\n                        <button [disabled]=\"isEnabled(column.code)\" class=\"w-full addCardButton\" mat-stroked-button\n                            color=\"primary\" (click)=\"openCreateTermDialog(column, i)\">\n                            {{app_strings.createNew}} {{column.name}}\n                            <mat-icon>{{app_strings.add}}</mat-icon>\n                        </button>\n                    </div>\n                </div>\n            </div>\n            <!-- {{column.code}} -->\n            <div class=\"padding-x2 cat-columns container\" id=\"box{{i+1}}\">\n                <lib-taxonomy-column-view *ngIf=\"loaded[column.code]\" #selectedTaxonomyTerm [column]=\"column\"\n                    [containerId]=\"'box'+(i+1)\" (updateTaxonomyTerm)=\"updateTaxonomyTerm($event)\"\n                    (updateTermList)=\"updateDraftStatusTerms($event)\" (cardsCount)=\"getNoOfCards($event)\">\n                </lib-taxonomy-column-view>\n            </div>\n        </div>\n    </ng-container>\n    <lib-action-bar *ngIf=\"showActionBar\" [actionType]=\"isApprovalView\" [configType]=\"workFlowStatus\"\n        (sendApproval)=\"sendForApproval()\" (closeAction)=\"closeActionBar($event)\"></lib-action-bar>\n</div>\n<div *ngIf=\"!(list && list.length > 0 )\" class=\"flex heightFix \">\n    <h1>{{app_strings.noData}}</h1>\n<div>\n<div *ngIf=\"isLoading\" class=\"spinner\">\n    <mat-spinner></mat-spinner>\n</div>\n    ", styles: [".connectionSettings{flex-direction:row-reverse;z-index:40;position:fixed;padding:0 4px 4px 0;bottom:0;right:0;display:none}.flex{display:flex}.w-full{width:100%;align-items:center;display:flex}.w-full.mat-stroked-button{padding:.25em .8em;text-align:left;border:2px dotted #b1b1b1;color:#666;border-radius:8px}.w-full.mat-stroked-button .mat-icon{position:absolute;top:0%;right:3%;height:100%;display:flex;align-items:center}.mb1{margin-bottom:1em}flex-center{flex-wrap:nowrap;align-items:start;justify-content:center}.flex-1{flex:1}.felx-col{flex-direction:column}.padding-x2{padding:0 2.5em}.heightFix{height:100%;width:100%;justify-content:space-around;margin-top:30px}.cat-columns{position:relative;height:inherit}.col-container{height:inherit}.category-heading-sticky{top:0;position:sticky;width:100%;background:#fff;margin-bottom:5px;z-index:10}.category-heading-container{box-sizing:content-box;position:relative;display:block;padding:1px 2.5em}.category-heading-container .category-header{display:flex;align-items:center}.category-heading-container .category-header-items{display:flex;align-items:center;padding:0 10px}.category-heading-container .category-header h4{padding:0 10px;color:#00000080}.category-heading-container .category-header span{background-color:#f0f0f0;padding:2px 6px;border-radius:6px}.cat-columns:hover{overflow-y:scroll}.container{overflow-y:auto;scrollbar-width:none;-ms-overflow-style:none;height:calc(100% - 16vh)}.container::-webkit-scrollbar{width:0;height:0}.spinner{position:fixed;display:flex;top:50%;left:50%}.arrow{left:30px;position:relative}@media only screen and (max-width: 1024px){::ng-deep mat-checkbox .mat-checkbox-inner-container{height:.8em;width:.8em}}@media only screen and (max-width: 1024px){.containers4{max-width:250px;font-size:10px}.containers5{max-width:230px}.containers6{max-width:150px}.containers7{max-width:100px}.w-full{height:3.5em}.w-full.mat-stroked-button{font-size:8px}.padding-x2,.category-heading-container{padding:0 2em}mat-icon{font-size:12px;width:1.25em;height:1.25em}.connectionSettings .mat-raised-button{min-width:auto;padding:0 .5em;line-height:2em}}@media only screen and (max-width: 992px){.containers4{max-width:220px;font-size:9px}.padding-x2,.category-heading-container{padding:0 1.5em}}@media only screen and (max-width: 768px){.containers4{max-width:165px;font-size:8px}.w-full{height:2.5em}.padding-x2,.category-heading-container{padding:0 1em}mat-icon{font-size:8px;width:1em;height:1em}.connectionSettings .mat-raised-button{min-width:auto;padding:0 .3em;line-height:1.5em}}\n"] }]
        }], ctorParameters: function () { return [{ type: FrameworkService }, { type: LocalConnectionService }, { type: i1$2.MatDialog }, { type: ApprovalService }, { type: i1$1.Router }, { type: i6$2.MatSnackBar }, { type: ConnectorService }]; }, propDecorators: { approvalList: [{
                type: Input
            }], isApprovalView: [{
                type: Input
            }], workFlowStatus: [{
                type: Input
            }], environment: [{
                type: Input
            }], taxonomyConfig: [{
                type: Input
            }], sentForApprove: [{
                type: Output
            }] } });

class OrderByPipe {
    constructor(approvalService) {
        this.approvalService = approvalService;
        this.approvalTerms = [];
    }
    transform(value) {
        // return null;
        if (value) {
            return value.slice().reverse();
        }
        else {
            return null;
        }
    }
}
OrderByPipe.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "14.3.0", ngImport: i0, type: OrderByPipe, deps: [{ token: ApprovalService }], target: i0.ɵɵFactoryTarget.Pipe });
OrderByPipe.ɵpipe = i0.ɵɵngDeclarePipe({ minVersion: "14.0.0", version: "14.3.0", ngImport: i0, type: OrderByPipe, name: "orderBy" });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "14.3.0", ngImport: i0, type: OrderByPipe, decorators: [{
            type: Pipe,
            args: [{
                    name: 'orderBy'
                }]
        }], ctorParameters: function () { return [{ type: ApprovalService }]; } });

class DatePipe {
    transform(value) {
        return new Date(value).toLocaleString().split('/')[0];
    }
}
DatePipe.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "14.3.0", ngImport: i0, type: DatePipe, deps: [], target: i0.ɵɵFactoryTarget.Pipe });
DatePipe.ɵpipe = i0.ɵɵngDeclarePipe({ minVersion: "14.0.0", version: "14.3.0", ngImport: i0, type: DatePipe, name: "date" });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "14.3.0", ngImport: i0, type: DatePipe, decorators: [{
            type: Pipe,
            args: [{
                    name: 'date'
                }]
        }] });

class PendingApprovalComponent {
    constructor(approvalService, frameworkService) {
        this.approvalService = approvalService;
        this.frameworkService = frameworkService;
        this.pendingList = [];
        this.approvalList = [];
        this.categories = [];
        this.app_strings = labels;
    }
    ngOnInit() {
        this.getApprovalList();
        this.frameworkService.getFrameworkInfo().subscribe(res => {
            this.categories = res.result.framework.categories.map(d => d.code);
        });
    }
    getApprovalList() {
        const payload = { applicationStatus: APPROVAL.LEVEL1, serviceName: APPROVAL.SERVICE_NAME };
        this.approvalService.getApprovalList(payload).subscribe((res) => {
            this.approvalList = res.result.data;
        });
    }
    removeDuplicates(arr) {
        return [...new Set(arr)];
    }
    createApprovalList(updateFieldValues) {
        let updateFileds = [];
        let categories = [];
        let approvalList = [];
        updateFileds = JSON.parse(updateFieldValues);
        categories = updateFileds.map(fd => fd.category);
        categories = this.removeDuplicates(categories);
        categories.forEach((c) => {
            let temp = { name: '', terms: [], children: [] };
            temp.name = c,
                temp.children = updateFileds.filter(term => term.category === c);
            approvalList.push(temp);
        });
        return approvalList;
    }
    getTerms(terms) {
        const temp = terms.map(t => t.name);
        const t = temp.shift();
        return temp;
    }
}
PendingApprovalComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "14.3.0", ngImport: i0, type: PendingApprovalComponent, deps: [{ token: ApprovalService }, { token: FrameworkService }], target: i0.ɵɵFactoryTarget.Component });
PendingApprovalComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "14.3.0", type: PendingApprovalComponent, selector: "lib-pending-approval", ngImport: i0, template: "<div class=\"pending-approval\">\n    <header class=\"mat-header\">\n        <h2>{{app_strings.pendingApproval}} ({{approvalList.length}})</h2>\n    </header>\n\n    <mat-card *ngFor=\"let p of approvalList | orderBy\">\n\n        <mat-card-content>\n            <span class=\"date\">\n                <h4>{{app_strings.date}}</h4>\n                <span>{{p.lastUpdatedOn | date}}</span>\n            </span>\n            <div *ngFor=\"let t of createApprovalList(p.updateFieldValues)\" class=\"col\">\n                <h4>{{t.name}}</h4>\n                <div matTooltip=\"{{getTerms(t.children)}}\" matTooltipPosition=\"above\" matTooltipClass=\"custom-tooltip\">\n                    {{t.children[0].name}}\n                    <ng-container *ngIf=\"t.children.length>1\">\n                        & {{t.children.length-1}} {{app_strings.more}}\n                    </ng-container>\n                </div>\n            </div>\n            <a class=\"approve-view-link\" routerLink=\"/approval/{{p.wfId}}\"><mat-icon>{{app_strings.rightArrow}}</mat-icon></a>\n        </mat-card-content>\n    </mat-card>\n    <!-- <mat-tab-group mat-align-tabs=\"center\" animationDuration=\"0ms\">\n        <mat-tab label=\"Sent for approval\" active>  -->\n    <!-- <mat-card>\n                <mat-card-content>\n                <div *ngFor=\"let t of categories\" class=\"col\">\n                        <h4>{{t}}</h4>\n                </div>\n                </mat-card-content>\n            </mat-card> -->\n    <!-- <mat-card *ngFor=\"let p of approvalList\">\n                    <mat-card-content>\n                        <div *ngFor=\"let t of createApprovalList(p.updateFieldValues)\" class=\"col\">\n                                <h4>{{t.name}}</h4>\n                                <div matTooltip=\"{{getTerms(t.children)}}\" matTooltipPosition=\"above\" matTooltipClass=\"custom-tooltip\">\n                                        {{t.children[0].name}}\n                                        <ng-container *ngIf=\"t.children.length>1\">\n                                        & {{t.children.length-1}} more...\n                                        </ng-container>\n                                </div>\n                              \n                        </div> \n                        <a class=\"approve-view-link\" routerLink=\"/approval/{{p.wfId}}\"><mat-icon>keyboard_arrow_right</mat-icon></a>\n                    </mat-card-content>\n            </mat-card>\n        </mat-tab> -->\n    <!-- <mat-tab label=\"Approved\"> Approved </mat-tab>\n        <mat-tab label=\"Rejected\"> Rejected </mat-tab> -->\n    <!-- </mat-tab-group> -->\n\n</div>", styles: [".pending-approval{padding:0 15px}.pending-approval h2{font-weight:400}.pending-approval .mat-tab-group ::ng-deep .mat-tab-header{background-color:#fff}.pending-approval .mat-tab-group ::ng-deep .mat-tab-header .mat-tab-label{padding:0 10px}.pending-approval .mat-tab-group ::ng-deep .mat-tab-header .mat-tab-label .mat-tab-label-content{color:#000}.pending-approval .mat-tab-group ::ng-deep .mat-tab-header .mat-tab-label-active{background:#FFFFFF}.pending-approval .mat-tab-group ::ng-deep .mat-tab-header .mat-tab-label-active .mat-tab-label-content{color:#000}.pending-approval .mat-card{background:#F3F3F3;margin-top:25px;padding:5px 0;box-shadow:none}.pending-approval .mat-card-content{display:flex;flex-direction:row;justify-content:left;align-items:center;padding-left:4%;position:relative}.pending-approval .mat-card-content h4{text-transform:capitalize;padding:0;margin:10px 0}.pending-approval .mat-card-content .approve-view-link{position:absolute;right:4%}.pending-approval .col{display:flex;flex-direction:column;padding-right:100px}.pending-approval .col div{cursor:pointer;font-size:20px}::ng-deep .custom-tooltip{font-size:16px;background:#FFFFFF!important;color:#000!important;padding:10px 0}::ng-deep .mat-icon{font-size:40px;color:#363636;cursor:pointer}.date{padding:0 20px;font-weight:600}\n"], dependencies: [{ kind: "directive", type: i5.NgForOf, selector: "[ngFor][ngForOf]", inputs: ["ngForOf", "ngForTrackBy", "ngForTemplate"] }, { kind: "directive", type: i5.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { kind: "directive", type: i1$1.RouterLinkWithHref, selector: "a[routerLink],area[routerLink]", inputs: ["target", "queryParams", "fragment", "queryParamsHandling", "state", "relativeTo", "preserveFragment", "skipLocationChange", "replaceUrl", "routerLink"] }, { kind: "component", type: i8$1.MatIcon, selector: "mat-icon", inputs: ["color", "inline", "svgIcon", "fontSet", "fontIcon"], exportAs: ["matIcon"] }, { kind: "component", type: i6$1.MatCard, selector: "mat-card", exportAs: ["matCard"] }, { kind: "directive", type: i6$1.MatCardContent, selector: "mat-card-content, [mat-card-content], [matCardContent]" }, { kind: "directive", type: i7$1.MatTooltip, selector: "[matTooltip]", exportAs: ["matTooltip"] }, { kind: "pipe", type: OrderByPipe, name: "orderBy" }, { kind: "pipe", type: DatePipe, name: "date" }] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "14.3.0", ngImport: i0, type: PendingApprovalComponent, decorators: [{
            type: Component,
            args: [{ selector: 'lib-pending-approval', template: "<div class=\"pending-approval\">\n    <header class=\"mat-header\">\n        <h2>{{app_strings.pendingApproval}} ({{approvalList.length}})</h2>\n    </header>\n\n    <mat-card *ngFor=\"let p of approvalList | orderBy\">\n\n        <mat-card-content>\n            <span class=\"date\">\n                <h4>{{app_strings.date}}</h4>\n                <span>{{p.lastUpdatedOn | date}}</span>\n            </span>\n            <div *ngFor=\"let t of createApprovalList(p.updateFieldValues)\" class=\"col\">\n                <h4>{{t.name}}</h4>\n                <div matTooltip=\"{{getTerms(t.children)}}\" matTooltipPosition=\"above\" matTooltipClass=\"custom-tooltip\">\n                    {{t.children[0].name}}\n                    <ng-container *ngIf=\"t.children.length>1\">\n                        & {{t.children.length-1}} {{app_strings.more}}\n                    </ng-container>\n                </div>\n            </div>\n            <a class=\"approve-view-link\" routerLink=\"/approval/{{p.wfId}}\"><mat-icon>{{app_strings.rightArrow}}</mat-icon></a>\n        </mat-card-content>\n    </mat-card>\n    <!-- <mat-tab-group mat-align-tabs=\"center\" animationDuration=\"0ms\">\n        <mat-tab label=\"Sent for approval\" active>  -->\n    <!-- <mat-card>\n                <mat-card-content>\n                <div *ngFor=\"let t of categories\" class=\"col\">\n                        <h4>{{t}}</h4>\n                </div>\n                </mat-card-content>\n            </mat-card> -->\n    <!-- <mat-card *ngFor=\"let p of approvalList\">\n                    <mat-card-content>\n                        <div *ngFor=\"let t of createApprovalList(p.updateFieldValues)\" class=\"col\">\n                                <h4>{{t.name}}</h4>\n                                <div matTooltip=\"{{getTerms(t.children)}}\" matTooltipPosition=\"above\" matTooltipClass=\"custom-tooltip\">\n                                        {{t.children[0].name}}\n                                        <ng-container *ngIf=\"t.children.length>1\">\n                                        & {{t.children.length-1}} more...\n                                        </ng-container>\n                                </div>\n                              \n                        </div> \n                        <a class=\"approve-view-link\" routerLink=\"/approval/{{p.wfId}}\"><mat-icon>keyboard_arrow_right</mat-icon></a>\n                    </mat-card-content>\n            </mat-card>\n        </mat-tab> -->\n    <!-- <mat-tab label=\"Approved\"> Approved </mat-tab>\n        <mat-tab label=\"Rejected\"> Rejected </mat-tab> -->\n    <!-- </mat-tab-group> -->\n\n</div>", styles: [".pending-approval{padding:0 15px}.pending-approval h2{font-weight:400}.pending-approval .mat-tab-group ::ng-deep .mat-tab-header{background-color:#fff}.pending-approval .mat-tab-group ::ng-deep .mat-tab-header .mat-tab-label{padding:0 10px}.pending-approval .mat-tab-group ::ng-deep .mat-tab-header .mat-tab-label .mat-tab-label-content{color:#000}.pending-approval .mat-tab-group ::ng-deep .mat-tab-header .mat-tab-label-active{background:#FFFFFF}.pending-approval .mat-tab-group ::ng-deep .mat-tab-header .mat-tab-label-active .mat-tab-label-content{color:#000}.pending-approval .mat-card{background:#F3F3F3;margin-top:25px;padding:5px 0;box-shadow:none}.pending-approval .mat-card-content{display:flex;flex-direction:row;justify-content:left;align-items:center;padding-left:4%;position:relative}.pending-approval .mat-card-content h4{text-transform:capitalize;padding:0;margin:10px 0}.pending-approval .mat-card-content .approve-view-link{position:absolute;right:4%}.pending-approval .col{display:flex;flex-direction:column;padding-right:100px}.pending-approval .col div{cursor:pointer;font-size:20px}::ng-deep .custom-tooltip{font-size:16px;background:#FFFFFF!important;color:#000!important;padding:10px 0}::ng-deep .mat-icon{font-size:40px;color:#363636;cursor:pointer}.date{padding:0 20px;font-weight:600}\n"] }]
        }], ctorParameters: function () { return [{ type: ApprovalService }, { type: FrameworkService }]; } });

class ApprovalComponent {
    constructor() {
        this.app_strings = labels;
    }
    ngOnInit() {
    }
}
ApprovalComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "14.3.0", ngImport: i0, type: ApprovalComponent, deps: [], target: i0.ɵɵFactoryTarget.Component });
ApprovalComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "14.3.0", type: ApprovalComponent, selector: "lib-approval", ngImport: i0, template: "<div class=\"approval-container\">\n    <mat-tab-group mat-align-tabs=\"start\" animationDuration=\"0ms\" [selectedIndex]=\"1\">\n        <mat-tab label=\"{{app_strings.allFrac}}\"> \n            <h2>{{app_strings.allFrac}}</h2>\n        </mat-tab>\n        <mat-tab label=\"{{app_strings.pendingApproval}}\" active> \n            <ng-template matTabContent>\n                <lib-pending-approval></lib-pending-approval>\n            </ng-template>\n        </mat-tab>\n        <!-- <mat-tab label=\"Approved\"> Approved </mat-tab>\n        <mat-tab label=\"Rejected\"> Rejected </mat-tab> -->\n    </mat-tab-group>\n    <!-- <lib-pending-approval></lib-pending-approval> -->\n</div>", styles: [".approval-container{padding:0}.approval-container .mat-tab-group ::ng-deep .mat-tab-header{background-color:#f3f3f3}.approval-container .mat-tab-group ::ng-deep .mat-tab-header .mat-tab-label{padding:30px 0}.approval-container .mat-tab-group ::ng-deep .mat-tab-header .mat-tab-label .mat-tab-label-content{color:#000}.approval-container .mat-tab-group ::ng-deep .mat-tab-header .mat-tab-label-active{background:#666666}.approval-container .mat-tab-group ::ng-deep .mat-tab-header .mat-tab-label-active .mat-tab-label-content{color:#fff}\n"], dependencies: [{ kind: "component", type: i1$4.MatTabGroup, selector: "mat-tab-group", inputs: ["color", "disableRipple"], exportAs: ["matTabGroup"] }, { kind: "component", type: i1$4.MatTab, selector: "mat-tab", inputs: ["disabled", "label", "aria-label", "aria-labelledby", "labelClass", "bodyClass"], exportAs: ["matTab"] }, { kind: "directive", type: i1$4.MatTabContent, selector: "[matTabContent]" }, { kind: "component", type: PendingApprovalComponent, selector: "lib-pending-approval" }] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "14.3.0", ngImport: i0, type: ApprovalComponent, decorators: [{
            type: Component,
            args: [{ selector: 'lib-approval', encapsulation: ViewEncapsulation.Emulated, template: "<div class=\"approval-container\">\n    <mat-tab-group mat-align-tabs=\"start\" animationDuration=\"0ms\" [selectedIndex]=\"1\">\n        <mat-tab label=\"{{app_strings.allFrac}}\"> \n            <h2>{{app_strings.allFrac}}</h2>\n        </mat-tab>\n        <mat-tab label=\"{{app_strings.pendingApproval}}\" active> \n            <ng-template matTabContent>\n                <lib-pending-approval></lib-pending-approval>\n            </ng-template>\n        </mat-tab>\n        <!-- <mat-tab label=\"Approved\"> Approved </mat-tab>\n        <mat-tab label=\"Rejected\"> Rejected </mat-tab> -->\n    </mat-tab-group>\n    <!-- <lib-pending-approval></lib-pending-approval> -->\n</div>", styles: [".approval-container{padding:0}.approval-container .mat-tab-group ::ng-deep .mat-tab-header{background-color:#f3f3f3}.approval-container .mat-tab-group ::ng-deep .mat-tab-header .mat-tab-label{padding:30px 0}.approval-container .mat-tab-group ::ng-deep .mat-tab-header .mat-tab-label .mat-tab-label-content{color:#000}.approval-container .mat-tab-group ::ng-deep .mat-tab-header .mat-tab-label-active{background:#666666}.approval-container .mat-tab-group ::ng-deep .mat-tab-header .mat-tab-label-active .mat-tab-label-content{color:#fff}\n"] }]
        }], ctorParameters: function () { return []; } });

class CreateCategoriesComponent {
    constructor(fb) {
        this.fb = fb;
        this.updateCategory = new EventEmitter();
        this.removeCategories = new EventEmitter();
        this.changePosition = new EventEmitter();
        this.app_strings = labels;
    }
    ngOnInit() {
        this.createCategoriesForm = this.fb.group({
            categories: this.fb.array([])
        });
        if (this.taxonomyInfo) {
            this.initCategoryForm();
        }
        else {
            this.addCategory();
        }
    }
    categories() {
        return this.createCategoriesForm.get('categories');
    }
    newCategories() {
        return this.fb.group({
            name: '',
        });
    }
    addCategory() {
        this.categories().push(this.newCategories());
    }
    removeCategory(i) {
        this.categories().removeAt(i);
        this.removeCategories.emit(i);
    }
    initCategoryForm() {
        for (var cat of this.taxonomyInfo) {
            this.categories().push(this.fb.group({
                name: cat.name
            }));
        }
    }
    saveForm() {
        console.log(this.createCategoriesForm.value.categories);
        this.updateCategory.emit(this.createCategoriesForm.value.categories);
    }
    emitCategory(event) {
        this.updateCategory.emit(event.target.value);
    }
    drop(event) {
        if (event.previousContainer === event.container) {
            moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
            this.changePosition.emit({ cur: event.currentIndex, prev: event.previousIndex });
        }
        else {
            transferArrayItem(event.previousContainer.data, event.container.data, event.previousIndex, event.currentIndex);
        }
    }
}
CreateCategoriesComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "14.3.0", ngImport: i0, type: CreateCategoriesComponent, deps: [{ token: i1$3.FormBuilder }], target: i0.ɵɵFactoryTarget.Component });
CreateCategoriesComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "14.3.0", type: CreateCategoriesComponent, selector: "lib-create-categories", inputs: { taxonomyInfo: "taxonomyInfo" }, outputs: { updateCategory: "updateCategory", removeCategories: "removeCategories", changePosition: "changePosition" }, ngImport: i0, template: "\n<div class=\"form-wrap\">\n    <h1>{{app_strings.createCategories}}</h1>\n    <form [formGroup]=\"createCategoriesForm\" (ngSubmit)=\"saveForm()\" novalidate>\n        <div class=\"form-field\">\n            <div class=\"form-field__wrap\" formArrayName=\"categories\" cdkDropListGroup>\n                <div cdkDropList [cdkDropListData]=\"categories().controls\" (cdkDropListDropped)=\"drop($event)\">\n                <div class=\"form__category\" *ngFor=\"let cat of categories().controls; let i = index\" >\n                        <mat-form-field appearance=\"outline\" [formGroupName]=\"i\" cdkDrag>\n                            <mat-label>{{app_strings.category}} {{i}}</mat-label>\n                            <input matInput placeholder=\"{{app_strings.categoryName}}\" formControlName=\"name\" (blur)=\"emitCategory($event)\"> \n                            <div class=\"drag-Handle\" cdkDragHandle>\n                                <svg width=\"24px\" fill=\"currentColor\" viewBox=\"0 0 24 24\">\n                                  <path d=\"M10 9h4V6h3l-5-5-5 5h3v3zm-1 1H6V7l-5 5 5 5v-3h3v-4zm14 2l-5-5v3h-3v4h3v3l5-5zm-9 3h-4v3H7l5 5 5-5h-3v-3z\"></path>\n                                  <path d=\"M0 0h24v24H0z\" fill=\"none\"></path>\n                                </svg>\n                            </div>\n                        </mat-form-field>\n                            <mat-icon (click)=\"removeCategory(i)\">{{app_strings.removeCircleOutline}}</mat-icon>\n                           \n                    </div>\n                </div>\n            </div>\n        </div>\n        <footer>\n            <button type=\"button\"  mat-raised-button (click)=\"addCategory()\" color=\"primary\">\n                {{app_strings.add | titlecase}}\n             </button>\n        </footer>\n    </form>\n</div>\n", styles: [".form-wrap{display:flex;flex-direction:column;justify-content:center;padding:15px}.form-wrap h1{font-size:24px;color:#666;font-weight:500}.form-field{display:flex;flex-direction:row;justify-content:start}.form-field__wrap{display:flex;flex-direction:column}.form-field__wrap .mat-form-field{width:350px}.form-field .mat-input-element{height:42px}.form__btns{display:flex;flex-direction:column;justify-content:end;padding-bottom:15px;margin-left:15px}.form__category{display:flex;flex-direction:row;justify-content:center;align-items:center}.form__category .mat-form-field .mat-form-field-appearance-outline{margin-bottom:0}.form__category .mat-icon{margin-left:20px;height:20px;padding:5px 5px 25px;color:#b60909;cursor:pointer}.drag-Handle{position:absolute;top:8px;right:0;color:#9b9b9b;cursor:grabbing}.cdk-drag-animating{transition:transform .25s cubic-bezier(0,0,.2,1)}.cdk-drop-list-dragging .example-box:not(.cdk-drag-placeholder){transition:transform .25s cubic-bezier(0,0,.2,1)}footer{display:flex;flex-direction:row;justify-content:start}footer .mat-raised-button{padding:0 40px}@media only screen and (max-width: 1024px){.form-wrap h1{font-size:20px}.form-wrap-field__wrap .mat-form-field{width:250px}.form-wrap ::ng-deep .mat-form-field-appearance-outline .mat-form-field-outline{top:10px;bottom:4px}.form-wrap ::ng-deep .mat-form-field-wrapper{padding-bottom:.3em}.form-wrap ::ng-deep .mat-input-element{font-size:10px}.form-wrap ::ng-deep .mat-raised-button{min-width:auto;padding:0 .5em;line-height:2em}}\n"], dependencies: [{ kind: "directive", type: i5.NgForOf, selector: "[ngFor][ngForOf]", inputs: ["ngForOf", "ngForTrackBy", "ngForTemplate"] }, { kind: "directive", type: i1$3.ɵNgNoValidate, selector: "form:not([ngNoForm]):not([ngNativeValidate])" }, { kind: "directive", type: i1$3.DefaultValueAccessor, selector: "input:not([type=checkbox])[formControlName],textarea[formControlName],input:not([type=checkbox])[formControl],textarea[formControl],input:not([type=checkbox])[ngModel],textarea[ngModel],[ngDefaultControl]" }, { kind: "directive", type: i1$3.NgControlStatus, selector: "[formControlName],[ngModel],[formControl]" }, { kind: "directive", type: i1$3.NgControlStatusGroup, selector: "[formGroupName],[formArrayName],[ngModelGroup],[formGroup],form:not([ngNoForm]),[ngForm]" }, { kind: "directive", type: i1$3.FormGroupDirective, selector: "[formGroup]", inputs: ["formGroup"], outputs: ["ngSubmit"], exportAs: ["ngForm"] }, { kind: "directive", type: i1$3.FormControlName, selector: "[formControlName]", inputs: ["formControlName", "disabled", "ngModel"], outputs: ["ngModelChange"] }, { kind: "directive", type: i1$3.FormGroupName, selector: "[formGroupName]", inputs: ["formGroupName"] }, { kind: "directive", type: i1$3.FormArrayName, selector: "[formArrayName]", inputs: ["formArrayName"] }, { kind: "component", type: i5$1.MatFormField, selector: "mat-form-field", inputs: ["color", "appearance", "hideRequiredMarker", "hintLabel", "floatLabel"], exportAs: ["matFormField"] }, { kind: "directive", type: i5$1.MatLabel, selector: "mat-label" }, { kind: "component", type: i6.MatButton, selector: "button[mat-button], button[mat-raised-button], button[mat-icon-button],             button[mat-fab], button[mat-mini-fab], button[mat-stroked-button],             button[mat-flat-button]", inputs: ["disabled", "disableRipple", "color"], exportAs: ["matButton"] }, { kind: "directive", type: i7.MatInput, selector: "input[matInput], textarea[matInput], select[matNativeControl],      input[matNativeControl], textarea[matNativeControl]", inputs: ["disabled", "id", "placeholder", "name", "required", "type", "errorStateMatcher", "aria-describedby", "value", "readonly"], exportAs: ["matInput"] }, { kind: "component", type: i8$1.MatIcon, selector: "mat-icon", inputs: ["color", "inline", "svgIcon", "fontSet", "fontIcon"], exportAs: ["matIcon"] }, { kind: "directive", type: i7$2.CdkDropList, selector: "[cdkDropList], cdk-drop-list", inputs: ["cdkDropListConnectedTo", "cdkDropListData", "cdkDropListOrientation", "id", "cdkDropListLockAxis", "cdkDropListDisabled", "cdkDropListSortingDisabled", "cdkDropListEnterPredicate", "cdkDropListSortPredicate", "cdkDropListAutoScrollDisabled", "cdkDropListAutoScrollStep"], outputs: ["cdkDropListDropped", "cdkDropListEntered", "cdkDropListExited", "cdkDropListSorted"], exportAs: ["cdkDropList"] }, { kind: "directive", type: i7$2.CdkDropListGroup, selector: "[cdkDropListGroup]", inputs: ["cdkDropListGroupDisabled"], exportAs: ["cdkDropListGroup"] }, { kind: "directive", type: i7$2.CdkDrag, selector: "[cdkDrag]", inputs: ["cdkDragData", "cdkDragLockAxis", "cdkDragRootElement", "cdkDragBoundary", "cdkDragStartDelay", "cdkDragFreeDragPosition", "cdkDragDisabled", "cdkDragConstrainPosition", "cdkDragPreviewClass", "cdkDragPreviewContainer"], outputs: ["cdkDragStarted", "cdkDragReleased", "cdkDragEnded", "cdkDragEntered", "cdkDragExited", "cdkDragDropped", "cdkDragMoved"], exportAs: ["cdkDrag"] }, { kind: "directive", type: i7$2.CdkDragHandle, selector: "[cdkDragHandle]", inputs: ["cdkDragHandleDisabled"] }, { kind: "pipe", type: i5.TitleCasePipe, name: "titlecase" }] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "14.3.0", ngImport: i0, type: CreateCategoriesComponent, decorators: [{
            type: Component,
            args: [{ selector: 'lib-create-categories', template: "\n<div class=\"form-wrap\">\n    <h1>{{app_strings.createCategories}}</h1>\n    <form [formGroup]=\"createCategoriesForm\" (ngSubmit)=\"saveForm()\" novalidate>\n        <div class=\"form-field\">\n            <div class=\"form-field__wrap\" formArrayName=\"categories\" cdkDropListGroup>\n                <div cdkDropList [cdkDropListData]=\"categories().controls\" (cdkDropListDropped)=\"drop($event)\">\n                <div class=\"form__category\" *ngFor=\"let cat of categories().controls; let i = index\" >\n                        <mat-form-field appearance=\"outline\" [formGroupName]=\"i\" cdkDrag>\n                            <mat-label>{{app_strings.category}} {{i}}</mat-label>\n                            <input matInput placeholder=\"{{app_strings.categoryName}}\" formControlName=\"name\" (blur)=\"emitCategory($event)\"> \n                            <div class=\"drag-Handle\" cdkDragHandle>\n                                <svg width=\"24px\" fill=\"currentColor\" viewBox=\"0 0 24 24\">\n                                  <path d=\"M10 9h4V6h3l-5-5-5 5h3v3zm-1 1H6V7l-5 5 5 5v-3h3v-4zm14 2l-5-5v3h-3v4h3v3l5-5zm-9 3h-4v3H7l5 5 5-5h-3v-3z\"></path>\n                                  <path d=\"M0 0h24v24H0z\" fill=\"none\"></path>\n                                </svg>\n                            </div>\n                        </mat-form-field>\n                            <mat-icon (click)=\"removeCategory(i)\">{{app_strings.removeCircleOutline}}</mat-icon>\n                           \n                    </div>\n                </div>\n            </div>\n        </div>\n        <footer>\n            <button type=\"button\"  mat-raised-button (click)=\"addCategory()\" color=\"primary\">\n                {{app_strings.add | titlecase}}\n             </button>\n        </footer>\n    </form>\n</div>\n", styles: [".form-wrap{display:flex;flex-direction:column;justify-content:center;padding:15px}.form-wrap h1{font-size:24px;color:#666;font-weight:500}.form-field{display:flex;flex-direction:row;justify-content:start}.form-field__wrap{display:flex;flex-direction:column}.form-field__wrap .mat-form-field{width:350px}.form-field .mat-input-element{height:42px}.form__btns{display:flex;flex-direction:column;justify-content:end;padding-bottom:15px;margin-left:15px}.form__category{display:flex;flex-direction:row;justify-content:center;align-items:center}.form__category .mat-form-field .mat-form-field-appearance-outline{margin-bottom:0}.form__category .mat-icon{margin-left:20px;height:20px;padding:5px 5px 25px;color:#b60909;cursor:pointer}.drag-Handle{position:absolute;top:8px;right:0;color:#9b9b9b;cursor:grabbing}.cdk-drag-animating{transition:transform .25s cubic-bezier(0,0,.2,1)}.cdk-drop-list-dragging .example-box:not(.cdk-drag-placeholder){transition:transform .25s cubic-bezier(0,0,.2,1)}footer{display:flex;flex-direction:row;justify-content:start}footer .mat-raised-button{padding:0 40px}@media only screen and (max-width: 1024px){.form-wrap h1{font-size:20px}.form-wrap-field__wrap .mat-form-field{width:250px}.form-wrap ::ng-deep .mat-form-field-appearance-outline .mat-form-field-outline{top:10px;bottom:4px}.form-wrap ::ng-deep .mat-form-field-wrapper{padding-bottom:.3em}.form-wrap ::ng-deep .mat-input-element{font-size:10px}.form-wrap ::ng-deep .mat-raised-button{min-width:auto;padding:0 .5em;line-height:2em}}\n"] }]
        }], ctorParameters: function () { return [{ type: i1$3.FormBuilder }]; }, propDecorators: { taxonomyInfo: [{
                type: Input
            }], updateCategory: [{
                type: Output
            }], removeCategories: [{
                type: Output
            }], changePosition: [{
                type: Output
            }] } });

class CategoriesPreviewComponent {
    constructor() {
        this.lineRef = [];
        this.app_strings = labels;
    }
    ngOnChanges() {
        setTimeout(() => {
            this.drawLine();
        }, 200);
    }
    ngOnInit() { }
    // ngAfterViewInit() {
    //   this.drawLine()
    // }
    drawLine() {
        this.lineRef = [];
        for (let cat of this.data) {
            for (let term of cat.terms) {
                if (term.connected) {
                    const startEle = document.querySelector(`#${term.domId}`);
                    if (term.parent) {
                        const endEle = document.querySelector(`#${term.parent}`);
                        const line = new LeaderLine(startEle, endEle);
                        line.color = '#666';
                        line.endPlug = 'disc';
                        line.startPlug = 'disc';
                        this.lineRef.push(line);
                    }
                }
            }
        }
    }
}
CategoriesPreviewComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "14.3.0", ngImport: i0, type: CategoriesPreviewComponent, deps: [], target: i0.ɵɵFactoryTarget.Component });
CategoriesPreviewComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "14.3.0", type: CategoriesPreviewComponent, selector: "lib-categories-preview", inputs: { data: "data" }, usesOnChanges: true, ngImport: i0, template: "<div class=\"category\">\n    <h1>{{app_strings.categoryPreview}}</h1>\n    <div class=\"category__wrap\" *ngIf=\"data.length>0\">\n        <div class=\"category__column\" *ngFor=\"let cat of data\">\n            <header class=\"category__header\">{{cat.name}}</header>\n            <mat-card class=\"category__cards\"  [ngClass]=\"{'highlight':term.selected}\" id=\"{{term.domId}}\" *ngFor=\"let term of cat.terms\">\n                <span class=\"category__circle left\"></span>\n                <mat-card-content>{{term.name}}</mat-card-content>\n                <span class=\"category__circle right\"></span>\n            </mat-card>\n        </div>\n    </div>\n</div>\n", styles: [".category{display:flex;flex-flow:column;padding:15px}.category h1{font-size:24px;color:#666;font-weight:500}.category__wrap{display:flex;flex-flow:row;padding-top:20px}.category__column{display:flex;flex-flow:column;flex:1;padding:10px 50px;text-align:center}.category__header{margin:30px 0}.category__cards{margin-bottom:15px;position:relative;padding:20px 15px;background:#EEEEEE;box-shadow:0 0 #fff;border:2px solid #ccc}.category__cards.highlight{background:#666666;border:2px solid #666666;color:#fff}.category__circle{position:absolute;top:40%;display:inline-block}.category__circle.left{left:-3.6%}.category__circle.right{right:-3%}#start{width:200px;height:100px;margin:200px;background:#EEEEEE}@media only screen and (max-width: 1024px){.category h1{font-size:20px}.category__column{padding:10px 25px}}\n"], dependencies: [{ kind: "directive", type: i5.NgClass, selector: "[ngClass]", inputs: ["class", "ngClass"] }, { kind: "directive", type: i5.NgForOf, selector: "[ngFor][ngForOf]", inputs: ["ngForOf", "ngForTrackBy", "ngForTemplate"] }, { kind: "directive", type: i5.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { kind: "component", type: i6$1.MatCard, selector: "mat-card", exportAs: ["matCard"] }, { kind: "directive", type: i6$1.MatCardContent, selector: "mat-card-content, [mat-card-content], [matCardContent]" }] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "14.3.0", ngImport: i0, type: CategoriesPreviewComponent, decorators: [{
            type: Component,
            args: [{ selector: 'lib-categories-preview', template: "<div class=\"category\">\n    <h1>{{app_strings.categoryPreview}}</h1>\n    <div class=\"category__wrap\" *ngIf=\"data.length>0\">\n        <div class=\"category__column\" *ngFor=\"let cat of data\">\n            <header class=\"category__header\">{{cat.name}}</header>\n            <mat-card class=\"category__cards\"  [ngClass]=\"{'highlight':term.selected}\" id=\"{{term.domId}}\" *ngFor=\"let term of cat.terms\">\n                <span class=\"category__circle left\"></span>\n                <mat-card-content>{{term.name}}</mat-card-content>\n                <span class=\"category__circle right\"></span>\n            </mat-card>\n        </div>\n    </div>\n</div>\n", styles: [".category{display:flex;flex-flow:column;padding:15px}.category h1{font-size:24px;color:#666;font-weight:500}.category__wrap{display:flex;flex-flow:row;padding-top:20px}.category__column{display:flex;flex-flow:column;flex:1;padding:10px 50px;text-align:center}.category__header{margin:30px 0}.category__cards{margin-bottom:15px;position:relative;padding:20px 15px;background:#EEEEEE;box-shadow:0 0 #fff;border:2px solid #ccc}.category__cards.highlight{background:#666666;border:2px solid #666666;color:#fff}.category__circle{position:absolute;top:40%;display:inline-block}.category__circle.left{left:-3.6%}.category__circle.right{right:-3%}#start{width:200px;height:100px;margin:200px;background:#EEEEEE}@media only screen and (max-width: 1024px){.category h1{font-size:20px}.category__column{padding:10px 25px}}\n"] }]
        }], ctorParameters: function () { return []; }, propDecorators: { data: [{
                type: Input
            }] } });

class ConfigFrameworkComponent {
    constructor(frameworkService) {
        this.frameworkService = frameworkService;
        this.categoriesRepresentations = [];
        this.tempCategoryRepresentaions = [];
        this.oldElements = [];
    }
    ngOnInit() {
        this.frameworkService.getFrameworkInfo().subscribe(res => {
            console.log('Service...', res);
            this.frameworkCategories = res.result.framework.categories;
        });
        // this.categoriesRepresentations = categoryRepresentationsV1
    }
    //   updateCategory(data){
    //     for(let i=0;i<data.length;i++) {
    //         this.tempCategoryRepresentaions.push(
    //           {
    //             name: data[i].name,
    //             terms:this.updateTermArry(data[i].name, data[i+1]?data[i+1].name:'', i)
    //           }
    //         )
    //     }
    //     this.categoriesRepresentations = this.tempCategoryRepresentaions;
    //   }
    //   updateTermArry(current,next, index){
    //     let term = []
    //     if(index%2 === 0){
    //       term = [
    //         {
    //           name:`${current} 1`,
    //           domId:`${current}1`
    //         },
    //         {
    //           name: `${current} 2`,
    //           selected:true,
    //           connected:true,
    //           domId:`${current.toLowerCase()}2`,
    //           connectedDomId:next?`${next.toLowerCase()}1`:''
    //         }
    //       ]
    //     } else {
    //       term = [
    //         {
    //           name:`${current} 1`,
    //           selected:true,
    //           connected:true,
    //           domId:`${current.toLowerCase()}1`,
    //           connectedDomId:next?`${next.toLowerCase()}2`:''
    //         },
    //         {
    //           name: `${current} 2`,
    //           domId:`${current}2`
    //         }
    //       ]
    //     }
    //     return term
    //   }
    // }
    updateCategory(name) {
        this.removeOldLine();
        this.tempCategoryRepresentaions.push({
            name: name,
            terms: this.updateTermArry(name, this.categoriesRepresentations[this.categoriesRepresentations.length - 1], this.categoriesRepresentations.length)
        });
        this.categoriesRepresentations = [...this.tempCategoryRepresentaions];
        // console.log(this.categoriesRepresentations)
    }
    updateTermArry(current, parent, index) {
        let term = [];
        if (index % 2 === 0) {
            term = [
                {
                    name: `${current} 1`,
                    domId: `${current}1`
                },
                {
                    name: `${current} 2`,
                    selected: true,
                    connected: true,
                    domId: `${current.toLowerCase()}2`,
                    parent: parent ? `${parent.terms[0].domId}` : ''
                }
            ];
        }
        else {
            term = [
                {
                    name: `${current} 1`,
                    selected: true,
                    connected: true,
                    domId: `${current.toLowerCase()}1`,
                    parent: parent ? `${parent.terms[1].domId}` : ''
                },
                {
                    name: `${current} 2`,
                    domId: `${current}2`
                }
            ];
        }
        return term;
    }
    removeOldLine() {
        const eles = Array.from(document.getElementsByClassName('leader-line') || []);
        if (eles.length > 0) {
            eles.forEach(ele => ele.remove());
        }
    }
    removeCategory(index) {
        this.categoriesRepresentations.splice(index, 1);
        const temp = [...this.categoriesRepresentations];
        this.categoriesRepresentations = [];
        this.tempCategoryRepresentaions = [];
        temp.forEach(cat => {
            this.updateCategory(cat.name);
        });
    }
    changePosition(event) {
        let myArray = [...this.tempCategoryRepresentaions];
        myArray[event.cur] = myArray.splice(event.prev, 1, myArray[event.cur])[0];
        this.categoriesRepresentations = [];
        this.tempCategoryRepresentaions = [];
        myArray.forEach(cat => {
            this.updateCategory(cat.name);
        });
    }
}
ConfigFrameworkComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "14.3.0", ngImport: i0, type: ConfigFrameworkComponent, deps: [{ token: FrameworkService }], target: i0.ɵɵFactoryTarget.Component });
ConfigFrameworkComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "14.3.0", type: ConfigFrameworkComponent, selector: "lib-config-framework", ngImport: i0, template: "<div class=\"config__wrap\">\n    <lib-create-categories class=\"config__form-wrap\" [taxonomyInfo]=\"''\" (updateCategory)=\"updateCategory($event)\" \n    (removeCategories)=\"removeCategory($event)\" (changePosition)=\"changePosition($event)\"></lib-create-categories>\n    <ng-container *ngIf=\"categoriesRepresentations\">\n        <lib-categories-preview  class=\"config__preview\" [data]=\"categoriesRepresentations\"></lib-categories-preview>\n    </ng-container>\n </div>\n", styles: [".config__wrap{display:flex;flex-direction:row;align-items:start;height:100vh}.config__form-wrap{flex-grow:1}.config__preview{flex-grow:9}\n"], dependencies: [{ kind: "directive", type: i5.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { kind: "component", type: CreateCategoriesComponent, selector: "lib-create-categories", inputs: ["taxonomyInfo"], outputs: ["updateCategory", "removeCategories", "changePosition"] }, { kind: "component", type: CategoriesPreviewComponent, selector: "lib-categories-preview", inputs: ["data"] }] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "14.3.0", ngImport: i0, type: ConfigFrameworkComponent, decorators: [{
            type: Component,
            args: [{ selector: 'lib-config-framework', template: "<div class=\"config__wrap\">\n    <lib-create-categories class=\"config__form-wrap\" [taxonomyInfo]=\"''\" (updateCategory)=\"updateCategory($event)\" \n    (removeCategories)=\"removeCategory($event)\" (changePosition)=\"changePosition($event)\"></lib-create-categories>\n    <ng-container *ngIf=\"categoriesRepresentations\">\n        <lib-categories-preview  class=\"config__preview\" [data]=\"categoriesRepresentations\"></lib-categories-preview>\n    </ng-container>\n </div>\n", styles: [".config__wrap{display:flex;flex-direction:row;align-items:start;height:100vh}.config__form-wrap{flex-grow:1}.config__preview{flex-grow:9}\n"] }]
        }], ctorParameters: function () { return [{ type: FrameworkService }]; } });

class ApproveViewComponent {
    constructor(activatedRoute, approvalService, frameworkService, _snackBar) {
        this.activatedRoute = activatedRoute;
        this.approvalService = approvalService;
        this.frameworkService = frameworkService;
        this._snackBar = _snackBar;
        this.listItems = [];
        this.categories = [];
        this.showAction = true;
        this.lineRef = [];
    }
    ngOnInit() {
        this.list$ = this.activatedRoute.paramMap
            .pipe(map(() => {
            this.getworkFlowDetails(window.history.state.id);
            return window.history.state.id;
        }));
        this.getworkFlowDetails(this.activatedRoute.snapshot.params['id']);
    }
    getworkFlowDetails(id) {
        this.approvalService.getWorkflowDetails(id).subscribe((res) => {
            this.listItems = res.result.updateFieldValues.map((list) => {
                list.selected = false;
                return list;
            });
            this.workflowDetails = res.result;
            this.approvalService.setApprovalList(this.listItems);
        });
    }
    approvalRequest(approvalTerms) {
        const requestBody = {
            wfId: this.activatedRoute.snapshot.params['id'],
            state: this.workflowDetails.currentStatus,
            action: APPROVAL.APPROVE,
            serviceName: APPROVAL.SERVICE_NAME
        };
        this.approvalService.updateWorkFlowApproval(requestBody).subscribe(res => {
            console.log(res);
            this._snackBar.open('Terms successfully Approved.', 'cancel');
        });
    }
    closeActionBar(e) {
        this.showAction = false;
    }
    /* ***** Don't delete this code might need in Future ***** */
    // drawLine(){
    //   this.lineRef = []
    //   this.categories.forEach((cat, i) => {
    //     this.listItems.forEach((item, j) => {
    //       console.log(item)
    //       if(cat === item.category){
    //         for(let c of item.children){
    //           if(c.category === this.categories[i+1] && this.isExistInTermList(c)){
    //               const line = new LeaderLine(document.getElementById(item.name), document.getElementById(c.name))
    //               line.color='#666'
    //               line.endPlug = 'disc'
    //               line.startPlug = 'disc'
    //               this.lineRef.push(line)
    //           }
    //         }
    //       }
    //      })
    //   })
    // }
    // isExistInTermList(term){
    //   const count = this.listItems.filter(item => item.identifier == term.identifier)
    //   return count.length;
    // }
    ngOnDestroy() {
        this.frameworkService.removeOldLine();
    }
}
ApproveViewComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "14.3.0", ngImport: i0, type: ApproveViewComponent, deps: [{ token: i1$1.ActivatedRoute }, { token: ApprovalService }, { token: FrameworkService }, { token: i6$2.MatSnackBar }], target: i0.ɵɵFactoryTarget.Component });
ApproveViewComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "14.3.0", type: ApproveViewComponent, selector: "lib-approve-view", ngImport: i0, template: "<!-- <div class=\"approve-view__container\" *ngIf=\"listItems && listItems.length > 0 \">\n        <ng-container *ngFor=\"let column of categories let i = index;\">\n            <div class=\"approve-view__columns\">\n                   <h4 class=\"approve-view__columns-title\">{{column}}</h4> \n                <section>\n                    <ng-container *ngFor=\"let term of listItems\">\n                        <div *ngIf=\"column === term.category\" >\n                            <lib-term-card\n                                [data]=\"{'children': term, 'selected' : false, 'category':column, cardSubType: 'minimal', isViewOnly:true}\">\n                            </lib-term-card>\n                        </div>\n                        \n                    </ng-container>\n                </section>\n            </div>\n        </ng-container>\n        <lib-action-bar *ngIf=\"showAction\" [configType]=\"workflowDetails.currentStatus\" [actionType]=\"'approve'\" (sendApproval)=\"approvalRequest()\" (closeAction)=\"closeActionBar($event)\"></lib-action-bar> \n</div> -->\n<ng-container *ngIf=\"listItems\">\n    <lib-taxonomy-view \n        [isApprovalView]=\"true\" \n        [approvalList]=\"listItems\" \n        [workFlowStatus]=\"workflowDetails?.currentStatus\"\n        (sentForApprove)=\"approvalRequest($event)\">\n    </lib-taxonomy-view>\n</ng-container>\n", styles: [".approve-view__container{display:flex;justify-content:center;flex-direction:row}.approve-view__columns{flex:1;padding:30px}.approve-view__columns-title{text-transform:capitalize;font-size:20px}\n"], dependencies: [{ kind: "directive", type: i5.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { kind: "component", type: TaxonomyViewComponent, selector: "lib-taxonomy-view", inputs: ["approvalList", "isApprovalView", "workFlowStatus", "environment", "taxonomyConfig"], outputs: ["sentForApprove"] }] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "14.3.0", ngImport: i0, type: ApproveViewComponent, decorators: [{
            type: Component,
            args: [{ selector: 'lib-approve-view', template: "<!-- <div class=\"approve-view__container\" *ngIf=\"listItems && listItems.length > 0 \">\n        <ng-container *ngFor=\"let column of categories let i = index;\">\n            <div class=\"approve-view__columns\">\n                   <h4 class=\"approve-view__columns-title\">{{column}}</h4> \n                <section>\n                    <ng-container *ngFor=\"let term of listItems\">\n                        <div *ngIf=\"column === term.category\" >\n                            <lib-term-card\n                                [data]=\"{'children': term, 'selected' : false, 'category':column, cardSubType: 'minimal', isViewOnly:true}\">\n                            </lib-term-card>\n                        </div>\n                        \n                    </ng-container>\n                </section>\n            </div>\n        </ng-container>\n        <lib-action-bar *ngIf=\"showAction\" [configType]=\"workflowDetails.currentStatus\" [actionType]=\"'approve'\" (sendApproval)=\"approvalRequest()\" (closeAction)=\"closeActionBar($event)\"></lib-action-bar> \n</div> -->\n<ng-container *ngIf=\"listItems\">\n    <lib-taxonomy-view \n        [isApprovalView]=\"true\" \n        [approvalList]=\"listItems\" \n        [workFlowStatus]=\"workflowDetails?.currentStatus\"\n        (sentForApprove)=\"approvalRequest($event)\">\n    </lib-taxonomy-view>\n</ng-container>\n", styles: [".approve-view__container{display:flex;justify-content:center;flex-direction:row}.approve-view__columns{flex:1;padding:30px}.approve-view__columns-title{text-transform:capitalize;font-size:20px}\n"] }]
        }], ctorParameters: function () { return [{ type: i1$1.ActivatedRoute }, { type: ApprovalService }, { type: FrameworkService }, { type: i6$2.MatSnackBar }]; } });

const routes = [
    {
        path: '',
        pathMatch: 'full',
        redirectTo: '/taxonomy-view'
    },
    {
        path: 'taxonomy-view',
        component: TaxonomyViewComponent
    },
    {
        path: 'config', component: ConfigFrameworkComponent
    },
    {
        path: 'approval', component: ApprovalComponent
    },
    {
        path: 'approval/:id', component: ApproveViewComponent
    }
];
class SbTaxonomyEditorRoutingModule {
}
SbTaxonomyEditorRoutingModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "14.3.0", ngImport: i0, type: SbTaxonomyEditorRoutingModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
SbTaxonomyEditorRoutingModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "14.3.0", ngImport: i0, type: SbTaxonomyEditorRoutingModule, imports: [i1$1.RouterModule], exports: [RouterModule] });
SbTaxonomyEditorRoutingModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "14.3.0", ngImport: i0, type: SbTaxonomyEditorRoutingModule, imports: [RouterModule.forChild(routes), RouterModule] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "14.3.0", ngImport: i0, type: SbTaxonomyEditorRoutingModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [
                        RouterModule.forChild(routes),
                    ],
                    exports: [RouterModule],
                    providers: [],
                }]
        }] });

class DashboardComponent {
    constructor() { }
    ngOnInit() {
    }
}
DashboardComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "14.3.0", ngImport: i0, type: DashboardComponent, deps: [], target: i0.ɵɵFactoryTarget.Component });
DashboardComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "14.3.0", type: DashboardComponent, selector: "lib-dashboard", ngImport: i0, template: "<p>dashboard works!</p>\n", styles: [""] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "14.3.0", ngImport: i0, type: DashboardComponent, decorators: [{
            type: Component,
            args: [{ selector: 'lib-dashboard', template: "<p>dashboard works!</p>\n" }]
        }], ctorParameters: function () { return []; } });

class TokenInterceptorService {
    constructor(frameWorkServie) {
        this.frameWorkServie = frameWorkServie;
    }
    intercept(req, next) {
        const env = this.frameWorkServie.getEnviroment();
        const request = req.clone({
            setHeaders: {
                Authorization: env.authToken,
                // channelId: env.channelId
                // userToken:env.userToken
            }
        });
        return next.handle(request);
    }
}
TokenInterceptorService.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "14.3.0", ngImport: i0, type: TokenInterceptorService, deps: [{ token: FrameworkService }], target: i0.ɵɵFactoryTarget.Injectable });
TokenInterceptorService.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "14.3.0", ngImport: i0, type: TokenInterceptorService, providedIn: 'root' });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "14.3.0", ngImport: i0, type: TokenInterceptorService, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root'
                }]
        }], ctorParameters: function () { return [{ type: FrameworkService }]; } });

class LandingPageComponent {
    constructor(frameworkService) {
        this.frameworkService = frameworkService;
        this.app_strings = labels;
    }
    ngOnInit() {
        this.frameworkService.getFrameworkInfo().subscribe(res => {
            console.log('Service...', res);
            this.frameworkCategories = res.result.framework.categories;
        });
    }
}
LandingPageComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "14.3.0", ngImport: i0, type: LandingPageComponent, deps: [{ token: FrameworkService }], target: i0.ɵɵFactoryTarget.Component });
LandingPageComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "14.3.0", type: LandingPageComponent, selector: "lib-landing-page", ngImport: i0, template: "<div class=\"landing-wrap\">\n    <lib-create-categories [taxonomyInfo]=\"frameworkCategories\"></lib-create-categories>\n    <div>\n        {{app_strings.treeView}}\n    </div>\n</div>\n", styles: [".landing-wrap{display:flex;flex-direction:row;justify-content:space-evenly;align-items:center;height:100vh}\n"], dependencies: [{ kind: "component", type: CreateCategoriesComponent, selector: "lib-create-categories", inputs: ["taxonomyInfo"], outputs: ["updateCategory", "removeCategories", "changePosition"] }] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "14.3.0", ngImport: i0, type: LandingPageComponent, decorators: [{
            type: Component,
            args: [{ selector: 'lib-landing-page', template: "<div class=\"landing-wrap\">\n    <lib-create-categories [taxonomyInfo]=\"frameworkCategories\"></lib-create-categories>\n    <div>\n        {{app_strings.treeView}}\n    </div>\n</div>\n", styles: [".landing-wrap{display:flex;flex-direction:row;justify-content:space-evenly;align-items:center;height:100vh}\n"] }]
        }], ctorParameters: function () { return [{ type: FrameworkService }]; } });

class SbTaxonomyEditorModule {
    static forChild(config) {
        return {
            ngModule: SbTaxonomyEditorModule,
            providers: [
            // LocalConnectionService,
            // {
            //   provide: ENVIRONMENT,
            //   useValue: config
            // }
            ]
        };
    }
}
SbTaxonomyEditorModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "14.3.0", ngImport: i0, type: SbTaxonomyEditorModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
SbTaxonomyEditorModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "14.3.0", ngImport: i0, type: SbTaxonomyEditorModule, declarations: [SbTaxonomyEditorComponent,
        DashboardComponent,
        ConfigFrameworkComponent,
        CreateCategoriesComponent,
        ConfigFrameworkComponent,
        TaxonomyViewComponent,
        LandingPageComponent,
        TermCardComponent,
        TaxonomyColumnViewComponent,
        CategoriesPreviewComponent,
        CategoriesPreviewComponent,
        CreateTermComponent,
        ConnectorComponent,
        ActionBarComponent,
        ApprovalComponent,
        PendingApprovalComponent,
        ApproveViewComponent,
        OrderByPipe,
        DatePipe,
        ConfirmDialogBoxComponent], imports: [CommonModule,
        SbTaxonomyEditorRoutingModule,
        ReactiveFormsModule,
        FormsModule,
        MatFormFieldModule,
        MatButtonModule,
        MatInputModule,
        MatIconModule,
        MatCardModule,
        MatDialogModule,
        DragDropModule,
        MatAutocompleteModule,
        MatSelectModule,
        HttpClientModule,
        MatTabsModule,
        MatSnackBarModule,
        MatTooltipModule,
        MatCheckboxModule,
        MatTableModule,
        MatProgressSpinnerModule,
        MatMenuModule], exports: [SbTaxonomyEditorComponent,
        CreateCategoriesComponent,
        ConfigFrameworkComponent,
        TaxonomyViewComponent,
        TermCardComponent,
        CategoriesPreviewComponent,
        ConfigFrameworkComponent] });
SbTaxonomyEditorModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "14.3.0", ngImport: i0, type: SbTaxonomyEditorModule, providers: [
        { provide: MAT_FORM_FIELD_DEFAULT_OPTIONS, useValue: { appearance: 'outline' } },
        { provide: HTTP_INTERCEPTORS, useClass: TokenInterceptorService, multi: true },
        { provide: MAT_SNACK_BAR_DEFAULT_OPTIONS, useValue: { duration: 2000 } },
        { provide: MAT_TABS_CONFIG, useValue: { animationDuration: '0ms' } },
        FrameworkService,
        ConnectorService,
        LocalConnectionService,
    ], imports: [CommonModule,
        SbTaxonomyEditorRoutingModule,
        ReactiveFormsModule,
        FormsModule,
        MatFormFieldModule,
        MatButtonModule,
        MatInputModule,
        MatIconModule,
        MatCardModule,
        MatDialogModule,
        DragDropModule,
        MatAutocompleteModule,
        MatSelectModule,
        HttpClientModule,
        MatTabsModule,
        MatSnackBarModule,
        MatTooltipModule,
        MatCheckboxModule,
        MatTableModule,
        MatProgressSpinnerModule,
        MatMenuModule] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "14.3.0", ngImport: i0, type: SbTaxonomyEditorModule, decorators: [{
            type: NgModule,
            args: [{
                    declarations: [
                        SbTaxonomyEditorComponent,
                        DashboardComponent,
                        ConfigFrameworkComponent,
                        CreateCategoriesComponent,
                        ConfigFrameworkComponent,
                        TaxonomyViewComponent,
                        LandingPageComponent,
                        TermCardComponent,
                        TaxonomyColumnViewComponent,
                        CategoriesPreviewComponent,
                        CategoriesPreviewComponent,
                        CreateTermComponent,
                        ConnectorComponent,
                        ActionBarComponent,
                        ApprovalComponent,
                        PendingApprovalComponent,
                        ApproveViewComponent,
                        OrderByPipe,
                        DatePipe,
                        ConfirmDialogBoxComponent
                    ],
                    imports: [
                        CommonModule,
                        SbTaxonomyEditorRoutingModule,
                        ReactiveFormsModule,
                        FormsModule,
                        MatFormFieldModule,
                        MatButtonModule,
                        MatInputModule,
                        MatIconModule,
                        MatCardModule,
                        MatDialogModule,
                        DragDropModule,
                        MatAutocompleteModule,
                        MatSelectModule,
                        HttpClientModule,
                        MatTabsModule,
                        MatSnackBarModule,
                        MatTooltipModule,
                        MatCheckboxModule,
                        MatTableModule,
                        MatProgressSpinnerModule,
                        MatMenuModule
                    ],
                    providers: [
                        { provide: MAT_FORM_FIELD_DEFAULT_OPTIONS, useValue: { appearance: 'outline' } },
                        { provide: HTTP_INTERCEPTORS, useClass: TokenInterceptorService, multi: true },
                        { provide: MAT_SNACK_BAR_DEFAULT_OPTIONS, useValue: { duration: 2000 } },
                        { provide: MAT_TABS_CONFIG, useValue: { animationDuration: '0ms' } },
                        FrameworkService,
                        ConnectorService,
                        LocalConnectionService,
                    ],
                    exports: [
                        SbTaxonomyEditorComponent,
                        CreateCategoriesComponent,
                        ConfigFrameworkComponent,
                        TaxonomyViewComponent,
                        TermCardComponent,
                        CategoriesPreviewComponent,
                        ConfigFrameworkComponent
                    ],
                    entryComponents: [
                        CreateTermComponent,
                        ConnectorComponent,
                    ],
                    schemas: [CUSTOM_ELEMENTS_SCHEMA]
                }]
        }] });

/*
 * Public API Surface of sb-taxonomy-editor
 */

/**
 * Generated bundle index. Do not edit.
 */

export { CategoriesPreviewComponent, ConfigFrameworkComponent, CreateCategoriesComponent, SbTaxonomyEditorComponent, SbTaxonomyEditorModule, SbTaxonomyEditorService, TaxonomyViewComponent, TermCardComponent };
//# sourceMappingURL=sb-taxonomy-editor.mjs.map
