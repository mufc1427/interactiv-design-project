//import * as d3 from "d3";


class Tools
{

    STATES() {
        var US_STATES = ["United States", "Alabama", "Alaska", "Arizona", "Arkansas", "California", "Colorado", "Connecticut", "Delaware", "District of Columbia", "Florida", "Georgia", "Hawaii", "Idaho", "Illinois", "Indiana", "Iowa",
            "Kansas", "Kentucky", "Louisiana", "Maine", "Maryland", "Massachusetts", "Michigan", "Minnesota", "Mississippi", "Missouri", "Montana", "Nebraska", "Nevada", "New Hampshire", "New Jersey", "New Mexico", "New York", "North Carolina", "North Dakota", "Ohio", "Oklahoma", "Oregon", "Pennsylvania", "Rhode Island", "South Carolina", "South Dakota", "Tennessee", "Texas", "Utah", "Vermont", "Virginia", "Washington", "West Virginia", "Wisconsin", "Wyoming"
        ];

        return US_STATES;
    }


   



    getStatesOnly()
    {
        var states_and_country = this.STATES();
        var states_only =[] ;
        for(let i = 0; i < states_and_country.length; i++ )
        {
            if(i == 0)
            {
                continue;
            }
            else{
               states_only[i - 1] = states_and_country[i];
            }
        }

        return  states_only;
    }

     constructStatesObject() {
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





     constructYearObject(years)
     {
         var year_object = {};
         

         for(let i = 0; i <  years.length; i++)
         {
             year_object[years[i]] = {
                 cause: "",
                 deaths_count:"",
                 state:"",
                 year:""
             }
         }

         return year_object;
     }



     constructCauseObject(data)
     {
         var causes = this.parseCauses(data);   

         var causes_object = new Object();

         for(let i = 0; i < causes.length; i++)
         {
             causes_object[causes[i]] = { cause:"", deaths_count:0}
              
             
         }


         return causes_object;
          }

    getColorObject()
{
 var causes_colors = ["rgb(222, 33, 75)", "rgb(49, 191, 235)", "rgb(48, 144, 240)", "rgb(48, 240, 125)", "rgb(242, 147, 107)", "rgb(182, 88, 196)", "rgb(107, 156, 120)", "rgb(118, 126, 181)", "rgb(137, 138, 143)", "rgb(2, 237, 229)", "rgb(188, 210, 245)"];
 var causes_names = ["Heart disease", "Cancer", "Unintentional injuries", "Alzheimer's disease", "Diabetes", "Influenza and pneumonia", "Suicide", "Kidney disease", "CLRD", "Stroke", "All causes"];




var color_object = {};


for (let i = 0; i < causes_names.length; i++) {
    color_object[causes_names[i]] = causes_colors[i];
}

return color_object;
    }

     parseYearsWithOrder(data)
     {
          var return_holder = Array();
         for (let key in data) {
             return_holder.push(data[key].deaths_count)
         }


            return  return_holder;

            
     }


     parseProperties(data)
     {
          var result_holder = Array();

          for(let key in data)
          {
              if(key !="All causes")
              {
              result_holder.push(data[key])
              }
              
          }

          return result_holder;
     }

     parseYearsWithDeathCount(data)
     {
            var return_holder = Array();
            for (let key in data) {

                let temp_object  ={

                    year: data[key].year,
                    deaths_count: data[key].deaths_count
                }
                return_holder.push(temp_object);
            }


           return  return_holder;
     }




     parseCauses(data) {

         var previous_cause = "";

         //Use this variable to stop the loop. The file
         //is formated in such a way the first cause is laways
         //gonna be the first cause for each state.
         var first_cause = data[0].Cause_Name;
         var break_loop_signal = 0;
         var return_holder = Array();

         for (let i = 0; i < data.length; i++) {
             if (previous_cause != data[i].Cause_Name) {


                 previous_cause = data[i].Cause_Name;

                 return_holder.push(data[i].Cause_Name);;

                 if (break_loop_signal == 0 && data[i].Cause_Name == first_cause && i > 0) {
                     break_loop_signal = i;
                 }

             }

             if (return_holder.length <= break_loop_signal) {
                 break;
             }









         }

         return return_holder;



     }


      parseYears(data) {



          let previous_key = 0;
          var return_holder= Array();

          for (let i = 0; i < data.length; i++) {
              if (previous_key != data[i].year) {
                  previous_key = data[i].year;

                  console.log(data[i].year);

                  return_holder.push(data[i].year);

              }

              if (previous_key == 1999) {
                  break;
              }



          }



          return return_holder;


      }


      parseDeathCount(data)
      {

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


         insertYears(data) {



             let previous_key = 0;
             let result_holder = Array();

             for (let i = 0; i < data.length; i++) {
                 if (previous_key != data[i].year) {
                     previous_key = data[i].year;

                     
                     result_holder.push(data[i].year);

                 }

                 if (previous_key == 1999) {
                     break;
                 }



             }


                return result_holder;


         }


         


    
}