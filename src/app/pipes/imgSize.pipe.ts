import { Pipe, PipeTransform } from '@angular/core';
import { of } from 'rxjs';

@Pipe({
  name: 'imgSize',
  pure: true
})

export class ImageSizePipe implements PipeTransform {

    transform(value: any, ...args: any[]): unknown {
        const size: any = args[0];
        // console.log('imgSize pipe ran');
        return of(value.slice(0, -4) + '-' + size + value.slice(-4));
    }
}
