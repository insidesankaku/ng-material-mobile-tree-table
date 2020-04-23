import { NgModule } from '@angular/core';
import { MobileTreeTable } from './mobile-tree-table';
import { ColumnItem, ColumnLabel, ColumnValue } from './table-column-item';
import { TableHeaders } from './table-headers';
import { FlatTable } from './flat-table';
import { RowHeader } from './table-row-header';
import { BrowserModule } from '@angular/platform-browser';
import { MatListModule } from '@angular/material/list';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button'
import { MatIconModule } from '@angular/material/icon';

@NgModule({
    declarations: [
        MobileTreeTable,
        ColumnItem,
        ColumnLabel,
        ColumnValue,
        TableHeaders,
        FlatTable,
        RowHeader,
    ],
    imports: [
        BrowserModule,
        MatListModule,
        MatCardModule,
        MatButtonModule,
        MatIconModule,
    ],
    exports: [
        MobileTreeTable,
        ColumnItem,
        ColumnLabel,
        ColumnValue,
    ]
})
export class MobileTreeTableModule { }