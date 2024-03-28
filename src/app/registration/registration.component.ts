import { Component } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { ValidationResponse } from './to/validation-response.model';
import {MatIconModule} from '@angular/material/icon';
import { CommonModule } from '@angular/common';
import { MerchantUser } from './to/merchant-user.model';
import { RegistrationProxyService } from './service/registration-proxy.service';
import { error } from 'node:console';

@Component({
  selector: 'app-registration',
  standalone: true,
  imports: [
    CommonModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatCardModule,
    FormsModule,
    HttpClientModule,
    MatIconModule
  ],
  templateUrl: './registration.component.html',
  styleUrl: './registration.component.css'
})
export class RegistrationComponent {


  // registration validation response
  errorMessage: string | null = null;
  validationErrors: ValidationResponse = {};

  confirmationMessage: string = '';

  // form fields
  username!: string;
  password!: string;
  firstName!: string;
  lastName!: string;
  email!: string;
  hide = true;

  constructor(private registrationService: RegistrationProxyService) {}

  onRegister(): void {
    const merchantUser: MerchantUser = {
      username: this.username,
      password: this.password,
      firstName: this.firstName,
      lastName: this.lastName,
      email: this.email
    };

  this.registrationService.registerMerchantUser(merchantUser).subscribe({
    next: (response) => {
      this.confirmationMessage = `You have been registrated, please check your e-mail to confirm your account. ${response.email}`
      this.validationErrors = {};
      this.errorMessage = null;
      this.clearForm();

      alert("Congratulations, you have been registreted, check your email address, if e-mail was not sent, click on send email button.");
    },
    error: (error) => {
      console.error(`Error while trying to register user: ${merchantUser.username}`)
       this.handleValidationError(error);
    }
  });


}

toggleVisibility(event: MouseEvent): void {
  event.preventDefault(); 
  event.stopPropagation(); 
  this.hide = !this.hide;
}

private handleValidationError(error: any): void {
  if (error.status === 400 && error.error) {
    this.validationErrors = error.error;
  } else {
    console.log("error", error);
    this.errorMessage = error.error || 'Registration is currently unavailable.';
  }
}

private clearForm(): void {
  this.username = '';
  this.firstName = '';
  this.lastName = '';
  this.email = '';
  this.password = '';
}


}
