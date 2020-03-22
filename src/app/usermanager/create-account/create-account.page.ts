import { Component, OnInit } from '@angular/core';
import {UserService} from '../../services/user.service';
import {FormBuilder, FormGroup, FormControl, Validators} from '@angular/forms';
import {User} from '../../models/user';
import {UtilsService} from '../../services/utils.service';
import {Router} from '@angular/router';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import { File, FileEntry } from '@ionic-native/File/ngx';
import {FilePath} from '@ionic-native/file-path/ngx';
import {WebView} from '@ionic-native/ionic-webview/ngx';
import { Storage } from '@ionic/storage';
import {ActionSheetController, AlertController, LoadingController, Platform} from '@ionic/angular';
import {PictureSourceType} from '@ionic-native/camera';

const STORAGE_KEY = 'my_images';

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
  images = [];
  accountForm: FormGroup = this.fb.group({
    username: this.username,
    email: this.email,
    telephone: this.telephone,
    password: this.password,
    photo: this.images
  });
  user: User;
  private ref: any;

  constructor(private userService: UserService, private fb: FormBuilder, private utilsService: UtilsService, private router: Router,
              private camera: Camera, private storage: Storage, private file: File, private filePath: FilePath,
              private webview: WebView, private plt: Platform, private alertCtrl: AlertController) { }

  ngOnInit() {
  }

  createAccount() {
   this.registerUser();
  }
  registerUser() {
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
  public async takePicture() {
    const options1: CameraOptions = {
      quality: 50,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE,
      sourceType: this.camera.PictureSourceType.CAMERA,
      allowEdit: true
    };
    const options2: CameraOptions = {
      quality: 50,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE,
      sourceType: this.camera.PictureSourceType.PHOTOLIBRARY,
      allowEdit: true
    };

    const alert = await this.alertCtrl.create({
      message: 'Source ?',
      buttons: [
        {
          text: 'Camera',
          handler: () => {
            this.getPicture(options1);
          }
        },
        {
          text: 'Library',
          handler: () => {
            this.getPicture(options2);
          }
        }
      ]
    });
    await alert.present();
  }

  private getPicture(options: CameraOptions) {
    this.camera.getPicture(options)
        .then(dataImage => {
              const base64Image = 'data:image/jpeg;base64,' + dataImage;
              // this.locService.addPhoto(base64Image, this.place.timestemps);
            }, (err) => {}
        );
  }
    resetForm() {
    this.username = new FormControl('');
    this.email = new FormControl('');
    this.telephone = new FormControl('');
    this.password = new FormControl('');
  }
}
