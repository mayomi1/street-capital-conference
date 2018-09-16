/**
 * Created by mayomi on 9/16/18 by 1:03 PM.
 */

const Helper = require('../config/helper');
const knownError = Helper.knownError;
const successResponse = Helper.successResponse;
const unknownError = Helper.unknownError;
const TalkModel = require('../models/talk');

exports.createTalk = (req, res) => {
	const { title, abstract, room} = req.body;
	// Check for requirement
	switch (true) {
		case !title: return knownError(res, 'Title is required');
		case !abstract: return knownError(res, 'Abstract is required');
		case !room: return knownError(res, 'Room is required');
		case !Number.isInteger(Number(room)): return knownError(res, 'Room should be a number');
		default:
			'';
	}
	const newTalk = TalkModel({
		title, abstract, room
	});

	newTalk.save()
		.then(talk => successResponse(res, 'Your talk has been created', talk))
		.catch(error => unknownError(res, error))
};

exports.getAllTalk = (req, res) => {
	TalkModel.find({})
		.populate('speaker')
		.populate('attendee')
		.then(talk => successResponse(res, 'get all talk', talk))
		.catch(error => unknownError(res, error));
};

exports.getTalk = (req, res) => {
	const talkId = req.params.talk_id;
	const findWith = {
		_id: talkId
	};
	TalkModel.findBy(findWith)
		.populate('speaker')
		.populate('attendee')
		.then(talk => successResponse(res, 'get talk', talk))
		.catch(error => unknownError(res, error));
};

exports.deleteTalk = (req, res) => {
	const {talk_id} = req.params;

	TalkModel.deleteTalk(talk_id)
		.then(()=>successResponse(res, 'Talk deleted', null))
		.catch(error=>unknownError(res, error))
}
