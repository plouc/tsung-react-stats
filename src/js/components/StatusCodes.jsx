var React      = require('react');
var Reflux     = require('reflux');
var _          = require('lodash');
var d3         = require('d3/d3');
var StatsStore = require('./../stores/StatsStore');


var StatusCodes = React.createClass({
    mixins: [
        Reflux.ListenerMixin
    ],

    getInitialState() {
        return {
            codes: null
        };
    },

    componentWillMount() {
        this.listenTo(StatsStore, this._onStatsUpdate);
    },

    componentDidMount() {
        var wrapper = d3.select(this.getDOMNode());

        this.svg            = wrapper.select('svg');
        this.xAxisContainer = this.svg.append('g');
        this.yAxisContainer = this.svg.append('g');
        this.linesContainer = this.svg.append('g');
    },

    _onStatsUpdate(data) {
        this.setState({
            codes: data.codes
        });
    },

    drawGraph() {
        var width  = 700;
        var height = 500;

        this.svg.attr({
            width:  width,
            height: height
        });

        var margin = {
            top:    20,
            right:  10,
            bottom: 50,
            left:   50
        };

        var utilWidth  = width  - margin.left - margin.right;
        var utilHeight = height - margin.top  - margin.bottom;

        var x = d3.scale.linear()
            .range([0, utilWidth]);

        var y = d3.scale.linear()
            .range([utilHeight, 0]);

        var yAxis = d3.svg.axis()
            .scale(y)
            .orient('left');

        var xAxis = d3.svg.axis()
            .scale(x)
            .orient('bottom');

        var maxValue = 0;
        var minTs    = null;
        var maxTs    = 0;

        _.forOwn(this.state.codes, (metrics, code) => {
            _.forEach(metrics, metric => {
                maxValue = Math.max(metric.value, maxValue);
                if (minTs === null) {
                    minTs = metric.ts;
                }
                minTs = Math.min(metric.ts, minTs);
                maxTs = Math.max(metric.ts, maxTs);
            });
        });

        y.domain([0, maxValue]);
        x.domain([0, maxTs - minTs]);

        var lineFn = d3.svg.line()
            .x(d => x(d.ts - minTs))
            .y(d => y(d.value))
            .interpolate('linear');

        this.xAxisContainer
            .attr('transform', 'translate(' + margin.left + ',' + (margin.top + utilHeight) + ')')
            .call(xAxis)
            .selectAll('text')
            .attr('y', 12)
            .style('text-anchor', 'middle');

        this.yAxisContainer
            .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')')
            .call(yAxis);

        this.linesContainer
            .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')');

        _.forOwn(this.state.codes, (metrics, code) => {
            this.linesContainer.append('path')
                .attr('d', lineFn(metrics))
                .attr("stroke", "blue")
                .attr("stroke-width", 2)
                .attr("fill", "none");
        });
    },

    componentDidUpdate() {
        this.drawGraph();
    },

    render() {
        return (
            <div className="widget">
                <div className="widget__header">
                    Status codes
                </div>
                <svg/>
            </div>
        );
    }
});

module.exports = StatusCodes;