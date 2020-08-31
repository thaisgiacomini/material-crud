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

   ngOnInit(): void {
  }

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

  public confirmAdd(): void {
    this.dataService.addIssue(this.data);
    this.dataService.addItem(this.data);

  }




 

}



