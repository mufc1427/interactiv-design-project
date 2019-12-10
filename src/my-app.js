

import {
  PolymerElement,
  html
} from '@polymer/polymer/polymer-element.js';
import {
  setPassiveTouchGestures,
  setRootPath
} from '@polymer/polymer/lib/utils/settings.js';
import '@polymer/app-layout/app-drawer/app-drawer.js';
import '@polymer/app-layout/app-drawer-layout/app-drawer-layout.js';
import '@polymer/app-layout/app-header/app-header.js';
import '@polymer/app-layout/app-header-layout/app-header-layout.js';
import '@polymer/app-layout/app-scroll-effects/app-scroll-effects.js';
import '@polymer/app-layout/app-toolbar/app-toolbar.js';
import '@polymer/app-route/app-location.js';
//import '@polymer/paper-dropdown-menu/paper-dropdown-menu.js'
 import '@polymer/paper-slider/paper-slider.js';
import '@polymer/app-route/app-route.js';
import '@polymer/iron-pages/iron-pages.js';
import '@polymer/iron-selector/iron-selector.js';
import '@polymer/paper-icon-button/paper-icon-button.js';

//import * as d3 from 'd3' //d3 library
import './my-icons.js';

// Gesture events like tap and track generated from touch will not be
// preventable, allowing for better scrolling performance.
setPassiveTouchGestures(true);

// Set Polymer's root path to the same value we passed to our service worker
// in `index.html`.
setRootPath(MyAppGlobals.rootPath);

class MyApp extends PolymerElement {
  static get template() {
    return html `
      <style>
        :host {
          --app-primary-color: #403e3e;
          --app-secondary-color: black;

          display: block;
        }



          @media screen and(max - width: 575 px) {
            .no-show
            {
              display:none;
            }

            .show-el
            {
              display:block;
            }
          }

        .nav-link
        {
             color:white important!;
        }

        .nav-link:hover
        {
            opacity:1;
        }


        .drawer-list a
        {
          color:white;
        }

    .center-spinner
      {
        position:absolute;
        top:50%;
        left:50%;
        margin-top:300px;
      }

      .nav-link
      {
        color:wheat;
        
      }

      .link-space
      {
        margin-right:20px;
      }

      #last-link
      {
        margin-right:100px;
      }



        app-drawer-layout:not([narrow]) [drawer-toggle] {
          display: block;
        }

        app-header {
          color: #fff;
          background-color: var(--app-primary-color);
        }

        app-header paper-icon-button {
          --paper-icon-button-ink-color: white;
        }

        .drawer-list {
          margin: 0 20px;
        }

        .show-el
        {
          display:none;
        }

        #nav-bar-custom
        {
          display:none;
          background-color:#474545;
          color:white;
        }

        .drawer-list a {
          display: block;
          padding: 0 16px;
          text-decoration: none;
          color: var(--app-secondary-color);
          line-height: 40px;
        }

        .drawer-list a.iron-selected {
          color: black;
          font-weight: bold;
        }

          .custom-bg {
              background-color: #2b2a2a;
        }
      </style>

      <app-location route="{{route}}" url-space-regex="^[[rootPath]]">
      </app-location>

      <app-route route="{{route}}" pattern="[[rootPath]]:page" data="{{routeData}}" tail="{{subroute}}">
      </app-route>

      <app-drawer-layout  fullbleed="" narrow="{{narrow}}">
        <!-- Drawer content -->
       <!-- <app-drawer id="drawer" slot="drawer" swipe-open="[[narrow]]">
          <app-toolbar>Menu</app-toolbar>
          <hr>
          <iron-selector selected="[[page]]" attr-for-selected="name" class="drawer-list" role="navigation">
            <a name="view1" href="[[rootPath]]view1" class="nav-link">View One</a>
            <a name="view2" href="[[rootPath]]view2" class="nav-link">View Two</a>
            <a name="view3" href="[[rootPath]]view3" class="nav-link">View Three</a>
          </iron-selector>
        </app-drawer>-->

        <!-- Main content -->
        <app-header-layout has-scrolling-region="">

          <app-header slot="header" condenses="" reveals="" effects="waterfall">
            <app-toolbar>
              <!--<paper-icon-button class="show-el" icon="my-icons:menu" drawer-toggle="" on-click="_toggleMenu"></paper-icon-button>-->
              <div main-title="">Isaac's Vizualization Tools</div>





              <iron-selector selected="[[page]]" attr-for-selected="name" class="drawer-list show-el" role="navigation">
             <a class="nav-link link-space no-show" name="map" href="[[rootPath]]map">Home</a>
            <hr>
            <!--<a  class="nav-link link-space no-show" name="state" href="[[rootPath]]state">By State</a>-->
            <hr>
            <a id="last-link" class="nav-link no-show" name="about-page" href="[[rootPath]]about">About</a>
        
          </iron-selector>
             
          
          
            <a class="nav-link link-space no-show" name="map" href="[[rootPath]]map">Home</a>
            <hr>
            <!--<a  class="nav-link link-space no-show" name="state" href="[[rootPath]]state">By State</a>-->
            <hr>
            <a id="last-link" class="nav-link no-show" name="about-page" href="[[rootPath]]about">About</a>
        
          
          
            </app-toolbar>
          </app-header>

          

          <iron-pages class"custom-bg" selected="[[page]]" attr-for-selected="name" role="main">
            <map-page name="map"></map-page>
           <!-- <state-tools name="state"></state-tools> -->
            <about-page name="about"></about-page>
            <my-view404 name="view404"></my-view404>
          </iron-pages>
        </app-header-layout>
      </app-drawer-layout>
    `;
  }

  static get properties() {
    return {
      page: {
        type: String,
        reflectToAttribute: true,
        observer: '_pageChanged'
      },
      routeData: Object,
      subroute: Object
    };
  }

  static get observers() {
    return [
      '_routePageChanged(routeData.page)'
    ];
  }


  _toggleMenu()
  {


    var navbar_elem = this.shadowRoot.querySelector("#nav-bar-custom");
    if (navbar_elem.style.display == "none")
    {
      navbar_elem.style.display = "block";
    }
    else{
      navbar_elem.style.display = "none";
    }
    
  }

  _routePageChanged(page) {
    // Show the corresponding page according to the route.
    //
    // If no page was found in the route data, page will be an empty string.
    // Show 'view1' in that case. And if the page doesn't exist, show 'view404'.
    if (!page) {
      this.page = 'map';
    } else if (['map', 'state', 'about'].indexOf(page) !== -1) {
      this.page = page;
    } else {
      this.page = 'view404';
    }

    // Close a non-persistent drawer when the page & route are changed.
    /*if (!this.$.drawer.persistent) {
      this.$.drawer.close();
    }*/
  }

  _pageChanged(page) {
    // Import the page component on demand.
    //
    // Note: `polymer build` doesn't like string concatenation in the import
    // statement, so break it up.
    switch (page) {
      case 'map':
        import('./map-page.js');
        break;
      /*case 'state':
        import('./state-page.js');
        break;*/
      case 'about':
        import('./about-page.js');
        break;
      case 'view404':
        import('./my-view404.js');
        break;
    }
  }
}

window.customElements.define('my-app', MyApp);