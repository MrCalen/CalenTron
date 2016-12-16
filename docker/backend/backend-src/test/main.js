var assert = require('assert');
var should = require('should');
var request = require('supertest');

var url = "http://localhost:3000";

describe('API - Security Token stuff', function () {

    it('Bad request', function (done) {
        request(url)
            .get('/login')
            .send()
            .end(function (err, res) {
                should(res).have.property('status', 404);
                done();
            })
    });

    describe('No Token', function () {
        it('No Token - Success', function (done) {
            request(url)
                .get('/api/tasks')
                .send()
                .end(function (err, res) {
                    var body = res.body;
                    should(body).have.property('success', false);
                    done();
                })
        });
        it('No Token - Message', function (done) {
            request(url)
                .get('/api/tasks')
                .send()
                .end(function (err, res) {
                    var body = res.body;
                    should(body).have.property('message', 'Please provide an access token');
                    done();
                })
        });
    });

    it('Valid request', function (done) {
        request(url)
        .get('/')
        .send()
        .end(function (err, res) {
            should(res).have.property('status', 202);
            done();
        })
    });

});

describe('API - Sql related stuff', function () {
});