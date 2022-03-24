import { Component, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Login } from './app.model';
import { AppService } from './app.service';
import { signUp } from './signup/signup.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  @ViewChild('loginForm') loginForm!: NgForm;
  loginData: Login = new Login();
  mode = '';
  passType = 'password';

  constructor(private ser: AppService){
  }
  loginDetails: any;
  ngOnInit(){
    this.ser.viewMode.subscribe((res) => {
      this.mode = res.viewMode;
      this.loginDetails = res.Data;
    });
  }

  showPass(event: any){
    if(event.target.checked){
      this.passType = 'text';
    }
    else{
      this.passType = 'password';
    }
  }
  submit(){

    if(this.loginData.email === "admin@gmail.com" && this.loginData.password === "1q!Qqwerty"){
      this.ser.viewMode.next({viewMode: 'home'});
    }
    else{
      alert("Password is Invalid");
    }
  }

  signUp(){
    this.ser.viewMode.next({viewMode: 'signup'});
  }
}
