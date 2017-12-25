module.exports = app => {
	const mongoose = app.mongoose;
	const Schema = mongoose.Schema;
	const ReplySchema = new Schema({ 
		content: { type: String }, 
		created_time: { type: Number }, 
		topic: { type: Schema.Types.ObjectId, ref: 'Topic' },
		user: { type: Schema.Types.ObjectId, ref: 'User' },
		likes: [{ type: Schema.Types.ObjectId, ref: 'User' }],
		parent: { type: Schema.Types.ObjectId, ref: 'Reply' },
	});

	return mongoose.model('Reply', ReplySchema);
}