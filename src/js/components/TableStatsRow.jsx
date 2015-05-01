var React = require('react');

var TableStatsRow = React.createClass({
    render() {
        console.log(this.props.stat);

        var data = this.props.stat.data;

        return (
            <tr>
                <td>{ this.props.stat.timestamp }</td>
                <td>{ data.request.value }</td>
                <td>{ data.http_200 ? data.http_200.total : 'N/A' }</td>
                <td>{ data.http_404 ? data.http_404.total : 'N/A' }</td>
                <td>{ data.users_count.total }</td>
                <td>{ data.connected ? data.connected.value : 'N/A' }</td>
            </tr>
        );
    }
});

module.exports = TableStatsRow;