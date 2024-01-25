import { Component } from '@angular/core';
import { map } from 'rxjs/operators';
import * as API from '../../constants/app-constant';
import * as i0 from "@angular/core";
import * as i1 from "@angular/router";
import * as i2 from "../../services/approval.service";
import * as i3 from "../../services/framework.service";
import * as i4 from "@angular/material/snack-bar";
import * as i5 from "@angular/common";
import * as i6 from "../taxonomy-view/taxonomy-view.component";
export class ApproveViewComponent {
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
            action: API.APPROVAL.APPROVE,
            serviceName: API.APPROVAL.SERVICE_NAME
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
ApproveViewComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "14.3.0", ngImport: i0, type: ApproveViewComponent, deps: [{ token: i1.ActivatedRoute }, { token: i2.ApprovalService }, { token: i3.FrameworkService }, { token: i4.MatSnackBar }], target: i0.ɵɵFactoryTarget.Component });
ApproveViewComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "14.3.0", type: ApproveViewComponent, selector: "lib-approve-view", ngImport: i0, template: "<!-- <div class=\"approve-view__container\" *ngIf=\"listItems && listItems.length > 0 \">\n        <ng-container *ngFor=\"let column of categories let i = index;\">\n            <div class=\"approve-view__columns\">\n                   <h4 class=\"approve-view__columns-title\">{{column}}</h4> \n                <section>\n                    <ng-container *ngFor=\"let term of listItems\">\n                        <div *ngIf=\"column === term.category\" >\n                            <lib-term-card\n                                [data]=\"{'children': term, 'selected' : false, 'category':column, cardSubType: 'minimal', isViewOnly:true}\">\n                            </lib-term-card>\n                        </div>\n                        \n                    </ng-container>\n                </section>\n            </div>\n        </ng-container>\n        <lib-action-bar *ngIf=\"showAction\" [configType]=\"workflowDetails.currentStatus\" [actionType]=\"'approve'\" (sendApproval)=\"approvalRequest()\" (closeAction)=\"closeActionBar($event)\"></lib-action-bar> \n</div> -->\n<ng-container *ngIf=\"listItems\">\n    <lib-taxonomy-view \n        [isApprovalView]=\"true\" \n        [approvalList]=\"listItems\" \n        [workFlowStatus]=\"workflowDetails?.currentStatus\"\n        (sentForApprove)=\"approvalRequest($event)\">\n    </lib-taxonomy-view>\n</ng-container>\n", styles: [".approve-view__container{display:flex;justify-content:center;flex-direction:row}.approve-view__columns{flex:1;padding:30px}.approve-view__columns-title{text-transform:capitalize;font-size:20px}\n"], dependencies: [{ kind: "directive", type: i5.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { kind: "component", type: i6.TaxonomyViewComponent, selector: "lib-taxonomy-view", inputs: ["approvalList", "isApprovalView", "workFlowStatus", "environment", "taxonomyConfig"], outputs: ["sentForApprove"] }] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "14.3.0", ngImport: i0, type: ApproveViewComponent, decorators: [{
            type: Component,
            args: [{ selector: 'lib-approve-view', template: "<!-- <div class=\"approve-view__container\" *ngIf=\"listItems && listItems.length > 0 \">\n        <ng-container *ngFor=\"let column of categories let i = index;\">\n            <div class=\"approve-view__columns\">\n                   <h4 class=\"approve-view__columns-title\">{{column}}</h4> \n                <section>\n                    <ng-container *ngFor=\"let term of listItems\">\n                        <div *ngIf=\"column === term.category\" >\n                            <lib-term-card\n                                [data]=\"{'children': term, 'selected' : false, 'category':column, cardSubType: 'minimal', isViewOnly:true}\">\n                            </lib-term-card>\n                        </div>\n                        \n                    </ng-container>\n                </section>\n            </div>\n        </ng-container>\n        <lib-action-bar *ngIf=\"showAction\" [configType]=\"workflowDetails.currentStatus\" [actionType]=\"'approve'\" (sendApproval)=\"approvalRequest()\" (closeAction)=\"closeActionBar($event)\"></lib-action-bar> \n</div> -->\n<ng-container *ngIf=\"listItems\">\n    <lib-taxonomy-view \n        [isApprovalView]=\"true\" \n        [approvalList]=\"listItems\" \n        [workFlowStatus]=\"workflowDetails?.currentStatus\"\n        (sentForApprove)=\"approvalRequest($event)\">\n    </lib-taxonomy-view>\n</ng-container>\n", styles: [".approve-view__container{display:flex;justify-content:center;flex-direction:row}.approve-view__columns{flex:1;padding:30px}.approve-view__columns-title{text-transform:capitalize;font-size:20px}\n"] }]
        }], ctorParameters: function () { return [{ type: i1.ActivatedRoute }, { type: i2.ApprovalService }, { type: i3.FrameworkService }, { type: i4.MatSnackBar }]; } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXBwcm92ZS12aWV3LmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uL3Byb2plY3RzL3NiLXRheG9ub215LWVkaXRvci9zcmMvbGliL2NvbXBvbmVudHMvYXBwcm92ZS12aWV3L2FwcHJvdmUtdmlldy5jb21wb25lbnQudHMiLCIuLi8uLi8uLi8uLi8uLi8uLi9wcm9qZWN0cy9zYi10YXhvbm9teS1lZGl0b3Ivc3JjL2xpYi9jb21wb25lbnRzL2FwcHJvdmUtdmlldy9hcHByb3ZlLXZpZXcuY29tcG9uZW50Lmh0bWwiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLFNBQVMsRUFBVSxNQUFNLGVBQWUsQ0FBQztBQUdsRCxPQUFPLEVBQUUsR0FBRyxFQUFFLE1BQU0sZ0JBQWdCLENBQUE7QUFHcEMsT0FBTyxLQUFLLEdBQUcsTUFBTSw4QkFBOEIsQ0FBQTs7Ozs7Ozs7QUFRbkQsTUFBTSxPQUFPLG9CQUFvQjtJQU8vQixZQUFvQixjQUE4QixFQUN4QyxlQUFnQyxFQUNoQyxnQkFBa0MsRUFDbEMsU0FBc0I7UUFIWixtQkFBYyxHQUFkLGNBQWMsQ0FBZ0I7UUFDeEMsb0JBQWUsR0FBZixlQUFlLENBQWlCO1FBQ2hDLHFCQUFnQixHQUFoQixnQkFBZ0IsQ0FBa0I7UUFDbEMsY0FBUyxHQUFULFNBQVMsQ0FBYTtRQVBoQyxjQUFTLEdBQVEsRUFBRSxDQUFBO1FBQ25CLGVBQVUsR0FBYSxFQUFFLENBQUE7UUFDekIsZUFBVSxHQUFHLElBQUksQ0FBQTtRQUNqQixZQUFPLEdBQUcsRUFBRSxDQUFBO0lBSXdCLENBQUM7SUFFckMsUUFBUTtRQUNKLElBQUksQ0FBQyxLQUFLLEdBQUcsSUFBSSxDQUFDLGNBQWMsQ0FBQyxRQUFRO2FBQ3hDLElBQUksQ0FBQyxHQUFHLENBQUMsR0FBRyxFQUFFO1lBQ2IsSUFBSSxDQUFDLGtCQUFrQixDQUFDLE1BQU0sQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDLEVBQUUsQ0FBQyxDQUFBO1lBQ2hELE9BQVEsTUFBTSxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUMsRUFBRSxDQUFBO1FBQ2pDLENBQUMsQ0FBQyxDQUFDLENBQUE7UUFDSCxJQUFJLENBQUMsa0JBQWtCLENBQUMsSUFBSSxDQUFDLGNBQWMsQ0FBQyxRQUFRLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUE7SUFDdEUsQ0FBQztJQUVELGtCQUFrQixDQUFDLEVBQUU7UUFDakIsSUFBSSxDQUFDLGVBQWUsQ0FBQyxrQkFBa0IsQ0FBQyxFQUFFLENBQUMsQ0FBQyxTQUFTLENBQUMsQ0FBQyxHQUFPLEVBQUUsRUFBRTtZQUM5RCxJQUFJLENBQUMsU0FBUyxHQUFHLEdBQUcsQ0FBQyxNQUFNLENBQUMsaUJBQWlCLENBQUMsR0FBRyxDQUFDLENBQUMsSUFBUSxFQUFFLEVBQUU7Z0JBQzdELElBQUksQ0FBQyxRQUFRLEdBQUUsS0FBSyxDQUFBO2dCQUNwQixPQUFPLElBQUksQ0FBQztZQUNkLENBQUMsQ0FBQyxDQUFDO1lBQ0gsSUFBSSxDQUFDLGVBQWUsR0FBRyxHQUFHLENBQUMsTUFBTSxDQUFBO1lBQ2pDLElBQUksQ0FBQyxlQUFlLENBQUMsZUFBZSxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQztRQUN6RCxDQUFDLENBQUMsQ0FBQztJQUNQLENBQUM7SUFFRCxlQUFlLENBQUMsYUFBa0I7UUFDaEMsTUFBTSxXQUFXLEdBQUc7WUFDbEIsSUFBSSxFQUFDLElBQUksQ0FBQyxjQUFjLENBQUMsUUFBUSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUM7WUFDOUMsS0FBSyxFQUFDLElBQUksQ0FBQyxlQUFlLENBQUMsYUFBYTtZQUN4QyxNQUFNLEVBQUUsR0FBRyxDQUFDLFFBQVEsQ0FBQyxPQUFPO1lBQzVCLFdBQVcsRUFBQyxHQUFHLENBQUMsUUFBUSxDQUFDLFlBQVk7U0FDdEMsQ0FBQTtRQUNELElBQUksQ0FBQyxlQUFlLENBQUMsc0JBQXNCLENBQUMsV0FBVyxDQUFDLENBQUMsU0FBUyxDQUFDLEdBQUcsQ0FBQyxFQUFFO1lBQ3ZFLE9BQU8sQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLENBQUE7WUFDaEIsSUFBSSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsOEJBQThCLEVBQUUsUUFBUSxDQUFDLENBQUE7UUFDL0QsQ0FBQyxDQUFDLENBQUM7SUFDTCxDQUFDO0lBQ0QsY0FBYyxDQUFDLENBQUM7UUFDZCxJQUFJLENBQUMsVUFBVSxHQUFHLEtBQUssQ0FBQztJQUMxQixDQUFDO0lBRUQsNkRBQTZEO0lBQzdELGNBQWM7SUFDZCxzQkFBc0I7SUFDdEIsMENBQTBDO0lBQzFDLDRDQUE0QztJQUM1QywwQkFBMEI7SUFDMUIsbUNBQW1DO0lBQ25DLHVDQUF1QztJQUN2QyxrRkFBa0Y7SUFDbEYsaUhBQWlIO0lBQ2pILGtDQUFrQztJQUNsQyxzQ0FBc0M7SUFDdEMsd0NBQXdDO0lBQ3hDLHdDQUF3QztJQUN4QyxjQUFjO0lBRWQsWUFBWTtJQUNaLFVBQVU7SUFDVixVQUFVO0lBQ1YsT0FBTztJQUNQLElBQUk7SUFDSiwyQkFBMkI7SUFDM0Isb0ZBQW9GO0lBQ3BGLHlCQUF5QjtJQUN6QixJQUFJO0lBQ0osV0FBVztRQUNULElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxhQUFhLEVBQUUsQ0FBQTtJQUN2QyxDQUFDOztpSEEzRVUsb0JBQW9CO3FHQUFwQixvQkFBb0Isd0RDZGpDLDIyQ0EwQkE7MkZEWmEsb0JBQW9CO2tCQUxoQyxTQUFTOytCQUNFLGtCQUFrQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvbmVudCwgT25Jbml0IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBBY3RpdmF0ZWRSb3V0ZSB9IGZyb20gJ0Bhbmd1bGFyL3JvdXRlcic7XG5pbXBvcnQgeyBPYnNlcnZhYmxlIH0gZnJvbSAncnhqcyc7XG5pbXBvcnQgeyBtYXAgfSBmcm9tICdyeGpzL29wZXJhdG9ycydcbmltcG9ydCB7IEFwcHJvdmFsU2VydmljZSB9IGZyb20gJy4uLy4uL3NlcnZpY2VzL2FwcHJvdmFsLnNlcnZpY2UnO1xuaW1wb3J0IHsgRnJhbWV3b3JrU2VydmljZSB9IGZyb20gJy4uLy4uL3NlcnZpY2VzL2ZyYW1ld29yay5zZXJ2aWNlJztcbmltcG9ydCAqIGFzIEFQSSBmcm9tICcuLi8uLi9jb25zdGFudHMvYXBwLWNvbnN0YW50J1xuaW1wb3J0IHsgTWF0U25hY2tCYXIgfSBmcm9tICdAYW5ndWxhci9tYXRlcmlhbC9zbmFjay1iYXInO1xuZGVjbGFyZSB2YXIgTGVhZGVyTGluZTogYW55O1xuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnbGliLWFwcHJvdmUtdmlldycsXG4gIHRlbXBsYXRlVXJsOiAnLi9hcHByb3ZlLXZpZXcuY29tcG9uZW50Lmh0bWwnLFxuICBzdHlsZVVybHM6IFsnLi9hcHByb3ZlLXZpZXcuY29tcG9uZW50LnNjc3MnXVxufSlcbmV4cG9ydCBjbGFzcyBBcHByb3ZlVmlld0NvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCB7XG4gIGxpc3QkOiBPYnNlcnZhYmxlPG9iamVjdD47XG4gIHdvcmtmbG93RGV0YWlsczphbnk7XG4gIGxpc3RJdGVtczogYW55ID0gW11cbiAgY2F0ZWdvcmllczogc3RyaW5nW10gPSBbXVxuICBzaG93QWN0aW9uID0gdHJ1ZVxuICBsaW5lUmVmID0gW11cbiAgY29uc3RydWN0b3IocHJpdmF0ZSBhY3RpdmF0ZWRSb3V0ZTogQWN0aXZhdGVkUm91dGUsIFxuICAgIHByaXZhdGUgYXBwcm92YWxTZXJ2aWNlOiBBcHByb3ZhbFNlcnZpY2UsIFxuICAgIHByaXZhdGUgZnJhbWV3b3JrU2VydmljZTogRnJhbWV3b3JrU2VydmljZSxcbiAgICBwcml2YXRlIF9zbmFja0JhcjogTWF0U25hY2tCYXIpIHsgfVxuXG4gIG5nT25Jbml0KCkge1xuICAgICAgdGhpcy5saXN0JCA9IHRoaXMuYWN0aXZhdGVkUm91dGUucGFyYW1NYXBcbiAgICAgIC5waXBlKG1hcCgoKSA9PiB7XG4gICAgICAgIHRoaXMuZ2V0d29ya0Zsb3dEZXRhaWxzKHdpbmRvdy5oaXN0b3J5LnN0YXRlLmlkKVxuICAgICAgICByZXR1cm4gIHdpbmRvdy5oaXN0b3J5LnN0YXRlLmlkXG4gICAgICB9KSlcbiAgICAgIHRoaXMuZ2V0d29ya0Zsb3dEZXRhaWxzKHRoaXMuYWN0aXZhdGVkUm91dGUuc25hcHNob3QucGFyYW1zWydpZCddKVxuICB9XG5cbiAgZ2V0d29ya0Zsb3dEZXRhaWxzKGlkKSB7XG4gICAgICB0aGlzLmFwcHJvdmFsU2VydmljZS5nZXRXb3JrZmxvd0RldGFpbHMoaWQpLnN1YnNjcmliZSgocmVzOmFueSkgPT4ge1xuICAgICAgICAgIHRoaXMubGlzdEl0ZW1zID0gcmVzLnJlc3VsdC51cGRhdGVGaWVsZFZhbHVlcy5tYXAoKGxpc3Q6YW55KSA9PiB7XG4gICAgICAgICAgICBsaXN0LnNlbGVjdGVkPSBmYWxzZVxuICAgICAgICAgICAgcmV0dXJuIGxpc3Q7XG4gICAgICAgICAgfSk7XG4gICAgICAgICAgdGhpcy53b3JrZmxvd0RldGFpbHMgPSByZXMucmVzdWx0XG4gICAgICAgICAgdGhpcy5hcHByb3ZhbFNlcnZpY2Uuc2V0QXBwcm92YWxMaXN0KHRoaXMubGlzdEl0ZW1zKTtcbiAgICAgIH0pO1xuICB9XG5cbiAgYXBwcm92YWxSZXF1ZXN0KGFwcHJvdmFsVGVybXM6IGFueSl7XG4gICAgY29uc3QgcmVxdWVzdEJvZHkgPSB7XG4gICAgICB3ZklkOnRoaXMuYWN0aXZhdGVkUm91dGUuc25hcHNob3QucGFyYW1zWydpZCddLFxuICAgICAgc3RhdGU6dGhpcy53b3JrZmxvd0RldGFpbHMuY3VycmVudFN0YXR1cyxcbiAgICAgIGFjdGlvbjogQVBJLkFQUFJPVkFMLkFQUFJPVkUsXG4gICAgICBzZXJ2aWNlTmFtZTpBUEkuQVBQUk9WQUwuU0VSVklDRV9OQU1FXG4gICAgfVxuICAgIHRoaXMuYXBwcm92YWxTZXJ2aWNlLnVwZGF0ZVdvcmtGbG93QXBwcm92YWwocmVxdWVzdEJvZHkpLnN1YnNjcmliZShyZXMgPT4ge1xuICAgICAgY29uc29sZS5sb2cocmVzKVxuICAgICAgdGhpcy5fc25hY2tCYXIub3BlbignVGVybXMgc3VjY2Vzc2Z1bGx5IEFwcHJvdmVkLicsICdjYW5jZWwnKVxuICAgIH0pO1xuICB9XG4gIGNsb3NlQWN0aW9uQmFyKGUpe1xuICAgIHRoaXMuc2hvd0FjdGlvbiA9IGZhbHNlO1xuICB9XG5cbiAgLyogKioqKiogRG9uJ3QgZGVsZXRlIHRoaXMgY29kZSBtaWdodCBuZWVkIGluIEZ1dHVyZSAqKioqKiAqL1xuICAvLyBkcmF3TGluZSgpe1xuICAvLyAgIHRoaXMubGluZVJlZiA9IFtdXG4gIC8vICAgdGhpcy5jYXRlZ29yaWVzLmZvckVhY2goKGNhdCwgaSkgPT4ge1xuICAvLyAgICAgdGhpcy5saXN0SXRlbXMuZm9yRWFjaCgoaXRlbSwgaikgPT4ge1xuICAvLyAgICAgICBjb25zb2xlLmxvZyhpdGVtKVxuICAvLyAgICAgICBpZihjYXQgPT09IGl0ZW0uY2F0ZWdvcnkpe1xuICAvLyAgICAgICAgIGZvcihsZXQgYyBvZiBpdGVtLmNoaWxkcmVuKXtcbiAgLy8gICAgICAgICAgIGlmKGMuY2F0ZWdvcnkgPT09IHRoaXMuY2F0ZWdvcmllc1tpKzFdICYmIHRoaXMuaXNFeGlzdEluVGVybUxpc3QoYykpe1xuICAvLyAgICAgICAgICAgICAgIGNvbnN0IGxpbmUgPSBuZXcgTGVhZGVyTGluZShkb2N1bWVudC5nZXRFbGVtZW50QnlJZChpdGVtLm5hbWUpLCBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChjLm5hbWUpKVxuICAvLyAgICAgICAgICAgICAgIGxpbmUuY29sb3I9JyM2NjYnXG4gIC8vICAgICAgICAgICAgICAgbGluZS5lbmRQbHVnID0gJ2Rpc2MnXG4gIC8vICAgICAgICAgICAgICAgbGluZS5zdGFydFBsdWcgPSAnZGlzYydcbiAgLy8gICAgICAgICAgICAgICB0aGlzLmxpbmVSZWYucHVzaChsaW5lKVxuICAvLyAgICAgICAgICAgfVxuICAgICAgICAgICBcbiAgLy8gICAgICAgICB9XG4gIC8vICAgICAgIH1cbiAgLy8gICAgICB9KVxuICAvLyAgIH0pXG4gIC8vIH1cbiAgLy8gaXNFeGlzdEluVGVybUxpc3QodGVybSl7XG4gIC8vICAgY29uc3QgY291bnQgPSB0aGlzLmxpc3RJdGVtcy5maWx0ZXIoaXRlbSA9PiBpdGVtLmlkZW50aWZpZXIgPT0gdGVybS5pZGVudGlmaWVyKVxuICAvLyAgIHJldHVybiBjb3VudC5sZW5ndGg7XG4gIC8vIH1cbiAgbmdPbkRlc3Ryb3koKSB7XG4gICAgdGhpcy5mcmFtZXdvcmtTZXJ2aWNlLnJlbW92ZU9sZExpbmUoKVxuICB9XG59XG4iLCI8IS0tIDxkaXYgY2xhc3M9XCJhcHByb3ZlLXZpZXdfX2NvbnRhaW5lclwiICpuZ0lmPVwibGlzdEl0ZW1zICYmIGxpc3RJdGVtcy5sZW5ndGggPiAwIFwiPlxuICAgICAgICA8bmctY29udGFpbmVyICpuZ0Zvcj1cImxldCBjb2x1bW4gb2YgY2F0ZWdvcmllcyBsZXQgaSA9IGluZGV4O1wiPlxuICAgICAgICAgICAgPGRpdiBjbGFzcz1cImFwcHJvdmUtdmlld19fY29sdW1uc1wiPlxuICAgICAgICAgICAgICAgICAgIDxoNCBjbGFzcz1cImFwcHJvdmUtdmlld19fY29sdW1ucy10aXRsZVwiPnt7Y29sdW1ufX08L2g0PiBcbiAgICAgICAgICAgICAgICA8c2VjdGlvbj5cbiAgICAgICAgICAgICAgICAgICAgPG5nLWNvbnRhaW5lciAqbmdGb3I9XCJsZXQgdGVybSBvZiBsaXN0SXRlbXNcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgKm5nSWY9XCJjb2x1bW4gPT09IHRlcm0uY2F0ZWdvcnlcIiA+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPGxpYi10ZXJtLWNhcmRcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgW2RhdGFdPVwieydjaGlsZHJlbic6IHRlcm0sICdzZWxlY3RlZCcgOiBmYWxzZSwgJ2NhdGVnb3J5Jzpjb2x1bW4sIGNhcmRTdWJUeXBlOiAnbWluaW1hbCcsIGlzVmlld09ubHk6dHJ1ZX1cIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L2xpYi10ZXJtLWNhcmQ+XG4gICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgICAgICA8L25nLWNvbnRhaW5lcj5cbiAgICAgICAgICAgICAgICA8L3NlY3Rpb24+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgPC9uZy1jb250YWluZXI+XG4gICAgICAgIDxsaWItYWN0aW9uLWJhciAqbmdJZj1cInNob3dBY3Rpb25cIiBbY29uZmlnVHlwZV09XCJ3b3JrZmxvd0RldGFpbHMuY3VycmVudFN0YXR1c1wiIFthY3Rpb25UeXBlXT1cIidhcHByb3ZlJ1wiIChzZW5kQXBwcm92YWwpPVwiYXBwcm92YWxSZXF1ZXN0KClcIiAoY2xvc2VBY3Rpb24pPVwiY2xvc2VBY3Rpb25CYXIoJGV2ZW50KVwiPjwvbGliLWFjdGlvbi1iYXI+IFxuPC9kaXY+IC0tPlxuPG5nLWNvbnRhaW5lciAqbmdJZj1cImxpc3RJdGVtc1wiPlxuICAgIDxsaWItdGF4b25vbXktdmlldyBcbiAgICAgICAgW2lzQXBwcm92YWxWaWV3XT1cInRydWVcIiBcbiAgICAgICAgW2FwcHJvdmFsTGlzdF09XCJsaXN0SXRlbXNcIiBcbiAgICAgICAgW3dvcmtGbG93U3RhdHVzXT1cIndvcmtmbG93RGV0YWlscz8uY3VycmVudFN0YXR1c1wiXG4gICAgICAgIChzZW50Rm9yQXBwcm92ZSk9XCJhcHByb3ZhbFJlcXVlc3QoJGV2ZW50KVwiPlxuICAgIDwvbGliLXRheG9ub215LXZpZXc+XG48L25nLWNvbnRhaW5lcj5cbiJdfQ==