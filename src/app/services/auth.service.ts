import { Injectable } from '@angular/core';
import { LoginModel } from '../models/loginModel';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ListResponseModel } from '../models/listResponseModel';
import { Token } from '@angular/compiler';
import { SingleResponseModel } from '../models/singleResponseModel';
import { TokenModel } from '../models/tokenModel';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  apiUrl = 'https://localhost:44364/api/auth';
  constructor(private httpClient: HttpClient) {}

  login(user: LoginModel): Observable<SingleResponseModel<TokenModel>> {
    let newUrl = this.apiUrl + '/login';
    return this.httpClient.post<SingleResponseModel<TokenModel>>(newUrl, user);
  }

  isAuthenticeted() {
    if (localStorage.getItem('token')) {
      return true;
    } else {
      return false;
    }
  }
}
