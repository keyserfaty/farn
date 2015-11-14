'use strict';

const
  mongoose = require('mongoose');

const
  Schema = mongoose.Schema,
  UserSchema = new Schema({
    facebookID: String,
    displayName: String,
    name: Object,
    gender: String,
    profileUrl: String,
    provider: String
  });

UserSchema.methods = {
  verifyUser: function() {
    // TODO
    return true;
  }
};

UserSchema.statics = {
  list: function (criteria) {
    let query;

    if (criteria.showHidden == 1){
      query = this.find().where({hidden: 1}).exec();
    } else {
      query = this.find().where({hidden: 0}).exec();
    } 

    return query;
  },
  add: function (user) {
    return user.save();
  },
  get: function (userID) {
    return this.findOne({ _id: userID }).exec();
  },
  edit: function (userID, attributes) {
    return this.findOneAndUpdate({ _id: userID }, attributes);
  },
  del: function (userID) {
    return this.findByIdAndRemove(userID); 
  }
};

module.exports = mongoose.model('User', UserSchema);
