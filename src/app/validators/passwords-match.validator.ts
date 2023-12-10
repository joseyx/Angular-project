import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export const confirmPasswordValidator: ValidatorFn = (
  control: AbstractControl
): ValidationErrors | null => {
  let password = control.get('password')?.value;
  let confirmPassword = control.get('confirmPassword')?.value;
  console.log(password, confirmPassword);
  if (confirmPassword && password && confirmPassword != password) {
    return { mismatch: true };
  }
  return null;
};
