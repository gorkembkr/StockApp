import { Component} from '@angular/core';
import { NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {FormControl, FormGroupDirective, NgForm, Validators} from '@angular/forms';
import {ErrorStateMatcher} from '@angular/material/core';
import {AuthService} from '../services/auth.service'



export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}
@Component({
  selector: 'app-nav-menu',
  templateUrl: './nav-menu.component.html',
  styleUrls: ['./nav-menu.component.css']
})
export class NavMenuComponent {
  

  closeResult!: string;
  hide = true;

  matcher = new MyErrorStateMatcher();

  isExpanded = false;

  collapse() {
    this.isExpanded = false;
  }

  toggle() {
    this.isExpanded = !this.isExpanded;
  }
  constructor(private modalService: NgbModal,
    public authService: AuthService)  {}

  ngOnInit(): void {
  }   
  open(content) {
    this.modalService.open(content);
  }
  

}

