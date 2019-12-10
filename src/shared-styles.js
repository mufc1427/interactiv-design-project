

import '@polymer/polymer/polymer-element.js';

const $_documentContainer = document.createElement('template');
$_documentContainer.innerHTML = `<dom-module id="shared-styles">
  <template>
    <style>
      .card {
        margin: 24px;
        padding: 16px;
        color: #757575;
        border-radius: 5px;
        background-color: #fff;
        box-shadow: 0 2px 2px 0 rgba(0, 0, 0, 0.14), 0 1px 5px 0 rgba(0, 0, 0, 0.12), 0 3px 1px -2px rgba(0, 0, 0, 0.2);
      }


       .main-paragragh p {
    margin-top: 25px;
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

      .button-styles
          {
            height:40px;
          }

          .text-center
          {
             text-align: center;
          }

          .button-styles:hover
          {
            backgroud-color: blue;
          }


           div.tooltip {
               position: fixed;
               text - align: center;
               width: 60 px;
               height: 28 px;
               padding: 2 px;
               font: 12 px sans - serif;
               background: #5e5f61;
          border: 0 px;
          color:white;
          border-radius: 15 px;
          pointer-events: auto;
           border: 1 px solid black;
          
        }


        .img-size
        {
          width:900px;
        }
      

      .circle {
        display: inline-block;
        width: 64px;
        height: 64px;
        text-align: center;
        color: #555;
        border-radius: 50%;
        background: #ddd;
        font-size: 30px;
        line-height: 64px;
      }

      .center-img
      {
        display: block;
        margin-left: auto;
        margin-right: auto;
      }

      .container
      {
        margin-right:auto;
        margin-left:auto;
        max-width:1200px;

    
      }

      h1 {
        margin: 16px 0;
        color: #212121;
      }

      .text-center
      {
           text-align: center !important;
         
      }
    </style>
  </template>
</dom-module>`;

document.head.appendChild($_documentContainer.content);
