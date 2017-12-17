module.exports = app => {
	const mongoose = app.mongoose;
	const UserSchema = new mongoose.Schema({
		email: { type: String },
		password: { type: String },
		salt: { type: String },
	});

	return mongoose.model('User', UserSchema);
}