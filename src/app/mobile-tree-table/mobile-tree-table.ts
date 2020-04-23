import { Component, OnInit, Input, ViewEncapsulation, ChangeDetectionStrategy, ContentChildren, QueryList } from '@angular/core';
import { TreeTable, TableElement, DefaultRowHeader } from './table-types';
import { ColumnItem } from './table-column-item';
import { BehaviorSubject, Subject } from 'rxjs';
import { takeUntil, skip } from 'rxjs/operators';
import { TableElements } from './table-elements';
import { TreeTableDataSource } from './tree-table-data-source';

@Component({
  selector: 'mobile-tree-table',
  host: {
    class: 'mobile-tree-table'
  },
  template: `
  <mat-card class="mat-elevation-z0">
    <button class="back-button" disableRipple mat-fab color="primary"
      *ngIf="selectedLevel > 0" (click)="back()">
      <mat-icon>chevron_left</mat-icon>
    </button>
  
    <table-headers 
     *ngIf="selectedElement.getLength() > 0 && selectedElement.isRowHeader()" 
     [rowGroup]="selectedElement"
     [rowHeaders]="rowHeaders" 
     [rowHeaderFormatters]="rowHeaderFormatters" 
     [defaultRowHeader]="defaultRowHeader"
     (elementSelection)="forth($event)">
    </table-headers>
  
    <flat-table 
     *ngIf="selectedElement.getLength() > 0 && !selectedElement.isRowHeader()" 
     [columnHeaders]="columnHeaders"
     [data]="selectedElement" 
     [rowHeaders]="rowHeaders" 
     [rowHeaderFormatters]="rowHeaderFormatters"
     [defaultRowHeader]="defaultRowHeader" 
     [rowTemplate]="rowTemplate">
   </flat-table>
  </mat-card>
`,
  styleUrls: ['./mobile-tree-table.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MobileTreeTable<R, H> implements OnInit {
  @Input() set dataSource(data: TreeTable<R, H>[]) {
    if (!data) {
      console.log('dataSource should be specified');
    } else if (!Array.isArray(data)) {
      console.log('dataSource should be an array');
    } else {
      this._dataSource.next(data);
    }
  }

  get dataSource(): TreeTable<R, H>[] {
    return this._dataSource.getValue();
  }

  @Input() rowHeaders: string[];
  @Input() rowHeaderFormatters: object = {};
  @Input() columnHeaders: string[];
  @Input() defaultRowHeader: DefaultRowHeader;

  @ContentChildren(ColumnItem) rowTemplate: QueryList<ColumnItem<R>>;

  public selectedElement: TableElements;
  public selectedLevel: number = 0;

  private _flatDataSource: TableElement[];
  private _dataSource = new BehaviorSubject<TreeTable<R, H>[]>([]);
  private _destroy = new Subject<void>();

  constructor() { }

  ngOnInit(): void {
    this.initView(this.dataSource);

    this._dataSource.pipe(skip(1), takeUntil(this._destroy))
      .subscribe((dataSource: TreeTable<R, H>[]) => this.initView(dataSource));
  }

  ngOnDestroy(): void {
    this._destroy.next();
    this._destroy.complete();
  }

  public forth($event: TableElement): void {
    this.selectedLevel++;

    this.updateView($event);
  }

  public back(): void {
    this.selectedLevel--;

    this.updateView(this.selectedElement.getParent());
  }

  private initView(dataSource): void {
    this._flatDataSource = TreeTableDataSource.flatten(dataSource);
    this.selectedLevel = 0;

    this.updateView();
  }

  private updateView(parent?: TableElement): void {
    const selectedElement = this.getSelectedElement(parent);

    this.selectedElement = new TableElements(selectedElement, parent);
  }

  private getSelectedElement(parent: TableElement): TableElement[] {
    const rowHeaders = this._flatDataSource.filter(item => item._isRowHeader && item._parent === parent);
    const elements = this._flatDataSource.filter(item => !item._isRowHeader && item._parent === parent);

    return [...rowHeaders, ...elements];
  }
}
