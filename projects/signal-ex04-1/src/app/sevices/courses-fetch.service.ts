import {Injectable} from "@angular/core";
import {environment} from "../environments/environment";
import {Course} from "../model";

@Injectable({
  providedIn: "root"
})
export class CoursesServiceWithFetch {

  env = environment;

  async loadAllCourses(): Promise<Course[]> {
    const response = await fetch(`${this.env.apiRoot}/courses`);
    const payload = await response.json();
    return payload.courses;

    // const response = await fetch(`${this.env.apiRoot}/courses`);
    //     .then()
    //     .catch();
    //     const payload = await response.json();
    //     return Promise.resolve(payload.courses);

        //return payload.courses as Course[];
        //return [];
  }
}
