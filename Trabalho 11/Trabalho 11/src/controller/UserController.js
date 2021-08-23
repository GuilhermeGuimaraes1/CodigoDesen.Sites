const State = require('../models/state');
module.exports = {
    getStates: async(req, res) => {
        let states = await states.find();
        res.json({
            states
        });
    },
    info: async(req, res) => {

    }
};