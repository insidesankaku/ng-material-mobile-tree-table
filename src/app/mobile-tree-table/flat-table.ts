import { Component, ChangeDetectionStrategy, Input, QueryList, OnInit } from "@angular/core";
import { ColumnItem } from './table-column-item';
import { TableElements } from './table-elements';
import { StaticRowHeader } from './table-types';

@Component({
    selector: 'flat-table',
    host: {
        class: 'flat-table'
    },
    template: `
     <row-header 
      [parent]="data.parent"
      [staticRowHeader]="staticRowHeader"
      [rowHeaders]="rowHeaders"
      [rowHeaderFormatters]="rowHeaderFormatters">
     </row-header>

     <ul class="flat-table-main" *ngIf="data.getLength() > 0">
       <li class="flat-table-row" *ngFor="let row of data.elements">
         <ul class="flat-table-row-content">

         <!--Default approach-->
           <ng-container *ngIf="columnTemplates.length === 0">
             <li class="flat-table-column" *ngFor="let column of columnHeaders">
               <div class="column-item">
                 <div>{{column}}</div>
                 <div>{{row[column]}}</div>
               </div>
             </li>
           </ng-container>

           <!--Template-based approach-->
           <ng-container *ngIf="columnTemplates.length > 0">
             <li class="flat-table-column" *ngFor="let column of columnTemplates">
               <ng-template *ngTemplateOutlet="column.template; context: {$implicit: row}"></ng-template>
             </li>
           </ng-container>

         </ul>
       </li>
    </ul>
    
     ` ,
     changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FlatTable<R> implements OnInit {
    @Input() data: TableElements;
    @Input() rowHeaders: Array<String>;
    @Input() rowHeaderFormatters: object;
    @Input() staticRowHeader: StaticRowHeader;
    @Input() columnHeaders: string[];
    @Input() rowTemplate: QueryList<ColumnItem<R>>;

    public columnTemplates: ColumnItem<R>[] = [];

    constructor() { }

    ngOnInit() {
      this.getColumnTemplates();
    }

    private getColumnTemplates() {
        if (Array.isArray(this.columnHeaders)) {
            this.columnTemplates = this.rowTemplate.filter(row => this.columnHeaders.includes(row.name));
          console.log(this);
          } else {
            console.log('columnHeaders must be an array');
        }
    }
}
