import { Component, ChangeDetectionStrategy, Input } from "@angular/core";
import { StaticRowHeader } from './table-types';

@Component({
  selector: 'row-header',
  template: `
    <header class="row-header-main" *ngIf="staticRowHeader">
      <span>{{staticRowHeader.title}}</span>
      <span>{{staticRowHeader.value}}</span>
    </header>
    
    <header class="row-header-main" *ngIf="parent && !staticRowHeader">
      <ng-container *ngFor="let key of rowHeaders">
        <span *ngIf="parent[key]">
         {{ rowHeaderFormatters[key] ? rowHeaderFormatters[key](parent[key]) : parent[key] }}
        </span>
      </ng-container>
    </header>
    ` ,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RowHeader {
  @Input() rowHeaders: Array<String>;
  @Input() rowHeaderFormatters: object;
  @Input() parent: any;
  @Input() staticRowHeader: StaticRowHeader;
}