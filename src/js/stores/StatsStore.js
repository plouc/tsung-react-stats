var Reflux       = require('reflux');
var request      = require('superagent');
var StatsActions = require('./../actions/StatsActions');

var StatsStore = Reflux.createStore({
    init() {
        this.listenTo(StatsActions.fetch, this.fetch);
    },

    fetch() {
        request
            .get('tsung_2.json')
            .end((err, res) => {
                if (err) {
                    console.log('ERROR', err);
                }
                this.trigger(res.body.stats);
            })
        ;
    }
});

module.exports = StatsStore;