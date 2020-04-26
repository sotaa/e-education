import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { LayoutComponent } from "./layout/layout.component";
import { NavbarComponent } from "./layout/navbar/navbar.component";
import { FooterComponent } from "./layout/footer/footer.component";
import { DashboardRoutingModule } from "./dashboard-routing/dashboard-routing.module";

@NgModule({
  declarations: [LayoutComponent, NavbarComponent, FooterComponent],
  imports: [CommonModule, DashboardRoutingModule],
})
export class DashboardModule {}
