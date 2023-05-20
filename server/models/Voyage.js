const {model, Schema} = require('mongoose')

const voyageSchema = new Schema({
    name: String,
    title: String,
    data: {
        startTime: String,
        endTime: String,
        price: String,
        wayTime: String,
        days: String,
        fromStation: String,
        toStation: String,
        stops: [
            {
                time: String,
                name: String,
            }
        ],
        busInfo: String,
        places: [Number],
        placesCount: Number
    }
})

module.exports = model('Voyage', voyageSchema)