import { Component, EventEmitter, Input, Output } from '@angular/core';
import * as i0 from "@angular/core";
import * as i1 from "../../services/framework.service";
import * as i2 from "../../services/connector.service";
import * as i3 from "../../services/approval.service";
import * as i4 from "@angular/common";
import * as i5 from "../term-card/term-card.component";
export class TaxonomyColumnViewComponent {
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
TaxonomyColumnViewComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "14.3.0", ngImport: i0, type: TaxonomyColumnViewComponent, deps: [{ token: i1.FrameworkService }, { token: i2.ConnectorService }, { token: i3.ApprovalService }], target: i0.ɵɵFactoryTarget.Component });
TaxonomyColumnViewComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "14.3.0", type: TaxonomyColumnViewComponent, selector: "lib-taxonomy-column-view", inputs: { column: "column", containerId: "containerId" }, outputs: { updateTaxonomyTerm: "updateTaxonomyTerm", updateTermList: "updateTermList", cardsCount: "cardsCount" }, usesOnChanges: true, ngImport: i0, template: "<ng-container *ngIf=\"columnItems && columnItems.length > 0; else noDataTemplate;\">\n    <ng-container *ngFor=\"let child of columnItems; let j = index\">\n        <div #cardEle id=\"{{column.code}}Card{{j+1}}\" >\n            <lib-term-card\n                [data]=\"{'children': child, 'selected' : false, 'category':column.code, cardSubType: 'minimal', isViewOnly:false,'index':column.index}\"\n                (isSelected)=\"updateSelection1($event)\" (selectedCard)=\"selectedCard($event)\">\n            </lib-term-card>\n        </div>\n    </ng-container>\n</ng-container>\n<ng-template #noDataTemplate>\n    <!-- <div>No {{column.name}} associated</div> -->\n</ng-template>\n", styles: [".flex{display:flex}.w-full{width:100%}.mb1{margin-bottom:1em}flex-center{flex-wrap:nowrap;align-items:start;justify-content:center}.flex-1{flex:1}.felx-col{flex-direction:column}.padding-x2{padding:0 2.5em}.heightFix{height:100vh;overflow:hidden}.cat-columns:hover{overflow-y:scroll}.container{overflow-y:scroll;scrollbar-width:none;-ms-overflow-style:none}.container::-webkit-scrollbar{width:0;height:0}#this{display:none}#this:target{display:block}\n"], dependencies: [{ kind: "directive", type: i4.NgForOf, selector: "[ngFor][ngForOf]", inputs: ["ngForOf", "ngForTrackBy", "ngForTemplate"] }, { kind: "directive", type: i4.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { kind: "component", type: i5.TermCardComponent, selector: "lib-term-card", inputs: ["data"], outputs: ["isSelected", "selectedCard"] }] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "14.3.0", ngImport: i0, type: TaxonomyColumnViewComponent, decorators: [{
            type: Component,
            args: [{ selector: 'lib-taxonomy-column-view', template: "<ng-container *ngIf=\"columnItems && columnItems.length > 0; else noDataTemplate;\">\n    <ng-container *ngFor=\"let child of columnItems; let j = index\">\n        <div #cardEle id=\"{{column.code}}Card{{j+1}}\" >\n            <lib-term-card\n                [data]=\"{'children': child, 'selected' : false, 'category':column.code, cardSubType: 'minimal', isViewOnly:false,'index':column.index}\"\n                (isSelected)=\"updateSelection1($event)\" (selectedCard)=\"selectedCard($event)\">\n            </lib-term-card>\n        </div>\n    </ng-container>\n</ng-container>\n<ng-template #noDataTemplate>\n    <!-- <div>No {{column.name}} associated</div> -->\n</ng-template>\n", styles: [".flex{display:flex}.w-full{width:100%}.mb1{margin-bottom:1em}flex-center{flex-wrap:nowrap;align-items:start;justify-content:center}.flex-1{flex:1}.felx-col{flex-direction:column}.padding-x2{padding:0 2.5em}.heightFix{height:100vh;overflow:hidden}.cat-columns:hover{overflow-y:scroll}.container{overflow-y:scroll;scrollbar-width:none;-ms-overflow-style:none}.container::-webkit-scrollbar{width:0;height:0}#this{display:none}#this:target{display:block}\n"] }]
        }], ctorParameters: function () { return [{ type: i1.FrameworkService }, { type: i2.ConnectorService }, { type: i3.ApprovalService }]; }, propDecorators: { column: [{
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGF4b25vbXktY29sdW1uLXZpZXcuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vcHJvamVjdHMvc2ItdGF4b25vbXktZWRpdG9yL3NyYy9saWIvY29tcG9uZW50cy90YXhvbm9teS1jb2x1bW4tdmlldy90YXhvbm9teS1jb2x1bW4tdmlldy5jb21wb25lbnQudHMiLCIuLi8uLi8uLi8uLi8uLi8uLi9wcm9qZWN0cy9zYi10YXhvbm9teS1lZGl0b3Ivc3JjL2xpYi9jb21wb25lbnRzL3RheG9ub215LWNvbHVtbi12aWV3L3RheG9ub215LWNvbHVtbi12aWV3LmNvbXBvbmVudC5odG1sIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxTQUFTLEVBQUUsWUFBWSxFQUFFLEtBQUssRUFBZ0MsTUFBTSxFQUFpQixNQUFNLGVBQWUsQ0FBQzs7Ozs7OztBQVlwSCxNQUFNLE9BQU8sMkJBQTJCO0lBWXRDLFlBQ1UsZ0JBQWtDLEVBQ2xDLGdCQUFrQyxFQUNsQyxlQUFpQztRQUZqQyxxQkFBZ0IsR0FBaEIsZ0JBQWdCLENBQWtCO1FBQ2xDLHFCQUFnQixHQUFoQixnQkFBZ0IsQ0FBa0I7UUFDbEMsb0JBQWUsR0FBZixlQUFlLENBQWtCO1FBWjNDLHFCQUFnQixHQUFRLEVBQUUsQ0FBQTtRQUNoQix1QkFBa0IsR0FBRyxJQUFJLFlBQVksQ0FBNkMsSUFBSSxDQUFDLENBQUM7UUFDeEYsbUJBQWMsR0FBRyxJQUFJLFlBQVksRUFBZSxDQUFDO1FBQ2pELGVBQVUsR0FBRyxJQUFJLFlBQVksRUFBYyxDQUFDO1FBQ3RELGVBQVUsR0FBZ0IsRUFBRSxDQUFDO1FBQzdCLHNCQUFpQixHQUFpQixJQUFJLENBQUM7UUFDdkMsd0JBQW1CLEdBQWlCLElBQUksQ0FBQztRQUV6QyxnQkFBVyxHQUFnQixFQUFFLENBQUM7SUFNOUIsQ0FBQztJQUNELFdBQVcsQ0FBQyxPQUFzQixJQUFTLENBQUM7SUFHNUMs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LENBQUMsY0FBYyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQztJQUNsQyxDQUFDO0lBRUQsV0FBVztRQUNULElBQUksSUFBSSxDQUFDLGlCQUFpQixFQUFFO1lBQzFCLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxXQUFXLEVBQUUsQ0FBQTtTQUNyQztJQUNILENBQUM7O3dIQXJUVSwyQkFBMkI7NEdBQTNCLDJCQUEyQixrUUNaeEMsK3FCQWFBOzJGRERhLDJCQUEyQjtrQkFMdkMsU0FBUzsrQkFDRSwwQkFBMEI7b0tBSzNCLE1BQU07c0JBQWQsS0FBSztnQkFDRyxXQUFXO3NCQUFuQixLQUFLO2dCQUVJLGtCQUFrQjtzQkFBM0IsTUFBTTtnQkFDRyxjQUFjO3NCQUF2QixNQUFNO2dCQUNHLFVBQVU7c0JBQW5CLE1BQU0iLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21wb25lbnQsIEV2ZW50RW1pdHRlciwgSW5wdXQsIE9uQ2hhbmdlcywgT25EZXN0cm95LCBPbkluaXQsIE91dHB1dCwgU2ltcGxlQ2hhbmdlcyB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgRnJhbWV3b3JrU2VydmljZSB9IGZyb20gJy4uLy4uL3NlcnZpY2VzL2ZyYW1ld29yay5zZXJ2aWNlJztcbmltcG9ydCB7IFN1YnNjcmlwdGlvbiB9IGZyb20gJ3J4anMnO1xuaW1wb3J0IHsgQ29ubmVjdG9yU2VydmljZSB9IGZyb20gJy4uLy4uL3NlcnZpY2VzL2Nvbm5lY3Rvci5zZXJ2aWNlJztcbmltcG9ydCB7IEFwcHJvdmFsU2VydmljZSB9IGZyb20gJy4uLy4uL3NlcnZpY2VzL2FwcHJvdmFsLnNlcnZpY2UnO1xuaW1wb3J0IHsgQ2FyZENoZWNrZWQsIENhcmRTZWxlY3Rpb24sIENhcmRzQ291bnQsIENhcmQgfSBmcm9tICcuLi8uLi9tb2RlbHMvdmFyaWFibGUtdHlwZS5tb2RlbCc7XG5kZWNsYXJlIHZhciBMZWFkZXJMaW5lOiBhbnk7XG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdsaWItdGF4b25vbXktY29sdW1uLXZpZXcnLFxuICB0ZW1wbGF0ZVVybDogJy4vdGF4b25vbXktY29sdW1uLXZpZXcuY29tcG9uZW50Lmh0bWwnLFxuICBzdHlsZVVybHM6IFsnLi90YXhvbm9teS1jb2x1bW4tdmlldy5jb21wb25lbnQuc2NzcyddXG59KVxuZXhwb3J0IGNsYXNzIFRheG9ub215Q29sdW1uVmlld0NvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCwgT25EZXN0cm95LCBPbkNoYW5nZXMge1xuICBASW5wdXQoKSBjb2x1bW46IENhcmQ7XG4gIEBJbnB1dCgpIGNvbnRhaW5lcklkOiBzdHJpbmdcbiAgY29ubmVjdG9yTWFwcGluZzogYW55ID0ge31cbiAgQE91dHB1dCgpIHVwZGF0ZVRheG9ub215VGVybSA9IG5ldyBFdmVudEVtaXR0ZXI8eyBzZWxlY3RlZFRlcm06IGFueSwgaXNTZWxlY3RlZDogYm9vbGVhbiB9Pih0cnVlKTtcbiAgQE91dHB1dCgpIHVwZGF0ZVRlcm1MaXN0ID0gbmV3IEV2ZW50RW1pdHRlcjxDYXJkQ2hlY2tlZD4oKTtcbiAgQE91dHB1dCgpIGNhcmRzQ291bnQgPSBuZXcgRXZlbnRFbWl0dGVyPENhcmRzQ291bnQ+KCk7XG4gIGNvbHVtbkRhdGE6IEFycmF5PENhcmQ+ID0gW107XG4gIGNoaWxkU3Vic2NyaXB0aW9uOiBTdWJzY3JpcHRpb24gPSBudWxsO1xuICBuZXdUZXJtU3Vic2NyaXB0aW9uOiBTdWJzY3JpcHRpb24gPSBudWxsO1xuICBhcHByb3ZhbFRlcm06IGFueTtcbiAgdGVybXNoYWZhbGw6IEFycmF5PENhcmQ+ID0gW107XG4gIGNvbnN0cnVjdG9yKFxuICAgIHByaXZhdGUgZnJhbWV3b3JrU2VydmljZTogRnJhbWV3b3JrU2VydmljZSxcbiAgICBwcml2YXRlIGNvbm5lY3RvclNlcnZpY2U6IENvbm5lY3RvclNlcnZpY2UsXG4gICAgcHJpdmF0ZSBhcHByb3ZhbFNlcnZpY2UgOiBBcHByb3ZhbFNlcnZpY2VcbiAgKSB7XG4gIH1cbiAgbmdPbkNoYW5nZXMoY2hhbmdlczogU2ltcGxlQ2hhbmdlcyk6IHZvaWQge31cblxuXG4gIG5nT25Jbml0KCk6IHZvaWQge1xuICAgIHRoaXMuc3Vic2NyaWJlRXZlbnRzKClcblxuICAgIGlmICh0aGlzLmNvbHVtbi5pbmRleCA9PT0gMSkge1xuICAgICAgdGhpcy5hcHByb3ZhbFNlcnZpY2UuZ2V0VXBkYXRlTGlzdCgpLnN1YnNjcmliZSgobGlzdDphbnkpID0+IHtcbiAgICAgICAgdGhpcy5hcHByb3ZhbFRlcm0gPSBsaXN0LmZpbHRlcihpdGVtID0+IHRoaXMuY29sdW1uLmNvZGUgPT09IGl0ZW0uY2F0ZWdvcnkpXG4gICAgICAgIGlmKHRoaXMuYXBwcm92YWxUZXJtKXtcbiAgICAgICAgICB0aGlzLmFwcHJvdmFsVGVybS5mb3JFYWNoKCh0ZXJtLCBpKT0+IHtcbiAgICAgICAgICAgICB0aGlzLmNvbHVtbi5jaGlsZHJlbi5mb3JFYWNoKChsZWwsaikgPT4ge1xuICAgICAgICAgICAgICAgIGlmKGxlbC5pZGVudGlmaWVyID09PSB0ZXJtLmlkZW50aWZpZXIpe1xuICAgICAgICAgICAgICAgICAgaWYoIXRoaXMuaXNFeGlzdHModGVybSkpe1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnRlcm1zaGFmYWxsLnB1c2gobGVsKVxuICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICB9KVxuICAgICAgICAgIH0pXG4gICAgICAgICAgLy8gdGhpcy50ZXJtc2hhZmFsbCA9IFsuLi50aGlzLnRlcm1zaGFmYWxsXVxuICAgICAgICAgIHRoaXMuY29sdW1uLmNoaWxkcmVuLmZvckVhY2goKHRyLCBpKSA9PiB7XG4gICAgICAgICAgICBpZighdGhpcy5pc0V4aXN0cyh0cikpe1xuICAgICAgICAgICAgICB0aGlzLnRlcm1zaGFmYWxsLnB1c2godHIpXG4gICAgICAgICAgICB9XG4gICAgICAgICAgfSlcbiAgICAgICAgICB0aGlzLmNvbHVtbkRhdGEgPSB0aGlzLnRlcm1zaGFmYWxsO1xuICAgICAgICAgIHRoaXMuY2FyZHNDb3VudC5lbWl0KHtjYXRlZ29yeTogdGhpcy5jb2x1bW5EYXRhWzBdLmNhdGVnb3J5LGNvdW50OnRoaXMuY29sdW1uRGF0YS5sZW5ndGh9KTtcbiAgICAgICAgfVxuICAgICAgfSlcbiAgICB9XG4gICAgdGhpcy5jb25uZWN0b3JNYXBwaW5nID0gdGhpcy5jb25uZWN0b3JTZXJ2aWNlLmNvbm5lY3Rvck1hcFxuICAgIC8vIHRoaXMuZnJhbWV3b3JrU2VydmljZS5pc0RhdGFVcGRhdGVkLnN1YnNjcmliZSgoKSA9PiB7XG4gICAgLy8gICB0aGlzLm5nT25Jbml0KClcbiAgICAvLyB9KVxuICAgIFxuICB9XG4gXG4gIGlzRXhpc3RzKGUpe1xuICAgIGxldCB0ZW1wID0gW107XG4gICAgcmV0dXJuIHRlbXAuaW5jbHVkZXMoZS5pZGVudGlmaWVyKVxuICAgIHRlbXAgPSB0aGlzLnRlcm1zaGFmYWxsLm1hcCh0ID0+IHQuaWRlbnRpZmllcilcbiAgfVxuICAvKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAqL1xuICBzdWJzY3JpYmVFdmVudHMoKSB7XG4gICAgaWYgKHRoaXMuY2hpbGRTdWJzY3JpcHRpb24pIHtcbiAgICAgIHRoaXMuY2hpbGRTdWJzY3JpcHRpb24udW5zdWJzY3JpYmUoKVxuICAgIH1cbiAgICB0aGlzLmNoaWxkU3Vic2NyaXB0aW9uID0gdGhpcy5mcmFtZXdvcmtTZXJ2aWNlLmN1cnJlbnRTZWxlY3Rpb24uc3Vic2NyaWJlKGUgPT4ge1xuICAgICAgaWYgKCFlKSB7XG4gICAgICAgIHJldHVyblxuICAgICAgfSBlbHNlIGlmIChlLnR5cGUgPT09IHRoaXMuY29sdW1uLmNvZGUpIHtcbiAgICAgICAgdGhpcy51cGRhdGVUYXhvbm9teVRlcm0uZW1pdCh7IGlzU2VsZWN0ZWQ6IHRydWUsIHNlbGVjdGVkVGVybTogZS5kYXRhIH0pXG4gICAgICAgIHRoaXMuY29sdW1uRGF0YSA9ICh0aGlzLmNvbHVtbkRhdGEgfHwgW10pLm1hcChpdGVtID0+IHtcbiAgICAgICAgICBpZiAoaXRlbS5jb2RlID09PSBlLmRhdGEuY29kZSkge1xuICAgICAgICAgICAgaXRlbS5zZWxlY3RlZCA9IHRydWVcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgaXRlbS5zZWxlY3RlZCA9IGZhbHNlXG4gICAgICAgICAgfVxuICAgICAgICAgIHJldHVybiBpdGVtXG4gICAgICAgIH0pO1xuICAgICAgICB0aGlzLnNldENvbm5lY3RvcnMoZS5jYXJkUmVmLCB0aGlzLmNvbHVtbkRhdGEsICdTSU5HTEUnKVxuICAgICAgICByZXR1cm5cbiAgICAgICAgLy8gY29uc29sZS5sb2coXCJTS0lQOiBmcm9tIHN1YnNjcmlwdGlvbj09PT5cIiwgXCJGT1IgXCIgKyB0aGlzLmNhdGVnb3J5LCBlKVxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgY29uc3QgbmV4dCA9IHRoaXMuZnJhbWV3b3JrU2VydmljZS5nZXROZXh0Q2F0ZWdvcnkoZS50eXBlKTtcbiAgICAgICAgLy8gLy8gY29uc29sZS5sb2coXCJBREQ6IGZyb20gc3Vic2NyaXB0aW9uPT09PlwiLCBcIkZPUiBcIiArIHRoaXMuY2F0ZWdvcnksIG5leHQsIHRoaXMuY2hpbGRyZW4pXG4gICAgICAgIGlmIChuZXh0ICYmIG5leHQuY29kZSA9PT0gdGhpcy5jb2x1bW4uY29kZSkge1xuICAgICAgICAgIC8vICAgY29uc3QgYmFjayA9IHRoaXMuZnJhbWV3b3JrU2VydmljZS5nZXRQcmV2aW91c0NhdGVnb3J5KHRoaXMuY29sdW1uLmNvZGUpXG4gICAgICAgICAgLy8gICBjb25zb2xlLmxvZygnY3VycmVudCBTYXZlZCA9PT09PT09PT09PT4nLCB0aGlzLmZyYW1ld29ya1NlcnZpY2UuZ2V0TG9jYWxUZXJtc0J5Q2F0ZWdvcnkodGhpcy5jb2x1bW4uY29kZSkpXG4gICAgICAgICAgLy8gICBjb25zdCBsb2NhbFRlcm1zID0gW11cbiAgICAgICAgICAvLyAgIHRoaXMuZnJhbWV3b3JrU2VydmljZS5nZXRMb2NhbFRlcm1zQnlDYXRlZ29yeSh0aGlzLmNvbHVtbi5jb2RlKS5mb3JFYWNoKGYgPT4ge1xuICAgICAgICAgIC8vIGRlYnVnZ2VyXG4gICAgICAgICAgLy8gICAgIGNvbnN0IGxzdCA9IGJhY2sgPyB0aGlzLmZyYW1ld29ya1NlcnZpY2Uuc2VsZWN0aW9uTGlzdC5nZXQoYmFjay5jb2RlKSA6IG51bGw7IC8vY2FuIHVzZSBjdXJyZW50XG4gICAgICAgICAgLy8gICAgIGlmIChsc3QgJiYgZi5wYXJlbnQuaWRlbnRpZmllciA9PT0gbHN0LmlkZW50aWZpZXIpIHtcbiAgICAgICAgICAvLyAgICAgICBsb2NhbFRlcm1zLnB1c2goZi50ZXJtKVxuICAgICAgICAgIC8vICAgICB9XG4gICAgICAgICAgLy8gICB9KVxuICAgICAgICAgIC8vICAgLy8gZ2V0IGxhc3QgcGFyZW50IGFuZCBmaWx0ZXIgQWJvdmVcblxuICAgICAgICAgIC8vICAgdGhpcy5jb2x1bW5EYXRhID0gWy4uLmxvY2FsVGVybXMsIC4uLihlLmRhdGEuY2hpbGRyZW4gfHwgW10pXVxuICAgICAgICAgIC8vICAgICAuZmlsdGVyKHggPT4ge1xuICAgICAgICAgIC8vICAgICAgIHJldHVybiB4LmNhdGVnb3J5ID09IHRoaXMuY29sdW1uLmNvZGVcbiAgICAgICAgICAvLyAgICAgfSkubWFwKG1lciA9PiB7XG4gICAgICAgICAgLy8gICAgICAgLy8qKnJlYWQgbG9jYWwgY2hpbGRyZW4gZm9yIG5leHQgKi9cbiAgICAgICAgICAvLyAgICAgICAvLyBjb25zdCBuZXh0Q2hpbGRyZW4gPSB0aGlzLmZyYW1ld29ya1NlcnZpY2UuZ2V0TG9jYWxUZXJtc0J5UGFyZW50KHRoaXMuY29sdW1uLmNvZGUpXG4gICAgICAgICAgLy8gICAgICAgLy8gY29uc29sZS5sb2coXCJTYXZlZCA9PT09PT09PT09PT09PT09PT09PT09Kz5cIiwgbmV4dENoaWxkcmVuKVxuICAgICAgICAgIC8vICAgICAgIC8qKnJlc2V0IE5leHQgbGV2ZWwgY2hpbGRyZW4gKi9cbiAgICAgICAgICAvLyAgICAgICAvLyB0aGlzLmNvbHVtbi5jaGlsZHJlbiA9IHRoaXMuY29sdW1uLmNoaWxkcmVuLm1hcChjb2wgPT4geyBjb2wuc2VsZWN0ZWQgPSBmYWxzZTsgcmV0dXJuIGNvbCB9KVxuICAgICAgICAgIC8vICAgICAgIC8vIG1lci5zZWxlY3RlZCA9IGZhbHNlXG4gICAgICAgICAgLy8gICAgICAgbWVyLmNoaWxkcmVuID0gKFsuLi50aGlzLmNvbHVtbi5jaGlsZHJlbi5maWx0ZXIoeCA9PiB7IHJldHVybiB4LmNvZGUgPT09IG1lci5jb2RlIH0pLm1hcChhID0+IGEuY2hpbGRyZW4pXS5zaGlmdCgpIHx8IFtdKVxuICAgICAgICAgIC8vICAgICAgIHJldHVybiBtZXJcbiAgICAgICAgICAvLyAgICAgfSlcbiAgICAgICAgICAvLyAgIC8vIHRoaXMudXBkYXRlVGVybXMoKVxuICAgICAgICAgIFxuICAgICAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgICAgICAgLyogaXN0YW5idWwgaWdub3JlIG5leHQgKi9cbiAgICAgICAgICAgIHRoaXMuc2V0Q29ubmVjdG9ycyhlLmNhcmRSZWYsIG5leHQgJiYgbmV4dC5pbmRleCA8IHRoaXMuY29sdW1uLmluZGV4ID8gW10gOiB0aGlzLmNvbHVtbkRhdGEsICdBTEwnKVxuICAgICAgICAgIH0sIDEwMCk7XG4gICAgICAgICAgLy8gY29uc29sZS5sb2codGhpcy5jb2x1bW5EYXRhKVxuICAgICAgICB9XG5cbiAgICAgICAgaWYgKG5leHQgJiYgbmV4dC5pbmRleCA8IHRoaXMuY29sdW1uLmluZGV4KSB7XG4gICAgICAgICAgdGhpcy5jb2x1bW5EYXRhID0gW107XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9KVxuICAgIGlmICh0aGlzLm5ld1Rlcm1TdWJzY3JpcHRpb24pIHtcbiAgICAgIHRoaXMubmV3VGVybVN1YnNjcmlwdGlvbi51bnN1YnNjcmliZSgpXG4gICAgfVxuICAgIHRoaXMubmV3VGVybVN1YnNjcmlwdGlvbiA9IHRoaXMuZnJhbWV3b3JrU2VydmljZS5pbnNlcnRVcGRhdGVEZWxldGVOb3RpZmllci5zdWJzY3JpYmUoZSA9PiB7XG4gICAgICBpZiAoZSAmJiBlLmFjdGlvbikge1xuICAgICAgICBjb25zdCBuZXh0ID0gdGhpcy5mcmFtZXdvcmtTZXJ2aWNlLmdldE5leHRDYXRlZ29yeShlLmFjdGlvbik7XG4gICAgICAgIGlmICh0aGlzLmNvbHVtbi5jb2RlID09PSBuZXh0LmNvZGUgJiYgZS50eXBlID09PSAnc2VsZWN0Jykge1xuICAgICAgICAgIHRoaXMuaW5zZXJ0VXBkYXRlSGFuZGxlcihlLCBuZXh0KVxuICAgICAgICB9XG4gICAgICB9XG4gICAgfSlcbiAgfVxuICAvKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAqL1xuICBpbnNlcnRVcGRhdGVIYW5kbGVyKGUsIG5leHQpIHtcbiAgICBjb25zdCBiYWNrID0gdGhpcy5mcmFtZXdvcmtTZXJ2aWNlLmdldFByZXZpb3VzQ2F0ZWdvcnkodGhpcy5jb2x1bW4uY29kZSlcbiAgICAvLyBjb25zb2xlLmxvZygnY3VycmVudCBTYXZlZCA9PT09PT09PT09PT4nLCB0aGlzLmZyYW1ld29ya1NlcnZpY2UuZ2V0TG9jYWxUZXJtc0J5Q2F0ZWdvcnkodGhpcy5jb2x1bW4uY29kZSkpXG4gICAgY29uc3QgbG9jYWxUZXJtcyA9IFtdXG4gICAgdGhpcy5mcmFtZXdvcmtTZXJ2aWNlLmdldExvY2FsVGVybXNCeUNhdGVnb3J5KHRoaXMuY29sdW1uLmNvZGUpLmZvckVhY2goZiA9PiB7XG4gICAgICBjb25zdCBzZWxlY3RlZFBhcmVudCA9IGJhY2sgPyB0aGlzLmZyYW1ld29ya1NlcnZpY2Uuc2VsZWN0aW9uTGlzdC5nZXQoYmFjay5jb2RlKSA6IG51bGw7IC8vY2FuIHVzZSBjdXJyZW50XG4gICAgICBpZiAoc2VsZWN0ZWRQYXJlbnQgJiYgKChmLnBhcmVudC5jb2RlID09PSBzZWxlY3RlZFBhcmVudC5jb2RlKSB8fCAoZi5wYXJlbnQuaWRlbnRpZmllciAmJiAoZi5wYXJlbnQuaWRlbnRpZmllciA9PT0gc2VsZWN0ZWRQYXJlbnQuaWRlbnRpZmllcikpKSkge1xuICAgICAgICBsb2NhbFRlcm1zLnB1c2goZi50ZXJtKVxuICAgICAgfVxuICAgIH0pXG4gICAgLy8gZ2V0IGxhc3QgcGFyZW50IGFuZCBmaWx0ZXIgQWJvdmVcbiAgICB0aGlzLmNvbHVtbkRhdGEgPSBbLi4ubG9jYWxUZXJtcywgLi4uKGUuZGF0YS5jaGlsZHJlbiB8fCBbXSldXG4gICAgICAuZmlsdGVyKHggPT4ge1xuICAgICAgICByZXR1cm4geC5jYXRlZ29yeSA9PSB0aGlzLmNvbHVtbi5jb2RlXG4gICAgICB9KS5tYXAobWVyID0+IHtcbiAgICAgICAgLy8qKnJlYWQgbG9jYWwgY2hpbGRyZW4gZm9yIG5leHQgKi9cbiAgICAgICAgLy8gY29uc3QgbmV4dENoaWxkcmVuID0gdGhpcy5mcmFtZXdvcmtTZXJ2aWNlLmdldExvY2FsVGVybXNCeVBhcmVudCh0aGlzLmNvbHVtbi5jb2RlKVxuICAgICAgICAvLyBjb25zb2xlLmxvZyhcIlNhdmVkID09PT09PT09PT09PT09PT09PT09PT0rPlwiLCBuZXh0Q2hpbGRyZW4pXG4gICAgICAgIC8qKnJlc2V0IE5leHQgbGV2ZWwgY2hpbGRyZW4gKi9cbiAgICAgICAgdGhpcy5jb2x1bW4uY2hpbGRyZW4gPSB0aGlzLmNvbHVtbi5jaGlsZHJlbi5tYXAoY29sID0+IHsgY29sLnNlbGVjdGVkID0gZmFsc2U7IHJldHVybiBjb2wgfSlcbiAgICAgICAgbWVyLnNlbGVjdGVkID0gZmFsc2VcbiAgICAgICAgbWVyLmNoaWxkcmVuID0gKFsuLi50aGlzLmNvbHVtbi5jaGlsZHJlbi5maWx0ZXIoeCA9PiB7IHJldHVybiB4LmNvZGUgPT09IG1lci5jb2RlIH0pLm1hcChhID0+IGEuY2hpbGRyZW4pXS5zaGlmdCgpIHx8IFtdKVxuICAgICAgICByZXR1cm4gbWVyXG4gICAgICB9KTtcblxuICAgIGlmKHRoaXMuY29sdW1uRGF0YS5sZW5ndGggPiAwKSB7XG4gICAgICB0aGlzLmNhcmRzQ291bnQuZW1pdCh7Y2F0ZWdvcnk6IHRoaXMuY29sdW1uRGF0YVswXS5jYXRlZ29yeSxjb3VudDp0aGlzLmNvbHVtbkRhdGEubGVuZ3RofSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMuY2FyZHNDb3VudC5lbWl0KHtjYXRlZ29yeTogdGhpcy5jb2x1bW4uY29kZSxjb3VudDogMH0pO1xuICAgIH1cbiAgICAvLyB0aGlzLnVwZGF0ZVRlcm1zKClcblxuICAgIC8vIGNvbnNvbGUubG9nKHRoaXMuY29sdW1uRGF0YSlcblxuXG5cbiAgfVxuICB1cGRhdGVTZWxlY3Rpb24xKGRhdGE6IGFueSkgeyB9XG4gIHVwZGF0ZVNlbGVjdGlvbihzZWxlY3Rpb246IGFueSkge1xuICAgIC8vIGNvbnNvbGUubG9nKHNlbGVjdGlvbi5lbGVtZW50LmNvZGUsIHNlbGVjdGlvbi5pc1NlbGVjdGVkKVxuICAgIC8vIGlmKHRoaXMuY29sdW1uLmNvZGU9PT0nbWVkaXVtJyl7XG4gICAgLy8gY29uc29sZS5sb2coIHRoaXMuY29sdW1uLmNoaWxkcmVuKVxuICAgIC8vIH1cbiAgICAvLyBpZiAoc2VsZWN0aW9uLmVsZW1lbnQuY2F0ZWdvcnkgPT09IHRoaXMuY29sdW1uLmNvZGUpIHtcbiAgICAvLyAgIHRoaXMudXBkYXRlVGF4b25vbXlUZXJtLmVtaXQoeyBpc1NlbGVjdGVkOiBzZWxlY3Rpb24uaXNTZWxlY3RlZCwgc2VsZWN0ZWRUZXJtOiBzZWxlY3Rpb24uZWxlbWVudCB9KVxuICAgIC8vIH1cbiAgICAvLyB0aGlzLmNvbHVtbi5jaGlsZHJlbiA9IHRoaXMuY29sdW1uLmNoaWxkcmVuLm1hcChjb2wgPT4ge1xuICAgIC8vICAgaWYgKGNvbC5jb2RlID09PSBzZWxlY3Rpb24uZWxlbWVudC5jb2RlKSB7XG4gICAgLy8gICAgIGNvbC5zZWxlY3RlZCA9IHRydWVcbiAgICAvLyAgIH0gZWxzZSB7XG4gICAgLy8gICAgIGNvbC5zZWxlY3RlZCA9IGZhbHNlXG4gICAgLy8gICB9XG4gICAgLy8gICByZXR1cm4gY29sXG4gICAgLy8gfSlcbiAgICBjb25zb2xlLmxvZyhzZWxlY3Rpb24pXG4gIH1cblxuICBnZXQgY29sdW1uSXRlbXMoKSB7XG4gICAgLy8gY29uc3Qgc2VsZWN0ZWQgPSB0aGlzLmNvbHVtbi5jaGlsZHJlbi5maWx0ZXIoZiA9PiB7IHJldHVybiBmLnNlbGVjdGVkIH0pXG4gICAgLy8gaWYgKHNlbGVjdGVkLmxlbmd0aCA+IDApIHtcbiAgICAvLyAgIGNvbnN0IGRhdGEgPSB0aGlzLmNvbHVtbkRhdGEubWFwKGNkID0+IHtcbiAgICAvLyAgICAgY2Quc2VsZWN0ZWQgPSB0aGlzLmNvbHVtbi5jaGlsZHJlbi5maWx0ZXIoZiA9PiB7IHJldHVybiBjZC5pZGVudGlmaWVyID09PSBmLmlkZW50aWZpZXIgfSkubWFwKHMgPT4gcy5zZWxlY3RlZClbMF1cbiAgICAvLyAgICAgcmV0dXJuIGNkXG4gICAgLy8gICB9KVxuICAgIC8vICAgcmV0dXJuIGRhdGFcbiAgICAvLyB9IGVsc2Uge1xuICAgIHJldHVybiB0aGlzLmNvbHVtbkRhdGFcbiAgICAvLyB9XG4gIH1cbiAgLyogaXN0YW5idWwgaWdub3JlIG5leHQgKi9cbiAgc2V0Q29ubmVjdG9ycyhlbGVtZW50Q2xpY2tlZCwgY29sdW1uSXRlbSwgbW9kZSkge1xuICAgIHRoaXMucmVtb3ZlQ29ubmVjdG9ycyhlbGVtZW50Q2xpY2tlZCwgJ2JveCcgKyAodGhpcy5jb2x1bW4uaW5kZXggLSAxKSwgdGhpcy5jb2x1bW4uaW5kZXggLSAxKVxuICAgIC8vIGNvbnNvbGUubG9nKCdtb2RlJywgbW9kZSlcbiAgICAvLyBjb25zb2xlLmxvZygnY2hpbGQgJywgY29sdW1uSXRlbSlcbiAgICAvLyBjb25zb2xlLmxvZygnZWxlbWVudENsaWNrZWQnLCBlbGVtZW50Q2xpY2tlZClcbiAgICAvLyBjb25zb2xlLmxvZygnY29ubmVjdG9yTWFwcGluZycsIHRoaXMuY29ubmVjdG9yTWFwcGluZylcbiAgICBpZiAobW9kZSA9PT0gJ0FMTCcpIHtcbiAgICAgIC8vIGxldCB0ZW1wY29ubmVjdG9yTWFwcGluZyA9IHt9XG4gICAgICAvLyB0aGlzLmNvbm5lY3RvclNlcnZpY2UudXBkYXRlQ29ubmVjdG9yc01hcCh0ZW1wY29ubmVjdG9yTWFwcGluZylcbiAgICAgIC8vIHtcbiAgICAgIC8vICAgWydjb2x1bW4nICsgKHRoaXMuY29sdW1uLmluZGV4LSAxKV06ICcnXG5cbiAgICAgIC8vIH1cbiAgICAgIGNvbnN0IGlkcyA9IGNvbHVtbkl0ZW0ubWFwKChjLCBpKSA9PiB7XG4gICAgICAgIHJldHVybiB0aGlzLmNvbHVtbi5jb2RlICsgJ0NhcmQnICsgKGkgKyAxKVxuICAgICAgfSlcbiAgICAgICAvKiBpc3RhbmJ1bCBpZ25vcmUgICovXG4gICAgICB0aGlzLmNvbm5lY3Rvck1hcHBpbmdbJ2JveCcgKyAodGhpcy5jb2x1bW4uaW5kZXggLSAxKV0gPSB7IHNvdXJjZTogZWxlbWVudENsaWNrZWQsIGxpbmVzOiAoaWRzIHx8IFtdKS5tYXAoaWQgPT4geyByZXR1cm4geyB0YXJnZXQ6IGlkLCBsaW5lOiAnJywgdGFyZ2V0VHlwZTogJ2lkJyB9IH0pIH1cbiAgICAgIHRoaXMuY29ubmVjdG9yU2VydmljZS51cGRhdGVDb25uZWN0b3JzTWFwKHRoaXMuY29ubmVjdG9yTWFwcGluZylcbiAgICAgIC8vIGNvbnNvbGUubG9nKCduZXh0JywgbmV4dClcbiAgICAgIGNvbnN0IGNvbm5lY3Rpb25MaW5lcyA9IHRoaXMuY29ubmVjdG9yU2VydmljZS5fZHJhd0xpbmUoXG4gICAgICAgIHRoaXMuY29ubmVjdG9yTWFwcGluZ1snYm94JyArICh0aGlzLmNvbHVtbi5pbmRleCAtIDEpXS5zb3VyY2UsXG4gICAgICAgIHRoaXMuY29ubmVjdG9yTWFwcGluZ1snYm94JyArICh0aGlzLmNvbHVtbi5pbmRleCAtIDEpXS5saW5lcyxcbiAgICAgICAgbnVsbCxcbiAgICAgICAgJyNib3gnICsgKHRoaXMuY29sdW1uLmluZGV4IC0gMSksXG4gICAgICAgICcjYm94JyArIHRoaXMuY29sdW1uLmluZGV4XG4gICAgICApXG4gICAgICB0aGlzLmNvbm5lY3Rvck1hcHBpbmdbJ2JveCcgKyAodGhpcy5jb2x1bW4uaW5kZXggLSAxKV0ubGluZXMgPSBjb25uZWN0aW9uTGluZXNcbiAgICAgIC8vIGNvbnNvbGUubG9nKCd0aGlzLmNvbm5lY3Rvck1hcHBpbmcgOjogLS0tLS0tLS0tLS0tLS0tLS0tLS0tLScsIHRoaXMuY29ubmVjdG9yTWFwcGluZylcbiAgICAgIC8vIGlmIChjYXQuY29kZSA9PT0gJ2JvYXJkJykge1xuICAgICAgLy8gICB0aGlzLmNvbm5lY3RvclNlcnZpY2UuX2RyYXdMaW5lKCdib3gwY2FyZDAnLCB0aGlzLmNvbm5lY3Rvck1hcHBpbmdbJ2JvYXJkJ11bJ2JveDBjYXJkMCddLCB7XG4gICAgICAvLyAgICAgc3RhcnRQbHVnOiAnZGlzYycsIGVuZFBsdWc6ICdkaXNjJywgY29sb3I6ICdibGFjaydcbiAgICAgIC8vICAgfSwgJ2JveDAnLCAnYm94MScpXG4gICAgICAvLyB9IGVsc2UgaWYgKGNhdC5jb2RlID09PSAnbWVkaXVtJykge1xuICAgICAgLy8gICB0aGlzLmNvbm5lY3RvclNlcnZpY2UuX2RyYXdMaW5lKCdib3gxY2FyZDEnLCB0aGlzLmNvbm5lY3Rvck1hcHBpbmdbJ21lZGl1bSddWydib3gxY2FyZDEnXSwge1xuICAgICAgLy8gICAgIHN0YXJ0UGx1ZzogJ2Rpc2MnLCBlbmRQbHVnOiAnZGlzYycsIGNvbG9yOiAnYmxhY2snXG4gICAgICAvLyAgIH0sICdib3gwJywgJ2JveDEnKVxuICAgICAgLy8gfSBlbHNlIGlmIChjYXQuY29kZSA9PT0gJ2dyYWRlTGV2ZWwnKSB7XG4gICAgICAvLyAgIHRoaXMuY29ubmVjdG9yU2VydmljZS5fZHJhd0xpbmUoJ2JveDJjYXJkNycsIHRoaXMuY29ubmVjdG9yTWFwcGluZ1snZ3JhZGUnXVsnYm94MmNhcmQ3J10sIHtcbiAgICAgIC8vICAgICBzdGFydFBsdWc6ICdkaXNjJywgZW5kUGx1ZzogJ2Rpc2MnLCBjb2xvcjogJ2JsYWNrJ1xuICAgICAgLy8gICB9LCAnYm94MCcsICdib3gxJylcbiAgICB9IGVsc2Uge1xuICAgICAgLy8gY29uc29sZS5sb2coJ2luc2lkZSBlbHNlJylcbiAgICAgIC8vIGNvbnNvbGUubG9nKCd0aGlzLmNvbHVtbicsIHRoaXMuY29sdW1uKVxuICAgICAgY29uc3QgaXRlbSA9IHRoaXMuY29sdW1uLmNoaWxkcmVuLmZpbmRJbmRleChjID0+IGMuc2VsZWN0ZWQpICsgMVxuICAgICAgIGlmICh0aGlzLmNvbHVtbi5pbmRleCA+IDEpIHtcbiAgICAgICAgdGhpcy5jb25uZWN0b3JNYXBwaW5nWydib3gnICsgKHRoaXMuY29sdW1uLmluZGV4IC0gMSldLmxpbmVzID0gW3sgdGFyZ2V0OiBlbGVtZW50Q2xpY2tlZCwgbGluZTogJycsIHRhcmdldFR5cGU6ICdlbGVtZW50JyB9XVxuICAgICAgICB0aGlzLmNvbm5lY3RvclNlcnZpY2UudXBkYXRlQ29ubmVjdG9yc01hcCh0aGlzLmNvbm5lY3Rvck1hcHBpbmcpXG4gICAgICAgIGNvbnN0IGNvbm5lY3Rpb25MaW5lcyA9IHRoaXMuY29ubmVjdG9yU2VydmljZS5fZHJhd0xpbmUoXG4gICAgICAgICAgdGhpcy5jb25uZWN0b3JNYXBwaW5nWydib3gnICsgKHRoaXMuY29sdW1uLmluZGV4IC0gMSldLnNvdXJjZSxcbiAgICAgICAgICB0aGlzLmNvbm5lY3Rvck1hcHBpbmdbJ2JveCcgKyAodGhpcy5jb2x1bW4uaW5kZXggLSAxKV0ubGluZXMsXG4gICAgICAgICAgbnVsbCxcbiAgICAgICAgICAnI2JveCcgKyAodGhpcy5jb2x1bW4uaW5kZXggLSAxKSxcbiAgICAgICAgICAnI2JveCcgKyB0aGlzLmNvbHVtbi5pbmRleFxuICAgICAgICApXG4gICAgICAgIHRoaXMuY29ubmVjdG9yTWFwcGluZ1snYm94JyArICh0aGlzLmNvbHVtbi5pbmRleCAtIDEpXS5saW5lcyA9IGNvbm5lY3Rpb25MaW5lc1xuICAgICAgICAvLyBjb25zb2xlLmxvZygndGhpcy5jb25uZWN0b3JNYXBwaW5nIDo6IC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0nLCB0aGlzLmNvbm5lY3Rvck1hcHBpbmcpXG4gICAgICB9XG4gICAgfVxuICAgIHRoaXMuY29ubmVjdG9yU2VydmljZS51cGRhdGVDb25uZWN0b3JzTWFwKHRoaXMuY29ubmVjdG9yTWFwcGluZylcblxuICB9XG4gIC8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICovXG4gIHJlbW92ZUNvbm5lY3RvcnMoY3VycmVudEVsZW1lbnQsIHByZXZDb2wsIGN1cnJlbnRJbmRleCkge1xuICAgIGNvbnNvbGUubG9nKCdwcmV2Q29sIC0tLS0tLS0tLS0tLScsIHByZXZDb2wpXG4gICAgaWYgKHRoaXMuY29ubmVjdG9yTWFwcGluZykge1xuICAgICAgZm9yIChjb25zdCBrZXkgaW4gdGhpcy5jb25uZWN0b3JNYXBwaW5nKSB7XG4gICAgICAgIC8vIFJlbW92ZSBhbGwgbi0xIGxpbmVzIGFuZCBrZWVwIG9ubHkgY3VycmVudCBzZWxlY3Rpb24sIGFsc28gY2xlYXIgbisxIGxpbmVzXG4gICAgICAgIGlmICh0aGlzLmNvbm5lY3Rvck1hcHBpbmdba2V5XSAmJiB0aGlzLmNvbm5lY3Rvck1hcHBpbmdba2V5XS5saW5lcyAmJiB0aGlzLmNvbm5lY3Rvck1hcHBpbmdba2V5XS5saW5lcy5sZW5ndGggPiAwKSB7XG4gICAgICAgICAgY29uc3QgbGluZXMgPSB0aGlzLmNvbm5lY3Rvck1hcHBpbmdba2V5XS5saW5lc1xuICAgICAgICAgIGxpbmVzLmZvckVhY2goYXN5bmMgKGVsZW1lbnQsIGluZGV4KSA9PiB7XG4gICAgICAgICAgICBpZiAoZWxlbWVudCAhPSBjdXJyZW50RWxlbWVudCAmJiBwcmV2Q29sID09IGtleSkge1xuICAgICAgICAgICAgICBhd2FpdCBlbGVtZW50LmxpbmUgJiYgZWxlbWVudC5saW5lLnJlbW92ZSgpO1xuICAgICAgICAgICAgICBsaW5lcy5zcGxpY2UoaW5kZXgsIDEpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH0pO1xuICAgICAgICAgIHRoaXMuY29ubmVjdG9yTWFwcGluZ1trZXldLmxpbmVzID0gbGluZXNcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIHJlbW92ZSBhbGwgbisyIGxpbmVzLCBpZiBjbGlja3MgcHJldmlvdXMgY29sdW1ucyBhbmQgdHJlZSB3YXMgYWxyZWFkeSBkcmlsbGVkIGRvd25cbiAgICAgICAgbGV0IGNvdW50ID0gY3VycmVudEluZGV4ICsgMjtcbiAgICAgICAgbGV0IG5leHRDb2wgPSBgYm94JHtjb3VudH1gXG4gICAgICAgIGlmICh0aGlzLmNvbm5lY3Rvck1hcHBpbmdbbmV4dENvbF0gJiYgdGhpcy5jb25uZWN0b3JNYXBwaW5nW25leHRDb2xdLmxpbmVzICYmIHRoaXMuY29ubmVjdG9yTWFwcGluZ1tuZXh0Q29sXS5saW5lcy5sZW5ndGggPiAwKSB7XG4gICAgICAgICAgY29uc3QgbGluZXMgPSB0aGlzLmNvbm5lY3Rvck1hcHBpbmdbbmV4dENvbF0ubGluZXNcbiAgICAgICAgICBsaW5lcy5mb3JFYWNoKGFzeW5jIChlbGVtZW50LCBpbmRleCkgPT4ge1xuICAgICAgICAgICAgYXdhaXQgZWxlbWVudC5saW5lICYmIGVsZW1lbnQubGluZS5yZW1vdmUoKTtcbiAgICAgICAgICAgIGxpbmVzLnNwbGljZShpbmRleCwgMSk7XG4gICAgICAgICAgfSlcbiAgICAgICAgICB0aGlzLmNvbm5lY3Rvck1hcHBpbmdbbmV4dENvbF0ubGluZXMgPSBudWxsXG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgIH1cbiAgfVxuICBzZWxlY3RlZENhcmQoZXZlbnQpe1xuICAgIHRoaXMudXBkYXRlVGVybUxpc3QuZW1pdChldmVudCk7XG4gIH1cblxuICBuZ09uRGVzdHJveSgpOiB2b2lkIHtcbiAgICBpZiAodGhpcy5jaGlsZFN1YnNjcmlwdGlvbikge1xuICAgICAgdGhpcy5jaGlsZFN1YnNjcmlwdGlvbi51bnN1YnNjcmliZSgpXG4gICAgfVxuICB9XG4gIFxufSIsIjxuZy1jb250YWluZXIgKm5nSWY9XCJjb2x1bW5JdGVtcyAmJiBjb2x1bW5JdGVtcy5sZW5ndGggPiAwOyBlbHNlIG5vRGF0YVRlbXBsYXRlO1wiPlxuICAgIDxuZy1jb250YWluZXIgKm5nRm9yPVwibGV0IGNoaWxkIG9mIGNvbHVtbkl0ZW1zOyBsZXQgaiA9IGluZGV4XCI+XG4gICAgICAgIDxkaXYgI2NhcmRFbGUgaWQ9XCJ7e2NvbHVtbi5jb2RlfX1DYXJke3tqKzF9fVwiID5cbiAgICAgICAgICAgIDxsaWItdGVybS1jYXJkXG4gICAgICAgICAgICAgICAgW2RhdGFdPVwieydjaGlsZHJlbic6IGNoaWxkLCAnc2VsZWN0ZWQnIDogZmFsc2UsICdjYXRlZ29yeSc6Y29sdW1uLmNvZGUsIGNhcmRTdWJUeXBlOiAnbWluaW1hbCcsIGlzVmlld09ubHk6ZmFsc2UsJ2luZGV4Jzpjb2x1bW4uaW5kZXh9XCJcbiAgICAgICAgICAgICAgICAoaXNTZWxlY3RlZCk9XCJ1cGRhdGVTZWxlY3Rpb24xKCRldmVudClcIiAoc2VsZWN0ZWRDYXJkKT1cInNlbGVjdGVkQ2FyZCgkZXZlbnQpXCI+XG4gICAgICAgICAgICA8L2xpYi10ZXJtLWNhcmQ+XG4gICAgICAgIDwvZGl2PlxuICAgIDwvbmctY29udGFpbmVyPlxuPC9uZy1jb250YWluZXI+XG48bmctdGVtcGxhdGUgI25vRGF0YVRlbXBsYXRlPlxuICAgIDwhLS0gPGRpdj5ObyB7e2NvbHVtbi5uYW1lfX0gYXNzb2NpYXRlZDwvZGl2PiAtLT5cbjwvbmctdGVtcGxhdGU+XG4iXX0=