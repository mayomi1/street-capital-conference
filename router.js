express = require('express');

const TalkController = require('./controllers/talkController');
const SpeakerController = require('./controllers/speakerController');
const AttendeeController = require('./controllers/attendeeController');

module.exports = function (app) {
    // Initializing route groups
    const apiRoutes = express.Router(),
        talkRoutes = express.Router(),
        speakerRoutes = express.Router(),
        attendeeRoutes = express.Router();

    apiRoutes.use('/talk', talkRoutes);
    apiRoutes.use('/attendee', attendeeRoutes);
    apiRoutes.use('/speaker', speakerRoutes);

    // route to  Talk
    talkRoutes.get('/', TalkController.getAllTalk);
    talkRoutes.get('/:talk_id', TalkController.getTalk);
    talkRoutes.post('/', TalkController.createTalk);
    talkRoutes.delete('/:talk_id', TalkController.deleteTalk);

    // route to speaker
    speakerRoutes.post('/:talk_id', SpeakerController.addSpeaker);
    speakerRoutes.delete('/:speaker_id', SpeakerController.deleteSpeaker);

    //route to attendee
    attendeeRoutes.post('/:talk_id', AttendeeController.addAttendee);
    attendeeRoutes.delete('/:attendee_id', AttendeeController.deleteAttendee);

// Set url for API group routes
    app.use('/api', apiRoutes);
};

