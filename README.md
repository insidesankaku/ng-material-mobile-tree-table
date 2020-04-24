# Angular Material Mobile Tree Table Component

[![Licence](https://img.shields.io/npm/l/ng-dynamic-component.svg?maxAge=2592000)](https://github.com/mlrv/ng-material-treetable/LICENSE)

What is this?
>This is a representation of a tree table for mobile devices. 

Why is this needed?
>Because it is hard to represent a table, especially a tree table on small screens.

What data source should I use?
```typescript
 [
     {
         foo: 'bar',
         ...
     },
     ...
 ]

 or

[
    {
        rowHeader: {},
        children: [
             rowHeader: {},
             children: [
               {
                foo: 'bar',
                  ...
                },
              ...
             ]
        ]
    },
    ...
]
```
 How many nesting levels could I use?
 > A LOT

 Can I customize it somehow?
 > You can use templates to customize columns, and formatter functions to customize rows

 ...

## Table of Contents

1. [Installation](#installation)
2. [How to use](#how-to-use)
3. [Complete example](#complete-example)

## Installation

> comming soon...

```typescript
import { MobileTreeTableModule } from 'mobile-tree-table';

@NgModule({
    ...
  imports: [
    ...
    MobileTreeTableModule
  ],
  ...
})
export class AppModule { }
```

```html
<mobile-tree-table [dataSource]="dataSource" [columnHeaders]="columnHeaders" [rowHeaders]="rowHeaders"></mobile-tree-table>
```

## How to use
```typescript
dataSource = [
    {
      rowHeader: { title: 'John Doe Delivery', income: 1000000 },
      children: [
        {
          rowHeader: { title: 'Food delivery', income: 300000 },
          children : [
            {
              title: 'pizza',
              type: 'diavola',
              amount: '2',
              price: '14'
            },
            {
              title: 'steak',
              type: 't-bone',
              amount: '5',
              price: '99'
            },
            {
              title: 'sushi',
              type: 'dragon-set',
              amount: '1',
              price: '50'
            },
          ]
        },
        {
          rowHeader: { title: 'E-delivery', income: 700000 },
          children: [
            {
              title: 'iphone',
              type: '10S',
              amount: '2',
              price: '999'
            },
            {
              title: 'macbook',
              type: 'X-123-45',
              amount: '1',
              price: '2999'
            },
          ],
        },
      ],
    },
  ];

   rowHeaders = ['title', 'income'];
   columnHeaders = ['title', 'type', 'amount', 'price'];
```
 
 User can customize column content using template-based approach

```html
<mobile-tree-table [dataSource]="dataSource" [columnHeaders]="columnHeaders" [rowHeaders]="rowHeaders">
  <column-item name="title">
    <div *columnLabel class="colored-title">title</div>
    <div *columnValue="let column">{{column.title}}</div>
  </column-item>

  <column-item name="type">
    <div *columnLabel>{{COLUMN_TYPE | translate}}</div>
    <div *columnValue="let column">{{column.type}}</div>
  </column-item>

  <column-item name="amount">
    <div *columnLabel>amount</div>
    <div *columnValue="let column" style="font-weight:bold">{{column.amount}}</div>
  </column-item>

  <column-item name="price">
    <div *columnLabel>price</div>
    <div *columnValue="let column">{{column.price | currency}}</div>
  </column-item>
</mobile-tree-table>
```

 Notice, that in this case user will see only columns that have templates. In case of no templates user will see all columns that were specified in `columnHeaders` property with default template

 ```html
  <div class="column-item">
     <div>column.key</div>
     <div>column.value</div>
  </div>
 ```

 To format rowHeaders user can use `rowHeaderFormatters` property

 ```typescript
  rowHeaderFormatters = {
    title: (name) => name.toUpperCase(),
    income: (value) =>  new CurrencyPipe('en').transform(value, 'USD')
  };
 ```

 To use static row header for every page user can use property `staticRowHeader`

 ```typescript
 staticRowHeader = {title: 'static header title', value: 'static header value'}
 ```

 In case of flat table `dataSource`

```typescript
dataSource = [
    {
      title: 'pizza',
      type: 'diavola',
      amount: '2',
      price: '14'
    },
    {
      title: 'steak',
      type: 't-bone',
      amount: '5',
      price: '99'
    }
]

 columnHeaders = ['title', 'type', 'amount', 'price'];
```

```html 
<mobile-tree-table [dataSource]="dataSource" [columnHeaders]="columnHeaders"
```

 ### Complete example

```html
<mobile-tree-table 
    [dataSource]="dataSource" 
    [columnHeaders]="columnHeaders" 
    [rowHeaders]="rowHeaders"
    [staticRowHeader]="staticRowHeader"
    [rowHeaderFormatters]="rowHeaderFormatters">

  <column-item name="title">
    <div *columnLabel>title</div>
    <div *columnValue="let column">{{column.title}}</div>
  </column-item>

  <column-item name="type">
    <div *columnLabel>type</div>
    <div *columnValue="let column">{{column.type}}</div>
  </column-item>

  <column-item name="amount">
    <div *columnLabel>amount</div>
    <div *columnValue="let column" style="font-weight:bold">{{column.amount}}</div>
  </column-item>

  <column-item name="price">
    <div *columnLabel>price</div>
    <div *columnValue="let column">{{column.price | currency}}</div>
  </column-item>
</mobile-tree-table>
```

```typescript
dataSource = [
    {
      rowHeader: { title: 'John Doe Delivery', income: 1000000 },
      children: [
        {
          rowHeader: { title: 'Food delivery', income: 300000 },
          children : [
            {
              title: 'pizza',
              type: 'diavola',
              amount: '2',
              price: '14'
            },
            {
              title: 'steak',
              type: 't-bone',
              amount: '5',
              price: '99'
            },
            {
              title: 'sushi',
              type: 'dragon-set',
              amount: '1',
              price: '50'
            },
          ]
        },
        {
          rowHeader: { title: 'E-delivery', income: 700000 },
          children: [
            {
              title: 'iphone',
              type: '10S',
              amount: '2',
              price: '999'
            },
            {
              title: 'macbook',
              type: 'X-123-45',
              amount: '1',
              price: '2999'
            },
          ],
        },
      ],
    },
  ];

  rowHeaders = ['title', 'income'];
  columnHeaders = ['title', 'type', 'amount', 'price'];
  staticRowHeader = {title: 'static header title', value: 'static header value'};
  rowHeaderFormatters = {
    title: (name) => name.toUpperCase(),
    income: (value) => new CurrencyPipe('en').transform(value, 'USD')
  };
 ```