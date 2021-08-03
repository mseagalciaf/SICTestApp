import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { LoginInterface } from 'src/app/interfaces/login-interface';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loading:boolean=false;
  public checkoutLoginForm = this.formBuilder.group({
    email: ['', Validators.compose([ Validators.email, Validators.required])],
    password : ['', Validators.required]
  });

  constructor(
    private formBuilder: FormBuilder, 
    private authService:AuthService,
    private router : Router,
    private route : ActivatedRoute
  ) { }

  ngOnInit(): void {
  }

  onLogin(credentials:LoginInterface){
    this.loading=true;
    this.authService.login(credentials).subscribe(
      data =>{
        this.authService.setToken(data.access_token);
        this.authService.setCurrentUser(data.user);
        this.loading=false;
        this.router.navigate(['/admin']);
        this.checkoutLoginForm.reset();
      },
      error => {
        if (error.status==401) {
          this.loading=false;
          alert("Credenciales incorrectos");
          this.checkoutLoginForm.reset();
        }else{
          this.loading=false;
          alert("Error desconocido");
          this.checkoutLoginForm.reset();
        }
      }
    );
  }
}
