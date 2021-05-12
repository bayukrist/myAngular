import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-file-uploader',
  templateUrl: './file-uploader.component.html',
  styleUrls: ['./file-uploader.component.css']
})
export class FileUploaderComponent implements OnInit {

  constructor(
    public api:ApiService,
    public dialogRef:MatDialogRef<FileUploaderComponent>
  ) { }

  ngOnInit(): void {
  }

  selectedFile:any;
  onFileChange(event: any){
    if(event.target.files.length > 0){
      this.selectedFile = event.target.files[0];
      console.log(this.selectedFile);
    }
  }

  loadingUpload:boolean=false;
  uploadFile(){
    let input = new FormData();
    input.append('file',this.selectedFile);
    this.loadingUpload=true;
    this.api.upload(input).subscribe(data=>{
      this.updateProduct(data);
      console.log(data);
      this.loadingUpload = false;
    },error=>{
      this.loadingUpload = false;
      alert("gagal upload file");
    });
  }

  updateProduct(data: any){
    if(data.status == true){
      //update file disini

      alert("File berhasil diupload");
      this.dialogRef.close();
    }else{
      alert(data.message);
    }
  }

}
