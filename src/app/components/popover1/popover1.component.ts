import { Component, OnInit } from '@angular/core';
import { PopoverController } from '@ionic/angular';

@Component({
  selector: 'app-popover1',
  templateUrl: './popover1.component.html',
  styleUrls: ['./popover1.component.scss'],
})
export class Popover1Component implements OnInit {

  constructor(private popoverController: PopoverController) { }

  ngOnInit() {}
  async DismissClick() {
    await this.popoverController.dismiss();
      }

}
