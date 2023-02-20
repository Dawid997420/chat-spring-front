import { Component, OnInit, ViewChild } from '@angular/core';
import { Chat } from '../model/Chat';
import { ChatMessage } from '../model/ChatMessage';
import { FullChat } from '../model/FullChat';
import { UserD } from '../model/UserD';
import { SelectedChatComponent } from '../selected-chat/selected-chat.component';
import { AuthService } from '../services/auth.service';
import { HttpService } from '../services/http.service';
import { WebSocketService } from '../services/web-socket.service';

@Component({
  selector: 'app-chats',
  templateUrl: './chats.component.html',
  styleUrls: ['./chats.component.css']
})
export class ChatsComponent implements OnInit {


  selectedChat:FullChat={
    id : 0,
    chatName: '',
    users: [],
    messages: []
  }

  chats:Chat[]=[];

  constructor(public webSocketSerice:WebSocketService,
    private httpService:HttpService, private authService:AuthService) {

     
  }
  ngOnInit(): void {
    this.getPrincipalInfo()
  
   this.webSocketSerice.openStompConnectionTest();
    //this.webSocketSerice.openStompConnection(1)
  }


  @ViewChild(SelectedChatComponent) selected!: SelectedChatComponent


  users:UserD[]= [];

  userD:UserD= {
    id: 0,
    username: "",
    password: "",
    photo: ''
  };

  selectUser(user:UserD) {
    
    
  }


  newMessage(id:number) {

    if ( this.selectedChat.id == id) {
      console.log(this.selectedChat.id + "   " + id)
      return false;
    }
    
    let showKlasa= false

    for ( let i = 0 ; i < this.webSocketSerice.chatMessages.length ; i++) {



        if ( this.webSocketSerice.chatMessages[i].chatId == id) {

          return true;
        }

    }

   // author = sessionStorage.getItem("username")

 


    return false;

  }


  selectChat(chat:Chat){
 
 //   let chatMessageStompWithId: ChatMessage[]=[]




    this.webSocketSerice.chatMessages

    this.httpService.getChatById(chat.id).subscribe(response =>{

     
      
      //this.selectedChat=chat;

      for ( let i = 0 ; i < this.webSocketSerice.chatMessages.length ; i++ ) {
      
        if ( this.webSocketSerice.chatMessages[i].chatId == chat.id ) {
  
          this.webSocketSerice.chatMessages.splice(i)
        //  chatMessageStompWithId.push(this.webSocketSerice.chatMessages[i]);
  
        }
      
      }

      
 
      this.selectedChat=response;
      console.log(" IDDDD CHATTTTT" +  this.selectedChat.id)
     // location.reload()
      
      sessionStorage.setItem("selectedChat",JSON.stringify(this.selectedChat))

 
     
     // this.webSocketSerice.closeStompConnection()


     // this.selected.ngOnInit();
      //location.reload()
    //  this.webSocketSerice.openStompConnection(this.selectedChat.id)
    })

  }

  logout() {
    
    localStorage.setItem("token","")

    this.authService.selectComponent="login"
  }

  getPrincipalInfo() {

    this.httpService.getPrincipal().subscribe(response=>{
    
      this.userD = response;
      this.getUserChats();
      
    })
  }


  getUserChats() {
    

    this.httpService.getChatsByUserId(this.userD.id || 0).subscribe(response=>{

      this.chats= response;
      
    })
  }


}
