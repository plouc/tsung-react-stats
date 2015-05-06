var React         = require('react');
var _             = require('lodash');
var Reflux        = require('reflux');
var StatsStore    = require('./../stores/StatsStore');
var TableStatsRow = require('./TableStatsRow.jsx');

var TableStats = React.createClass({
    mixins: [
        Reflux.ListenerMixin
    ],

    getInitialState() {
        return {
            stats: []
        };
    },

    componentWillMount() {
        this.listenTo(StatsStore, this._onStatsUpdate);
    },

    render() {
        var rows = this.state.stats.map(stat => <TableStatsRow key={stat.timestamp} stat={stat} />);

        return (
            <table className="table">
                <thead>
                    <tr>
                        <th>ts</th>
                        <th>requests</th>
                        <th>200</th>
                        <th>404</th>
                        <th>users</th>
                        <th>connected</th>
                    </tr>
                </thead>
                <tbody>
                    {rows}
                </tbody>
            </table>
        );
    },

    _onStatsUpdate(data) {
        this.setState({
            stats: data.stats
        });
    }
});

module.exports = TableStats;