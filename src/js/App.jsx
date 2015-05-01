var React        = require('react');
var TableStats   = require('./components/TableStats.jsx');
var StatsActions = require('./actions/StatsActions');

React.render(<TableStats />, document.getElementById('app'));

StatsActions.fetch();