import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import {Observable, of} from "rxjs";
import { FIRST, QUERY_ID } from '../query-options';

@Injectable({
  providedIn: 'root'
})
export class InstagramApiService {

  constructor(private  http: HttpClient) { }

  search(query: string): Observable<any> {
    const search: string = encodeURIComponent(query);
    return this.http.get<any>(`https://www.instagram.com/web/search/topsearch/?context=blended&query=${search}&include_reel=true`);
  }

  getUserByUsername(username: string): Observable<any> {
    return this.http.get<any>(`https://www.instagram.com/${username}/?__a=1`);
  }

  getPosts(id: string, end_cursor: string): Observable<any> {
    if (end_cursor) {
      return this.http.get<any>(`https://www.instagram.com/graphql/query/?query_hash=${QUERY_ID.user}&variables=%7B%22id%22%3A%22${id}%22%2C%22first%22%3A${FIRST}%2C%22after%22%3A%22${end_cursor}%22%7D`);
    } else {
      return of(null);
    }
  }

  getPostByShortcode(shortcode: string): Observable<any> {
    return this.http.get<any>(`https://www.instagram.com/graphql/query/?query_hash=${QUERY_ID.post}&variables=%7B%22shortcode%22%3A%22${shortcode}%22%2C%22child_comment_count%22%3A50%2C%22fetch_comment_count%22%3A50%2C%22parent_comment_count%22%3A50%2C%22has_threaded_comments%22%3Atrue%7D`);
  }

  getComments(shortcode: string, end_cursor: string): Observable<any> {
    return this.http.get<any>(`https://www.instagram.com/graphql/query/?query_hash=${QUERY_ID.comments}&variables=%7B%22shortcode%22%3A%22${shortcode}%22%2C%22first%22%3A50%2C%22after%22%3A%22${end_cursor}%22%7D`);
  }

  getThread(comment_id: string, end_cursor: string): Observable<any> {
    return this.http.get<any>(`https://www.instagram.com/graphql/query/?query_hash=${QUERY_ID.thread}&variables=%7B%22comment_id%22%3A%22${comment_id}%22%2C%22first%22%3A50%2C%22after%22%3A%22${end_cursor}%22%7D`);
  }

  getTag(tag: string): Observable<any> {
    return this.http.get<any>(`https://www.instagram.com/explore/tags/${tag}/?__a=1`);
  }

  getPostsHashtag(tag: string, end_cursor: string): Observable<any> {
    return this.http.get<any>(`https://www.instagram.com/graphql/query/?query_hash=${QUERY_ID.tag}&variables=%7B%22tag_name%22%3A%22${tag}%22%2C%22first%22%3A150%2C%22after%22%3A%22${end_cursor}%22%7D`);
  }

  getLocation(id: string, slug?: string): Observable<any> {
    return this.http.get<any>(`https://www.instagram.com/explore/locations/${id}/${slug? slug +'/' : ''}?__a=1`);
  }

  getPostsLocation(id: string, end_cursor: string): Observable<any> {
    return this.http.get<any>(`https://www.instagram.com/graphql/query/?query_hash=${QUERY_ID.location}&variables=%7B%22id%22%3A%22${id}%22%2C%22first%22%3A${FIRST}%2C%22after%22%3A%22${end_cursor}%22%7D`);
  }
}
