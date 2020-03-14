import { Component, OnInit } from '@angular/core';
import {UserService} from '../../services/user.service';
import {FormBuilder, FormGroup, FormControl, Validators} from '@angular/forms';
import {User} from '../../models/user';
import {UtilsService} from '../../services/utils.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-create-account',
  templateUrl: './create-account.page.html',
  styleUrls: ['./create-account.page.scss'],
})
export class CreateAccountPage implements OnInit {
  username = new FormControl('', [Validators.required, Validators.email]);
  email = new FormControl('', Validators.required);
  telephone = new FormControl('', Validators.required);
  password = new FormControl('', Validators.required);
  accountForm: FormGroup = this.fb.group({
    username: this.username,
    email: this.email,
    telephone: this.telephone,
    password: this.password
  });
  user: User;

  constructor(private userService: UserService, private fb: FormBuilder, private utilsService: UtilsService, private router: Router) { }

  ngOnInit() {
  }

  createAccount() {
    this.user = this.accountForm.value;
    this.userService.addUSer(this.user).subscribe(() => {
      this.resetForm();
      this.utilsService.presentToast('Inscription réussie', 'success');
      this.router.navigateByUrl('/login');
    },
    error => {
      switch (error.error.message[0].messages[0].id) {
        case 'Auth.form.error.email.taken':
          this.utilsService.presentToast('Email déja utilisé !', 'danger');
          break;
        case 'Auth.form.error.username.taken':
          this.utilsService.presentToast('Nom d\'utilisateur déja utilisé !', 'danger');
          break;
        default:
          this.utilsService.presentToast('Une erreur est survenue !', 'danger');
          break;
      }
    });
  }
  resetForm() {
    this.username = new FormControl('');
    this.email = new FormControl('');
    this.telephone = new FormControl('');
    this.password = new FormControl('');
  }
}
