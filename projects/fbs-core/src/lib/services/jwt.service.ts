import { Injectable } from '@angular/core';
import {HttpHeaders} from '@angular/common/http';


@Injectable()
export class JwtService {
  private token:string;

  getToken(): string {
    // return window.localStorage.getItem('jwtToken');
    return this.token;
  }

  saveToken(token: string) {
    // window.localStorage.setItem('jwtToken', token) ;
    this.token = token;
  }

  destroyToken() {
    // window.localStorage.removeItem('jwtToken');
      this.token == null;
  }

}
