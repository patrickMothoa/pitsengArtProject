import { Component, OnInit } from '@angular/core';
import { ProductService } from '../services/product.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-pages',
  templateUrl: './pages.page.html',
  styleUrls: ['./pages.page.scss'],
})
export class PagesPage implements OnInit {

  details: any;
 
  slideOpts = {
    autoplay: {
      delay: 1000,
      disableOnInteraction: false
    }
  };
 
  constructor(private proService: ProductService, private route: ActivatedRoute) { }
 
  ngOnInit() {
    //let index = this.route.snapshot.paramMap.get('index');
    // this.proService.getPokeDetails(index).subscribe(details => {
    //   this.details = details;
    // });
  }

}
