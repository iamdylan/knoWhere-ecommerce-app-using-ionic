import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { ScrollVanishDirective } from './scroll-vanish.directive';

@NgModule({
  imports: [
    CommonModule,
    IonicModule
  ],
  declarations: [ScrollVanishDirective],
  exports: [ScrollVanishDirective]
})
export class DirectivesModule {}
