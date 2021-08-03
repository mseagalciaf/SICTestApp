import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ProductService } from 'src/app/services/product.service';
import { filter, map } from 'rxjs/operators';
import { MatDialog } from '@angular/material/dialog';
import { CreateDialogComponent } from '../create-dialog/create-dialog.component';
import { ConfigService } from 'src/app/config/config.service';


@Component({
  selector: 'app-read-products',
  templateUrl: './read-products.component.html',
  styleUrls: ['./read-products.component.scss']
})
export class ReadProductsComponent implements OnInit {
  isLoading:boolean=false;
  dataSource : MatTableDataSource<any>;
  displayedColumns : string[];

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(
    private productSerivce : ProductService,
    public dialog : MatDialog
  ) { 
    this.dataSource = new MatTableDataSource();
  }

  ngOnInit(): void {
    let currentUser = JSON.parse(localStorage.getItem(ConfigService.currentUserName));
    if (currentUser.roles[0].id==1) {
      this.displayedColumns = ['name','price','options'];
    }else{
      this.displayedColumns = ['name','price'];
    }
    this.getProducts();
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  openDialogCreate(){
    const ref = this.dialog.open(CreateDialogComponent);
    ref.afterClosed().subscribe(
      resp => this.getProducts()
    );
  }

  openDialogEdit(id:number){
    const ref = this.dialog.open(CreateDialogComponent);
    ref.componentInstance.isEdit = true;
    ref.componentInstance.editId=id;
    ref.afterClosed().subscribe(
      resp => this.getProducts()
    );
  }

  getProducts(){
    this.isLoading=true;
    this.productSerivce.getAllProducts().pipe(
      map(resp => resp.data)
    ).subscribe(
      resp => {
        this.dataSource.data = resp;
        this.isLoading=false;        
      },
      error => {
        console.log(error);
        this.isLoading = false;
      }
    )
  }

  deleteProduct(id:number){
    this.isLoading=true;
    this.productSerivce.deleteProduct(id).subscribe(
      resp =>{
        this.isLoading=false;
        this.getProducts();
      },
      error => {
        console.log(error);
        this.isLoading=false;
      }    
    )
  }
  
}
