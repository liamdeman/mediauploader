import { Component } from '@angular/core';
import {FileUpload} from 'primeng/fileupload';
import {Button, ButtonModule} from 'primeng/button';
import {Toast, ToastModule} from 'primeng/toast';
import {PrimeNG} from 'primeng/config';
import {Badge, BadgeModule} from 'primeng/badge';
import {ProgressBar} from 'primeng/progressbar';
import {CommonModule} from '@angular/common';

@Component({
  selector: 'app-root',
  imports: [FileUpload, Button, Toast, Badge, ProgressBar, FileUpload, ButtonModule, BadgeModule, ProgressBar, ToastModule, CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'FE';

  files = [];

  totalSize : number = 0;

  totalSizePercent : number = 0;

  constructor(private config: PrimeNG) {}

  choose(event:any, callback:any) {
    callback();
  }

  onRemoveTemplatingFile(event:any, file:any, removeFileCallback:any, index:any) {
    removeFileCallback(event, index);
    this.totalSize -= parseInt(this.formatSize(file.size));
    this.totalSizePercent = this.totalSize / 10;
  }

  onClearTemplatingUpload(clear:any) {
    clear();
    this.totalSize = 0;
    this.totalSizePercent = 0;
  }


  onSelectedFiles(event:any) {
    this.files = event.currentFiles;
    this.files.forEach((file:any) => {
      this.totalSize += parseInt(this.formatSize(file.size));
    });
    this.totalSizePercent = this.totalSize / 10;
  }

  uploadEvent(callback:any) {
    callback();
  }

  formatSize(bytes: any) {
    const k = 1024;
    const dm = 3;
    const sizes = this.config.translation.fileSizeTypes;
    if (bytes === 0 && sizes !== undefined) {
      return `0 ${sizes[0]}`;
    }

    const i = Math.floor(Math.log(bytes) / Math.log(k));
    const formattedSize = parseFloat((bytes / Math.pow(k, i)).toFixed(dm));

    return `${formattedSize} ${sizes![i]}`;
  }
}
