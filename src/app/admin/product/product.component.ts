import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ApiService } from 'src/app/services/api.service';
import { FileUploaderComponent } from '../file-uploader/file-uploader.component';
import { ProductDetailComponent } from '../product-detail/product-detail.component';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {
  title:any;

  // variabel buku sebagai objek
  // book:any={};

  //membuat collections books
  books:any=[];
  constructor(
    public dialog:MatDialog,
    public api:ApiService
  ) {
    this.title='Product';
    this.getBooks();

   }

  ngOnInit(): void {

  }
  loading: boolean = false;
  getBooks(){
    this.loading=true;

    this.api.get('bookswithauth').subscribe(result=>{
      this.books=result;
      this.loading=false;
    },error=>{
      this.loading=false;
      alert('Ada masalah dipengambilan data, silakan coba lagi!');
    }) 

  /* this.api.get('books').subscribe(result=>{
     this.books=result;
     this.loading=false;
   },error=>{
     this.loading=false;
     alert('Ada masalah dipengambilan data, silakan coba lagi!');
   }) */
  }

  productDetail(data: any , idx: number){
    let dialog=this.dialog.open(ProductDetailComponent, {
      width:"400px;", data:data}
      );
    dialog.afterClosed().subscribe(res=>{
      if(res)
      {
        //jika idx=-1 (penambahan data baru) maka tambahkan data
        if(idx==-1)this.books.push(res);
        //jika tidak maka perbarui data
        else this.books[idx]=data;
      }
    })
  }
  loadingDelete:any={};
  deleteProduct(id: number, idx: number){

    var conf=confirm('Delete Item?');
    if(conf){
      this.loadingDelete[idx]=true;
      this.api.delete('bookswithauth/'+id).subscribe(res=>{
        this.books.splice(idx,1);
        this.loadingDelete[idx]=false;
      },error=>{
        this.loadingDelete[idx]=false;
        alert('Tidak dapat menghapus data!');
      });
    }
  }

  uploadFile(data: any){
    let dialog=this.dialog.open(FileUploaderComponent, {
      width:"400px;", data:data}
      );
    dialog.afterClosed().subscribe(res=>{
      return;
    })
  }

}
