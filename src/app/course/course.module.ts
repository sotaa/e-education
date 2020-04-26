import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { CommonModule } from "@angular/common";
import { Routes, RouterModule } from "@angular/router";
import { ListComponent } from "./list/list.component";
import { AddOrUpdateComponent } from "./add-or-update/add-or-update.component";
import { SharedModule } from "../shared/shared.module";
import { DpDatePickerModule } from "ng2-jalali-date-picker";
import { NgSelect2Module } from "ng-select2";
import { NgxDatatableModule } from "@swimlane/ngx-datatable";
import { DetailsComponent } from "./details/details.component";

const routes: Routes = [
  {
    path: "",
    pathMatch: "full",
    component: ListComponent,
  },
  { path: "add", component: AddOrUpdateComponent },
  { path: "update/:id", component: AddOrUpdateComponent },
];

@NgModule({
  declarations: [ListComponent, AddOrUpdateComponent, DetailsComponent],
  imports: [
    CommonModule,
    FormsModule,
    SharedModule,
    RouterModule.forChild(routes),
    DpDatePickerModule,
    NgSelect2Module,
    NgxDatatableModule,
  ],
})
export class CourseModule {}
