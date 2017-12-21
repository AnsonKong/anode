module.exports = app => {
	const mongoose = app.mongoose;
	const Schema = mongoose.Schema;
	const ReplySchema = new Schema({ 
		content: String, 
		created_time: Number, 
		topic: { type: Schema.Types.ObjectId, ref: 'Topic' },
		user: { type: Schema.Types.ObjectId, ref: 'User' },
	});

	return mongoose.model('Reply', ReplySchema);
}