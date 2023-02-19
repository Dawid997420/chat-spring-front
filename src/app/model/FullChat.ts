import { ChatMessage } from "./ChatMessage"
import { UserD } from "./UserD"

export interface FullChat {

    id:number,

    chatName:string,
    users:UserD[],
    messages:ChatMessage[]


} 