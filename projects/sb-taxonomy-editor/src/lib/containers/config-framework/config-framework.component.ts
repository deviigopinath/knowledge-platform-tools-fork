import { Component, OnInit } from '@angular/core';
import { FrameworkService } from '../../services/framework.service';
import { categoryRepresentations, categoryRepresentationsV1 } from '../../constants/data'
declare var LeaderLine: any;

@Component({
  selector: 'lib-config-framework',
  templateUrl: './config-framework.component.html',
  styleUrls: ['./config-framework.component.scss']
})
export class ConfigFrameworkComponent implements OnInit {
  frameworkCategories;
  categoriesRepresentations = [];
  tempCategoryRepresentaions = []
  oldElements = []
  constructor(private frameworkService: FrameworkService) { }

  ngOnInit() {
    this.frameworkService.getFrameworkInfo()?.subscribe(res => {
      console.log('Service...',res)
      this.frameworkCategories = res.result.framework.categories
    })
  }

  updateCategory(name){
    this.removeOldLine()
    this.tempCategoryRepresentaions.push(
          {
            name: name,
            terms:this.updateTermArry(name,  this.categoriesRepresentations[this.categoriesRepresentations.length -1], this.categoriesRepresentations.length)
          }
    )
    this.categoriesRepresentations = [...this.tempCategoryRepresentaions]
}

  updateTermArry(current, parent, index){
    let term = []
    if(index%2 === 0) {
      term = [
        {
          name:`${current} 1`,
          domId:`${current}1`
        },
        {
          name: `${current} 2`,
          selected:true,
          connected:true,
          domId:`${current.toLowerCase()}2`,
          parent:parent ? `${parent.terms[0].domId}`:''
        }
      ]
    } else {
      term = [
        {
          name:`${current} 1`,
          selected:true,
          connected:true,
          domId:`${current.toLowerCase()}1`,
          parent:parent?`${parent.terms[1].domId}`:''
        },
        {
          name: `${current} 2`,
          domId:`${current}2`
        }
      ]
    }
    return term
  }

  removeOldLine() {
    const eles = document.getElementsByClassName('leader-line') as HTMLCollectionOf<Element>;
    if (eles.length > 0) {
        Array.prototype.forEach.call(eles, (ele: Element) => ele.remove());
    }
}

  removeCategory(index){
    this.categoriesRepresentations.splice(index,1)
    const temp = [...this.categoriesRepresentations]
    this.categoriesRepresentations = []
    this.tempCategoryRepresentaions = []
    temp.forEach(cat => {
      this.updateCategory(cat.name)
    })
  }

  changePosition(event) {
    let myArray = [...this.tempCategoryRepresentaions];
    myArray[event.cur] = myArray.splice(event.prev, 1, myArray[event.cur])[0];
    this.categoriesRepresentations = []
    this.tempCategoryRepresentaions = []
    myArray.forEach(cat => {
      this.updateCategory(cat.name)
    })
  }

}
