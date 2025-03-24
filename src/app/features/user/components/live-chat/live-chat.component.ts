import { AfterViewChecked, Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { Store } from '@ngrx/store';
import { userModel } from 'src/app/store/user/user.model';
import { selectUserData } from 'src/app/store/user/user.selector';
import { SocketService } from '../../services/socket/socket.service';
import { IMessageDto } from 'src/app/core/dtos/IMessage.dto';
import { UserService } from '../../services/user/user.service';
import { ChatService } from '../../services/chat/chat.service';
interface ChatMessage {
  user: string;
  message: string;
  timestamp: Date;
}
@Component({
  selector: 'app-live-chat',
  templateUrl: './live-chat.component.html',
  styleUrls: ['./live-chat.component.css']
})
export class LiveChatComponent implements OnInit,AfterViewChecked {
  @ViewChild('scrollArea') private scrollArea!: ElementRef;
  @Input() public streamKey:string = ''
  messages: ChatMessage[] = [];
  newMessage: string = '';
 private userData!:userModel
  constructor(private _store:Store,private _socketService:SocketService,private _chatService:ChatService) {
    this._store.select(selectUserData).subscribe({
      next:(userData)=>{
        this.userData = userData as userModel
      },
      error:(err)=>{
        console.error(err)
      }
    })
  }

  ngOnInit() {
    this._socketService.joinRoom(this.streamKey)
   this._chatService.getChats(this.streamKey).subscribe({
    next:(value)=>{
    for (let index = 0; index < value.length; index++) {
        this.messages.push({user:value[index].userData.fullName,message:value[index].message,timestamp:value[index].createdAt})
    }
    }
   })

    this._socketService.recieveMessage().subscribe({
      next:(value)=>{
        const message = {
          user:value.fullName,
          message:value.message,
          timestamp:value.time
        }
        this.messages.push(message)
      }
    })
  }
  ngAfterViewChecked() {
    this.scrollToBottom();
  }

  scrollToBottom() {
    this.scrollArea.nativeElement.scrollTop = this.scrollArea.nativeElement.scrollHeight;
  }

  sendMessage() {
    if (this.newMessage.trim()) {
      const time = new Date()
      this.messages.push({
        user: this.userData.fullName, // In a real app, this would be the logged-in user
        message: this.newMessage,
        timestamp: time
      });
      const message:IMessageDto = {
        streamKey: this.streamKey,
        userId: this.userData._id,
        time: time,
        fullName: this.userData.fullName,
        message: this.newMessage
      }
      this._socketService.sendMessage(message)
      this.newMessage = '';
    }
  }

}
