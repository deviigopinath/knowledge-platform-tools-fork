import { IConnectionType } from '../models/connection-type.model';
import * as i0 from "@angular/core";
export declare class LocalConnectionService {
    private _vars;
    constructor();
    get apiUrl(): string;
    get token(): string;
    get frameworkName(): string;
    get connectionType(): "online" | "offline";
    set localStorage(val: IConnectionType);
    get localStorage(): IConnectionType;
    updateLocalStorage(val: IConnectionType): void;
    clearLocalStorage(): void;
    getConfigInfo(): import("../models/connection.model").IConnection;
    static ɵfac: i0.ɵɵFactoryDeclaration<LocalConnectionService, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<LocalConnectionService>;
}
