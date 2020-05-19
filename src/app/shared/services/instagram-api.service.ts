import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import {Observable, of} from "rxjs";
import { QUERY_ID } from "../query-options";

@Injectable({
  providedIn: 'root'
})
export class InstagramApiService {

  constructor(private  http: HttpClient) { }

  search(query: string): Observable<any> {
    return this.http.get<any>(`https://www.instagram.com/web/search/topsearch/?context=blended&query=${query}&include_reel=true`);
  }

  getUserByUsername(username: string): Observable<any> {
    return this.http.get<any>(`https://www.instagram.com/${username}/?__a=1`);
  }

  getPosts(id: string, end_cursor: string): Observable<any> {
    if (end_cursor) {
      return this.http.get<any>(`https://www.instagram.com/graphql/query/?query_hash=${QUERY_ID.user}&variables=%7B%22id%22%3A%22${id}%22%2C%22first%22%3A50%2C%22after%22%3A%22${end_cursor}%22%7D`);
    } else {
      of(null);
    }
  }
}
