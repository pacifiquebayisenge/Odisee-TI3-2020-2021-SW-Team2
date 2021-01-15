import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class MatchService {

  constructor() { }

  //Paste with in class
  matchValidator(string1: string, string2: string) {
    return (formGroup: FormGroup) => {
      const string1Control = formGroup.controls[string1];
      const string2Control = formGroup.controls[string2];

      // see if value is null
      if (!string1Control || !string2Control) {
        return null;
      }

      // see if contain errors
      if (
        string2Control.errors &&
        !string2Control.errors.string1Mismatch
      ) {
        return null;
      }

      // string1 match check
      if (string1Control.value !== string2Control.value) {
        string2Control.setErrors({ string1Mismatch: true });
      } else {
        string2Control.setErrors(null);
      }
    };
  }
}
