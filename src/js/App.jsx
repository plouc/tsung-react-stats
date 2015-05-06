var React        = require('react');
var TableStats   = require('./components/TableStats.jsx');
var StatsActions = require('./actions/StatsActions');
var StatusCodes  = require('./components/StatusCodes.jsx');

var App = React.createClass({
    componentWillMount() {
        StatsActions.fetch();
    },

    render() {
        //<TableStats/>


        return (
            <div>
                <StatusCodes/>
            </div>
        );
    }
});

React.render(<App/>, document.getElementById('app'));