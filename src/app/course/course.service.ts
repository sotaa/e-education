import { ICourse } from "./models/course.interface";
import { Injectable } from "@angular/core";
import { AuthHttpClient } from "src/app/auth/auth-http-client.service";
import { environment } from "../../environments/environment";
import { map } from "rxjs/operators";

@Injectable({
  providedIn: "root",
})
export class CourseService {
  courses = [];
  constructor(private authHttpClient: AuthHttpClient) {}

  createCourse(data: ICourse) {
    return this.authHttpClient
      .post<ICourse>(environment.identityUrls.createCourse, data)
      .pipe(map((res) => res));
  }

  getCourses() {
    return this.authHttpClient
      .get<ICourse[]>(environment.identityUrls.readCourses)
      .pipe(map((res) => res));
  }

  editCourse(data: ICourse, id) {
    return this.authHttpClient
      .put<ICourse>(environment.identityUrls.createCourse + `/${id}`, data)
      .pipe(map((res) => res));
  }

  getCourse(id) {
    return this.authHttpClient
      .get<ICourse>(environment.identityUrls.readCourse.concat(id))
      .pipe(map((res) => res));
  }

  deleteCourse(id) {
    return this.authHttpClient
      .delete(environment.identityUrls.deleteCourse.concat(id))
      .pipe(map((res) => res));
  }
}
