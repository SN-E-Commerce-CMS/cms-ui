import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { MerchantUser } from '../to/merchant-user.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RegistrationProxyService {

  constructor(private http: HttpClient) { }

  registerMerchantUser(merchantUser: MerchantUser): Observable<any> {

    const headers = new HttpHeaders({'X-XSRF-TOKEN': this.getXsrfToken()});

    return this.http.post(environment.registrationServiceUrl, merchantUser, {
      headers: headers,
      withCredentials: true
    })
  }

  private getXsrfToken(): string {
    const cookieName: string = 'XSRF-TOKEN';
    let cookieValue: string = '';

    if (document.cookie && document.cookie !== '') {
      const cookies = document.cookie.split(';');
      for (let i = 0; i < cookies.length; i++) {
        const cookie = cookies[i].trim();

        if (cookie.substring(0, cookieName.length + 1) === (cookieName + '=')) {
          cookieValue = decodeURIComponent(cookie.substring(cookieName.length + 1));
          break;
        }
      }
    }
    return cookieValue;
  }

}
