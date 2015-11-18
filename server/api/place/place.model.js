'use strict';

const
  mongoose = require('mongoose');

const
  Schema = mongoose.Schema,
  PlaceSchema = new Schema({
    // mapbox defined
    placeID: String,
    type: String,
    properties: {
      id: String,
      title: String,
      description: String,
      'marker-size': String,
      'marker-color': String,
      'marker-symbol': String
    },
    geometry: {
      coordinates: Array
    },
    type: String,
    // farn defined
    images: Array,
    posts: [{
      postID: String,
      description: String,
      tag: { type: String, default: '', trim: true },
      user: String,
      thumb: String,
      fullimage: String,
      likes: Number,
      comments: Array,
      featured: Boolean
    }]
  });

// PlaceSchema.path('tag').required(true, 'Field tags cannot be blank');

PlaceSchema.methods = {
  verifyPlace: function() {
    // TODO
    return true;
  }
};

PlaceSchema.statics = {
  list: function (criteria) {
    let query;

    if (criteria.showHidden == 1){
      query = this.find().where({hidden: 1}).exec();
    } else {
      query = this.find().where({hidden: 0}).exec();
    } 

    return query;
  },
  // bulk add
  insert: function (collection, callback) {
    return this.collection.insert(collection, callback);
  },
  get: function (placeID) {
    return this.findOne({ _id: placeID }).exec();
  },
  add: function (place) {
    return place.save();
  },
  del: function (placeID) {
    return this.findByIdAndRemove(placeID); 
  },
  edit: function (placeID, attributes) {
    return this.findOneAndUpdate({ _id: placeID }, attributes);
  }
};

module.exports = mongoose.model('Place', PlaceSchema);
