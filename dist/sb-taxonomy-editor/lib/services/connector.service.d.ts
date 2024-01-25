import { FrameworkService } from './framework.service';
import { LLOptions } from '../constants/app-constant';
import * as i0 from "@angular/core";
export declare class ConnectorService {
    private frameworkService;
    connectorMap: any;
    elmWrapper: any;
    constructor(frameworkService: FrameworkService);
    _drawLine(source: any, target: any, options?: LLOptions, sourceContainerId?: any, targetContainerId?: any): any[];
    private renderLine;
    updateConnectorsMap(map: any): void;
    position(line: any): void;
    removeAllLines(): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<ConnectorService, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<ConnectorService>;
}
