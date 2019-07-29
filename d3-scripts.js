// References: http://bl.ocks.org/d3noob/a22c42db65eb00d4e369 for tooltip help

var margin = {top: 60,bottom:60,left:60,right:180};

var load_gaspriceyoy = async function(elemname, elemheight, elemwidth, startYear, endYear) {
  var filterFn = function(d) { return d.Year >= startYear && d.Year <= endYear }

  var height = elemheight - margin.top - margin.bottom;
  var width = elemwidth - margin.left - margin.right;

  // var yearRange = [1972 , 2021];
  var yearRange = [startYear - 3, endYear + 3]
  var xScale = d3.scaleLinear().domain(yearRange).range([0,width]);

  // Gas Price Year over Year
  var gasRange = [0, 5];
  var gasdata = await d3.csv('./processed_csvs/gasoline-price-history.csv');
  gasdata = gasdata.filter(filterFn);
  var yScale = d3.scaleLinear().domain(gasRange).range([height,0]);

  // Predefined Colors
  var gasColor = "lightblue";
  var gasColorAdj = "purple";
  var plotcolors = [
    {color: gasColor, legStr: "Nom. Gas Price $/Gal" },
    {color: gasColorAdj, legStr: "Inf. Adj. (2018) $/Gal"}
  ];

  // d3's Line Generator
  var gasline = d3.line()
    .x(function(d) { return xScale(d.Year); })
    .y(function(d) { return yScale(d.Avg); } )

  // d3's Line Generator
  var gaslineadj = d3.line()
    .x(function(d) { return xScale(d.Year); })
    .y(function(d) { return yScale(d.AvgAdj2018); } )

  // Plot Gas Line
  d3.select(elemname)
    .append('g')
    .attr("transform","translate("+margin.left+","+margin.top+")")
    .append("path")
    .datum(gasdata)
    .attr("fill", "none")
    .attr("stroke", gasColor)
    .attr("stroke-linejoin", "round")
    .attr("stroke-linecap", "round")
    .attr("stroke-width", 2.5)
    .attr("d", gasline);

  // Plot Gas Adj Line
  d3.select(elemname)
    .append('g')
    .attr("transform","translate("+margin.left+","+margin.top+")")
    .append("path")
    .datum(gasdata)
    .attr("fill", "none")
    .attr("stroke", gasColorAdj)
    .attr("stroke-linejoin", "round")
    .attr("stroke-linecap", "round")
    .attr("stroke-width", 2.5)
    .attr("d", gaslineadj);

    // Set up tooltip
    // Define the div for the tooltip
    var tooltipDiv = d3.select("body").append("div")
        .attr("class", "tooltip")
        .style("position", "absolute")
        .style("background", "white")
        .style("opacity", 0)
        .style("pointer-events", "none")
        .style("padding", "2px")
        .style("border-radius", "8px")

    var mouseOverTooltipFn = function(d) {
      tooltipDiv.transition().duration(200).style("opacity", .9);
      tooltipDiv.html("Year: " + d.Year + "<br/>" +
                      "Inflation Adj: " + parseFloat(d.AvgAdj2018).toFixed(3) + " $/gal<br/> " +
                      "Nominal: " + parseFloat(d.Avg).toFixed(3) + " $/gal")

      .style("left", (d3.event.pageX) + "px")
      .style("top", (d3.event.pageY - 60) + "px");
    }
    var mouseOutTooltipFn = function(d) {
        tooltipDiv.transition().duration(500).style("opacity", 0);
    }

  // Plot Avg scatter points
  d3.select(elemname)
    .append('g')
    .attr("transform","translate("+margin.left+","+margin.top+")")
    .selectAll('circle')
    .data(gasdata)
    .enter().append('circle')
    .attr('cx', function(d){return xScale(parseInt(d.Year))})
    .attr('cy', function(d){return yScale(parseFloat(d.Avg))})
    .attr('r', function(d,i) {return 5})
    .style("fill", gasColor)
    .on("mouseover", mouseOverTooltipFn)
    .on("mouseout", mouseOutTooltipFn);

  // Plot Avg Adj scatter points
  d3.select(elemname)
    .append('g')
    .attr("transform","translate("+margin.left+","+margin.top+")")
    .selectAll('circle')
    .data(gasdata)
    .enter().append('circle')
    .attr('cx', function(d){return xScale(parseInt(d.Year))})
    .attr('cy', function(d){return yScale(parseFloat(d.AvgAdj2018))})
    .attr('r', function(d,i) {return 5})
    .style("fill", gasColorAdj)
    .on("mouseover", mouseOverTooltipFn)
    .on("mouseout", mouseOutTooltipFn);

  // Place Title
  d3.select(elemname)
    .append('g')
    .attr("transform","translate("+margin.left+","+margin.top+")")
    .append("text")
    .attr("text-anchor", "middle")
    .attr("x", width / 2)
    .attr("y", -margin.top / 2)
    .text("Gas Prices ($) year over year (" + startYear + "-" + endYear + ")");

    // add axes
   d3.select(elemname)
     .append("g")
     .attr("transform", "translate(" + margin.left + "," + margin.top + ")")
     .call(d3.axisLeft(yScale)
     .tickFormat(d3.format("$")));

   d3.select(elemname)
     .append("g")
     .attr("transform", "translate(" + margin.left + "," + (margin.top + height) + ")")
     .call(d3.axisBottom(xScale)
     .tickFormat(d3.format("")));

    var legend = d3.select(elemname)
      .append('g')
      .attr("transform","translate("+(width+margin.top)+","+margin.top+")");

    var legUnitHeight = 25;
    var legRadius = 8;
    legend
          .selectAll("circle")
          .data(plotcolors)
          .enter()
          .append("circle")
          .attr("cx", 0)
          .attr("cy", function(d,i){return i * legUnitHeight})
          .attr('r', legRadius)
          .style("margin", 0)
          .style("fill",function(d) {return d.color;})
    legend
          .selectAll("text")
          .data(plotcolors)
          .enter()
          .append("text")
          .attr("x", 2 * legRadius)
          .attr("y", function(d,i){return i * legUnitHeight + 5})
          .style("fill",function(d) {return d.color;})
          .text(function(d) {return d.legStr});

      // add annotations
      // Edit this to add more annoations
      notes_dict = {
                  "1979":"(1979) Iranian oil crisis shatter oil supply",
                  "1986":"(1986) OPEC adds to oil supply",
                  "1990":"(1990) Gulf War decreases US supply",
                  "1994":"(1994) NAFTA allows more oil from Mexico",
                  "2002":"(2002) Recession; 9/11 and Afghan War",
                  "2008":"(2008) Financial crisis/ great recession",
                  "2014":"(2014) US Shale oil discovered huge supply incraease"
                };
      var gaswithnotes = gasdata.filter(d => d.Year in notes_dict);
      var gaswithnotes = gaswithnotes.map(function(d) {d["note"] = notes_dict[d.Year]; return d;} )

      // Plot scatter points
      var textG = d3.select(elemname);
        // .append('g')
        // .attr("transform","translate("+margin.left+","+margin.top+")");

      var boundingClientRect = textG.node().getBoundingClientRect();
      var xabs = boundingClientRect.left;
      var yabs = boundingClientRect.top;

      var annotationHeight = 90;
      var annotationWidth = 60;


      d3.select("body")
        .append("g")
        .selectAll('div.annotations')
        .data(gaswithnotes)
        .enter()
        .append('div')
        .classed("annotations", true)
        .style("position", "absolute")
        .style("height", annotationHeight + "px")
        .style("width", annotationWidth + "px")
        // .style("border-left", "solid 1px black")
        .style("overflow", "auto")
        .style("font-size", "10px")
        .style("z-index", -1)
        .style("vertical-align", "middle")
        .style("left", function(d){return ((xabs + margin.left + window.scrollX + xScale(d.Year) - (annotationWidth / 2)) + "px");})
        .style("top", function(d){return ((yabs + margin.top + window.scrollY + yScale(d.AvgAdj2018) - (annotationHeight)) + "px");})
        .html(function(d) {return d["note"]} );

}


var load_truckcarsales = async function(elemname, elemheight, elemwidth, startYear, endYear) {
  // Set the SVG margin and height and width
  // var margin = {top: 60,bottom:60,left:60,right:140};
  var height = elemheight - margin.top - margin.bottom;
  var width = elemwidth - margin.left - margin.right;

  // Universal Year Range
  // var yearRange = [1972 , 2021];
  var yearRange = [startYear - 3, endYear + 3]
  var xScale = d3.scaleLinear().domain(yearRange).range([0,width]);

  // Gas Price Year over Year
  var truckCarSalesRange = [0, 25000];
  var truckcarsalesdata = await d3.csv('./processed_csvs/truckcarsales.csv');
  var yScale = d3.scaleLinear().domain(truckCarSalesRange).range([height,0]);

  // CSV Parser Getters
  var getYear = function(d) { return parseInt(d["DATE"].split("-")[0]); }
  var getTotal = function(d) { return parseInt(d["LTOTALNSA"]); }
  var getTrucks = function(d) { return parseInt(d["LTRUCKNSA"]); }
  var getCars = function(d) { return parseInt(d["LTOTNOTTRUCKNSA"]); }
  var getTrucksPct = function(d) { return parseFloat(d["LTRUCKNSAPCT"]); }
  var getCarsPct = function(d) { return parseFloat(d["LTOTNOTTRUCKNSAPCT"]); }


  // filter function
  var filterFn = function(d) { return getYear(d) >= startYear && getYear(d) <= endYear }
  truckcarsalesdata = truckcarsalesdata.filter(filterFn);

  // add axes
 d3.select(elemname)
   .append("g")
   .attr("transform", "translate(" + margin.left + "," + margin.top + ")")
   .call(d3.axisLeft(yScale)
   .tickFormat(d3.format("")));

 d3.select(elemname)
   .append("g")
   .attr("transform", "translate(" + margin.left + "," + (margin.top + height) + ")")
   .call(d3.axisBottom(xScale)
   .tickFormat(d3.format("")));

   // Pot all scatter points
   // Each line plot color
   var totalColor = "steelblue";
   var truckColor = "orange";
   var carColor = "green";


  // Plot all the lines
  // d3's Line Generator
  var totalLine = d3.line()
    .x(function(d) { return xScale(getYear(d)); })
    .y(function(d) { return yScale(getTotal(d)); } );

  var truckLine = d3.line()
    .x(function(d) { return xScale(getYear(d)); })
    .y(function(d) { return yScale(getTrucks(d)); } );

  var carLine = d3.line()
    .x(function(d) { return xScale(getYear(d)); })
    .y(function(d) { return yScale(getCars(d)); } );

  // Total Line
  d3.select(elemname)
    .append('g')
    .attr("transform","translate("+margin.left+","+margin.top+")")
    .append("path")
    .datum(truckcarsalesdata)
    .attr("fill", "none")
    .attr("stroke", totalColor)
    .attr("stroke-linejoin", "round")
    .attr("stroke-linecap", "round")
    .attr("stroke-width", 2.5)
    .attr("d", totalLine);

  // Total Line
  d3.select(elemname)
    .append('g')
    .attr("transform","translate("+margin.left+","+margin.top+")")
    .append("path")
    .datum(truckcarsalesdata)
    .attr("fill", "none")
    .attr("stroke", truckColor)
    .attr("stroke-linejoin", "round")
    .attr("stroke-linecap", "round")
    .attr("stroke-width", 2.5)
    .attr("d", truckLine);

  // Total Line
  d3.select(elemname)
    .append('g')
    .attr("transform","translate("+margin.left+","+margin.top+")")
    .append("path")
    .datum(truckcarsalesdata)
    .attr("fill", "none")
    .attr("stroke", carColor)
    .attr("stroke-linejoin", "round")
    .attr("stroke-linecap", "round")
    .attr("stroke-width", 2.5)
    .attr("d", carLine);

    // Set up tooltip
    // Define the div for the tooltip
    var tooltipDiv = d3.select("body").append("div")
        .attr("class", "tooltip")
        .style("position", "absolute")
        .style("background", "white")
        .style("opacity", 0)
        .style("pointer-events", "none")
        .style("padding", "2px")
        .style("border-radius", "8px")

    var mouseOverTooltipFn = function(d) {
      tooltipDiv.transition()
          .duration(200)
          .style("opacity", .9);
      tooltipDiv	.html("Year: " + getYear(d) +  "; Total: " + getTotal(d) + "k" +
              "<br/> Cars Sold: "  + getCars(d) + "k (" + getCarsPct(d) + "%)"
              + "<br/> Trucks Sold: " + getTrucks(d) + "k (" + getTrucksPct(d) + "%)")
          .style("left", (d3.event.pageX) + "px")
          .style("top", (d3.event.pageY - 60) + "px");
    }
    var mouseOutTooltipFn = function(d) {
        tooltipDiv.transition()
            .duration(500)
            .style("opacity", 0);
    }

    d3.select(elemname)
      .append('g')
      .attr("transform","translate("+margin.left+","+margin.top+")")
      .selectAll('circle')
      .data(truckcarsalesdata)
      .enter().append('circle')
      .attr('cx', function(d){return xScale(getYear(d))})
      .attr('cy', function(d){return yScale(getTotal(d))})
      .attr('r', function(d,i) {return 5})
      .style("fill", totalColor)
      .on("mouseover", mouseOverTooltipFn)
      .on("mouseout", mouseOutTooltipFn);

    d3.select(elemname)
      .append('g')
      .attr("transform","translate("+margin.left+","+margin.top+")")
      .selectAll('circle')
      .data(truckcarsalesdata)
      .enter().append('circle')
      .attr('cx', function(d){return xScale(getYear(d))})
      .attr('cy', function(d){return yScale(getTrucks(d))})
      .attr('r', function(d,i) {return 5})
      .style("fill", truckColor)
      .on("mouseover", mouseOverTooltipFn)
      .on("mouseout", mouseOutTooltipFn);

    d3.select(elemname)
      .append('g')
      .attr("transform","translate("+margin.left+","+margin.top+")")
      .selectAll('circle')
      .data(truckcarsalesdata)
      .enter().append('circle')
      .attr('cx', function(d){return xScale(getYear(d))})
      .attr('cy', function(d){return yScale(getCars(d))})
      .attr('r', function(d,i) {return 5})
      .style("fill", carColor)
      .on("mouseover", mouseOverTooltipFn)
      .on("mouseout", mouseOutTooltipFn);


  // Title of the Chart
  d3.select(elemname)
    .append('g')
    .attr("transform","translate("+margin.left+","+margin.top+")")
    .append("text")
    .attr("text-anchor", "middle")
    .attr("x", width / 2)
    .attr("y", -margin.top / 2)
    .text("Units of cars and light trucks sold (thousands) (" + startYear + "-" + endYear +")");

  var plotcolors = [
    {color: totalColor, legStr: "Total Sales" },
    {color: truckColor, legStr: "Truck Sales" },
    {color: carColor, legStr: "Car Sales" }
  ];
  var legend = d3.select(elemname)
    .append('g')
    .attr("transform","translate("+(width+margin.top)+","+margin.top+")");

  var legUnitHeight = 25;
  var legRadius = 8;
  legend
        .selectAll("circle")
        .data(plotcolors)
        .enter()
        .append("circle")
        .attr("cx", 0)
        .attr("cy", function(d,i){return i * legUnitHeight})
        .attr('r', legRadius)
        .style("margin", 0)
        .style("fill",function(d) {return d.color;})
  legend
        .selectAll("text")
        .data(plotcolors)
        .enter()
        .append("text")
        .attr("x", 2 * legRadius)
        .attr("y", function(d,i){return i * legUnitHeight + 5})
        .style("fill",function(d) {return d.color;})
        .text(function(d) {return d.legStr});

        // add annotations
        // Edit this to add more annoations
        notes_dict = {
                    "1979":"(1979) All vehicle sales decreasing",
                    "1986":"(1986) Truck sales increasing; car sales decreasing",
                    "1994":"(1994) Truck sales accelerate; car sales decreasing",
                    "2000":"(2000) Truck sales you overtake car sales",
                    "2007":"(2007) All vehicle sales begin plummet",
                    "2009":"(2009) All vehicle sales begin recovery",
                    "2013":"(2014) Trucks skyrocket; Cars plummet"
                  };
        var gaswithnotes = truckcarsalesdata.filter(d => getYear(d) in notes_dict);
        var gaswithnotes = gaswithnotes.map(function(d) {d["note"] = notes_dict[getYear(d)]; return d;} )

        // Plot scatter points
        var textG = d3.select(elemname);
        var boundingClientRect = textG.node().getBoundingClientRect();
        var xabs = boundingClientRect.left;
        var yabs = boundingClientRect.top;

        var annotationHeight = 90;
        var annotationWidth = 60;


        d3.select("body")
          .append("g")
          .selectAll('div.annotations')
          .data(gaswithnotes)
          .enter()
          .append('div')
          .classed("annotations", true)
          .style("position", "absolute")
          .style("height", annotationHeight + "px")
          .style("width", annotationWidth + "px")
          // .style("border-left", "solid 1px black")
          .style("overflow", "auto")
          .style("font-size", "10px")
          .style("z-index", -1)
          .style("vertical-align", "")
          .style("left", function(d){return ((xabs + margin.left + window.scrollX + xScale(getYear(d)) - (annotationWidth / 2)) + "px");})
          .style("top", function(d){return ((yabs + margin.top + window.scrollY + yScale(getTotal(d)) - (annotationHeight)) + "px");})
          .html(function(d) {return d["note"]} );
}

var load_truckcarprod = async function(elemname, elemheight, elemwidth, startYear, endYear) {
  // Set the SVG margin and height and width
  // var margin = {top: 60,bottom:60,left:60,right:140};
  var height = elemheight - margin.top - margin.bottom;
  var width = elemwidth - margin.left - margin.right;

  // Universal Year Range
  // var yearRange = [1972 , 2021];
  var yearRange = [startYear - 3, endYear + 3]
  var xScale = d3.scaleLinear().domain(yearRange).range([0,width]);

  // Gas Price Year over Year
  var truckCarSalesRange = [0, 25000];
  var truckcarsalesdata = await d3.csv('./processed_csvs/vehicleproddata.csv');
  var yScale = d3.scaleLinear().domain(truckCarSalesRange).range([height,0]);

  // CSV Parser Getters
  var getYear = function(d) { return parseInt(d["Year"].split("-")[0]); }
  var getTotal = function(d) { return parseInt(d["NumProduced"]); }
  var getTrucks = function(d) { return parseInt(d["NumTrucksProduced"]); }
  var getCars = function(d) { return parseInt(d["NumCarsProduced"]); }
  var getTrucksPct = function(d) { return parseFloat(d["TrucksProducedPct"]); }
  var getCarsPct = function(d) { return parseFloat(d["CarsProducedPct"]); }


  // filter function
  var filterFn = function(d) { return getYear(d) >= startYear && getYear(d) <= endYear }
  truckcarsalesdata = truckcarsalesdata.filter(filterFn);

  // add axes
 d3.select(elemname)
   .append("g")
   .attr("transform", "translate(" + margin.left + "," + margin.top + ")")
   .call(d3.axisLeft(yScale)
   .tickFormat(d3.format("")));

 d3.select(elemname)
   .append("g")
   .attr("transform", "translate(" + margin.left + "," + (margin.top + height) + ")")
   .call(d3.axisBottom(xScale)
   .tickFormat(d3.format("")));

   // Pot all scatter points
   // Each line plot color
   var totalColor = "steelblue";
   var truckColor = "orange";
   var carColor = "green";


  // Plot all the lines
  // d3's Line Generator
  var totalLine = d3.line()
    .x(function(d) { return xScale(getYear(d)); })
    .y(function(d) { return yScale(getTotal(d)); } );

  var truckLine = d3.line()
    .x(function(d) { return xScale(getYear(d)); })
    .y(function(d) { return yScale(getTrucks(d)); } );

  var carLine = d3.line()
    .x(function(d) { return xScale(getYear(d)); })
    .y(function(d) { return yScale(getCars(d)); } );

  // Total Line
  d3.select(elemname)
    .append('g')
    .attr("transform","translate("+margin.left+","+margin.top+")")
    .append("path")
    .datum(truckcarsalesdata)
    .attr("fill", "none")
    .attr("stroke", totalColor)
    .attr("stroke-linejoin", "round")
    .attr("stroke-linecap", "round")
    .attr("stroke-width", 2.5)
    .attr("d", totalLine);

  // Total Line
  d3.select(elemname)
    .append('g')
    .attr("transform","translate("+margin.left+","+margin.top+")")
    .append("path")
    .datum(truckcarsalesdata)
    .attr("fill", "none")
    .attr("stroke", truckColor)
    .attr("stroke-linejoin", "round")
    .attr("stroke-linecap", "round")
    .attr("stroke-width", 2.5)
    .attr("d", truckLine);

  // Total Line
  d3.select(elemname)
    .append('g')
    .attr("transform","translate("+margin.left+","+margin.top+")")
    .append("path")
    .datum(truckcarsalesdata)
    .attr("fill", "none")
    .attr("stroke", carColor)
    .attr("stroke-linejoin", "round")
    .attr("stroke-linecap", "round")
    .attr("stroke-width", 2.5)
    .attr("d", carLine);

    // Set up tooltip
    // Define the div for the tooltip
    var tooltipDiv = d3.select("body").append("div")
        .attr("class", "tooltip")
        .style("position", "absolute")
        .style("background", "white")
        .style("opacity", 0)
        .style("pointer-events", "none")
        .style("padding", "2px")
        .style("border-radius", "8px")

    var mouseOverTooltipFn = function(d) {
      tooltipDiv.transition()
          .duration(200)
          .style("opacity", .9);
      tooltipDiv	.html("Year: " + getYear(d) +  "; Total: " + getTotal(d) + "k" +
              "<br/> Cars Sold: "  + getCars(d) + "k (" + getCarsPct(d) + "%)"
              + "<br/> Trucks Sold: " + getTrucks(d) + "k (" + getTrucksPct(d) + "%)")
          .style("left", (d3.event.pageX) + "px")
          .style("top", (d3.event.pageY - 60) + "px");
    }
    var mouseOutTooltipFn = function(d) {
        tooltipDiv.transition()
            .duration(500)
            .style("opacity", 0);
    }

    d3.select(elemname)
      .append('g')
      .attr("transform","translate("+margin.left+","+margin.top+")")
      .selectAll('circle')
      .data(truckcarsalesdata)
      .enter().append('circle')
      .attr('cx', function(d){return xScale(getYear(d))})
      .attr('cy', function(d){return yScale(getTotal(d))})
      .attr('r', function(d,i) {return 5})
      .style("fill", totalColor)
      .on("mouseover", mouseOverTooltipFn)
      .on("mouseout", mouseOutTooltipFn);

    d3.select(elemname)
      .append('g')
      .attr("transform","translate("+margin.left+","+margin.top+")")
      .selectAll('circle')
      .data(truckcarsalesdata)
      .enter().append('circle')
      .attr('cx', function(d){return xScale(getYear(d))})
      .attr('cy', function(d){return yScale(getTrucks(d))})
      .attr('r', function(d,i) {return 5})
      .style("fill", truckColor)
      .on("mouseover", mouseOverTooltipFn)
      .on("mouseout", mouseOutTooltipFn);

    d3.select(elemname)
      .append('g')
      .attr("transform","translate("+margin.left+","+margin.top+")")
      .selectAll('circle')
      .data(truckcarsalesdata)
      .enter().append('circle')
      .attr('cx', function(d){return xScale(getYear(d))})
      .attr('cy', function(d){return yScale(getCars(d))})
      .attr('r', function(d,i) {return 5})
      .style("fill", carColor)
      .on("mouseover", mouseOverTooltipFn)
      .on("mouseout", mouseOutTooltipFn);


  // Title of the Chart
  d3.select(elemname)
    .append('g')
    .attr("transform","translate("+margin.left+","+margin.top+")")
    .append("text")
    .attr("text-anchor", "middle")
    .attr("x", width / 2)
    .attr("y", -margin.top / 2)
    .text("Units of cars and light trucks produced (thousands) (" + startYear + "-" + endYear +")");

  var plotcolors = [
    {color: totalColor, legStr: "Total Produced" },
    {color: truckColor, legStr: "Trucks Produced" },
    {color: carColor, legStr: "Cars Produced" }
  ];
  var legend = d3.select(elemname)
    .append('g')
    .attr("transform","translate("+(width+margin.top)+","+margin.top+")");

  var legUnitHeight = 25;
  var legRadius = 8;
  legend
        .selectAll("circle")
        .data(plotcolors)
        .enter()
        .append("circle")
        .attr("cx", 0)
        .attr("cy", function(d,i){return i * legUnitHeight})
        .attr('r', legRadius)
        .style("margin", 0)
        .style("fill",function(d) {return d.color;})
  legend
        .selectAll("text")
        .data(plotcolors)
        .enter()
        .append("text")
        .attr("x", 2 * legRadius)
        .attr("y", function(d,i){return i * legUnitHeight + 5})
        .style("fill",function(d) {return d.color;})
        .text(function(d) {return d.legStr});

        // add annotations
        // Edit this to add more annoations
        notes_dict = {
                    "1979":"(1979) All vehicle sales decreasing",
                    "1986":"(1986) Truck sales increasing; car sales decreasing",
                    "1994":"(1994) Truck sales accelerate; car sales decreasing",
                    "2000":"(2000) Truck sales you overtake car sales",
                    "2007":"(2007) All vehicle sales begin plummet",
                    "2009":"(2009) All vehicle sales begin recovery",
                    "2013":"(2014) Trucks skyrocket; Cars plummet"
                  };
        var gaswithnotes = truckcarsalesdata.filter(d => getYear(d) in notes_dict);
        var gaswithnotes = gaswithnotes.map(function(d) {d["note"] = notes_dict[getYear(d)]; return d;} )

        // Plot scatter points
        var textG = d3.select(elemname);
        var boundingClientRect = textG.node().getBoundingClientRect();
        var xabs = boundingClientRect.left;
        var yabs = boundingClientRect.top;

        var annotationHeight = 90;
        var annotationWidth = 60;


        d3.select("body")
          .append("g")
          .selectAll('div.annotations')
          .data(gaswithnotes)
          .enter()
          .append('div')
          .classed("annotations", true)
          .style("position", "absolute")
          .style("height", annotationHeight + "px")
          .style("width", annotationWidth + "px")
          // .style("border-left", "solid 1px black")
          .style("overflow", "auto")
          .style("font-size", "10px")
          .style("z-index", -1)
          .style("vertical-align", "")
          .style("left", function(d){return ((xabs + margin.left + window.scrollX + xScale(getYear(d)) - (annotationWidth / 2)) + "px");})
          .style("top", function(d){return ((yabs + margin.top + window.scrollY + yScale(getTotal(d)) - (annotationHeight)) + "px");})
          .html(function(d) {return d["note"]} );
}

var load_mpg = async function(elemname, elemheight, elemwidth, startYear, endYear) {
  // Set the SVG margin and height and width
  // var margin = {top: 60,bottom:60,left:60,right:140};
  var height = elemheight - margin.top - margin.bottom;
  var width = elemwidth - margin.left - margin.right;

  // Universal Year Range
  // var yearRange = [1972 , 2021];
  var yearRange = [startYear - 3, endYear + 3]
  var xScale = d3.scaleLinear().domain(yearRange).range([0,width]);

  // Gas Price Year over Year
  var truckCarSalesRange = [10, 35];
  var truckcarsalesdata = await d3.csv('./processed_csvs/vehicleproddata.csv');
  var yScale = d3.scaleLinear().domain(truckCarSalesRange).range([height,0]);

  // CSV Parser Getters
  var getYear = function(d) { return parseInt(d["Year"].split("-")[0]); }
  var getMPG = function(d) { return parseFloat(d["FuelEconomyMPG"]); }


  // filter function
  var filterFn = function(d) { return getYear(d) >= startYear && getYear(d) <= endYear }
  truckcarsalesdata = truckcarsalesdata.filter(filterFn);

  // add axes
 d3.select(elemname)
   .append("g")
   .attr("transform", "translate(" + margin.left + "," + margin.top + ")")
   .call(d3.axisLeft(yScale)
   .tickFormat(d3.format("")));

 d3.select(elemname)
   .append("g")
   .attr("transform", "translate(" + margin.left + "," + (margin.top + height) + ")")
   .call(d3.axisBottom(xScale)
   .tickFormat(d3.format("")));

   // Pot all scatter points
   // Each line plot color
   var mpgColor = "steelblue";

  // Plot all the lines
  // d3's Line Generator
  var mpgLine = d3.line()
    .x(function(d) { return xScale(getYear(d)); })
    .y(function(d) { return yScale(getMPG(d)); } );

  // MPG Line
  d3.select(elemname)
    .append('g')
    .attr("transform","translate("+margin.left+","+margin.top+")")
    .append("path")
    .datum(truckcarsalesdata)
    .attr("fill", "none")
    .attr("stroke", mpgColor)
    .attr("stroke-linejoin", "round")
    .attr("stroke-linecap", "round")
    .attr("stroke-width", 2.5)
    .attr("d", mpgLine);

    // Set up tooltip
    // Define the div for the tooltip
    var tooltipDiv = d3.select("body").append("div")
        .attr("class", "tooltip")
        .style("position", "absolute")
        .style("background", "white")
        .style("opacity", 0)
        .style("pointer-events", "none")
        .style("padding", "2px")
        .style("border-radius", "8px")

    var mouseOverTooltipFn = function(d) {
      tooltipDiv
          .transition()
          .duration(200)
          .style("opacity", .9);
      tooltipDiv
          .html("Year: " + getYear(d) +  "; MPG: " + getMPG(d))
          .style("left", (d3.event.pageX) + "px")
          .style("top", (d3.event.pageY - 60) + "px");
    }
    var mouseOutTooltipFn = function(d) {
        tooltipDiv.transition()
            .duration(500)
            .style("opacity", 0);
    }

    d3.select(elemname)
      .append('g')
      .attr("transform","translate("+margin.left+","+margin.top+")")
      .selectAll('circle')
      .data(truckcarsalesdata)
      .enter().append('circle')
      .attr('cx', function(d){return xScale(getYear(d))})
      .attr('cy', function(d){return yScale(getMPG(d))})
      .attr('r', function(d,i) {return 5})
      .style("fill", mpgColor)
      .on("mouseover", mouseOverTooltipFn)
      .on("mouseout", mouseOutTooltipFn);


  // Title of the Chart
  d3.select(elemname)
    .append('g')
    .attr("transform","translate("+margin.left+","+margin.top+")")
    .append("text")
    .attr("text-anchor", "middle")
    .attr("x", width / 2)
    .attr("y", -margin.top / 2)
    .text("MPG of all vehicles produced for each year (thousands) (" + startYear + "-" + endYear +")");

  var plotcolors = [
    {color: mpgColor, legStr: "Fuel Economy (MPG)" }
  ];
  var legend = d3.select(elemname)
    .append('g')
    .attr("transform","translate("+(width+margin.top)+","+margin.top+")");

  var legUnitHeight = 25;
  var legRadius = 8;
  legend
        .selectAll("circle")
        .data(plotcolors)
        .enter()
        .append("circle")
        .attr("cx", 0)
        .attr("cy", function(d,i){return i * legUnitHeight})
        .attr('r', legRadius)
        .style("margin", 0)
        .style("fill",function(d) {return d.color;})
  legend
        .selectAll("text")
        .data(plotcolors)
        .enter()
        .append("text")
        .attr("x", 2 * legRadius)
        .attr("y", function(d,i){return i * legUnitHeight + 5})
        .style("fill",function(d) {return d.color;})
        .text(function(d) {return d.legStr});

    // add annotations
    // Edit this to add more annoations
    notes_dict = {
                "1979":"(1979) All vehicle sales decreasing",
                "1986":"(1986) Truck sales increasing; car sales decreasing",
                "1994":"(1994) Truck sales accelerate; car sales decreasing",
                "2000":"(2000) Truck sales you overtake car sales",
                "2007":"(2007) All vehicle sales begin plummet",
                "2009":"(2009) All vehicle sales begin recovery",
                "2013":"(2014) Trucks skyrocket; Cars plummet"
              };
    var gaswithnotes = truckcarsalesdata.filter(d => getYear(d) in notes_dict);
    var gaswithnotes = gaswithnotes.map(function(d) {d["note"] = notes_dict[getYear(d)]; return d;} )

    // Plot scatter points
    var textG = d3.select(elemname);
    var boundingClientRect = textG.node().getBoundingClientRect();
    var xabs = boundingClientRect.left;
    var yabs = boundingClientRect.top;

    var annotationHeight = 90;
    var annotationWidth = 60;


    d3.select("body")
      .append("g")
      .selectAll('div.annotations')
      .data(gaswithnotes)
      .enter()
      .append('div')
      .classed("annotations", true)
      .style("position", "absolute")
      .style("height", annotationHeight + "px")
      .style("width", annotationWidth + "px")
      // .style("border-left", "solid 1px black")
      .style("overflow", "auto")
      .style("font-size", "10px")
      .style("z-index", -1)
      .style("vertical-align", "")
      .style("left", function(d){return ((xabs + margin.left + window.scrollX + xScale(getYear(d)) - (annotationWidth / 2)) + "px");})
      .style("top", function(d){return ((yabs + margin.top + window.scrollY + yScale(getMPG(d)) - (annotationHeight)) + "px");})
      .html(function(d) {return d["note"]} );
}

var load_co2 = async function(elemname, elemheight, elemwidth, startYear, endYear) {
  // Set the SVG margin and height and width
  // var margin = {top: 60,bottom:60,left:60,right:140};
  var height = elemheight - margin.top - margin.bottom;
  var width = elemwidth - margin.left - margin.right;

  // Universal Year Range
  // var yearRange = [1972 , 2021];
  var yearRange = [startYear - 3, endYear + 3]
  var xScale = d3.scaleLinear().domain(yearRange).range([0,width]);

  // Gas Price Year over Year
  var truckCarSalesRange = [200, 800];
  var truckcarsalesdata = await d3.csv('./processed_csvs/vehicleproddata.csv');
  var yScale = d3.scaleLinear().domain(truckCarSalesRange).range([height,0]);

  // CSV Parser Getters
  var getYear = function(d) { return parseInt(d["Year"].split("-")[0]); }
  var getCO2 = function(d) { return parseFloat(d["CO2GramPerMile"]); }


  // filter function
  var filterFn = function(d) { return getYear(d) >= startYear && getYear(d) <= endYear }
  truckcarsalesdata = truckcarsalesdata.filter(filterFn);

  // add axes
 d3.select(elemname)
   .append("g")
   .attr("transform", "translate(" + margin.left + "," + margin.top + ")")
   .call(d3.axisLeft(yScale)
   .tickFormat(d3.format("")));

 d3.select(elemname)
   .append("g")
   .attr("transform", "translate(" + margin.left + "," + (margin.top + height) + ")")
   .call(d3.axisBottom(xScale)
   .tickFormat(d3.format("")));

   // Pot all scatter points
   // Each line plot color
   var co2Color = "steelblue";

  // Plot all the lines
  // d3's Line Generator
  var co2Line = d3.line()
    .x(function(d) { return xScale(getYear(d)); })
    .y(function(d) { return yScale(getCO2(d)); } );

  // MPG Line
  d3.select(elemname)
    .append('g')
    .attr("transform","translate("+margin.left+","+margin.top+")")
    .append("path")
    .datum(truckcarsalesdata)
    .attr("fill", "none")
    .attr("stroke", co2Color)
    .attr("stroke-linejoin", "round")
    .attr("stroke-linecap", "round")
    .attr("stroke-width", 2.5)
    .attr("d", co2Line);

    // Set up tooltip
    // Define the div for the tooltip
    var tooltipDiv = d3.select("body").append("div")
        .attr("class", "tooltip")
        .style("position", "absolute")
        .style("background", "white")
        .style("opacity", 0)
        .style("pointer-events", "none")
        .style("padding", "2px")
        .style("border-radius", "8px")

    var mouseOverTooltipFn = function(d) {
      tooltipDiv
          .transition()
          .duration(200)
          .style("opacity", .9);
      tooltipDiv
          .html("Year: " + getYear(d) +  "; MPG: " + getCO2(d))
          .style("left", (d3.event.pageX) + "px")
          .style("top", (d3.event.pageY - 60) + "px");
    }
    var mouseOutTooltipFn = function(d) {
        tooltipDiv.transition()
            .duration(500)
            .style("opacity", 0);
    }

    d3.select(elemname)
      .append('g')
      .attr("transform","translate("+margin.left+","+margin.top+")")
      .selectAll('circle')
      .data(truckcarsalesdata)
      .enter().append('circle')
      .attr('cx', function(d){return xScale(getYear(d))})
      .attr('cy', function(d){return yScale(getCO2(d))})
      .attr('r', function(d,i) {return 5})
      .style("fill", co2Color)
      .on("mouseover", mouseOverTooltipFn)
      .on("mouseout", mouseOutTooltipFn);


  // Title of the Chart
  d3.select(elemname)
    .append('g')
    .attr("transform","translate("+margin.left+","+margin.top+")")
    .append("text")
    .attr("text-anchor", "middle")
    .attr("x", width / 2)
    .attr("y", -margin.top / 2)
    .text("Grams CO2 emitted / mile per vehicle produced for each year (thousands) (" + startYear + "-" + endYear +")");

  var plotcolors = [
    {color: co2Color, legStr: "CO2 (g/mi)" }
  ];
  var legend = d3.select(elemname)
    .append('g')
    .attr("transform","translate("+(width+margin.top)+","+margin.top+")");

  var legUnitHeight = 25;
  var legRadius = 8;
  legend
        .selectAll("circle")
        .data(plotcolors)
        .enter()
        .append("circle")
        .attr("cx", 0)
        .attr("cy", function(d,i){return i * legUnitHeight})
        .attr('r', legRadius)
        .style("margin", 0)
        .style("fill",function(d) {return d.color;})
  legend
        .selectAll("text")
        .data(plotcolors)
        .enter()
        .append("text")
        .attr("x", 2 * legRadius)
        .attr("y", function(d,i){return i * legUnitHeight + 5})
        .style("fill",function(d) {return d.color;})
        .text(function(d) {return d.legStr});

    // add annotations
    // Edit this to add more annoations
    notes_dict = {
                "1979":"(1979) All vehicle sales decreasing",
                "1986":"(1986) Truck sales increasing; car sales decreasing",
                "1994":"(1994) Truck sales accelerate; car sales decreasing",
                "2000":"(2000) Truck sales you overtake car sales",
                "2007":"(2007) All vehicle sales begin plummet",
                "2009":"(2009) All vehicle sales begin recovery",
                "2013":"(2014) Trucks skyrocket; Cars plummet"
              };
    var gaswithnotes = truckcarsalesdata.filter(d => getYear(d) in notes_dict);
    var gaswithnotes = gaswithnotes.map(function(d) {d["note"] = notes_dict[getYear(d)]; return d;} )

    // Plot scatter points
    var textG = d3.select(elemname);
    var boundingClientRect = textG.node().getBoundingClientRect();
    var xabs = boundingClientRect.left;
    var yabs = boundingClientRect.top;

    var annotationHeight = 90;
    var annotationWidth = 60;


    d3.select("body")
      .append("g")
      .selectAll('div.annotations')
      .data(gaswithnotes)
      .enter()
      .append('div')
      .classed("annotations", true)
      .style("position", "absolute")
      .style("height", annotationHeight + "px")
      .style("width", annotationWidth + "px")
      // .style("border-left", "solid 1px black")
      .style("overflow", "auto")
      .style("font-size", "10px")
      .style("z-index", -1)
      .style("vertical-align", "")
      .style("left", function(d){return ((xabs + margin.left + window.scrollX + xScale(getYear(d)) - (annotationWidth / 2)) + "px");})
      .style("top", function(d){return ((yabs + margin.top + window.scrollY + yScale(getCO2(d)) - (annotationHeight)) + "px");})
      .html(function(d) {return d["note"]} );
}
