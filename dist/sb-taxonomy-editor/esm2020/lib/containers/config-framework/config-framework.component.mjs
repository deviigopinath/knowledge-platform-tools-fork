import { Component } from '@angular/core';
import * as i0 from "@angular/core";
import * as i1 from "../../services/framework.service";
import * as i2 from "@angular/common";
import * as i3 from "../../components/create-categories/create-categories.component";
import * as i4 from "../../components/categories-preview/categories-preview.component";
export class ConfigFrameworkComponent {
    constructor(frameworkService) {
        this.frameworkService = frameworkService;
        this.categoriesRepresentations = [];
        this.tempCategoryRepresentaions = [];
        this.oldElements = [];
    }
    ngOnInit() {
        this.frameworkService.getFrameworkInfo().subscribe(res => {
            console.log('Service...', res);
            this.frameworkCategories = res.result.framework.categories;
        });
        // this.categoriesRepresentations = categoryRepresentationsV1
    }
    //   updateCategory(data){
    //     for(let i=0;i<data.length;i++) {
    //         this.tempCategoryRepresentaions.push(
    //           {
    //             name: data[i].name,
    //             terms:this.updateTermArry(data[i].name, data[i+1]?data[i+1].name:'', i)
    //           }
    //         )
    //     }
    //     this.categoriesRepresentations = this.tempCategoryRepresentaions;
    //   }
    //   updateTermArry(current,next, index){
    //     let term = []
    //     if(index%2 === 0){
    //       term = [
    //         {
    //           name:`${current} 1`,
    //           domId:`${current}1`
    //         },
    //         {
    //           name: `${current} 2`,
    //           selected:true,
    //           connected:true,
    //           domId:`${current.toLowerCase()}2`,
    //           connectedDomId:next?`${next.toLowerCase()}1`:''
    //         }
    //       ]
    //     } else {
    //       term = [
    //         {
    //           name:`${current} 1`,
    //           selected:true,
    //           connected:true,
    //           domId:`${current.toLowerCase()}1`,
    //           connectedDomId:next?`${next.toLowerCase()}2`:''
    //         },
    //         {
    //           name: `${current} 2`,
    //           domId:`${current}2`
    //         }
    //       ]
    //     }
    //     return term
    //   }
    // }
    updateCategory(name) {
        this.removeOldLine();
        this.tempCategoryRepresentaions.push({
            name: name,
            terms: this.updateTermArry(name, this.categoriesRepresentations[this.categoriesRepresentations.length - 1], this.categoriesRepresentations.length)
        });
        this.categoriesRepresentations = [...this.tempCategoryRepresentaions];
        // console.log(this.categoriesRepresentations)
    }
    updateTermArry(current, parent, index) {
        let term = [];
        if (index % 2 === 0) {
            term = [
                {
                    name: `${current} 1`,
                    domId: `${current}1`
                },
                {
                    name: `${current} 2`,
                    selected: true,
                    connected: true,
                    domId: `${current.toLowerCase()}2`,
                    parent: parent ? `${parent.terms[0].domId}` : ''
                }
            ];
        }
        else {
            term = [
                {
                    name: `${current} 1`,
                    selected: true,
                    connected: true,
                    domId: `${current.toLowerCase()}1`,
                    parent: parent ? `${parent.terms[1].domId}` : ''
                },
                {
                    name: `${current} 2`,
                    domId: `${current}2`
                }
            ];
        }
        return term;
    }
    removeOldLine() {
        const eles = Array.from(document.getElementsByClassName('leader-line') || []);
        if (eles.length > 0) {
            eles.forEach(ele => ele.remove());
        }
    }
    removeCategory(index) {
        this.categoriesRepresentations.splice(index, 1);
        const temp = [...this.categoriesRepresentations];
        this.categoriesRepresentations = [];
        this.tempCategoryRepresentaions = [];
        temp.forEach(cat => {
            this.updateCategory(cat.name);
        });
    }
    changePosition(event) {
        let myArray = [...this.tempCategoryRepresentaions];
        myArray[event.cur] = myArray.splice(event.prev, 1, myArray[event.cur])[0];
        this.categoriesRepresentations = [];
        this.tempCategoryRepresentaions = [];
        myArray.forEach(cat => {
            this.updateCategory(cat.name);
        });
    }
}
ConfigFrameworkComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "14.3.0", ngImport: i0, type: ConfigFrameworkComponent, deps: [{ token: i1.FrameworkService }], target: i0.ɵɵFactoryTarget.Component });
ConfigFrameworkComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "14.3.0", type: ConfigFrameworkComponent, selector: "lib-config-framework", ngImport: i0, template: "<div class=\"config__wrap\">\n    <lib-create-categories class=\"config__form-wrap\" [taxonomyInfo]=\"''\" (updateCategory)=\"updateCategory($event)\" \n    (removeCategories)=\"removeCategory($event)\" (changePosition)=\"changePosition($event)\"></lib-create-categories>\n    <ng-container *ngIf=\"categoriesRepresentations\">\n        <lib-categories-preview  class=\"config__preview\" [data]=\"categoriesRepresentations\"></lib-categories-preview>\n    </ng-container>\n </div>\n", styles: [".config__wrap{display:flex;flex-direction:row;align-items:start;height:100vh}.config__form-wrap{flex-grow:1}.config__preview{flex-grow:9}\n"], dependencies: [{ kind: "directive", type: i2.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { kind: "component", type: i3.CreateCategoriesComponent, selector: "lib-create-categories", inputs: ["taxonomyInfo"], outputs: ["updateCategory", "removeCategories", "changePosition"] }, { kind: "component", type: i4.CategoriesPreviewComponent, selector: "lib-categories-preview", inputs: ["data"] }] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "14.3.0", ngImport: i0, type: ConfigFrameworkComponent, decorators: [{
            type: Component,
            args: [{ selector: 'lib-config-framework', template: "<div class=\"config__wrap\">\n    <lib-create-categories class=\"config__form-wrap\" [taxonomyInfo]=\"''\" (updateCategory)=\"updateCategory($event)\" \n    (removeCategories)=\"removeCategory($event)\" (changePosition)=\"changePosition($event)\"></lib-create-categories>\n    <ng-container *ngIf=\"categoriesRepresentations\">\n        <lib-categories-preview  class=\"config__preview\" [data]=\"categoriesRepresentations\"></lib-categories-preview>\n    </ng-container>\n </div>\n", styles: [".config__wrap{display:flex;flex-direction:row;align-items:start;height:100vh}.config__form-wrap{flex-grow:1}.config__preview{flex-grow:9}\n"] }]
        }], ctorParameters: function () { return [{ type: i1.FrameworkService }]; } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29uZmlnLWZyYW1ld29yay5jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi9wcm9qZWN0cy9zYi10YXhvbm9teS1lZGl0b3Ivc3JjL2xpYi9jb250YWluZXJzL2NvbmZpZy1mcmFtZXdvcmsvY29uZmlnLWZyYW1ld29yay5jb21wb25lbnQudHMiLCIuLi8uLi8uLi8uLi8uLi8uLi9wcm9qZWN0cy9zYi10YXhvbm9teS1lZGl0b3Ivc3JjL2xpYi9jb250YWluZXJzL2NvbmZpZy1mcmFtZXdvcmsvY29uZmlnLWZyYW1ld29yay5jb21wb25lbnQuaHRtbCJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsU0FBUyxFQUFVLE1BQU0sZUFBZSxDQUFDOzs7Ozs7QUFVbEQsTUFBTSxPQUFPLHdCQUF3QjtJQUtuQyxZQUFvQixnQkFBa0M7UUFBbEMscUJBQWdCLEdBQWhCLGdCQUFnQixDQUFrQjtRQUh0RCw4QkFBeUIsR0FBRyxFQUFFLENBQUM7UUFDL0IsK0JBQTBCLEdBQUcsRUFBRSxDQUFBO1FBQy9CLGdCQUFXLEdBQUcsRUFBRSxDQUFBO0lBQzBDLENBQUM7SUFFM0QsUUFBUTtRQUNOLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxnQkFBZ0IsRUFBRSxDQUFDLFNBQVMsQ0FBQyxHQUFHLENBQUMsRUFBRTtZQUN2RCxPQUFPLENBQUMsR0FBRyxDQUFDLFlBQVksRUFBQyxHQUFHLENBQUMsQ0FBQTtZQUM3QixJQUFJLENBQUMsbUJBQW1CLEdBQUcsR0FBRyxDQUFDLE1BQU0sQ0FBQyxTQUFTLENBQUMsVUFBVSxDQUFBO1FBQzVELENBQUMsQ0FBQyxDQUFBO1FBQ0YsNkRBQTZEO0lBQy9ELENBQUM7SUFFSCwwQkFBMEI7SUFDMUIsdUNBQXVDO0lBQ3ZDLGdEQUFnRDtJQUNoRCxjQUFjO0lBQ2Qsa0NBQWtDO0lBRWxDLHNGQUFzRjtJQUN0RixjQUFjO0lBQ2QsWUFBWTtJQUNaLFFBQVE7SUFDUix3RUFBd0U7SUFDeEUsTUFBTTtJQUlOLHlDQUF5QztJQUN6QyxvQkFBb0I7SUFDcEIseUJBQXlCO0lBQ3pCLGlCQUFpQjtJQUNqQixZQUFZO0lBQ1osaUNBQWlDO0lBQ2pDLGdDQUFnQztJQUNoQyxhQUFhO0lBQ2IsWUFBWTtJQUNaLGtDQUFrQztJQUNsQywyQkFBMkI7SUFDM0IsNEJBQTRCO0lBQzVCLCtDQUErQztJQUMvQyw0REFBNEQ7SUFDNUQsWUFBWTtJQUNaLFVBQVU7SUFDVixlQUFlO0lBQ2YsaUJBQWlCO0lBQ2pCLFlBQVk7SUFDWixpQ0FBaUM7SUFDakMsMkJBQTJCO0lBQzNCLDRCQUE0QjtJQUM1QiwrQ0FBK0M7SUFDL0MsNERBQTREO0lBQzVELGFBQWE7SUFDYixZQUFZO0lBQ1osa0NBQWtDO0lBQ2xDLGdDQUFnQztJQUNoQyxZQUFZO0lBQ1osVUFBVTtJQUNWLFFBQVE7SUFDUixrQkFBa0I7SUFDbEIsTUFBTTtJQUNOLElBQUk7SUFLRixjQUFjLENBQUMsSUFBSTtRQUNqQixJQUFJLENBQUMsYUFBYSxFQUFFLENBQUE7UUFDcEIsSUFBSSxDQUFDLDBCQUEwQixDQUFDLElBQUksQ0FDOUI7WUFDRSxJQUFJLEVBQUUsSUFBSTtZQUNWLEtBQUssRUFBQyxJQUFJLENBQUMsY0FBYyxDQUFDLElBQUksRUFBRyxJQUFJLENBQUMseUJBQXlCLENBQUMsSUFBSSxDQUFDLHlCQUF5QixDQUFDLE1BQU0sR0FBRSxDQUFDLENBQUMsRUFBRSxJQUFJLENBQUMseUJBQXlCLENBQUMsTUFBTSxDQUFDO1NBQ2xKLENBQ04sQ0FBQTtRQUNELElBQUksQ0FBQyx5QkFBeUIsR0FBRyxDQUFDLEdBQUcsSUFBSSxDQUFDLDBCQUEwQixDQUFDLENBQUE7UUFDckUsOENBQThDO0lBQ2xELENBQUM7SUFFQyxjQUFjLENBQUMsT0FBTyxFQUFFLE1BQU0sRUFBRSxLQUFLO1FBQ25DLElBQUksSUFBSSxHQUFHLEVBQUUsQ0FBQTtRQUNiLElBQUcsS0FBSyxHQUFDLENBQUMsS0FBSyxDQUFDLEVBQUU7WUFDaEIsSUFBSSxHQUFHO2dCQUNMO29CQUNFLElBQUksRUFBQyxHQUFHLE9BQU8sSUFBSTtvQkFDbkIsS0FBSyxFQUFDLEdBQUcsT0FBTyxHQUFHO2lCQUNwQjtnQkFDRDtvQkFDRSxJQUFJLEVBQUUsR0FBRyxPQUFPLElBQUk7b0JBQ3BCLFFBQVEsRUFBQyxJQUFJO29CQUNiLFNBQVMsRUFBQyxJQUFJO29CQUNkLEtBQUssRUFBQyxHQUFHLE9BQU8sQ0FBQyxXQUFXLEVBQUUsR0FBRztvQkFDakMsTUFBTSxFQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsR0FBRyxNQUFNLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLEtBQUssRUFBRSxDQUFBLENBQUMsQ0FBQSxFQUFFO2lCQUM5QzthQUNGLENBQUE7U0FDRjthQUFNO1lBQ0wsSUFBSSxHQUFHO2dCQUNMO29CQUNFLElBQUksRUFBQyxHQUFHLE9BQU8sSUFBSTtvQkFDbkIsUUFBUSxFQUFDLElBQUk7b0JBQ2IsU0FBUyxFQUFDLElBQUk7b0JBQ2QsS0FBSyxFQUFDLEdBQUcsT0FBTyxDQUFDLFdBQVcsRUFBRSxHQUFHO29CQUNqQyxNQUFNLEVBQUMsTUFBTSxDQUFBLENBQUMsQ0FBQSxHQUFHLE1BQU0sQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsS0FBSyxFQUFFLENBQUEsQ0FBQyxDQUFBLEVBQUU7aUJBQzVDO2dCQUNEO29CQUNFLElBQUksRUFBRSxHQUFHLE9BQU8sSUFBSTtvQkFDcEIsS0FBSyxFQUFDLEdBQUcsT0FBTyxHQUFHO2lCQUNwQjthQUNGLENBQUE7U0FDRjtRQUNELE9BQU8sSUFBSSxDQUFBO0lBQ2IsQ0FBQztJQUVELGFBQWE7UUFDWCxNQUFNLElBQUksR0FBRyxLQUFLLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxzQkFBc0IsQ0FBQyxhQUFhLENBQUMsSUFBSSxFQUFFLENBQUMsQ0FBQTtRQUM3RSxJQUFHLElBQUksQ0FBQyxNQUFNLEdBQUMsQ0FBQyxFQUFDO1lBQ2IsSUFBSSxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsQ0FBQyxNQUFNLEVBQUUsQ0FBQyxDQUFDO1NBQ3JDO0lBQ0gsQ0FBQztJQUVELGNBQWMsQ0FBQyxLQUFLO1FBQ2xCLElBQUksQ0FBQyx5QkFBeUIsQ0FBQyxNQUFNLENBQUMsS0FBSyxFQUFDLENBQUMsQ0FBQyxDQUFBO1FBQzlDLE1BQU0sSUFBSSxHQUFHLENBQUMsR0FBRyxJQUFJLENBQUMseUJBQXlCLENBQUMsQ0FBQTtRQUNoRCxJQUFJLENBQUMseUJBQXlCLEdBQUcsRUFBRSxDQUFBO1FBQ25DLElBQUksQ0FBQywwQkFBMEIsR0FBRyxFQUFFLENBQUE7UUFDcEMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsRUFBRTtZQUNqQixJQUFJLENBQUMsY0FBYyxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsQ0FBQTtRQUMvQixDQUFDLENBQUMsQ0FBQTtJQUNKLENBQUM7SUFFRCxjQUFjLENBQUMsS0FBSztRQUNsQixJQUFJLE9BQU8sR0FBRyxDQUFDLEdBQUcsSUFBSSxDQUFDLDBCQUEwQixDQUFDLENBQUM7UUFDbkQsT0FBTyxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsR0FBRyxPQUFPLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxJQUFJLEVBQUUsQ0FBQyxFQUFFLE9BQU8sQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUMxRSxJQUFJLENBQUMseUJBQXlCLEdBQUcsRUFBRSxDQUFBO1FBQ25DLElBQUksQ0FBQywwQkFBMEIsR0FBRyxFQUFFLENBQUE7UUFDcEMsT0FBTyxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsRUFBRTtZQUNwQixJQUFJLENBQUMsY0FBYyxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsQ0FBQTtRQUMvQixDQUFDLENBQUMsQ0FBQTtJQUNKLENBQUM7O3FIQTNJVSx3QkFBd0I7eUdBQXhCLHdCQUF3Qiw0RENWckMsb2VBT0E7MkZER2Esd0JBQXdCO2tCQUxwQyxTQUFTOytCQUNFLHNCQUFzQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvbmVudCwgT25Jbml0IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBGcmFtZXdvcmtTZXJ2aWNlIH0gZnJvbSAnLi4vLi4vc2VydmljZXMvZnJhbWV3b3JrLnNlcnZpY2UnO1xuaW1wb3J0IHsgY2F0ZWdvcnlSZXByZXNlbnRhdGlvbnMsIGNhdGVnb3J5UmVwcmVzZW50YXRpb25zVjEgfSBmcm9tICcuLi8uLi9jb25zdGFudHMvZGF0YSdcbmRlY2xhcmUgdmFyIExlYWRlckxpbmU6IGFueTtcblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnbGliLWNvbmZpZy1mcmFtZXdvcmsnLFxuICB0ZW1wbGF0ZVVybDogJy4vY29uZmlnLWZyYW1ld29yay5jb21wb25lbnQuaHRtbCcsXG4gIHN0eWxlVXJsczogWycuL2NvbmZpZy1mcmFtZXdvcmsuY29tcG9uZW50LnNjc3MnXVxufSlcbmV4cG9ydCBjbGFzcyBDb25maWdGcmFtZXdvcmtDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQge1xuICBmcmFtZXdvcmtDYXRlZ29yaWVzO1xuICBjYXRlZ29yaWVzUmVwcmVzZW50YXRpb25zID0gW107XG4gIHRlbXBDYXRlZ29yeVJlcHJlc2VudGFpb25zID0gW11cbiAgb2xkRWxlbWVudHMgPSBbXVxuICBjb25zdHJ1Y3Rvcihwcml2YXRlIGZyYW1ld29ya1NlcnZpY2U6IEZyYW1ld29ya1NlcnZpY2UpIHsgfVxuXG4gIG5nT25Jbml0KCkge1xuICAgIHRoaXMuZnJhbWV3b3JrU2VydmljZS5nZXRGcmFtZXdvcmtJbmZvKCkuc3Vic2NyaWJlKHJlcyA9PiB7XG4gICAgICBjb25zb2xlLmxvZygnU2VydmljZS4uLicscmVzKVxuICAgICAgdGhpcy5mcmFtZXdvcmtDYXRlZ29yaWVzID0gcmVzLnJlc3VsdC5mcmFtZXdvcmsuY2F0ZWdvcmllc1xuICAgIH0pXG4gICAgLy8gdGhpcy5jYXRlZ29yaWVzUmVwcmVzZW50YXRpb25zID0gY2F0ZWdvcnlSZXByZXNlbnRhdGlvbnNWMVxuICB9XG5cbi8vICAgdXBkYXRlQ2F0ZWdvcnkoZGF0YSl7XG4vLyAgICAgZm9yKGxldCBpPTA7aTxkYXRhLmxlbmd0aDtpKyspIHtcbi8vICAgICAgICAgdGhpcy50ZW1wQ2F0ZWdvcnlSZXByZXNlbnRhaW9ucy5wdXNoKFxuLy8gICAgICAgICAgIHtcbi8vICAgICAgICAgICAgIG5hbWU6IGRhdGFbaV0ubmFtZSxcbiAgICAgICAgICAgICBcbi8vICAgICAgICAgICAgIHRlcm1zOnRoaXMudXBkYXRlVGVybUFycnkoZGF0YVtpXS5uYW1lLCBkYXRhW2krMV0/ZGF0YVtpKzFdLm5hbWU6JycsIGkpXG4vLyAgICAgICAgICAgfVxuLy8gICAgICAgICApXG4vLyAgICAgfVxuLy8gICAgIHRoaXMuY2F0ZWdvcmllc1JlcHJlc2VudGF0aW9ucyA9IHRoaXMudGVtcENhdGVnb3J5UmVwcmVzZW50YWlvbnM7XG4vLyAgIH1cblxuXG5cbi8vICAgdXBkYXRlVGVybUFycnkoY3VycmVudCxuZXh0LCBpbmRleCl7XG4vLyAgICAgbGV0IHRlcm0gPSBbXVxuLy8gICAgIGlmKGluZGV4JTIgPT09IDApe1xuLy8gICAgICAgdGVybSA9IFtcbi8vICAgICAgICAge1xuLy8gICAgICAgICAgIG5hbWU6YCR7Y3VycmVudH0gMWAsXG4vLyAgICAgICAgICAgZG9tSWQ6YCR7Y3VycmVudH0xYFxuLy8gICAgICAgICB9LFxuLy8gICAgICAgICB7XG4vLyAgICAgICAgICAgbmFtZTogYCR7Y3VycmVudH0gMmAsXG4vLyAgICAgICAgICAgc2VsZWN0ZWQ6dHJ1ZSxcbi8vICAgICAgICAgICBjb25uZWN0ZWQ6dHJ1ZSxcbi8vICAgICAgICAgICBkb21JZDpgJHtjdXJyZW50LnRvTG93ZXJDYXNlKCl9MmAsXG4vLyAgICAgICAgICAgY29ubmVjdGVkRG9tSWQ6bmV4dD9gJHtuZXh0LnRvTG93ZXJDYXNlKCl9MWA6Jydcbi8vICAgICAgICAgfVxuLy8gICAgICAgXVxuLy8gICAgIH0gZWxzZSB7XG4vLyAgICAgICB0ZXJtID0gW1xuLy8gICAgICAgICB7XG4vLyAgICAgICAgICAgbmFtZTpgJHtjdXJyZW50fSAxYCxcbi8vICAgICAgICAgICBzZWxlY3RlZDp0cnVlLFxuLy8gICAgICAgICAgIGNvbm5lY3RlZDp0cnVlLFxuLy8gICAgICAgICAgIGRvbUlkOmAke2N1cnJlbnQudG9Mb3dlckNhc2UoKX0xYCxcbi8vICAgICAgICAgICBjb25uZWN0ZWREb21JZDpuZXh0P2Ake25leHQudG9Mb3dlckNhc2UoKX0yYDonJ1xuLy8gICAgICAgICB9LFxuLy8gICAgICAgICB7XG4vLyAgICAgICAgICAgbmFtZTogYCR7Y3VycmVudH0gMmAsXG4vLyAgICAgICAgICAgZG9tSWQ6YCR7Y3VycmVudH0yYFxuLy8gICAgICAgICB9XG4vLyAgICAgICBdXG4vLyAgICAgfVxuLy8gICAgIHJldHVybiB0ZXJtXG4vLyAgIH1cbi8vIH1cblxuXG5cblxuICB1cGRhdGVDYXRlZ29yeShuYW1lKXtcbiAgICB0aGlzLnJlbW92ZU9sZExpbmUoKVxuICAgIHRoaXMudGVtcENhdGVnb3J5UmVwcmVzZW50YWlvbnMucHVzaChcbiAgICAgICAgICB7XG4gICAgICAgICAgICBuYW1lOiBuYW1lLFxuICAgICAgICAgICAgdGVybXM6dGhpcy51cGRhdGVUZXJtQXJyeShuYW1lLCAgdGhpcy5jYXRlZ29yaWVzUmVwcmVzZW50YXRpb25zW3RoaXMuY2F0ZWdvcmllc1JlcHJlc2VudGF0aW9ucy5sZW5ndGggLTFdLCB0aGlzLmNhdGVnb3JpZXNSZXByZXNlbnRhdGlvbnMubGVuZ3RoKVxuICAgICAgICAgIH1cbiAgICApXG4gICAgdGhpcy5jYXRlZ29yaWVzUmVwcmVzZW50YXRpb25zID0gWy4uLnRoaXMudGVtcENhdGVnb3J5UmVwcmVzZW50YWlvbnNdICAgIFxuICAgIC8vIGNvbnNvbGUubG9nKHRoaXMuY2F0ZWdvcmllc1JlcHJlc2VudGF0aW9ucylcbn1cblxuICB1cGRhdGVUZXJtQXJyeShjdXJyZW50LCBwYXJlbnQsIGluZGV4KXtcbiAgICBsZXQgdGVybSA9IFtdXG4gICAgaWYoaW5kZXglMiA9PT0gMCkge1xuICAgICAgdGVybSA9IFtcbiAgICAgICAge1xuICAgICAgICAgIG5hbWU6YCR7Y3VycmVudH0gMWAsXG4gICAgICAgICAgZG9tSWQ6YCR7Y3VycmVudH0xYFxuICAgICAgICB9LFxuICAgICAgICB7XG4gICAgICAgICAgbmFtZTogYCR7Y3VycmVudH0gMmAsXG4gICAgICAgICAgc2VsZWN0ZWQ6dHJ1ZSxcbiAgICAgICAgICBjb25uZWN0ZWQ6dHJ1ZSxcbiAgICAgICAgICBkb21JZDpgJHtjdXJyZW50LnRvTG93ZXJDYXNlKCl9MmAsXG4gICAgICAgICAgcGFyZW50OnBhcmVudCA/IGAke3BhcmVudC50ZXJtc1swXS5kb21JZH1gOicnXG4gICAgICAgIH1cbiAgICAgIF1cbiAgICB9IGVsc2Uge1xuICAgICAgdGVybSA9IFtcbiAgICAgICAge1xuICAgICAgICAgIG5hbWU6YCR7Y3VycmVudH0gMWAsXG4gICAgICAgICAgc2VsZWN0ZWQ6dHJ1ZSxcbiAgICAgICAgICBjb25uZWN0ZWQ6dHJ1ZSxcbiAgICAgICAgICBkb21JZDpgJHtjdXJyZW50LnRvTG93ZXJDYXNlKCl9MWAsXG4gICAgICAgICAgcGFyZW50OnBhcmVudD9gJHtwYXJlbnQudGVybXNbMV0uZG9tSWR9YDonJ1xuICAgICAgICB9LFxuICAgICAgICB7XG4gICAgICAgICAgbmFtZTogYCR7Y3VycmVudH0gMmAsXG4gICAgICAgICAgZG9tSWQ6YCR7Y3VycmVudH0yYFxuICAgICAgICB9XG4gICAgICBdXG4gICAgfVxuICAgIHJldHVybiB0ZXJtXG4gIH1cblxuICByZW1vdmVPbGRMaW5lKCkge1xuICAgIGNvbnN0IGVsZXMgPSBBcnJheS5mcm9tKGRvY3VtZW50LmdldEVsZW1lbnRzQnlDbGFzc05hbWUoJ2xlYWRlci1saW5lJykgfHwgW10pXG4gICAgaWYoZWxlcy5sZW5ndGg+MCl7XG4gICAgICAgIGVsZXMuZm9yRWFjaChlbGUgPT4gZWxlLnJlbW92ZSgpKTtcbiAgICB9XG4gIH1cblxuICByZW1vdmVDYXRlZ29yeShpbmRleCl7XG4gICAgdGhpcy5jYXRlZ29yaWVzUmVwcmVzZW50YXRpb25zLnNwbGljZShpbmRleCwxKVxuICAgIGNvbnN0IHRlbXAgPSBbLi4udGhpcy5jYXRlZ29yaWVzUmVwcmVzZW50YXRpb25zXVxuICAgIHRoaXMuY2F0ZWdvcmllc1JlcHJlc2VudGF0aW9ucyA9IFtdXG4gICAgdGhpcy50ZW1wQ2F0ZWdvcnlSZXByZXNlbnRhaW9ucyA9IFtdXG4gICAgdGVtcC5mb3JFYWNoKGNhdCA9PiB7XG4gICAgICB0aGlzLnVwZGF0ZUNhdGVnb3J5KGNhdC5uYW1lKVxuICAgIH0pXG4gIH1cblxuICBjaGFuZ2VQb3NpdGlvbihldmVudCkge1xuICAgIGxldCBteUFycmF5ID0gWy4uLnRoaXMudGVtcENhdGVnb3J5UmVwcmVzZW50YWlvbnNdO1xuICAgIG15QXJyYXlbZXZlbnQuY3VyXSA9IG15QXJyYXkuc3BsaWNlKGV2ZW50LnByZXYsIDEsIG15QXJyYXlbZXZlbnQuY3VyXSlbMF07XG4gICAgdGhpcy5jYXRlZ29yaWVzUmVwcmVzZW50YXRpb25zID0gW11cbiAgICB0aGlzLnRlbXBDYXRlZ29yeVJlcHJlc2VudGFpb25zID0gW11cbiAgICBteUFycmF5LmZvckVhY2goY2F0ID0+IHtcbiAgICAgIHRoaXMudXBkYXRlQ2F0ZWdvcnkoY2F0Lm5hbWUpXG4gICAgfSlcbiAgfVxuXG59XG4iLCI8ZGl2IGNsYXNzPVwiY29uZmlnX193cmFwXCI+XG4gICAgPGxpYi1jcmVhdGUtY2F0ZWdvcmllcyBjbGFzcz1cImNvbmZpZ19fZm9ybS13cmFwXCIgW3RheG9ub215SW5mb109XCInJ1wiICh1cGRhdGVDYXRlZ29yeSk9XCJ1cGRhdGVDYXRlZ29yeSgkZXZlbnQpXCIgXG4gICAgKHJlbW92ZUNhdGVnb3JpZXMpPVwicmVtb3ZlQ2F0ZWdvcnkoJGV2ZW50KVwiIChjaGFuZ2VQb3NpdGlvbik9XCJjaGFuZ2VQb3NpdGlvbigkZXZlbnQpXCI+PC9saWItY3JlYXRlLWNhdGVnb3JpZXM+XG4gICAgPG5nLWNvbnRhaW5lciAqbmdJZj1cImNhdGVnb3JpZXNSZXByZXNlbnRhdGlvbnNcIj5cbiAgICAgICAgPGxpYi1jYXRlZ29yaWVzLXByZXZpZXcgIGNsYXNzPVwiY29uZmlnX19wcmV2aWV3XCIgW2RhdGFdPVwiY2F0ZWdvcmllc1JlcHJlc2VudGF0aW9uc1wiPjwvbGliLWNhdGVnb3JpZXMtcHJldmlldz5cbiAgICA8L25nLWNvbnRhaW5lcj5cbiA8L2Rpdj5cbiJdfQ==