'use strict';
module.exports = app => {
  const mongoose = app.mongoose;
  const Schema = mongoose.Schema;
  const AuthorizationSchema = new Schema({
    provider: { type: String },
    uid: { type: String },
    user: { type: Schema.Types.ObjectId, ref: 'User' },
  });

  return mongoose.model('Authorization', AuthorizationSchema);
};
