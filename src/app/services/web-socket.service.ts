import { Injectable } from '@angular/core';
import { Stomp } from '@stomp/stompjs';
import { CompatClient } from '@stomp/stompjs/esm6';
import { Chat } from '../model/Chat';
import { ChatMessage } from '../model/ChatMessage';

@Injectable({
  providedIn: 'root'
})
export class WebSocketService {

  webSocket!:WebSocket;
  stompClient!:CompatClient;

  chatMessage:ChatMessage={
    chatId: 0,
    authorId: 0,
    text: '',
    date: new Date()
  };;


  chatMessages:ChatMessage[]=[];


  constructor() {
    this.openWebSocket();
   }


  openWebSocket() {



    this.webSocket= new WebSocket("ws://localhost:2222/endpoint")
  
    this.webSocket.onopen = (event) => {
      console.log("OPEN: OPEN WEBSOCKET ")
    }

    this.webSocket.onclose  = (event) => {
      console.log("CLOSE: CLOSE WEBSOCKET")
    }

    this.webSocket.onerror = (event) => {
      console.log("ERROR: ERROR WEBSOCKET "  )
    }

  }


  connectStomp() {

  }

  closeStompConnection( chatId:number){
    this.stompClient.unsubscribe('/broker/messages/' + chatId);
    
  }

  openStompConnection(chatId:number) {
    

  this.stompClient =Stomp.over(this.webSocket) || null

    console.log("XDDDDelo      " + chatId)
    this.stompClient.connect({},  (frame: string) => {
      console.log('Connected: STOMPPPP ' );

      this.stompClient.subscribe('/broker/messages/*' , (hello) =>{
       
      this.chatMessage = JSON.parse(hello.body);  
      this.chatMessages.push(this.chatMessage);                
      console.log("OOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOO   " +hello.body )
      
      });
   });
    console.log("STATUSSS              " +this.stompClient.active)

  }

  openStompConnectionTest() {
    
   let userBroker = sessionStorage.getItem("username")
   console.log(userBroker)

    this.stompClient =Stomp.over(this.webSocket) || null
  
    
      this.stompClient.connect({},  (frame: string) => {
        console.log('Connected: STOMPPPP ' );
  
        this.stompClient.subscribe('/broker/messages/'+userBroker , (hello) =>{
         
        this.chatMessage = JSON.parse(hello.body);  
        this.chatMessages.push(this.chatMessage);                
        console.log("OOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOO   " +hello.body )
        
        });
     });
      console.log("STATUSSS              " +this.stompClient.active)
  
    }





  getMessage() {
    return this.chatMessage;
  }

  
  sendMessage(idChat:number,message:string) {
    this.stompClient.send("/app/message/"+idChat, {} , message);
    
  }

}
