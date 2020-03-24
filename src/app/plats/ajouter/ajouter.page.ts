import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {Plat} from 'src/app/models/plat';
import {PlatService} from '../../services/plat.service';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {Camera, CameraOptions} from '@ionic-native/camera/ngx';
import {Storage} from '@ionic/storage';
import {AlertController} from '@ionic/angular';
import {UtilsService} from '../../services/utils.service';


@Component({
  selector: 'app-ajouter',
  templateUrl: './ajouter.page.html',
  styleUrls: ['./ajouter.page.scss'],
})
export class AjouterPage implements OnInit {
  private plat: Plat;
  image: any;
  nom = new FormControl('', Validators.required);
  prix = new FormControl('', [Validators.required]);
  description = new FormControl('', [Validators.required]);
  platImg = new FormControl('', [Validators.required]);
  ajoutForm: FormGroup = this.fb.group({
      nom: this.nom,
   prix: this.prix,
   description: this.description,
   platImg: this.platImg
 });

  constructor(private router: Router, private platService: PlatService, private fb: FormBuilder, private utilsService: UtilsService,
              private camera: Camera, private storage: Storage, private alertCtrl: AlertController) {
  }

  ngOnInit() {

  }

  back() {
    this.resetForm();
    this.router.navigateByUrl('/plats');
  }

  onAdd() {
    this.plat = this.ajoutForm.value;
    this.platService.addPlat(this.plat).subscribe(() => { this.back(); });
  }

  resetForm() {
    this.nom = new FormControl('');
    this.prix = new FormControl('');
    this.description = new FormControl('');
  }

    private async takePhoto() {
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
                this.image = 'data:image/jpeg;base64,' + dataImage;
                }, (err) => {
                    this.utilsService.presentToast('Une erreur est survenue !', 'danger');
                }
            );
    }
}
