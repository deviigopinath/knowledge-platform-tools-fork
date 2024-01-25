import { Component, Input } from '@angular/core';
import * as i0 from "@angular/core";
import * as i1 from "./services/framework.service";
import * as i2 from "@angular/router";
export class SbTaxonomyEditorComponent {
    constructor(frameworkService) {
        this.frameworkService = frameworkService;
    }
    ngOnInit() {
        this.frameworkService.updateEnvironment(this.environment);
        this.frameworkService.setConfig(this.taxonomyConfig);
    }
}
SbTaxonomyEditorComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "14.3.0", ngImport: i0, type: SbTaxonomyEditorComponent, deps: [{ token: i1.FrameworkService }], target: i0.ɵɵFactoryTarget.Component });
SbTaxonomyEditorComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "14.3.0", type: SbTaxonomyEditorComponent, selector: "sb-taxonomy-editor", inputs: { environment: "environment", taxonomyConfig: "taxonomyConfig" }, ngImport: i0, template: `
        <router-outlet></router-outlet>
  `, isInline: true, dependencies: [{ kind: "directive", type: i2.RouterOutlet, selector: "router-outlet", outputs: ["activate", "deactivate", "attach", "detach"], exportAs: ["outlet"] }] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "14.3.0", ngImport: i0, type: SbTaxonomyEditorComponent, decorators: [{
            type: Component,
            args: [{ selector: 'sb-taxonomy-editor', template: `
        <router-outlet></router-outlet>
  ` }]
        }], ctorParameters: function () { return [{ type: i1.FrameworkService }]; }, propDecorators: { environment: [{
                type: Input
            }], taxonomyConfig: [{
                type: Input
            }] } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2ItdGF4b25vbXktZWRpdG9yLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3Byb2plY3RzL3NiLXRheG9ub215LWVkaXRvci9zcmMvbGliL3NiLXRheG9ub215LWVkaXRvci5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFpQixTQUFTLEVBQUUsS0FBSyxFQUFVLE1BQU0sZUFBZSxDQUFDOzs7O0FBV3hFLE1BQU0sT0FBTyx5QkFBeUI7SUFLcEMsWUFBb0IsZ0JBQWtDO1FBQWxDLHFCQUFnQixHQUFoQixnQkFBZ0IsQ0FBa0I7SUFBSSxDQUFDO0lBRTNELFFBQVE7UUFDTixJQUFJLENBQUMsZ0JBQWdCLENBQUMsaUJBQWlCLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxDQUFDO1FBQzFELElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLGNBQWMsQ0FBQyxDQUFDO0lBQ3ZELENBQUM7O3NIQVZVLHlCQUF5QjswR0FBekIseUJBQXlCLG9JQU4xQjs7R0FFVDsyRkFJVSx5QkFBeUI7a0JBUnJDLFNBQVM7K0JBQ0Usb0JBQW9CLFlBQ3BCOztHQUVUO3VHQU1RLFdBQVc7c0JBQW5CLEtBQUs7Z0JBQ0csY0FBYztzQkFBdEIsS0FBSyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEFmdGVyVmlld0luaXQsIENvbXBvbmVudCwgSW5wdXQsIE9uSW5pdCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgRnJhbWV3b3JrU2VydmljZSB9IGZyb20gJy4vc2VydmljZXMvZnJhbWV3b3JrLnNlcnZpY2UnO1xuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdzYi10YXhvbm9teS1lZGl0b3InLFxuICB0ZW1wbGF0ZTogYFxuICAgICAgICA8cm91dGVyLW91dGxldD48L3JvdXRlci1vdXRsZXQ+XG4gIGAsXG4gIHN0eWxlczogW1xuICBdXG59KVxuZXhwb3J0IGNsYXNzIFNiVGF4b25vbXlFZGl0b3JDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQge1xuICBcbiAgQElucHV0KCkgZW52aXJvbm1lbnQ6YW55O1xuICBASW5wdXQoKSB0YXhvbm9teUNvbmZpZzogYW55O1xuXG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgZnJhbWV3b3JrU2VydmljZTogRnJhbWV3b3JrU2VydmljZSkgeyB9XG5cbiAgbmdPbkluaXQoKSB7XG4gICAgdGhpcy5mcmFtZXdvcmtTZXJ2aWNlLnVwZGF0ZUVudmlyb25tZW50KHRoaXMuZW52aXJvbm1lbnQpO1xuICAgIHRoaXMuZnJhbWV3b3JrU2VydmljZS5zZXRDb25maWcodGhpcy50YXhvbm9teUNvbmZpZyk7XG4gIH1cbn1cbiJdfQ==