import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FrameworkService } from '../../services/framework.service';
import { startWith, map } from 'rxjs/operators';
import { FormArray, FormControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs/internal/Observable';
// import { Identifiers } from '@angular/compiler';
import { NSFramework } from '../../models/framework.model';
import * as appConstants from '../../constants/app-constant';
import { labels } from '../../labels/strings';
import { CardChecked, CardSelection, CardsCount, Card } from '../../models/variable-type.model';

@Component({
  selector: 'lib-create-term',
  templateUrl: './create-term.component.html',
  styleUrls: ['./create-term.component.scss']
})

export class CreateTermComponent implements OnInit {
  name: string = '';
  termLists: Array<Card> = [];
  filtedTermLists: Observable<any[]>;
  createTermForm: FormGroup
  disableCreate: boolean = false;
  isTermExist: boolean = false;
  selectedTerm:Card = {};
  app_strings = labels;
  columnName:any;
  additionalProps: any;
   constructor(
    public dialogRef: MatDialogRef<CreateTermComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public frameWorkService: FrameworkService,
    private fb: FormBuilder
  ) { }

  ngOnInit() {
    this.termLists = this.data.columnInfo.children
    this.columnName = this.data.columnInfo.name;
    this.initTermForm()
    this.additionalProps = this.frameWorkService.getEnvironment().additionalProperties;
    console.log('env',this.frameWorkService.getEnvironment());
  }

  initTermForm() {
    this.createTermForm = this.fb.group({
      name: ['', [Validators.required]],
      description: [''],
      area: [''],
      type: ['']
    })
    this.filtedTermLists = this.createTermForm.get('name').valueChanges.pipe(
      startWith(''),
      map(value => this._filter(value || '')),
    );
  }

  private _filter(searchTxt: any): string[] {
    let isExist;
    this.disableCreate = false
    this.isTermExist = false
    this.createTermForm.get('description').enable()
    if(this.additionalProps?.includes(this.data?.columnInfo?.code)){
      this.createTermForm.get('area').enable()
      this.createTermForm.get('type').enable()
    }
    // this.createTermForm.get('description').patchValue('')
    const filterValue = typeof(searchTxt)==='object'? this._normalizeValue(searchTxt.name):this._normalizeValue(searchTxt);
    isExist = this.termLists.filter(term => this._normalizeValue(term.name).includes(filterValue));
    return isExist
  }

  private _normalizeValue(value: string): string {
    return value.toLowerCase().replace(/\s/g, '');
  }

  onSelect(term) {
    this.selectedTerm = term.value
    this.createTermForm.get('name').patchValue(term.value.name)
    this.createTermForm.get('description').patchValue(term.value.description)
    this.createTermForm.get('description').disable()
    if(term.value.category == this.data?.columnInfo?.code){
      this.createTermForm.get('area').patchValue(term.value.moreProperties?.competencyArea)
      this.createTermForm.get('area').disable()
      this.createTermForm.get('type').patchValue(term.value.moreProperties?.competencyType)
      this.createTermForm.get('type').disable()
    }
    
    this.disableCreate = true
  }

 saveTerm() {
      if(this._filter(this.createTermForm.value.name).length>0){
        this.isTermExist = true
        console.log('Already exist')
        return
      }
      if(this.createTermForm.valid) {
        const term:NSFramework.ICreateTerm =   {
          code:this.frameWorkService.getUuid(),
          name:this.createTermForm.value.name,
          description:this.createTermForm.value.description,
          status: appConstants.LIVE,
          approvalStatus:appConstants.DRAFT,
          parents:[
            {identifier:`${this.data.columnInfo.identifier}`}
          ],
          moreProperties:{
            competencyArea:this.createTermForm.value.area,
            competencyType: this.createTermForm.value.type
          }
        }
        const requestBody =  {
          request: {
            term: term
          }
        }
      
      this.frameWorkService.createTerm(this.data.frameworkId, this.data.columnInfo.code, requestBody).subscribe((res:any) => {
        requestBody.request.term['identifier'] = res.result.node_id[0]
        this.dialogClose({ term: requestBody.request.term, created: true })
        this.selectedTerm = requestBody.request.term
        this.updateTerm()
      })
    }
    }
  
  
  updateTerm() {
    let associations = []
    let temp
    let counter = 0
    let localIsExist = false
    this.frameWorkService.selectionList.forEach((parent, i) => {
      temp = parent.children ? parent.children.filter(child => child.identifier === this.selectedTerm.identifier) : null
      associations = parent.children ? parent.children.map(c => {
        return { identifier: c.identifier} // approvalStatus: c.associationProperties?c.associationProperties.approvalStatus: 'Draft'
      }) : [] 
      if(temp && temp.length) {
        this.isTermExist = true
        return
        } else { 
          counter++
          associations.push({ identifier: this.selectedTerm.identifier}) // approvalStatus: appConstants.DRAFT 
          this.isTermExist = false
          const reguestBody = {
          request: {
              term: {
                associations: [
                  ...associations  
                ]    
              }
            } 
          }
          // console.log('***************************',associations)
          // this.dialogClose({ term: this.selectedTerm, created: true })
          this.frameWorkService.updateTerm(this.data.frameworkId, parent.category, parent.code, reguestBody).subscribe((res: any) => {
            counter--;
            if(counter === 0 ) {
              // this.selectedTerm['associationProperties']['approvalStatus'] = 'Draft';
              this.dialogClose({ term: {...this.selectedTerm, ...{associationProperties:{approvalStatus:'Draft'}}}, created: true })
            }
          })
        }
    })
  }

  dialogClose(term) {
      this.frameWorkService.publishFramework().subscribe(res => {
        this.dialogRef.close(term);
      });
  }

}
