import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {HttpClientModule, HttpClientXsrfModule} from '@angular/common/http';
import {AppComponent} from "./app.component";
import {ListProductsComponent} from "./list-products/list-products.component";
import {ProductService} from "./product.service";
import {FileSaverModule} from "ngx-filesaver";
import {RouterModule} from "@angular/router";
import {routes} from "./app.routes";



@NgModule({
  imports: [
    BrowserModule,
    HttpClientModule,
    AppComponent,
    ListProductsComponent,
    AppComponent,
    FileSaverModule,
    RouterModule.forRoot(routes),
  ],
  declarations: [],
  providers: [ProductService],
  bootstrap: [],
})
export class AppModule { }
