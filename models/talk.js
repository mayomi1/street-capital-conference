const mongoose = require('mongoose'),
	Schema = mongoose.Schema;

const speakers = require('./speaker');
const attendees = require('./attendee');

//================================
// Talk Schema
//================================
const TalkSchema = new Schema({
		title: {
			type: String
		},
		abstract: {
			type: String
		},
		room: {
			type: Number
		},
		speakers: [{type: Schema.Types.ObjectId, ref: 'speakers'}],
		attendees: [{type: Schema.Types.ObjectId, ref: 'attendees'}]
	},
	{
		timestamps: true
	});


const Talk = module.exports = mongoose.model('talk', TalkSchema);

module.exports.getAllTalk = () => {
	return Talk.find({});
};

module.exports.findBy = (findWith) => {
	return Talk.find(findWith);
};

module.exports.findOneTalk = (query) => {
	return Talk.findOne(query);
};

module.exports.getTalkById = (id) => {
	return Talk.findById(id);
};

module.exports.deleteTalk = (id) => {
	return Talk.findByIdAndRemove(id);
};
