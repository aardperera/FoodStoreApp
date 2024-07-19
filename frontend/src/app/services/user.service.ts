import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { User } from '../shared/models/User';
import { IUserLogin } from '../shared/interfaces/IUserLogin';
import { HttpClient, HttpErrorResponse} from '@angular/common/http';
import { USER_LOGIN_URL } from '../shared/constants/urls';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private userSubject = new BehaviorSubject<User>(new User());
  public userObservable:Observable<User>;

  constructor(private http:HttpClient, private toastrService:ToastrService) {
    this.userObservable = this.userSubject.asObservable();
  }

  login(userLogin:IUserLogin):Observable<User>{
    return this.http.post<User>(USER_LOGIN_URL,userLogin).pipe(
      tap({
        next:(user)=>{
          console.log('User login successful', user);
          this.userSubject.next(user);
          this.toastrService.success(
            `Welcome to FoodStore ${user.name}!`,
            'Login Successful'
          )
        },
        error:(errorResponse:HttpErrorResponse)=>{
          this.toastrService.error(errorResponse.error,'Login Failed');
        }
      })
    );
  }
}
