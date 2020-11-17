import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { courseObject } from './courseInterface'
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';


@Injectable()
export class ConfigService {
  private queryString: string = "http://localhost:3000/api/courseData";

  constructor(private http: HttpClient) {}
    getcourses(): Observable<courseObject[]> {
      return this.http.get<courseObject[]>(this.queryString);
    };
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

  ngOnInit(){
    console.log("on init called");
    this._configservice.getcourses().subscribe(data => this.dataArray = data);
  };

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
  dataArray;

  constructor(private _configservice:ConfigService){
    this.showInfoTable = false;
    this.showTimeTable = false;
    this.checked = [];
    this.scheduleNameInput = "";
    this.actvieScheduleName = "";
    this.timeBasedSchedule = {"8:30 AM": {},"9:30 AM": {},"10:30 AM": {},"11:30 AM": {},"12:30 PM": {},"1:30 PM": {},"2:30 PM": {},"3:30 PM": {},"4:30 PM": {},"5:30 PM": {},"6:30 PM": {},"7:30 PM": {},"8:30 PM": {},"9:30 PM": {}};
    this.renderedSchedule = "";
    this.dataArray = [];
  }

  getData(){

    let matchingCourses = [];
    let courseData = this.dataArray;

    // getting search parameters
      
      let selectedComponent = (document.getElementById("componentDropdown") as HTMLInputElement).value;
      let courseId = (document.getElementById("courseNumber") as HTMLInputElement).value;
      let subjectInput = (document.getElementById("subjectDropDown") as HTMLInputElement).value;  

    // validate that input requirements are fulfilled 
      
      if(subjectInput == ""){
        alert("Please select a specific subject to search");
      }

      if(!courseId){
        alert("A course ID must be inputted to search");
      }

    // more input validation
      
      if(courseId.length > 5){
        alert("No course ID is longer than 5 characters");
        (document.getElementById("courseNumber") as HTMLInputElement).value = "";
        return;
      }
      if(!this.sanitize(courseId, true)){
        alert("Course codes contain only characters and numbers");
        return;
      }

    // find courses matching search params 
      
      for(let course of courseData){

        if(selectedComponent == "ALL"){
          
          // todo chop last letter of course code if ALL is enabled? 
            //if(/* last character is letter*/)

            // let cutSearchCourseId = (course.catalog_nbr).toString().substring(0, course.catalog_nbr.length - 1);
            // let cutInputtedCourseId =          
          
          if(subjectInput === course.subject && (courseId == course.catalog_nbr || course.catalog_nbr.toString().includes(courseId))){
            matchingCourses.push(course);
          }
        }
        else{
          if(subjectInput === course.subject &&  (courseId == course.catalog_nbr || course.catalog_nbr.toString().includes(courseId)) && selectedComponent === course.course_info[0].ssr_component){
            matchingCourses.push(course);
          }
        }
      }

    // verify some courses matched, if not alert user
      
      if(matchingCourses.length == 0){
        alert("No courses match inputted search fields");
      }
      else{
        console.log(matchingCourses);
      }

    // pass data to data member to be rendered in table
      this.data = matchingCourses;  
  }

  searchSubmitted(){
    // getting dummy data but should be making http request
      this.getData();
      this.showInfoTable = true;
    
    // delete all this?
      // passing data (js object) to be rendered to table
        //let tableCourses = this.renderInfoTable(this.data);

      // todo after implimenting data fetch make seperate method for rendering table data?
        //this.renderInfoTable(tableCourses);
  }

  // delete?
  renderInfoTable(jsData: any){
    this.showInfoTable = true;
  }

  createSchedule(){
    let name: string = this.scheduleNameInput;
    
    if(!this.scheduleNameInput){
      alert("Error: schedule name empty");
      return;
    }
    else if(!this.sanitize(name, false)){
      alert("The schedule name cannot contain special characters");
      return;
    }
    else{
      console.log("schedule " + name + " created");
      this.scheduleData[name] = {};
      console.log(this.scheduleData);
    }
    this.scheduleNameInput = "";
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
  times = ["8:30 AM","9:30 AM","10:30 AM","11:30 AM","12:30 PM","1:30 PM","2:30 PM","3:30 PM","4:30 PM","5:30 PM","6:30 PM","7:30 PM","8:30 PM","9:30 PM"];

  renderTimeTable(){

    if((document.getElementById("scheduleDropDown") as HTMLInputElement).value == "none"){
      alert("You must choose an active schedule to render a time table");
      return;
    }

    if(this.activeSchedule.length == 0){
      alert("Cannot render an empty schedule");
      return;
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
    for(let course of this.activeSchedule){

      let startTime = course["course_info"][0]["start_time"];
      let endTime = course["course_info"][0]["end_time"];
      let name = course["className"];
      let daysArray = course["course_info"][0]["days"]; // array
      let info = course["catalog_nbr"] + "\n" + name + ": " + course["course_info"][0]["ssr_component"]; 

      // check if course is longer than one hour
        let duration = (endTime.charAt(0) - startTime.charAt(0));
        //console.log("startTime: " + startTime.charAt(0) + " endTime: "+  endTime.charAt(0) + " duration: " + duration);


      // add course into to object's day slots
      for(let day in this.days){

        if(daysArray.includes(this.days[day])){  // this.day[days] is "M", "Tu", "W", ...

            // check if another course in the schedule has written info to this time slot, if so there is conflict
            if(organizedSchedule[startTime][day] == undefined ){
              organizedSchedule[startTime][day] = info;
            }else{
              organizedSchedule[startTime][day] += "CONFLICT W/ " + course["catalog_nbr"];
            }

          // if the course is longer than an hour - removed; not enough time
          /*
          if(duration >1){
            console.log("duration greatee than 1");
            let times;

            // copy current start time to time array (instead of checking if AM or PM)
            for(var i = 0; i< duration-1; i++){
              times[i].push(startTime);
              console.log(times[i]);
            }

            // adds 1 hour to start time and adds to array for however many hours more
            for(var i = 0; i< duration-1; i++){
              let startTime = times[i]
              let newTime = startTime.charAt(0) + 1;
              times[i] = newTime;
            }

            for(var i = 0; i< times.length; i++){
              if(organizedSchedule[times[i]][day] == undefined ){
                organizedSchedule[startTime][day] = info;
              }else{
                organizedSchedule[times[i]][day] += "CONFLICT W/ " + course["catalog_nbr"];
              }
            }
          }*/

        }else{
          organizedSchedule[startTime][day] = "";
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

  // returns true if the passed string contains only characters, numbers, spaces and underscores
    sanitize(input: string, isCourseCode: boolean): boolean {
      let expressionAllowSpaces = new RegExp('^[a-zA-Z0-9 _]{0,15}$'); 
      let expressionNoSpaces = new RegExp('^[a-zA-Z0-9]{0,15}$'); 
      let newExpression = new RegExp("[<\"\/>%\$&#@\[\\\^\$\.\|\?\*\+\(\)\{\}]");

      if(!isCourseCode){
        if(newExpression.test(input)){
          return false;
        }else{
          return true;
        }
      }else{
        if(expressionNoSpaces.test(input)){
          return true;
        }else{
          return false;
        }
      }
    };
}
