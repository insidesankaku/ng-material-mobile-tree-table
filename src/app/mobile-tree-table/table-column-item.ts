import {
    Component,
    ContentChild,
    Directive,
    Input,
    ViewChild,
    TemplateRef,
    ChangeDetectionStrategy,
    OnInit
} from '@angular/core'

@Directive({
    selector: '[columnValue]'
})
export class ColumnValue { }

@Directive({
    selector: '[columnLabel]'
})
export class ColumnLabel { }

@Component({
    selector: 'column-item',
    template: `
    <ng-template #columnItem let-default>
       <div class="column-item">
          <ng-template *ngTemplateOutlet="columnItemLabel"></ng-template>
          <ng-template *ngTemplateOutlet="columnItemValue; context:{$implicit: default}"></ng-template>
       </div>
    </ng-template>
    `,
    changeDetection: ChangeDetectionStrategy.OnPush,
})

export class ColumnItem<R> implements OnInit {
    @Input() name: string;
    @ViewChild('columnItem', { static: true }) template: TemplateRef<R>
    @ContentChild(ColumnLabel, { read: TemplateRef, static: true }) columnItemLabel: TemplateRef<R>;
    @ContentChild(ColumnValue, { read: TemplateRef, static: true }) columnItemValue: TemplateRef<R>;

    ngOnInit() {
        console.log(this);
    }
}