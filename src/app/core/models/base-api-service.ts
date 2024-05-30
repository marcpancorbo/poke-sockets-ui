import { HttpClient } from '@angular/common/http';
import { Inject, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { BASE_API_PATH } from '../injection/base-api-path';

export class BaseApiService {
  private baseApiPath = inject(BASE_API_PATH);
  private baseUrl: string;
  public httpClient: HttpClient = inject(HttpClient);

  constructor(protected baseApi: string = '') {
    this.baseUrl = this.baseApiPath + baseApi;
  }

  public get<T>(url: string, options?: object): Observable<T> {
    url = this.baseUrl + url;
    return this.httpClient.get<T>(url, options);
  }

  public post<T>(url: string, body?: object, options?: object): Observable<T> {
    url = this.baseUrl + url;
    return this.httpClient.post<T>(url, body, options);
  }

  public put<T>(url: string, body?: object, options?: object): Observable<T> {
    url = this.baseUrl + url;
    return this.httpClient.put<T>(url, body, options);
  }

  public delete<T>(url: string, options?: object): Observable<T> {
    url = this.baseUrl + url;
    return this.httpClient.delete<T>(url, options);
  }
}
