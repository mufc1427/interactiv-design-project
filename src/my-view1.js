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
import '@polymer/paper-dropdown-menu/paper-dropdown-menu.js';
import '@polymer/paper-item/paper-item.js';
import '@polymer/paper-listbox/paper-listbox.js';
import '@polymer/paper-spinner/paper-spinner';



//import '@polymer/paper-dropdown-menu/paper-dropdown-menu.js';
//import '@polymer/paper-item/paper-item.js';
//import '@polymer/paper-listbox/paper-listbox.js';

//import '@polymer/paper-dropdown-menu/paper-dropdown-menu.js';



import './shared-styles.js';


//import * as d3 from 'd3' //d3 library

class MyView1 extends PolymerElement {


  STATES() {
    var US_STATES = ["United States", "Alabama", "Alaska", "Arizona", "Arkansas", "California", "Colorado", "Connecticut", "Delaware", "District of Columbia", "Florida", "Georgia", "Hawaii", "Idaho", "Illinois", "Indiana", "Iowa",
      "Kansas", "Kentucky", "Louisiana", "Maine", "Maryland", "Massachusetts", "Michigan", "Minnesota", "Mississippi", "Missouri", "Montana", "Nebraska", "Nevada", "New Hampshire", "New Jersey", "New Mexico", "New York", "North Carolina", "North Dakota", "Ohio", "Oklahoma", "Oregon", "Pennsylvania", "Rhode Island", "South Carolina", "South Dakota", "Tennessee", "Texas", "Utah", "Vermont", "Virginia", "Washington", "West Virginia", "Wisconsin", "Wyoming"
    ];

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




  #main-paragragh p {
    margin-top: 25px;
    font-size: 15px;
    text-align: center;
    animation: fadein 2s;
    -moz-animation: fadein 2s; /* Firefox */
    -webkit-animation: fadein 2s; /* Safari and Chrome */
    -o-animation: fadein 2s; /* Opera */
}
@keyframes fadein {
    from {
        opacity:0;
    }
    to {
        opacity:1;
    }
}
@-moz-keyframes fadein { /* Firefox */
    from {
        opacity:0;
    }
    to {
        opacity:1;
    }
}
@-webkit-keyframes fadein { /* Safari and Chrome */
    from {
        opacity:0;
    }
    to {
        opacity:1;
    }
}
@-o-keyframes fadein { /* Opera */
    from {
        opacity:0;
    }
    to {
        opacity: 1;
    }
}

        path:hover
        {
          fill:black;
        }





       

      .main-map
      {
        
        width: 600px;
        height: 500px;
      }

      
     

      #map-holder
      {
        width:1000px;
      }

      #map-title
      {
        text-align: center;
      }

      #spinner-custom
      {
        text-align: center;
      }
      
      </style>

      <h2>
      Data vizualization tool for csc196v at Sac State
      </h2>
      <hr>

      <section id="main-paragragh">
      <p>
      This tool demaotrates the number of years of life lost per disease per country per year.
      Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderi
      </p></section>

      <div class="card" id="map-holder">
        <section id = "report-tipe-container">
             
<paper-dropdown-menu label = "Year" id="select-year-menu" on-iron-activate="_selectYear" vertical-offset="60">
  <paper-listbox slot = "dropdown-content" selected = "0">

  <template is="dom-repeat" items = [[years]] as="year">

  <paper-item class="year">[[year]]</paper-item> 

  </template>
 
  </paper-listbox> </paper-dropdown-menu>





  <paper-dropdown-menu label = "Select a cause" id="select-cause-menu" on-iron-activate="_selectCause" vertical-offset="60">
  <paper-listbox slot = "dropdown-content" selected = "0">

  <template is="dom-repeat" items = [[causes]] as="cause">

  <paper-item class="year">[[cause]]</paper-item> 

  </template>
 
  </paper-listbox> </paper-dropdown-menu>
  
          </section>
        <h3 id="map-title" >Leading cause of death per state in the United States (2000-2017) </h3>

       
        
      
        
        <div id="main-map" >
       <!--<div id= "spinner-custom">
          <paper-spinner active align = "center"> </paper-spinner> </div>
      </div>-->
    `;

  }




  ready() {
    super.ready()
    this.initMap();

    //add event listenrs
    //this.addEventListener('select-year', this._selectYear);
    //this.shadowRoot.querySelector("#select-year-menu").addEventListener("change", this._selectYear);
  }


  static get properties() {

    return {
      years: {
        type: Array,
        value: []
      },

      year_selected: {
        type: Number,
        value: null



      },


      causes: {
        type: Array,
        value: []


      },

      cause_selected:{

        type: String,
        value:"default"
      },

      state: {
        type: String,
        value: ""



      },

      parsed_data: {
        type: Object,
        value: null
      }
    }
  }


  _selectYear(event)
  {
       var year_value = parseInt(event.detail.item.innerText);
       this._setProperty("year_selected", year_value);
       this.selectQuery();
  }


_selectCause(event)
{
    var cause_selected = event.detail.item.innerText;
    this._setProperty("cause_selected", cause_selected);
    this.selectQuery();

}

  selectQuery() {
    

    d3.select(this.shadowRoot.querySelector("svg")).remove();
    var map_title = this.shadowRoot.querySelector("#map-title");
    var year = this._getProperty("year_selected");
    var cause = this._getProperty("cause_selected");
    var data = this._getProperty("parsed_data");//remove svg if already exist
    
    if(year != null && (cause != "default" && cause != undefined)  )
    {

      map_title.innerText ="Number of death per state caused by " + cause + " in " + year;
      this.drawMap(this.calculateDeathsByCause(data, cause, year));
    }
    else if (year != null && (cause == "default" || cause == undefined))
    {
      map_title.innerText = "Leading cause of death per state in the United States in " + year;
      this.drawMap(this.calculateDeathsByYear(data, year));
    }
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

    constructStatesObject()
    {
      var us_states = this.STATES();
      var states_object = {};

      //add all the states to the object.
      for (let i = 0; i < us_states.length; i++) {
        states_object[us_states[i]] = {
          cause: "",
          deaths_count: 0
        };

      }

      return states_object;
    }

calculateDeathsByCause(data, cause, year)
{
  var  states_object = this.constructStatesObject();


     for (let i = 0; i < data.length; i++) {




       if (data[i].year < year) {
         break;
       }

       
       if ( data[i].Cause_Name != "All causes" && data[i].State != "United States" && data[i].year == year && data[i].Cause_Name == cause ) {
         states_object[data[i].State].cause = data[i].Cause_Name;
         states_object[data[i].State].deaths_count = data[i].Deaths;

       }







     }

     return states_object;
}



  calculateDeathsByYear(data, year) {
    var us_states = this.STATES();
    var states_object = this.constructStatesObject();

    for (let i = 0; i < data.length; i++) {




      if (data[i].year < year) {
        break;
      }


      if (states_object[data[i].State].deaths_count < data[i].Deaths && data[i].Cause_Name != "All causes" && data[i].State != "United States" && data[i].year == year) {
        states_object[data[i].State].cause = data[i].Cause_Name;
        states_object[data[i].State].deaths_count = data[i].Deaths;

      }







    }
    return states_object;
  }


  insertYears(data) {



    let previous_key = 0;

    for (let i = 0; i < data.length; i++) {
      if (previous_key != data[i].year) {
        previous_key = data[i].year;

        console.log(data[i].year);

        this.push("years", data[i].year);

      }

      if (previous_key == 1999) {
        break;
      }



    }





  }



  insertCauses(data) {
    
    var previous_cause = "";

    //Use this variable to stop the loop. The file
    //is formated in such a way the first cause is laways
    //gonna be the first cause for each state.
    var first_cause = data[0].Cause_Name;
    var break_loop_signal = 0;

    for (let i = 0; i < data.length; i++) {
      if (previous_cause != data[i].Cause_Name) {


        previous_cause = data[i].Cause_Name;

        this.push("causes", data[i].Cause_Name);;

        if(break_loop_signal == 0 && data[i].Cause_Name == first_cause && i > 0)
        {
          break_loop_signal = i;
        }

      }
      
      if(this._getProperty("causes").length <= break_loop_signal)
      {
        break;
      }
      

     

     




    }



  }






  drawMap(filtred_data) {



   



    var causes_colors = ["rgb(222, 33, 75)", "rgb(49, 191, 235)", "rgb(48, 144, 240)", "rgb(48, 240, 125)", "rgb(242, 147, 107)", "rgb(182, 88, 196)", "rgb(179, 7, 7)", "rgb(118, 126, 181)", "rgb(137, 138, 143)", "rgb(2, 237, 229)"];
    var causes_names = ["Heart disease", "Cancer", "Unintentional injuries", "Alzheimer's disease", "Diabetes", "Influenza and pneumonia", "Suicide", "Kidney disease", "CLRD", "Stroke"];



    var color_object = {};


    for (let i = 0; i < causes_names.length; i++) {
      color_object[causes_names[i]] = causes_colors[i];
    }

    var width = 960;
    var height = 500;

    //the map projection.
    var projection = d3.geoAlbersUsa()
      .translate([width / 1.6, height / 2]) // translate to center of screen
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


    var div = d3.select(this.shadowRoot.querySelector("#main-map"))
      .append("div")
      .attr("class", "tooltip")
      .style("opacity", 0);

    //create map wwith state data/
    d3.json("../data/us-states.json").then(function (json) {

      //add data to goejson


      let state_keys = Object.keys(filtred_data);
      //let parsed_json = JSON.parse(json);
      for (let i = 0; i < state_keys.length; i++) {
        var current_prop = json.features[i].properties.NAME;

        if (current_prop == "Wisconsin") {
          json.features[i].cause = filtred_data["Wisconsin"].cause;
          json.features[i].deaths = filtred_data["Wisconsin"].deaths_count;

        } else if (current_prop == "Puerto Rico") {
          continue;
        } else {
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


          //If value existsle

          return color_object[value];


        })


      .on("click", function (d) {


        div.transition()
          .duration(200)
          .style("opacity", .9)
          .style("border","1px solid black");
        div.text(d.properties.NAME)
           .attr('x', 0)
           .attr('dy', 5)
           .text(d.cause)
          .style("left", (d3.event.pageX) + "px")
          .style("top", (d3.event.pageY - 28) + "px");
      }).on("mouseout", function (d) {
        div.transition()
          .duration(500)
          .style("opacity", 0)
          .style("border", "5px soild black")
          .style("border-radius", "5px");
      });




   svg.append("g")
     .attr("class", "states-names")
     .selectAll("text")
     .data(json.features)
     .enter()
     .append("svg:text")
     .text(function (d) {
       return d.deaths;
     })
     .attr("x", function (d) {
       return path.centroid(d)[0];
     })
     .attr("y", function (d) {
       return path.centroid(d)[1];
     })
     .attr("text-anchor", "middle")
     .attr('fill', 'black').style("font-size","9px");


    });


    /** followig code section create map legend **/
    svg.selectAll("mydots")
      .data(causes_names)
      .enter()
      .append("circle")
      .attr("cx", 8)
      .attr("cy", function (d, i) {
        return 60 + i * 25
      }) // 100 is where the first dot appears. 25 is the distance between dots
      .attr("r", 7)
      .style("fill", function (d) {


        return color_object[d];
      })
      

    // Add one dot in the legend for each name.
    svg.selectAll("mylabels")
      .data(causes_names)
      .enter()
      .append("text")
      .attr("x", 20)
      .attr("y", function (d, i) {
        return 60 + i * 25
      }) // 100 is where the first dot appears. 25 is the distance between dots
      .style("fill", function (d) {

        return color_object[d];
      })
      .text(function (d) {

        return d;
      })
      .attr("text-anchor", "right")
      .style("alignment-baseline", "middle")
      
    /** end code section create map legend **/
  }

  initMap() {


    this.parseData().then((result) => {


      this._setProperty("parsed_data", result);
      this.bindDataInitialized(result, 2017);
      this.insertYears(result);
      this.insertCauses(result);
    });









  }

  bindDataInitialized(data, year) {


    var filtered_data = this.calculateDeathsByYear(data, year);
    this.drawMap(filtered_data);
  }






}


window.customElements.define('my-view1', MyView1);