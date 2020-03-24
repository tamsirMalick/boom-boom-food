import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {UserService} from '../../services/user.service';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {User} from '../../models/user';
import {Router} from '@angular/router';
import {UtilsService} from '../../services/utils.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  title = 'Acceder à mon compte';
  isForgotPassword = false;
  user: User;
  email = new FormControl('', [Validators.required, Validators.email]);
  identifier = new FormControl('', [Validators.required, Validators.email]);
  password = new FormControl('', Validators.required);
  loginForm: FormGroup = this.formBuilder.group({
    identifier: this.identifier,
    password: this.password
  });
  resetForm: FormGroup = this.formBuilder.group({
    email: this.email
  });
  constructor(private userService: UserService, private formBuilder: FormBuilder, private router: Router, private utilsService: UtilsService) { }

  ngOnInit() {
  }

  login() {
    this.userService.login(this.loginForm.value).subscribe(data => {
      this.user = data.user;
      window.localStorage.setItem('token', data.jwt);
      window.localStorage.setItem('userId', this.user.id + '');
      window.localStorage.setItem('username', this.user.username);
      window.localStorage.setItem('url', this.user.url);
      window.localStorage.setItem('role', data.user.role.type);
      window.localStorage.setItem('connected', 'connected');
      this.router.navigateByUrl(this.userService.redirectUrl);
    },
    error => {
      this.utilsService.presentToast('Email ou mot de passe incorrect', 'warning');
    });
  }
  resetAccount() {
    this.title = 'Réinitialiser mon mot de passe'
    this.isForgotPassword = true;
  }

  resetPassword() {
    this.userService.resetPassword(this.resetForm.value).subscribe(data => {
      this.utilsService.presentToast('Vérifier votre boite mail', 'success', 2000);
      this.email = new FormControl('');
    },
        error => {console.log(error); });
  }
}
