import { Component } from '@angular/core';
import AOS from 'aos';

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [],
  templateUrl: './about.component.html',
  styleUrl: './about.component.css'
})
export class AboutComponent {
  selectedImage: string = 'assets/image/air-jordan-red_1.png';

  changeImage(imageSource: string): void{
    this.selectedImage = imageSource;
  }
  constructor() {}

  ngOnInit(){
    AOS.init();
  }
}

