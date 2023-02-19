import { Component, Input, OnInit } from '@angular/core';
import { Chat } from '../model/Chat';
import { ChatMessage } from '../model/ChatMessage';
import { FullChat } from '../model/FullChat';
import { UserD } from '../model/UserD';
import { HttpService } from '../services/http.service';
import { WebSocketService } from '../services/web-socket.service';

@Component({
  selector: 'app-selected-chat',
  templateUrl: './selected-chat.component.html',
  styleUrls: ['./selected-chat.component.css']
})
export class SelectedChatComponent implements OnInit {


  constructor( private httpService:HttpService ,public webSocketSerice:WebSocketService ) {
    //this.webSocketSerice.openStompConnection(Number(sessionStorage.getItem("selectedChat")||0));

  }
  ngOnInit(): void {
    
    
    if ( sessionStorage.getItem("selectedChat") != null && sessionStorage.getItem("selectedChat") !=undefined) {
      if ( sessionStorage.getItem("selectedChat")!.length > 1)
      this.selectedChat=JSON.parse(sessionStorage.getItem("selectedChat")||"")|| "";
    }
  
    
    console.log("CZEEEEEEEEEEEEEEEKKKKKKKKKK" + this.selectedChat.id)
    


   // this.webSocketSerice.stompClient.connect();
      let unsub = sessionStorage.getItem("selectedChatOld") || "";   

   // this.webSocketSerice.openStompConnection(this.selectedChat.id);











    
    //this.webSocketSerice.openStompConnection(this.selectedChat.id);
    //this.webSocketSerice.closeStompConnection(Number( sessionStorage.getItem("selectedChatOld"))|| 0)


  //  this.webSocketSerice.openStompConnection(this.selectedChat.id)
   // this.webSocketSerice.stompClient.disconnect();
  // console.log("WEBBBBBBBBBBBBBBB"  +  this.webSocketSerice.stompClient.connected)

 

    console.log("essa")


    if ( this.selectedChat.id != 0 ) {
      this.httpService.getChatById(this.selectedChat.id).subscribe(response =>{
      
        this.selectedChat=response;
    
      })
    }

  
   
  }

  messagesTOP:ChatMessage = {
    chatId: 0,
    authorId: 0,
    text: '',
    date: new Date()
  };

  

  idAreNotTheSame( id:number | undefined) {

   for ( let i = 0 ; i < this.webSocketSerice.chatMessages.length ; i++) {
    
    console.log("CHECKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKK             " + id + "   " + this.webSocketSerice.chatMessages[i].id)
      if ( id == this.webSocketSerice.chatMessages[i].id ) {
        
        return false ;

      }

   }

   return true;

  }


  @Input("selectedChat")
  selectedChat!:FullChat;

  @Input()
  userD! :UserD;
  text:string="";



  sendMessage(selectedChat:FullChat){
    console.log("click")
   // this.webSocketSerice.openStompConnection(this.selectedChat.id)
    if ( this.text != null) {
   let  chatMessage:ChatMessage ={
    
     chatId: selectedChat.id,
     authorId: this.userD.id || 0,
     text: this.text,
     date: new Date( Date.now())
   }

   console.log("DATAAAA      " +new Date( Date.now()))


    this.webSocketSerice.sendMessage(selectedChat.id,JSON.stringify(chatMessage))

    this.text = "";
    this.messagesTOP = this.webSocketSerice.chatMessage;
    console.log(chatMessage)
  }

  
}


}
