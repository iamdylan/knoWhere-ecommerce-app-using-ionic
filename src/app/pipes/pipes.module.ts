import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { GetErrorPipe } from './getError.pipe';
import { ImageSizePipe } from './imgSize.pipe';

@NgModule({
  imports: [
    CommonModule,
    IonicModule
  ],
  declarations: [GetErrorPipe, ImageSizePipe],
  exports: [GetErrorPipe, ImageSizePipe]
})
export class PipesModule {}
