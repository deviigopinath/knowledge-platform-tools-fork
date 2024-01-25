import { Injectable } from '@angular/core';
import * as i0 from "@angular/core";
export class LocalConnectionService {
    constructor() {
        this._vars = {
            data: {
                endpoint: '',
                frameworkName: '',
                token: '',
                isApprovalRequired: false
            },
            source: 'online'
        };
        const env = JSON.parse(localStorage.getItem('environment'));
        if (env) {
            this._vars.data.endpoint = env.url;
            this._vars.data.token = env.token;
            this._vars.data.frameworkName = env.frameworkName;
            this._vars.data.isApprovalRequired = env.isApprovalRequired;
        }
    }
    get apiUrl() {
        if (this.localStorage.data.endpoint) {
            return this.localStorage.data.endpoint;
        }
        return this._vars.data.endpoint;
    }
    get token() {
        if (this.localStorage.data.token) {
            return this.localStorage.data.token;
        }
        return this._vars.data.token;
    }
    get frameworkName() {
        if (this.localStorage.data.frameworkName) {
            return this.localStorage.data.frameworkName;
        }
        return this._vars.data.frameworkName;
    }
    get connectionType() {
        if (this.localStorage.source) {
            return this.localStorage.source;
        }
        return this._vars.source;
    }
    set localStorage(val) {
        localStorage.setItem('env', JSON.stringify(val));
    }
    get localStorage() {
        const val = localStorage.getItem('env');
        if (val !== 'undefined' && val !== null) {
            return JSON.parse(localStorage.getItem('env') || `{"source":"online","data":{}}`);
        }
        return JSON.parse(`{"source":"online", "data":{}}`);
    }
    updateLocalStorage(val) {
        this.localStorage = val;
    }
    clearLocalStorage() {
        localStorage.removeItem('env');
        localStorage.removeItem('terms');
    }
    getConfigInfo() {
        return this._vars.data;
    }
}
LocalConnectionService.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "14.3.0", ngImport: i0, type: LocalConnectionService, deps: [], target: i0.ɵɵFactoryTarget.Injectable });
LocalConnectionService.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "14.3.0", ngImport: i0, type: LocalConnectionService, providedIn: 'root' });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "14.3.0", ngImport: i0, type: LocalConnectionService, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root'
                }]
        }], ctorParameters: function () { return []; } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibG9jYWwtY29ubmVjdGlvbi5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vcHJvamVjdHMvc2ItdGF4b25vbXktZWRpdG9yL3NyYy9saWIvc2VydmljZXMvbG9jYWwtY29ubmVjdGlvbi5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBVSxVQUFVLEVBQUUsTUFBTSxlQUFlLENBQUM7O0FBT25ELE1BQU0sT0FBTyxzQkFBc0I7SUFZL0I7UUFWUSxVQUFLLEdBQW9CO1lBQzdCLElBQUksRUFBRTtnQkFDRixRQUFRLEVBQUUsRUFBRTtnQkFDWixhQUFhLEVBQUUsRUFBRTtnQkFDakIsS0FBSyxFQUFFLEVBQUU7Z0JBQ1Qsa0JBQWtCLEVBQUUsS0FBSzthQUM1QjtZQUNELE1BQU0sRUFBRSxRQUFRO1NBQ25CLENBQUE7UUFHRyxNQUFNLEdBQUcsR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLFlBQVksQ0FBQyxPQUFPLENBQUMsYUFBYSxDQUFDLENBQUMsQ0FBQztRQUM1RCxJQUFJLEdBQUcsRUFBRTtZQUNMLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLFFBQVEsR0FBRyxHQUFHLENBQUMsR0FBRyxDQUFDO1lBQ25DLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLEtBQUssR0FBRyxHQUFHLENBQUMsS0FBSyxDQUFDO1lBQ2xDLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLGFBQWEsR0FBRyxHQUFHLENBQUMsYUFBYSxDQUFDO1lBQ2xELElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLGtCQUFrQixHQUFHLEdBQUcsQ0FBQyxrQkFBa0IsQ0FBQztTQUMvRDtJQUNMLENBQUM7SUFDRCxJQUFJLE1BQU07UUFDTixJQUFJLElBQUksQ0FBQyxZQUFZLENBQUMsSUFBSSxDQUFDLFFBQVEsRUFBRTtZQUNqQyxPQUFPLElBQUksQ0FBQyxZQUFZLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQTtTQUN6QztRQUNELE9BQU8sSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDO0lBQ3BDLENBQUM7SUFDRCxJQUFJLEtBQUs7UUFDTCxJQUFJLElBQUksQ0FBQyxZQUFZLENBQUMsSUFBSSxDQUFDLEtBQUssRUFBRTtZQUM5QixPQUFPLElBQUksQ0FBQyxZQUFZLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQTtTQUN0QztRQUNELE9BQU8sSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDO0lBQ2pDLENBQUM7SUFDRCxJQUFJLGFBQWE7UUFDYixJQUFJLElBQUksQ0FBQyxZQUFZLENBQUMsSUFBSSxDQUFDLGFBQWEsRUFBRTtZQUN0QyxPQUFPLElBQUksQ0FBQyxZQUFZLENBQUMsSUFBSSxDQUFDLGFBQWEsQ0FBQTtTQUM5QztRQUNELE9BQU8sSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsYUFBYSxDQUFDO0lBQ3pDLENBQUM7SUFDRCxJQUFJLGNBQWM7UUFDZCxJQUFJLElBQUksQ0FBQyxZQUFZLENBQUMsTUFBTSxFQUFFO1lBQzFCLE9BQU8sSUFBSSxDQUFDLFlBQVksQ0FBQyxNQUFNLENBQUE7U0FDbEM7UUFDRCxPQUFPLElBQUksQ0FBQyxLQUFLLENBQUMsTUFBTSxDQUFBO0lBQzVCLENBQUM7SUFDRCxJQUFJLFlBQVksQ0FBQyxHQUFvQjtRQUNqQyxZQUFZLENBQUMsT0FBTyxDQUFDLEtBQUssRUFBRSxJQUFJLENBQUMsU0FBUyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUE7SUFDcEQsQ0FBQztJQUNELElBQUksWUFBWTtRQUNaLE1BQU0sR0FBRyxHQUFHLFlBQVksQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDLENBQUE7UUFDdkMsSUFBSSxHQUFHLEtBQUssV0FBVyxJQUFJLEdBQUcsS0FBSyxJQUFJLEVBQUU7WUFDckMsT0FBTyxJQUFJLENBQUMsS0FBSyxDQUFDLFlBQVksQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDLElBQUksK0JBQStCLENBQUMsQ0FBQTtTQUNwRjtRQUNELE9BQU8sSUFBSSxDQUFDLEtBQUssQ0FBQyxnQ0FBZ0MsQ0FBQyxDQUFBO0lBQ3ZELENBQUM7SUFDRCxrQkFBa0IsQ0FBQyxHQUFvQjtRQUNuQyxJQUFJLENBQUMsWUFBWSxHQUFHLEdBQUcsQ0FBQTtJQUMzQixDQUFDO0lBQ0QsaUJBQWlCO1FBQ2IsWUFBWSxDQUFDLFVBQVUsQ0FBQyxLQUFLLENBQUMsQ0FBQTtRQUM5QixZQUFZLENBQUMsVUFBVSxDQUFDLE9BQU8sQ0FBQyxDQUFBO0lBQ3BDLENBQUM7SUFDRCxhQUFhO1FBQ1QsT0FBTyxJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQTtJQUMxQixDQUFDOzttSEFoRVEsc0JBQXNCO3VIQUF0QixzQkFBc0IsY0FGbkIsTUFBTTsyRkFFVCxzQkFBc0I7a0JBSGxDLFVBQVU7bUJBQUM7b0JBQ1IsVUFBVSxFQUFFLE1BQU07aUJBQ3JCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgSW5qZWN0LCBJbmplY3RhYmxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBJQ29ubmVjdGlvblR5cGUgfSBmcm9tICcuLi9tb2RlbHMvY29ubmVjdGlvbi10eXBlLm1vZGVsJztcbmltcG9ydCB7IEVOVklST05NRU5UIH0gZnJvbSAnLi9jb25uZWN0aW9uLnNlcnZpY2UnO1xuXG5ASW5qZWN0YWJsZSh7XG4gICAgcHJvdmlkZWRJbjogJ3Jvb3QnXG59KVxuZXhwb3J0IGNsYXNzIExvY2FsQ29ubmVjdGlvblNlcnZpY2Uge1xuXG4gICAgcHJpdmF0ZSBfdmFyczogSUNvbm5lY3Rpb25UeXBlID0ge1xuICAgICAgICBkYXRhOiB7XG4gICAgICAgICAgICBlbmRwb2ludDogJycsXG4gICAgICAgICAgICBmcmFtZXdvcmtOYW1lOiAnJyxcbiAgICAgICAgICAgIHRva2VuOiAnJyxcbiAgICAgICAgICAgIGlzQXBwcm92YWxSZXF1aXJlZDogZmFsc2VcbiAgICAgICAgfSxcbiAgICAgICAgc291cmNlOiAnb25saW5lJ1xuICAgIH1cblxuICAgIGNvbnN0cnVjdG9yKCkge1xuICAgICAgICBjb25zdCBlbnYgPSBKU09OLnBhcnNlKGxvY2FsU3RvcmFnZS5nZXRJdGVtKCdlbnZpcm9ubWVudCcpKTtcbiAgICAgICAgaWYgKGVudikge1xuICAgICAgICAgICAgdGhpcy5fdmFycy5kYXRhLmVuZHBvaW50ID0gZW52LnVybDtcbiAgICAgICAgICAgIHRoaXMuX3ZhcnMuZGF0YS50b2tlbiA9IGVudi50b2tlbjtcbiAgICAgICAgICAgIHRoaXMuX3ZhcnMuZGF0YS5mcmFtZXdvcmtOYW1lID0gZW52LmZyYW1ld29ya05hbWU7XG4gICAgICAgICAgICB0aGlzLl92YXJzLmRhdGEuaXNBcHByb3ZhbFJlcXVpcmVkID0gZW52LmlzQXBwcm92YWxSZXF1aXJlZDtcbiAgICAgICAgfVxuICAgIH1cbiAgICBnZXQgYXBpVXJsKCkge1xuICAgICAgICBpZiAodGhpcy5sb2NhbFN0b3JhZ2UuZGF0YS5lbmRwb2ludCkge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMubG9jYWxTdG9yYWdlLmRhdGEuZW5kcG9pbnRcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdGhpcy5fdmFycy5kYXRhLmVuZHBvaW50O1xuICAgIH1cbiAgICBnZXQgdG9rZW4oKSB7XG4gICAgICAgIGlmICh0aGlzLmxvY2FsU3RvcmFnZS5kYXRhLnRva2VuKSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5sb2NhbFN0b3JhZ2UuZGF0YS50b2tlblxuICAgICAgICB9XG4gICAgICAgIHJldHVybiB0aGlzLl92YXJzLmRhdGEudG9rZW47XG4gICAgfVxuICAgIGdldCBmcmFtZXdvcmtOYW1lKCkge1xuICAgICAgICBpZiAodGhpcy5sb2NhbFN0b3JhZ2UuZGF0YS5mcmFtZXdvcmtOYW1lKSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5sb2NhbFN0b3JhZ2UuZGF0YS5mcmFtZXdvcmtOYW1lXG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHRoaXMuX3ZhcnMuZGF0YS5mcmFtZXdvcmtOYW1lO1xuICAgIH1cbiAgICBnZXQgY29ubmVjdGlvblR5cGUoKSB7XG4gICAgICAgIGlmICh0aGlzLmxvY2FsU3RvcmFnZS5zb3VyY2UpIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLmxvY2FsU3RvcmFnZS5zb3VyY2VcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdGhpcy5fdmFycy5zb3VyY2VcbiAgICB9XG4gICAgc2V0IGxvY2FsU3RvcmFnZSh2YWw6IElDb25uZWN0aW9uVHlwZSkge1xuICAgICAgICBsb2NhbFN0b3JhZ2Uuc2V0SXRlbSgnZW52JywgSlNPTi5zdHJpbmdpZnkodmFsKSlcbiAgICB9XG4gICAgZ2V0IGxvY2FsU3RvcmFnZSgpOiBJQ29ubmVjdGlvblR5cGUge1xuICAgICAgICBjb25zdCB2YWwgPSBsb2NhbFN0b3JhZ2UuZ2V0SXRlbSgnZW52JylcbiAgICAgICAgaWYgKHZhbCAhPT0gJ3VuZGVmaW5lZCcgJiYgdmFsICE9PSBudWxsKSB7XG4gICAgICAgICAgICByZXR1cm4gSlNPTi5wYXJzZShsb2NhbFN0b3JhZ2UuZ2V0SXRlbSgnZW52JykgfHwgYHtcInNvdXJjZVwiOlwib25saW5lXCIsXCJkYXRhXCI6e319YClcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gSlNPTi5wYXJzZShge1wic291cmNlXCI6XCJvbmxpbmVcIiwgXCJkYXRhXCI6e319YClcbiAgICB9XG4gICAgdXBkYXRlTG9jYWxTdG9yYWdlKHZhbDogSUNvbm5lY3Rpb25UeXBlKSB7XG4gICAgICAgIHRoaXMubG9jYWxTdG9yYWdlID0gdmFsXG4gICAgfVxuICAgIGNsZWFyTG9jYWxTdG9yYWdlKCkge1xuICAgICAgICBsb2NhbFN0b3JhZ2UucmVtb3ZlSXRlbSgnZW52JylcbiAgICAgICAgbG9jYWxTdG9yYWdlLnJlbW92ZUl0ZW0oJ3Rlcm1zJylcbiAgICB9XG4gICAgZ2V0Q29uZmlnSW5mbygpe1xuICAgICAgICByZXR1cm4gdGhpcy5fdmFycy5kYXRhXG4gICAgfVxufVxuIl19