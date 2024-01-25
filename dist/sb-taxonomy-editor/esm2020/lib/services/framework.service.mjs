import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { v4 as uuidv4 } from 'uuid';
import * as i0 from "@angular/core";
import * as i1 from "@angular/common/http";
import * as i2 from "./local-connection.service";
export class FrameworkService {
    constructor(http, localConfig
    // @Inject(LibConnectionService) private config
    ) {
        // this.fillCategories()
        this.http = http;
        this.localConfig = localConfig;
        this.categoriesHash = new BehaviorSubject([]);
        // termsByCategory: BehaviorSubject<NSFramework.ITermsByCategory[] | []> = new BehaviorSubject<NSFramework.ITermsByCategory[] | []>([])
        this.isDataUpdated = new BehaviorSubject(false);
        this.currentSelection = new BehaviorSubject(null);
        this.termSubject = new BehaviorSubject(null);
        this.list = new Map();
        this.selectionList = new Map();
        this.insertUpdateDeleteNotifier = new BehaviorSubject(null);
    }
    getFrameworkInfo() {
        localStorage.removeItem('terms');
        return this.http.get(`/api/framework/v1/read/${this.environment.frameworkName}`).pipe(tap((response) => {
            this.resetAll();
            this.formateData(response);
        }), catchError((err) => {
            this.list.clear();
            this.categoriesHash.next([]);
            throw 'Error in source. Details: ' + err; // Use console.log(err) for detail
        }));
    }
    // readTerms(frameworkId, categoryId, requestBody) {
    //   return this.http.post(`/api/framework/v1/term/search?framework=${frameworkId}&category=${categoryId}`, requestBody).pipe(
    //     map((res: any) => res.result))
    // }
    createTerm(frameworkId, categoryId, requestBody) {
        return this.http.post(`/api/framework/v1/term/create?framework=${frameworkId}&category=${categoryId}`, requestBody);
    }
    updateTerm(frameworkId, categoryId, categoryTermCode, reguestBody) {
        return this.http.patch(`/api/framework/v1/term/update/${categoryTermCode}?framework=${frameworkId}&category=${categoryId}`, reguestBody);
    }
    publishFramework() {
        return this.http.post(`/api/framework/v1/publish/${this.environment.frameworkName}`, {}, { headers: { 'X-Channel-Id': this.environment.channelId } });
    }
    getUuid() {
        return uuidv4();
    }
    updateEnvironment(env) {
        this.environment = env;
    }
    getEnviroment() {
        return this.environment;
    }
    getFrameworkId() {
        return this.frameworkId;
    }
    getNextCategory(currentCategory) {
        const currentIndex = this.categoriesHash.value.findIndex((a) => {
            return a.code === currentCategory;
        });
        let categoryLength = this.categoriesHash.getValue().length;
        /* istanbul ignore next */
        return (currentIndex + 1) <= categoryLength ? this.categoriesHash.getValue()[currentIndex + 1] : null;
    }
    getPreviousCategory(currentCategory) {
        const currentIndex = this.categoriesHash.value.findIndex((a) => {
            return a.code === currentCategory;
        });
        /* istanbul ignore next */
        return (currentIndex - 1) >= 0 ? this.categoriesHash.getValue()[currentIndex - 1] : null;
    }
    /* Not using anywhere ignore unit test */
    /* istanbul ignore next */
    getParentTerm(currentCategory) {
        const parent = this.getPreviousCategory(currentCategory) || null;
        return parent ? this.selectionList.get(parent.code) : null;
    }
    childClick(event) {
        this.currentSelection.next(event);
    }
    resetAll() {
        this.categoriesHash.next([]);
        this.currentSelection.next(null);
        this.list.clear();
    }
    isLastColumn(colCode) {
        return this.categoriesHash.value && (this.categoriesHash.value.findIndex((a) => {
            return a.code === colCode;
        })) === (this.categoriesHash.value.length - 1);
        // return false
    }
    /* Not using anywhere ignore unit test */
    /* istanbul ignore next */
    removeItemFromArray(array, item) {
        /* assign a empty array */
        var tmp = [];
        /* loop over all array items */
        for (var index in array) {
            if (array[index] !== item) {
                /* push to temporary array if not like item */
                tmp.push(array[index]);
            }
        }
        /* return the temporary array */
        return tmp;
    }
    // set setTerm(res: any) {
    //   this.termSubject.next(res)
    //   let oldTerms = ([...this.getTerm] || [])
    //   debugger
    //   if (!res.parent && res.created) {
    //     oldTerms.push(res.term)
    //   } else {
    //     if ((oldTerms.filter(ola => ola.code === res.parent.code) || []).length === 0) {
    //       if (!res.parent.children) {
    //         res.parent.children = []
    //       }
    //       res.parent.children.push(res.term)
    //       oldTerms.push(res.parent)
    //     } else {
    //       oldTerms.map(ot => {
    //         if (ot && ot.code === res.parent.code) {
    //           if (!ot.children) {
    //             ot.children = []
    //           }
    //           ot.children.push(res.term)
    //         }
    //       })
    //     }
    //   }
    //   localStorage.setItem('terms', JSON.stringify(oldTerms))
    // }
    set setTerm(res) {
        this.termSubject.next(res);
        let oldTerms = ([...this.getTerm]);
        oldTerms.push(res);
        localStorage.setItem('terms', JSON.stringify(oldTerms));
    }
    get getTerm() {
        return JSON.parse(localStorage.getItem('terms') || '[]');
    }
    /* istanbul ignore next */
    getLocalTermsByParent(parentCode) {
        const filteredData = this.getTerm.filter(x => {
            return x.parent && x.parent.category === parentCode;
        }) || [];
        return filteredData.map(x => {
            return x.term;
        });
    }
    getLocalTermsByCategory(parentCode) {
        const filteredData = this.getTerm.filter(x => {
            return x.term && x.term.category === parentCode;
        });
        return filteredData;
    }
    /* istanbul ignore next */
    getLocalTermsCategory(category) {
        const filteredData = this.getTerm.filter(x => {
            return x.category === category;
        });
        return filteredData;
    }
    formateData(response) {
        this.frameworkId = response.result.framework.code;
        // console.log('response', response);
        // // const obj = FRAMEWORK;
        // // const columns: NSFramework.IColumnView[] = [];
        // // const obj = response
        (response.result.framework.categories).forEach((a, idx) => {
            // if (idx <= 1) {
            // const localData = this.getLocalTermsCategory(a.code)
            // console.log("localData============>", localData)
            this.list.set(a.code, {
                code: a.code,
                identifier: a.identifier,
                index: a.index,
                name: a.name,
                selected: a.selected,
                status: a.status,
                description: a.description,
                translations: a.translations,
                category: a.category,
                associations: a.associations,
                config: this.getConfig(a.code),
                // children: ([...a.terms, ...localData] || []).map(c => {
                children: (a.terms || []).map(c => {
                    const associations = c.associations || [];
                    if (associations.length > 0) {
                        Object.assign(c, { children: associations });
                    }
                    return c;
                })
            });
            // }
        });
        const allCategories = [];
        this.list.forEach(a => {
            allCategories.push({
                code: a.code,
                identifier: a.identifier,
                index: a.index,
                name: a.name,
                status: a.status,
                description: a.description,
                translations: a.translations,
            });
        });
        this.categoriesHash.next(allCategories);
    }
    removeOldLine() {
        /* istanbul ignore next */
        const eles = Array.from(document.getElementsByClassName('leader-line') || []);
        /* istanbul ignore if */
        if (eles.length > 0) {
            eles.forEach(ele => ele.remove());
        }
    }
    setConfig(config) {
        this.rootConfig = config;
    }
    getConfig(code) {
        // this.rootConfig = JSON.parse(localStorage.getItem('taxonomyConfig'))
        let categoryConfig;
        const defaultConfig = this.rootConfig.filter(con => con.frameworkId === 'default')[0];
        this.rootConfig.forEach((config, index) => {
            if (this.frameworkId == config.frameworkId) {
                categoryConfig = config.config.find((obj) => obj.category == code);
            }
        });
        return categoryConfig || defaultConfig.config.find((obj) => obj.category == code);
    }
    isTermExistRemove(id) {
        let associations = [];
        let temp;
        this.selectionList.forEach((parent, i) => {
            /* istanbul ignore next */
            temp = parent.children ? parent.children.filter(child => child.identifier === id) : null;
            associations = parent.children ? parent.children.map(c => {
                return { identifier: c.identifier }; // approvalStatus: c.associationProperties?c.associationProperties.approvalStatus: 'Draft'
            }) : [];
            if (temp && temp.length) {
                associations = associations.filter((obj) => obj.identifier !== id);
                const requestBody = {
                    request: {
                        term: {
                            associations: [
                                ...associations
                            ]
                        }
                    }
                };
                this.updateTerm(this.frameworkId, parent.category, parent.code, requestBody).subscribe(res => {
                    this.publishFramework().subscribe(res => console.log(res));
                });
            }
        });
    }
}
FrameworkService.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "14.3.0", ngImport: i0, type: FrameworkService, deps: [{ token: i1.HttpClient }, { token: i2.LocalConnectionService }], target: i0.ɵɵFactoryTarget.Injectable });
FrameworkService.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "14.3.0", ngImport: i0, type: FrameworkService, providedIn: 'root' });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "14.3.0", ngImport: i0, type: FrameworkService, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root'
                }]
        }], ctorParameters: function () { return [{ type: i1.HttpClient }, { type: i2.LocalConnectionService }]; } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZnJhbWV3b3JrLnNlcnZpY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi9wcm9qZWN0cy9zYi10YXhvbm9teS1lZGl0b3Ivc3JjL2xpYi9zZXJ2aWNlcy9mcmFtZXdvcmsuc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQVUsVUFBVSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQ25ELE9BQU8sRUFBRSxlQUFlLEVBQTJCLE1BQU0sTUFBTSxDQUFDO0FBQ2hFLE9BQU8sRUFBRSxVQUFVLEVBQU8sR0FBRyxFQUFFLE1BQU0sZ0JBQWdCLENBQUE7QUFJckQsT0FBTyxFQUFFLEVBQUUsSUFBSSxNQUFNLEVBQUUsTUFBTSxNQUFNLENBQUM7Ozs7QUFRcEMsTUFBTSxPQUFPLGdCQUFnQjtJQWEzQixZQUNVLElBQWdCLEVBQ2pCLFdBQW1DO0lBQzFDLCtDQUErQzs7UUFFL0Msd0JBQXdCO1FBSmhCLFNBQUksR0FBSixJQUFJLENBQVk7UUFDakIsZ0JBQVcsR0FBWCxXQUFXLENBQXdCO1FBZDVDLG1CQUFjLEdBQWtELElBQUksZUFBZSxDQUErQixFQUFFLENBQUMsQ0FBQTtRQUNySCx1SUFBdUk7UUFDdkksa0JBQWEsR0FBNkIsSUFBSSxlQUFlLENBQVUsS0FBSyxDQUFDLENBQUE7UUFDN0UscUJBQWdCLEdBQXVFLElBQUksZUFBZSxDQUFvRCxJQUFJLENBQUMsQ0FBQTtRQUNuSyxnQkFBVyxHQUF5QixJQUFJLGVBQWUsQ0FBTSxJQUFJLENBQUMsQ0FBQTtRQUNsRSxTQUFJLEdBQUcsSUFBSSxHQUFHLEVBQW1DLENBQUM7UUFDbEQsa0JBQWEsR0FBRyxJQUFJLEdBQUcsRUFBbUMsQ0FBQztRQUMzRCwrQkFBMEIsR0FBb0csSUFBSSxlQUFlLENBQWlGLElBQUksQ0FBQyxDQUFBO0lBWXZPLENBQUM7SUFFRCxnQkFBZ0I7UUFDZCxZQUFZLENBQUMsVUFBVSxDQUFDLE9BQU8sQ0FBQyxDQUFDO1FBQy9C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SCxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFBO1lBRVAsSUFBRyxJQUFJLElBQUksSUFBSSxDQUFDLE1BQU0sRUFBRTtnQkFDdEIsWUFBWSxHQUFHLFlBQVksQ0FBQyxNQUFNLENBQUMsQ0FBQyxHQUFHLEVBQUUsRUFBRSxDQUFFLEdBQUcsQ0FBQyxVQUFVLEtBQUssRUFBRSxDQUFDLENBQUM7Z0JBQ3BFLE1BQU0sV0FBVyxHQUFHO29CQUNsQixPQUFPLEVBQUU7d0JBQ0wsSUFBSSxFQUFFOzRCQUNKLFlBQVksRUFBRTtnQ0FDWixHQUFHLFlBQVk7NkJBQ2hCO3lCQUNGO3FCQUNGO2lCQUNGLENBQUE7Z0JBQ0gsSUFBSSxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsV0FBVyxFQUFFLE1BQU0sQ0FBQyxRQUFRLEVBQUUsTUFBTSxDQUFDLElBQUksRUFBQyxXQUFXLENBQUMsQ0FBQyxTQUFTLENBQUUsR0FBRyxDQUFDLEVBQUU7b0JBQ3ZGLElBQUksQ0FBQyxnQkFBZ0IsRUFBRSxDQUFDLFNBQVMsQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQztnQkFDakUsQ0FBQyxDQUFDLENBQUM7YUFDSjtRQUNILENBQUMsQ0FBQyxDQUFBO0lBQ0osQ0FBQzs7NkdBblNVLGdCQUFnQjtpSEFBaEIsZ0JBQWdCLGNBRmYsTUFBTTsyRkFFUCxnQkFBZ0I7a0JBSDVCLFVBQVU7bUJBQUM7b0JBQ1YsVUFBVSxFQUFFLE1BQU07aUJBQ25CIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgSW5qZWN0LCBJbmplY3RhYmxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBCZWhhdmlvclN1YmplY3QsIE9ic2VydmFibGUsIG9mLCBTdWJqZWN0IH0gZnJvbSAncnhqcyc7XG5pbXBvcnQgeyBjYXRjaEVycm9yLCBtYXAsIHRhcCB9IGZyb20gJ3J4anMvb3BlcmF0b3JzJ1xuaW1wb3J0IHsgRlJBTUVXT1JLIH0gZnJvbSAnLi4vY29uc3RhbnRzL2RhdGEnXG5pbXBvcnQgeyBOU0ZyYW1ld29yayB9IGZyb20gJy4uL21vZGVscy9mcmFtZXdvcmsubW9kZWwnO1xuaW1wb3J0IHsgSHR0cENsaWVudCwgSHR0cEhlYWRlcnMgfSBmcm9tICdAYW5ndWxhci9jb21tb24vaHR0cCc7XG5pbXBvcnQgeyB2NCBhcyB1dWlkdjQgfSBmcm9tICd1dWlkJztcbmltcG9ydCB7IElDb25uZWN0aW9uIH0gZnJvbSAnLi4vbW9kZWxzL2Nvbm5lY3Rpb24ubW9kZWwnO1xuLy8gaW1wb3J0IHsgTGliQ29ubmVjdGlvblNlcnZpY2UgfSBmcm9tICd0YXhvbm9teS1lZGl0b3IvbGliL3NlcnZpY2VzL2Nvbm5lY3Rpb24uc2VydmljZSc7XG5pbXBvcnQgeyBMb2NhbENvbm5lY3Rpb25TZXJ2aWNlIH0gZnJvbSAnLi9sb2NhbC1jb25uZWN0aW9uLnNlcnZpY2UnO1xuXG5ASW5qZWN0YWJsZSh7XG4gIHByb3ZpZGVkSW46ICdyb290J1xufSlcbmV4cG9ydCBjbGFzcyBGcmFtZXdvcmtTZXJ2aWNlIHtcbiAgY2F0ZWdvcmllc0hhc2g6IEJlaGF2aW9yU3ViamVjdDxOU0ZyYW1ld29yay5JQ2F0ZWdvcnlbXSB8IFtdPiA9IG5ldyBCZWhhdmlvclN1YmplY3Q8TlNGcmFtZXdvcmsuSUNhdGVnb3J5W10gfCBbXT4oW10pXG4gIC8vIHRlcm1zQnlDYXRlZ29yeTogQmVoYXZpb3JTdWJqZWN0PE5TRnJhbWV3b3JrLklUZXJtc0J5Q2F0ZWdvcnlbXSB8IFtdPiA9IG5ldyBCZWhhdmlvclN1YmplY3Q8TlNGcmFtZXdvcmsuSVRlcm1zQnlDYXRlZ29yeVtdIHwgW10+KFtdKVxuICBpc0RhdGFVcGRhdGVkOiBCZWhhdmlvclN1YmplY3Q8Ym9vbGVhbj4gPSBuZXcgQmVoYXZpb3JTdWJqZWN0PGJvb2xlYW4+KGZhbHNlKVxuICBjdXJyZW50U2VsZWN0aW9uOiBCZWhhdmlvclN1YmplY3Q8eyB0eXBlOiBzdHJpbmcsIGRhdGE6IGFueSwgY2FyZFJlZj86IGFueSB9IHwgbnVsbD4gPSBuZXcgQmVoYXZpb3JTdWJqZWN0PHsgdHlwZTogc3RyaW5nLCBkYXRhOiBhbnksIGNhcmRSZWY/OiBhbnkgfSB8IG51bGw+KG51bGwpXG4gIHRlcm1TdWJqZWN0OiBCZWhhdmlvclN1YmplY3Q8YW55PiA9IG5ldyBCZWhhdmlvclN1YmplY3Q8YW55PihudWxsKVxuICBsaXN0ID0gbmV3IE1hcDxzdHJpbmcsIE5TRnJhbWV3b3JrLklDb2x1bW5WaWV3PigpO1xuICBzZWxlY3Rpb25MaXN0ID0gbmV3IE1hcDxzdHJpbmcsIE5TRnJhbWV3b3JrLklDb2x1bW5WaWV3PigpO1xuICBpbnNlcnRVcGRhdGVEZWxldGVOb3RpZmllcjogQmVoYXZpb3JTdWJqZWN0PHsgdHlwZTogJ3NlbGVjdCcgfCAnaW5zZXJ0JyB8ICd1cGRhdGUnIHwgJ2RlbGV0ZScsIGFjdGlvbjogc3RyaW5nLCBkYXRhOiBhbnkgfT4gPSBuZXcgQmVoYXZpb3JTdWJqZWN0PHsgdHlwZTogJ3NlbGVjdCcgfCAnaW5zZXJ0JyB8ICd1cGRhdGUnIHwgJ2RlbGV0ZScsIGFjdGlvbjogc3RyaW5nLCBkYXRhOiBhbnkgfT4obnVsbClcbiAgZW52aXJvbm1lbnRcbiAgbGliQ29uZmlnOiBJQ29ubmVjdGlvblxuICBmcmFtZXdvcmtJZDogc3RyaW5nO1xuICByb290Q29uZmlnOiBhbnk7ICBcbiAgY29uc3RydWN0b3IoXG4gICAgcHJpdmF0ZSBodHRwOiBIdHRwQ2xpZW50LFxuICAgIHB1YmxpYyBsb2NhbENvbmZpZzogTG9jYWxDb25uZWN0aW9uU2VydmljZVxuICAgIC8vIEBJbmplY3QoTGliQ29ubmVjdGlvblNlcnZpY2UpIHByaXZhdGUgY29uZmlnXG4gICkge1xuICAgIC8vIHRoaXMuZmlsbENhdGVnb3JpZXMoKVxuXG4gIH1cblxuICBnZXRGcmFtZXdvcmtJbmZvKCk6IE9ic2VydmFibGU8YW55PiB7XG4gICAgbG9jYWxTdG9yYWdlLnJlbW92ZUl0ZW0oJ3Rlcm1zJyk7XG4gICAgICByZXR1cm4gdGhpcy5odHRwLmdldChgL2FwaS9mcmFtZXdvcmsvdjEvcmVhZC8ke3RoaXMuZW52aXJvbm1lbnQuZnJhbWV3b3JrTmFtZX1gKS5waXBlKFxuICAgICAgICB0YXAoKHJlc3BvbnNlOiBhbnkpID0+IHtcbiAgICAgICAgICB0aGlzLnJlc2V0QWxsKClcbiAgICAgICAgICB0aGlzLmZvcm1hdGVEYXRhKHJlc3BvbnNlKVxuICAgICAgICB9KSxcbiAgICAgICAgY2F0Y2hFcnJvcigoZXJyKSA9PiB7XG4gICAgICAgICAgdGhpcy5saXN0LmNsZWFyKClcbiAgICAgICAgICB0aGlzLmNhdGVnb3JpZXNIYXNoLm5leHQoW10pXG4gICAgICAgICAgdGhyb3cgJ0Vycm9yIGluIHNvdXJjZS4gRGV0YWlsczogJyArIGVycjsgLy8gVXNlIGNvbnNvbGUubG9nKGVycikgZm9yIGRldGFpbFxuICAgICAgICB9KSlcbiAgfVxuXG4gIC8vIHJlYWRUZXJtcyhmcmFtZXdvcmtJZCwgY2F0ZWdvcnlJZCwgcmVxdWVzdEJvZHkpIHtcbiAgLy8gICByZXR1cm4gdGhpcy5odHRwLnBvc3QoYC9hcGkvZnJhbWV3b3JrL3YxL3Rlcm0vc2VhcmNoP2ZyYW1ld29yaz0ke2ZyYW1ld29ya0lkfSZjYXRlZ29yeT0ke2NhdGVnb3J5SWR9YCwgcmVxdWVzdEJvZHkpLnBpcGUoXG4gIC8vICAgICBtYXAoKHJlczogYW55KSA9PiByZXMucmVzdWx0KSlcbiAgLy8gfVxuXG4gIGNyZWF0ZVRlcm0oZnJhbWV3b3JrSWQsIGNhdGVnb3J5SWQsIHJlcXVlc3RCb2R5KSB7XG4gICAgcmV0dXJuIHRoaXMuaHR0cC5wb3N0KGAvYXBpL2ZyYW1ld29yay92MS90ZXJtL2NyZWF0ZT9mcmFtZXdvcms9JHtmcmFtZXdvcmtJZH0mY2F0ZWdvcnk9JHtjYXRlZ29yeUlkfWAsIHJlcXVlc3RCb2R5KVxuICB9XG5cbiAgdXBkYXRlVGVybShmcmFtZXdvcmtJZCwgY2F0ZWdvcnlJZCwgY2F0ZWdvcnlUZXJtQ29kZSwgcmVndWVzdEJvZHkpIHtcbiAgICByZXR1cm4gdGhpcy5odHRwLnBhdGNoKGAvYXBpL2ZyYW1ld29yay92MS90ZXJtL3VwZGF0ZS8ke2NhdGVnb3J5VGVybUNvZGV9P2ZyYW1ld29yaz0ke2ZyYW1ld29ya0lkfSZjYXRlZ29yeT0ke2NhdGVnb3J5SWR9YCwgcmVndWVzdEJvZHkpXG4gIH1cblxuICBwdWJsaXNoRnJhbWV3b3JrKCkge1xuICAgIHJldHVybiB0aGlzLmh0dHAucG9zdChgL2FwaS9mcmFtZXdvcmsvdjEvcHVibGlzaC8ke3RoaXMuZW52aXJvbm1lbnQuZnJhbWV3b3JrTmFtZX1gLCB7fSwgeyBoZWFkZXJzOiB7ICdYLUNoYW5uZWwtSWQnOiB0aGlzLmVudmlyb25tZW50LmNoYW5uZWxJZCB9IH0pXG4gIH1cblxuICBnZXRVdWlkKCkge1xuICAgIHJldHVybiB1dWlkdjQoKVxuICB9XG5cbiAgdXBkYXRlRW52aXJvbm1lbnQoZW52KSB7XG4gICAgdGhpcy5lbnZpcm9ubWVudCA9IGVudiBcbiAgfVxuXG4gIGdldEVudmlyb21lbnQoKSB7XG4gICAgcmV0dXJuIHRoaXMuZW52aXJvbm1lbnRcbiAgfVxuXG4gIGdldEZyYW1ld29ya0lkKCkge1xuICAgIHJldHVybiB0aGlzLmZyYW1ld29ya0lkXG4gIH1cblxuICBnZXROZXh0Q2F0ZWdvcnkoY3VycmVudENhdGVnb3J5OiBzdHJpbmcpIHtcbiAgICBjb25zdCBjdXJyZW50SW5kZXggPSB0aGlzLmNhdGVnb3JpZXNIYXNoLnZhbHVlLmZpbmRJbmRleCgoYTogTlNGcmFtZXdvcmsuSUNhdGVnb3J5KSA9PiB7XG4gICAgICByZXR1cm4gYS5jb2RlID09PSBjdXJyZW50Q2F0ZWdvcnlcbiAgICB9KVxuICAgIGxldCBjYXRlZ29yeUxlbmd0aCA9IHRoaXMuY2F0ZWdvcmllc0hhc2guZ2V0VmFsdWUoKS5sZW5ndGhcbiAgICAvKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAqL1xuICAgIHJldHVybiAoY3VycmVudEluZGV4ICsgMSkgPD0gY2F0ZWdvcnlMZW5ndGggPyB0aGlzLmNhdGVnb3JpZXNIYXNoLmdldFZhbHVlKClbY3VycmVudEluZGV4ICsgMV0gOiBudWxsXG4gIH1cblxuICBnZXRQcmV2aW91c0NhdGVnb3J5KGN1cnJlbnRDYXRlZ29yeTogc3RyaW5nKSB7XG4gICAgY29uc3QgY3VycmVudEluZGV4ID0gdGhpcy5jYXRlZ29yaWVzSGFzaC52YWx1ZS5maW5kSW5kZXgoKGE6IE5TRnJhbWV3b3JrLklDYXRlZ29yeSkgPT4ge1xuICAgICAgcmV0dXJuIGEuY29kZSA9PT0gY3VycmVudENhdGVnb3J5XG4gICAgfSlcbiAgICAvKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAqL1xuICAgIHJldHVybiAoY3VycmVudEluZGV4IC0gMSkgPj0gMCA/IHRoaXMuY2F0ZWdvcmllc0hhc2guZ2V0VmFsdWUoKVtjdXJyZW50SW5kZXggLSAxXSA6IG51bGxcbiAgfVxuXG4gIC8qIE5vdCB1c2luZyBhbnl3aGVyZSBpZ25vcmUgdW5pdCB0ZXN0ICovXG4gICAvKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAqLyBcbiAgZ2V0UGFyZW50VGVybShjdXJyZW50Q2F0ZWdvcnk6IHN0cmluZykge1xuICAgIGNvbnN0IHBhcmVudCA9IHRoaXMuZ2V0UHJldmlvdXNDYXRlZ29yeShjdXJyZW50Q2F0ZWdvcnkpIHx8IG51bGxcbiAgICByZXR1cm4gcGFyZW50ID8gdGhpcy5zZWxlY3Rpb25MaXN0LmdldChwYXJlbnQuY29kZSkgOiBudWxsXG4gIH1cblxuICBjaGlsZENsaWNrKGV2ZW50OiB7IHR5cGU6IHN0cmluZywgZGF0YTogYW55IH0pIHtcbiAgICB0aGlzLmN1cnJlbnRTZWxlY3Rpb24ubmV4dChldmVudClcbiAgfVxuXG4gIHJlc2V0QWxsKCkge1xuICAgIHRoaXMuY2F0ZWdvcmllc0hhc2gubmV4dChbXSlcbiAgICB0aGlzLmN1cnJlbnRTZWxlY3Rpb24ubmV4dChudWxsKVxuICAgIHRoaXMubGlzdC5jbGVhcigpXG4gIH1cblxuICBpc0xhc3RDb2x1bW4oY29sQ29kZSkge1xuICAgIHJldHVybiB0aGlzLmNhdGVnb3JpZXNIYXNoLnZhbHVlICYmICh0aGlzLmNhdGVnb3JpZXNIYXNoLnZhbHVlLmZpbmRJbmRleCgoYTogTlNGcmFtZXdvcmsuSUNhdGVnb3J5KSA9PiB7XG4gICAgICByZXR1cm4gYS5jb2RlID09PSBjb2xDb2RlXG4gICAgfSkpID09PSAodGhpcy5jYXRlZ29yaWVzSGFzaC52YWx1ZS5sZW5ndGggLSAxKVxuICAgIC8vIHJldHVybiBmYWxzZVxuICB9XG5cbiAvKiBOb3QgdXNpbmcgYW55d2hlcmUgaWdub3JlIHVuaXQgdGVzdCAqL1xuICAgLyogaXN0YW5idWwgaWdub3JlIG5leHQgKi8gXG4gIHJlbW92ZUl0ZW1Gcm9tQXJyYXkoYXJyYXk6W10sIGl0ZW0pIHtcbiAgICAvKiBhc3NpZ24gYSBlbXB0eSBhcnJheSAqL1xuICAgIHZhciB0bXAgPSBbXTtcbiAgICAvKiBsb29wIG92ZXIgYWxsIGFycmF5IGl0ZW1zICovXG4gICAgZm9yICh2YXIgaW5kZXggaW4gYXJyYXkpIHtcbiAgICAgIGlmIChhcnJheVtpbmRleF0gIT09IGl0ZW0pIHtcbiAgICAgICAgLyogcHVzaCB0byB0ZW1wb3JhcnkgYXJyYXkgaWYgbm90IGxpa2UgaXRlbSAqL1xuICAgICAgICB0bXAucHVzaChhcnJheVtpbmRleF0pO1xuICAgICAgfVxuICAgIH1cbiAgICAvKiByZXR1cm4gdGhlIHRlbXBvcmFyeSBhcnJheSAqL1xuICAgIHJldHVybiB0bXA7XG4gIH1cbiAgLy8gc2V0IHNldFRlcm0ocmVzOiBhbnkpIHtcbiAgLy8gICB0aGlzLnRlcm1TdWJqZWN0Lm5leHQocmVzKVxuICAvLyAgIGxldCBvbGRUZXJtcyA9IChbLi4udGhpcy5nZXRUZXJtXSB8fCBbXSlcbiAgLy8gICBkZWJ1Z2dlclxuICAvLyAgIGlmICghcmVzLnBhcmVudCAmJiByZXMuY3JlYXRlZCkge1xuICAvLyAgICAgb2xkVGVybXMucHVzaChyZXMudGVybSlcbiAgLy8gICB9IGVsc2Uge1xuICAvLyAgICAgaWYgKChvbGRUZXJtcy5maWx0ZXIob2xhID0+IG9sYS5jb2RlID09PSByZXMucGFyZW50LmNvZGUpIHx8IFtdKS5sZW5ndGggPT09IDApIHtcbiAgLy8gICAgICAgaWYgKCFyZXMucGFyZW50LmNoaWxkcmVuKSB7XG4gIC8vICAgICAgICAgcmVzLnBhcmVudC5jaGlsZHJlbiA9IFtdXG4gIC8vICAgICAgIH1cbiAgLy8gICAgICAgcmVzLnBhcmVudC5jaGlsZHJlbi5wdXNoKHJlcy50ZXJtKVxuICAvLyAgICAgICBvbGRUZXJtcy5wdXNoKHJlcy5wYXJlbnQpXG4gIC8vICAgICB9IGVsc2Uge1xuICAvLyAgICAgICBvbGRUZXJtcy5tYXAob3QgPT4ge1xuICAvLyAgICAgICAgIGlmIChvdCAmJiBvdC5jb2RlID09PSByZXMucGFyZW50LmNvZGUpIHtcbiAgLy8gICAgICAgICAgIGlmICghb3QuY2hpbGRyZW4pIHtcbiAgLy8gICAgICAgICAgICAgb3QuY2hpbGRyZW4gPSBbXVxuICAvLyAgICAgICAgICAgfVxuICAvLyAgICAgICAgICAgb3QuY2hpbGRyZW4ucHVzaChyZXMudGVybSlcbiAgLy8gICAgICAgICB9XG4gIC8vICAgICAgIH0pXG4gIC8vICAgICB9XG4gIC8vICAgfVxuICAvLyAgIGxvY2FsU3RvcmFnZS5zZXRJdGVtKCd0ZXJtcycsIEpTT04uc3RyaW5naWZ5KG9sZFRlcm1zKSlcbiAgLy8gfVxuICBzZXQgc2V0VGVybShyZXM6IGFueSkge1xuICAgIHRoaXMudGVybVN1YmplY3QubmV4dChyZXMpXG4gICAgbGV0IG9sZFRlcm1zID0gKFsuLi50aGlzLmdldFRlcm1dKVxuICAgIG9sZFRlcm1zLnB1c2gocmVzKVxuICAgIGxvY2FsU3RvcmFnZS5zZXRJdGVtKCd0ZXJtcycsIEpTT04uc3RyaW5naWZ5KG9sZFRlcm1zKSlcbiAgfVxuICBnZXQgZ2V0VGVybSgpOiBhbnlbXSB7XG4gICAgcmV0dXJuIEpTT04ucGFyc2UobG9jYWxTdG9yYWdlLmdldEl0ZW0oJ3Rlcm1zJykgfHwgJ1tdJylcbiAgfVxuICAgLyogaXN0YW5idWwgaWdub3JlIG5leHQgKi8gXG4gIGdldExvY2FsVGVybXNCeVBhcmVudChwYXJlbnRDb2RlOiBzdHJpbmcpOiBhbnlbXSB7XG4gICAgY29uc3QgZmlsdGVyZWREYXRhID0gdGhpcy5nZXRUZXJtLmZpbHRlcih4ID0+IHtcbiAgICAgIHJldHVybiB4LnBhcmVudCAmJiB4LnBhcmVudC5jYXRlZ29yeSA9PT0gcGFyZW50Q29kZVxuICAgIH0pIHx8IFtdO1xuXG4gICAgcmV0dXJuIGZpbHRlcmVkRGF0YS5tYXAoeCA9PiB7XG4gICAgICByZXR1cm4geC50ZXJtXG4gICAgfSlcbiAgfVxuXG4gIGdldExvY2FsVGVybXNCeUNhdGVnb3J5KHBhcmVudENvZGU6IHN0cmluZyk6IGFueVtdIHtcbiAgICBcbiAgICBjb25zdCBmaWx0ZXJlZERhdGEgPSB0aGlzLmdldFRlcm0uZmlsdGVyKHggPT4ge1xuICAgICAgcmV0dXJuIHgudGVybSAmJiB4LnRlcm0uY2F0ZWdvcnkgPT09IHBhcmVudENvZGVcbiAgICB9KTtcblxuICAgIHJldHVybiBmaWx0ZXJlZERhdGFcbiAgfVxuICBcbiAgLyogaXN0YW5idWwgaWdub3JlIG5leHQgKi8gXG4gIGdldExvY2FsVGVybXNDYXRlZ29yeShjYXRlZ29yeTogc3RyaW5nKTogYW55W10ge1xuICAgIGNvbnN0IGZpbHRlcmVkRGF0YSA9IHRoaXMuZ2V0VGVybS5maWx0ZXIoeCA9PiB7XG4gICAgICByZXR1cm4geC5jYXRlZ29yeSA9PT0gY2F0ZWdvcnlcbiAgICB9KTtcblxuICAgIHJldHVybiBmaWx0ZXJlZERhdGFcbiAgfVxuXG4gIGZvcm1hdGVEYXRhKHJlc3BvbnNlOiBhbnkpIHtcbiAgICB0aGlzLmZyYW1ld29ya0lkID0gcmVzcG9uc2UucmVzdWx0LmZyYW1ld29yay5jb2RlO1xuICAgIC8vIGNvbnNvbGUubG9nKCdyZXNwb25zZScsIHJlc3BvbnNlKTtcbiAgICAvLyAvLyBjb25zdCBvYmogPSBGUkFNRVdPUks7XG4gICAgLy8gLy8gY29uc3QgY29sdW1uczogTlNGcmFtZXdvcmsuSUNvbHVtblZpZXdbXSA9IFtdO1xuICAgIC8vIC8vIGNvbnN0IG9iaiA9IHJlc3BvbnNlXG4gICAgKHJlc3BvbnNlLnJlc3VsdC5mcmFtZXdvcmsuY2F0ZWdvcmllcykuZm9yRWFjaCgoYSwgaWR4KSA9PiB7XG4gICAgICAvLyBpZiAoaWR4IDw9IDEpIHtcbiAgICAgIC8vIGNvbnN0IGxvY2FsRGF0YSA9IHRoaXMuZ2V0TG9jYWxUZXJtc0NhdGVnb3J5KGEuY29kZSlcbiAgICAgIC8vIGNvbnNvbGUubG9nKFwibG9jYWxEYXRhPT09PT09PT09PT09PlwiLCBsb2NhbERhdGEpXG4gICAgICB0aGlzLmxpc3Quc2V0KGEuY29kZSwge1xuICAgICAgICBjb2RlOiBhLmNvZGUsXG4gICAgICAgIGlkZW50aWZpZXI6IGEuaWRlbnRpZmllcixcbiAgICAgICAgaW5kZXg6IGEuaW5kZXgsXG4gICAgICAgIG5hbWU6IGEubmFtZSxcbiAgICAgICAgc2VsZWN0ZWQ6IGEuc2VsZWN0ZWQsXG4gICAgICAgIHN0YXR1czogYS5zdGF0dXMgYXMgTlNGcmFtZXdvcmsuVE5vZGVTdGF0dXMsXG4gICAgICAgIGRlc2NyaXB0aW9uOiBhLmRlc2NyaXB0aW9uLFxuICAgICAgICB0cmFuc2xhdGlvbnM6IGEudHJhbnNsYXRpb25zLFxuICAgICAgICBjYXRlZ29yeTphLmNhdGVnb3J5LFxuICAgICAgICBhc3NvY2lhdGlvbnM6IGEuYXNzb2NpYXRpb25zLFxuICAgICAgICBjb25maWc6IHRoaXMuZ2V0Q29uZmlnKGEuY29kZSksXG4gICAgICAgIC8vIGNoaWxkcmVuOiAoWy4uLmEudGVybXMsIC4uLmxvY2FsRGF0YV0gfHwgW10pLm1hcChjID0+IHtcbiAgICAgICAgY2hpbGRyZW46IChhLnRlcm1zIHx8IFtdKS5tYXAoYyA9PiB7XG4gICAgICAgICAgY29uc3QgYXNzb2NpYXRpb25zID0gYy5hc3NvY2lhdGlvbnMgfHwgW11cbiAgICAgICAgICBpZiAoYXNzb2NpYXRpb25zLmxlbmd0aCA+IDApIHtcbiAgICAgICAgICAgIE9iamVjdC5hc3NpZ24oYywgeyBjaGlsZHJlbjogYXNzb2NpYXRpb25zIH0pXG4gICAgICAgICAgfVxuICAgICAgICAgIHJldHVybiBjXG4gICAgICAgIH0pXG4gICAgICB9KVxuICAgICAgLy8gfVxuICAgIH0pO1xuICAgIGNvbnN0IGFsbENhdGVnb3JpZXMgPSBbXVxuICAgIHRoaXMubGlzdC5mb3JFYWNoKGEgPT4ge1xuICAgICAgYWxsQ2F0ZWdvcmllcy5wdXNoKHtcbiAgICAgICAgY29kZTogYS5jb2RlLFxuICAgICAgICBpZGVudGlmaWVyOiBhLmlkZW50aWZpZXIsXG4gICAgICAgIGluZGV4OiBhLmluZGV4LFxuICAgICAgICBuYW1lOiBhLm5hbWUsXG4gICAgICAgIHN0YXR1czogYS5zdGF0dXMgYXMgTlNGcmFtZXdvcmsuVE5vZGVTdGF0dXMsXG4gICAgICAgIGRlc2NyaXB0aW9uOiBhLmRlc2NyaXB0aW9uLFxuICAgICAgICB0cmFuc2xhdGlvbnM6IGEudHJhbnNsYXRpb25zLFxuICAgICAgfSBhcyBOU0ZyYW1ld29yay5JQ2F0ZWdvcnkpXG4gICAgfSlcbiAgICB0aGlzLmNhdGVnb3JpZXNIYXNoLm5leHQoYWxsQ2F0ZWdvcmllcylcblxuICB9XG5cbiAgcmVtb3ZlT2xkTGluZSgpIHtcbiAgICAgLyogaXN0YW5idWwgaWdub3JlIG5leHQgKi8gXG4gICAgY29uc3QgZWxlcyA9IEFycmF5LmZyb20oZG9jdW1lbnQuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZSgnbGVhZGVyLWxpbmUnKSB8fCBbXSlcbiAgIC8qIGlzdGFuYnVsIGlnbm9yZSBpZiAqLyBcbiAgICBpZihlbGVzLmxlbmd0aD4wKXtcbiAgICAgICAgZWxlcy5mb3JFYWNoKGVsZSA9PiBlbGUucmVtb3ZlKCkpO1xuICAgIH1cbiAgfVxuXG5cbiAgc2V0Q29uZmlnKGNvbmZpZzogYW55KSB7XG4gICAgdGhpcy5yb290Q29uZmlnID0gY29uZmlnXG5cbiAgfVxuXG4gIGdldENvbmZpZyhjb2RlOiBzdHJpbmcpIHtcbiAgICAvLyB0aGlzLnJvb3RDb25maWcgPSBKU09OLnBhcnNlKGxvY2FsU3RvcmFnZS5nZXRJdGVtKCd0YXhvbm9teUNvbmZpZycpKVxuICAgIGxldCBjYXRlZ29yeUNvbmZpZzogYW55O1xuICAgIGNvbnN0IGRlZmF1bHRDb25maWcgPSB0aGlzLnJvb3RDb25maWcuZmlsdGVyKGNvbiA9PiBjb24uZnJhbWV3b3JrSWQgPT09ICdkZWZhdWx0JylbMF1cbiAgICB0aGlzLnJvb3RDb25maWcuZm9yRWFjaCgoY29uZmlnOiBhbnksIGluZGV4OiBudW1iZXIpID0+IHtcbiAgICAgIGlmKHRoaXMuZnJhbWV3b3JrSWQgPT0gY29uZmlnLmZyYW1ld29ya0lkKSB7XG4gICAgICAgIGNhdGVnb3J5Q29uZmlnID0gY29uZmlnLmNvbmZpZy5maW5kKChvYmo6IGFueSkgPT4gb2JqLmNhdGVnb3J5ID09IGNvZGUpO1xuICAgICAgfVxuICAgIH0pO1xuICAgIHJldHVybiBjYXRlZ29yeUNvbmZpZyB8fCBkZWZhdWx0Q29uZmlnLmNvbmZpZy5maW5kKChvYmo6IGFueSkgPT4gb2JqLmNhdGVnb3J5ID09IGNvZGUpO1xuICB9XG5cbiAgaXNUZXJtRXhpc3RSZW1vdmUoaWQpIHtcbiAgICBsZXQgYXNzb2NpYXRpb25zID0gW107XG4gICAgbGV0IHRlbXA7XG4gICAgIHRoaXMuc2VsZWN0aW9uTGlzdC5mb3JFYWNoKChwYXJlbnQsaSkgPT4ge1xuICAgICAgIC8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICovIFxuICAgICAgdGVtcCA9IHBhcmVudC5jaGlsZHJlbiA/IHBhcmVudC5jaGlsZHJlbi5maWx0ZXIoY2hpbGQgPT4gY2hpbGQuaWRlbnRpZmllciA9PT0gaWQpIDogbnVsbFxuICAgICAgYXNzb2NpYXRpb25zID0gcGFyZW50LmNoaWxkcmVuID8gcGFyZW50LmNoaWxkcmVuLm1hcChjID0+IHtcbiAgICAgICAgcmV0dXJuIHsgaWRlbnRpZmllcjogYy5pZGVudGlmaWVyfSAvLyBhcHByb3ZhbFN0YXR1czogYy5hc3NvY2lhdGlvblByb3BlcnRpZXM/Yy5hc3NvY2lhdGlvblByb3BlcnRpZXMuYXBwcm92YWxTdGF0dXM6ICdEcmFmdCdcbiAgICAgIH0pIDogW10gXG5cbiAgICAgIGlmKHRlbXAgJiYgdGVtcC5sZW5ndGgpIHtcbiAgICAgICAgYXNzb2NpYXRpb25zID0gYXNzb2NpYXRpb25zLmZpbHRlcigob2JqKSA9PiAgb2JqLmlkZW50aWZpZXIgIT09IGlkKTtcbiAgICAgICAgY29uc3QgcmVxdWVzdEJvZHkgPSB7XG4gICAgICAgICAgcmVxdWVzdDoge1xuICAgICAgICAgICAgICB0ZXJtOiB7XG4gICAgICAgICAgICAgICAgYXNzb2NpYXRpb25zOiBbXG4gICAgICAgICAgICAgICAgICAuLi5hc3NvY2lhdGlvbnMgIFxuICAgICAgICAgICAgICAgIF0gICAgXG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0gXG4gICAgICAgICAgfVxuICAgICAgICB0aGlzLnVwZGF0ZVRlcm0odGhpcy5mcmFtZXdvcmtJZCwgcGFyZW50LmNhdGVnb3J5LCBwYXJlbnQuY29kZSxyZXF1ZXN0Qm9keSkuc3Vic2NyaWJlKCByZXMgPT4ge1xuICAgICAgICAgICAgICB0aGlzLnB1Ymxpc2hGcmFtZXdvcmsoKS5zdWJzY3JpYmUocmVzID0+IGNvbnNvbGUubG9nKHJlcykpO1xuICAgICAgICB9KTtcbiAgICAgIH1cbiAgICB9KVxuICB9XG5cbn1cbiJdfQ==