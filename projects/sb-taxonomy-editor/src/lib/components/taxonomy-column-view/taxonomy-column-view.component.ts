import { Component, EventEmitter, Input, OnChanges, OnDestroy, OnInit, Output, SimpleChanges } from '@angular/core';
import { FrameworkService } from '../../services/framework.service';
import { Subscription } from 'rxjs';
import { ConnectorService } from '../../services/connector.service';
import { ApprovalService } from '../../services/approval.service';
import { CardChecked, CardSelection, CardsCount, Card } from '../../models/variable-type.model';
declare var LeaderLine: any;
@Component({
  selector: 'lib-taxonomy-column-view',
  templateUrl: './taxonomy-column-view.component.html',
  styleUrls: ['./taxonomy-column-view.component.scss']
})
export class TaxonomyColumnViewComponent implements OnInit, OnDestroy, OnChanges {
  @Input() column: Card;
  @Input() containerId: string
  connectorMapping: any = {}
  @Output() updateTaxonomyTerm = new EventEmitter<{ selectedTerm: any, isSelected: boolean }>(true);
  @Output() updateTermList = new EventEmitter<CardChecked>();
  @Output() cardsCount = new EventEmitter<CardsCount>();
  columnData: Array<Card> = [];
  childSubscription: Subscription = null;
  newTermSubscription: Subscription = null;
  approvalTerm: any;
  termshafall: Array<Card> = [];
  constructor(
    private frameworkService: FrameworkService,
    private connectorService: ConnectorService,
    private approvalService : ApprovalService
  ) {
  }
  ngOnChanges(changes: SimpleChanges): void {}


  ngOnInit(): void {
   this.subscribeEvents()
    this.getApprovalList()
    this.connectorMapping = this.connectorService.connectorMap
  }
  getApprovalList(){
    if (this.column.index === 1) {
      this.approvalService.getUpdateList().subscribe((list:any) => {
        this.approvalTerm = list.filter(item => this.column.code === item.category)
        if(this.approvalTerm){
          this.approvalTerm.forEach((term, i)=> {
             this.column.children.forEach((lel,j) => {
                if(lel.identifier === term.identifier){
                  if(!this.isExists(term)){
                    this.termshafall.push(lel)
                  }
                }
             })
          })
          this.column.children.forEach((tr, i) => {
            if(!this.isExists(tr)){
              this.termshafall.push(tr)
            }
          })
          this.columnData = this.termshafall;
          this.cardsCount.emit({category: this.columnData[0].category,count:this.columnData.length});
        }
      })
    }
  }
 
  isExists(e){
    let temp = [];
    return temp.includes(e.identifier)
    temp = this.termshafall.map(t => t.identifier)
  }
  /* istanbul ignore next */
  subscribeEvents() {
    if (this.childSubscription) {
      this.childSubscription.unsubscribe()
    }
    this.childSubscription = this.frameworkService.currentSelection.subscribe(e => {
      if (!e) {
        return
      } else if (e.type === this.column.code) {
        this.updateTaxonomyTerm.emit({ isSelected: true, selectedTerm: e.data })
        this.columnData = (this.columnData || []).map(item => {
          if (item.code === e.data.code) {
            item.selected = true
          } else {
            item.selected = false
          }
          return item
        });
        this.setConnectors(e.cardRef, this.columnData, 'SINGLE')
        return
      } else {
        const next = this.frameworkService.getNextCategory(e.type);
        if (next && next.code === this.column.code) {
          setTimeout(() => {
            /* istanbul ignore next */
            this.setConnectors(e.cardRef, next && next.index < this.column.index ? [] : this.columnData, 'ALL')
          }, 100);
        }

        if (next && next.index < this.column.index) {
          this.columnData = [];
        }
      }
    })
    if (this.newTermSubscription) {
      this.newTermSubscription.unsubscribe()
    }
    this.newTermSubscription = this.frameworkService.insertUpdateDeleteNotifier.subscribe(e => {
      if (e && e.action) {
        const next = this.frameworkService.getNextCategory(e.action);
        if (this.column.code === next.code && e.type === 'select') {
          this.insertUpdateHandler(e, next)
        }
      }
    })
  }
  /* istanbul ignore next */
  insertUpdateHandler(e, next) {
    const back = this.frameworkService.getPreviousCategory(this.column.code)
    const localTerms = []
    this.frameworkService.getLocalTermsByCategory(this.column.code).forEach(f => {
      const selectedParent = back ? this.frameworkService.selectionList.get(back.code) : null; //can use current
      if (selectedParent && ((f.parent.code === selectedParent.code) || (f.parent.identifier && (f.parent.identifier === selectedParent.identifier)))) {
        localTerms.push(f.term)
      }
    })
    // get last parent and filter Above
    this.columnData = [...localTerms, ...(e.data.children || [])]
      .filter(x => {
        return x.category == this.column.code
      }).map(mer => {
        /**reset Next level children */
        this.column.children = this.column.children.map(col => { col.selected = false; return col })
        mer.selected = false
        mer.children = ([...this.column.children.filter(x => { return x.code === mer.code }).map(a => a.children)].shift() || [])
        return mer
      });

    if(this.columnData.length > 0) {
      this.cardsCount.emit({category: this.columnData[0].category,count:this.columnData.length});
    } else {
      this.cardsCount.emit({category: this.column.code,count: 0});
    }
  }
  updateSelection1(data: any) { }
  updateSelection(selection: any) {
    console.log(selection)
  }

  get columnItems() {
    return this.columnData
  }
  /* istanbul ignore next */
  setConnectors(elementClicked, columnItem, mode) {
    this.removeConnectors(elementClicked, 'box' + (this.column.index - 1), this.column.index - 1)
    if (mode === 'ALL') {
      const ids = columnItem.map((c, i) => {
        return this.column.code + 'Card' + (i + 1)
      })
       /* istanbul ignore  */
      this.connectorMapping['box' + (this.column.index - 1)] = { source: elementClicked, lines: (ids || []).map(id => { return { target: id, line: '', targetType: 'id' } }) }
      this.connectorService.updateConnectorsMap(this.connectorMapping)
      const connectionLines = this.connectorService._drawLine(
        this.connectorMapping['box' + (this.column.index - 1)].source,
        this.connectorMapping['box' + (this.column.index - 1)].lines,
        null,
        '#box' + (this.column.index - 1),
        '#box' + this.column.index
      )
      this.connectorMapping['box' + (this.column.index - 1)].lines = connectionLines
    } else {
      const item = this.column.children.findIndex(c => c.selected) + 1
       if (this.column.index > 1) {
        this.connectorMapping['box' + (this.column.index - 1)].lines = [{ target: elementClicked, line: '', targetType: 'element' }]
        this.connectorService.updateConnectorsMap(this.connectorMapping)
        const connectionLines = this.connectorService._drawLine(
          this.connectorMapping['box' + (this.column.index - 1)].source,
          this.connectorMapping['box' + (this.column.index - 1)].lines,
          null,
          '#box' + (this.column.index - 1),
          '#box' + this.column.index
        )
        this.connectorMapping['box' + (this.column.index - 1)].lines = connectionLines
      }
    }
    this.connectorService.updateConnectorsMap(this.connectorMapping)

  }
  /* istanbul ignore next */
  removeConnectors(currentElement, prevCol, currentIndex) {
    console.log('prevCol ------------', prevCol)
    if (this.connectorMapping) {
      for (const key in this.connectorMapping) {
        // Remove all n-1 lines and keep only current selection, also clear n+1 lines
        if (this.connectorMapping[key] && this.connectorMapping[key].lines && this.connectorMapping[key].lines.length > 0) {
          const lines = this.connectorMapping[key].lines
          lines.forEach(async (element, index) => {
            if (element != currentElement && prevCol == key) {
              await element.line && element.line.remove();
              lines.splice(index, 1);
            }
          });
          this.connectorMapping[key].lines = lines
        }

        // remove all n+2 lines, if clicks previous columns and tree was already drilled down
        let count = currentIndex + 2;
        let nextCol = `box${count}`
        if (this.connectorMapping[nextCol] && this.connectorMapping[nextCol].lines && this.connectorMapping[nextCol].lines.length > 0) {
          const lines = this.connectorMapping[nextCol].lines
          lines.forEach(async (element, index) => {
            await element.line && element.line.remove();
            lines.splice(index, 1);
          })
          this.connectorMapping[nextCol].lines = null
        }
      }

    }
  }
  selectedCard(event){
    this.updateTermList.emit(event);
  }

  ngOnDestroy(): void {
    if (this.childSubscription) {
      this.childSubscription.unsubscribe()
    }
  }
  
}