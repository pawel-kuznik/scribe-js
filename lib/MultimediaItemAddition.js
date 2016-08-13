var XPath = require('xpath');

/**
 *  Special class that will describe an addition on multimedia content, like
 *  video or audio.
 *
 *  @author Paweł Kuźnik <pawel.kuznik@gmail.com>
 */

var _node = Symbol('node');
module.exports = class {

    /**
     *  The constructor
     *
     *  @param  XMLNode     The <enclosure> element with multimedia data.
     */
    constructor(node) {

        this.url = node.getAttribute('url');
        this.length = node.getAttribute('length');
        this.type = node.getAttribute('type');
    }

    /**
     *  Is multimedia an audio file?
     */
    isAudio () {
        return this.type.startsWith('audio');
    }

    /**
     *  Is multimedia a video?
     *
     *  @return boolean
     */
    isVideo () {
        return this.type.startsWith('video');
    }
}
