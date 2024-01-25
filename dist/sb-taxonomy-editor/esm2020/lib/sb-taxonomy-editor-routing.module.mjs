import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { TaxonomyViewComponent } from './components/taxonomy-view/taxonomy-view.component';
import { ApprovalComponent } from './components/approval/approval.component';
import { ConfigFrameworkComponent } from './containers/config-framework/config-framework.component';
import { ApproveViewComponent } from './components/approve-view/approve-view.component';
import * as i0 from "@angular/core";
import * as i1 from "@angular/router";
const routes = [
    {
        path: '',
        pathMatch: 'full',
        redirectTo: '/taxonomy-view'
    },
    {
        path: 'taxonomy-view',
        component: TaxonomyViewComponent
    },
    {
        path: 'config', component: ConfigFrameworkComponent
    },
    {
        path: 'approval', component: ApprovalComponent
    },
    {
        path: 'approval/:id', component: ApproveViewComponent
    }
];
export class SbTaxonomyEditorRoutingModule {
}
SbTaxonomyEditorRoutingModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "14.3.0", ngImport: i0, type: SbTaxonomyEditorRoutingModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
SbTaxonomyEditorRoutingModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "14.3.0", ngImport: i0, type: SbTaxonomyEditorRoutingModule, imports: [i1.RouterModule], exports: [RouterModule] });
SbTaxonomyEditorRoutingModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "14.3.0", ngImport: i0, type: SbTaxonomyEditorRoutingModule, imports: [RouterModule.forChild(routes), RouterModule] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "14.3.0", ngImport: i0, type: SbTaxonomyEditorRoutingModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [
                        RouterModule.forChild(routes),
                    ],
                    exports: [RouterModule],
                    providers: [],
                }]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2ItdGF4b25vbXktZWRpdG9yLXJvdXRpbmcubW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vcHJvamVjdHMvc2ItdGF4b25vbXktZWRpdG9yL3NyYy9saWIvc2ItdGF4b25vbXktZWRpdG9yLXJvdXRpbmcubW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxRQUFRLEVBQUUsTUFBTSxlQUFlLENBQUE7QUFDeEMsT0FBTyxFQUFFLFlBQVksRUFBVSxNQUFNLGlCQUFpQixDQUFBO0FBQ3RELE9BQU8sRUFBRSxxQkFBcUIsRUFBRSxNQUFNLG9EQUFvRCxDQUFBO0FBQzFGLE9BQU8sRUFBRSxpQkFBaUIsRUFBRSxNQUFNLDBDQUEwQyxDQUFBO0FBQzVFLE9BQU8sRUFBRSx3QkFBd0IsRUFBRSxNQUFNLDBEQUEwRCxDQUFBO0FBRW5HLE9BQU8sRUFBRSxvQkFBb0IsRUFBRSxNQUFNLGtEQUFrRCxDQUFBOzs7QUFFdkYsTUFBTSxNQUFNLEdBQVc7SUFDbkI7UUFDSSxJQUFJLEVBQUUsRUFBRTtRQUNSLFNBQVMsRUFBRSxNQUFNO1FBQ2pCLFVBQVUsRUFBQyxnQkFBZ0I7S0FDOUI7SUFDRDtRQUNLLElBQUksRUFBQyxlQUFlO1FBQ3JCLFNBQVMsRUFBQyxxQkFBcUI7S0FDbEM7SUFDRDtRQUNJLElBQUksRUFBQyxRQUFRLEVBQUUsU0FBUyxFQUFDLHdCQUF3QjtLQUNwRDtJQUNEO1FBQ0ksSUFBSSxFQUFDLFVBQVUsRUFBRyxTQUFTLEVBQUMsaUJBQWlCO0tBQ2hEO0lBQ0Q7UUFDSSxJQUFJLEVBQUMsY0FBYyxFQUFHLFNBQVMsRUFBQyxvQkFBb0I7S0FDdkQ7Q0FDSixDQUFBO0FBUUMsTUFBTSxPQUFPLDZCQUE2Qjs7MEhBQTdCLDZCQUE2QjsySEFBN0IsNkJBQTZCLHdDQUg5QixZQUFZOzJIQUdYLDZCQUE2QixZQUx0QyxZQUFZLENBQUMsUUFBUSxDQUFDLE1BQU0sQ0FBQyxFQUVyQixZQUFZOzJGQUdYLDZCQUE2QjtrQkFQM0MsUUFBUTttQkFBQztvQkFDTixPQUFPLEVBQUU7d0JBQ1AsWUFBWSxDQUFDLFFBQVEsQ0FBQyxNQUFNLENBQUM7cUJBQzlCO29CQUNELE9BQU8sRUFBRSxDQUFDLFlBQVksQ0FBQztvQkFDdkIsU0FBUyxFQUFFLEVBQUU7aUJBQ2QiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBOZ01vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnXG5pbXBvcnQgeyBSb3V0ZXJNb2R1bGUsIFJvdXRlcyB9IGZyb20gJ0Bhbmd1bGFyL3JvdXRlcidcbmltcG9ydCB7IFRheG9ub215Vmlld0NvbXBvbmVudCB9IGZyb20gJy4vY29tcG9uZW50cy90YXhvbm9teS12aWV3L3RheG9ub215LXZpZXcuY29tcG9uZW50J1xuaW1wb3J0IHsgQXBwcm92YWxDb21wb25lbnQgfSBmcm9tICcuL2NvbXBvbmVudHMvYXBwcm92YWwvYXBwcm92YWwuY29tcG9uZW50J1xuaW1wb3J0IHsgQ29uZmlnRnJhbWV3b3JrQ29tcG9uZW50IH0gZnJvbSAnLi9jb250YWluZXJzL2NvbmZpZy1mcmFtZXdvcmsvY29uZmlnLWZyYW1ld29yay5jb21wb25lbnQnXG5pbXBvcnQgeyBEYXNoYm9hcmRDb21wb25lbnQgfSBmcm9tICcuL2NvbnRhaW5lcnMvZGFzaGJvYXJkL2Rhc2hib2FyZC5jb21wb25lbnQnXG5pbXBvcnQgeyBBcHByb3ZlVmlld0NvbXBvbmVudCB9IGZyb20gJy4vY29tcG9uZW50cy9hcHByb3ZlLXZpZXcvYXBwcm92ZS12aWV3LmNvbXBvbmVudCdcblxuY29uc3Qgcm91dGVzOiBSb3V0ZXMgPSBbXG4gICAge1xuICAgICAgICBwYXRoOiAnJyxcbiAgICAgICAgcGF0aE1hdGNoOiAnZnVsbCcsXG4gICAgICAgIHJlZGlyZWN0VG86Jy90YXhvbm9teS12aWV3J1xuICAgIH0sXG4gICAge1xuICAgICAgICAgcGF0aDondGF4b25vbXktdmlldycsXG4gICAgICAgIGNvbXBvbmVudDpUYXhvbm9teVZpZXdDb21wb25lbnRcbiAgICB9LFxuICAgIHtcbiAgICAgICAgcGF0aDonY29uZmlnJywgY29tcG9uZW50OkNvbmZpZ0ZyYW1ld29ya0NvbXBvbmVudFxuICAgIH0sXG4gICAge1xuICAgICAgICBwYXRoOidhcHByb3ZhbCcsICBjb21wb25lbnQ6QXBwcm92YWxDb21wb25lbnRcbiAgICB9LFxuICAgIHtcbiAgICAgICAgcGF0aDonYXBwcm92YWwvOmlkJywgIGNvbXBvbmVudDpBcHByb3ZlVmlld0NvbXBvbmVudFxuICAgIH1cbl1cbkBOZ01vZHVsZSh7XG4gICAgaW1wb3J0czogW1xuICAgICAgUm91dGVyTW9kdWxlLmZvckNoaWxkKHJvdXRlcyksXG4gICAgXSxcbiAgICBleHBvcnRzOiBbUm91dGVyTW9kdWxlXSxcbiAgICBwcm92aWRlcnM6IFtdLFxuICB9KVxuICBleHBvcnQgY2xhc3MgU2JUYXhvbm9teUVkaXRvclJvdXRpbmdNb2R1bGUgeyB9XG4gICJdfQ==