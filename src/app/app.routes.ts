import {Routes} from '@angular/router';
import {HomeComponent} from "./home/home.component";
import {CartComponent} from "./cart/cart.component";
import {ManageProductsComponent} from "./admin/manage-products/manage-products.component";
import {AddProductComponent} from "./admin/add-product/add-product.component";
import {EditProductComponent} from "./admin/edit-product/edit-product.component";
import {ListProductsComponent} from "./list-products/list-products.component";
import {AboutComponent} from "./about/about.component";

export const routes: Routes = [
  {'path': '', component:HomeComponent},
  {'path': 'cart', component:CartComponent},
  {'path': 'admin', component:ManageProductsComponent},
  {'path': 'admin/add-product', component:AddProductComponent},
  {'path': 'admin/edit-product/:id', component:EditProductComponent},
  // { path: 'list-products', component: ListProductsComponent },
  { path: '**', redirectTo: '', pathMatch: 'full' }
];
