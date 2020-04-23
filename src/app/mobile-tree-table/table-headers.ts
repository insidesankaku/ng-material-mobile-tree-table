import { Component, ChangeDetectionStrategy, Input, Output, EventEmitter } from "@angular/core";
import { TableElement, DefaultRowHeader } from './table-types';
import { TableElements } from './table-elements';

@Component({
    selector: 'table-headers',
    template: `
     <div class="table-headers">
      <row-header 
       [parent]="rowGroup.parent"
       [defaultRowHeader]="defaultRowHeader"
       [rowHeaders]="rowHeaders"
       [rowHeaderFormatters]="rowHeaderFormatters"></row-header>
     
        <mat-action-list class="table-headers-list">
           <button mat-list-item disableRipple class="table-header-item"
             *ngFor="let item of rowGroup.elements" (click)="selectElement(item)">
               <span matLine *ngFor="let key of rowHeaders; let i = index"
                 [ngClass]="{'title': i === 0, 'subtitle': i > 0}"> 
                  {{ rowHeaderFormatters[key] ? rowHeaderFormatters[key](item[key]) : item[key]}}
                 </span>
          
                 <i class="material-icons">chevron_right</i>
           </button>
         </mat-action-list>
     </div>
   `,
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TableHeaders<R, H> {
    @Input() rowGroup: TableElements;
    @Input() rowHeaders: Array<String>;
    @Input() rowHeaderFormatters: object;
    @Input() defaultRowHeader: DefaultRowHeader;
    @Output() elementSelection = new EventEmitter<TableElement>();

    public selectElement(item: TableElement): void {
        this.elementSelection.emit(item);
    }
}