import { CourseService } from "./../course.service";
import { Component, OnInit, ViewChild, ViewEncapsulation } from "@angular/core";
import { DatatableComponent, ColumnMode } from "@swimlane/ngx-datatable";

@Component({
  selector: "app-list",
  templateUrl: "./list.component.html",
  styleUrls: ["./list.component.scss"],
  encapsulation: ViewEncapsulation.None,
})
export class ListComponent implements OnInit {
  isLoading: boolean;
  mainTableFlag: boolean = true;
  notExistDataFlag: boolean;
  courses = [];
  details = [];
  rows = [];
  temp = [];
  columns = [];
  @ViewChild(DatatableComponent) table: DatatableComponent;
  ColumnMode = ColumnMode;

  constructor(private courseService: CourseService) {
    this.fetch((data) => {
      // cache our list
      this.temp = [...this.courses];

      // push our inital complete list
      this.rows = this.courses;
    });
  }

  async ngOnInit() {
    // await this.getCourses();
    this.courses = [
      {
        id: 1,
        title: "کلاس ریکت",
        schedules: [
          { id: 1, date: "1399-02-01", time: "11:00", period: "1.5" },
          { id: 2, date: "1398-04-04", time: "12:00", period: "2" },
          { id: 3, date: "1399-02-03", time: "13:00", period: "2.5" },
        ],

        participants: [
          { id: 1, name: "علی", mobile: 11111111111 },
          { id: 2, name: "حسن", mobile: 222222222222 },
        ],
      },
      {
        id: 2,
        title: "کلاس انگولار",
        schedules: [
          { id: 1, date: "1399-03-04", time: "14:00", period: "3" },
          { id: 2, date: "1399-03-05", time: "15:00", period: "3.5" },
          { id: 3, date: "1399-03-06", time: "16:00", period: "4" },
        ],

        participants: [
          { id: 1, name: "حسین", mobile: 33333333333 },
          { id: 2, name: "سجاد", mobile: 44444444444 },
          { id: 2, name: "باقر", mobile: 55555555555 },
        ],
      },
      {
        id: 3,
        title: "کلاس نود جی اس",
        schedules: [
          { id: 1, date: "1399-04-07", time: "17:00", period: "5" },
          { id: 2, date: "1399-04-08", time: "18:00", period: "5.5" },
          { id: 3, date: "1399-04-09", time: "19:00", period: "6" },
        ],

        participants: [
          { id: 1, name: "سهیل", mobile: 66666666666 },
          { id: 2, name: "مهدی", mobile: 77777777777 },
          { id: 2, name: "عیسی", mobile: 88888888888 },
          { id: 2, name: "رضا", mobile: 99999999999 },
        ],
      },
    ];

    !this.courses.length
      ? ((this.mainTableFlag = false), (this.notExistDataFlag = true))
      : null;
  }

  getCourses() {
    this.isLoading = true;
    this.courseService.getCourses().subscribe((res) => {
      this.courses = res;
      this.isLoading = false;
    });
  }

  fetch(cb) {
    const req = new XMLHttpRequest();
    req.open("GET", `assets/data/company.json`);

    req.onload = () => {
      cb(JSON.parse(req.response));
    };

    req.send();
  }

  updateFilter(event) {
    const val = event.target.value.toLowerCase();

    // filter our data
    const temp = this.temp.filter(function (d) {
      !d.title ? (d.title = "") : d.title;
      return d.title.toLowerCase().indexOf(val) !== -1 || !val;
    });

    // update the rows
    this.rows = temp;
    // Whenever the filter changes, always go back to the first page
    this.table.offset = 0;
  }

  showInfo(id) {
    this.details = [];
    this.courses.forEach((m) => (m.id === id ? (this.details = m) : null));
    this.mainTableFlag = false;
  }

  backToMainTable() {
    this.mainTableFlag = true;
  }
}
