import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { RoomDto } from '@mslibs/shared/front-back/chat/dtos';
import { EMPTY, Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';

const api = '/api/';

@Injectable({
  providedIn: 'root',
})
export class RoomService {

  public constructor(private http: HttpClient) {}
  /**
   * Get rooms
   */
  public getRooms(): Observable<RoomDto[]> {
    return this.http.get<RoomDto[]>(`${api}rooms`)
      .pipe(catchError(() => {
        return EMPTY;
      }));
  }

  /**
   * Get room
   * @param id
   */
  public getRoom(id: string): Observable<RoomDto> {
    return this.http.get<RoomDto>(`${api}/room/${id}`)
      .pipe(catchError(() => {
        return EMPTY;
      }));
    ;
  }
}
