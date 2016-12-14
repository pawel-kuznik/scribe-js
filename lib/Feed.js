// dependencies
var Promise = require('promise'),
    http = require('http'),
    DOMParser = require('xmldom').DOMParser,
    XPath = require('xpath'),
    Item = require('./Item');

/**
 *  The Feed class
 *
 *  @author Paweł Kuźnik <pawel.kuznik@gmail.com>
 */
var _data = Symbol('data');
var Feed = class {

    /**
     *  Constructor
     *
     *  @param  string  The XML data
     *  @throws Error
     */
    constructor (string) {

        // if string is empty then we can't construct the feed
        if (!string) throw new Error("Feed needs data to work with");

        // construct an instance of cheerio
        this[_data] = new DOMParser().parseFromString(string);

        // get the channel node
        var node = this[_data].getElementsByTagName('channel')[0];

        /**
         *  Helper function to parse data from passed Node instance.
         */
        var getValue = function (selector, defaultValue) {

            // ensure default value
            defaultValue = defaultValue || null;

            // get the nodes from the passed node
            var nodes = XPath.select(selector, node);

            // no nodes? return default value
            if (!nodes || nodes.length == 0) return defaultValue;

            // return text content
            return nodes[0].textContent;
        };

        // start assigning values
        this.title = getValue('.//title');
        this.link = getValue('.//link');
        this.description = getValue('.//description');
        this.copyright = getValue('.//copyright');
        this.docs = getValue('.//docs');
        this.pubDate = getValue('.//pubDate');
        this.language = getValue('.//language');
        this.image = getValue('.//image/url');
        this.lastBuildDate = getValue('.//lastBuildDate');
        this.ttl = getValue('.//ttl');
    }

    /**
     *  Load data from external source.
     *
     *  @param  string
     *  @return Promise
     */
    static load (url) {

        // return new instance of a Promise class
        return new Promise(function (resolve, reject) {

            // start downloading the file
            http.get(url, function (res) {

                // we don't have a HTTP 200? reject the promise
                if (res.statusCode != 200) reject();

                // set encoding (so we can get string)
                res.setEncoding('utf8');

                // we have to create a data buffer cause response will give us
                // data chunk by chunk. Suprisingly there is no  built in way
                // to get the actual body
                let data = '';

                // install ondata callback
                res.on('data', function (chunk) {
                    data += chunk;
                });

                // now we can resole our promise cause we have the actual data
                res.on('end', function () {
                    resolve(new Feed(data));
                });

                // resume the response
                res.resume();

            // we could have any number of problems, we should also handle them
            }).on('error', function () {

                // reject the promise
                reject();
            });
        });
    }

    /**
     *  Get access to all items inside the feed.
     *
     *  @return     Item[]
     */
    items () {
        return XPath.select('//item', this[_data]).map(function (node) { return new Item(node); });
    }
};

module.exports = Feed;
