import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService, UserRegistration } from '../../services/auth.service';
import Swal from 'sweetalert2';
import {FormsModule} from '@angular/forms';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  imports: [
    FormsModule
  ],
  styleUrls: ['./signup.component.css']
})
export class SignupComponent {
  name: string = '';
  email: string = '';
  password: string = '';
  confirmPassword: string = '';
  errorMessage: string = '';
  successMessage: string = '';

  constructor(private authService: AuthService, private router: Router) {}

  onSubmit(): void {
    // Check if passwords match
    if (this.password !== this.confirmPassword) {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Passwords do not match'
      });
      return;
    }

    const newUser: UserRegistration = {
      name: this.name,
      email: this.email,
      password: this.password
    };

    this.authService.register(newUser).subscribe(
      (response) => {
        this.successMessage = response.message || 'Registration successful!';
        Swal.fire({
          icon: 'success',
          title: 'Signup Successful',
          text: this.successMessage
        }).then(() => {
          // Redirect to login page after success
          this.router.navigate(['/login']);
        });
      },
      (error) => {
        this.errorMessage = error.error.message || 'Registration failed. Please try again.';
        Swal.fire({
          icon: 'error',
          title: 'Signup Failed',
          text: this.errorMessage
        });
      }
    );
  }
}
