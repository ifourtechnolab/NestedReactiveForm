import { Component } from '@angular/core';
import { FormGroup, Validators, FormBuilder, FormControl } from '@angular/forms';

export enum Gender {
  Male = 1,
  Female
}
@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  myForm: FormGroup;
  arrGender: { genderId: number, name: string }[] = [];
  arrCity = [{
    Id: 1,
    Name: 'Ahmedabad'
  }, {
    Id: 2,
    Name: 'Bhavnagar'
  }, {
    Id: 3,
    Name: 'Mumbai'
  }, {
    Id: 4,
    Name: 'Pune'
  }, {
    Id: 5,
    Name: 'Bengaluru'
  }];

  constructor(private formBuilder: FormBuilder) {
    for (const item in Gender) {
      if (typeof Gender[item] === 'number') {
        this.arrGender.push({ genderId: Gender[item] as any, name: item });
      }
    }
    this.formInit();
  }

  formInit() {
    this.myForm = this.formBuilder.group({
      Person: this.formBuilder.group({
        FirstName: ['', [Validators.required]],
        LastName: [''],
        DateOfBirth: ['', [Validators.required]],
        Gender: ['1', [Validators.required]],
      }),
      Office: this.formBuilder.group({
        Designation: ['', [Validators.required]],
        Department: ['', [Validators.required]],
        DateOfJoin: ['', [Validators.required]],
      }),
      ContactDetail: this.formBuilder.group({
        Mobile: ['', [Validators.required, Validators.minLength(8), Validators.maxLength(10)]],
        Email: ['', Validators.email]
      }),
      Address: this.formBuilder.group({
        HouseNumber: ['', [Validators.required]],
        Street: ['', [Validators.required]],
        City: ['', [Validators.required]],
        PostalCode: ['', [Validators.required]],
        Latitude: [''],
        Longitude: [''],
      }),
      Note: ['', [Validators.maxLength(500)]],
    });
  }

  genderSelect(event: any) {
    this.myForm.controls.Person.get('Gender').setValue(event.target.value);
  }

  selectCity(event: any) {
    debugger
    this.myForm.controls.Address.get('City').setValue(event.target.value);
  }

  save(obj: FormGroup) {
    if (this.myForm.invalid) {
      Object.keys(obj.controls).forEach(field => {
        const control = obj.get(field);
        if (control instanceof FormControl) {
          control.markAsTouched({ onlySelf: true });
        } else if (control instanceof FormGroup) {
          this.save(control);
        }
      });
      return;
    }
  }
}
