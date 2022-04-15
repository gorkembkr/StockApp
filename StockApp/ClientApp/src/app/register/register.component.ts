import { Component, OnInit } from '@angular/core';
import {AuthService} from '../services/auth.service'
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit{

  hide = true;
  constructor(public authService: AuthService ) { }

  
  ngOnInit() {
  }
}
