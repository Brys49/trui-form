import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators, ValidatorFn, ValidationErrors, AbstractControl } from '@angular/forms';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.sass']
})
export class FormComponent implements OnInit {
  formGroup!: FormGroup;
  floatLabelControl = new FormControl('always');
  allChecked: boolean = false;

  constructor(
    private formBuilder: FormBuilder
  ) { }

  ngOnInit(): void {
    this.createForm();
    this.formGroup.get('dataProcessingAgreement')?.valueChanges.subscribe(next => { this.allChecked = next && this.formGroup.get('marketingContactAgreement')?.value });
    this.formGroup.get('marketingContactAgreement')?.valueChanges.subscribe(next => { this.allChecked = next && this.formGroup.get('dataProcessingAgreement')?.value });
  }

  createForm() {
    this.formGroup = this.formBuilder.group({
      'name': [null, [Validators.required, Validators.minLength(1), Validators.maxLength(100)]],
      'nip': [null, [Validators.required, nipValidator()]],
      'email': [null, [Validators.required, Validators.email]],
      'phone': [null, [Validators.pattern("[0-9]{3} [0-9]{3} [0-9]{3}")]],
      'subject': [null, [Validators.required]],
      'drivingLicence': ["false", [Validators.required]],
      'textarea': [null, [Validators.minLength(1), Validators.maxLength(300)]],
      'dataProcessingAgreement': [false, [Validators.requiredTrue]],
      'marketingContactAgreement': [false],
      floatLabel: this.floatLabelControl,
    });
  }

  onSubmit(post: any) {
    console.log(
      "Nazwa firmy / imię i nazwisko: " + post.name +
      "\n NIP: " + post.nip +
      "\n E-mail: " + post.email +
      "\n Numer telefonu: " + post.phone +
      "\n Temat: " + post.subject +
      "\n Czy posiadasz prawo jazdy kat.B?: " + post.drivingLicence +
      "\n Treść wiadomości: " + post.textarea +
      "\n Zgoda 1: " + post.dataProcessingAgreement +
      "\n Zgoda 2: " + post.marketingContactAgreement
    );
  }

  checkAll() {
    this.allChecked = !this.allChecked;

    if (this.allChecked == true) {
      this.formGroup.get('dataProcessingAgreement')?.setValue(true);
      this.formGroup.get('marketingContactAgreement')?.setValue(true);
    } else {
      this.formGroup.get('dataProcessingAgreement')?.setValue(false);
      this.formGroup.get('marketingContactAgreement')?.setValue(false);
    }
  }

}

export function nipValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const isValid = isValidNip(control.value);
    return isValid ? { nip: { value: control.value } } : null;
  };
}

function isValidNip(nip: any) {
  if (typeof nip !== 'string')
    return false;

  nip = nip.replace("/[\ \-]/gi", '');

  let weight = [6, 5, 7, 2, 3, 4, 5, 6, 7];
  let sum = 0;
  let controlNumber = parseInt(nip.substring(9, 10));
  let weightCount = weight.length;
  for (let i = 0; i < weightCount; i++) {
    sum += (parseInt(nip.substr(i, 1)) * weight[i]);
  }

  return sum % 11 === controlNumber;
}
