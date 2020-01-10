import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { BehaviorSubject, Observable, of } from "rxjs";
import { map } from "rxjs/operators";
import { User } from "../User";

@Injectable({
  providedIn: "root"
})
export class BackendService {
  // private baseUrl: string = "http://mean-demo.eu-4.evennode.com:4000/api";
  private baseUrl: string = "http://localhost:4000/api";
  private userSubject = new BehaviorSubject<User[]>([]);
  private usersObs = this.userSubject.asObservable();
  constructor(private http: HttpClient) {}
  public getAllUsers(): Observable<User[]> {
    return this.http.get<User[]>(`${this.baseUrl}/users`);
  }
  public getUser(id): Observable<User> {
    return this.http.get<User>(`${this.baseUrl}/users/${id}`);
  }
  public addUser(
    firstname: string,
    lastname: string,
    email: string
  ): Observable<any> {
    return this.http.post(`${this.baseUrl}/users/create`, {
      firstName: firstname,
      lastName: lastname,
      email: email
    });
  }
  public editUser(
    id: number,
    firstName: string,
    lastName: string,
    email: string
  ): Observable<User> {
    return this.http.put<User>(`${this.baseUrl}/users/update/${id}`, {
      firstName: firstName,
      lastName: lastName,
      email: email
    });
  }
  public deleteUser(id: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/users/delete/${id}`);
  }
}
