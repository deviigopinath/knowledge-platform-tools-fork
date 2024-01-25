import { OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { ApprovalService } from '../../services/approval.service';
import { FrameworkService } from '../../services/framework.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import * as i0 from "@angular/core";
export declare class ApproveViewComponent implements OnInit {
    private activatedRoute;
    private approvalService;
    private frameworkService;
    private _snackBar;
    list$: Observable<object>;
    workflowDetails: any;
    listItems: any;
    categories: string[];
    showAction: boolean;
    lineRef: any[];
    constructor(activatedRoute: ActivatedRoute, approvalService: ApprovalService, frameworkService: FrameworkService, _snackBar: MatSnackBar);
    ngOnInit(): void;
    getworkFlowDetails(id: any): void;
    approvalRequest(approvalTerms: any): void;
    closeActionBar(e: any): void;
    ngOnDestroy(): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<ApproveViewComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<ApproveViewComponent, "lib-approve-view", never, {}, {}, never, never, false>;
}
