import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Factory } from 'src/app/Shared/factory';
import { FactoryService } from 'src/app/Shared/factory.service';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  userName: string;
  password: string;
  loginFrm: FormGroup;
  factory: Factory;

  constructor(private fb: FormBuilder, private userService: UserService,
              private router: Router, private factoryService: FactoryService) { }


  ngOnInit(): void {
    this.loginFrm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3)]]
      , password: ['', [Validators.required, Validators.minLength(3)]]
    });
    this.factory = this.factoryService.getFactoryInfo();
  }
  Login(){
    // this.userService.Login(this.preperUser()).subscribe(res => {
    //     if (res) {
    //       this.router.navigateByUrl('/');
    //     }
    // });
    this.router.navigateByUrl('/Materials');
  }
//  preperUser(){
//    const user = new User();
//    user.name = this.loginFrm.controls['name'].value;
//    user.password = this.loginFrm.controls['password'].value;
//    return user;
//  }

}
