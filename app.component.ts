import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { courseObject } from './courseInterface'
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';


@Injectable()
export class ConfigService {
  private url: string = "http://localhost:3000/api/courseData";

  constructor(private http: HttpClient) {}
   getcourses(): Observable<courseObject[]> {
     return this.http.get<courseObject[]>(this.url);
   }
  getData(){};
  searchSubmitted(){};
  renderTimeTable(){};
  addCoursesToSchedule(){};
  scheduleSelected(scheduleName: string){};
  createSchedule(){};
  scheduleNameInput;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  ngOnInit(){};
  // selectValue;
  title = 'lab4-angular';
  show = true;
  checkboxValue: boolean = false;
  scheduleNameInput: string; // initalizing to "" will cause errors: schedules will never have names

  showInfoTable = false; // info table is rendered only when this is true
  showTimeTable = false; // time table is rendered only when this is true
  renderedSchedule;
  columnLabels = ["Course Number", "Subject", "Class Name", "Description", "Selected"]; //todo add course_info columns
  data: { [key: string]: any } = {};
  checked: boolean[] = [];
  objectKeys = Object.keys;

  activeSchedule: object[] = []; // giving errors
  actvieScheduleName: string;
  selectedCourses: object[] = []; // array of SELECTED courses (full data)
  scheduleData: any = {};
  timeBasedSchedule;

  // for searching data
  dataArray;
  matchingCourses;

  constructor(private _configservice:ConfigService){
  
    this.showInfoTable = false;
    this.showTimeTable = false;
    this.checked = [];
    this.scheduleNameInput = "";
    this.actvieScheduleName = "";
    // this.selectValue = "";
    this.timeBasedSchedule = {"8:30 AM": {},"9:30 AM": {},"10:30 AM": {},"11:30 AM": {},"12:30 PM": {},"1:30 PM": {},"2:30 PM": {},"3:30 PM": {},"4:30 PM": {},"5:30 PM": {},"6:30 PM": {},"7:30 PM": {},"8:30 PM": {},"9:30 PM": {}};
    this.renderedSchedule = "";

    this.dataArray = [];
    // dataArray = courses
    this.matchingCourses = [];

  }

  getData(){
    this.matchingCourses = [];

    // make http request to get data object
    this._configservice.getcourses().subscribe(timetableData => this.dataArray = timetableData);

    // ignore
    let jsonData = [
      {
        "catalog_nbr": "1021B",
        "subject": "ACTURSCI",
        "className": "INTRO TO FINANCIAL SECURE SYS",
        "course_info": [
          {
            "class_nbr": 5538,
            "start_time": "8:30 AM",
            "descrlong": "",
            "end_time": "9:30 AM",
            "campus": "Main",
            "facility_ID": "PAB-106",
            "days": [
              "M",
              "W",
              "F"
            ],
            "instructors": [],
            "class_section": "001",
            "ssr_component": "LEC",
            "enrl_stat": "Not full",
            "descr": "RESTRICTED TO YR 1 STUDENTS."
          }
        ],
        "catalog_description": "The nature and cause of financial security and insecurity; public, private and employer programs and products to reduce financial insecurity, including social security, individual insurance and annuities along with employee pensions and benefits.\n\nExtra Information: 3 lecture hours."
      },
      {
        "catalog_nbr": 2053,
        "subject": "ACTURSCI",
        "className": "MATH FOR FINANCIAL ANALYSIS",
        "course_info": [
          {
            "class_nbr": 1592,
            "start_time": "11:30 AM",
            "descrlong": "Prerequisite(s):1.0 course or two 0.5 courses at the 1000 level or higher from Applied Mathematics, Calculus, or Mathematics.",
            "end_time": "12:30 PM",
            "campus": "Main",
            "facility_ID": "NCB-113",
            "days": [
              "M",
              "W",
              "F"
            ],
            "instructors": [],
            "class_section": "001",
            "ssr_component": "LEC",
            "enrl_stat": "Full",
            "descr": ""
          }
        ],
        "catalog_description": "Simple and compound interest, annuities, amortization, sinking funds, bonds, bond duration, depreciation, capital budgeting, probability, mortality tables, life annuities, life insurance, net premiums and expenses. Cannot be taken for credit in any module in Statistics or Actuarial Science, Financial Modelling or Statistics, other than the minor in Applied Financial Modeling.\n\nAntirequisite(s): Actuarial Science 2553A/B.\n\nExtra Information: 3 lecture hours."
      },
      {
        "catalog_nbr": "2427B",
        "subject": "ACTURSCI",
        "className": "LONG TERM ACTUARIAL MATH I",
        "course_info": [
          {
            "class_nbr": 2663,
            "start_time": "12:30 PM",
            "descrlong": "Prerequisite(s): A minimum mark of 60% in each of Actuarial Science 2553A/B, either Calculus 2402A/B or Calculus 2502A/B, and Statistical Sciences 2857A/B. Restricted to students enrolled in any Actuarial Science module.",
            "end_time": "1:30 PM",
            "campus": "Main",
            "facility_ID": "MC-105B",
            "days": [
              "M",
              "W",
              "F"
            ],
            "instructors": [],
            "class_section": "001",
            "ssr_component": "LEC",
            "enrl_stat": "Not full",
            "descr": ""
          }
        ],
        "catalog_description": "Models for the time until death, single life annuity and life insurance present values and their probability distributions; introduction to equivalence principle and premium calculations.\n\nExtra Information: 3 lecture hours, 1 tutorial hour."
      },
      {
        "catalog_nbr": "2553A",
        "subject": "ACTURSCI",
        "className": "MATHEMATICS OF FINANCE",
        "course_info": [
          {
            "class_nbr": 1494,
            "start_time": "9:30 AM",
            "descrlong": "Prerequisite(s): A minimum mark of 60% in Calculus 1501A/B or Applied Mathematics 1413, or Calculus 1301A/B with a minimum mark of 85%.",
            "end_time": "10:30 AM",
            "campus": "Main",
            "facility_ID": "WSC-55",
            "days": [
              "M",
              "W",
              "F"
            ],
            "instructors": [],
            "class_section": "001",
            "ssr_component": "LEC",
            "enrl_stat": "Not full",
            "descr": "PRIORITY TO STUDENTS ENROLLED IN A MODULE OFFERED BY THE DEPARTMENTS OF APPLIED MATHEMATICS; MATHEMATICS; AND STATISTICAL AND ACTUARIAL SCIENCES."
          }
        ],
        "catalog_description": "Time value of money, accumulation and discount functions, effective rates of interest and discount and present values, as applied to annuities and other financial products, and/or applications including loan repayment schedules and methods.\n\nAntirequisite(s): Actuarial Science 2053.\n\nExtra Information: 3 lecture hours, 1 tutorial hour."
      },
      {
        "catalog_nbr": "3424B",
        "subject": "ACTURSCI",
        "className": "SHORT TERM ACTUARIAL MATH I",
        "course_info": [
          {
            "class_nbr": 2811,
            "start_time": "9:30 AM",
            "descrlong": "Prerequisite(s): A minimum mark of 60% in Statistical Sciences 3657A/B. Restricted to students enroled in any Actuarial Science module, or those registered in the Honours Specialization module in Statistics or the Honours Specialization in Financial Modelling module.",
            "end_time": "10:30 AM",
            "campus": "Main",
            "facility_ID": "AHB-1B02",
            "days": [
              "M",
              "W",
              "F"
            ],
            "instructors": [],
            "class_section": "001",
            "ssr_component": "LEC",
            "enrl_stat": "Not full",
            "descr": ""
          }
        ],
        "catalog_description": "Insurance loss frequency and severity models; aggregate loss models; risk measures; ruin theory; coverage modifications.\n\nExtra Information: 3 lecture hours."
      },
      {
        "catalog_nbr": "3429A",
        "subject": "ACTURSCI",
        "className": "LONG TERM ACTUARIAL MATH II",
        "course_info": [
          {
            "class_nbr": 2812,
            "start_time": "10:30 AM",
            "descrlong": "Prerequisite(s): A minimum mark of 60% in each of Actuarial Science 2427A/B and Statistical Sciences 2858A/B.\nCorequisite(s): Statistical Sciences 3657A/B.",
            "end_time": "11:30 AM",
            "campus": "Main",
            "facility_ID": "SEB-2100",
            "days": [
              "M",
              "W",
              "F"
            ],
            "instructors": [],
            "class_section": "001",
            "ssr_component": "LEC",
            "enrl_stat": "Not full",
            "descr": ""
          }
        ],
        "catalog_description": "Single life annuity and life insurance loss random variables and their distributions, with applications to the analysis of benefit premiums and reserves; survival model estimates; mortality Improvement and longevity models.\n\nExtra Information: 3 lecture hours."
      },
    ];

    let selectedComponent = (document.getElementById("componentDropdown") as HTMLInputElement).value;
    let courseId = (document.getElementById("courseNumber") as HTMLInputElement).value;
    let subjectInput = (document.getElementById("subjectDropDown") as HTMLInputElement).value;  

    // validate that correct inputs 
      if(subjectInput == ""){
        alert("Please select a specific subject to search");
      }

      if(!courseId){
        alert("A course ID must be inputted to search");
      }

    console.log(this.dataArray);

    for(let course of this.dataArray){

      if(selectedComponent == "ALL"){
        
        if(subjectInput === course.subject && courseId == course.catalog_nbr){
          this.matchingCourses.push(course);
        }
      }
      else{
        if(subjectInput === course.subject && courseId == course.catalog_nbr && selectedComponent === course.course_info[0].ssr_component){
          this.matchingCourses.push(course);
      }
      }

    }

    if(this.matchingCourses.length == 0){
      alert("No courses match inputted search fields");
    }
    else{
      console.log(this.matchingCourses);
    }


    // parse recieved data to object 
    // dont need to do this apparently? 

    // once done w object return it
    //this.data = jsonData; // don't return, just set global class object to data
    this.data = this.matchingCourses;   // fix later
  }

  searchSubmitted(){
    // getting dummy data but should be making http request
      this.getData();
    
    // passing data (js object) to be rendered to table
      let tableCourses = this.renderInfoTable(this.data);

    // todo after implimenting data fetch make seperate method for rendering table data?
      this.renderInfoTable(tableCourses);
  }

  renderInfoTable(jsData: any){
    this.showInfoTable = true;
  }

  createSchedule(){
    let name: string = this.scheduleNameInput;
    
    if(!this.scheduleNameInput){
      alert("Error: schedule name empty");
    }
    else{
      console.log("schedule " + name + " created");
      this.scheduleData[name] = {};
      console.log(this.scheduleData);
    }
    
  }

  courseSelected(course: object){ 

    let checked = course["checked"];

    if(checked){
      // push the course object to the array of active courses
        this.selectedCourses.push(course);
        console.log(this.selectedCourses);
    }
    else{
      for(let schedule in this.selectedCourses){
        if(this.selectedCourses[schedule] == course){
          
          // find index and splice (remove and shift)
            const index = this.selectedCourses.indexOf(this.selectedCourses[schedule], 0);
            if (index > -1) {
              this.selectedCourses.splice(index, 1);
            }
        
          console.log("course removed from selected courses");
          console.log(this.selectedCourses);
        }
      }
    }
  }

  scheduleSelected(scheduleName: string){
  
    let name = scheduleName;
    try{
      this.activeSchedule = this.scheduleData[name];
      this.actvieScheduleName = name;
      //console.log("Active schedule changed to " + name);
    }catch(error){
      console.log("Something went wrong; schedule name cannot be found in data");
    }
  }

  addCoursesToSchedule(){
    
    if(this.actvieScheduleName == null || this.actvieScheduleName == "" || this.actvieScheduleName == undefined){
      alert("Please select a schedule to add courses to it.")
      return;
    }
    let activeSchedule = this.activeSchedule;
    let name = this.actvieScheduleName;

    this.scheduleData[name] = this.selectedCourses;
    console.log(this.scheduleData);
  }


  /* TIME TABLE COMPONENT CODE BELOW
   * 
   */
  
  days = {Monday: "M", Tuesday: "Tu", Wednesday: "W", Thursday: "Th", Friday: "F"};
  //daysInDataFormat = ["M", "Tu", "W", "Th", "F"];
  times = ["8:30 AM","9:30 AM","10:30 AM","11:30 AM","12:30 PM","1:30 PM","2:30 PM","3:30 PM","4:30 PM","5:30 PM","6:30 PM","7:30 PM","8:30 PM","9:30 PM"];

  renderTimeTable(){

    if(this.activeSchedule.length == 0){
      alert("Cannot render an empty schedule");
    }

    this.renderedSchedule = this.actvieScheduleName;
    /*convert activeSchedule (array of objects) to organized object of format:
    timeBasedSchedule = {
      "8:30 AM": { monday: COURSE_NAME1, tuesday: COURSE_NAME2, wednesday: {}, ...}
      "9:30 AM": ...
    }
    */

    // schedule object we will be filling in
    let organizedSchedule = {"8:30 AM": {},"9:30 AM": {},"10:30 AM": {},"11:30 AM": {},"12:30 PM": {},"1:30 PM": {},"2:30 PM": {},"3:30 PM": {},"4:30 PM": {},"5:30 PM": {},"6:30 PM": {},"7:30 PM": {},"8:30 PM": {},"9:30 PM": {}};

    // loop through active schedule data and add
    for(var course of this.activeSchedule){

      let StartTime = course["course_info"][0]["start_time"];
      let name = course["className"];
      let daysArray = course["course_info"][0]["days"]; // array

      let info = course["catalog_nbr"] + "\n" + name + ": " + course["course_info"][0]["ssr_component"]; 

      // add course into to object's day slots
      for(var day in this.days){
        if(daysArray.includes(this.days[day])){  // this.day[days] is "M", "Tu", "W", ...

          // check if another course in the schedule has written info to this time slot, if so there is conflict
          if(organizedSchedule[StartTime][day] == undefined ){//|| organizedSchedule[StartTime][day] == null){
            organizedSchedule[StartTime][day] = info;
          }else{
            organizedSchedule[StartTime][day] += "CONFLICT W/ " + course["catalog_nbr"];
          }
        }else{
          organizedSchedule[StartTime][day] = "";
        }        
      }
      //todo impliment courses that are longer than an hour?
    }

    // fill rest of the empty time slots  with blanks
      for(var time of Object.keys(organizedSchedule)){

        if(Object.keys(organizedSchedule[time]).length === 0){
          for(var day in this.days){
            organizedSchedule[time][day] = "";
          }
        }
      };

    // note tuesday in days array is 'Tu'
    //console.log(organizedSchedule);

    this.showTimeTable = true;
    this.timeBasedSchedule = organizedSchedule;
    console.log(this.timeBasedSchedule);
  }

  keepOrder = (a, b) => {
    return a;
  }

}
