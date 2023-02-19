import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Chat } from '../model/Chat';
import { FullChat } from '../model/FullChat';
import { UserD } from '../model/UserD';
import { UserDLogin } from '../model/UserDLogin';


@Injectable({
  providedIn: 'root'
})
export class HttpService {

  baseURL = "http://localhost:2222/"

  constructor(private http:HttpClient) {
   }

  loginAndGetToken(user:UserDLogin) :Observable<string> {
    return this.http.post(this.baseURL + 'login',user,{responseType: 'text'})
  }

  getPrincipal():Observable<UserD> {
    return this.http.get<UserD>(this.baseURL + "user/principal" )
  }

  getUsers():Observable<UserD[]>{
    return this.http.get<UserD[]>(this.baseURL+"user" )
  }

  getUsersWithoutPrincipal() :Observable<UserD[]>{
    return this.http.get<UserD[]>(this.baseURL+"user/chats")
  }


  register(userD :UserD) : Observable<UserD> {
    return this.http.post<UserD>(this.baseURL + "user/register" ,userD)
  }


  createOrOpenChat(chat:Chat) : Observable<Chat> {
    return this.http.post<Chat>(this.baseURL + "chat" ,chat)
  }

  getChatsByUserId(id:number) :Observable<Chat[]> {

    return this.http.get<Chat[]>(this.baseURL + "chat/user/" + id ) 
  }


  getChatById(chatId:number) :Observable<FullChat> {
    
    return this.http.get<FullChat>(this.baseURL +"chat/"+chatId)
  }

}
