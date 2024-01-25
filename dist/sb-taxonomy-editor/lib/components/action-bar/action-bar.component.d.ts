import { OnInit, EventEmitter } from '@angular/core';
import { FrameworkService } from '../../services/framework.service';
import * as i0 from "@angular/core";
export declare class ActionBarComponent implements OnInit {
    private frameworkService;
    actionType: any;
    configType: any;
    sendApproval: EventEmitter<any>;
    closeAction: EventEmitter<any>;
    app_strings: any;
    constructor(frameworkService: FrameworkService);
    ngOnInit(): void;
    SendForApproval(): void;
    closeActionBar(): void;
    getApproveLevelText(res: any): string;
    static ɵfac: i0.ɵɵFactoryDeclaration<ActionBarComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<ActionBarComponent, "lib-action-bar", never, { "actionType": "actionType"; "configType": "configType"; }, { "sendApproval": "sendApproval"; "closeAction": "closeAction"; }, never, never, false>;
}
