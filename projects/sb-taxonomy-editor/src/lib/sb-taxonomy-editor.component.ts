import { AfterViewInit, Component, Input, OnInit } from '@angular/core';
import { FrameworkService } from './services/framework.service';

@Component({
  selector: 'sb-taxonomy-editor',
  template: `
        <router-outlet></router-outlet>
  `,
  styles: [
  ]
})
export class SbTaxonomyEditorComponent implements OnInit {
  
  @Input() environment:any;
  @Input() taxonomyConfig: any;

  constructor(private frameworkService: FrameworkService) { }

  ngOnInit() {
    this.frameworkService.updateEnvironment(this.environment);
    this.frameworkService.setConfig(this.taxonomyConfig);
  }
}
