import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from './services/auth.service';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {

  constructor(private authService :AuthService) {

  }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {




    if (this.authService.isLogedIn() ) {
      
    let token = localStorage.getItem("token")

       console.log("INTERCEPTOR")

      let clonedReq = request.clone({
          headers: request.headers.set("Authorization",
            "Bearer " +token)
      })

      return next.handle(clonedReq);
    } else {



      return next.handle(request);
    
    }

  }

}
