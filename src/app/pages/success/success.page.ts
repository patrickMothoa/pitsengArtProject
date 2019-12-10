import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-success',
  templateUrl: './success.page.html',
  styleUrls: ['./success.page.scss'],
})
export class SuccessPage implements OnInit {
  ngOnInit(): void {
    throw new Error("Method not implemented.");
  }

  constructor(private router: Router) { }

  takeHome(){
    this.router.navigateByUrl('/home');
  }
}
