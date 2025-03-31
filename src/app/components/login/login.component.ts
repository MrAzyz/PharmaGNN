import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService, UserLogin } from '../../services/auth.service';
import Swal from 'sweetalert2';
import {FormsModule} from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  imports: [
    FormsModule
  ],
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  email: string = '';
  password: string = '';
  errorMessage: string = ''; // Add this line

  constructor(private authService: AuthService, private router: Router) {}

  onSubmit(): void {
    const credentials: UserLogin = { email: this.email, password: this.password };
    this.authService.login(credentials).subscribe(
      (response) => {
        localStorage.setItem('token', response.token);
        this.router.navigate(['/']);
      },
      (error) => {
        // Optionally, if you're using SweetAlert2, you might not need this,
        // but if you want to set the errorMessage for the template, do:
        this.errorMessage = error.error.message || 'Login failed. Please try again.';
        Swal.fire({
          icon: 'error',
          title: 'Login Failed',
          text: this.errorMessage,
        });
      }
    );
  }
}
