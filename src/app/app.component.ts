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
                      description: '1',
                      iban: '2'
                    },
                    {
                      description: '3',
                      iban: '4'
                    },
                    {
                      description: '5',
                      iban: '6'
                    },
                    {
                      description: '7',
                      iban: '8'
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
              description: '01',
              iban: '02'
            },
            {
              description: '03',
              iban: '04'
            },
            {
              description: '05',
              iban: '06'
            },
            {
              description: '07',
              iban: '08'
            },
          ],
        },
      ],
    },
  ];

  rowHeaderFormatters = {
    name: (name) => name.toUpperCase(),
    totalAmount: (value) => {
      return new CurrencyPipe('en').transform(value, 'USD');
    }
  };
}
