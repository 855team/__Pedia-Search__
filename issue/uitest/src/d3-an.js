import React,{Component} from 'react';
import * as d3 from "d3";

class TestCharts extends Component {
    state = {

    };

    componentDidMount() {
        this.drawChart();
    }

    drawChart = ()=> {
        const data = [12, 5, 6, 6, 9, 10];
        const w = 300;
        const h = 200;

        const svg = d3.select(".D3")
            .append("svg")
            .attr("width", w)
            .attr("height", h)
            .style("margin-left", 100);

        svg.selectAll("rect")
            .data(data)
            .enter()
            .append("rect")
            .attr("x", (d, i) => i * 70)
            .attr("y", (d, i) => h - 10 * d)
            .attr("width", 65)
            .attr("height", (d, i) => d * 10)
            .attr("fill", "green")

    };

    render() {
        return (
            <div>
                <div className="D3" />
            </div>
        );
    }
}

export default TestCharts;