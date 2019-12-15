import {
  PolymerElement,
  html
} from '@polymer/polymer/polymer-element.js';
import './shared-styles.js';
import '@polymer/paper-dropdown-menu/paper-dropdown-menu.js';
import '@polymer/paper-item/paper-item.js';
import '@polymer/paper-listbox/paper-listbox.js';
import '@polymer/paper-button/paper-button.js';
//import * as d3 from "d3";
//import '../tools.js/index.js'

class StateTools extends PolymerElement {
  static get template() {
    return html `
      <style include="shared-styles">
        :host {
          display: block;

          padding: 10px;
        }


        .line {
          fill: none;
          stroke: #d19041;
          stroke-width: 3;
        }

        .line2
        {
             fill:none;
             stroke: #2c6cc7;
             stroke-width:3;
        }

        /*tooltip styling */
        div.tooltip
        {
          width:80px;
          height:20px !important;
          text-align:center;

        }

        .overlay {
          fill: none;
          pointer - events: all;
        }

        /* Style the dots by assigning a fill and stroke */
        .dot {
          fill: #ffab00;
          stroke: #fff;
        }

        .focus circle {
          fill: none;
          stroke: steelblue;
        }

        


     

          @media screen and (max-width: 575px) {
 
            #main-chart-1
            {
              overflow-x:scroll !important;
              border: 1px solid #cad8db !important;
            }

            #bar-chart
            {
              width:600px;
            }

            #main-chart-2
            {
              overflow-x:scroll !important;
              border: 1px solid #cad8db !important;
            }

            #lines-chart
            {
              width:600px;
            }
}

          
      </style>

      <div class="main-paragragh2">
        <h2>Number of deaths by cause on a state (1999-2017) </h2>
        <hr>

        <section class="main-paragraph">
        <P>
        This visualization demostrate the number of deaths caused by a specific cause on a state from the period 1999-2017. This tool is useful to undertand an specific trend for a cause. For example, we can tell if the
        number of deaths for a cause in a state is decreasing, increasing, or stable very easily. This type of information can be useful to predict future patterns. 

        <br>
        <strong>How to use:</strong> To use just select a cause and a state from the dropdown menu and click the show button</strong>
        </P>

        </section>
       <paper-dropdown-menu label = "Select a cause" id="select-cause-menu" on-iron-activate="_selectCause" vertical-offset="60">
  <paper-listbox slot = "dropdown-content" selected = "0">

  <template is="dom-repeat" items = [[causes]] as="cause">

  <paper-item class="year">[[cause]]</paper-item> 

  </template>
 
  </paper-listbox> </paper-dropdown-menu>

&nbsp;
&nbsp;
&nbsp;
     <paper-dropdown-menu label = "Select a state" id="select-cause-menu" on-iron-activate="_selectState" vertical-offset="60" role="combobox" aria-autocomplete="none" aria-haspopup="true" aria-disabled="false">
  <paper-listbox slot = "dropdown-content" selected = "0">

  <template is="dom-repeat" items = [[states]] as="state">

  <paper-item class="year">[[state]]</paper-item> 

  </template>
 
  </paper-listbox> </paper-dropdown-menu>


  <paper-button toggles raised class="green button-styles" on-click="_drawNewBarChart" >show</paper-button>

  <h3 id="chart1-title" class="text-center">Number of Deaths caused by Stroke in California (1999-2017)</h3>

          <div id="main-chart-1" ></div>
       

<h2>Number of deaths by cause, in two states (1999-2017)</h2>

<hr>

        <section>
        <P>
        This visualization demonstrates the number of deaths in two states by a specific cause from the period 1999-2017. With this tool we can compared the trend of a cause in two
        different states. This give us an idea,
          for example on the difference of total number of deaths in two states
        for a specific cause. As an example, by using this tool we can tell that
        California has by far the most deaths
        for every single cause. Although the map can also provide this information, this visualization really put in perpective the difference between two
        states, something that a map can't do. 

        <br>
        <strong>How to use:</strong> To use just select two different state from the dropdown menus and then select a cause, and  click the show button. The x-axis represent the year, and the y-axis the 
        number of deaths
       <br>
       <strong>Note:</strong> if you select the same state for both dropdowns, then only one line will show up.
       
        </P>

        </section>


<paper-dropdown-menu label = "Select the first state" id="select-first-state-menu" on-iron-activate="_selectFirstState" vertical-offset="60" role="combobox" aria-autocomplete="none" aria-haspopup="true" aria-disabled="false">
  <paper-listbox slot = "dropdown-content" selected = "0">

  <template is="dom-repeat" items = [[states]] as="state">

  <paper-item class="year">[[state]]</paper-item> 

  </template>
 
  </paper-listbox> </paper-dropdown-menu>

&nbsp;
&nbsp;
&nbsp;
     <paper-dropdown-menu label = "Select the second state" id="select-second-state-menu" on-iron-activate="_selectSecondState" vertical-offset="60" role="combobox" aria-autocomplete="none" aria-haspopup="true" aria-disabled="false">
  <paper-listbox slot = "dropdown-content" selected = "0">

  <template is="dom-repeat" items = [[states]] as="state">

  <paper-item class="year">[[state]]</paper-item> 

  </template>
 
  </paper-listbox> </paper-dropdown-menu>

  &nbsp;
&nbsp;
&nbsp;

<paper-dropdown-menu label="Select the second state"
id = "select-second-state-menu"
on-iron-activate = "_selectCauseComparison"
vertical-offset = "60"
role="combobox"
aria-autocomplete = "none"
aria-haspopup = "true"
aria-disabled = "false" >
<paper-listbox slot = "dropdown-content" selected = "0">

  <template is="dom-repeat" items = [[causes]] as="cause">

  <paper-item class="year">[[cause]]</paper-item> 

  </template>
 
  </paper-listbox> </paper-dropdown-menu>

<paper-button toggles raised class="green button-styles" on-click="_drawNewLineChart" >show</paper-button>



          <h3 id="chart2-title" class="text-center">Number of deaths</h3>
      

          <div id="main-chart-2"></div>



             
    `;
  }


  ready() {
    super.ready();
    this.initView();

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

      cause_selected: {

        type: String,
        value: "default"
      },

      states: {
        type: Array,
        value: []
      },

      state: {
        type: String,
        value: ""



      },
      state_comp1: {
        type:  String,
        value: ""
      },

       state_comp2: {
         type: String,
         value: ""
       },

      cause_selected_comp: {
        type: String,
        value: ""
      },



      parsed_data: {
        type: Object,
        value: null
      },

      helper: {
        type: new Tools(),
        value: null
      },
    }
  }

  _selectCauseComparison(event) {
    this._setProperty("cause_selected_comp", event.detail.item.innerText);
  }


  _selectFirstState(event) {



    this._setProperty("state_comp1", event.detail.item.innerText)


  }


  _selectSecondState(event) {
     this._setProperty("state_comp2", event.detail.item.innerText)
  }


  _selectCause(event) {
    this._setProperty("cause", event.detail.item.innerText)
  }

  _selectState(event) {
    this._setProperty("state", event.detail.item.innerText)
  }


  _drawNewLineChart() {

    var first_state = "";
    var second_state = "";
    var cause = "";

    if (this._getProperty("state_comp1") == undefined)
    {
      first_state ="Alabama";
     
      

    }
    else
    {

     first_state = this._getProperty("state_comp1");
     
       
    }


    if ( this._getProperty("state_comp2") == undefined)
    {
      second_state = "Alabama"
    }
    else{
       second_state = this._getProperty("state_comp2");
    }


    if (this._getProperty("cause_selected_comp") == undefined)
    {
cause = "Unintentional injuries"
    }
    else{
      cause = this._getProperty("cause_selected_comp");
    }
    
   
    var original_data = this._getProperty("parsed_data");


    var calculate_num_of_deaths_first_state = this.calculateCausesPerState(original_data, first_state, cause, 18);
    var calculate_num_of_deaths_second_state = this.calculateCausesPerState(original_data, second_state, cause, 18);

    this.shadowRoot.querySelector("#chart2-title").innerText = "Number of deaths caused by " + cause + " in " + first_state + " and " + second_state + " (1999-2017)"


    var fixed_data_first_state = this._getProperty("helper").parseYearsWithDeathCount(calculate_num_of_deaths_first_state); 
    var fixed_data_second_state = this._getProperty("helper").parseYearsWithDeathCount(calculate_num_of_deaths_second_state);
    d3.select(this.shadowRoot.querySelector("#lines-chart")).remove();

    this.drawLineChart(fixed_data_first_state, fixed_data_second_state, first_state, second_state);

  }

  _drawNewBarChart() {
    var state = this._getProperty("state");
    var cause = this._getProperty("cause");
    var original_data = this._getProperty("parsed_data");
    var data = this.calculateCausesPerState(original_data, state, cause, 18);

    this.shadowRoot.querySelector("#chart1-title").innerText = "Number of Deaths caused by " + cause + " in " + state + " (1999-2017)"

    var fixed_data = this._getProperty("helper").parseYearsWithDeathCount(data);
    d3.select(this.shadowRoot.querySelector("svg")).remove();

    this.drawChart(fixed_data);
  }


  insertStatesToCompare(new_state) {
    var temp_holder = null;
    if (this._getProperty("states_list").length) {
      temp_holder = this.pop("states_list");
    }



    if (new_state == temp_holder) {
      this.shadowRoot.querySelector("#error-msg").innerText = "Both states cannot be the same"
    } else {

      if (temp_holder != null) {
        this.push("states_list",
          temp_holder);
      }
      this.push("states_list", new_state)
    }
  }


  calculateCausesPerState(data, state, cause, num_of_causes) {
    var years_list = this._getProperty("helper").parseYears(data);
    var years_object = this._getProperty("helper").constructYearObject(years_list);
    var count_causes = 0;

    for (let i = 0; i < data.length; i++) {




      if (count_causes > num_of_causes) {
        break;
      }


      if (data[i].State == state && data[i].Cause_Name == cause) {
        years_object[data[i].year].cause = data[i].Cause_Name;
        years_object[data[i].year].deaths_count = data[i].Deaths;
        years_object[data[i].year].state = data[i].State;
        years_object[data[i].year].year = data[i].year;

        count_causes++;

      }







    }

    return years_object;
  }



  drawLineChart(dataset, second_dataset, first_state_name, second_state_name) {


    var state_names = [first_state_name, second_state_name];

    var state_colors = {};
    state_colors[first_state_name] = "rgb(255, 171, 0)"
    state_colors[second_state_name] = "rgb(44, 108, 199)";




    var margin = {
        top: 40,
        right: 0,
        bottom: 30,
        left: 100
      },
      width = 1000 - margin.left - margin.right,
      height = 500 - margin.top - margin.bottom;

      //draw resposnive svg
    var svg = d3.select(this.shadowRoot.querySelector("#main-chart-2")).append("svg")
     .attr("viewBox", function () {
         return "0 0 " + (width + margin.left + margin.right) + " " + (height + margin.left + margin.right);
       })
       .attr("preserveAspectRatio", "xMidYMid meet")
      .attr("id", "lines-chart")
      .append("g")
      .attr("transform", "translate(" + margin.left + "," + margin.top/2 + ")");


      //add labels
    svg.append("text").attr("text-anchor", "middle") // this makes it easy to centre the text as the transform is applied to the anchor
      .attr("transform", "translate(" + -60 +  ")rotate(-90)") // text is drawn off the screen top left, move down and out and rotate
      .text("Deaths").attr("dy", "0.2em").attr("x", 0 - height/2);




    svg.append("text")
      .attr("text-anchor", "middle") // this makes it easy to centre the text as the transform is applied to the anchor
      .attr("transform", "translate(" + (width / 2) + "," + (height + (120 / 3)) + ")").attr("dy", "0.2em") // centre below axis
      .text("Year");


    var color_object = this._getProperty("helper").getColorObject();




    var tooltip = d3.select(this.shadowRoot.querySelector("#main-chart-2"))
      .append("div")
      .attr("class", "tooltip")
      .style("opacity", 0);


    var max_val = 0;
    var max_val_first = d3.max(dataset, d => {
      return d.deaths_count;
    });

    var max_val_second = d3.max(second_dataset, d => {
      return d.deaths_count;
    });

    if (max_val_first > max_val_second) {
      max_val = max_val_first;
    } else {
      max_val = max_val_second;
    }



    var x_scale = d3.scaleBand()
      .range([0, width])
      .padding(0.4);
    var y_scale = d3.scaleLinear()
      .range([height, 0]);






    x_scale.domain(dataset.map(d => {
      return d.year;
    }));
    // y.domain([0, d3.max(dataset,  d => { return d.value; })]);
    y_scale.domain([0, max_val]);

    // var x_axis = d3.axisBottom(x).tickSize([]).tickPadding(15);
    //var y_axis = d3.axisLeft(y);





    svg.append("g").attr("class", "x axis").attr("transform", "translate(0," + height + ")").call(d3.axisBottom(x_scale))


    svg.append("g")
      .attr("class", "y axis")
      .call(d3.axisLeft(y_scale));


    var line = d3.line()
      .x(function (d) {

        return x_scale(d.year);
      }) // set the x values for the line generator
      .y(function (d) {


        return y_scale(d.deaths_count);
      }) // set the y values for the line generator 
      .curve(d3.curveMonotoneX) // apply smoothing to the l





    svg.append("path")
      .datum(dataset) // 10. Binds data to the line 
      .attr("class", "line") // Assign a class for styling 
      .attr("d", line)


    if (first_state_name != second_state_name) {
      svg.append("path")
        .datum(second_dataset) // 10. Binds data to the line 
        .attr("class", "line2") // Assign a class for styling 
        .attr("d", line);
    }



    


    svg.selectAll(".dot")
      .data(dataset)
      .enter().append("circle") // Uses the enter().append() method
      .attr("class", "dot") // Assign a class for styling
      .attr("cx", function (d) {
        return x_scale(d.year)
      })
      .attr("cy", function (d) {
        return y_scale(d.deaths_count)
      })
      .attr("r", 5).on("mouseover", function (d) {


        tooltip.transition()
          .duration(200)
          .style("opacity", .9)
          .style("border", "1px solid black");
        tooltip.text(d.deaths_count)
          .attr('x', 0)
          .attr('dy', 5)
          .text(function () {
            return d.deaths_count;
          })
          .style("left", (d3.event.pageX) + "px")
          .style("top", (d3.event.pageY - 28) + "px");
      }).on("mouseout", function (d) {
        tooltip.transition()
          .duration(500)
          .style("opacity", 0)
          .style("border", "5px soild black")
          .style("border-radius", "5px");
      });

    if (first_state_name != second_state_name) {
      svg.selectAll(".dot-two")
        .data(second_dataset)
        .enter().append("circle") // Uses the enter().append() method
        .attr("class", "dot-two") // Assign a class for styling
        .attr("cx", function (d) {
          return x_scale(d.year)
        })
        .attr("cy", function (d) {
          return y_scale(d.deaths_count)
        })
        .attr("r", 5).on("mouseover", function (d) {


          tooltip.transition()
            .duration(200)
            .style("opacity", .9)
            .style("border", "1px solid black");
          tooltip.text(d.deaths_count)
            .attr('x', 0)
            .attr('dy', 5)
            .text(function()
            {
              return d.deaths_count;
            })
            .style("left", (d3.event.pageX) + "px")
            .style("top", (d3.event.pageY - 28) + "px");
        }).on("mouseout", function (d) {
          tooltip.transition()
            .duration(500)
            .style("opacity", 0)
            .style("border", "5px soild black")
            .style("border-radius", "5px");
        });
    }


    /* Add 'curtain' rectangle to hide entire graph */
    svg.append('rect')
      .attr('x', -1 * width)
      .attr('y', -1 * height)
      .attr('height', height)
      .attr('width', width)
      .attr('class', 'curtain')
      .attr('transform', 'rotate(180)')
      .style('fill', '#ffffff')



    /* Create a shared transition for anything we're animating */
    var transition = svg.transition()
      .transition()
      .duration(750)
      .delay(function () {
        return 1000;
      })


    transition.select('rect.curtain')
      .attr('width', 0);
    transition.select('line.guide')
      .attr('transform', 'translate(' + width + ', 0)')



    if (first_state_name != second_state_name) {

      svg.selectAll("mydots")
        .data(state_names)
        .enter()
        .append("circle")
        .attr("cx", function(d, i)
        {
               if(i == 1)
               {
                 return 140;
               }
               else 
               {
                 return 50;
               }
        })
        .attr("cy", function (d, i) {
          
          return -5 ;
        }) // 100 is where the first dot appears. 25 is the distance between dots
        .attr("r", 7)
        .style("fill", function (d) {


          return state_colors[d];
        })


      // Add one dot in the legend for each name.
      svg.selectAll("mylabels")
        .data(state_names)
        .enter()
        .append("text")
        .attr("x", function(d, i)
        {
          if(i == 1)
          {
            return 150;
          }
          else{
            return 60;
          }
        })
        .attr("y", function (d, i) {
          return 1;
        }) // 100 is where the first dot appears. 25 is the distance between dots
        .style("fill", function (d) {

          return state_colors[d];
        })
        .text(function (d) {

          return d;
        })
        .attr("text-anchor", "right")
        .style("alignment-baseline", "middle")
    }


    

  }




  drawChart(dataset) {

    var color_object = this._getProperty("helper").getColorObject();



    var margin = {
        top: 40,
        right: 0,
        bottom: 30,
        left: 100
      },
      width = 1000 - margin.left - margin.right,
      height = 500 - margin.top - margin.bottom;

    var greyColor = "#898989";
    var barColor = color_object[this._getProperty("cause")];
    var highlightColor = d3.interpolateInferno(0.3);

    var svg = d3.select(this.shadowRoot.querySelector("#main-chart-1")).append("svg")
      .attr("viewBox", function()
      {
           return "0 0 " + (width + margin.left + margin.right) +" " + (height + margin.left + margin.right); 
      })
      .attr("id", "bar-chart")
      .attr("preserveAspectRatio", "xMidYMid meet")
      .append("g")
      .attr("transform", "translate(" + margin.left + "," + margin.top/2 + ")");

    var x = d3.scaleBand()
      .range([0, width])
      .padding(0.4);
    var y = d3.scaleLinear()
      .range([height, 0]);

    var xAxis = d3.axisBottom(x).tickSize([]).tickPadding(15);
    var yAxis = d3.axisLeft(y);



    var max_val = d3.max(dataset, d => {
      return d.deaths_count;
    });




    //add labels
    svg.append("text").attr("text-anchor", "middle") // this makes it easy to centre the text as the transform is applied to the anchor
      .attr("transform", "translate(" + -60 +  ")rotate(-90)") // text is drawn off the screen top left, move down and out and rotate
      .text("Deaths").attr("dy", "0.2em").attr("x", 0 - height/2);




    svg.append("text")
      .attr("text-anchor", "middle") // this makes it easy to centre the text as the transform is applied to the anchor
      .attr("transform", "translate(" + (width / 2) + "," + (height + (120 / 3)) + ")").attr("dy", "0.2em") // centre below axis
      .text("Year");
    

    x.domain(dataset.map(d => {
      return d.year;
    }));
    // y.domain([0, d3.max(dataset,  d => { return d.value; })]);
    y.domain([0, max_val]);

    svg.append("g")
      .attr("class", "x axis")
      .attr("transform", "translate(0," + height + ")")
      .call(xAxis);
    svg.append("g")
      .attr("class", "y axis")
      .call(yAxis);

    svg.selectAll(".bar")
      .data(dataset)
      .enter().append("rect")
      .attr("class", "bar")
      .style("display", d => {

        return d.deaths_count === null ? "none" : null;
      })
      .style("fill", d => {
        return d.deaths_count === d3.max(dataset, d => {
            return d.deaths_count;
          }) ?
          highlightColor : barColor
      })
      .attr("x", d => {
        return x(d.year);
      })
      .attr("width", x.bandwidth())
      .attr("y", d => {
        return height;
      })
      .attr("height", 0)
      .transition()
      .duration(750)
      .delay(function (d, i) {
        return i * 150;
      })
      .attr("y", d => {
        return y(d.deaths_count);
      })
      .attr("height", d => {
        return height - y(d.deaths_count);
      });

    svg.selectAll(".label")
      .data(dataset)
      .enter()
      .append("text")
      .attr("class", "label")
      .style("display", d => {
        let test = d.deaths_count
        return d.deaths_count === null ? "none" : null;
      })
      .attr("x", (d => {
        return x(d.year) + (x.bandwidth() / 2) - 8;
      }))
      .style("fill", d => {
        return d.deaths_count === d3.max(dataset, d => {
            return d.deaths_count;
          }) ?
          highlightColor : greyColor
      })
      .attr("y", d => {
        return height;
      })
      .attr("height", 0)
      .transition()
      .duration(750)
      .delay((d, i) => {
        return i * 150;
      })
      .text(d => {
        return d.deaths_count;
      })
      .attr("y", d => {
        return y(d.deaths_count) + .1;
      })
      .attr("dy", "-.9em").style("font-size", "10px");





  }





  initView() {

    var helper = new Tools();

    this._setProperty("helper", helper)

    helper.parseData().then((result) => {


      this._setProperty("parsed_data", result);
      //this.bindDataInitialized(result, 2017);
      var data = this.calculateCausesPerState(result, "Alabama", "Unintentional injuries", 18);
      var data_test = this.calculateCausesPerState(result, "Alabama", "Unintentional injuries", 18)
      this._setProperty("state", "Alabama");
      this._setProperty("cause", "Unintentional injuries");

      var fixed_data = helper.parseYearsWithDeathCount(data);
      var test_fied_data = helper.parseYearsWithDeathCount(data_test);
      
      this.drawChart(fixed_data);
      
    

 //set title of second chart 
          this.shadowRoot.querySelector("#chart2-title").innerText = "Number of deaths caused by Unintentional Injuries in Alabama (1999-2017)"
      this.drawLineChart(fixed_data, test_fied_data, "Alabama", "Alabama");

     


      this._setProperty("causes", helper.parseCauses(result));
      this._setProperty("states", helper.getStatesOnly());

       this.shadowRoot.querySelector("#chart1-title").innerText = "Number of deaths caused by Unintentional Injuries in Alabama (1999-2017)"




    });



  }
}

window.customElements.define('state-tools', StateTools);