import { ChartFactory } from "./chart-factory.js";
import { showmap } from "./map.js";
import { showmapfull } from "./map_fulldata.js";
import { commodityDataHandler, coronaDataHandler } from "./data-handlers.js";

d3.json("data/data_1y.json").then(function (data) {
  drawCommodityCharts(data, 3);
  // window.addEventListener("resize", redrawDashboard(data));
});

d3.csv("data/global_cases.csv", d3.autoType).then(function (data) {
  drawCoronaChart(data, 8);
  // window.addEventListener("resize", redrawDashboard(data));
});

/* d3.csv("data/fullcovidcsv.csv").then(function (collection) {
  showmap(collection);
}); */
d3.csv("data/fulldata.csv").then(function (collection) {
  showmapfull(collection);
});

function drawCommodityCharts(data, sliderWith) {
  for (let i = 0; i < data.length; i++) {
    const commodityChartWidth = document.getElementById("commodity-charts")
      .offsetWidth;
    const commodityChartHeight =
      document.getElementById("commodity-charts").offsetHeight / 4;
    const commodityChart = ChartFactory()
      .width(commodityChartWidth)
      .height(commodityChartHeight)
      .sliderWidth(sliderWith)
      .dataHandler(commodityDataHandler)
      .title(Object.keys(data[i])[0]);
    d3.select("#commodity-charts").datum(data[i]).call(commodityChart);
  }
}

function drawCoronaChart(data, sliderWith) {
  const coronaChartWidth = document.getElementById("corona-chart").offsetWidth;
  const coronaChartHeight = document.getElementById("corona-chart")
    .offsetHeight;
  const coronaChart = ChartFactory()
    .width(coronaChartWidth)
    .height(coronaChartHeight)
    .sliderWidth(sliderWith)
    .dataHandler(coronaDataHandler);
  d3.select("#corona-chart").datum(data).call(coronaChart);
}

function redrawDashboard(data) {
  return function redraw() {
    const coronaChartSliderWidth = d3
      .select("#corona-chart * .slider")
      .attr("stroke-width");
    d3.select("#corona-chart").select("svg").remove();
    drawCoronaChart(data, coronaChartSliderWidth);

    const commodityChartSliderWidth = d3
      .select("#commodity-charts * .slider")
      .attr("stroke-width");
    d3.select("#commodity-charts").selectAll("svg").remove();
    drawCommodityCharts(data, commodityChartSliderWidth);
  };
}
