import { Injectable, NgZone } from '@angular/core';
import { User } from './user';
import { AngularFireAuth  } from '@angular/fire/compat/auth';
import { Router } from "@angular/router";
import { AngularFirestoreDocument ,AngularFirestore } from '@angular/fire/compat/firestore';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  userData: any;

  constructor(
    public afs: AngularFirestore ,
    public afAuth: AngularFireAuth,
    public router: Router,
    public ngZone: NgZone
  ) { 
    this.afAuth.authState.subscribe(user =>{
      if(user){
        this.userData = user;
        localStorage.setItem('user',JSON.stringify(this.userData));
      }else{
        localStorage.setItem('user',null!);
        JSON.parse(localStorage.getItem('user') ||'{}');
      }
    });
  }
  SignIn(email,password){
    return this.afAuth.signInWithEmailAndPassword(email, password)
    .then((result) => {
      this.ngZone.run(() => {
        this.router.navigate(['market']);
      });
      this.SetUserData(result.user);
    }).catch((error) => {
     // window.alert(error.message);
    });
}//sign up function
SignUp(email, password) {
  return this.afAuth.createUserWithEmailAndPassword(email, password)
    .then((result) => {
      this.SendVerificationMail();
      this.SetUserData(result.user);
    }).catch((error) => {
     // window.alert(error.message);
    });
}//Verification Mail to user
SendVerificationMail() {
  return this.afAuth.currentUser.then(u => u!.sendEmailVerification())
    .then(() => {
      this.router.navigate(['verify-email']);
    })
} //Reset Password Function
ForgotPassword(passwordResetEmail) {
  return this.afAuth.sendPasswordResetEmail(passwordResetEmail)
  .then(() => {
    window.alert('Password reset email sent, check your inbox.');
  }).catch((error) => {
    window.alert(error);
  });
}//check user login
get isLoggedIn(): boolean {
  const user = JSON.parse(localStorage.getItem('user') || '{}');
  return (user !== null && user.emailVerified !== false) ? true : false;
}//set full user data we get
SetUserData(user) {
  const userRef: AngularFirestoreDocument = this.afs.doc(`users/${user.uid}`);
  const userData: User = {
    uid: user.uid,
    email: user.email,
    emailVerfied : user.emailVerfied,
    name : user.name,
    surname : user.surname,
    phone : user.phone,
    adress : user.adress,
    postadress : user.postadress,
    birthday : user.birthday,
    country : user.country,
    city : user.city
  }
  return userRef.set(userData, {
    merge: true
  });
}
 // Sign out function
 SignOut() {
  return this.afAuth.signOut().then(() => {
    localStorage.removeItem('user');
    this.router.navigate(['home']);
  });
}
}

//https://www.eduforbetterment.com/firebase-authentication-email-in-angular/
//https://stackoverflow.com/questions/55713106/how-can-i-add-angular-custom-shield-in-my-sign-up-form-for-my-angular-firebase-d