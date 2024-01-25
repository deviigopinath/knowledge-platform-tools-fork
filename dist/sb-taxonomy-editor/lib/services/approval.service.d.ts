import { FrameworkService } from '../services/framework.service';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';
import * as i0 from "@angular/core";
export declare class ApprovalService {
    private frameworkService;
    private http;
    environment: any;
    approvalListSubject: BehaviorSubject<any>;
    constructor(frameworkService: FrameworkService, http: HttpClient);
    createApproval(req: any): import("rxjs").Observable<Object>;
    getApprovalList(req: any): import("rxjs").Observable<Object>;
    getWorkflowDetails(id: any): import("rxjs").Observable<Object>;
    updateWorkFlowApproval(req: any): import("rxjs").Observable<Object>;
    removeDuplicates(arr: string[]): string[];
    setApprovalList(list: any): void;
    getUpdateList(): import("rxjs").Observable<any>;
    static ɵfac: i0.ɵɵFactoryDeclaration<ApprovalService, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<ApprovalService>;
}
