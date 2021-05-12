import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

  constructor(
    public api:ApiService,
    public router:Router
  ) { }

  ngOnInit(): void {
    this.checkLogin();
  }

  menu=[
    {
      name:'Dashboard',
      icon:'dashboard',
      url:'/admin/dashboard'
    },
    {
      group:'Menu Group',
      children:[
        {
          name:'Image Gallery',
          icon:'images',
          url:'/admin/images'
        }
      ]
    }
  ];

  checkLogin(){
    this.api.get('bookswithauth/status').subscribe(res=>{
      //is logegd in
      return;
    },err=>{
      //not logged in
      this.router.navigate(['/login']);
    })
  }

  logout(){
    let conf = confirm('Keluar Aplikasi?');
    if(conf){
      localStorage.removeItem('appToken');
      window.location.reload();
    }
  }

}