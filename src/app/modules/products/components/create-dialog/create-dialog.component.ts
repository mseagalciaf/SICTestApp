import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { map } from 'rxjs/operators';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-create-dialog',
  templateUrl: './create-dialog.component.html',
  styleUrls: ['./create-dialog.component.scss']
})
export class CreateDialogComponent implements OnInit {

  isLoading:boolean=false;
  @Input() isEdit:boolean=false;
  @Input() editId:number;
  public checkoutProductForm = this.formBuilder.group({
    name: ['', Validators.required],
    price : ['', Validators.required]
  });

  constructor(
    private formBuilder: FormBuilder,
    private productService : ProductService,
    private dialogRef : MatDialogRef<any>
  ) { }

  ngOnInit(): void {
    if (this.isEdit) {
      this.getProduct();
    }
  }

  onSubmit(dataForm:any){
    if (this.isEdit) {
      this.productService.updateProduct(this.editId,dataForm).subscribe(
        resp => {
          this.dialogRef.close();
        },
        error => console.log(error)
      )
    }else{
      this.productService.createProduct(dataForm).subscribe(
        resp => {
          this.dialogRef.close();
        },
        error => console.log(error)      
      )
    }
  }

  getProduct(){
    this.productService.getProduct(this.editId).pipe(
      map(resp => resp.data)
    ).subscribe(
      resp => {
        this.checkoutProductForm.controls['name'].setValue(resp.name);
        this.checkoutProductForm.controls['price'].setValue(resp.price);
      },
      error => console.log(error)      
    )
  }
}
