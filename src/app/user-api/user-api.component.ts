import { Component, OnInit } from '@angular/core';
import {UserInfoService} from "../user-info.service";
import {User} from "../User";
import {NgForm} from "@angular/forms";

@Component({
  selector: 'app-user-api',
  templateUrl: './user-api.component.html',
  styleUrls: ['./user-api.component.css']
})
export class UserApiComponent implements OnInit {

  constructor(private service: UserInfoService) { }

  ngOnInit() {
    this.service.getUsers();
  }

  editUserInfo(user: User) {
    this.service.user = Object.assign({}, user);
  }

  deleteUser(id: number) {
    this.service.deleteUser(id).subscribe();
    this.service.getUsers();
  }

  resetUser(form?: NgForm) {
    if(form != null) {
      form.reset();
    }
    this.service.user = {id: null, name: '', age: 0, city: '', hobbies: null}
  }

  onSubmit(form?: NgForm) {
    if(form.value.id == null) {
      this.service.postUser().subscribe((user: User) => this.service.users.push(user));
      this.resetUser();
    } else {
      this.service.updateUser(form.value.id).subscribe();
      this.service.getUsers();
    }
  }
}
