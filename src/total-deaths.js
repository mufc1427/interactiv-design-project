import {
    PolymerElement,
    html
} from '@polymer/polymer/polymer-element.js';
import '@polymer/paper-dropdown-menu/paper-dropdown-menu.js';
import '@polymer/paper-item/paper-item.js';
import '@polymer/paper-listbox/paper-listbox.js';
import '@polymer/paper-spinner/paper-spinner';
import '@polymer/paper-checkbox/paper-checkbox.js';
//import * as d3 from "d3";






import './shared-styles.js';


//import * as d3 from 'd3' //d3 library

class TotalDeaths extends PolymerElement {




    //isFulfilled = true;
    static get template() {
        return html `
      <style include="shared-styles">
        :host {
          display: block;

          padding: 10px;
        }


        path.slice {
            stroke - width: 2 px;
        }

        </style>



        <section>

        <h2>Total number of deaths by cause</h2>
        <hr>
        <p>This tool demonstrate the total number of deaths by cause per year. This vizualization put in perspective the information provided by the map, and we
        can see how large the difference is between each cause. Again is pretty noticable how large the number of deaths by Heart disease is compared to the other causes.
        
        <br>
        <strong>How to use:</strong> To use just select a year and the donut should update. You can hover over the slices to display more information. </p>
        <paper-dropdown-menu label = "Year" id="select-year-menu" on-iron-activate="_selectYear" vertical-offset="60" role="combobox" aria-autocomplete="none" aria-haspopup="true" aria-disabled="false">
  <paper-listbox slot = "dropdown-content" selected = "0">

  <template is="dom-repeat" items = [[years]] as="year">

  <paper-item class="year">[[year]]</paper-item> 

  </template>
 
  </paper-listbox> </paper-dropdown-menu>

   <div id="pie-chart">

   <h3 id="pie-chart-title" class="text-center">Total number of death per cause in 2017</h3>
   
   </div>



   
  </section>

  <section id="avg-deaths">
      <h2>Average number of deaths per year (1999-2017)</h2>
        <hr>
   <p>The final visualization (treemap) demostrates the average  number of deaths in the United States caused by the 10 causes. 
   This visualization alos give us details in future and current trends. For exampl, from the year 2013 to 2017 there's a rise on the average indicating that the total mortality from this condition
  is increases. Of course this visualization doesn't give us all the details, since this rise on the number deaths can be cause by only one condition such 
  as heart disease which is clearly the conditiom that has caused the most deaths since 1999. </p>

  <img src="../images/avg-deaths-us.png" class="center-img" width="700px" alt="treemap image demostrating the average number of deaths in the us from 1999 to 2017"> 
   </section>



  
    `;

    }




    ready() {
        super.ready()
        this.initPieChart()
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

            parsed_data: {
                type: Object,
                value: null
            },

            tools_reference: {
                type: Tools,
                value: null
            },

           
        }
    }


    _selectYear(event) {
        var year_value = parseInt(event.detail.item.innerText);
        this._setProperty("year_selected", year_value);
        this.selectedYearQuery();
    }




    selectedYearQuery() {


        d3.select(this.shadowRoot.querySelector("svg")).remove();
        var chart_title = this.shadowRoot.querySelector("#pie-chart-title");
        var year= this._getProperty("year_selected");
        var data = this._getProperty("parsed_data"); //remove svg if already exist

        if (year != null) {

            chart_title.innerText = "Total number of death per cause in " + year;
            this.bindDataInitialized(this._getProperty("parsed_data"), year);
        } /*else if (year != null && (cause == "None selected" || cause == undefined)) {
            chart_title.innerText = "Leading cause of death per state in the United States in " + year;
            this.drawMap(this.calculateDeathsByYear(data, year));
        }*/
    }





    calculateTotalDeathsByCauseInYear(data, year) {
        var causes_object = this._getProperty("tools_reference").constructCauseObject(this._getProperty("parsed_data"))






        for (let i = 0; i < data.length; i++) {




            //break when the year is less than the year we are looking for.
            if (data[i].year < year) {
                break;
            }


            if (data[i].Cause_Name != "All causes" && data[i].State != "United States" && data[i].year == year) {
                causes_object[data[i].Cause_Name].cause = data[i].Cause_Name;
                causes_object[data[i].Cause_Name].deaths_count = causes_object[data[i].Cause_Name].deaths_count + data[i].Deaths;

            }







        }

        return causes_object;
    }





arcTween(a) {
    const i = d3.interpolate(this._current, a);
    this._current = i(1);
    return (t) => arc(i(t));
}





 insertData(data, svg, pie, arc) {

    var disease_color_object = this._getProperty("tools_reference").getColorObject();
     // Join new data
     const path = svg.selectAll("path")
         .data(pie(data));

     // Update existing arcs
     path.transition().duration(200).attrTween("d", this.arcTween());

     // Enter new arcs
     path.enter().append("path")
         .attr("fill", (d, i) => "#a6d854")
         .attr("d", arc)
         .attr("stroke", "white")
         .attr("stroke-width", "6px")
         .each(function (d) {
             this._current = d;
         });
 }









    drawPieChart(filtred_data) {

        var parse_stats = this._getProperty("tools_reference").parseProperties(filtred_data);

        var disease_color_object = this._getProperty("tools_reference").getColorObject();

        var causes = this._getProperty("causes");

        var div = d3.select(this.shadowRoot.querySelector("#pie-chart"))
            .append("div")
            .attr("class", "tooltip")
            .style("opacity", 0);


      var width = 960,
          height = 500,
          radius = Math.min(width, height) / 2;

      

      var pie = d3.pie()
          .value(function (d) {
              return d.deaths_count;
          })
          .sort(null);

      var arc = d3.arc()
          .innerRadius(radius - 100)
          .outerRadius(radius - 20);

          var outerArc = d3.arc()
              .innerRadius(radius * 0.9)
              .outerRadius(radius * 0.9)


      var svg = d3.select(this.shadowRoot.querySelector("#pie-chart")).append("svg")
          .attr("width", width)
          .attr("height", height)
          .append("g")
          .attr("transform", "translate(" + width/1.5 + "," + height/2 + ")");

    
                  var path = svg.selectAll("path")
                      .data(pie(parse_stats))
                      .enter().append("path")
                      .attr("fill", function (d, i) {
                          return disease_color_object[d.data.cause]
                      })
                      .attr("d", arc)
                      .each(function (d) {
                          this._current = d;
                      })

                      .on("mouseover", function (d) {


                          div.transition()
                              .duration(200)
                              .style("opacity", .9)
                              .style("border", "1px solid black")
                              .text(function () {
                                  return d.data.cause + ", "  + d.data.deaths_count + " deaths";
                              })
                              .style("left", (d3.event.pageX) + "px")
                              .style("top", (d3.event.pageY - 28) + "px");
                      }).on("mouseout", function (d) {
                          div.transition()
                              .duration(500)
                              .style("opacity", 0)
                              .style("border", "5px soild black")
                              .style("border-radius", "5px");
                      });
                      

                      


        path
            .transition().duration(1000)
            .attrTween("d", function (d) {
                this._current = this._current || d;
                var interpolate = d3.interpolate(this._current, d);
                this._current = interpolate(1);
                return (t) => arc(interpolate(t));
            });


           var  dots_coordinates = {
                cx:-600,
                ya:75,
                yb:-24
            }

var text_coordinates = {
    x:-590,
    ya: 70,
    yb: -23}
           
         var legend = new Drawing();
         legend.drawLengend(svg,parse_stats, disease_color_object,dots_coordinates, text_coordinates, true);

                      





    }



    initPieChart() {


        var processing_tools = new Tools();

        processing_tools.parseData().then((result) => {


            this._setProperty("tools_reference", processing_tools)
            this._setProperty("parsed_data", result);
            this._setProperty("year_selected", 2017);
            this._setProperty("years", processing_tools.insertYears(result));
          
            
            this._setProperty("causes",processing_tools.parseCauses(result) )
            this.bindDataInitialized(result, 2017);


        });









    }

    bindDataInitialized(data, year) {


        var filtered_data = this.calculateTotalDeathsByCauseInYear(data, year);
        this.drawPieChart(filtered_data);
    }






}


window.customElements.define('total-deaths', TotalDeaths);