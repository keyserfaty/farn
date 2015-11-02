'use strict';

const
  mongoose = require('mongoose');

const
  Schema = mongoose.Schema,
  PlaceSchema = new Schema({
    name: String,
    description: String,
    images: Array,
    geotag: { type: String, default: '', trim: true },
    tags: { type: Array, default: '', trim: true },
    posts: {
      body: String,
      likes: {
        userID: String,
        date: { type: Date, default: Date.now }
      },
		featured: Boolean,
	},
    checkins: Array
  });

  // TODO: better way to display likes?

PlaceSchema.path('geotag').required(true, 'Field geotag cannot be blank');
PlaceSchema.path('tags').required(true, 'Field tags cannot be blank');

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

mongoose.model('Place', PlaceSchema);
