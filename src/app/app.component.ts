import { Component } from '@angular/core';
import { CurrencyPipe } from '@angular/common';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  dataSource = [
    {
      rowHeader: { name: 'foo1', totalAmount: 123 },
      children: [
        {
          rowHeader: { name: 'foo1 foo2', totalAmount: 1234567 },
          children : [
            {
              rowHeader: { name: 'foo1 foo2 foo3', totalAmount: 111111 },
              children: [
                {
                  rowHeader: { name: 'foo1 foo2 foo3 foo4', totalAmount: 111111 },
                  children: [
                    {
                      bar: '1',
                      foobar: '2'
                    },
                    {
                      bar: '3',
                      foobar: '4'
                    },
                    {
                      bar: '5',
                      foobar: '6'
                    },
                    {
                      bar: '7',
                      foobar: '8'
                    },
                  ]
                }
              ]
            }
          ]
        },
        {
          rowHeader: { name: 'foo1 foo3', totalAmount: 123 },
          children: [
            {
              bar: '01',
              foobar: '02'
            },
            {
              bar: '03',
              foobar: '04'
            },
            {
              bar: '05',
              foobar: '06'
            },
            {
              bar: '07',
              foobar: '08'
            },
          ],
        },
      ],
    },
  ];

  rowHeaderFormatters = {
    name: (name) => name.toUpperCase(),
    totalAmount: (value) =>  new CurrencyPipe('en').transform(value, 'USD')
  };
}
