import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  slideOpts = {
    effect: 'flip',
    autoplay: {
      delay: 3000,
      disableOnInteraction: false,
    },
    loop: true,
    speed: 1500,
    pagination: {
      el: '.swiper-pagination',
      clickable: true,
    }
  };
}
