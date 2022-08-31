import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { BookmarkDetailComponentComponent } from './bookmark-detail-component/bookmark-detail-component.component';

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    BookmarkDetailComponentComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [DashboardComponent]
})
export class AppModule { }
