import { Component, OnInit, ViewChild } from '@angular/core';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Table } from 'primeng/table';
import { Column } from './model/column';
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

  // https://www.primefaces.org/primeng/#/table/state ***********
  // https://www.primefaces.org/primeng/#/table/rowgroup ********
  // https://www.primefaces.org/primeng/#/table/crud ************

  // items: MenuItem[] = [{
  //   label: 'Delete', icon: 'pi pi-times', command: () => {
  //     this.delete();
  //   }
  // }];

  @ViewChild(Table, { static: false }) table: Table;

  columns: Column[] = [];
  rows: Row[] = [];
  newRow: Row = null;
  clonedRows: { [id: number]: Row; } = {};

  constructor(
    private confirmationService: ConfirmationService,
    private messageService: MessageService
  ) { }

  ngOnInit() {
    this.columns.push({ id: 0, header: '', width: '60px', resizableColumnDisabled: true } as Column);
    this.columns.push({ id: 1, header: 'Description', width: '350px', resizableColumnDisabled: false } as Column);
    this.columns.push({ id: 2, header: 'Value', width: '350px', resizableColumnDisabled: true } as Column);
    this.columns.push({ id: 3, header: '', width: '', resizableColumnDisabled: true } as Column);

    // below line is for personal need :)
    this.rows.push({ id: 1001, description: 'MR Comment', value: '@begum.sozer @gorkem.kata   '});
    this.rows.push({ id: 1002, description: 'Branch Prefix', value: 'feature/pssde/'});
    this.rows.push({ id: 1003, description: 'Branch Prefix PSSDE', value: 'feature/pssde/PSSDE-'});

    for (let i = 0; i < 10; i++) {
      this.rows.push({ id: i, description: 'description' + i, value: 'value' + i } as Row);
    }
  }

  addNewRow() {
    if (!this.newRow) {
      this.newRow = new Row();
    } else {
      this.newRow.id = this.generateNewId();
      this.rows.push(this.newRow);
      this.newRow = null;
    }
  }

  cancelAddNewRow() {
    this.newRow = null;
  }

  copyRow(row: Row) {
    console.log('copy ' + row.id);

    if (!row.value) {
      return;
    }

    const listener = (e: ClipboardEvent) => {
      // tslint:disable-next-line: no-string-literal
      const clipboard = e.clipboardData || window['clipboardData'];
      clipboard.setData('text', row.value.toString());
      e.preventDefault();
    };

    document.addEventListener('copy', listener, false);
    document.execCommand('copy');
    document.removeEventListener('copy', listener, false);

    this.messageService.add({ severity: 'success', summary: 'Copied' });
  }

  editRow(row: Row) {
    console.log('edit ' + row.id);

    this.clonedRows[row.id] = { ...row };
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

  saveColumns(event: any) {
    console.log('saveCols');

    const widthOfDescriptionCol = event.element.offsetWidth;
    const widthOfValueCol = event.element.nextElementSibling.offsetWidth;

    if (widthOfDescriptionCol + widthOfValueCol > 700) {
      event.element.style.width = this.columns[1].width;
      event.element.nextElementSibling.style.width = this.columns[2].width;

      this.messageService.add({ severity: 'error', summary: 'Not applicable width!' });
    } else {
      this.columns[1].width = widthOfDescriptionCol + 'px';
      this.columns[2].width = (700 - widthOfDescriptionCol) + 'px';
    }
  }

  handleRowSelect(event: any) {
    this.copyRow(event.data);
  }

  private generateNewId(): number {
    if (this.rows && this.rows.length > 0) {
      return Math.max(...this.rows.map(x => x.id)) + 1;
    } else {
      return 0;
    }
  }
}
