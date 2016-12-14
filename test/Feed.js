// import testing lib
var expect = require('chai').expect;
var Promise = require('promise');

// the Feed class
var Feed = require('../lib/scribe').Feed;

// start testing Feed class
describe('Feed', function () {

    // test constructor
    describe('#constructor', function () {

        // empty strings should throw errors
        expect(function () {


            // construct feed instance
            let feed = new Feed();
        }).to.throw(Error);

        // feed data should not throw errors
        expect(function () {

            // construct feed instance
            let feed = new Feed('<rss version="2.0"><channel></channel></rss>');
        }).to.not.throw(Error);
    });

    // test load function
    describe('#load', function () {

        // first test case
        it("should return a Promise instance", function () {

            // start loading feed data
            let result = Feed.load('http://localhost:7644/shoptalkshow.xml');

            // check if we have a promise
            expect(result).to.be.an.instanceof(Promise);
        });

        // next test case
        it("should download ShopTalkShow RSS", function (done) {

            // sometimes it takes some time to download that podcast
            this.timeout(500);

            // start loading feed data
            let result = Feed.load('http://localhost:7644/shoptalkshow.xml');

            // are we done?
            result.done(function (feed) {

                // check if we are getting a Feed instance
                expect(feed).to.be.an.instanceof(Feed);

                // call done
                done();
            });
        });

        // next test case
        if ("should download RSS feed and assign data", function (done) {

            // make some timeout
            this.timeout(500);

            let result = Feed.load('http://localhost:7644/shoptalkshow.xml');

            // are we done?
            result.done(function (feed) {

                // check properties that we know about
                expect(feed).to.have.property('title', 'ShopTalk');
                expect(feed).to.have.property('link', 'http://shoptalkshow.com');

                // @todo add checking rest of properties? it's the same code

                // call done
                done();
            });
        });
    });

    // test items function
    describe('#items', function () {

        it("should return an array of Items", function(done) {
            
            // load the feed
            Feed.load('http://localhost:7644/shoptalkshow.xml').done(function (feed) {
                
                // get the items list
                var items = feed.items();

                // we should have an array of items
                expect(items).to.be.an('array');

                // call done
                done();
            });
        });
    });
});


