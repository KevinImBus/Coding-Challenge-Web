import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders  } from '@angular/common/http';
import { Observable } from 'rxjs';

import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AlienService {

  /**
   *
   * @param http
   */
  constructor(
    private readonly http: HttpClient
  ) { }

  /**
   *
   */
  getData(): Observable<any> {
    const url = `${environment.api.baseUrl}/messages`;
    return this.http.get(url);

  }

  /**
   *
   */
  sendData(message: any): Observable<any> {

    const url = `${environment.api.baseUrl}/messages`;
    
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'x-api-key': 'kev' 
    });

    const data = {
      nickname: environment.nickname,
      message: message
    };

    return this.http.post(url, data, { headers });
  }
}
