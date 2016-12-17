var assert = require('assert');
var should = require('should');
var request = require('supertest');
var fs = require('fs');
var ini = require('ini');

describe('API', function () {

    before(function (done) {
        global.config = ini.parse(fs.readFileSync('./config.ini', 'utf-8'));
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
            this.timeout(5000);
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
        })

    });

});