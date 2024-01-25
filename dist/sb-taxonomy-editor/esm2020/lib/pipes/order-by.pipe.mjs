import { Pipe } from '@angular/core';
import * as i0 from "@angular/core";
import * as i1 from "../services/approval.service";
export class OrderByPipe {
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
OrderByPipe.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "14.3.0", ngImport: i0, type: OrderByPipe, deps: [{ token: i1.ApprovalService }], target: i0.ɵɵFactoryTarget.Pipe });
OrderByPipe.ɵpipe = i0.ɵɵngDeclarePipe({ minVersion: "14.0.0", version: "14.3.0", ngImport: i0, type: OrderByPipe, name: "orderBy" });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "14.3.0", ngImport: i0, type: OrderByPipe, decorators: [{
            type: Pipe,
            args: [{
                    name: 'orderBy'
                }]
        }], ctorParameters: function () { return [{ type: i1.ApprovalService }]; } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoib3JkZXItYnkucGlwZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL3Byb2plY3RzL3NiLXRheG9ub215LWVkaXRvci9zcmMvbGliL3BpcGVzL29yZGVyLWJ5LnBpcGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLElBQUksRUFBaUIsTUFBTSxlQUFlLENBQUM7OztBQU1wRCxNQUFNLE9BQU8sV0FBVztJQUV0QixZQUFvQixlQUFnQztRQUFoQyxvQkFBZSxHQUFmLGVBQWUsQ0FBaUI7UUFEcEQsa0JBQWEsR0FBRyxFQUFFLENBQUM7SUFDbUMsQ0FBQztJQUV2RCxTQUFTLENBQUMsS0FBSztRQUNiLGVBQWU7UUFDZixJQUFHLEtBQUssRUFBRTtZQUNSLE9BQU8sS0FBSyxDQUFDLEtBQUssRUFBRSxDQUFDLE9BQU8sRUFBRSxDQUFDO1NBQ2hDO2FBQU07WUFDTCxPQUFPLElBQUksQ0FBQTtTQUNaO0lBRUgsQ0FBQzs7d0dBWlUsV0FBVztzR0FBWCxXQUFXOzJGQUFYLFdBQVc7a0JBSHZCLElBQUk7bUJBQUM7b0JBQ0osSUFBSSxFQUFFLFNBQVM7aUJBQ2hCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgUGlwZSwgUGlwZVRyYW5zZm9ybSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgQXBwcm92YWxTZXJ2aWNlIH0gZnJvbSAnLi4vc2VydmljZXMvYXBwcm92YWwuc2VydmljZSc7XG5cbkBQaXBlKHtcbiAgbmFtZTogJ29yZGVyQnknXG59KVxuZXhwb3J0IGNsYXNzIE9yZGVyQnlQaXBlIGltcGxlbWVudHMgUGlwZVRyYW5zZm9ybSB7XG4gIGFwcHJvdmFsVGVybXMgPSBbXTtcbiAgY29uc3RydWN0b3IocHJpdmF0ZSBhcHByb3ZhbFNlcnZpY2U6IEFwcHJvdmFsU2VydmljZSl7fVxuXG4gIHRyYW5zZm9ybSh2YWx1ZSk6IGFueXtcbiAgICAvLyByZXR1cm4gbnVsbDtcbiAgICBpZih2YWx1ZSkge1xuICAgICAgcmV0dXJuIHZhbHVlLnNsaWNlKCkucmV2ZXJzZSgpO1xuICAgIH0gZWxzZSB7XG4gICAgICByZXR1cm4gbnVsbFxuICAgIH1cbiAgICAgXG4gIH1cblxufVxuIl19