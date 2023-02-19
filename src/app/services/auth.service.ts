import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor() { }


  public selectComponent = "login"


  isLogedIn() :boolean{

    

    

    if (  localStorage.getItem("token")==null ||localStorage.getItem("token")?.length! < 10 ) {


      sessionStorage.setItem("username","");

      
      return false;
    } else {
      
    let token = localStorage.getItem("token");

  

    const payload = window.atob(token!.split('.')[1]);

    const parsedPayload = JSON.parse(payload);



    sessionStorage.setItem("role",parsedPayload.scope)
    sessionStorage.setItem("username",parsedPayload.sub)

    return parsedPayload.exp > Date.now() / 1000 ;

  }
}

}
