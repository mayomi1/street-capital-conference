/**
 * Created by mayomi on 9/16/18 by 1:21 PM.
 */
const Helper = require('../config/helper');
const knownError = Helper.knownError;
const successResponse = Helper.successResponse;
const unknownError = Helper.unknownError;
const push2Talk = Helper.pushSpeaker2Talk;
const SpeakerModel = require('../models/speaker');

exports.addSpeaker = (req, res) => {
	const { name, company, email, bio} = req.body;
	const {talk_id} = req.params;

	// Check for requirement
	switch (true) {
		case !talk_id: return knownError(res, 'Talk id is required');
		case !name: return knownError(res, 'Speaker name is required');
		case !company: return knownError(res, 'Company is required');
		case !email: return knownError(res, 'Email is required');
		case !bio: return knownError(res, 'Bio is required');
		default:
			'';
	}

	const newSpeaker = SpeakerModel({
		talk_id, name, company, email, bio
	});

	newSpeaker.save()
		.then(talk => {
			push2Talk(talk_id, newSpeaker);
			successResponse(res, 'Speaker added', talk)
		})
		.catch(error => unknownError(res, error))
};

exports.deleteSpeaker = (req, res) => {
	const {speaker_id} = req.params;

	SpeakerModel.deleteSpeaker(speaker_id)
		.then(()=>successResponse(res, 'Speaker deleted', null))
		.catch(error=>unknownError(res, error))

}
