import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  userTestStatus: { id: number, name: string }[] = [
    { id: 0, name: 'Available' },
    { id: 1, name: 'Ready' },
    { id: 2, name: 'Started' }
];
  constructor(private http: HttpClient) { }
  Login(user: User){
    return this.http.post<User>('/api/login', {user});
  }
}
