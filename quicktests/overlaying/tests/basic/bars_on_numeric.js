
function makeData() {
  "use strict";

  var  data1 = [{x: 0, y: 2, type: "q1"}, {x: -1, y: 1, type: "q1"}, {x: -2, y: 1, type: "q1"}];
  var  data2 = [{x: 0, y: 0, type: "q2"}, {x: -1, y: 5, type: "q2"}, {x: -2, y: 2, type: "q2"}];
  var  data3 = [{x: 0, y: 4, type: "q3"}, {x: -1, y: 0, type: "q3"}, {x: -2, y: 5, type: "q3"}];

  return [data1, data2, data3];
}

function run(svg, data, Plottable) {
  "use strict";

  var xScale = new Plottable.Scales.Linear();
  var yScale = new Plottable.Scales.Linear();
  var colorScale = new Plottable.Scales.Color();

  var xAxis1 = new Plottable.Axes.Numeric(xScale, "bottom");
  var yAxis1 = new Plottable.Axes.Numeric(yScale, "right");
  var xAxis2 = new Plottable.Axes.Numeric(xScale, "bottom");
  var yAxis2 = new Plottable.Axes.Numeric(yScale, "right");
  var xAxis3 = new Plottable.Axes.Numeric(xScale, "bottom");
  var yAxis3 = new Plottable.Axes.Numeric(yScale, "right");

  var dataset1 = new Plottable.Dataset(data[0]);
  var dataset2 = new Plottable.Dataset(data[1]);
  var dataset3 = new Plottable.Dataset(data[2]);

  var stackedBarRenderer = new Plottable.Plots.StackedBar(xScale, yScale)
    .animate(true)
    .project("x", "x", xScale)
    .project("y", "y", yScale)
    .project("fill", "type", colorScale)
    .addDataset(dataset1)
    .addDataset(dataset2)
    .addDataset(dataset3);

  var clusteredBarRenderer = new Plottable.Plots.ClusteredBar(xScale, yScale, true)
    .animate(true)
    .project("fill", "type", colorScale)
    .addDataset(dataset1)
    .addDataset(dataset2)
    .addDataset(dataset3)
    .project("x", "x", xScale)
    .project("y", "y", yScale);

  var verticalBarRenderer = new Plottable.Plots.Bar(xScale, yScale)
    .animate(true)
    .addDataset(dataset1)
    .project("fill", "type", colorScale)
    .project("x", "x", xScale)
    .project("y", "y", yScale);

  var plot1 = new Plottable.Components.Table([
                  [stackedBarRenderer, yAxis1],
                  [xAxis1,  null]]);
  var plot2 = new Plottable.Components.Table([
                  [clusteredBarRenderer, yAxis2],
                  [xAxis2,  null]]);
  var plot3 = new Plottable.Components.Table([
                  [verticalBarRenderer, yAxis3],
                  [xAxis3,  null]]);

  var chart = new Plottable.Components.Table([
                  [plot1],
                  [plot2],
                  [plot3]]);

  chart.renderTo(svg);

}
