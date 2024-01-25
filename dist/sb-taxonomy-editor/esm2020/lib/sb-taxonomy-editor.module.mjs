import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { SbTaxonomyEditorComponent } from './sb-taxonomy-editor.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { SbTaxonomyEditorRoutingModule } from './sb-taxonomy-editor-routing.module';
import { MatFormFieldModule, MAT_FORM_FIELD_DEFAULT_OPTIONS } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatDialogModule } from '@angular/material/dialog';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatTabsModule, MAT_TABS_CONFIG } from '@angular/material/tabs';
import { MatSnackBarModule, MAT_SNACK_BAR_DEFAULT_OPTIONS } from '@angular/material/snack-bar';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatTableModule } from '@angular/material/table';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatMenuModule } from '@angular/material/menu';
import { DashboardComponent } from './containers/dashboard/dashboard.component';
import { FrameworkService } from './services/framework.service';
import { CreateCategoriesComponent } from './components/create-categories/create-categories.component';
import { ConfigFrameworkComponent } from './containers/config-framework/config-framework.component';
import { TaxonomyViewComponent } from './components/taxonomy-view/taxonomy-view.component';
import { TermCardComponent } from './components/term-card/term-card.component';
import { CommonModule } from '@angular/common';
import { CategoriesPreviewComponent } from './components/categories-preview/categories-preview.component';
import { ConnectorService } from './services/connector.service';
import { CreateTermComponent } from './components/create-term/create-term.component';
import { TaxonomyColumnViewComponent } from './components/taxonomy-column-view/taxonomy-column-view.component';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { TokenInterceptorService } from './services/token-interceptor.service';
import { ConnectorComponent } from './components/connector/connector.component';
import { LocalConnectionService } from './services/local-connection.service';
// export const LIB_OPTIONS = new InjectionToken<IConnection>('env')
import { ActionBarComponent } from './components/action-bar/action-bar.component';
import { ApprovalComponent } from './components/approval/approval.component';
import { PendingApprovalComponent } from './components/pending-approval/pending-approval.component';
import { ApproveViewComponent } from './components/approve-view/approve-view.component';
import { OrderByPipe } from './pipes/order-by.pipe';
import { DatePipe } from './pipes/date.pipe';
import { LandingPageComponent } from './containers/landing-page/landing-page.component';
import { ConfirmDialogBoxComponent } from './components/confirm-dialog-box/confirm-dialog-box.component';
import * as i0 from "@angular/core";
export class SbTaxonomyEditorModule {
    static forChild(config) {
        return {
            ngModule: SbTaxonomyEditorModule,
            providers: [
            // LocalConnectionService,
            // {
            //   provide: ENVIRONMENT,
            //   useValue: config
            // }
            ]
        };
    }
}
SbTaxonomyEditorModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "14.3.0", ngImport: i0, type: SbTaxonomyEditorModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
SbTaxonomyEditorModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "14.3.0", ngImport: i0, type: SbTaxonomyEditorModule, declarations: [SbTaxonomyEditorComponent,
        DashboardComponent,
        ConfigFrameworkComponent,
        CreateCategoriesComponent,
        ConfigFrameworkComponent,
        TaxonomyViewComponent,
        LandingPageComponent,
        TermCardComponent,
        TaxonomyColumnViewComponent,
        CategoriesPreviewComponent,
        CategoriesPreviewComponent,
        CreateTermComponent,
        ConnectorComponent,
        ActionBarComponent,
        ApprovalComponent,
        PendingApprovalComponent,
        ApproveViewComponent,
        OrderByPipe,
        DatePipe,
        ConfirmDialogBoxComponent], imports: [CommonModule,
        SbTaxonomyEditorRoutingModule,
        ReactiveFormsModule,
        FormsModule,
        MatFormFieldModule,
        MatButtonModule,
        MatInputModule,
        MatIconModule,
        MatCardModule,
        MatDialogModule,
        DragDropModule,
        MatAutocompleteModule,
        MatSelectModule,
        HttpClientModule,
        MatTabsModule,
        MatSnackBarModule,
        MatTooltipModule,
        MatCheckboxModule,
        MatTableModule,
        MatProgressSpinnerModule,
        MatMenuModule], exports: [SbTaxonomyEditorComponent,
        CreateCategoriesComponent,
        ConfigFrameworkComponent,
        TaxonomyViewComponent,
        TermCardComponent,
        CategoriesPreviewComponent,
        ConfigFrameworkComponent] });
SbTaxonomyEditorModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "14.3.0", ngImport: i0, type: SbTaxonomyEditorModule, providers: [
        { provide: MAT_FORM_FIELD_DEFAULT_OPTIONS, useValue: { appearance: 'outline' } },
        { provide: HTTP_INTERCEPTORS, useClass: TokenInterceptorService, multi: true },
        { provide: MAT_SNACK_BAR_DEFAULT_OPTIONS, useValue: { duration: 2000 } },
        { provide: MAT_TABS_CONFIG, useValue: { animationDuration: '0ms' } },
        FrameworkService,
        ConnectorService,
        LocalConnectionService,
    ], imports: [CommonModule,
        SbTaxonomyEditorRoutingModule,
        ReactiveFormsModule,
        FormsModule,
        MatFormFieldModule,
        MatButtonModule,
        MatInputModule,
        MatIconModule,
        MatCardModule,
        MatDialogModule,
        DragDropModule,
        MatAutocompleteModule,
        MatSelectModule,
        HttpClientModule,
        MatTabsModule,
        MatSnackBarModule,
        MatTooltipModule,
        MatCheckboxModule,
        MatTableModule,
        MatProgressSpinnerModule,
        MatMenuModule] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "14.3.0", ngImport: i0, type: SbTaxonomyEditorModule, decorators: [{
            type: NgModule,
            args: [{
                    declarations: [
                        SbTaxonomyEditorComponent,
                        DashboardComponent,
                        ConfigFrameworkComponent,
                        CreateCategoriesComponent,
                        ConfigFrameworkComponent,
                        TaxonomyViewComponent,
                        LandingPageComponent,
                        TermCardComponent,
                        TaxonomyColumnViewComponent,
                        CategoriesPreviewComponent,
                        CategoriesPreviewComponent,
                        CreateTermComponent,
                        ConnectorComponent,
                        ActionBarComponent,
                        ApprovalComponent,
                        PendingApprovalComponent,
                        ApproveViewComponent,
                        OrderByPipe,
                        DatePipe,
                        ConfirmDialogBoxComponent
                    ],
                    imports: [
                        CommonModule,
                        SbTaxonomyEditorRoutingModule,
                        ReactiveFormsModule,
                        FormsModule,
                        MatFormFieldModule,
                        MatButtonModule,
                        MatInputModule,
                        MatIconModule,
                        MatCardModule,
                        MatDialogModule,
                        DragDropModule,
                        MatAutocompleteModule,
                        MatSelectModule,
                        HttpClientModule,
                        MatTabsModule,
                        MatSnackBarModule,
                        MatTooltipModule,
                        MatCheckboxModule,
                        MatTableModule,
                        MatProgressSpinnerModule,
                        MatMenuModule
                    ],
                    providers: [
                        { provide: MAT_FORM_FIELD_DEFAULT_OPTIONS, useValue: { appearance: 'outline' } },
                        { provide: HTTP_INTERCEPTORS, useClass: TokenInterceptorService, multi: true },
                        { provide: MAT_SNACK_BAR_DEFAULT_OPTIONS, useValue: { duration: 2000 } },
                        { provide: MAT_TABS_CONFIG, useValue: { animationDuration: '0ms' } },
                        FrameworkService,
                        ConnectorService,
                        LocalConnectionService,
                    ],
                    exports: [
                        SbTaxonomyEditorComponent,
                        CreateCategoriesComponent,
                        ConfigFrameworkComponent,
                        TaxonomyViewComponent,
                        TermCardComponent,
                        CategoriesPreviewComponent,
                        ConfigFrameworkComponent
                    ],
                    entryComponents: [
                        CreateTermComponent,
                        ConnectorComponent,
                    ],
                    schemas: [CUSTOM_ELEMENTS_SCHEMA]
                }]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2ItdGF4b25vbXktZWRpdG9yLm1vZHVsZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3Byb2plY3RzL3NiLXRheG9ub215LWVkaXRvci9zcmMvbGliL3NiLXRheG9ub215LWVkaXRvci5tb2R1bGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLFFBQVEsRUFBc0Isc0JBQXNCLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDckYsT0FBTyxFQUFFLHlCQUF5QixFQUFFLE1BQU0sZ0NBQWdDLENBQUM7QUFDM0UsT0FBTyxFQUFFLG1CQUFtQixFQUFFLFdBQVcsRUFBRSxNQUFNLGdCQUFnQixDQUFBO0FBQ2pFLE9BQU8sRUFBRSw2QkFBNkIsRUFBRSxNQUFNLHFDQUFxQyxDQUFBO0FBR25GLE9BQU8sRUFBRSxrQkFBa0IsRUFBRSw4QkFBOEIsRUFBRSxNQUFNLDhCQUE4QixDQUFBO0FBQ2pHLE9BQU8sRUFBRSxlQUFlLEVBQUUsTUFBTSwwQkFBMEIsQ0FBQztBQUMzRCxPQUFPLEVBQWEsZUFBZSxFQUFFLE1BQU0sMEJBQTBCLENBQUM7QUFDdEUsT0FBTyxFQUFFLGNBQWMsRUFBRSxNQUFNLHlCQUF5QixDQUFBO0FBQ3hELE9BQU8sRUFBRSxhQUFhLEVBQUUsTUFBTSx3QkFBd0IsQ0FBQTtBQUN0RCxPQUFPLEVBQUUsYUFBYSxFQUFFLE1BQU0sd0JBQXdCLENBQUM7QUFDdkQsT0FBTyxFQUFFLGVBQWUsRUFBRSxNQUFNLDBCQUEwQixDQUFBO0FBQzFELE9BQU8sRUFBRSxjQUFjLEVBQUUsTUFBTSx3QkFBd0IsQ0FBQztBQUN4RCxPQUFPLEVBQUUscUJBQXFCLEVBQUUsTUFBTSxnQ0FBZ0MsQ0FBQztBQUN2RSxPQUFPLEVBQUUsYUFBYSxFQUFFLGVBQWUsRUFBRSxNQUFNLHdCQUF3QixDQUFDO0FBQ3hFLE9BQU8sRUFBRSxpQkFBaUIsRUFBRSw2QkFBNkIsRUFBRSxNQUFNLDZCQUE2QixDQUFDO0FBQy9GLE9B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O3dCQUNoQixnQkFBZ0I7d0JBQ2hCLHNCQUFzQjtxQkFDdkI7b0JBQ0QsT0FBTyxFQUFFO3dCQUNQLHlCQUF5Qjt3QkFDekIseUJBQXlCO3dCQUN6Qix3QkFBd0I7d0JBQ3hCLHFCQUFxQjt3QkFDckIsaUJBQWlCO3dCQUNqQiwwQkFBMEI7d0JBQzFCLHdCQUF3QjtxQkFDekI7b0JBQ0QsZUFBZSxFQUFFO3dCQUNmLG1CQUFtQjt3QkFDbkIsa0JBQWtCO3FCQUNuQjtvQkFDRCxPQUFPLEVBQUUsQ0FBRSxzQkFBc0IsQ0FBRTtpQkFDcEMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBOZ01vZHVsZSwgTW9kdWxlV2l0aFByb3ZpZGVycyxDVVNUT01fRUxFTUVOVFNfU0NIRU1BIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBTYlRheG9ub215RWRpdG9yQ29tcG9uZW50IH0gZnJvbSAnLi9zYi10YXhvbm9teS1lZGl0b3IuY29tcG9uZW50JztcbmltcG9ydCB7IFJlYWN0aXZlRm9ybXNNb2R1bGUsIEZvcm1zTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvZm9ybXMnXG5pbXBvcnQgeyBTYlRheG9ub215RWRpdG9yUm91dGluZ01vZHVsZSB9IGZyb20gJy4vc2ItdGF4b25vbXktZWRpdG9yLXJvdXRpbmcubW9kdWxlJ1xuaW1wb3J0IHsgQnJvd3NlckFuaW1hdGlvbnNNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9wbGF0Zm9ybS1icm93c2VyL2FuaW1hdGlvbnMnO1xuXG5pbXBvcnQgeyBNYXRGb3JtRmllbGRNb2R1bGUsIE1BVF9GT1JNX0ZJRUxEX0RFRkFVTFRfT1BUSU9OUyB9IGZyb20gJ0Bhbmd1bGFyL21hdGVyaWFsL2Zvcm0tZmllbGQnXG5pbXBvcnQgeyBNYXRCdXR0b25Nb2R1bGUgfSBmcm9tICdAYW5ndWxhci9tYXRlcmlhbC9idXR0b24nO1xuaW1wb3J0IHsgTWF0U2VsZWN0LCBNYXRTZWxlY3RNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9tYXRlcmlhbC9zZWxlY3QnO1xuaW1wb3J0IHsgTWF0SW5wdXRNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9tYXRlcmlhbC9pbnB1dCdcbmltcG9ydCB7IE1hdEljb25Nb2R1bGUgfSBmcm9tICdAYW5ndWxhci9tYXRlcmlhbC9pY29uJ1xuaW1wb3J0IHsgTWF0Q2FyZE1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL21hdGVyaWFsL2NhcmQnO1xuaW1wb3J0IHsgTWF0RGlhbG9nTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvbWF0ZXJpYWwvZGlhbG9nJ1xuaW1wb3J0IHsgRHJhZ0Ryb3BNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jZGsvZHJhZy1kcm9wJztcbmltcG9ydCB7IE1hdEF1dG9jb21wbGV0ZU1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL21hdGVyaWFsL2F1dG9jb21wbGV0ZSc7XG5pbXBvcnQgeyBNYXRUYWJzTW9kdWxlLCBNQVRfVEFCU19DT05GSUcgfSBmcm9tICdAYW5ndWxhci9tYXRlcmlhbC90YWJzJztcbmltcG9ydCB7IE1hdFNuYWNrQmFyTW9kdWxlLCBNQVRfU05BQ0tfQkFSX0RFRkFVTFRfT1BUSU9OUyB9IGZyb20gJ0Bhbmd1bGFyL21hdGVyaWFsL3NuYWNrLWJhcic7XG5pbXBvcnQgeyBNYXRUb29sdGlwTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvbWF0ZXJpYWwvdG9vbHRpcCc7XG5pbXBvcnQgeyBNYXRDaGVja2JveE1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL21hdGVyaWFsL2NoZWNrYm94JztcbmltcG9ydCB7IE1hdFRhYmxlTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvbWF0ZXJpYWwvdGFibGUnO1xuaW1wb3J0IHsgTWF0UHJvZ3Jlc3NTcGlubmVyTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvbWF0ZXJpYWwvcHJvZ3Jlc3Mtc3Bpbm5lcic7XG5pbXBvcnQgeyBNYXRNZW51TW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvbWF0ZXJpYWwvbWVudSc7XG5cbmltcG9ydCB7IERhc2hib2FyZENvbXBvbmVudCB9IGZyb20gJy4vY29udGFpbmVycy9kYXNoYm9hcmQvZGFzaGJvYXJkLmNvbXBvbmVudCc7XG5pbXBvcnQgeyBGcmFtZXdvcmtTZXJ2aWNlIH0gZnJvbSAnLi9zZXJ2aWNlcy9mcmFtZXdvcmsuc2VydmljZSc7XG5pbXBvcnQgeyBDcmVhdGVDYXRlZ29yaWVzQ29tcG9uZW50IH0gZnJvbSAnLi9jb21wb25lbnRzL2NyZWF0ZS1jYXRlZ29yaWVzL2NyZWF0ZS1jYXRlZ29yaWVzLmNvbXBvbmVudCdcbmltcG9ydCB7IENvbmZpZ0ZyYW1ld29ya0NvbXBvbmVudCB9IGZyb20gJy4vY29udGFpbmVycy9jb25maWctZnJhbWV3b3JrL2NvbmZpZy1mcmFtZXdvcmsuY29tcG9uZW50J1xuaW1wb3J0IHsgVGF4b25vbXlWaWV3Q29tcG9uZW50IH0gZnJvbSAnLi9jb21wb25lbnRzL3RheG9ub215LXZpZXcvdGF4b25vbXktdmlldy5jb21wb25lbnQnXG5pbXBvcnQgeyBUZXJtQ2FyZENvbXBvbmVudCB9IGZyb20gJy4vY29tcG9uZW50cy90ZXJtLWNhcmQvdGVybS1jYXJkLmNvbXBvbmVudCdcbmltcG9ydCB7IENvbW1vbk1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XG5pbXBvcnQgeyBDYXRlZ29yaWVzUHJldmlld0NvbXBvbmVudCB9IGZyb20gJy4vY29tcG9uZW50cy9jYXRlZ29yaWVzLXByZXZpZXcvY2F0ZWdvcmllcy1wcmV2aWV3LmNvbXBvbmVudCdcbmltcG9ydCB7IENvbm5lY3RvclNlcnZpY2UgfSBmcm9tICcuL3NlcnZpY2VzL2Nvbm5lY3Rvci5zZXJ2aWNlJ1xuaW1wb3J0IHsgQ3JlYXRlVGVybUNvbXBvbmVudCB9IGZyb20gJy4vY29tcG9uZW50cy9jcmVhdGUtdGVybS9jcmVhdGUtdGVybS5jb21wb25lbnQnO1xuaW1wb3J0IHsgVGF4b25vbXlDb2x1bW5WaWV3Q29tcG9uZW50IH0gZnJvbSAnLi9jb21wb25lbnRzL3RheG9ub215LWNvbHVtbi12aWV3L3RheG9ub215LWNvbHVtbi12aWV3LmNvbXBvbmVudCdcbmltcG9ydCB7IEhUVFBfSU5URVJDRVBUT1JTLCBIdHRwQ2xpZW50TW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uL2h0dHAnXG5pbXBvcnQgeyBUb2tlbkludGVyY2VwdG9yU2VydmljZSB9IGZyb20gJy4vc2VydmljZXMvdG9rZW4taW50ZXJjZXB0b3Iuc2VydmljZSdcbmltcG9ydCB7IENvbm5lY3RvckNvbXBvbmVudCB9IGZyb20gJy4vY29tcG9uZW50cy9jb25uZWN0b3IvY29ubmVjdG9yLmNvbXBvbmVudCdcbmltcG9ydCB7IElDb25uZWN0aW9uIH0gZnJvbSAnLi9tb2RlbHMvY29ubmVjdGlvbi5tb2RlbCdcbmltcG9ydCB7IExvY2FsQ29ubmVjdGlvblNlcnZpY2UgfSBmcm9tICcuL3NlcnZpY2VzL2xvY2FsLWNvbm5lY3Rpb24uc2VydmljZSdcbmltcG9ydCB7IEVOVklST05NRU5UIH0gZnJvbSAnLi9zZXJ2aWNlcy9jb25uZWN0aW9uLnNlcnZpY2UnXG4vLyBleHBvcnQgY29uc3QgTElCX09QVElPTlMgPSBuZXcgSW5qZWN0aW9uVG9rZW48SUNvbm5lY3Rpb24+KCdlbnYnKVxuaW1wb3J0IHsgQWN0aW9uQmFyQ29tcG9uZW50IH0gZnJvbSAnLi9jb21wb25lbnRzL2FjdGlvbi1iYXIvYWN0aW9uLWJhci5jb21wb25lbnQnXG5pbXBvcnQgeyBJQ29ubmVjdGlvblR5cGUgfSBmcm9tICcuL21vZGVscy9jb25uZWN0aW9uLXR5cGUubW9kZWwnXG5pbXBvcnQgeyBBcHByb3ZhbENvbXBvbmVudCB9IGZyb20gJy4vY29tcG9uZW50cy9hcHByb3ZhbC9hcHByb3ZhbC5jb21wb25lbnQnO1xuaW1wb3J0IHsgUGVuZGluZ0FwcHJvdmFsQ29tcG9uZW50IH0gZnJvbSAnLi9jb21wb25lbnRzL3BlbmRpbmctYXBwcm92YWwvcGVuZGluZy1hcHByb3ZhbC5jb21wb25lbnQnO1xuaW1wb3J0IHsgQXBwcm92ZVZpZXdDb21wb25lbnQgfSBmcm9tICcuL2NvbXBvbmVudHMvYXBwcm92ZS12aWV3L2FwcHJvdmUtdmlldy5jb21wb25lbnQnO1xuaW1wb3J0IHsgT3JkZXJCeVBpcGUgfSBmcm9tICcuL3BpcGVzL29yZGVyLWJ5LnBpcGUnO1xuaW1wb3J0IHsgRGF0ZVBpcGUgfSBmcm9tICcuL3BpcGVzL2RhdGUucGlwZSdcbmltcG9ydCB7IExhbmRpbmdQYWdlQ29tcG9uZW50IH0gZnJvbSAnLi9jb250YWluZXJzL2xhbmRpbmctcGFnZS9sYW5kaW5nLXBhZ2UuY29tcG9uZW50J1xuaW1wb3J0IHsgQ29uZmlybURpYWxvZ0JveENvbXBvbmVudCB9IGZyb20gJy4vY29tcG9uZW50cy9jb25maXJtLWRpYWxvZy1ib3gvY29uZmlybS1kaWFsb2ctYm94LmNvbXBvbmVudCc7XG5cbkBOZ01vZHVsZSh7XG4gIGRlY2xhcmF0aW9uczogW1xuICAgIFNiVGF4b25vbXlFZGl0b3JDb21wb25lbnQsXG4gICAgRGFzaGJvYXJkQ29tcG9uZW50LFxuICAgIENvbmZpZ0ZyYW1ld29ya0NvbXBvbmVudCxcbiAgICBDcmVhdGVDYXRlZ29yaWVzQ29tcG9uZW50LFxuICAgIENvbmZpZ0ZyYW1ld29ya0NvbXBvbmVudCxcbiAgICBUYXhvbm9teVZpZXdDb21wb25lbnQsXG4gICAgTGFuZGluZ1BhZ2VDb21wb25lbnQsXG4gICAgVGVybUNhcmRDb21wb25lbnQsXG4gICAgVGF4b25vbXlDb2x1bW5WaWV3Q29tcG9uZW50LFxuICAgIENhdGVnb3JpZXNQcmV2aWV3Q29tcG9uZW50LFxuICAgIENhdGVnb3JpZXNQcmV2aWV3Q29tcG9uZW50LFxuICAgIENyZWF0ZVRlcm1Db21wb25lbnQsXG4gICAgQ29ubmVjdG9yQ29tcG9uZW50LFxuICAgIEFjdGlvbkJhckNvbXBvbmVudCxcbiAgICBBcHByb3ZhbENvbXBvbmVudCxcbiAgICBQZW5kaW5nQXBwcm92YWxDb21wb25lbnQsXG4gICAgQXBwcm92ZVZpZXdDb21wb25lbnQsXG4gICAgT3JkZXJCeVBpcGUsXG4gICAgRGF0ZVBpcGUsXG4gICAgQ29uZmlybURpYWxvZ0JveENvbXBvbmVudFxuICBdLFxuICBpbXBvcnRzOiBbXG4gICAgQ29tbW9uTW9kdWxlLFxuICAgIFNiVGF4b25vbXlFZGl0b3JSb3V0aW5nTW9kdWxlLFxuICAgIFJlYWN0aXZlRm9ybXNNb2R1bGUsXG4gICAgRm9ybXNNb2R1bGUsXG4gICAgTWF0Rm9ybUZpZWxkTW9kdWxlLFxuICAgIE1hdEJ1dHRvbk1vZHVsZSxcbiAgICBNYXRJbnB1dE1vZHVsZSxcbiAgICBNYXRJY29uTW9kdWxlLFxuICAgIE1hdENhcmRNb2R1bGUsXG4gICAgTWF0RGlhbG9nTW9kdWxlLFxuICAgIERyYWdEcm9wTW9kdWxlLFxuICAgIE1hdEF1dG9jb21wbGV0ZU1vZHVsZSxcbiAgICBNYXRTZWxlY3RNb2R1bGUsXG4gICAgSHR0cENsaWVudE1vZHVsZSxcbiAgICBNYXRUYWJzTW9kdWxlLFxuICAgIE1hdFNuYWNrQmFyTW9kdWxlLFxuICAgIE1hdFRvb2x0aXBNb2R1bGUsXG4gICAgTWF0Q2hlY2tib3hNb2R1bGUsXG4gICAgTWF0VGFibGVNb2R1bGUsXG4gICAgTWF0UHJvZ3Jlc3NTcGlubmVyTW9kdWxlLFxuICAgIE1hdE1lbnVNb2R1bGVcbiAgXSxcbiAgcHJvdmlkZXJzOltcbiAgICB7IHByb3ZpZGU6IE1BVF9GT1JNX0ZJRUxEX0RFRkFVTFRfT1BUSU9OUywgdXNlVmFsdWU6IHsgYXBwZWFyYW5jZTogJ291dGxpbmUnIH19LFxuICAgIHsgcHJvdmlkZTogSFRUUF9JTlRFUkNFUFRPUlMsIHVzZUNsYXNzOiBUb2tlbkludGVyY2VwdG9yU2VydmljZSwgbXVsdGk6IHRydWUgfSxcbiAgICB7cHJvdmlkZTogTUFUX1NOQUNLX0JBUl9ERUZBVUxUX09QVElPTlMsIHVzZVZhbHVlOiB7ZHVyYXRpb246IDIwMDB9fSxcbiAgICB7IHByb3ZpZGU6IE1BVF9UQUJTX0NPTkZJRywgdXNlVmFsdWU6IHsgYW5pbWF0aW9uRHVyYXRpb246ICcwbXMnIH19LFxuICAgIEZyYW1ld29ya1NlcnZpY2UsXG4gICAgQ29ubmVjdG9yU2VydmljZSxcbiAgICBMb2NhbENvbm5lY3Rpb25TZXJ2aWNlLFxuICBdLFxuICBleHBvcnRzOiBbXG4gICAgU2JUYXhvbm9teUVkaXRvckNvbXBvbmVudCxcbiAgICBDcmVhdGVDYXRlZ29yaWVzQ29tcG9uZW50LFxuICAgIENvbmZpZ0ZyYW1ld29ya0NvbXBvbmVudCxcbiAgICBUYXhvbm9teVZpZXdDb21wb25lbnQsXG4gICAgVGVybUNhcmRDb21wb25lbnQsXG4gICAgQ2F0ZWdvcmllc1ByZXZpZXdDb21wb25lbnQsXG4gICAgQ29uZmlnRnJhbWV3b3JrQ29tcG9uZW50XG4gIF0sXG4gIGVudHJ5Q29tcG9uZW50czogW1xuICAgIENyZWF0ZVRlcm1Db21wb25lbnQsXG4gICAgQ29ubmVjdG9yQ29tcG9uZW50LFxuICBdLFxuICBzY2hlbWFzOiBbIENVU1RPTV9FTEVNRU5UU19TQ0hFTUEgXVxufSlcbmV4cG9ydCBjbGFzcyBTYlRheG9ub215RWRpdG9yTW9kdWxlIHsgXG4gIHN0YXRpYyBmb3JDaGlsZChjb25maWc6IElDb25uZWN0aW9uVHlwZSk6IE1vZHVsZVdpdGhQcm92aWRlcnM8U2JUYXhvbm9teUVkaXRvck1vZHVsZT4ge1xuICAgIHJldHVybiB7XG4gICAgICBuZ01vZHVsZTogU2JUYXhvbm9teUVkaXRvck1vZHVsZSxcbiAgICAgIHByb3ZpZGVyczogW1xuICAgICAgICAvLyBMb2NhbENvbm5lY3Rpb25TZXJ2aWNlLFxuICAgICAgICAvLyB7XG4gICAgICAgIC8vICAgcHJvdmlkZTogRU5WSVJPTk1FTlQsXG4gICAgICAgIC8vICAgdXNlVmFsdWU6IGNvbmZpZ1xuICAgICAgICAvLyB9XG4gICAgICBdXG4gICAgfTtcbiAgfVxufVxuIl19