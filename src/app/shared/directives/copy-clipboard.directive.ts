import { Directive, EventEmitter, HostListener, Input, Output } from '@angular/core';

@Directive({ selector: '[appCopyClipboard]' })
export class CopyClipboardDirective {

  // https://stackoverflow.com/questions/49102724/angular-5-copy-to-clipboard
  // https://stackblitz.com/edit/angular-labs-copy-clipboard?file=src%2Fapp%2Fhello%2Fhello.component.html

  @Input() copyClipboard: string;

  @Input() context: string;

  @Output() copied: EventEmitter<string> = new EventEmitter<string>();

  @HostListener('click', ['$event'])
  public onClick(event: MouseEvent): void {
    event.preventDefault();
    if (!this.copyClipboard) {
      return;
    }

    const listener = (e: ClipboardEvent) => {
      const clipboard = e.clipboardData || window['clipboardData'];
      clipboard.setData('text', this.copyClipboard.toString());
      e.preventDefault();
      this.copied.emit(this.copyClipboard);
    };

    document.addEventListener('copy', listener, false);
    document.execCommand('copy');
    document.removeEventListener('copy', listener, false);
  }
}