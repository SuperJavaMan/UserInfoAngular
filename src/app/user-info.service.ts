import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {User} from "./User";

@Injectable({
  providedIn: 'root'
})
export class UserInfoService {

  URL = "http://localhost:8080/users/";

  user: User = new User(null, '', 0, '', null);
  users: User[] = [];
  constructor(private http: HttpClient) { }

  getUsers() {
    this.http.get(this.URL).subscribe((data: User[]) => this.users = data);
  }

  getUser(id: number) {
    return this.http.get(this.URL + id);
  }

  postUser() {
    return this.http.post(this.URL, this.user);
  }

  updateUser(id: number) {
    return this.http.put(this.URL + id, this.user);
  }

  deleteUser(id: number) {
    return this.http.delete(this.URL + id, { responseType: "text" });
  }
}
