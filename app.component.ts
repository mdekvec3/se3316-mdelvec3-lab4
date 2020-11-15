import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
  title = 'lab4-angular';
  showInfoTable = false; // info table is rendered only when this is true
  showTimeTable = false; // time table is rendered only when this is true
  columnLabels = ["Course Number", "Subject", "Class Name", "Description"]; //todo add course_info columns
  data: object[] = [];
  objectKeys = Object.keys;

  getData(){
    // data = ... ;
    // make http request to get data object here
    // using placeholder data for now

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

    // parse recieved data to object 
    // dont need to do? let jsData = this.dataToArray(jsonData);

    // once done w object return it
    this.data = jsonData; //jsData;
    //return jsData; nvm set to data object that can be accessed from .html file
  }

  dataToArray(data: any){
    console.log(data);
    let jsObject = data.forEach(x => JSON.parse(x)); //JSON.parse(data);
    return jsObject;
  }

  searchSubmitted(){
    // getting dummy data but should be making http request
      this.getData();
    
    // passing data (js object) to be rendered to table
      let tableCourses = this.renderInfoTable(this.data);

      this.renderInfoTable(tableCourses);
  }
  renderInfoTable(jsData: any){
    this.showInfoTable = true;
  }

}
