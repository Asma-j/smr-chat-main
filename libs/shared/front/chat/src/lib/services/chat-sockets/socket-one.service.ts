import { Injectable } from '@angular/core';
import { Socket } from 'ngx-socket-io';

@Injectable({
  providedIn: 'root',
})
export class SocketOne extends Socket {

  public constructor() {
    super({
      //http://localhost:3000
      url: '', 
      options: {
        //transports: ["websocket"],
        transportOptions: {
          polling: {
            extraHeaders: {
              Authorization: 'Bearer ' + localStorage.getItem('access_token')
            }
          }
        }
      }
    });
    console.log('SocketOne Instance');
  }
}
