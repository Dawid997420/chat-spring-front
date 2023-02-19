import { Component } from '@angular/core';
import { UserD } from '../model/UserD';
import { UserDLogin } from '../model/UserDLogin';
import { AuthService } from '../services/auth.service';
import { HttpService } from '../services/http.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {

  username ="";
  password="";
  photo="";

  constructor(private httpService :HttpService,private authService:AuthService){

  }

  register() {

    let userD:UserD = {
      username:this.username,
      password:this.password,
      photo :this.photo
    }

    this.httpService.register(userD).subscribe(response =>{

      console.log(response);

          if ( response) {

                this.httpService.loginAndGetToken(userD).subscribe( response=>{



                  localStorage.setItem("token",response);
                
                })
              
          }

        })



  }



  selectLogin() {
   
    this.authService.selectComponent="login"
  }



}
