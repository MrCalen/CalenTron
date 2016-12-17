var assert = require('assert');
var should = require('should');
var request = require('supertest');

describe('API', function () {

    before(function (done) {
        require('../modules/configParser').parse();
        done();
    });

    describe('Cah Module', function () {

        var cahUrl = null;

        before(function (done) {
            this.timeout(5000);
            var ctrl = require('../controllers/CaHController');
            ctrl.getLastCAH()
                .then(function (cah) {
                    cahUrl = cah;
                    done();
            });
        });

        it('Can ping', function () {
            should(cahUrl).be.a.String();
        });

        it('Result Regex', function () {
            should(cahUrl).match(/^https:\/\/.*$/);
        });
    });

    describe('PingController', function () {
        var result = null;

        before(function (done) {
            var ctrl = require('../controllers/PingController');
            ctrl.getPing()
            .then(function (res) {
                result = res;
                done();
            });
        });

        it('Result Ok', function () {
            should(result).be.an.Object();
        });

        it('Result - Attempts', function () {
            assert(result.attempts, 10);
        });

        it('Result - Addr', function () {
            assert(result.address == global.config.server.ping_url);
        });

        describe('Results - Analysis', function () {
            it('Type', function () {
                should(result.results).be.an.Array();
            });

            it('Number', function () {
                assert(result.results.length == result.attempts);
            });
        });
    });

    describe('WeatherController', function () {
        var result = null;

        before(function (done) {
            var ctrl = require('../controllers/WeatherController');
            ctrl.getWeather()
                .then(function (res) {
                    result = res;
                    done();
                });
        });

        it('Result - Ok', function () {
            should(result).be.an.Object();
        });

        it('Result - Api Response', function () {
            assert(result.cod === '200');
        });

        it('Result - Typing', function () {
            should(result.list).be.an.Array();
        })
    })

});