import { ErrorHandler, Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';

@Injectable()
export class HttpService {
  constructor(
    private http: HttpClient,
  ) {}

  createAuthorizationHeader() {
    let headers: HttpHeaders = new HttpHeaders().set(
      'Content-Type',
      'application/json'
    );
    return headers;
  }

  get(url: string): any {
    const headers = this.createAuthorizationHeader();

    return new Promise((resolve, reject) => {
      // this.http.get(url, { headers, withCredentials: true })
      this.http.get(url)
        .toPromise()
        .then(res => {
          resolve(res);
        }).catch(err => {
          reject(err);
        });
    });
  }

  post(url: string, criteria: any): any {
    const headers = this.createAuthorizationHeader();

    return new Promise((resolve, reject) => {
      // this.http.post(url, criteria, { headers, withCredentials: true })
      this.http.post(url, criteria)
        .toPromise()
        .then(res => {
          resolve(res);
        }).catch(err => {
          reject(err);
        });
    });
  }

  patch(url: string, criteria: any): any {
    const headers = this.createAuthorizationHeader();

    return new Promise((resolve, reject) => {
      // this.http.patch(url, criteria, { headers, withCredentials: true })
      this.http.patch(url, criteria)
        .toPromise()
        .then(res => {
          resolve(res);
        }).catch(err => {
          reject();
        });
    });
  }

  delete(url: string): any {
    const headers = this.createAuthorizationHeader();

    return new Promise((resolve, reject) => {
      // this.http.delete(url, { headers, withCredentials: true })
      this.http.delete(url)
        .toPromise()
        .then(res => {
          resolve(res);
        }).catch(err => {
          reject();
        });
    });
  }
}
