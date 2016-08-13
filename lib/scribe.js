/**
 *  Aggregation file for whole module.
 *
 *  @author Paweł Kuźnik <pawel.kuznik@gmail.com>
 */

// exports all stuff
module.exports = {
    Feed: require('./Feed'),
    Items: require('./Item'),
    iTunesItemsAddition: require('./Item'),
    MultimediaItemAddition: require('./MultimediaItemAddition')
};
