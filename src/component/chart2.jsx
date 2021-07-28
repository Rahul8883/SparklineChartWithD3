import React from "react";
import * as d3 from "d3";
import flatMap from "array.prototype.flatmap";
import "../../src/App.css"
import data from "./data";
flatMap.shim();
export default function Chart2() {
  const d3ref = React.useRef(null);
  const dataRef = React.useRef(flatMap(data, (e) => e));
  console.log(dataRef);
  React.useEffect(() => {
    function init() {
      const width = 400;
      const height = 100;
      const margin = 10;

      const xScale = d3
        .scaleTime()
        .domain(d3.extent(dataRef.current, (d) => new Date(d.date)))
        .range([0, width]);

      const yScale = d3
        .scaleLinear()
        .domain([
          0,
          d3.max(data, (d) => d3.max(d.map((el) => el.contributionCount)))
        ])
        .range([height, 0]);

      const line = d3
        .line()
        .x((d) => xScale(d.x))
        .y((d) => yScale(d.y));
        //-----------For curve graph------------------
    //   .curve(d3.curveMonotoneX);

      const dataset = dataRef.current.map((d) => ({
        x: new Date(d.date),
        y: d.contributionCount
      }));

      const svg = d3
        .select(d3ref.current)
        .append("svg")
        .attr("width", width + margin * 2)
        .attr("height", height + margin * 2)
        .append("g")
        .attr("transform", `translate(${margin}, ${margin})`);

    //   svg
    //     .append("g")
    //     .attr("class", "x axis")
    //     .attr("transform", `translate(0, ${height})`)
    //     .call(d3.axisBottom(xScale).tickFormat(d3.timeFormat(xFormat)));

    //   svg
    //     .append("g")
    //     .attr("class", "y axis")
    //     .call(d3.axisLeft(yScale));

      svg.append("path").datum(dataset).attr("class", "line").attr("d", line);
    }
    init();
  }, []);
  return (
    <div>
      <div ref={d3ref} />
    </div>
  );
}
