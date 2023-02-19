import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { RouteModule } from './routing/route/route.module';
import {HttpClientModule, HTTP_INTERCEPTORS} from '@angular/common/http'
import { JwtInterceptor } from './jwt.interceptor';
import { ChatsComponent } from './chats/chats.component';
import { RegisterComponent } from './register/register.component';
import { SelectedChatComponent } from './selected-chat/selected-chat.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    ChatsComponent,
    RegisterComponent,
    SelectedChatComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    RouteModule,
    FormsModule,
    HttpClientModule
  
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: JwtInterceptor,
      multi: true
    }
  ]
  
  
  ,
  bootstrap: [AppComponent]
})
export class AppModule { }
