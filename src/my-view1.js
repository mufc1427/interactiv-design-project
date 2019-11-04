/**
 * @license
 * Copyright (c) 2016 The Polymer Project Authors. All rights reserved.
 * This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt
 * The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt
 * The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt
 * Code distributed by Google as part of the polymer project is also
 * subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt
 */

import {
  PolymerElement,
  html
} from '@polymer/polymer/polymer-element.js';
import './shared-styles.js';
//import * as d3 from 'd3' //d3 library

class MyView1 extends PolymerElement {

   STATES()
  {
    var US_STATES = ["United States","Alabama", "Alaska",  "Arizona", "Arkansas", "California", "Colorado", "Connecticut", "Delaware","District of Columbia",  "Florida", "Georgia",  "Hawaii", "Idaho", "Illinois", "Indiana", "Iowa", 
    "Kansas", "Kentucky", "Louisiana", "Maine", "Maryland", "Massachusetts", "Michigan", "Minnesota",  "Mississippi", "Missouri", "Montana", "Nebraska", "Nevada", "New Hampshire", "New Jersey", "New Mexico", "New York", "North Carolina", "North Dakota", "Ohio", "Oklahoma", "Oregon", "Pennsylvania",  "Rhode Island", "South Carolina", "South Dakota", "Tennessee", "Texas", "Utah", "Vermont", "Virginia", "Washington", "West Virginia", "Wisconsin", "Wyoming"];
  
   return US_STATES;
  }

  //isFulfilled = true;
  static get template() {
    return html `
      <style include="shared-styles">
        :host {
          display: block;

          padding: 10px;
        }

      .main-map
      {
        
        width: 500px;
        height: 500px;
      }

      #map-holder
      {
        width:900px;
      }
      
      </style>

      <h2>
      Data vizualization tool for csc196v at Sac State
      </h2>
      <hr>
      <p>
      This tool demaotrates the number of years of life lost per disease per country per year.
      </p>

      <div class="card" id="map-holder">
        <section id = "report-tipe-container" >


          <label for = "report-type"> Select cause of death </label> 
          <select id = "report-type">

          <option selected> Default </option>
          </select>
          </section>
        <h3 id="map-title" aling="center">Leading cause of death per state in the United States (2000-2017) </h3>

        
        
        <div id="main-map" ></div>
        
      </div>
    `;

  }

  ready() {
    super.ready()
    this.initMap();
  }


  selectReportType() {

  }


  parseData() {
    var file_path = "../data/NCHS_-_Leading_Causes_of_Death__United_States.csv";
    var data = d3.csv(file_path, function (d) {
      return {
        State: d.State,
        Cause_Category: d["113 Cause Name"],
        Cause_Name: d["Cause Name"],
        Deaths: +d.Deaths,
        Adjusted_Death_Rate: +d["Age-adjusted Death Rate"],
        year: +d.Year

      };
    }).then(function (data) {


      return data;
    });

    return data; //return the actual data to be map.

  }
  
  
  
  calculateDeathsByYear(data, year)
  {
	 var us_states = this.STATES();
    var states_object ={};

    //add all the states to the object.
    for(let i= 0; i < us_states.length; i++)
    {
      states_object[us_states[i]] = {
        cause: "",
        deaths_count:0
      };
       
    }

    console.log(states_object);

    let previous_key = "";
     
  

    //check for each year 
    var start = 0;
    var end = 50;
    var indexer = 0;
    var finished = false;
    var data_set_size = data.length; 
    for(let i= 0 ;i < data.length; i++)
    {
      
      
      
		  
			    if(data[i].year < year)
			    {
					break;
				}
				
				let state_name_test = data[i].State;
				
				let my_cause = data[i].Cause_Name;
				   let my_deaths = data[i].Deaths;
		  
				if ( states_object[data[i].State].deaths_count < data[i].Deaths && data[i].Cause_Name != "All causes" && data[i].State != "United States" && data[i].year == year )
				{
				   states_object[data[i].State].cause = data[i].Cause_Name;
				   states_object[data[i].State].deaths_count = data[i].Deaths;
				   
				}
				
        
        

				


    }
return states_object;
  }



  drawMap(data) {

    


    /*var us_states = this.STATES();
    var states_object ={

    
      
    };

    //add all the states to the object.
    for(let i= 0; i < us_states.length; i++)
    {
      states_object[us_states[i]] = {
        cause: "",
        deaths_count:0
      };
       
    }

    console.log(states_object);

    let previous_key = "";
    var causes = data.map(function (data) {


        if (previous_key != data.Cause_Name) {
           previous_key = data.Cause_Name;
          return {



            Causes: data.Cause_Name
          }
        }

       

      
      }
    );


    var unique_causes_temp = [...new Set(causes)];
    var unique_causes = [];//contaisn all the caues of death

    for(let i = 0; i < 10; i++)
    {
         unique_causes[unique_causes_temp[i]];
    }



    
    console.log(states_object);


    //check for each year 
    var start = 0;
    var end = 50;
    var indexer = 0;
    var finished = false;
    var data_set_size = data.length; 
    while(true)
    {
      
      var temp_array = data.splice(start, end);

      while(true)
      {
		  
		  if(end < 1050)
		  {
		  
				if (states_object[us_states[indexer]].deaths_count <= +temp_array[indexer].Deaths && temp_array[indexer].Cause_Name != "All causes" && temp_array[indexer].State != "United States" )
				{
				   states_object[us_states[indexer]].cause = temp_array[indexer].Cause_Name;
				   states_object[us_states[indexer]].deaths_count = +temp_array[indexer].Deaths;
				   
				}
				
        
        

				if(indexer == 48)
				{

				  start = end;
				  end = end + 50;
				  indexer = 0;
				  break;
				}
				indexer++;
				
	      }
	      else
	      {
			  finished = true;
		  }


      }

      if(end >= 1050)
      {
        break;
      }




    }

    console.log(states_object);*/
    

    
    var legendText = ["Heart Disease", "States Lived", "States Visited", "Nada"];
    var filtred_data = this.calculateDeathsByYear(data, 2017);


   var causes_colors = ["rgb(222, 33, 75)", "rgb(49, 191, 235)", "rgb(48, 144, 240)", "rgb(48, 240, 125)", "rgb(242, 147, 107)", "rgb(182, 88, 196)", "rgb(179, 7, 7)", "rgb(118, 126, 181)", "rgb(137, 138, 143)", "rgb(2, 237, 229)"];
   var causes_names = ["Heart disease", "Cancer", "Unintentional injuries", "Alzheimer's disease","Diabetes","Influenza and pneumonia","Suicide","Kidney disease", "CLRD", "Stroke"];



var color_object = {};


for (let i = 0; i < causes_names.length; i++)
{
  color_object[causes_names[i]] =  causes_colors[i];
}

  var width = 960;
  var height = 500;

  //the map projection.
  var projection = d3.geoAlbersUsa()
    .translate([width / 2, height / 2]) // translate to center of screen
    .scale([1000]);


  //generate path
  var path = d3.geoPath() // path generator that will convert GeoJSON to SVG paths
    .projection(projection);

    

  // Define linear scale for output
  var color = d3.scaleLinear() //["rgb(217,91,67)"]"rgb(222, 33, 175)"
    .range(["rgb(217,91,67)"]);


  var svg = d3.select(this.shadowRoot.querySelector("#main-map"))
    .append("svg")
    .attr("width", width)
    .attr("height", height);



  //create map wwith state data/
  d3.json("../data/us-states.json").then(function (json) {
	  
    //add data to goejson

    
    let state_keys = Object.keys(filtred_data);
    //let parsed_json = JSON.parse(json);
    for(let i = 0; i < state_keys.length;i++)
    {
           var current_prop = json.features[i].properties.NAME;

           if(current_prop == "Wisconsin")
           {
             json.features[i].cause = filtred_data["Wisconsin"].cause;
             json.features[i].deaths = filtred_data["Wisconsin"].deaths_count;

           }
           else if(current_prop == "Puerto Rico")
           {
             continue;
           }
           else{
          json.features[i].cause = filtred_data[current_prop].cause;
           json.features[i].deaths = filtred_data[current_prop].deaths_count;
           }

        
    }
	  
	  
    //color.domain([0]); 
    svg.selectAll("path")
      .data(json.features)
      .enter()
      .append("path")
      .attr("d", path)
      .style("stroke", "#fff")
      .style("stroke-width", "1")
      .style("fill", function (d) {

        // Get data value
        var value = d.cause;

      
          //If value exists
          
             return color_object[value];
          
        
      }); // setting the range of the input data
  });
}

initMap() {


  this.parseData().then((result) => {
    this.drawMap(result);
  });




  /*if (isFulfilled) {
    this.drawMap(cause_of_death_data)
  }*/




}
}


window.customElements.define('my-view1', MyView1);
