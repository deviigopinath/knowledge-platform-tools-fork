import { Injectable } from '@angular/core';
import * as API from '../constants/app-constant';
import { BehaviorSubject, } from 'rxjs';
import * as i0 from "@angular/core";
import * as i1 from "../services/framework.service";
import * as i2 from "@angular/common/http";
export class ApprovalService {
    constructor(frameworkService, http) {
        this.frameworkService = frameworkService;
        this.http = http;
        this.approvalListSubject = new BehaviorSubject([]);
        this.environment = this.frameworkService.getEnviroment();
    }
    createApproval(req) {
        req.state = API.APPROVAL.INITIATE;
        req.action = API.APPROVAL.ACTION;
        req.serviceName = API.APPROVAL.SERVICE_NAME;
        return this.http.post(`${API.APPROVAL.CREATE}`, req);
    }
    getApprovalList(req) {
        return this.http.post(`${API.APPROVAL.SEARCH}`, req);
    }
    getWorkflowDetails(id) {
        return this.http.get(`${API.APPROVAL.READ}/${id}`);
    }
    updateWorkFlowApproval(req) {
        return this.http.patch(`${API.APPROVAL.UPDATE}`, req);
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
ApprovalService.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "14.3.0", ngImport: i0, type: ApprovalService, deps: [{ token: i1.FrameworkService }, { token: i2.HttpClient }], target: i0.ɵɵFactoryTarget.Injectable });
ApprovalService.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "14.3.0", ngImport: i0, type: ApprovalService, providedIn: 'root' });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "14.3.0", ngImport: i0, type: ApprovalService, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root'
                }]
        }], ctorParameters: function () { return [{ type: i1.FrameworkService }, { type: i2.HttpClient }]; } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXBwcm92YWwuc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL3Byb2plY3RzL3NiLXRheG9ub215LWVkaXRvci9zcmMvbGliL3NlcnZpY2VzL2FwcHJvdmFsLnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUUzQyxPQUFPLEtBQUssR0FBRyxNQUFNLDJCQUEyQixDQUFBO0FBRWhELE9BQU8sRUFBRSxlQUFlLEdBQUcsTUFBTSxNQUFNLENBQUM7Ozs7QUFLeEMsTUFBTSxPQUFPLGVBQWU7SUFJMUIsWUFBb0IsZ0JBQWtDLEVBQVUsSUFBZ0I7UUFBNUQscUJBQWdCLEdBQWhCLGdCQUFnQixDQUFrQjtRQUFVLFNBQUksR0FBSixJQUFJLENBQVk7UUFGaEYsd0JBQW1CLEdBQXlCLElBQUksZUFBZSxDQUFDLEVBQUUsQ0FBQyxDQUFDO1FBR2xFLElBQUksQ0FBQyxXQUFXLEdBQUcsSUFBSSxDQUFDLGdCQUFnQixDQUFDLGFBQWEsRUFBRSxDQUFBO0lBQzFELENBQUM7SUFFRCxjQUFjLENBQUMsR0FBRztRQUNoQixHQUFHLENBQUMsS0FBSyxHQUFHLEdBQUcsQ0FBQyxRQUFRLENBQUMsUUFBUSxDQUFBO1FBQ2pDLEdBQUcsQ0FBQyxNQUFNLEdBQUcsR0FBRyxDQUFDLFFBQVEsQ0FBQyxNQUFNLENBQUE7UUFDaEMsR0FBRyxDQUFDLFdBQVcsR0FBRyxHQUFHLENBQUMsUUFBUSxDQUFDLFlBQVksQ0FBQTtRQUMzQyxPQUFPLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLEdBQUcsR0FBRyxDQUFDLFFBQVEsQ0FBQyxNQUFNLEVBQUUsRUFBQyxHQUFHLENBQUMsQ0FBQTtJQUNyRCxDQUFDO0lBRUQsZUFBZSxDQUFDLEdBQUc7UUFDakIsT0FBTyxJQUFJLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxHQUFHLEdBQUcsQ0FBQyxRQUFRLENBQUMsTUFBTSxFQUFFLEVBQUMsR0FBRyxDQUFDLENBQUE7SUFDckQsQ0FBQztJQUVELGtCQUFrQixDQUFDLEVBQUU7UUFDbkIsT0FBTyxJQUFJLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxHQUFHLEdBQUcsQ0FBQyxRQUFRLENBQUMsSUFBSSxJQUFJLEVBQUUsRUFBRSxDQUFDLENBQUE7SUFDcEQsQ0FBQztJQUVELHNCQUFzQixDQUFDLEdBQUc7UUFDeEIsT0FBTyxJQUFJLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxHQUFHLEdBQUcsQ0FBQyxRQUFRLENBQUMsTUFBTSxFQUFFLEVBQUUsR0FBRyxDQUFDLENBQUE7SUFDdkQsQ0FBQztJQUVELGdCQUFnQixDQUFDLEdBQVk7UUFDM0IsT0FBTyxDQUFDLEdBQUcsSUFBSSxHQUFHLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQztJQUMzQixDQUFDO0lBRUQsZUFBZSxDQUFDLElBQUk7UUFDbEIsSUFBSSxDQUFDLG1CQUFtQixDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQTtJQUNyQyxDQUFDO0lBQ0QsYUFBYTtRQUNYLE9BQU8sSUFBSSxDQUFDLG1CQUFtQixDQUFDLFlBQVksRUFBRSxDQUFBO0lBQ2hELENBQUM7OzRHQXBDVSxlQUFlO2dIQUFmLGVBQWUsY0FGZCxNQUFNOzJGQUVQLGVBQWU7a0JBSDNCLFVBQVU7bUJBQUM7b0JBQ1YsVUFBVSxFQUFFLE1BQU07aUJBQ25CIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgSW5qZWN0YWJsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgRnJhbWV3b3JrU2VydmljZSB9IGZyb20gJy4uL3NlcnZpY2VzL2ZyYW1ld29yay5zZXJ2aWNlJ1xuaW1wb3J0ICogYXMgQVBJIGZyb20gJy4uL2NvbnN0YW50cy9hcHAtY29uc3RhbnQnXG5pbXBvcnQgeyBIdHRwQ2xpZW50IH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uL2h0dHAnO1xuaW1wb3J0IHsgQmVoYXZpb3JTdWJqZWN0LCB9IGZyb20gJ3J4anMnO1xuXG5ASW5qZWN0YWJsZSh7XG4gIHByb3ZpZGVkSW46ICdyb290J1xufSlcbmV4cG9ydCBjbGFzcyBBcHByb3ZhbFNlcnZpY2Uge1xuICBlbnZpcm9ubWVudFxuICBhcHByb3ZhbExpc3RTdWJqZWN0OiBCZWhhdmlvclN1YmplY3Q8YW55PiA9IG5ldyBCZWhhdmlvclN1YmplY3QoW10pO1xuXG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgZnJhbWV3b3JrU2VydmljZTogRnJhbWV3b3JrU2VydmljZSwgcHJpdmF0ZSBodHRwOiBIdHRwQ2xpZW50KSB7IFxuICAgIHRoaXMuZW52aXJvbm1lbnQgPSB0aGlzLmZyYW1ld29ya1NlcnZpY2UuZ2V0RW52aXJvbWVudCgpXG4gIH1cblxuICBjcmVhdGVBcHByb3ZhbChyZXEpe1xuICAgIHJlcS5zdGF0ZSA9IEFQSS5BUFBST1ZBTC5JTklUSUFURVxuICAgIHJlcS5hY3Rpb24gPSBBUEkuQVBQUk9WQUwuQUNUSU9OXG4gICAgcmVxLnNlcnZpY2VOYW1lID0gQVBJLkFQUFJPVkFMLlNFUlZJQ0VfTkFNRVxuICAgIHJldHVybiB0aGlzLmh0dHAucG9zdChgJHtBUEkuQVBQUk9WQUwuQ1JFQVRFfWAscmVxKVxuICB9XG5cbiAgZ2V0QXBwcm92YWxMaXN0KHJlcSl7XG4gICAgcmV0dXJuIHRoaXMuaHR0cC5wb3N0KGAke0FQSS5BUFBST1ZBTC5TRUFSQ0h9YCxyZXEpXG4gIH1cblxuICBnZXRXb3JrZmxvd0RldGFpbHMoaWQpIHtcbiAgICByZXR1cm4gdGhpcy5odHRwLmdldChgJHtBUEkuQVBQUk9WQUwuUkVBRH0vJHtpZH1gKVxuICB9XG5cbiAgdXBkYXRlV29ya0Zsb3dBcHByb3ZhbChyZXEpe1xuICAgIHJldHVybiB0aGlzLmh0dHAucGF0Y2goYCR7QVBJLkFQUFJPVkFMLlVQREFURX1gLCByZXEpXG4gIH1cblxuICByZW1vdmVEdXBsaWNhdGVzKGFycjpzdHJpbmdbXSk6c3RyaW5nW10ge1xuICAgIHJldHVybiBbLi4ubmV3IFNldChhcnIpXTtcbiAgfVxuXG4gIHNldEFwcHJvdmFsTGlzdChsaXN0KXtcbiAgICB0aGlzLmFwcHJvdmFsTGlzdFN1YmplY3QubmV4dChsaXN0KVxuICB9XG4gIGdldFVwZGF0ZUxpc3QoKXtcbiAgICByZXR1cm4gdGhpcy5hcHByb3ZhbExpc3RTdWJqZWN0LmFzT2JzZXJ2YWJsZSgpXG4gIH1cbn1cbiJdfQ==