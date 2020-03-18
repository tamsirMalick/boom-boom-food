import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Plat } from 'src/app/models/plat';
import { PlatService } from '../../services/plat.service';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';


@Component({
  selector: 'app-ajouter',
  templateUrl: './ajouter.page.html',
  styleUrls: ['./ajouter.page.scss'],
})
export class AjouterPage implements OnInit {
  private plat: Plat;
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

  constructor(private router: Router, private platService: PlatService, private fb: FormBuilder) {
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
}
