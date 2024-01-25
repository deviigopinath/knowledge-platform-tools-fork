import { OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { LocalConnectionService } from '../../services/local-connection.service';
import { FrameworkService } from '../../services/framework.service';
import * as i0 from "@angular/core";
export declare class ConnectorComponent implements OnInit {
    dialogRef: MatDialogRef<ConnectorComponent>;
    data: any;
    private frameWorkService;
    private localScv;
    private fb;
    connectorForm: FormGroup;
    app_strings: any;
    constructor(dialogRef: MatDialogRef<ConnectorComponent>, data: any, frameWorkService: FrameworkService, localScv: LocalConnectionService, fb: FormBuilder);
    ngOnInit(): void;
    initConnectorForm(): void;
    saveConnection(): void;
    clear(): void;
    dialogClose(): void;
    loadDefault(): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<ConnectorComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<ConnectorComponent, "lib-connector", never, {}, {}, never, never, false>;
}
