import { OnInit } from '@angular/core';
import { ApprovalService } from '../../services/approval.service';
import { FrameworkService } from '../../services/framework.service';
import * as i0 from "@angular/core";
export declare class PendingApprovalComponent implements OnInit {
    private approvalService;
    private frameworkService;
    pendingList: any[];
    approvalList: any[];
    categories: any[];
    app_strings: any;
    constructor(approvalService: ApprovalService, frameworkService: FrameworkService);
    ngOnInit(): void;
    getApprovalList(): void;
    removeDuplicates(arr: any): unknown[];
    createApprovalList(updateFieldValues: any): any[];
    getTerms(terms: any): any;
    static ɵfac: i0.ɵɵFactoryDeclaration<PendingApprovalComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<PendingApprovalComponent, "lib-pending-approval", never, {}, {}, never, never, false>;
}
