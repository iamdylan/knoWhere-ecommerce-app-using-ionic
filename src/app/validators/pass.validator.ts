import { FormGroup } from '@angular/forms';

export class PasswordValidator {

  static validPassword(group: FormGroup) {
    const pass = group.controls.password.value;
    const confirmPass = group.controls.conf_password.value;

    return pass === confirmPass ? null : { noMatch: true };
  }

}
