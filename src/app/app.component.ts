import { Component, OnInit } from '@angular/core';
// import { MenuItem } from 'primeng/api';
import { Row } from './model/row';
import { ConfirmationService } from 'primeng/api';

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
  newRow = new Row();
  clonedRows: { [id: number]: Row; } = {};

  constructor(private confirmationService: ConfirmationService) { }

  ngOnInit() {
    for (let i = 0; i < 100; i++) {
      this.rows.push({ id: i, description: 'description' + i, value: 'value' + i } as Row);
    }
  }

  copyRow(row: Row) {
    console.log('copy ' + row.id);
  }

  editRow(row: Row) {
    console.log('edit ' + row.id);

    this.clonedRows[row.id] = {...row};
  }

  updateRow(row: Row) {
    console.log('update ' + row.id);

    delete this.clonedRows[row.id];
  }

  cancelEditRow(row: Row, rowIndex: number) {
    console.log('cancel ' + rowIndex);

    this.rows[rowIndex] = this.clonedRows[row.id];
    delete this.clonedRows[row.id];
  }

  deleteRow(rowIndex: number) {
    this.confirmationService.confirm({
      message: 'Do you want to delete this record?',
      header: 'Delete Confirmation',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        console.log('delete ' + rowIndex);

        this.rows.splice(rowIndex, 1);
      }
    });
  }

  saveRows() {
    console.log('saveRows');
  }

  private generateNewId(): number {
    if (this.rows && this.rows.length > 0) {
      return Math.max(...this.rows.map(x => x.id)) + 1;
    } else {
      return 0;
    }
  }
}
