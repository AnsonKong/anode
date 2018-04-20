'use strict';
module.exports = app => {
  const mongoose = app.mongoose;
  const Schema = mongoose.Schema;
  const MessageSchema = new Schema({
    created_time: { type: Number },
    read: { type: Boolean, default: false },
    sender: { type: Schema.Types.ObjectId, ref: 'User' },
    receiver: { type: Schema.Types.ObjectId, ref: 'User' },
    // 0 - 主题被回复， 1 - 被回复提到
    type: { type: String },
    data: { type: Schema.Types.Mixed },
  });

  return mongoose.model('Message', MessageSchema);
};
