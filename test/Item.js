// import testing lib
var expect = require('chai').expect;

var DOMParser = require('xmldom').DOMParser;

// the Item class
var Item = require('../lib/Item');

// function that will return a sample node
var getSampleNode = function () {
    let sample = `
        <?xml version="1.0" encoding="UTF-8"?>
        <rss version="2.0" xmlns:itunes="http://www.itunes.com/dtds/podcast-1.0.dtd">
            <items>
                <item>
                    <title>Sample title</title>
                    <link>http://example.com</link>
                    <pubDate>Mon, 25 Jul 2016 21:11:02 +0000</pubDate>
                    <guid>some-guid</guid>
                    <description>Some description</description>
                    <itunes:subtitle>Some subtitle</itunes:subtitle>
                    <itunes:summary>Some summary</itunes:summary>
                </item>
            </items>
        </rss>
        `;

    // paser the sample node
    return new DOMParser().parseFromString(sample).getElementsByTagName('item')[0];
};

// start testing Item class
describe('Item', function () {

    // test constructor
    describe('#constructor', function () {

        it("should throw an Error when empty input", function () {
            expect(function() {
                new Item();
            }).to.throw(Error);
        });

        it("should assign properties", function () {

            // construct item instance
            let item = new Item(getSampleNode());

            // check if all need properties are set
            expect(item).to.have.property('title').and.to.equal('Sample title');
            expect(item).to.have.property('link').and.to.equal('http://example.com');
            expect(item).to.have.property('pubDate').and.to.equal('Mon, 25 Jul 2016 21:11:02 +0000');
            expect(item).to.have.property('guid').and.to.equal('some-guid');
            expect(item).to.have.property('description').and.to.equal('Some description');
        });
    });


    // test ::additionalContent method
    describe('#additionalContent', function() {

        // construct sample node
        let item = new Item(getSampleNode());

        expect(item.additionalContent()).to.be.an('array');
    });
});
