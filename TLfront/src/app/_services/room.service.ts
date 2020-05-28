import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Room } from '../room';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class RoomService {

  constructor(
    private http: HttpClient
  ) { }

  apiBaseUrl = environment.apiBaseUrl;

  public createRoom(room: Room) {
    return this.http.post(
      `${this.apiBaseUrl}/rooms`,
      room);
  }

  public getAllRooms() {
    return this.http.get<[Room]>(
      `${this.apiBaseUrl}/rooms`,
    );
  }

  public deleteRoom(number) {
    return this.http.delete<{ message: string }>(
      `${this.apiBaseUrl}/rooms/${number}`
    );
  }

  public updateRoom(room) {
    return this.http.put<{ message: string }>(
      `${this.apiBaseUrl}/rooms`, room);
  }
}
