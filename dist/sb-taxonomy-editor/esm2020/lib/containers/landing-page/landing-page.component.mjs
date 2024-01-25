import { Component } from '@angular/core';
import { labels } from '../../labels/strings';
import * as i0 from "@angular/core";
import * as i1 from "../../services/framework.service";
import * as i2 from "../../components/create-categories/create-categories.component";
export class LandingPageComponent {
    constructor(frameworkService) {
        this.frameworkService = frameworkService;
        this.app_strings = labels;
    }
    ngOnInit() {
        this.frameworkService.getFrameworkInfo().subscribe(res => {
            console.log('Service...', res);
            this.frameworkCategories = res.result.framework.categories;
        });
    }
}
LandingPageComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "14.3.0", ngImport: i0, type: LandingPageComponent, deps: [{ token: i1.FrameworkService }], target: i0.ɵɵFactoryTarget.Component });
LandingPageComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "14.3.0", type: LandingPageComponent, selector: "lib-landing-page", ngImport: i0, template: "<div class=\"landing-wrap\">\n    <lib-create-categories [taxonomyInfo]=\"frameworkCategories\"></lib-create-categories>\n    <div>\n        {{app_strings.treeView}}\n    </div>\n</div>\n", styles: [".landing-wrap{display:flex;flex-direction:row;justify-content:space-evenly;align-items:center;height:100vh}\n"], dependencies: [{ kind: "component", type: i2.CreateCategoriesComponent, selector: "lib-create-categories", inputs: ["taxonomyInfo"], outputs: ["updateCategory", "removeCategories", "changePosition"] }] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "14.3.0", ngImport: i0, type: LandingPageComponent, decorators: [{
            type: Component,
            args: [{ selector: 'lib-landing-page', template: "<div class=\"landing-wrap\">\n    <lib-create-categories [taxonomyInfo]=\"frameworkCategories\"></lib-create-categories>\n    <div>\n        {{app_strings.treeView}}\n    </div>\n</div>\n", styles: [".landing-wrap{display:flex;flex-direction:row;justify-content:space-evenly;align-items:center;height:100vh}\n"] }]
        }], ctorParameters: function () { return [{ type: i1.FrameworkService }]; } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibGFuZGluZy1wYWdlLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uL3Byb2plY3RzL3NiLXRheG9ub215LWVkaXRvci9zcmMvbGliL2NvbnRhaW5lcnMvbGFuZGluZy1wYWdlL2xhbmRpbmctcGFnZS5jb21wb25lbnQudHMiLCIuLi8uLi8uLi8uLi8uLi8uLi9wcm9qZWN0cy9zYi10YXhvbm9teS1lZGl0b3Ivc3JjL2xpYi9jb250YWluZXJzL2xhbmRpbmctcGFnZS9sYW5kaW5nLXBhZ2UuY29tcG9uZW50Lmh0bWwiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLFNBQVMsRUFBVSxNQUFNLGVBQWUsQ0FBQztBQUVsRCxPQUFPLEVBQUUsTUFBTSxFQUFFLE1BQU0sc0JBQXNCLENBQUM7Ozs7QUFPOUMsTUFBTSxPQUFPLG9CQUFvQjtJQUkvQixZQUFvQixnQkFBa0M7UUFBbEMscUJBQWdCLEdBQWhCLGdCQUFnQixDQUFrQjtRQUZ0RCxnQkFBVyxHQUFRLE1BQU0sQ0FBQztJQUVnQyxDQUFDO0lBRTNELFFBQVE7UUFDTixJQUFJLENBQUMsZ0JBQWdCLENBQUMsZ0JBQWdCLEVBQUUsQ0FBQyxTQUFTLENBQUMsR0FBRyxDQUFDLEVBQUU7WUFDdkQsT0FBTyxDQUFDLEdBQUcsQ0FBQyxZQUFZLEVBQUMsR0FBRyxDQUFDLENBQUE7WUFDN0IsSUFBSSxDQUFDLG1CQUFtQixHQUFHLEdBQUcsQ0FBQyxNQUFNLENBQUMsU0FBUyxDQUFDLFVBQVUsQ0FBQTtRQUM1RCxDQUFDLENBQUMsQ0FBQTtJQUNKLENBQUM7O2lIQVhVLG9CQUFvQjtxR0FBcEIsb0JBQW9CLHdEQ1RqQyw2TEFNQTsyRkRHYSxvQkFBb0I7a0JBTGhDLFNBQVM7K0JBQ0Usa0JBQWtCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tcG9uZW50LCBPbkluaXQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IEZyYW1ld29ya1NlcnZpY2UgfSBmcm9tICcuLi8uLi9zZXJ2aWNlcy9mcmFtZXdvcmsuc2VydmljZSc7XG5pbXBvcnQgeyBsYWJlbHMgfSBmcm9tICcuLi8uLi9sYWJlbHMvc3RyaW5ncyc7XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ2xpYi1sYW5kaW5nLXBhZ2UnLFxuICB0ZW1wbGF0ZVVybDogJy4vbGFuZGluZy1wYWdlLmNvbXBvbmVudC5odG1sJyxcbiAgc3R5bGVVcmxzOiBbJy4vbGFuZGluZy1wYWdlLmNvbXBvbmVudC5zY3NzJ11cbn0pXG5leHBvcnQgY2xhc3MgTGFuZGluZ1BhZ2VDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQge1xuICBmcmFtZXdvcmtDYXRlZ29yaWVzOiBhbnk7XG4gIGFwcF9zdHJpbmdzOiBhbnkgPSBsYWJlbHM7XG5cbiAgY29uc3RydWN0b3IocHJpdmF0ZSBmcmFtZXdvcmtTZXJ2aWNlOiBGcmFtZXdvcmtTZXJ2aWNlKSB7IH1cblxuICBuZ09uSW5pdCgpIHtcbiAgICB0aGlzLmZyYW1ld29ya1NlcnZpY2UuZ2V0RnJhbWV3b3JrSW5mbygpLnN1YnNjcmliZShyZXMgPT4ge1xuICAgICAgY29uc29sZS5sb2coJ1NlcnZpY2UuLi4nLHJlcylcbiAgICAgIHRoaXMuZnJhbWV3b3JrQ2F0ZWdvcmllcyA9IHJlcy5yZXN1bHQuZnJhbWV3b3JrLmNhdGVnb3JpZXNcbiAgICB9KVxuICB9XG5cbn1cbiIsIjxkaXYgY2xhc3M9XCJsYW5kaW5nLXdyYXBcIj5cbiAgICA8bGliLWNyZWF0ZS1jYXRlZ29yaWVzIFt0YXhvbm9teUluZm9dPVwiZnJhbWV3b3JrQ2F0ZWdvcmllc1wiPjwvbGliLWNyZWF0ZS1jYXRlZ29yaWVzPlxuICAgIDxkaXY+XG4gICAgICAgIHt7YXBwX3N0cmluZ3MudHJlZVZpZXd9fVxuICAgIDwvZGl2PlxuPC9kaXY+XG4iXX0=