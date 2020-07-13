import { Pipe, PipeTransform } from '@angular/core';
import errorMessages from '../../assets/data/errorMessages.json';

@Pipe({
  name: 'getError',
  pure: true
})

export class GetErrorPipe implements PipeTransform {

  transform(value: any, ...args: any[]): unknown {
    const formCtrl: any = args[0];
    const field: any = args[1];
    // console.log('pipe ran');
    const message = [];

    if (formCtrl) {
      if (value && value.errors) {
        // console.log(formCtrl);
          for (const err in value.errors) {
              if (message.length === 0 && value.errors[err]) {
                  message.push(errorMessages[field][err]);
                  console.log(message);
                  return message;

              }
          }
      } else if (field === 'conf_password') {
        message.push(errorMessages['conf_password']['noMatch']);
        return message;
      }
    }
    return null;
  }

}
