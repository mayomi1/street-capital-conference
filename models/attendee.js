/**
 * Created by mayomi on 9/16/18 by 12:50 PM.
 */

const mongoose = require('mongoose');
mongoose.plugin(schema => { schema.options.usePushEach = true });
const Schema = mongoose.Schema;
//================================
// Attendee Schema
//================================
const AttendeeSchema = new Schema({
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
	registered: {
		type: Date,
		default: Date.now
	}
},
	{
		timestamps: true
	});


const Attendee = module.exports = mongoose.model('attendee', AttendeeSchema);

module.exports.deleteAttendee = (id) => {
	return Attendee.findByIdAndRemove(id);
};
