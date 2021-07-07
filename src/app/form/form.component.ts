import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.sass']
})
export class FormComponent implements OnInit {
  formGroup!: FormGroup;
  floatLabelControl = new FormControl('always');

  checkedControl = new FormControl(false);

  constructor(
    private formBuilder: FormBuilder
  ) { }

  ngOnInit(): void {
    this.createForm();
  }

  get name() {
    return this.formGroup.get('name') as FormControl;
  }

  createForm() {
    this.formGroup = this.formBuilder.group({
      'name': [null, [Validators.required, Validators.minLength(1), Validators.maxLength(30)]],
      'nip': [null, [Validators.required, Validators.minLength(1), Validators.maxLength(30)]],
      'email': [null, [Validators.required, Validators.minLength(1), Validators.maxLength(30)]],
      'phone': [null, [Validators.required, Validators.minLength(1), Validators.maxLength(30)]],
      'driving-licence': [null, [Validators.required, Validators.minLength(1), Validators.maxLength(30)]],
      'subject': [null, [Validators.required, Validators.minLength(1), Validators.maxLength(30)]],
      'textarea': [null, [Validators.required, Validators.minLength(1), Validators.maxLength(30)]],
      floatLabel: this.floatLabelControl,
      checked: this.checkedControl,
    });
  }

  onSubmit(post: any) {
    console.log(post);
  }
  

}
