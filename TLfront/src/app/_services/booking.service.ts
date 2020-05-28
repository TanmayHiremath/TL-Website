import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class BookingService {
  apiBaseUrl = environment.apiBaseUrl;

  public createBooking(booking) {
    return this.http.post<{message: string}>(
      `${this.apiBaseUrl}/bookings`,
      booking);
  }

  public getAllBookings(params) {
    const options = { 
      params: params
    };

    return this.http.get(
      `${this.apiBaseUrl}/bookings`, options
    );
  }

  public deleteBooking(_id) {
    return this.http.delete(
      `${this.apiBaseUrl}/bookings/${_id}`
    );
  }

  public approveBooking(_id) {
    return this.http.patch(
      `${this.apiBaseUrl}/bookings/${_id}/status`,
      { status: 'Approved' }
    );
  }

  public rejectBooking(_id) {
    return this.http.patch(
      `${this.apiBaseUrl}/bookings/${_id}/status`,
      { status: 'Rejected' }
    );
  }

  public resolveConflict(approveId, rejectId) {
    return this.http.patch(
      `${this.apiBaseUrl}/bookings/conflict`,
      {
        approveId: approveId,
        rejectId: rejectId
      }
    );
  }

  constructor(
    private http: HttpClient
  ) { }
}
