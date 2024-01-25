import { NgModule, ModuleWithProviders,CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { SbTaxonomyEditorComponent } from './sb-taxonomy-editor.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms'
import { SbTaxonomyEditorRoutingModule } from './sb-taxonomy-editor-routing.module'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { MatFormFieldModule, MAT_FORM_FIELD_DEFAULT_OPTIONS } from '@angular/material/form-field'
import { MatButtonModule } from '@angular/material/button';
import { MatSelect, MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input'
import { MatIconModule } from '@angular/material/icon'
import { MatCardModule } from '@angular/material/card';
import { MatDialogModule } from '@angular/material/dialog'
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
import { CreateCategoriesComponent } from './components/create-categories/create-categories.component'
import { ConfigFrameworkComponent } from './containers/config-framework/config-framework.component'
import { TaxonomyViewComponent } from './components/taxonomy-view/taxonomy-view.component'
import { TermCardComponent } from './components/term-card/term-card.component'
import { CommonModule } from '@angular/common';
import { CategoriesPreviewComponent } from './components/categories-preview/categories-preview.component'
import { ConnectorService } from './services/connector.service'
import { CreateTermComponent } from './components/create-term/create-term.component';
import { TaxonomyColumnViewComponent } from './components/taxonomy-column-view/taxonomy-column-view.component'
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http'
import { TokenInterceptorService } from './services/token-interceptor.service'
import { ConnectorComponent } from './components/connector/connector.component'
import { IConnection } from './models/connection.model'
import { LocalConnectionService } from './services/local-connection.service'
import { ENVIRONMENT } from './services/connection.service'
// export const LIB_OPTIONS = new InjectionToken<IConnection>('env')
import { ActionBarComponent } from './components/action-bar/action-bar.component'
import { IConnectionType } from './models/connection-type.model'
import { ApprovalComponent } from './components/approval/approval.component';
import { PendingApprovalComponent } from './components/pending-approval/pending-approval.component';
import { ApproveViewComponent } from './components/approve-view/approve-view.component';
import { OrderByPipe } from './pipes/order-by.pipe';
import { DatePipe } from './pipes/date.pipe'
import { LandingPageComponent } from './containers/landing-page/landing-page.component'
import { ConfirmDialogBoxComponent } from './components/confirm-dialog-box/confirm-dialog-box.component';

@NgModule({
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
  providers:[
    { provide: MAT_FORM_FIELD_DEFAULT_OPTIONS, useValue: { appearance: 'outline' }},
    { provide: HTTP_INTERCEPTORS, useClass: TokenInterceptorService, multi: true },
    {provide: MAT_SNACK_BAR_DEFAULT_OPTIONS, useValue: {duration: 2000}},
    { provide: MAT_TABS_CONFIG, useValue: { animationDuration: '0ms' }},
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
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
})
export class SbTaxonomyEditorModule { 
  static forChild(config: IConnectionType): ModuleWithProviders<SbTaxonomyEditorModule> {
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
