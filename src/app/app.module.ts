import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ClarityModule } from '@clr/angular';
import { HttpModule } from '@angular/http';
import { AppRoutingModule } from './app-routing.module';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { NavComponent } from './nav/nav.component';
import { TableComponent } from './table/table.component';
import { SummaryComponent } from './summary/summary.component';
import { HistoryComponent } from './history/history.component';

import { NvD3Module } from 'ng2-nvd3';


import { DatasourceService } from './datasource.service';
import { CommonService } from './common.service';
import { NestedTableComponent } from './nested-table/nested-table.component';

import { StatsTagComponent } from './shared/stats-tag/stats-tag.component';
import { StatsTag1Component } from './shared/stats-tag1/stats-tag1.component';

@NgModule({
  declarations: [
    AppComponent,
    NavComponent,
    TableComponent,
    SummaryComponent,
    HistoryComponent,
    NestedTableComponent,
    StatsTagComponent,
    StatsTag1Component
  ],
  imports: [
    AppRoutingModule,
    BrowserModule,
    ClarityModule.forRoot(),
    HttpModule,
    NvD3Module,
    FormsModule
  ],
  providers: [DatasourceService, CommonService],
  bootstrap: [AppComponent]
})
export class AppModule { }
