const mongoose = require('mongoose');
const schema = mongoose.Schema;

const companySchema = new schema({
    _id: {
        type: String,
        required: [true, 'Company Id is Required.'],
    },
    name: {
        type: String,
        required: [true, 'Company Name is Required.'],
    },
    url: {
        type: String,
        required: [true, 'Company URL is Required.']
    }
});

const adSchema = new schema({
    _id: {
        type: String,
        required: [true, 'Ad id is Required.'],
    },
    companyId: {
        type: String,
        required: [true, 'Company id is Required.'],
    },
    primaryText: {
        type: String,
        required: [true, 'Ad primary text is Required.']
    },
    headline: {
        type: String,
        required: [true, 'Ad Headline is Required.'],
    },
    CTA: {
        type: String,
        required: [true, 'CTA text is Required.'],
    },
    imageUrl: {
        type: String,
        required: [true, 'Ad Image Path is Required.'],
    },
    description: {
        type: String,
        required: [true, 'Ad Description is Required.'],
    }
});

const searchAdModel = mongoose.model('companies', companySchema);
const adModel = mongoose.model('ads', adSchema);

module.exports = { searchAdModel, adModel };