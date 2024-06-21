const Waste = require('../models/Waste');

exports.getAllWaste = async (request, reply) => {
    const wastes = await Waste.find();
    return wastes;
};

exports.addWaste = async (request, reply) => {
    const waste = new Waste(request.body);
    await waste.save();
    return waste;
};