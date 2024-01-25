import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CreateTermComponent } from '../create-term/create-term.component';
import { ConnectorComponent } from '../connector/connector.component';
import { defaultConfig, headerLineConfig } from '../../constants/app-constant';
import { labels } from '../../labels/strings';
import * as i0 from "@angular/core";
import * as i1 from "../../services/framework.service";
import * as i2 from "../../services/local-connection.service";
import * as i3 from "@angular/material/dialog";
import * as i4 from "../../services/approval.service";
import * as i5 from "@angular/router";
import * as i6 from "@angular/material/snack-bar";
import * as i7 from "../../services/connector.service";
import * as i8 from "@angular/common";
import * as i9 from "@angular/material/button";
import * as i10 from "@angular/material/icon";
import * as i11 from "@angular/material/progress-spinner";
import * as i12 from "../taxonomy-column-view/taxonomy-column-view.component";
import * as i13 from "../action-bar/action-bar.component";
export class TaxonomyViewComponent {
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
TaxonomyViewComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "14.3.0", ngImport: i0, type: TaxonomyViewComponent, deps: [{ token: i1.FrameworkService }, { token: i2.LocalConnectionService }, { token: i3.MatDialog }, { token: i4.ApprovalService }, { token: i5.Router }, { token: i6.MatSnackBar }, { token: i7.ConnectorService }], target: i0.ɵɵFactoryTarget.Component });
TaxonomyViewComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "14.3.0", type: TaxonomyViewComponent, selector: "lib-taxonomy-view", inputs: { approvalList: "approvalList", isApprovalView: "isApprovalView", workFlowStatus: "workFlowStatus", environment: "environment", taxonomyConfig: "taxonomyConfig" }, outputs: { sentForApprove: "sentForApprove" }, usesOnChanges: true, ngImport: i0, template: "<div class=\"flex flex-1 connectionSettings hide\">\n    <button mat-raised-button color=\"accent\" (click)=\"newConnection()\">\n        <mat-icon>{{app_strings.build}}</mat-icon>\n    </button>\n</div>\n\n<div *ngIf=\"list && list.length > 0\" class=\"flex heightFix \">\n    <ng-container *ngFor=\"let column of list; let i = index;\">\n        <div class=\"flex-1 felx-col  col-container containers{{list.length}}\" id=\"box{{i+1}}Container\">\n            <div class=\"category-heading-sticky\">\n                <div class=\"category-heading-container\">\n                    <div class='category-header'>\n                        <div class=\"category-header-items\" id=\"box{{i}}Header\">\n                            <mat-icon [ngStyle]=\"{'color':column.config.color}\">{{column.config.icon}}</mat-icon>\n                            <h4>{{column.name}}</h4>\n                            <ng-container *ngIf=\"i != 0 && categoryList?.length > 0; else firstColumn\">\n                                <ng-container *ngFor=\"let category of categoryList\">\n                                    <ng-container *ngIf=\"(column.code == category.category) && column.index !== 1\">\n                                        <span>{{category.count}}</span>\n                                    </ng-container>\n                                </ng-container>\n                            </ng-container>\n                            <ng-template #firstColumn>\n                                <span *ngIf=\"i == 0\" id=\"box{{i+1}}count\">{{column.children.length}}</span>\n                            </ng-template>\n                            <div class=\"arrow\" id=\"box{{i+1}}count\"></div>\n                        </div>\n                    </div>\n                    <div class=\"mb1\" *ngIf=\"!isApprovalView\">\n                        <button [disabled]=\"isEnabled(column.code)\" class=\"w-full addCardButton\" mat-stroked-button\n                            color=\"primary\" (click)=\"openCreateTermDialog(column, i)\">\n                            {{app_strings.createNew}} {{column.name}}\n                            <mat-icon>{{app_strings.add}}</mat-icon>\n                        </button>\n                    </div>\n                </div>\n            </div>\n            <!-- {{column.code}} -->\n            <div class=\"padding-x2 cat-columns container\" id=\"box{{i+1}}\">\n                <lib-taxonomy-column-view *ngIf=\"loaded[column.code]\" #selectedTaxonomyTerm [column]=\"column\"\n                    [containerId]=\"'box'+(i+1)\" (updateTaxonomyTerm)=\"updateTaxonomyTerm($event)\"\n                    (updateTermList)=\"updateDraftStatusTerms($event)\" (cardsCount)=\"getNoOfCards($event)\">\n                </lib-taxonomy-column-view>\n            </div>\n        </div>\n    </ng-container>\n    <lib-action-bar *ngIf=\"showActionBar\" [actionType]=\"isApprovalView\" [configType]=\"workFlowStatus\"\n        (sendApproval)=\"sendForApproval()\" (closeAction)=\"closeActionBar($event)\"></lib-action-bar>\n</div>\n<div *ngIf=\"!(list && list.length > 0 )\" class=\"flex heightFix \">\n    <h1>{{app_strings.noData}}</h1>\n<div>\n<div *ngIf=\"isLoading\" class=\"spinner\">\n    <mat-spinner></mat-spinner>\n</div>\n    ", styles: [".connectionSettings{flex-direction:row-reverse;z-index:40;position:fixed;padding:0 4px 4px 0;bottom:0;right:0;display:none}.flex{display:flex}.w-full{width:100%;align-items:center;display:flex}.w-full.mat-stroked-button{padding:.25em .8em;text-align:left;border:2px dotted #b1b1b1;color:#666;border-radius:8px}.w-full.mat-stroked-button .mat-icon{position:absolute;top:0%;right:3%;height:100%;display:flex;align-items:center}.mb1{margin-bottom:1em}flex-center{flex-wrap:nowrap;align-items:start;justify-content:center}.flex-1{flex:1}.felx-col{flex-direction:column}.padding-x2{padding:0 2.5em}.heightFix{height:100%;width:100%;justify-content:space-around;margin-top:30px}.cat-columns{position:relative;height:inherit}.col-container{height:inherit}.category-heading-sticky{top:0;position:sticky;width:100%;background:#fff;margin-bottom:5px;z-index:10}.category-heading-container{box-sizing:content-box;position:relative;display:block;padding:1px 2.5em}.category-heading-container .category-header{display:flex;align-items:center}.category-heading-container .category-header-items{display:flex;align-items:center;padding:0 10px}.category-heading-container .category-header h4{padding:0 10px;color:#00000080}.category-heading-container .category-header span{background-color:#f0f0f0;padding:2px 6px;border-radius:6px}.cat-columns:hover{overflow-y:scroll}.container{overflow-y:auto;scrollbar-width:none;-ms-overflow-style:none;height:calc(100% - 16vh)}.container::-webkit-scrollbar{width:0;height:0}.spinner{position:fixed;display:flex;top:50%;left:50%}.arrow{left:30px;position:relative}@media only screen and (max-width: 1024px){::ng-deep mat-checkbox .mat-checkbox-inner-container{height:.8em;width:.8em}}@media only screen and (max-width: 1024px){.containers4{max-width:250px;font-size:10px}.containers5{max-width:230px}.containers6{max-width:150px}.containers7{max-width:100px}.w-full{height:3.5em}.w-full.mat-stroked-button{font-size:8px}.padding-x2,.category-heading-container{padding:0 2em}mat-icon{font-size:12px;width:1.25em;height:1.25em}.connectionSettings .mat-raised-button{min-width:auto;padding:0 .5em;line-height:2em}}@media only screen and (max-width: 992px){.containers4{max-width:220px;font-size:9px}.padding-x2,.category-heading-container{padding:0 1.5em}}@media only screen and (max-width: 768px){.containers4{max-width:165px;font-size:8px}.w-full{height:2.5em}.padding-x2,.category-heading-container{padding:0 1em}mat-icon{font-size:8px;width:1em;height:1em}.connectionSettings .mat-raised-button{min-width:auto;padding:0 .3em;line-height:1.5em}}\n"], dependencies: [{ kind: "directive", type: i8.NgForOf, selector: "[ngFor][ngForOf]", inputs: ["ngForOf", "ngForTrackBy", "ngForTemplate"] }, { kind: "directive", type: i8.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { kind: "directive", type: i8.NgStyle, selector: "[ngStyle]", inputs: ["ngStyle"] }, { kind: "component", type: i9.MatButton, selector: "button[mat-button], button[mat-raised-button], button[mat-icon-button],             button[mat-fab], button[mat-mini-fab], button[mat-stroked-button],             button[mat-flat-button]", inputs: ["disabled", "disableRipple", "color"], exportAs: ["matButton"] }, { kind: "component", type: i10.MatIcon, selector: "mat-icon", inputs: ["color", "inline", "svgIcon", "fontSet", "fontIcon"], exportAs: ["matIcon"] }, { kind: "component", type: i11.MatProgressSpinner, selector: "mat-progress-spinner, mat-spinner", inputs: ["color", "diameter", "strokeWidth", "mode", "value"], exportAs: ["matProgressSpinner"] }, { kind: "component", type: i12.TaxonomyColumnViewComponent, selector: "lib-taxonomy-column-view", inputs: ["column", "containerId"], outputs: ["updateTaxonomyTerm", "updateTermList", "cardsCount"] }, { kind: "component", type: i13.ActionBarComponent, selector: "lib-action-bar", inputs: ["actionType", "configType"], outputs: ["sendApproval", "closeAction"] }] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "14.3.0", ngImport: i0, type: TaxonomyViewComponent, decorators: [{
            type: Component,
            args: [{ selector: 'lib-taxonomy-view', template: "<div class=\"flex flex-1 connectionSettings hide\">\n    <button mat-raised-button color=\"accent\" (click)=\"newConnection()\">\n        <mat-icon>{{app_strings.build}}</mat-icon>\n    </button>\n</div>\n\n<div *ngIf=\"list && list.length > 0\" class=\"flex heightFix \">\n    <ng-container *ngFor=\"let column of list; let i = index;\">\n        <div class=\"flex-1 felx-col  col-container containers{{list.length}}\" id=\"box{{i+1}}Container\">\n            <div class=\"category-heading-sticky\">\n                <div class=\"category-heading-container\">\n                    <div class='category-header'>\n                        <div class=\"category-header-items\" id=\"box{{i}}Header\">\n                            <mat-icon [ngStyle]=\"{'color':column.config.color}\">{{column.config.icon}}</mat-icon>\n                            <h4>{{column.name}}</h4>\n                            <ng-container *ngIf=\"i != 0 && categoryList?.length > 0; else firstColumn\">\n                                <ng-container *ngFor=\"let category of categoryList\">\n                                    <ng-container *ngIf=\"(column.code == category.category) && column.index !== 1\">\n                                        <span>{{category.count}}</span>\n                                    </ng-container>\n                                </ng-container>\n                            </ng-container>\n                            <ng-template #firstColumn>\n                                <span *ngIf=\"i == 0\" id=\"box{{i+1}}count\">{{column.children.length}}</span>\n                            </ng-template>\n                            <div class=\"arrow\" id=\"box{{i+1}}count\"></div>\n                        </div>\n                    </div>\n                    <div class=\"mb1\" *ngIf=\"!isApprovalView\">\n                        <button [disabled]=\"isEnabled(column.code)\" class=\"w-full addCardButton\" mat-stroked-button\n                            color=\"primary\" (click)=\"openCreateTermDialog(column, i)\">\n                            {{app_strings.createNew}} {{column.name}}\n                            <mat-icon>{{app_strings.add}}</mat-icon>\n                        </button>\n                    </div>\n                </div>\n            </div>\n            <!-- {{column.code}} -->\n            <div class=\"padding-x2 cat-columns container\" id=\"box{{i+1}}\">\n                <lib-taxonomy-column-view *ngIf=\"loaded[column.code]\" #selectedTaxonomyTerm [column]=\"column\"\n                    [containerId]=\"'box'+(i+1)\" (updateTaxonomyTerm)=\"updateTaxonomyTerm($event)\"\n                    (updateTermList)=\"updateDraftStatusTerms($event)\" (cardsCount)=\"getNoOfCards($event)\">\n                </lib-taxonomy-column-view>\n            </div>\n        </div>\n    </ng-container>\n    <lib-action-bar *ngIf=\"showActionBar\" [actionType]=\"isApprovalView\" [configType]=\"workFlowStatus\"\n        (sendApproval)=\"sendForApproval()\" (closeAction)=\"closeActionBar($event)\"></lib-action-bar>\n</div>\n<div *ngIf=\"!(list && list.length > 0 )\" class=\"flex heightFix \">\n    <h1>{{app_strings.noData}}</h1>\n<div>\n<div *ngIf=\"isLoading\" class=\"spinner\">\n    <mat-spinner></mat-spinner>\n</div>\n    ", styles: [".connectionSettings{flex-direction:row-reverse;z-index:40;position:fixed;padding:0 4px 4px 0;bottom:0;right:0;display:none}.flex{display:flex}.w-full{width:100%;align-items:center;display:flex}.w-full.mat-stroked-button{padding:.25em .8em;text-align:left;border:2px dotted #b1b1b1;color:#666;border-radius:8px}.w-full.mat-stroked-button .mat-icon{position:absolute;top:0%;right:3%;height:100%;display:flex;align-items:center}.mb1{margin-bottom:1em}flex-center{flex-wrap:nowrap;align-items:start;justify-content:center}.flex-1{flex:1}.felx-col{flex-direction:column}.padding-x2{padding:0 2.5em}.heightFix{height:100%;width:100%;justify-content:space-around;margin-top:30px}.cat-columns{position:relative;height:inherit}.col-container{height:inherit}.category-heading-sticky{top:0;position:sticky;width:100%;background:#fff;margin-bottom:5px;z-index:10}.category-heading-container{box-sizing:content-box;position:relative;display:block;padding:1px 2.5em}.category-heading-container .category-header{display:flex;align-items:center}.category-heading-container .category-header-items{display:flex;align-items:center;padding:0 10px}.category-heading-container .category-header h4{padding:0 10px;color:#00000080}.category-heading-container .category-header span{background-color:#f0f0f0;padding:2px 6px;border-radius:6px}.cat-columns:hover{overflow-y:scroll}.container{overflow-y:auto;scrollbar-width:none;-ms-overflow-style:none;height:calc(100% - 16vh)}.container::-webkit-scrollbar{width:0;height:0}.spinner{position:fixed;display:flex;top:50%;left:50%}.arrow{left:30px;position:relative}@media only screen and (max-width: 1024px){::ng-deep mat-checkbox .mat-checkbox-inner-container{height:.8em;width:.8em}}@media only screen and (max-width: 1024px){.containers4{max-width:250px;font-size:10px}.containers5{max-width:230px}.containers6{max-width:150px}.containers7{max-width:100px}.w-full{height:3.5em}.w-full.mat-stroked-button{font-size:8px}.padding-x2,.category-heading-container{padding:0 2em}mat-icon{font-size:12px;width:1.25em;height:1.25em}.connectionSettings .mat-raised-button{min-width:auto;padding:0 .5em;line-height:2em}}@media only screen and (max-width: 992px){.containers4{max-width:220px;font-size:9px}.padding-x2,.category-heading-container{padding:0 1.5em}}@media only screen and (max-width: 768px){.containers4{max-width:165px;font-size:8px}.w-full{height:2.5em}.padding-x2,.category-heading-container{padding:0 1em}mat-icon{font-size:8px;width:1em;height:1em}.connectionSettings .mat-raised-button{min-width:auto;padding:0 .3em;line-height:1.5em}}\n"] }]
        }], ctorParameters: function () { return [{ type: i1.FrameworkService }, { type: i2.LocalConnectionService }, { type: i3.MatDialog }, { type: i4.ApprovalService }, { type: i5.Router }, { type: i6.MatSnackBar }, { type: i7.ConnectorService }]; }, propDecorators: { approvalList: [{
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGF4b25vbXktdmlldy5jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi9wcm9qZWN0cy9zYi10YXhvbm9teS1lZGl0b3Ivc3JjL2xpYi9jb21wb25lbnRzL3RheG9ub215LXZpZXcvdGF4b25vbXktdmlldy5jb21wb25lbnQudHMiLCIuLi8uLi8uLi8uLi8uLi8uLi9wcm9qZWN0cy9zYi10YXhvbm9teS1lZGl0b3Ivc3JjL2xpYi9jb21wb25lbnRzL3RheG9ub215LXZpZXcvdGF4b25vbXktdmlldy5jb21wb25lbnQuaHRtbCJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsU0FBUyxFQUFjLEtBQUssRUFBcUIsTUFBTSxFQUE0QixZQUFZLEVBQWEsTUFBTSxlQUFlLENBQUM7QUFHM0ksT0FBTyxFQUFFLG1CQUFtQixFQUFFLE1BQU0sc0NBQXNDLENBQUM7QUFDM0UsT0FBTyxFQUFFLGtCQUFrQixFQUFFLE1BQU0sa0NBQWtDLENBQUM7QUFRdEUsT0FBTyxFQUFFLGFBQWEsRUFBRSxnQkFBZ0IsRUFBRSxNQUFNLDhCQUE4QixDQUFDO0FBQy9FLE9BQU8sRUFBRSxNQUFNLEVBQUUsTUFBTSxzQkFBc0IsQ0FBQzs7Ozs7Ozs7Ozs7Ozs7O0FBUzlDLE1BQU0sT0FBTyxxQkFBcUI7SUFvQmhDLFlBQW9CLGdCQUFrQyxFQUM1QyxRQUFnQyxFQUNqQyxNQUFpQixFQUNoQixlQUFnQyxFQUNoQyxNQUFjLEVBQ2QsU0FBc0IsRUFDdEIsWUFBOEI7UUFOcEIscUJBQWdCLEdBQWhCLGdCQUFnQixDQUFrQjtRQUM1QyxhQUFRLEdBQVIsUUFBUSxDQUF3QjtRQUNqQyxXQUFNLEdBQU4sTUFBTSxDQUFXO1FBQ2hCLG9CQUFlLEdBQWYsZUFBZSxDQUFpQjtRQUNoQyxXQUFNLEdBQU4sTUFBTSxDQUFRO1FBQ2QsY0FBUyxHQUFULFNBQVMsQ0FBYTtRQUN0QixpQkFBWSxHQUFaLFlBQVksQ0FBa0I7UUF6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QUFDLGdCQUFnQixDQUFDLGlCQUFpQixDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsQ0FBQztZQUMxRCxJQUFJLENBQUMsZ0JBQWdCLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxjQUFjLENBQUMsQ0FBQztTQUN0RDtJQUNILENBQUM7SUFFRCxXQUFXO1FBQ1AsSUFBSSxDQUFDLGdCQUFnQixDQUFDLGFBQWEsRUFBRSxDQUFDO0lBQzFDLENBQUM7O2tIQXBVVSxxQkFBcUI7c0dBQXJCLHFCQUFxQix5U0N0QmxDLCtyR0F1REk7MkZEakNTLHFCQUFxQjtrQkFMakMsU0FBUzsrQkFDRSxtQkFBbUI7Z1JBS3BCLFlBQVk7c0JBQXBCLEtBQUs7Z0JBQ0csY0FBYztzQkFBdEIsS0FBSztnQkFDRyxjQUFjO3NCQUF0QixLQUFLO2dCQUNHLFdBQVc7c0JBQW5CLEtBQUs7Z0JBQ0csY0FBYztzQkFBdEIsS0FBSztnQkFFSSxjQUFjO3NCQUF2QixNQUFNIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tcG9uZW50LCBFbGVtZW50UmVmLCBJbnB1dCwgT25DaGFuZ2VzLCBPbkluaXQsIE91dHB1dCwgU2ltcGxlQ2hhbmdlcywgVmlld0NoaWxkLCBFdmVudEVtaXR0ZXIsIE9uRGVzdHJveSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgRnJhbWV3b3JrU2VydmljZSB9IGZyb20gJy4uLy4uL3NlcnZpY2VzL2ZyYW1ld29yay5zZXJ2aWNlJztcbmltcG9ydCB7IE1hdERpYWxvZyB9IGZyb20gJ0Bhbmd1bGFyL21hdGVyaWFsL2RpYWxvZyc7XG5pbXBvcnQgeyBDcmVhdGVUZXJtQ29tcG9uZW50IH0gZnJvbSAnLi4vY3JlYXRlLXRlcm0vY3JlYXRlLXRlcm0uY29tcG9uZW50JztcbmltcG9ydCB7IENvbm5lY3RvckNvbXBvbmVudCB9IGZyb20gJy4uL2Nvbm5lY3Rvci9jb25uZWN0b3IuY29tcG9uZW50JztcbmltcG9ydCB7IExvY2FsQ29ubmVjdGlvblNlcnZpY2UgfSBmcm9tICcuLi8uLi9zZXJ2aWNlcy9sb2NhbC1jb25uZWN0aW9uLnNlcnZpY2UnO1xuaW1wb3J0IHsgSUNvbm5lY3Rpb25UeXBlIH0gZnJvbSAnLi4vLi4vbW9kZWxzL2Nvbm5lY3Rpb24tdHlwZS5tb2RlbCc7XG5pbXBvcnQgeyBTdWJzY3JpcHRpb24gfSBmcm9tICdyeGpzJztcbmltcG9ydCB7IENvbm5lY3RvclNlcnZpY2UgfSBmcm9tICcuLi8uLi9zZXJ2aWNlcy9jb25uZWN0b3Iuc2VydmljZSc7XG5pbXBvcnQgeyBBcHByb3ZhbFNlcnZpY2UgfSBmcm9tICcuLi8uLi9zZXJ2aWNlcy9hcHByb3ZhbC5zZXJ2aWNlJztcbmltcG9ydCB7IFJvdXRlciB9IGZyb20gJ0Bhbmd1bGFyL3JvdXRlcic7XG5pbXBvcnQgeyBNYXRTbmFja0JhciB9IGZyb20gJ0Bhbmd1bGFyL21hdGVyaWFsL3NuYWNrLWJhcic7XG5pbXBvcnQgeyBkZWZhdWx0Q29uZmlnLCBoZWFkZXJMaW5lQ29uZmlnIH0gZnJvbSAnLi4vLi4vY29uc3RhbnRzL2FwcC1jb25zdGFudCc7XG5pbXBvcnQgeyBsYWJlbHMgfSBmcm9tICcuLi8uLi9sYWJlbHMvc3RyaW5ncyc7XG5pbXBvcnQgeyBDYXJkU2VsZWN0aW9uLCBDYXJkQ2hlY2tlZCwgQ2FyZCB9IGZyb20gJy4uLy4uL21vZGVscy92YXJpYWJsZS10eXBlLm1vZGVsJztcblxuZGVjbGFyZSB2YXIgTGVhZGVyTGluZTogYW55O1xuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnbGliLXRheG9ub215LXZpZXcnLFxuICB0ZW1wbGF0ZVVybDogJy4vdGF4b25vbXktdmlldy5jb21wb25lbnQuaHRtbCcsXG4gIHN0eWxlVXJsczogWycuL3RheG9ub215LXZpZXcuY29tcG9uZW50LnNjc3MnXVxufSlcbmV4cG9ydCBjbGFzcyBUYXhvbm9teVZpZXdDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQsIE9uRGVzdHJveSB7XG4gIEBJbnB1dCgpIGFwcHJvdmFsTGlzdDogQXJyYXk8Q2FyZD4gPSBbXTtcbiAgQElucHV0KCkgaXNBcHByb3ZhbFZpZXc6IGJvb2xlYW4gPSBmYWxzZTtcbiAgQElucHV0KCkgd29ya0Zsb3dTdGF0dXM6IHN0cmluZztcbiAgQElucHV0KCkgZW52aXJvbm1lbnQ6YW55O1xuICBASW5wdXQoKSB0YXhvbm9teUNvbmZpZzogYW55O1xuXG4gIEBPdXRwdXQoKSBzZW50Rm9yQXBwcm92ZSA9IG5ldyBFdmVudEVtaXR0ZXI8YW55PigpXG4gIG1hcHBpbmcgPSB7fTtcbiAgaGVpZ2h0TGlnaHRlZCA9IFtdXG4gIGxvY2FsTGlzdCA9IFtdXG4gIHNob3dQdWJsaXNoOiBib29sZWFuID0gZmFsc2VcbiAgbmV3VGVybVN1YnNjcmlwdGlvbjogU3Vic2NyaXB0aW9uID0gbnVsbFxuICBsb2FkZWQ6IGFueSA9IHt9XG4gIHNob3dBY3Rpb25CYXI6IGJvb2xlYW4gPSBmYWxzZVxuICBhcHByb3ZhbFJlcXVpcmVkVGVybXMgPSBbXVxuICBkcmFmdFRlcm1zOiBBcnJheTxDYXJkPiA9IFtdO1xuICBpc0xvYWRpbmc6IGJvb2xlYW4gPSBmYWxzZTtcbiAgY2F0ZWdvcnlMaXN0OmFueSA9IFtdO1xuICBhcHBfc3RyaW5nczogYW55ID0gbGFiZWxzO1xuICBjb25zdHJ1Y3Rvcihwcml2YXRlIGZyYW1ld29ya1NlcnZpY2U6IEZyYW1ld29ya1NlcnZpY2UsIFxuICAgIHByaXZhdGUgbG9jYWxTdmM6IExvY2FsQ29ubmVjdGlvblNlcnZpY2UsIFxuICAgIHB1YmxpYyBkaWFsb2c6IE1hdERpYWxvZywgXG4gICAgcHJpdmF0ZSBhcHByb3ZhbFNlcnZpY2U6IEFwcHJvdmFsU2VydmljZSxcbiAgICBwcml2YXRlIHJvdXRlcjogUm91dGVyLFxuICAgIHByaXZhdGUgX3NuYWNrQmFyOiBNYXRTbmFja0JhcixcbiAgICBwcml2YXRlIGNvbm5lY3RvclN2YzogQ29ubmVjdG9yU2VydmljZSkgeyB9XG5cbiAgbmdPbkluaXQoKSB7XG4gICAgdGhpcy5pbml0KClcbiAgICB0aGlzLnNob3dBY3Rpb25CYXIgPSB0aGlzLmlzQXBwcm92YWxWaWV3P3RydWU6ZmFsc2U7XG4gIH1cblxuICBuZ09uQ2hhbmdlcygpIHtcbiAgICB0aGlzLmRyYWZ0VGVybXMgPSB0aGlzLmFwcHJvdmFsTGlzdDtcbiAgfVxuXG4gIGluaXQoKSB7XG4gICAgdGhpcy5pbml0Q29uZmlnKCk7XG4gICAgdGhpcy5mcmFtZXdvcmtTZXJ2aWNlLmdldEZyYW1ld29ya0luZm8oKS5zdWJzY3JpYmUocmVzID0+IHtcbiAgICAgIHRoaXMuY29ubmVjdG9yU3ZjLnJlbW92ZUFsbExpbmVzKClcbiAgICAgIHRoaXMudXBkYXRlTG9jYWxEYXRhKClcbiAgICAgIHRoaXMuZnJhbWV3b3JrU2VydmljZS5jYXRlZ29yaWVzSGFzaC52YWx1ZS5mb3JFYWNoKChjYXQ6YW55KSA9PiB7XG4gICAgICAgIHRoaXMubG9hZGVkW2NhdC5jb2RlXSA9IHRydWVcbiAgICAgIH0pXG4gICAgICB0aGlzLmlzTG9hZGluZyA9IGZhbHNlXG4gICAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgICAgICAgIHRoaXMuZHJhd0hlYWRlckxpbmUocmVzLnJlc3VsdC5mcmFtZXdvcmsuY2F0ZWdvcmllcy5sZW5ndGgpOyAgXG4gICAgICAgIH0sNTAwKVxuICAgIH0pXG4gIFxuICB9XG5cbiAgdXBkYXRlVGF4b25vbXlUZXJtKGRhdGE6IHsgc2VsZWN0ZWRUZXJtOiBhbnksIGlzU2VsZWN0ZWQ6IGJvb2xlYW4gfSkge1xuICAgIFxuICAgIHRoaXMudXBkYXRlRmluYWxMaXN0KGRhdGEpXG4gICAgdGhpcy51cGRhdGVTZWxlY3Rpb24oZGF0YS5zZWxlY3RlZFRlcm0uY2F0ZWdvcnksIGRhdGEuc2VsZWN0ZWRUZXJtLmNvZGUpO1xuXG4gICAgLy8gaWYgKHRoaXMuaGVpZ2h0TGlnaHRlZC5sZW5ndGggPT09IDApIHtcbiAgICAvLyAgIHRoaXMuaGVpZ2h0TGlnaHRlZC5wdXNoKGRhdGEuc2VsZWN0ZWRUZXJtKTtcbiAgICAvLyAgIHJldHVyblxuICAgIC8vIH1cbiAgICAvLyB0aGlzLmhlaWdodExpZ2h0ZWQuZXZlcnkoKGNhdCwgaSkgPT4ge1xuICAgIC8vICAgaWYgKGNhdC5lbGVtZW50LmNhdGVnb3J5LnRvTG93ZXJDYXNlKCkgPT09IGRhdGEuc2VsZWN0ZWRUZXJtLmVsZW1lbnQuY2F0ZWdvcnkudG9Mb3dlckNhc2UoKSkge1xuICAgIC8vICAgICB0aGlzLmhlaWdodExpZ2h0ZWRbaV0gPSBkYXRhLnNlbGVjdGVkVGVybVxuICAgIC8vICAgICByZXR1cm4gZmFsc2VcbiAgICAvLyAgIH0gZWxzZSB7XG4gICAgLy8gICAgIHRoaXMuaGVpZ2h0TGlnaHRlZC5wdXNoKGRhdGEuc2VsZWN0ZWRUZXJtKTtcbiAgICAvLyAgICAgcmV0dXJuIGZhbHNlXG4gICAgLy8gICB9XG4gICAgLy8gfSlcbiAgfVxuICB1cGRhdGVTZWxlY3Rpb24oY2F0ZWdvcnk6IHN0cmluZywgc2VsZWN0ZWRUZXJtQ29kZTogc3RyaW5nKSB7XG4gICAgdGhpcy5mcmFtZXdvcmtTZXJ2aWNlLmxpc3QuZ2V0KGNhdGVnb3J5KS5jaGlsZHJlbi5tYXAoaXRlbSA9PiB7XG4gICAgICBpdGVtLnNlbGVjdGVkID0gc2VsZWN0ZWRUZXJtQ29kZSA9PT0gaXRlbS5jb2RlID8gdHJ1ZSA6IGZhbHNlXG4gICAgICByZXR1cm4gaXRlbVxuICAgIH0pXG4gIH1cblxuICAvL25lZWQgdG8gcmVmYWN0b3IgYXQgaGVpZ2ggbGV2ZWxcbiAgdXBkYXRlRmluYWxMaXN0KGRhdGE6IHsgc2VsZWN0ZWRUZXJtOiBhbnksIGlzU2VsZWN0ZWQ6IGJvb2xlYW4sIHBhcmVudERhdGE/OiBhbnksIGNvbEluZGV4PzogYW55IH0pIHtcbiAgICBpZiAoZGF0YS5pc1NlbGVjdGVkKSB7XG4gICAgICAvLyBkYXRhLnNlbGVjdGVkVGVybS5zZWxlY3RlZCA9IGRhdGEuaXNTZWxlY3RlZFxuICAgICAgdGhpcy5mcmFtZXdvcmtTZXJ2aWNlLnNlbGVjdGlvbkxpc3Quc2V0KGRhdGEuc2VsZWN0ZWRUZXJtLmNhdGVnb3J5LCBkYXRhLnNlbGVjdGVkVGVybSk7XG4gICAgICBjb25zdCBuZXh0ID0gdGhpcy5mcmFtZXdvcmtTZXJ2aWNlLmdldE5leHRDYXRlZ29yeShkYXRhLnNlbGVjdGVkVGVybS5jYXRlZ29yeSlcbiAgICAgIGlmIChuZXh0ICYmIG5leHQuY29kZSkge1xuICAgICAgICB0aGlzLmZyYW1ld29ya1NlcnZpY2Uuc2VsZWN0aW9uTGlzdC5kZWxldGUobmV4dC5jb2RlKVxuICAgICAgfVxuICAgICAgLy8gbm90aWZ5IG5leHRcbiAgICAgIHRoaXMuZnJhbWV3b3JrU2VydmljZS5pbnNlcnRVcGRhdGVEZWxldGVOb3RpZmllci5uZXh0KHsgYWN0aW9uOiBkYXRhLnNlbGVjdGVkVGVybS5jYXRlZ29yeSwgdHlwZTogJ3NlbGVjdCcsIGRhdGE6IGRhdGEuc2VsZWN0ZWRUZXJtIH0pXG4gICAgfSBcbiAgICBpZihkYXRhLmNvbEluZGV4ID09PSAwICYmICFkYXRhLmlzU2VsZWN0ZWQpIHtcbiAgICAgIHRoaXMuaXNMb2FkaW5nID0gdHJ1ZTtcbiAgICAgIHNldFRpbWVvdXQoKCk9PiB7XG4gICAgICAgIHRoaXMuaW5pdCgpXG4gICAgICB9LDMwMDApXG4gICAgfVxuICAgIC8vIGluc2VydCBpbiBjb2x1bSBcbiAgICAvLyBpZiAoZGF0YS5wYXJlbnREYXRhKSB7XG4gICAgLy8gICB0aGlzLmZyYW1ld29ya1NlcnZpY2UubGlzdC5nZXQoZGF0YS5zZWxlY3RlZFRlcm0uY2F0ZWdvcnkpLmNoaWxkcmVuLnB1c2goZGF0YS5zZWxlY3RlZFRlcm0pXG4gICAgLy8gICBjb25zdCBwYXJlbnQgPSB0aGlzLmZyYW1ld29ya1NlcnZpY2UuZ2V0UHJldmlvdXNDYXRlZ29yeShkYXRhLnNlbGVjdGVkVGVybS5jYXRlZ29yeSlcbiAgICAvLyAgIGlmIChwYXJlbnQgJiYgcGFyZW50LmNvZGUpIHtcbiAgICAvLyAgICAgLy8gaW5zZXJ0IGluIHBhcmVudCBcbiAgICAvLyAgICAgdGhpcy5mcmFtZXdvcmtTZXJ2aWNlLmxpc3QuZ2V0KHBhcmVudC5jb2RlKS5jaGlsZHJlbi5tYXAoYSA9PiB7XG4gICAgLy8gICAgICAgaWYgKGRhdGEucGFyZW50RGF0YSAmJiBhLmNvZGUgPT09IGRhdGEucGFyZW50RGF0YS5jb2RlKSB7XG4gICAgLy8gICAgICAgICBpZiAoIWEuY2hpbGRyZW4pIHtcbiAgICAvLyAgICAgICAgICAgYS5jaGlsZHJlbiA9IFtdXG4gICAgLy8gICAgICAgICB9XG4gICAgLy8gICAgICAgICBhLmNoaWxkcmVuLnB1c2goZGF0YS5zZWxlY3RlZFRlcm0pXG4gICAgLy8gICAgICAgfVxuICAgIC8vICAgICB9KVxuICAgIC8vICAgICB0aGlzLmZyYW1ld29ya1NlcnZpY2UuaXNEYXRhVXBkYXRlZC5uZXh0KHRydWUpXG4gICAgLy8gICB9XG4gICAgLy8gfSBlbHNlIGlmICghZGF0YS5wYXJlbnREYXRhICYmICFkYXRhLmlzU2VsZWN0ZWQpIHtcbiAgICAvLyAgIHRoaXMuZnJhbWV3b3JrU2VydmljZS5saXN0LmdldChkYXRhLnNlbGVjdGVkVGVybS5jYXRlZ29yeSkuY2hpbGRyZW4ucHVzaChkYXRhLnNlbGVjdGVkVGVybSlcbiAgICAvLyB9XG4gICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICB0aGlzLmxvYWRlZFtkYXRhLnNlbGVjdGVkVGVybS5jYXRlZ29yeV0gPSB0cnVlXG4gICAgfSwgMTAwKTtcblxuICB9XG4gIGlzRW5hYmxlZChjb2x1bW5Db2RlOiBzdHJpbmcpOiBib29sZWFuIHtcbiAgICByZXR1cm4gISF0aGlzLmZyYW1ld29ya1NlcnZpY2Uuc2VsZWN0aW9uTGlzdC5nZXQoY29sdW1uQ29kZSlcbiAgfVxuICBvcGVuQ3JlYXRlVGVybURpYWxvZyhjb2x1bW4sIGNvbEluZGV4KSB7ICBcbiAgICBpZiAoIXRoaXMuaXNFbmFibGVkKGNvbHVtbi5jb2RlKSkge1xuICAgICAgY29uc3QgZGlhbG9nID0gdGhpcy5kaWFsb2cub3BlbihDcmVhdGVUZXJtQ29tcG9uZW50LCB7XG4gICAgICAgIGRhdGE6IHsgY29sdW1uSW5mbzogY29sdW1uLCBmcmFtZXdvcmtJZDogdGhpcy5mcmFtZXdvcmtTZXJ2aWNlLmdldEZyYW1ld29ya0lkKCksIHNlbGVjdGVkcGFyZW50czogdGhpcy5oZWlnaHRMaWdodGVkLCBjb2xJbmRleDogY29sSW5kZXggfSxcbiAgICAgICAgd2lkdGg6ICc0MDBweCcsXG4gICAgICAgIHBhbmVsQ2xhc3M6ICdjdXN0b20tZGlhbG9nLWNvbnRhaW5lcidcbiAgICAgIH0pXG4gICAgICBkaWFsb2cuYWZ0ZXJDbG9zZWQoKS5zdWJzY3JpYmUocmVzID0+IHtcbiAgICAgICAgaWYoIXJlcykge1xuICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICBpZiAocmVzICYmIHJlcy5jcmVhdGVkKSB7XG4gICAgICAgICAgdGhpcy5zaG93UHVibGlzaCA9IHRydWVcbiAgICAgICAgfVxuICAgICAgICB0aGlzLmxvYWRlZFtyZXMudGVybS5jYXRlZ29yeV0gPSBmYWxzZVxuICAgICAgICAvLyB3YWl0XG4gICAgICAgIGNvbnN0IHBhcmVudENvbHVtbiA9IHRoaXMuZnJhbWV3b3JrU2VydmljZS5nZXRQcmV2aW91c0NhdGVnb3J5KHJlcy50ZXJtLmNhdGVnb3J5KVxuICAgICAgICByZXMucGFyZW50ID0gbnVsbFxuICAgICAgICBpZiAocGFyZW50Q29sdW1uKSB7XG4gICAgICAgICAgcmVzLnBhcmVudCA9IHRoaXMuZnJhbWV3b3JrU2VydmljZS5zZWxlY3Rpb25MaXN0LmdldChwYXJlbnRDb2x1bW4uY29kZSlcbiAgICAgICAgICByZXMucGFyZW50LmNoaWxkcmVuPyByZXMucGFyZW50LmNoaWxkcmVuLnB1c2gocmVzLnRlcm0pIDpyZXMucGFyZW50WydjaGlsZHJlbiddID0gW3Jlcy50ZXJtXVxuICAgICAgICAgIC8vIHJlcy5wYXJlbnQuYXNzb2NpYXRpb25zPy5wdXNoKHJlcylcbiAgICAgICAgfVxuICAgICAgICAvLyB0aGlzLmZyYW1ld29ya1NlcnZpY2Uuc2V0VGVybSA9IHJlcztcbiAgICAgICAgdGhpcy51cGRhdGVGaW5hbExpc3QoeyBzZWxlY3RlZFRlcm06IHJlcy50ZXJtLCBpc1NlbGVjdGVkOiBmYWxzZSwgcGFyZW50RGF0YTogcmVzLnBhcmVudCwgY29sSW5kZXg6Y29sSW5kZXggfSlcbiAgICAgICAgLy8gdGhpcy5mcmFtZXdvcmtTZXJ2aWNlLmluc2VydFVwZGF0ZURlbGV0ZU5vdGlmaWVyLm5leHQoeyB0eXBlOiAnaW5zZXJ0JywgYWN0aW9uOiByZXMucGFyZW50LmNvZGUsIGRhdGE6IHJlcy50ZXJtIH0pXG4gICAgICB9KVxuICAgIH1cbiAgfVxuXG4gIGdldCBsaXN0KCk6IGFueVtdIHtcbiAgICAvLyBjb25zb2xlLmxvZygndGhpcy5mcmFtZXdvcmtTZXJ2aWNlLmxpc3QgOjogJyx0aGlzLmZyYW1ld29ya1NlcnZpY2UubGlzdClcbiAgICAvLyBpZiAodGhpcy5sb2NhbExpc3QubGVuZ3RoID09PSAwKSB7XG4gICAgLy8gICB0aGlzLnVwZGF0ZUxvY2FsRGF0YSgpXG4gICAgLy8gfVxuICAgIC8vIHJldHVybiB0aGlzLmxvY2FsTGlzdFxuICAgIHJldHVybiBBcnJheS5mcm9tKHRoaXMuZnJhbWV3b3JrU2VydmljZS5saXN0LnZhbHVlcygpKVxuICB9XG4gIFxuICBkcmF3SGVhZGVyTGluZShsZW46IG51bWJlcil7XG4gICAgY29uc3Qgb3B0aW9ucyA9IHsuLi5kZWZhdWx0Q29uZmlnLC4uLmhlYWRlckxpbmVDb25maWcgfVxuICAgIGZvcihsZXQgaT0xOyBpPD1sZW47IGkrKyl7XG4gICAgICBjb25zdCBzdGFydEVsZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoYCNib3gke2l9Y291bnRgKVxuICAgICAgY29uc3QgZW5kRWxlID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihgI2JveCR7aX1IZWFkZXJgKVxuICAgICAgaWYoc3RhcnRFbGUgJiYgZW5kRWxlKSB7XG4gICAgICAgIG5ldyBMZWFkZXJMaW5lKHN0YXJ0RWxlLCBlbmRFbGUsIG9wdGlvbnMpO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIGdldENvbHVtbihjb2x1bW5Db2RlOiBzdHJpbmcpIHtcbiAgICByZXR1cm4gdGhpcy5mcmFtZXdvcmtTZXJ2aWNlLmxpc3QuZ2V0KGNvbHVtbkNvZGUpXG4gIH1cbiAgdXBkYXRlTG9jYWxEYXRhKCkge1xuICAgIC8vIHRoaXMubG9jYWxMaXN0ID0gQXJyYXkuZnJvbSh0aGlzLmZyYW1ld29ya1NlcnZpY2UubGlzdC52YWx1ZXMoKSkubWFwKGxzdCA9PiB7XG4gICAgLy8gICBjb25zdCBzZWxlY3RlZFRlcm0gPSB0aGlzLmZyYW1ld29ya1NlcnZpY2Uuc2VsZWN0aW9uTGlzdC5nZXQobHN0LmNvZGUpXG4gICAgLy8gICBsc3QuY2hpbGRyZW4ubWFwKGNoID0+IHsgY2guc2VsZWN0ZWQgPSBzZWxlY3RlZFRlcm0gJiYgY2guaWRlbnRpZmllciA9PT0gc2VsZWN0ZWRUZXJtLmlkZW50aWZpZXIgfSlcbiAgICAvLyAgIHJldHVybiBsc3RcbiAgICAvLyB9KVxuXG4gIH1cblxuICAvLyBnZXQgdXBkYXRlZENhdGVnb3JpZXMoKSB7XG4gIC8vICAgcmV0dXJuIHRoaXMudXBkYXRlVGVybXMoKVxuICAvLyB9XG4gIC8vIHVwZGF0ZVRlcm1zKF90ZXJtPzogYW55KSB7XG4gIC8vICAgY29uc3QgZmluYWxMaXN0ID0gW11cbiAgLy8gICB0aGlzLmxpc3QuZm9yRWFjaCgoY2F0ZWdvcnksIGlkeCkgPT4ge1xuICAvLyAgICAgY29uc3QgbG9jYWxUZXJtcyA9IHRoaXMuZnJhbWV3b3JrU2VydmljZS5nZXRMb2NhbFRlcm1zQnlDb2x1bW4oY2F0ZWdvcnkuY29kZSlcbiAgLy8gICAgIGZvciAobGV0IGogPSAwOyBqIDwgbG9jYWxUZXJtcy5sZW5ndGg7IGogKz0gMSkge1xuICAvLyBjb25zdCBwcmV2aW91cyA9IHRoaXMuZnJhbWV3b3JrU2VydmljZS5nZXRQcmV2aW91c0NhdGVnb3J5KGNhdGVnb3J5LmNvZGUpXG4gIC8vIGlmIChwcmV2aW91cyAmJiBmaW5hbExpc3RbaWR4IC0gMV0pIHtcbiAgLy8gICBmaW5hbExpc3RbaWR4IC0gMV0uY2hpbGRyZW4uZm9yRWFjaChsYXN0UGFyZW50ID0+IHtcbiAgLy8gICAgIGxvY2FsVGVybXNbal0ucGFyZW50LmZvckVhY2gocGFyZW50ID0+IHtcbiAgLy8gICAgICAgaWYgKGxhc3RQYXJlbnQuY29kZSA9PT0gcGFyZW50LmVsZW1lbnQuY29kZSkge1xuICAvLyAgICAgICAgIGNvbnNvbGUubG9nKFwicGFyZW50LmVsZW1lbnQuY29kZT09PT09PT09PT09PT5cIiwgcGFyZW50LmVsZW1lbnQuY29kZSlcbiAgLy8gICAgICAgICBpZiAoIWxhc3RQYXJlbnQuY2hpbGRyZW4pIHtcbiAgLy8gICAgICAgICAgIGxhc3RQYXJlbnQuY2hpbGRyZW4gPSBbXVxuICAvLyAgICAgICAgIH1cbiAgLy8gICAgICAgICBpZiAobGFzdFBhcmVudC5jaGlsZHJlbi5maW5kSW5kZXgoYyA9PiBjLmNvZGUgPT09IGxvY2FsVGVybXNbal0uY29kZSkgPT09IC0xKSB7XG4gIC8vICAgICAgICAgICBsYXN0UGFyZW50LmNoaWxkcmVuLnVuc2hpZnQobG9jYWxUZXJtc1tqXSlcbiAgLy8gICAgICAgICB9XG4gIC8vICAgICAgIH1cbiAgLy8gICAgIH0pXG4gIC8vICAgfSk7XG5cbiAgLy8gfVxuICAvLyAgICAgICBpZiAoY2F0ZWdvcnkuY29kZSA9PT0gbG9jYWxUZXJtc1tqXS5jYXRlZ29yeSkge1xuICAvLyAgICAgICAgIGNhdGVnb3J5LmNoaWxkcmVuLnB1c2gobG9jYWxUZXJtc1tqXSlcbiAgLy8gICAgICAgfVxuICAvLyAgICAgfVxuICAvLyAgICAgZmluYWxMaXN0LnB1c2goY2F0ZWdvcnkpXG4gIC8vICAgfSlcblxuICAvLyAgIHJldHVybiBmaW5hbExpc3RcbiAgLy8gfVxuXG5cbiAgLy8gaWYgKGxvY2FsVGVybXMubGVuZ3RoID4gMCkge1xuICAvLyAgIHRoaXMuY29sdW1uRGF0YS5wdXNoKC4uLmxvY2FsVGVybXMpXG4gIC8vICAgdGhpcy5jb2x1bW4uY2hpbGRyZW4uZm9yRWFjaChjb2wgPT4ge1xuICAvLyAgICAgbG9jYWxUZXJtcy5mb3JFYWNoKGxvYyA9PiB7XG4gIC8vICAgICAgIGlmIChjb2wuY29kZSAhPT0gbG9jLmNvZGUpIHtcbiAgLy8gICAgICAgICBsb2Muc2VsZWN0ZWQ9dHJ1ZVxuICAvLyAgICAgICAgIHRoaXMuY29sdW1uLmNoaWxkcmVuLnB1c2gobG9jKVxuICAvLyAgICAgICB9XG4gIC8vICAgICB9KVxuICAvLyB0aGlzLmNvbHVtbi5jaGlsZHJlbi5wdXNoKC4uLmxvY2FsVGVybXMpXG4gIC8vIH1cbiAgLy8gfVxuICAvLyBnZXQgbGlzdCgpIHtcbiAgLy8gICBsZXQgdGVybXNXaXRoRHJhZnRTdGF0dXMgPSBbXVxuICAvLyAgIGNvbnNvbGUubG9nKCd0aGlzLmZyYW1ld29ya1NlcnZpY2UubGlzdCA6OiAnLHRoaXMuZnJhbWV3b3JrU2VydmljZS5saXN0KVxuICAvLyAgIHRoaXMuZnJhbWV3b3JrU2VydmljZS5saXN0LmZvckVhY2goKGNhdCxpKSA9PiB7XG4gIC8vICAgICAgIHRlcm1zV2l0aERyYWZ0U3RhdHVzID0gY2F0LmNoaWxkcmVuLmZpbHRlcih0ID0+IHQuYXBwcm92YWxTdGF0dXMgPT09ICdEcmFmdCcpXG4gIC8vICAgICAgIHRoaXMudXBkYXRlRHJhZnRTdGF0dXNUZXJtcyh0ZXJtc1dpdGhEcmFmdFN0YXR1cylcbiAgLy8gICB9KVxuICAvLyAgIHRoaXMuc2hvd0FjdGlvbkJhciA9IHRoaXMuYXBwcm92YWxSZXF1aXJlZFRlcm1zLmxlbmd0aCA+IDEgPyB0cnVlOmZhbHNlXG4gIC8vICAgcmV0dXJuIHRoaXMuZnJhbWV3b3JrU2VydmljZS5saXN0XG4gIC8vIH1cbiAgXG4gIG5ld0Nvbm5lY3Rpb24oKSB7IFxuICAgIGNvbnN0IGRpYWxvZyA9IHRoaXMuZGlhbG9nLm9wZW4oQ29ubmVjdG9yQ29tcG9uZW50LCB7XG4gICAgICBkYXRhOiB7fSxcbiAgICAgIHdpZHRoOiAnOTAlJyxcbiAgICAgIC8vIHBhbmVsQ2xhc3M6ICdjdXN0b20tZGlhbG9nLWNvbnRhaW5lcicgXG4gICAgfSlcbiAgICBkaWFsb2cuYWZ0ZXJDbG9zZWQoKS5zdWJzY3JpYmUoKHJlczogSUNvbm5lY3Rpb25UeXBlKSA9PiB7XG4gICAgICBpZiAoKHJlcy5zb3VyY2UgPT09ICdvbmxpbmUnICYmIHJlcy5kYXRhLmVuZHBvaW50KSB8fCAocmVzLnNvdXJjZSA9PT0gJ29mZmxpbmUnKSkge1xuICAgICAgICB0aGlzLmxvY2FsU3ZjLmxvY2FsU3RvcmFnZSA9IHJlc1xuICAgICAgICB0aGlzLmluaXQoKVxuICAgICAgfSBlbHNlIGlmIChyZXMuc291cmNlID09PSAnb25saW5lJyAmJiAhcmVzLmRhdGEuZW5kcG9pbnQpIHtcbiAgICAgICAgdGhpcy5sb2NhbFN2Yy5sb2NhbFN0b3JhZ2UgPSByZXNcbiAgICAgICAgdGhpcy5pbml0KClcbiAgICAgIH1cbiAgICB9KVxuICB9XG5cbiAgdXBkYXRlRHJhZnRTdGF0dXNUZXJtcyhldmVudCl7XG4gICAgaWYoZXZlbnQuY2hlY2tlZCkge1xuICAgICAgdGhpcy5kcmFmdFRlcm1zLnB1c2goZXZlbnQudGVybSlcbiAgICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLmRyYWZ0VGVybXMgPSB0aGlzLmRyYWZ0VGVybXMuZmlsdGVyKGQgPT4gZXZlbnQudGVybS5pZGVudGlmaWVyICE9PSBkLmlkZW50aWZpZXIpXG4gICAgfVxuICAgIHRoaXMuc2hvd0FjdGlvbkJhciA9IHRoaXMuZHJhZnRUZXJtcy5sZW5ndGg+MD90cnVlOmZhbHNlXG4gIH1cblxuICBnZXROb09mQ2FyZHMoZXZlbnQ6YW55KSB7XG4gICAgaWYodGhpcy5jYXRlZ29yeUxpc3QubGVuZ3RoID4gMCAmJiBldmVudC5jYXRlZ29yeSAhPT0gJycpIHtcbiAgICAgIGxldCBpbmRleCA9IHRoaXMuY2F0ZWdvcnlMaXN0LmZpbmRJbmRleCgob2JqOmFueSkgPT4gb2JqLmNhdGVnb3J5ID09IGV2ZW50LmNhdGVnb3J5KTtcbiAgICAgIGlmKGluZGV4ID4gLTEpIHtcbiAgICAgICAgdGhpcy5jYXRlZ29yeUxpc3Quc3BsaWNlKGluZGV4KTtcbiAgICAgIH1cbiAgICB9XG4gICAgaWYoZXZlbnQuY2F0ZWdvcnkgPT0gJycpIHtcbiAgICAgIHRoaXMuY2F0ZWdvcnlMaXN0W3RoaXMuY2F0ZWdvcnlMaXN0Lmxlbmd0aC0xXS5jb3VudCA9IDA7XG4gICAgfVxuICAgIHRoaXMuY2F0ZWdvcnlMaXN0LnB1c2goZXZlbnQpO1xuICB9XG4gIFxuXG5cbiAgc2VuZEZvckFwcHJvdmFsKCl7XG4gICAgaWYoIXRoaXMuaXNBcHByb3ZhbFZpZXcpe1xuICAgICAgICBsZXQgcGFyZW50TGlzdCA9IFtdXG4gICAgICAgIHRoaXMubGlzdC5mb3JFYWNoKGVsZSA9PiB7XG4gICAgICAgICAgY29uc3QgdCA9IGVsZS5jaGlsZHJlbi5maWx0ZXIodGVybSA9PiB0ZXJtLnNlbGVjdGVkID09PSB0cnVlKVxuICAgICAgICAgIGlmKHRbMF0pe1xuICAgICAgICAgICAgcGFyZW50TGlzdC5wdXNoKHRbMF0pXG4gICAgICAgICAgfSBcbiAgICAgICAgfSlcbiAgICAgICAgY29uc3QgcmVxID0ge1xuICAgICAgICAgIHVwZGF0ZUZpZWxkVmFsdWVzOlsuLi5wYXJlbnRMaXN0LCAuLi50aGlzLmRyYWZ0VGVybXNdXG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5hcHByb3ZhbFNlcnZpY2UuY3JlYXRlQXBwcm92YWwocmVxKS5zdWJzY3JpYmUocmVzID0+IHtcbiAgICAgICAgICB0aGlzLmZyYW1ld29ya1NlcnZpY2UucmVtb3ZlT2xkTGluZSgpXG4gICAgICAgICAgdGhpcy5fc25hY2tCYXIub3BlbignVGVybXMgc3VjY2Vzc2Z1bGx5IHNlbnQgZm9yIEFwcHJvdmFsLicsICdjYW5jZWwnKVxuICAgICAgICAgIC8vIHRoaXMucm91dGVyLm5hdmlnYXRlKFsnL2FwcHJvdmFsJ10pXG4gICAgICAgICAgLy8gdGhpcy5zaG93QWN0aW9uQmFyID0gZmFsc2U7XG4gICAgICAgIH0pXG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMuc2VudEZvckFwcHJvdmUuZW1pdCh0aGlzLmRyYWZ0VGVybXMpXG4gICAgICBjb25zb2xlLmxvZyh0aGlzLmRyYWZ0VGVybXMpXG4gICAgfVxuICAgXG4gIH1cblxuICBjbG9zZUFjdGlvbkJhcihlKXsgXG4gICAgdGhpcy5zaG93QWN0aW9uQmFyID0gZmFsc2U7XG4gIH1cblxuICBpbml0Q29uZmlnKCkge1xuICAgIGlmKHRoaXMuZW52aXJvbm1lbnQpe1xuICAgICAgdGhpcy5mcmFtZXdvcmtTZXJ2aWNlLnVwZGF0ZUVudmlyb25tZW50KHRoaXMuZW52aXJvbm1lbnQpO1xuICAgICAgdGhpcy5mcmFtZXdvcmtTZXJ2aWNlLnNldENvbmZpZyh0aGlzLnRheG9ub215Q29uZmlnKTtcbiAgICB9XG4gIH1cblxuICBuZ09uRGVzdHJveSgpe1xuICAgICAgdGhpcy5mcmFtZXdvcmtTZXJ2aWNlLnJlbW92ZU9sZExpbmUoKTtcbiAgfVxuXG4gIFxufVxuIiwiPGRpdiBjbGFzcz1cImZsZXggZmxleC0xIGNvbm5lY3Rpb25TZXR0aW5ncyBoaWRlXCI+XG4gICAgPGJ1dHRvbiBtYXQtcmFpc2VkLWJ1dHRvbiBjb2xvcj1cImFjY2VudFwiIChjbGljayk9XCJuZXdDb25uZWN0aW9uKClcIj5cbiAgICAgICAgPG1hdC1pY29uPnt7YXBwX3N0cmluZ3MuYnVpbGR9fTwvbWF0LWljb24+XG4gICAgPC9idXR0b24+XG48L2Rpdj5cblxuPGRpdiAqbmdJZj1cImxpc3QgJiYgbGlzdC5sZW5ndGggPiAwXCIgY2xhc3M9XCJmbGV4IGhlaWdodEZpeCBcIj5cbiAgICA8bmctY29udGFpbmVyICpuZ0Zvcj1cImxldCBjb2x1bW4gb2YgbGlzdDsgbGV0IGkgPSBpbmRleDtcIj5cbiAgICAgICAgPGRpdiBjbGFzcz1cImZsZXgtMSBmZWx4LWNvbCAgY29sLWNvbnRhaW5lciBjb250YWluZXJze3tsaXN0Lmxlbmd0aH19XCIgaWQ9XCJib3h7e2krMX19Q29udGFpbmVyXCI+XG4gICAgICAgICAgICA8ZGl2IGNsYXNzPVwiY2F0ZWdvcnktaGVhZGluZy1zdGlja3lcIj5cbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwiY2F0ZWdvcnktaGVhZGluZy1jb250YWluZXJcIj5cbiAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz0nY2F0ZWdvcnktaGVhZGVyJz5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJjYXRlZ29yeS1oZWFkZXItaXRlbXNcIiBpZD1cImJveHt7aX19SGVhZGVyXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPG1hdC1pY29uIFtuZ1N0eWxlXT1cInsnY29sb3InOmNvbHVtbi5jb25maWcuY29sb3J9XCI+e3tjb2x1bW4uY29uZmlnLmljb259fTwvbWF0LWljb24+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPGg0Pnt7Y29sdW1uLm5hbWV9fTwvaDQ+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPG5nLWNvbnRhaW5lciAqbmdJZj1cImkgIT0gMCAmJiBjYXRlZ29yeUxpc3Q/Lmxlbmd0aCA+IDA7IGVsc2UgZmlyc3RDb2x1bW5cIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPG5nLWNvbnRhaW5lciAqbmdGb3I9XCJsZXQgY2F0ZWdvcnkgb2YgY2F0ZWdvcnlMaXN0XCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8bmctY29udGFpbmVyICpuZ0lmPVwiKGNvbHVtbi5jb2RlID09IGNhdGVnb3J5LmNhdGVnb3J5KSAmJiBjb2x1bW4uaW5kZXggIT09IDFcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8c3Bhbj57e2NhdGVnb3J5LmNvdW50fX08L3NwYW4+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L25nLWNvbnRhaW5lcj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9uZy1jb250YWluZXI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9uZy1jb250YWluZXI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPG5nLXRlbXBsYXRlICNmaXJzdENvbHVtbj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPHNwYW4gKm5nSWY9XCJpID09IDBcIiBpZD1cImJveHt7aSsxfX1jb3VudFwiPnt7Y29sdW1uLmNoaWxkcmVuLmxlbmd0aH19PC9zcGFuPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvbmctdGVtcGxhdGU+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cImFycm93XCIgaWQ9XCJib3h7e2krMX19Y291bnRcIj48L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cIm1iMVwiICpuZ0lmPVwiIWlzQXBwcm92YWxWaWV3XCI+XG4gICAgICAgICAgICAgICAgICAgICAgICA8YnV0dG9uIFtkaXNhYmxlZF09XCJpc0VuYWJsZWQoY29sdW1uLmNvZGUpXCIgY2xhc3M9XCJ3LWZ1bGwgYWRkQ2FyZEJ1dHRvblwiIG1hdC1zdHJva2VkLWJ1dHRvblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbG9yPVwicHJpbWFyeVwiIChjbGljayk9XCJvcGVuQ3JlYXRlVGVybURpYWxvZyhjb2x1bW4sIGkpXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAge3thcHBfc3RyaW5ncy5jcmVhdGVOZXd9fSB7e2NvbHVtbi5uYW1lfX1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8bWF0LWljb24+e3thcHBfc3RyaW5ncy5hZGR9fTwvbWF0LWljb24+XG4gICAgICAgICAgICAgICAgICAgICAgICA8L2J1dHRvbj5cbiAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgIDwhLS0ge3tjb2x1bW4uY29kZX19IC0tPlxuICAgICAgICAgICAgPGRpdiBjbGFzcz1cInBhZGRpbmcteDIgY2F0LWNvbHVtbnMgY29udGFpbmVyXCIgaWQ9XCJib3h7e2krMX19XCI+XG4gICAgICAgICAgICAgICAgPGxpYi10YXhvbm9teS1jb2x1bW4tdmlldyAqbmdJZj1cImxvYWRlZFtjb2x1bW4uY29kZV1cIiAjc2VsZWN0ZWRUYXhvbm9teVRlcm0gW2NvbHVtbl09XCJjb2x1bW5cIlxuICAgICAgICAgICAgICAgICAgICBbY29udGFpbmVySWRdPVwiJ2JveCcrKGkrMSlcIiAodXBkYXRlVGF4b25vbXlUZXJtKT1cInVwZGF0ZVRheG9ub215VGVybSgkZXZlbnQpXCJcbiAgICAgICAgICAgICAgICAgICAgKHVwZGF0ZVRlcm1MaXN0KT1cInVwZGF0ZURyYWZ0U3RhdHVzVGVybXMoJGV2ZW50KVwiIChjYXJkc0NvdW50KT1cImdldE5vT2ZDYXJkcygkZXZlbnQpXCI+XG4gICAgICAgICAgICAgICAgPC9saWItdGF4b25vbXktY29sdW1uLXZpZXc+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgPC9kaXY+XG4gICAgPC9uZy1jb250YWluZXI+XG4gICAgPGxpYi1hY3Rpb24tYmFyICpuZ0lmPVwic2hvd0FjdGlvbkJhclwiIFthY3Rpb25UeXBlXT1cImlzQXBwcm92YWxWaWV3XCIgW2NvbmZpZ1R5cGVdPVwid29ya0Zsb3dTdGF0dXNcIlxuICAgICAgICAoc2VuZEFwcHJvdmFsKT1cInNlbmRGb3JBcHByb3ZhbCgpXCIgKGNsb3NlQWN0aW9uKT1cImNsb3NlQWN0aW9uQmFyKCRldmVudClcIj48L2xpYi1hY3Rpb24tYmFyPlxuPC9kaXY+XG48ZGl2ICpuZ0lmPVwiIShsaXN0ICYmIGxpc3QubGVuZ3RoID4gMCApXCIgY2xhc3M9XCJmbGV4IGhlaWdodEZpeCBcIj5cbiAgICA8aDE+e3thcHBfc3RyaW5ncy5ub0RhdGF9fTwvaDE+XG48ZGl2PlxuPGRpdiAqbmdJZj1cImlzTG9hZGluZ1wiIGNsYXNzPVwic3Bpbm5lclwiPlxuICAgIDxtYXQtc3Bpbm5lcj48L21hdC1zcGlubmVyPlxuPC9kaXY+XG4gICAgIl19