
import { PolymerElement, html } from '@polymer/polymer/polymer-element.js';

class MyView404 extends PolymerElement {
  static get template() {
    return html`
      <style>
        :host {
          display: block;

          padding: 10px 20px;


         

          
        }

         .flex-cont
          {
            display:flex;
            justify-content:flex-start;
            font-size:20pt;
          }

          #message
          {
            margin-top:40%;
          }


          @media screen and (max-width: 575px) {
  .flex-cont {
    display: block;

  }

    #message
          {
            margin-top:-25%;
          }


          #sad-emoji
          {
            font-size:268px !important;
          }
}
      </style>



      <div class="flex-cont">
      <section class="layout-item">
      <span id="sad-emoji" style = 'font-size:300px;'> &#128542;</span>
      </section>


      <section class="layout-item">
      <p id="message">
      Oops you hit a 404. <a href="[[rootPath]]">Head back to home.</a>
     
    
      </p>
       </section>

      </div>
    `;
  }
}

window.customElements.define('my-view404', MyView404);
