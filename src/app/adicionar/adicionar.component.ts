import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Component, Inject } from '@angular/core';
import { DataService } from '../services/data.service';
import { FormControl, Validators } from '@angular/forms';
import { Issue } from '../models/issue';


@Component({
  selector: 'app-adicionar',
  templateUrl: './adicionar.component.html',
  styleUrls: ['./adicionar.component.css']
})
export class AdicionarComponent {

  constructor(public dialogRef: MatDialogRef<AdicionarComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Issue,
    public dataService: DataService) { }


  formControl = new FormControl('', [
    Validators.required
    // Validators.email,
  ]);


  getErrorMessage() {
    return this.formControl.hasError('required') ? 'Campo Obrigatório' :
      this.formControl.hasError('email') ? 'Não é um email válido' :
        '';
  }

  submit() {
  }

  onNoClick(): void {
    // this.dialogRef.close();
  }

  public confirmAdd() {
    const object = {
      _id: this.data._id,
      envio: this.data.envio,
      adesao: this.data.adesao,
      empresa: this.data.empresa,
      plano: this.data.plano,
      cnpj: this.data.cnpj,
      tarifa: this.data.tarifa,
      vplano: this.data.vplano,
      minutos: this.data.minutos
    };

    this.dataService.addItem(object);
    this.dataService.addIssue(this.data);

  }

}



