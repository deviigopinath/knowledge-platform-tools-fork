/* eslint-disable */
import { Injectable } from '@angular/core';
import { defaultConfig } from '../constants/app-constant';
import * as i0 from "@angular/core";
import * as i1 from "./framework.service";
export class ConnectorService {
    // assuming following structure
    // {
    //   'box1': {
    //     source: ElementRef,
    //     lines: [
    //       {
    //         target:' card2 of box1', 
    //         line: '_line prototype object'
    //       }
    //     ]
    //   }
    // }
    constructor(frameworkService) {
        this.frameworkService = frameworkService;
        this.connectorMap = {};
        // this.frameworkService.list.forEach((list, index)=> {
        //   this.connectorMap['box'+list.index]= {}
        // })
        console.log('connectorMap -------', this.connectorMap);
    }
    _drawLine(source, target, options = defaultConfig, sourceContainerId = undefined, targetContainerId = undefined) {
        console.log('sourceContainerId ::', sourceContainerId);
        console.log('targetContainerId ::', targetContainerId);
        const _options = { ...defaultConfig, ...options };
        let _line;
        if (Array.isArray(target)) {
            // target.forEach((_target) => {
            //   _line = this.renderLine(source, _target, _options);
            // });
            let connectedDots = [];
            target.forEach((_target) => {
                const tempLine = this.renderLine(source, _target, _options);
                connectedDots.push({
                    target: _target,
                    line: tempLine
                });
                if (sourceContainerId) {
                    document.querySelector(sourceContainerId) && document.querySelector(sourceContainerId).addEventListener('scroll', () => {
                        try {
                            tempLine && tempLine.position();
                        }
                        catch (e) {
                            // console.log('Error')
                        }
                    }, true);
                }
                if (targetContainerId) {
                    document.querySelector(targetContainerId) && document.querySelector(targetContainerId).addEventListener('scroll', () => {
                        try {
                            tempLine && tempLine.position();
                        }
                        catch (e) {
                            // console.log('Error')
                        }
                    }, true);
                }
                // tempLine.show('draw')
            });
            return connectedDots;
        }
        else {
            _line = this.renderLine(source, target, _options);
        }
    }
    renderLine(source, target, options) {
        let _options = {
            animOptions: { duration: 2000, timing: 'linear' },
            hide: true,
            // startSocketGravity: 50,
            // endSocketGravity: [-30, 50]
        };
        let _line;
        if (target.targetType === 'id') {
            _line = new LeaderLine(source, document.getElementById(target.target), _options);
        }
        else {
            _line = new LeaderLine(source, target.target, _options);
        }
        _line.endPlugOutline = true;
        _line.startPlugOutline = true;
        // _line.positionByWindowResize = false;
        _line.setOptions(options);
        _line.show('draw');
        // this.elmWrapper.appendChild(document.querySelector('.leader-line:last-of-type'));
        // this.position(_line)
        return _line;
    }
    updateConnectorsMap(map) {
        this.connectorMap = map;
    }
    position(line) {
        this.elmWrapper.style.transform = 'none';
        var rectWrapper = this.elmWrapper.getBoundingClientRect();
        // Move to the origin of coordinates as the document
        this.elmWrapper.style.transform = 'translate(' +
            ((rectWrapper.left + pageXOffset) * -1) + 'px, ' +
            ((rectWrapper.top + pageYOffset) * -1) + 'px)';
        line.position();
    }
    removeAllLines() {
        if (this.connectorMap) {
            for (const key in this.connectorMap) {
                // Remove all n-1 lines and keep only current selection, also clear n+1 lines
                if (this.connectorMap[key] && this.connectorMap[key].lines && this.connectorMap[key].lines.length > 0) {
                    const lines = this.connectorMap[key].lines;
                    lines.forEach(async (element, index) => {
                        await element.line && element.line.remove();
                        lines.splice(index, 1);
                    });
                    this.connectorMap[key].lines = lines;
                }
            }
        }
        // to reset connector map after clearing all the lines
        this.updateConnectorsMap({});
    }
}
ConnectorService.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "14.3.0", ngImport: i0, type: ConnectorService, deps: [{ token: i1.FrameworkService }], target: i0.ɵɵFactoryTarget.Injectable });
ConnectorService.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "14.3.0", ngImport: i0, type: ConnectorService });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "14.3.0", ngImport: i0, type: ConnectorService, decorators: [{
            type: Injectable
        }], ctorParameters: function () { return [{ type: i1.FrameworkService }]; } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29ubmVjdG9yLnNlcnZpY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi9wcm9qZWN0cy9zYi10YXhvbm9teS1lZGl0b3Ivc3JjL2xpYi9zZXJ2aWNlcy9jb25uZWN0b3Iuc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxvQkFBb0I7QUFDcEIsT0FBTyxFQUFjLFVBQVUsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUd2RCxPQUFPLEVBQUUsYUFBYSxFQUFFLE1BQU0sMkJBQTJCLENBQUM7OztBQU8xRCxNQUFNLE9BQU8sZ0JBQWdCO0lBRzNCLCtCQUErQjtJQUMvQixJQUFJO0lBQ0osY0FBYztJQUNkLDBCQUEwQjtJQUMxQixlQUFlO0lBQ2YsVUFBVTtJQUNWLG9DQUFvQztJQUNwQyx5Q0FBeUM7SUFDekMsVUFBVTtJQUNWLFFBQVE7SUFDUixNQUFNO0lBQ04sSUFBSTtJQUVKLFlBQW9CLGdCQUFrQztRQUFsQyxxQkFBZ0IsR0FBaEIsZ0JBQWdCLENBQWtCO1FBZnRELGlCQUFZLEdBQVEsRUFBRSxDQUFBO1FBZ0JwQix1REFBdUQ7UUFDdkQsNENBQTRDO1FBQzVDLEtBQUs7UUFDTCxPQUFPLENBQUMsR0FBRyxDQUFDLHNCQUFzQixFQUFFLElBQUksQ0FBQyxZQUFZLENBQUMsQ0FBQTtJQUN4RCxDQUFDO0lBRUQsU0FBUyxDQUFDLE1BQU0sRUFBRSxNQUFNLEVBQUUsT0FBTyxHQUFHLGFBQWEsRUFBRSxpQkFBaUIsR0FBRyxTQUFTLEVBQUUsaUJBQWlCLEdBQUcsU0FBUztRQUM3RyxPQUFPLENBQUMsR0FBRyxDQUFDLHNCQUFzQixFQUFFLGlCQUFpQixDQUFDLENBQUE7UUFDdEQsT0FBTyxDQUFDLEdBQUcsQ0FBQyxzQkFBc0IsRUFBRSxpQkFBaUIsQ0FBQyxDQUFBO1FBQ3RELE1BQU0sUUFBUSxHQUFjLEVBQUMsR0FBRyxhQUFhLEVBQUUsR0FBRyxPQUFPLEVBQUMsQ0FBQTtRQUMxRCxJQUFJLEtBQUss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R0FBRyxDQUFDLENBQUMsS0FBSyxHQUFHLEtBQUssQ0FBQTtpQkFDckM7YUFDRjtTQUNGO1FBQ0Qsc0RBQXNEO1FBQ3RELElBQUksQ0FBQyxtQkFBbUIsQ0FBQyxFQUFFLENBQUMsQ0FBQTtJQUM5QixDQUFDOzs2R0ExSFUsZ0JBQWdCO2lIQUFoQixnQkFBZ0I7MkZBQWhCLGdCQUFnQjtrQkFENUIsVUFBVSIsInNvdXJjZXNDb250ZW50IjpbIi8qIGVzbGludC1kaXNhYmxlICovXG5pbXBvcnQgeyBFbGVtZW50UmVmLCBJbmplY3RhYmxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBCZWhhdmlvclN1YmplY3QsIG9mIH0gZnJvbSAncnhqcyc7XG5pbXBvcnQgeyBGcmFtZXdvcmtTZXJ2aWNlIH0gZnJvbSAnLi9mcmFtZXdvcmsuc2VydmljZSc7XG5pbXBvcnQgeyBkZWZhdWx0Q29uZmlnIH0gZnJvbSAnLi4vY29uc3RhbnRzL2FwcC1jb25zdGFudCc7XG5pbXBvcnQgeyBMTE9wdGlvbnMgfSBmcm9tICcuLi9jb25zdGFudHMvYXBwLWNvbnN0YW50JztcblxuZGVjbGFyZSB2YXIgTGVhZGVyTGluZTogYW55O1xuXG5cbkBJbmplY3RhYmxlKClcbmV4cG9ydCBjbGFzcyBDb25uZWN0b3JTZXJ2aWNlIHtcbiAgY29ubmVjdG9yTWFwOiBhbnkgPSB7fVxuICBlbG1XcmFwcGVyOiBhbnlcbiAgLy8gYXNzdW1pbmcgZm9sbG93aW5nIHN0cnVjdHVyZVxuICAvLyB7XG4gIC8vICAgJ2JveDEnOiB7XG4gIC8vICAgICBzb3VyY2U6IEVsZW1lbnRSZWYsXG4gIC8vICAgICBsaW5lczogW1xuICAvLyAgICAgICB7XG4gIC8vICAgICAgICAgdGFyZ2V0OicgY2FyZDIgb2YgYm94MScsIFxuICAvLyAgICAgICAgIGxpbmU6ICdfbGluZSBwcm90b3R5cGUgb2JqZWN0J1xuICAvLyAgICAgICB9XG4gIC8vICAgICBdXG4gIC8vICAgfVxuICAvLyB9XG5cbiAgY29uc3RydWN0b3IocHJpdmF0ZSBmcmFtZXdvcmtTZXJ2aWNlOiBGcmFtZXdvcmtTZXJ2aWNlKSB7IFxuICAgIC8vIHRoaXMuZnJhbWV3b3JrU2VydmljZS5saXN0LmZvckVhY2goKGxpc3QsIGluZGV4KT0+IHtcbiAgICAvLyAgIHRoaXMuY29ubmVjdG9yTWFwWydib3gnK2xpc3QuaW5kZXhdPSB7fVxuICAgIC8vIH0pXG4gICAgY29uc29sZS5sb2coJ2Nvbm5lY3Rvck1hcCAtLS0tLS0tJywgdGhpcy5jb25uZWN0b3JNYXApXG4gIH1cblxuICBfZHJhd0xpbmUoc291cmNlLCB0YXJnZXQsIG9wdGlvbnMgPSBkZWZhdWx0Q29uZmlnLCBzb3VyY2VDb250YWluZXJJZCA9IHVuZGVmaW5lZCwgdGFyZ2V0Q29udGFpbmVySWQgPSB1bmRlZmluZWQpIHtcbiAgICBjb25zb2xlLmxvZygnc291cmNlQ29udGFpbmVySWQgOjonLCBzb3VyY2VDb250YWluZXJJZClcbiAgICBjb25zb2xlLmxvZygndGFyZ2V0Q29udGFpbmVySWQgOjonLCB0YXJnZXRDb250YWluZXJJZClcbiAgICBjb25zdCBfb3B0aW9ucyA9IDxMTE9wdGlvbnM+ey4uLmRlZmF1bHRDb25maWcsIC4uLm9wdGlvbnN9XG4gICAgbGV0IF9saW5lO1xuICAgIGlmIChBcnJheS5pc0FycmF5KHRhcmdldCkpIHtcbiAgICAgIC8vIHRhcmdldC5mb3JFYWNoKChfdGFyZ2V0KSA9PiB7XG4gICAgICAvLyAgIF9saW5lID0gdGhpcy5yZW5kZXJMaW5lKHNvdXJjZSwgX3RhcmdldCwgX29wdGlvbnMpO1xuICAgICAgLy8gfSk7XG4gICAgICBsZXQgY29ubmVjdGVkRG90cyA9IFtdO1xuICAgICAgdGFyZ2V0LmZvckVhY2goKF90YXJnZXQpID0+IHtcbiAgICAgICAgY29uc3QgdGVtcExpbmUgPSB0aGlzLnJlbmRlckxpbmUoc291cmNlLCBfdGFyZ2V0LCBfb3B0aW9ucylcbiAgICAgICAgY29ubmVjdGVkRG90cy5wdXNoKFxuICAgICAgICB7XG4gICAgICAgICAgdGFyZ2V0OiBfdGFyZ2V0LCAvLyByZWYgZWxlbWVudFxuICAgICAgICAgIGxpbmU6IHRlbXBMaW5lXG4gICAgICAgIH0pXG4gICAgICAgIGlmKHNvdXJjZUNvbnRhaW5lcklkKSB7XG4gICAgICAgICAgZG9jdW1lbnQucXVlcnlTZWxlY3Rvcihzb3VyY2VDb250YWluZXJJZCkgJiYgZG9jdW1lbnQucXVlcnlTZWxlY3Rvcihzb3VyY2VDb250YWluZXJJZCkuYWRkRXZlbnRMaXN0ZW5lcignc2Nyb2xsJywgKCkgPT4ge1xuICAgICAgICAgICAgdHJ5e1xuICAgICAgICAgICAgICB0ZW1wTGluZSAmJiB0ZW1wTGluZS5wb3NpdGlvbigpO1xuICAgICAgICAgICAgfSBjYXRjaChlKSB7XG4gICAgICAgICAgICAgIC8vIGNvbnNvbGUubG9nKCdFcnJvcicpXG4gICAgICAgICAgICB9XG4gICAgICAgICAgfSwgdHJ1ZSk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHRhcmdldENvbnRhaW5lcklkKSB7XG4gICAgICAgICAgZG9jdW1lbnQucXVlcnlTZWxlY3Rvcih0YXJnZXRDb250YWluZXJJZCkgJiYgZG9jdW1lbnQucXVlcnlTZWxlY3Rvcih0YXJnZXRDb250YWluZXJJZCkuYWRkRXZlbnRMaXN0ZW5lcignc2Nyb2xsJywgKCkgPT4ge1xuICAgICAgICAgICAgdHJ5e1xuICAgICAgICAgICAgICB0ZW1wTGluZSAmJiB0ZW1wTGluZS5wb3NpdGlvbigpO1xuICAgICAgICAgICAgfSBjYXRjaChlKSB7XG4gICAgICAgICAgICAgIC8vIGNvbnNvbGUubG9nKCdFcnJvcicpXG4gICAgICAgICAgICB9XG4gICAgICAgICAgfSwgdHJ1ZSk7XG4gICAgICAgIH1cbiAgICAgICAgLy8gdGVtcExpbmUuc2hvdygnZHJhdycpXG5cbiAgICAgIH0pO1xuICAgIHJldHVybiBjb25uZWN0ZWREb3RzO1xuICAgIH0gZWxzZSB7XG4gICAgICBfbGluZSA9IHRoaXMucmVuZGVyTGluZShzb3VyY2UsIHRhcmdldCwgX29wdGlvbnMpO1xuICAgIH1cbiAgfVxuXG4gIHByaXZhdGUgcmVuZGVyTGluZShzb3VyY2UsIHRhcmdldCwgb3B0aW9uczogTExPcHRpb25zKSB7XG4gICAgbGV0IF9vcHRpb25zID0ge1xuICAgICAgYW5pbU9wdGlvbnM6IHsgZHVyYXRpb246IDIwMDAsIHRpbWluZzogJ2xpbmVhcicgfSxcbiAgICAgIGhpZGU6IHRydWUsXG4gICAgICAvLyBzdGFydFNvY2tldEdyYXZpdHk6IDUwLFxuICAgICAgLy8gZW5kU29ja2V0R3Jhdml0eTogWy0zMCwgNTBdXG4gICAgfTtcbiAgICBsZXQgX2xpbmVcbiAgICBpZih0YXJnZXQudGFyZ2V0VHlwZSA9PT0gJ2lkJyl7XG4gICAgICBfbGluZSA9IG5ldyBMZWFkZXJMaW5lKHNvdXJjZSwgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQodGFyZ2V0LnRhcmdldCksIF9vcHRpb25zKTtcbiAgICB9XG4gICAgZWxzZSB7XG4gICAgICBfbGluZSA9IG5ldyBMZWFkZXJMaW5lKHNvdXJjZSwgdGFyZ2V0LnRhcmdldCwgX29wdGlvbnMpO1xuICAgIH1cblxuICAgIF9saW5lLmVuZFBsdWdPdXRsaW5lID0gdHJ1ZTtcbiAgICBfbGluZS5zdGFydFBsdWdPdXRsaW5lID0gdHJ1ZTtcbiAgICAvLyBfbGluZS5wb3NpdGlvbkJ5V2luZG93UmVzaXplID0gZmFsc2U7XG4gICAgX2xpbmUuc2V0T3B0aW9ucyhvcHRpb25zKTtcbiAgICBfbGluZS5zaG93KCdkcmF3Jyk7XG4gICAgLy8gdGhpcy5lbG1XcmFwcGVyLmFwcGVuZENoaWxkKGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5sZWFkZXItbGluZTpsYXN0LW9mLXR5cGUnKSk7XG4gICAgLy8gdGhpcy5wb3NpdGlvbihfbGluZSlcbiAgICByZXR1cm4gX2xpbmU7XG4gIH1cblxuICB1cGRhdGVDb25uZWN0b3JzTWFwKG1hcCl7XG4gICAgdGhpcy5jb25uZWN0b3JNYXAgPSBtYXBcbiAgfVxuXG4gIHBvc2l0aW9uKGxpbmUpIHtcbiAgICB0aGlzLmVsbVdyYXBwZXIuc3R5bGUudHJhbnNmb3JtID0gJ25vbmUnO1xuICAgIHZhciByZWN0V3JhcHBlciA9IHRoaXMuZWxtV3JhcHBlci5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKTtcbiAgICAvLyBNb3ZlIHRvIHRoZSBvcmlnaW4gb2YgY29vcmRpbmF0ZXMgYXMgdGhlIGRvY3VtZW50XG4gICAgdGhpcy5lbG1XcmFwcGVyLnN0eWxlLnRyYW5zZm9ybSA9ICd0cmFuc2xhdGUoJyArXG4gICAgICAoKHJlY3RXcmFwcGVyLmxlZnQgKyBwYWdlWE9mZnNldCkgKiAtMSkgKyAncHgsICcgK1xuICAgICAgKChyZWN0V3JhcHBlci50b3AgKyBwYWdlWU9mZnNldCkgKiAtMSkgKyAncHgpJztcbiAgICBsaW5lLnBvc2l0aW9uKCk7XG4gIH1cblxuICByZW1vdmVBbGxMaW5lcygpIHtcbiAgICBpZih0aGlzLmNvbm5lY3Rvck1hcCkge1xuICAgICAgZm9yIChjb25zdCBrZXkgaW4gdGhpcy5jb25uZWN0b3JNYXApIHtcbiAgICAgICAgLy8gUmVtb3ZlIGFsbCBuLTEgbGluZXMgYW5kIGtlZXAgb25seSBjdXJyZW50IHNlbGVjdGlvbiwgYWxzbyBjbGVhciBuKzEgbGluZXNcbiAgICAgICAgaWYodGhpcy5jb25uZWN0b3JNYXBba2V5XSAmJiB0aGlzLmNvbm5lY3Rvck1hcFtrZXldLmxpbmVzICYmIHRoaXMuY29ubmVjdG9yTWFwW2tleV0ubGluZXMubGVuZ3RoID4gMCkge1xuICAgICAgICAgIGNvbnN0IGxpbmVzID0gdGhpcy5jb25uZWN0b3JNYXBba2V5XS5saW5lc1xuICAgICAgICAgIGxpbmVzLmZvckVhY2goYXN5bmMgKGVsZW1lbnQsIGluZGV4KSA9PiB7XG4gICAgICAgICAgICAgIGF3YWl0IGVsZW1lbnQubGluZSAmJiBlbGVtZW50LmxpbmUucmVtb3ZlKCk7XG4gICAgICAgICAgICAgIGxpbmVzLnNwbGljZShpbmRleCwgMSk7XG4gICAgICAgICAgfSk7XG4gICAgICAgICAgdGhpcy5jb25uZWN0b3JNYXBba2V5XS5saW5lcyA9IGxpbmVzXG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gICAgLy8gdG8gcmVzZXQgY29ubmVjdG9yIG1hcCBhZnRlciBjbGVhcmluZyBhbGwgdGhlIGxpbmVzXG4gICAgdGhpcy51cGRhdGVDb25uZWN0b3JzTWFwKHt9KVxuICB9XG4gIFxuICAvLyBfZHJhd0hlYWRlckxpbmUoc291cmNlLCB0YXJnZXQsIG9wdGlvbnMgPSBkZWZhdWx0Q29uZmlnKSB7XG4gIC8vICAgY29uc29sZS5sb2coc291cmNlLHRhcmdldCxvcHRpb25zKTtcbiAgLy8gICBuZXcgTGVhZGVyTGluZShzb3VyY2UsIHRhcmdldCwgb3B0aW9ucyk7XG4gIC8vIH1cbn0iXX0=