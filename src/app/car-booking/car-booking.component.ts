import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-car-booking',
  templateUrl: './car-booking.component.html',
  styleUrls: ['./car-booking.component.css'],
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
})
export class CarBookingComponent implements OnInit {
  carForm!: FormGroup;
  availableExtras = [
    { name: 'gps', label: 'GPS' },
    { name: 'childSeat', label: 'Siège enfant' },
    { name: 'fullInsurance', label: 'Assurance tout risque' },
  ];
  formInvalidError = false;

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.initForm();
  }

  initForm(): void {
    this.carForm = this.fb.group({
      carName: ['', Validators.required],
      reservationDate: ['', [Validators.required, this.futureDateValidator]],
      startTime: ['', Validators.required],
      duration: ['', [Validators.required, Validators.min(1), Validators.max(8)]],
      participants: ['', [Validators.required, Validators.min(1), Validators.max(50)]],
      extras: this.fb.group({
        gps: [false],
        childSeat: [false],
        fullInsurance: [false],
      }),
    });
  }

  futureDateValidator(control: any): any {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const controlDate = new Date(control.value);
    return controlDate.getTime() > today.getTime() ? null : { notFuture: true };
  }

  getSelectedExtras(): string[] {
    const extrasGroup = this.carForm.get('extras') as FormGroup;
    return Object.keys(extrasGroup.controls).filter((key) => extrasGroup.controls[key].value);
  }

  onSubmit(): void {
    const selectedExtras = this.getSelectedExtras();
    if (selectedExtras.length === 0) {
      alert('Veuillez sélectionner au moins une option.');
      return;
    }

    if (this.carForm.valid) {
      console.log('Données de réservation :', {
        ...this.carForm.value,
        selectedExtras,
      });
      this.carForm.reset();
      this.formInvalidError = false;
    } else {
      this.formInvalidError = true;
    }
  }
}
