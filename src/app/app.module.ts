import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { environment } from 'src/environments/environment'
import { SbTaxonomyEditorModule } from '../../projects/sb-taxonomy-editor/src/lib/sb-taxonomy-editor.module'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    SbTaxonomyEditorModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
