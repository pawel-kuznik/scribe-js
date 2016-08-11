// dependencies
var XPath = require('xpath'),
    iTunesAddition = require('./iTunesItemAddition');

/**
 *  The item class.
 *
 *  @author Paweł Kuźnik <pawel.kuznik@gmail.com>
 */
var _node = Symbol('node');
module.exports = class {

    /**
     *  Constructor
     *
     *  @param  XMLNode
     */
    constructor (node) {

        // check if we have input node
        if (!node) throw new Error('Need input node');

        // remember node
        this[_node] = node;

        /**
         *  Helper function to parse data from passed Node instance.
         */
        var getValue = function (selector, defaultValue) {

            // ensure default value
            defaultValue = defaultValue || null;

            // get the nodes from the passed node
            var nodes = XPath.select(selector, node);

            // no nodes? return default value
            if (!nodes) return defaultValue;

            // return text content
            return nodes[0].textContent;
        };

        // start assigning values
        this.title = getValue('//title');
        this.link = getValue('//link');
        this.pubDate = getValue('//pubDate');
        this.guid = getValue('//guid');
        this.description = getValue('//description');
    }

    /**
     *  Get additional contnet attached to this item.
     *
     *  @return     Array
     */
    additionalContent () {

        var additionals = [];

        // do we have additional stuff from itunes?
        if (XPath.select("//*[namespace-uri()='http://www.itunes.com/dtds/podcast-1.0.dtd']", this[_node]).length) additionals.push(new iTunesAddition(this[_node]));

        // return found additionals
        return additionals;
    }
}
