import { Component, OnInit, ViewChild } from "@angular/core";
import { Options } from "select2";
import { NgForm } from "@angular/forms";
import * as moment from "jalali-moment";

@Component({
  selector: "app-add-or-update",
  templateUrl: "./add-or-update.component.html",
  styleUrls: ["./add-or-update.component.scss"],
})
export class AddOrUpdateComponent implements OnInit {
  @ViewChild("f") form: NgForm;
  errorMessage: string;
  scheduleFlag: boolean = true;
  participantFlag: boolean = false;
  paymentDetailsFlag: boolean = false;
  title: string;
  isLoading: boolean;
  daysCount: number;
  personsCount: number;
  periodsCount: number;
  bill: number;

  public schedules: any[] = [
    {
      id: 1,
      date: "",
      time: "",
      period: "",
    },
  ];
  public participants: any[] = [
    {
      id: 1,
      name: "",
      mobile: "",
    },
  ];
  public cart = {
    title: "",
    schedules: [],
    participants: [],
  };

  public select2Options: Options;
  items = [];

  constructor() {
    // this.schedules = [];
    // this.participants = [];
    this.items = [1, 1.5, 2, 2.5, 3, 3.5, 4, 4.5, 5, 5.5, 6];
  }

  ngOnInit() {
    this.select2Options = {
      width: "100%",
      multiple: false,
      theme: "bootstrap",
    };
  }

  scheduleSubmit() {
    if (this.form.valid) {
      if (!this.schedules.length)
        return (this.errorMessage = "!یک جلسه ایجاد کنید");
      this.errorMessage = "";
      let dateIsCorrect = [];
      this.schedules.map((schedule) => {
        schedule.date = moment
          .from(schedule.date, "fa", "YYYY/MM/DD")
          .format("YYYY/MM/DD");
        dateIsCorrect.push(this.checkDate(schedule.date));
      });
      !dateIsCorrect.includes(false)
        ? ((this.scheduleFlag = false), (this.participantFlag = true))
        : null;
    } else {
      this.errorMessage = "!فیلدی را خالی نگذارید";
    }
  }

  participantSubmit() {
    if (this.form.valid) {
      this.errorMessage = "";
      if (!this.participants.length)
        return (this.errorMessage = "!یک شرکت کننده ایجاد کنید");
      this.participantFlag = false;
      this.paymentDetailsFlag = true;
      this.calculateBill();
    } else {
      this.errorMessage = "!فیلد موبایل را خالی نگذارید";
    }
  }

  participantBack() {
    this.scheduleFlag = true;
    this.participantFlag = false;
    this.errorMessage = "";
    this.schedules.map((s) => (s.date = ""));
  }

  checkDate(date) {
    const selectedTime = new Date(date).getTime();
    const nowTime = new Date().getTime();

    if (selectedTime < nowTime) {
      let remain = nowTime - selectedTime;
      remain = remain / (1000 * 3600 * 24);
      if (remain > 0 && remain < 1) return true;
      else {
        this.errorMessage = "!لطفا تاریخ درست انتخاب کنید";
        return false;
      }
    } else {
      return true;
    }
  }

  addSchedules() {
    this.schedules.push({
      id: this.schedules.length + 1,
      date: "",
      time: "",
      period: "",
    });
  }

  addParticipants() {
    this.participants.push({
      id: this.participants.length + 1,
      name: "",
      mobile: "",
    });
  }

  removeSchedule(i: number) {
    this.schedules.splice(i, 1);
  }

  removeParticipant(i: number) {
    this.participants.splice(i, 1);
  }

  calculateBill() {
    this.isLoading = true;
    this.cart.schedules = this.schedules;
    console.log(this.cart);
    this.cart.participants = this.participants;
    this.cart.title = this.title;
    this.getParticipantsCount(this.cart.participants);
    this.getDaysCount(this.cart.schedules);
    this.getPeriodCount(this.cart.schedules);
    !this.isLoading
      ? (this.bill =
          this.daysCount * this.periodsCount * this.personsCount * 1000)
      : null;
  }

  goToPay() {}

  getParticipantsCount(participants) {
    this.personsCount = participants.length;
  }

  getDaysCount(schedules) {
    let dayCount = 0;
    schedules.forEach((s) => {
      s.date ? dayCount++ : dayCount;
    });
    this.daysCount = dayCount;
  }

  getPeriodCount(schedules) {
    let periodCount = 0;
    schedules.forEach((s) => {
      s.time ? (periodCount = periodCount + Number(s.period)) : periodCount;
    });
    this.periodsCount = periodCount;
    this.isLoading = false;
  }
}
