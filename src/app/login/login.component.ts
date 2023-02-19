import { Component } from '@angular/core';
import { UserDLogin } from '../model/UserDLogin';
import { AuthService } from '../services/auth.service';
import { HttpService } from '../services/http.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {


  username:string= "";

  password:string= ""


  constructor( private httpService:HttpService,private authService :AuthService){

  }


  login(){
    
    let userToLogin :UserDLogin = {
      username:this.username,
      password:this.password
    }

    console.log(userToLogin); 
    this.httpService.loginAndGetToken(userToLogin).subscribe(response =>{
        
        localStorage.setItem("token",response);


    });

  }


  selectRegister() {
   
    this.authService.selectComponent="register"
  }


}
