const Voyage = require("../models/Voyage");
const isAdmin = require("../utils/isAdmin");
const sendMail = require("../utils/sendMail");

module.exports = {
    Query: {
        async getVoyages() {
            try {
                const voyages = await Voyage.find()
                return voyages
            } catch(error) {
                throw new Error(error)
            }
        },
        async getSearchedVoyages(_, {term, key}) {
            try {
                const voyages = await Voyage.find({"title" : {$regex : term}})
                let resultVoyages = []
                voyages.map(voyage => {
                    const [from, to] = voyage.title.split('->');
                    if(key === 'from') {
                        if(from.includes(term)) resultVoyages.push(voyage)
                    }
                    if(key === 'to') {
                        if(to.includes(term)) resultVoyages.push(voyage)
                    }
                    if(key === 'all') {
                        resultVoyages.push(voyage)
                    }
                })
                return resultVoyages
            } catch(error) {
                throw new Error(error)
            }
        },
        async getOneVoyage(_, { voyageId }) {
            try {
                const voyage = await Voyage.findById(voyageId)
                return voyage
            } catch(error) {
                throw new Error(error)
            }
        }
    },
    Mutation: {
        async createVoyage(_, {title, name, createInput}, context) {
            isAdmin(context)

            try {
                if(!name || !title) {
                    throw new Error('Все поля должны быть заполнены!')
                }

                if(Object.values(createInput).map(item => item === '').includes(true)) {
                    throw new Error('Все поля должны быть заполнены!')
                }

                const newVoyage = new Voyage({
                    name,
                    title,
                    data: createInput
                })
                const voyage = await newVoyage.save()

                return voyage
            } catch (error) {
                throw new Error(error)
            }
        },
        async updateVoyage(_, {voyageId, title, name, createInput}, context) {
            isAdmin(context)

            try {
                if (!title || !name || !voyageId) {
                    throw new Error('Все поля должны быть заполнены!')
                }

                await Voyage.findByIdAndUpdate(voyageId, {
                    title, name, data: createInput
                })

                return "Информация о рейсе обновлена успешно!"
            } catch (error) {
                throw new Error(error)
            }
        },
        async deleteVoyage(_, {voyageId}, context) {
            isAdmin(context)

            try {
                if (!voyageId) {
                    throw new Error('Укажите ID рейса!')
                }

                const voyage = await Voyage.findById(voyageId)
                if (!voyage) {
                    throw new Error('В базе нет рейса с указанным ID!')
                }

                await voyage.deleteOne()
                return "Информация о рейсе удалена успешно!"
            } catch (error) {
                throw new Error(error)
            }
        },
        async bookAPlaceOnVoyage(_, {voyageId, places, mailTo}) {
            try {
                if (!voyageId || !places || !mailTo) {
                    throw new Error('Все поля должны быть заполнены!')
                }

                const voyage = await Voyage.findById(voyageId)
                if (!voyage) {
                    throw new Error('В базе нет рейса с указанным ID!')
                }

                if((voyage.data.places.length + places) > voyage.data.placesCount) {
                    throw new Error(`Количество бронируемых мест превышает количество доступных!\nДоступных мест: ${voyage.data.placesCount - voyage.data.places.length}`)
                }

                let bookedPlaces = []
                for (let j = 0; j < places; j++) {
                    for (let i = 1; i <= voyage.data.placesCount; i++) {
                        if(!voyage.data.places.includes(i)) {
                            bookedPlaces.push(i)
                            voyage.data.places.push(i)
                            break;
                        }
                    }
                }

                sendMail(mailTo, 'АВТОВОКЗАЛЫ ДОНБАССА - Бронирование билета', `
                    <h3>Билеты успешно забронированы!</h3><br>
                    <h5>Подробная информация: </h5><br>
                    Рейс: ${voyage.title}<br>
                    Отправление: ${voyage.data.startTime}<br>
                    Прибытие: ${voyage.data.endTime}<br>
                    АС отправления: ${voyage.data.fromStation}<br>
                    АС прибытия: ${voyage.data.toStation}<br>
                    Время в пути: ${voyage.data.wayTime}<br>
                    Стоимость: <b>${places * voyage.data.price} ₽</b><br>
                    Места: ${bookedPlaces.join(', ')}<br><hr>
                    Информация об автобусе: ${voyage.data.busInfo}<br>
                    <small>идентификационный номер: ${Date.now()}</small>
                `)

                await voyage.save()
                return voyage
            } catch (error) {
                throw new Error(error)
            }
        }
    }
}