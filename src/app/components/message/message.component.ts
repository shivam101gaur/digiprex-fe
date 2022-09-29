import { HttpClient, HttpParams } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { API_BaseURL } from 'src/environments/environment';

@Component({
  selector: 'app-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.css']
})
export class MessageComponent implements OnInit {


  cartToken=''
  phone=''
  email=''
  messageList:Message[]=[]
  constructor(private http:HttpClient) { }

  ngOnInit(): void {
    this.getMessages()
  }


  getMessages(){
    var url = `${API_BaseURL}messages?`
    url+= this.cartToken?`cart_token=${this.cartToken}&`:'';
    url+= this.phone?`phone=${this.phone}`:'';
    url+= this.email?`email=${this.email}`:'';


    this.http.get(url).subscribe({
      next:res=>{
        this.messageList=res as any
      },
      error:err=>{
        alert('could not get message list')
        console.log(err);      
      }
    })
  }

}
export interface Message {
  content?: string;
  time_sent?: number;
  phone?: string | number;
  email?: string;
  cart_token?: string;
}
