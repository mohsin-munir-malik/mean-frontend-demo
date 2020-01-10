import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { ListComponentComponent } from "./list-component/list-component.component";
import { AddComponentComponent } from "./add-component/add-component.component";
import { EditComponentComponent } from "./edit-component/edit-component.component";
import { PageNotFoundComponent } from "./page-not-found/page-not-found.component";

const routes: Routes = [
  {
    path: "",
    pathMatch: "full",
    redirectTo: "list"
  },
  {
    path: "list",
    component: ListComponentComponent
  },
  {
    path: "add",
    component: AddComponentComponent
  },
  {
    path: "edit/:id",
    component: EditComponentComponent
  },
  {
    path: "**",
    component: PageNotFoundComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
