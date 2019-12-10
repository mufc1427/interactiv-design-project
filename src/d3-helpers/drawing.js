class Drawing
{
    drawLengend(svg, data, color_object,cordinates_object_dots, cordinates_object_text, extra_txt )
    {


        var counter = 0;
 svg.selectAll("mydots")
     .data(data)
     .enter()
     .append("circle")
     .attr("cx", cordinates_object_dots.cx)
     .attr("cy", function (i) {

        
        if(i.cause != "")
        {
        counter++;
         return cordinates_object_dots.ya + counter * cordinates_object_dots.yb;
        }
     }) // 100 is where the first dot appears. 25 is the distance between dots
     .attr("r", 7)
     .style("fill", function (d) {
       
           

              return color_object[d.cause];
           
     });

     counter = 0;//reset counter for text labels


 // Add one dot in the legend for each name.
 svg.selectAll("mylabels")
     .data(data)
     .enter()
     .append("text")
     .attr("x", cordinates_object_text.x)
     .attr("y", function (d, i) {

        if(i.cause !="")
        {
         return cordinates_object_text.ya + (i + 1) * cordinates_object_text.yb;
        }
     }) // 100 is where the first dot appears. 25 is the distance between dots
     .style("fill", function (d) {

      
           return color_object[d.cause];
        
     })
     .text(function (d) {

        if (extra_txt == true) {

           return d.cause + ": " + d.deaths_count;
        } else {
           return d.cause;
        }
     })
     .attr("text-anchor", "right")
     .style("alignment-baseline", "middle")
    }

    
}