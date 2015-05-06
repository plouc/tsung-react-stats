var Reflux       = require('reflux');
var request      = require('superagent');
var _            = require('lodash');
var StatsActions = require('./../actions/StatsActions');


function buildStatusCodesMetrics(stats) {
    var codes = [];
    _.forEach(stats, stat => {
        _.forOwn(stat.data, (metricValue, metricKey) => {
            if (metricKey.indexOf('http_') === 0) {
                codes.push(parseInt(metricKey.substring(5), 10));
            }
        });
    });
    codes = _.uniq(codes);

    var codesStats = {};
    _.forEach(codes, code => {
        codesStats[code] = _.map(stats, stat => {
            var codeStat = {
                ts:    stat.timestamp,
                value: 0,
                total: 0
            };

            if (stat.data[`http_${ code }`]) {
                codeStat.value = stat.data[`http_${ code }`].value;
                codeStat.total = stat.data[`http_${ code }`].total;
            }

            return codeStat;
        });
    });

    return codesStats;
}


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

                var stats = _.filter(res.body.stats, stat => (stat.samples.length > 0));
                stats = _.map(stats, stat => {
                    return {
                        timestamp: stat.timestamp,
                        data:      _.indexBy(stat.samples, 'name')
                    };
                });

                console.log(buildStatusCodesMetrics(stats));

                this.trigger({
                    stats: stats,
                    codes: buildStatusCodesMetrics(stats)
                });
            })
        ;
    }
});

module.exports = StatsStore;