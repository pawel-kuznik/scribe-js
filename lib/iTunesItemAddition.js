var XPath = require('xpath');

/**
 *  Special class that will describe additional information from itunes namespace
 *  inserted into an <item> tag.
 *
 *  @author Paweł Kuźnik <pawel.kuznik@gmail.com>
 */

var _node = Symbol('node');
module.exports = class {

    /**
     *  The constructor
     *
     *  @param  XMLNode
     */
    constructor(node) {

        // we will need the namespace uri
        var namespaceUri = 'http://www.itunes.com/dtds/podcast-1.0.dtd';

        // assign the node
        this[_node] = node;

        /**
         *  Helper function to parse data from passed Node instance.
         */
        var getValue = function (selector, defaultValue) {

            // ensure default value
            defaultValue = typeof defaultValue != 'undefined' ? defaultValue : null;

            // get the nodes from the passed node
            var nodes = XPath.select(selector, node);

            // no nodes? return default value
            if (!nodes) return defaultValue;

            // return text content
            return nodes[0] ? nodes[0].textContent : defaultValue;
        };

        // assign the properties
        this.subtitle = getValue(`//subtitle[namespace-uri()='${namespaceUri}']`);
        this.summary = getValue(`//summary[namespace-uri()='${namespaceUri}']`);
        this.keywords = getValue(`//keywords[namespace-uri()='${namespaceUri}']`, '').split(',').map(function (keyword) { return keyword.trim(); });
    }
}
