import { PolymerElement, html } from '@polymer/polymer/polymer-element.js';

class About extends PolymerElement {
  static get template() {
    return html`
     <style include="shared-styles">
        :host {
          display: block;

          padding: 10px;
        }
      </style>


      <section>
      <h1 class="text-center">Design Decisions</h1>
        <hr>
      </section>
      <div class="card">
        
        
        <section class="main-paragragh">
        <h2>
                1. Visual Encoding
        </h2>

        <hr>
        <p>The visual encoding that utilized are: color, text labels, and length.  </p>


        <section >
        <h3>
        Color
        </h3>
        <p>
        Color is used to identify a cause. Each cause has a color assigned to it. I chose color to be the visual encoding for causes because
        in the map visualization, it was necessary to easily distiguish between causes of death, when performing a query looking for the number one cause of death
        in each state for a specifc year. Choosing the colors was a difficult task, but I tried to use colors that could be easily distigushible from one another.

        </p>
        
        </section>


        <section >
        <h3>
        Text Labels
        </h3>
        <p>
      Text labels were used for the map and bar-chart visualizations. Text labels were used for both visualiations to indicate the number of deaths in a state by a cause.
      The reason for using text labels, is that it immediately  provides the user with a very important piece of information. In the case of the bar-chart, the user doesn't have
      to look at the y-axis to try to guess a correct value, as that information is provided directly by the text labels.

        </p>
        
        </section>



         <section >
        <h3>
        Length
        </h3>
        <p>
         The use of a bar chart is an example of using length as a visual encoding. The bar chart was use because the number of deaths 
         by cause is a form a quantitative data, which can be well visualized using this type of charts, and in this case it allows the user 
         to clearly see the death difference between each year. 

        </p>
        
        </section>
        </section>
 

        <section class="main-paragraph">
        <h2>
        2. Interaction techniques
        </h2>
        <hr>
        <p>I decided that using dropdown menus and buttons was the best way to dynamically present data to someone 
        based on the fallowimg two reasons:

      

        
         </p>

         <ol>
        <li> Simplicity and Ease of Use</li>
        <li>Data</li>
        

        

        </ol>


        <h3>
        1. Simplicity and Ease of Use
        </h3>

        <P>Using the dropdowns to visualized a specific data point is straigthforward. Taking thethe map as an example, someone can select a year and a cause 
            and the number of deaths for that specific cause in each state would display as a label on each state. I think this is the easiest and best way to show the type of data that I'm trying to 
            visualized.
        </p>
         


         <h3>
        2. Data
        </h3>

        <P>The dataset from where the data comes from looks like this:
        </p>

        <img class="img-size" src="../images/dataset-causes.png" alt="Image demostrating dataset">

        <p> Based on this dataset, I think the best way to interact with the data is through the use of dynamic queries; You select a cause and a state and it return the number of deaths from 1999 to 2017, which is what the bar-chart that I created does. The data itself does not allow for some type of vizualizations.  
            For example, for the map I was thinking about implementing a method where someone could perform some for of zooming into a state, but that didn't make any sense as there's nothing new to vizualized in terms of data because the dataset does not contain any other form data for states other than deaths. Therefore, vizualizing 
            the data based on parameters selected by the user was the best way to go.

            <br>
            <br>

            Hover-on is also implemented in two visualizations: the map and line chart.For exmaple,  when the user hovers on a state in the map vizualization, a tooltip indicating the number of deaths, cause,  and state name is display. The reason why I implememented hover-on was because I wanted to display to the user all the data related to state in
            w that it would't affect the visual quality of the visualization (too many labels in state). A tooltip on hover was the perfect solution to this problem.
        </p> 


         
         
         
         
         </section>
        
        
        <section>
        <h2>3. Development Process</h2><hr>
        
        
        <p>For this assigment I worked alone. As you can see, this a full web application that utilizes Google's Polymer Javascript Library for the user interface and state management as well as D3.js for the vizualizations.
        Developing this application took between 20-30 hours. The development aspect that took the most time was definitely creating the vizualizations using D3, as this was my first time using this library. Another aspect that took some time was 
        getting familiar with the Polymer library, even though that is similar to Angular which is something that I have experiend with, there were still a few things such as event handling that are different 
        between the two libraries. I conclusion, this assigment was a good hands-on experience with new technologies, and also a good opportunity 
        to learn more about that data visualization techniques. 
          </p>
        
        
        </section>

      </div>
    `;
  }
}

window.customElements.define('about-page', About);
