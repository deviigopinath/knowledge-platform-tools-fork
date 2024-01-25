import { HttpEvent, HttpHandler, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs/internal/Observable';
import { FrameworkService } from './framework.service';
import * as i0 from "@angular/core";
export declare class TokenInterceptorService {
    private frameWorkServie;
    constructor(frameWorkServie: FrameworkService);
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>>;
    static ɵfac: i0.ɵɵFactoryDeclaration<TokenInterceptorService, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<TokenInterceptorService>;
}
