/* eslint-disable */
import { ElementRef, Injectable } from '@angular/core';
import { BehaviorSubject, of } from 'rxjs';
import { FrameworkService } from './framework.service';
import { defaultConfig } from '../constants/app-constant';
import { LLOptions } from '../constants/app-constant';

declare var LeaderLine: any;


@Injectable()
export class ConnectorService {
  connectorMap: any = {}
  elmWrapper: any

  constructor(private frameworkService: FrameworkService) {
    console.log('connectorMap -------', this.connectorMap)
  }

  _drawLine(source, target, options = defaultConfig, sourceContainerId = undefined, targetContainerId = undefined) {
    console.log('sourceContainerId ::', sourceContainerId)
    console.log('targetContainerId ::', targetContainerId)
    const _options = <LLOptions>{...defaultConfig, ...options}
    let _line;
    if (Array.isArray(target)) {
      let connectedDots = [];
      target.forEach((_target) => {
        const tempLine = this.renderLine(source, _target, _options)
        connectedDots.push(
        {
          target: _target, // ref element
          line: tempLine
        })
        if(sourceContainerId) {
          document.querySelector(sourceContainerId) && document.querySelector(sourceContainerId).addEventListener('scroll', () => {
            try{
              tempLine && tempLine.position();
            } catch(e) {
            }
          }, true);
        }
        if (targetContainerId) {
          document.querySelector(targetContainerId) && document.querySelector(targetContainerId).addEventListener('scroll', () => {
            try{
              tempLine && tempLine.position();
            } catch(e) {
            }
          }, true);
        }

      });
    return connectedDots;
    } else {
      _line = this.renderLine(source, target, _options);
    }
  }

  private renderLine(source, target, options: LLOptions) {
    let _options = {
      animOptions: { duration: 2000, timing: 'linear' },
      hide: true,
      // startSocketGravity: 50,
      // endSocketGravity: [-30, 50]
    };
    let _line
    if(target.targetType === 'id'){
      _line = new LeaderLine(source, document.getElementById(target.target), _options);
    }
    else {
      _line = new LeaderLine(source, target.target, _options);
    }

    _line.endPlugOutline = true;
    _line.startPlugOutline = true;
    _line.setOptions(options);
    _line.show('draw');
    return _line;
  }

  updateConnectorsMap(map){
    this.connectorMap = map
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
    if(this.connectorMap) {
      for (const key in this.connectorMap) {
        // Remove all n-1 lines and keep only current selection, also clear n+1 lines
        if(this.connectorMap[key] && this.connectorMap[key].lines && this.connectorMap[key].lines.length > 0) {
          const lines = this.connectorMap[key].lines
          lines.forEach(async (element, index) => {
              await element.line && element.line.remove();
              lines.splice(index, 1);
          });
          this.connectorMap[key].lines = lines
        }
      }
    }
    // to reset connector map after clearing all the lines
    this.updateConnectorsMap({})
  }
  
}