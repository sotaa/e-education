import {
  Component,
  OnInit,
  Input,
  ViewEncapsulation,
  ViewChild,
} from "@angular/core";
import { DatatableComponent, ColumnMode } from "@swimlane/ngx-datatable";

@Component({
  selector: "app-details",
  templateUrl: "./details.component.html",
  styleUrls: ["./details.component.scss"],
  encapsulation: ViewEncapsulation.None,
})
export class DetailsComponent implements OnInit {
  @Input() details;
  schedulesFlag: boolean = true;
  participantsFlag: boolean;

  data = [];
  rows = [];
  temp = [];
  columns = [];
  @ViewChild(DatatableComponent) table: DatatableComponent;
  ColumnMode = ColumnMode;

  constructor() {
    this.fetch((data) => {
      // cache our list
      this.temp = [...this.data];

      // push our inital complete list
      this.rows = this.data;
    });
  }

  ngOnInit() {
    this.data = this.details.schedules;
  }

  fetch(cb) {
    const req = new XMLHttpRequest();
    req.open("GET", `assets/data/company.json`);

    req.onload = () => {
      cb(JSON.parse(req.response));
    };

    req.send();
  }

  updateSchedulesFilter(event) {
    const val = event.target.value.toLowerCase();
    // filter our data
    const temp = this.temp.filter(function (d) {
      !d.date ? (d.date = "") : d.date;
      !d.time ? (d.time = "") : d.time;
      !d.period ? (d.period = "") : d.period;
      return (
        d.date.toLowerCase().indexOf(val) !== -1 ||
        !val ||
        d.time.toLowerCase().indexOf(val) !== -1 ||
        !val ||
        d.period.toLowerCase().indexOf(val) !== -1 ||
        !val
      );
    });
    // update the rows
    this.rows = temp;
    // Whenever the filter changes, always go back to the first page
    this.table.offset = 0;
  }

  updateParticipantsFilter(event) {
    const val = event.target.value.toLowerCase();
    // filter our data
    const temp = this.temp.filter(function (d) {
      !d.name ? (d.name = "") : d.name;
      !d.mobile ? (d.mobile = "") : d.mobile;
      return (
        d.name.toLowerCase().indexOf(val) !== -1 ||
        !val ||
        d.mobile.toString().toLowerCase().indexOf(val) !== -1 ||
        !val
      );
    });
    // update the rows
    this.rows = temp;
    // Whenever the filter changes, always go back to the first page
    this.table.offset = 0;
  }

  showParticipants() {
    this.participantsFlag = true;
    this.schedulesFlag = false;
    this.rows = this.details.participants;
    this.temp = this.details.participants;
  }

  showSchedules() {
    this.schedulesFlag = true;
    this.participantsFlag = false;
    this.rows = this.details.schedules;
    this.temp = this.details.schedules;
  }
}
