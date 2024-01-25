import { Injectable } from '@angular/core';
import * as i0 from "@angular/core";
import * as i1 from "./framework.service";
export class TokenInterceptorService {
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
TokenInterceptorService.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "14.3.0", ngImport: i0, type: TokenInterceptorService, deps: [{ token: i1.FrameworkService }], target: i0.ɵɵFactoryTarget.Injectable });
TokenInterceptorService.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "14.3.0", ngImport: i0, type: TokenInterceptorService, providedIn: 'root' });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "14.3.0", ngImport: i0, type: TokenInterceptorService, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root'
                }]
        }], ctorParameters: function () { return [{ type: i1.FrameworkService }]; } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidG9rZW4taW50ZXJjZXB0b3Iuc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL3Byb2plY3RzL3NiLXRheG9ub215LWVkaXRvci9zcmMvbGliL3NlcnZpY2VzL3Rva2VuLWludGVyY2VwdG9yLnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQ0EsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLGVBQWUsQ0FBQzs7O0FBTzNDLE1BQU0sT0FBTyx1QkFBdUI7SUFFbEMsWUFBb0IsZUFBaUM7UUFBakMsb0JBQWUsR0FBZixlQUFlLENBQWtCO0lBQUksQ0FBQztJQUUxRCxTQUFTLENBQUMsR0FBcUIsRUFBRSxJQUFpQjtRQUNoRCxNQUFNLEdBQUcsR0FBRyxJQUFJLENBQUMsZUFBZSxDQUFDLGFBQWEsRUFBRSxDQUFBO1FBQ2hELE1BQU0sT0FBTyxHQUFHLEdBQUcsQ0FBQyxLQUFLLENBQUM7WUFDeEIsVUFBVSxFQUFFO2dCQUNWLGFBQWEsRUFBRSxHQUFHLENBQUMsU0FBUztnQkFDNUIsMkJBQTJCO2dCQUMzQiwwQkFBMEI7YUFDM0I7U0FDRixDQUFDLENBQUM7UUFDSCxPQUFPLElBQUksQ0FBQyxNQUFNLENBQUMsT0FBTyxDQUFDLENBQUE7SUFDN0IsQ0FBQzs7b0hBZFUsdUJBQXVCO3dIQUF2Qix1QkFBdUIsY0FGdEIsTUFBTTsyRkFFUCx1QkFBdUI7a0JBSG5DLFVBQVU7bUJBQUM7b0JBQ1YsVUFBVSxFQUFFLE1BQU07aUJBQ25CIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgSHR0cEV2ZW50LCBIdHRwSGFuZGxlciwgSHR0cFJlcXVlc3QgfSBmcm9tICdAYW5ndWxhci9jb21tb24vaHR0cCc7XG5pbXBvcnQgeyBJbmplY3RhYmxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBPYnNlcnZhYmxlIH0gZnJvbSAncnhqcy9pbnRlcm5hbC9PYnNlcnZhYmxlJztcbmltcG9ydCB7IEZyYW1ld29ya1NlcnZpY2UgfSBmcm9tICcuL2ZyYW1ld29yay5zZXJ2aWNlJztcblxuQEluamVjdGFibGUoe1xuICBwcm92aWRlZEluOiAncm9vdCdcbn0pXG5leHBvcnQgY2xhc3MgVG9rZW5JbnRlcmNlcHRvclNlcnZpY2Uge1xuXG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgZnJhbWVXb3JrU2VydmllOiBGcmFtZXdvcmtTZXJ2aWNlKSB7IH1cblxuICBpbnRlcmNlcHQocmVxOiBIdHRwUmVxdWVzdDxhbnk+LCBuZXh0OiBIdHRwSGFuZGxlcik6ICAgT2JzZXJ2YWJsZTxIdHRwRXZlbnQ8YW55Pj4ge1xuICAgIGNvbnN0IGVudiA9IHRoaXMuZnJhbWVXb3JrU2VydmllLmdldEVudmlyb21lbnQoKVxuICAgIGNvbnN0IHJlcXVlc3QgPSByZXEuY2xvbmUoeyAgXG4gICAgICBzZXRIZWFkZXJzOiB7ICBcbiAgICAgICAgQXV0aG9yaXphdGlvbjogZW52LmF1dGhUb2tlbiwgIFxuICAgICAgICAvLyBjaGFubmVsSWQ6IGVudi5jaGFubmVsSWRcbiAgICAgICAgLy8gdXNlclRva2VuOmVudi51c2VyVG9rZW5cbiAgICAgIH0gIFxuICAgIH0pOyBcbiAgICByZXR1cm4gbmV4dC5oYW5kbGUocmVxdWVzdClcbiAgfVxufVxuICAiXX0=