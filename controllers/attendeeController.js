/**
 * Created by mayomi on 9/16/18 by 1:36 PM.
 */

const Helper = require('../config/helper');
const knownError = Helper.knownError;
const successResponse = Helper.successResponse;
const unknownError = Helper.unknownError;
const push2Talk = Helper.pushAttendee2Talk;
const AttendeeModel = require('../models/attendee');

exports.addAttendee = (req, res) => {
	const { name, company, email} = req.body;
	const {talk_id} = req.params;

	// Check for requirement
	switch (true) {
		case !talk_id: return knownError(res, 'Talk id is required');
		case !name: return knownError(res, 'Speaker name is required');
		case !company: return knownError(res, 'Company is required');
		case !email: return knownError(res, 'Email is required');
		default:
			'';
	}

	const newAttendee = AttendeeModel({
		talk_id, name, company, email
	});

	newAttendee.save()
		.then(talk => {
			push2Talk(talk_id, newAttendee);
			successResponse(res, 'Attendee added', talk)
		})
		.catch(error => unknownError(res, error))
};

exports.deleteAttendee = (req, res) => {
	const {attendee_id} = req.params;

	AttendeeModel.deleteAttendee(attendee_id)
		.then(()=>successResponse(res, 'Attendee deleted', null))
		.catch(error=>unknownError(res, error))
};
