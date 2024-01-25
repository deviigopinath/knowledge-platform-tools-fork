import { PipeTransform } from '@angular/core';
import { ApprovalService } from '../services/approval.service';
import * as i0 from "@angular/core";
export declare class OrderByPipe implements PipeTransform {
    private approvalService;
    approvalTerms: any[];
    constructor(approvalService: ApprovalService);
    transform(value: any): any;
    static ɵfac: i0.ɵɵFactoryDeclaration<OrderByPipe, never>;
    static ɵpipe: i0.ɵɵPipeDeclaration<OrderByPipe, "orderBy", false>;
}
