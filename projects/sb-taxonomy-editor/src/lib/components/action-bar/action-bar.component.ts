import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { FrameworkService } from '../../services/framework.service';
import { labels } from '../../labels/strings';

@Component({
  selector: 'lib-action-bar',
  templateUrl: './action-bar.component.html',
  styleUrls: ['./action-bar.component.scss']
})
export class ActionBarComponent {
  @Input() actionType;
  @Input() configType;
  @Output() sendApproval = new EventEmitter();
  @Output() closeAction = new EventEmitter();
  app_strings: any = labels;
  approvalBtnText:string = '';
  constructor(private frameworkService: FrameworkService) { }

  ngOnInit(){}

  sendForApproval(){
      this.sendApproval.emit('')
  }

  closeActionBar(){
    this.closeAction.emit('')
  }
  getApproveLevelText(res){
    if(!res) { return }
    return `Approve ${res.substr(res.lastIndexOf('_')+1,res.length)}`
  }
}
