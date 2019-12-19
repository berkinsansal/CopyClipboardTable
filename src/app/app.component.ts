import { Component, OnInit } from '@angular/core';
// import { MenuItem } from 'primeng/api';
import { Row } from './model/row';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  // https://github.com/berkinsansal/CopyClipboardTable
  // https://medium.com/angular-in-depth/chrome-extension-with-angular-why-and-how-778200b87575
  // https://developer.chrome.com/apps/storage
  // https://developer.chrome.com/apps/first_app
  // https://www.primefaces.org/primeng/#/inputtextarea
  // https://www.freecodecamp.org/news/how-to-get-dark-mode-working-with-css-740ad31e22e/

  // https://www.primefaces.org/primeng/#/table/crud ************

  // items: MenuItem[] = [{
  //   label: 'Delete', icon: 'pi pi-times', command: () => {
  //     this.delete();
  //   }
  // }];

  rows: Row[] = [];

  constructor() { }

  ngOnInit() {
    for (let i = 0; i < 100; i++) {
      this.rows.push({ description: 'description' + i, value: 'value' + i } as Row);
    }
  }

  copy(rowIndex: number) {
    console.log('copy ' + rowIndex);
  }

  edit(rowIndex: number) {
    console.log('edit ' + rowIndex);
  }

  delete(rowIndex: number) {
    console.log('delete ' + rowIndex);
  }

  saveRows() {
    console.log('saveRows');
  }
}
