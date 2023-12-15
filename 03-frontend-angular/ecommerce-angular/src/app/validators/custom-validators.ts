import { FormControl, ValidationErrors } from '@angular/forms';

export class CustomValidators {
  //! whitespace validation
  static notOnlyWhitespace(formControl: FormControl): ValidationErrors | null {
    //?check if string contains whitespace only
    if ((formControl.value != null) && formControl.value.trim().length === 0) {
      //invalid, return error object
      return { 'notOnlyWhitespace': true };
    } else {
      //valid, return null
      return null;
    }
  }
}
