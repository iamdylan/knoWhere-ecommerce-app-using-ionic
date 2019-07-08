import { FormGroup } from '@angular/forms';

export class PasswordValidator {

  static validPassword(group: FormGroup) {
  let pass = group.controls.password.value;
  let confirmPass = group.controls.conf_password.value;
  
  return pass === confirmPass ? null : { noMatch: true }
  }
}