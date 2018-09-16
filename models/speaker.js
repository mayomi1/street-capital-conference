/**
 * Created by mayomi on 9/16/18 by 12:46 PM.
 */
const mongoose = require('mongoose');
mongoose.plugin(schema => { schema.options.usePushEach = true });
const Schema = mongoose.Schema;
//================================
// Speaker Schema
//================================
const SpeakerSchema = new Schema({
		talk_id: {
			type: String
		},
		name: {
			type: String
		},
		company: {
			type: String
		},
		email: {
			type: String
		},
		bio: {
			type: String
		}
	},
	{
		timestamps: true
	});

const Speaker = module.exports = mongoose.model('speaker', SpeakerSchema);


module.exports.deleteSpeaker = (id) => {
	return Speaker.findByIdAndRemove(id);
};
