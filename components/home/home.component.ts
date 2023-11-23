import { AfterViewInit, Component, OnInit } from '@angular/core';
import { OwlOptions } from 'ngx-owl-carousel-o';



@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})

export class HomeComponent implements OnInit , AfterViewInit {

 public customOptions: OwlOptions = {};
  constructor() {

 
   }










  ngOnInit(): void {

    this.customOptions = {
      loop: true,
      autoWidth: true,
      mouseDrag: true,
      touchDrag: true,
      pullDrag: false,
      dots: false,
      navSpeed: 5,
      autoplay: true,
      autoplayHoverPause: true,
      navText: ['&#8249', '&#8250;'],
      responsive: {
        0: {
          items: 1 
        },
        400: {
          items: 1
        },
        760: {
          items: 1
        },
        1000: {
          items: 1
        }
      },
      nav: true
    }

  }

  ngAfterViewInit() {

    this.initCameraSlider();
    
  }


  private initCameraSlider() {
    // $('.camera_caption').camera({
    //   height: 'auto',
    //   loader: 'bar',
    //   pagination: false,
    //   thumbnails: false,
    //   playPause: false,
    //   navigation: false,
    //   time: 5000,
    // });

 

  }

}
