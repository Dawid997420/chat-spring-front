import { UserD } from "./UserD"

export interface Chat {

    id:number,
    
    chatName:string,
    users:UserD[],
    messagesId:string[]

} 