import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AppService } from '../app.service';
import { signUp } from './signup.model';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  @ViewChild('signUpForm') signUpForm!: NgForm;
  signUpData: signUp = new signUp();
  signUpDataList: signUp[] = [];
  mode = '';
  passType = 'password';
  constructor(private ser: AppService) {
    this.ser.viewMode.subscribe(res => {
      this.mode = res.viewMode
    })
   }

  ngOnInit(): void {
  }

  showPass(event: any){
    if(event.target.checked){
      this.passType = 'text';
    }
    else{
      this.passType = 'password';
    }
  }

  signUp(){
    if(this.signUpData.password === this.signUpData.confirmPassword){
      this.signUpDataList.push(this.signUpData);
      this.signUpData = new signUp();
      localStorage.setItem(this.signUpData.email, JSON.stringify(this.signUpDataList));
      this.ser.viewMode.next({viewMode: 'home', Data: this.signUpDataList});
    }
    else{
      alert('Password and Confirm Password are mismatching');
    }
    console.log(this.signUpDataList)
  }
  goTosignIn(){
    this.ser.viewMode.next({viewMode: 'login'});
  }
}
