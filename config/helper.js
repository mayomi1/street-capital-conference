/**
 * Created by mayomi on 9/16/18 by 1:05 PM.
 */

const CONSTANT = require('./constant');
const TalkModel = require('../models/talk');


// Set user info from request
exports.setUserInfo = function setUserInfo(request) {
	const getUserInfo = {
		_id: request._id,
		email: request.email,
	};

	return getUserInfo;
};

/**
 * return unknown error
 * @param res
 * @param err
 * @returns {*}
 */
exports.unknownError = (res, err) => {
	return res.json({
		status: false,
		message: CONSTANT.unknownError,
		error: err.stack,
		data : null
	})
};

/**
 * Return a known Error
 * @param res
 * @param message
 * @returns {*}
 */
exports.knownError = (res, message) => {
	return res.json({
		status: false,
		message: message,
		data : null
	})
};

/**
 * return a success response
 * @param res
 * @param message
 * @param data
 * @returns {*}
 */
exports.successResponse = (res, message, data) => {
	return res.json({
		status: true,
		message: message,
		data: data,
	})
};

/**
 * return success response for authentication
 * @param res
 * @param token
 * @param userInfo
 * @returns {*}
 */
exports.successAuthResponse = (res, token, userInfo) => {
	return res.json({
		status: true,
		token: token,
		user: userInfo,
	});
};

exports.checkAuthorization = (res, req) => {
	if(!req.user) {
		return res.json({
			status: false,
			message: 'Authentication is required',
		})
	}
}

exports.pushSpeaker2Talk = (talk_id, newModel) => {
	const query = { _id: talk_id };
	TalkModel.findOneTalk(query).then(talk => {
		talk.speaker.push(newModel);
		talk.save();
	})
};

exports.pushAttendee2Talk = (talk_id, newModel) => {
	const query = { _id: talk_id };
	TalkModel.findOneTalk(query).then(talk => {
		talk.attendee.push(newModel);
		talk.save();
	})
};
