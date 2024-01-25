import { OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { FrameworkService } from '../../services/framework.service';
import * as i0 from "@angular/core";
export declare class ConfirmDialogBoxComponent implements OnInit {
    dialogRef: MatDialogRef<ConfirmDialogBoxComponent>;
    data: any;
    private frameworkService;
    constructor(dialogRef: MatDialogRef<ConfirmDialogBoxComponent>, data: any, frameworkService: FrameworkService);
    ngOnInit(): void;
    removeAssociation(): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<ConfirmDialogBoxComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<ConfirmDialogBoxComponent, "confirm-dialog-box", never, {}, {}, never, never, false>;
}
