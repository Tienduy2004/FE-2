import { Component, ElementRef, HostListener, OnInit, Renderer2 } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavigationEnd, RouterLink, Router, RouterOutlet, ActivatedRoute } from '@angular/router';
import { HomeComponent } from "./home/home.component";
import { ListProductsComponent } from "./list-products/list-products.component";
import { CartComponent } from "./cart/cart.component";
import { filter } from "rxjs";
import { UserOptionsComponent } from "./user-options/user-options.component";
import { AboutComponent } from "./about/about.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, HomeComponent, ListProductsComponent, CartComponent, RouterLink, UserOptionsComponent, AboutComponent],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'Front-end';
  dropdownOpen = false;
  showUserOptions = false;
  ktra = false;

  constructor(private router: Router, private route: ActivatedRoute, private el: ElementRef, private renderer: Renderer2) { }

  ngOnInit() {
    // Subscribe to NavigationEnd events for scrolling
    this.router.events.pipe(
      filter((event) => event instanceof NavigationEnd)
    ).subscribe(() => {
      const fragment = this.route.snapshot.fragment;
      if (fragment) {
        this.scrollToSection(fragment);
      }
    });
  }

  // Scroll to the specified section
  private scrollToSection(id: string) {
    const element = this.el.nativeElement.querySelector(`#${id}`);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start', inline: 'nearest' });
    }
  }

  @HostListener('document:click', ['$event'])
  handleClickOutside(event: Event) {
    if (!this.ktra) {
      this.showUserOptions = false;
    }
    this.ktra = false;
  }

  toggleUserOptions() {
    this.showUserOptions = !this.showUserOptions;
    this.ktra = true;
  }

  toggleDropdown() {
    this.dropdownOpen = !this.dropdownOpen;
  }
  
}
