import { ErrorHandler, Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';

@Injectable()
export class HttpService {
  constructor(private http: HttpClient) {}

  createAuthorizationHeader() {
    let headers: HttpHeaders = new HttpHeaders()
      .set('Content-Type', 'application/json')
      .set('Authorization', 'Bearer ' + localStorage.getItem('accessToken'));
    return headers;
  }

  get(url: string): any {
    const headers = this.createAuthorizationHeader();

    return new Promise((resolve, reject) => {
      this.http
        .get(url, { headers })
        .toPromise()
        .then((res) => {
          resolve(res);
        })
        .catch((err) => {
          reject(err);
        });
    });
  }

  post(url: string, criteria: any): any {
    const headers = this.createAuthorizationHeader();

    return new Promise((resolve, reject) => {
      this.http
        .post(url, criteria, { headers })
        .toPromise()
        .then((res) => {
          resolve(res);
        })
        .catch((err) => {
          reject(err);
        });
    });
  }

  put(url: string, criteria: any): any {
    const headers = this.createAuthorizationHeader();

    return new Promise((resolve, reject) => {
      this.http
        .put(url, criteria, { headers })
        .toPromise()
        .then((res) => {
          resolve(res);
        })
        .catch((err) => {
          reject();
        });
    });
  }

  patch(url: string, criteria: any): any {
    const headers = this.createAuthorizationHeader();

    return new Promise((resolve, reject) => {
      this.http
        .patch(url, criteria, { headers })
        .toPromise()
        .then((res) => {
          resolve(res);
        })
        .catch((err) => {
          reject();
        });
    });
  }

  delete(url: string): any {
    const headers = this.createAuthorizationHeader();

    return new Promise((resolve, reject) => {
      this.http
        .delete(url, { headers })
        .toPromise()
        .then((res) => {
          resolve(res);
        })
        .catch((err) => {
          reject();
        });
    });
  }
}
