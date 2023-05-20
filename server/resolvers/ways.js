const Way = require('../models/Way')
const isAdmin = require('../utils/isAdmin')

module.exports = {
    Query: {
        async getWays() {
            try {
                const ways = await Way.find()
                return ways
            } catch (error) {
                throw new Error(error)
            }
        }
    },
    Mutation: {
        async createWay(_, {title, name}, context) {
            isAdmin(context)

            try {
                if (!title || !name) {
                    throw new Error('All fields must be filled in!')
                }

                const newWay = new Way({title, name})
                const way = await newWay.save()

                return way
            } catch (error) {
                throw new Error(error)
            }
        },
        async updateWay(_, {wayId, title, name}, context) {
            isAdmin(context)

            try {
                if (!title || !name || !wayId) {
                    throw new Error('All fields must be filled in!')
                }

                await Way.findByIdAndUpdate(wayId, {
                    title, name
                })

                return "Way updated successfully!"
            } catch (error) {
                throw new Error(error)
            }
        },
        async deleteWay(_, {wayId}, context) {
            isAdmin(context)

            try {
                if (!wayId) {
                    throw new Error('Way ID must not be empty!')
                }

                const way = await Way.findById(wayId)
                if (!way) {
                    throw new Error('There is no way with this ID!')
                }

                await way.deleteOne()
                return "Way deleted successfully!"
            } catch (error) {
                throw new Error(error)
            }
        }
    }
}