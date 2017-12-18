module.exports = app => {
	const mongoose = app.mongoose;
	const TopicSchema = new mongoose.Schema({
		category: { type: String },
		title: { type: String },
		content: { type: String },
		user_id: { type: String },
		created_time: { type: Number },
		last_modified_time: { type: Number },
	});

	return mongoose.model('Topic', TopicSchema);
}