import React, {useEffect, useState} from 'react';
import {Button, Form, Modal, Stack} from "react-bootstrap";
import {IVoyage} from "../../types/voyages";
import {useNavigate} from "react-router-dom";
import {useMutation} from "@apollo/client";
import {BOOKING_VOYAGE} from "../../gql/voyages";

export interface IBookingData {
    FIO: string
    email: string
    phone: string
    cardNumber: string
    cvvNumber: string
}

const BookingModal = ({isVisible, setIsVisible, voyage}: {isVisible: boolean, setIsVisible: Function, voyage: IVoyage}) => {
    const navigate = useNavigate()
    const [places, setPlaces] = useState<number>(1)
    const [bookingData, setBookingData] = useState<IBookingData>({FIO: '', email: '', phone: '', cardNumber: '', cvvNumber: ''})
    const [step, setStep] = useState<'1' | '2' | '3' | '4'>('1')

    const [bookAPlaceOnVoyage] = useMutation(BOOKING_VOYAGE)

    useEffect(() => {
        setStep('1')
        setBookingData({FIO: '', email: '', phone: '', cardNumber: '', cvvNumber: ''})
    }, [isVisible])

    return (
        <Modal className={"mt-5"} show={isVisible} onHide={() => setIsVisible(false)}>
            <Modal.Header closeButton>
                {step === '1' && <Modal.Title>Покупка билета</Modal.Title>}
                {step === '2' && <Modal.Title>Оформление</Modal.Title>}
                {step === '3' && <Modal.Title>Оплата</Modal.Title>}
            </Modal.Header>
            {step === '1' && <Modal.Body>
                <Stack direction={"horizontal"} className={"pt-1 justify-content-between"}>
                    <h5>Рейс с маршрутом:</h5>
                    <h5>{voyage.title}</h5>
                </Stack>
                <Stack direction={"horizontal"} className={"pt-1 justify-content-between"}>
                    <h5>Время отправления:</h5>
                    <h5>{voyage.data.startTime}</h5>
                </Stack>
                <Stack direction={"horizontal"} className={"pt-1 justify-content-between"}>
                    <h5>Станция отправления:</h5>
                    <h5>{voyage.data.fromStation}</h5>
                </Stack>
                <Stack direction={"horizontal"} className={"pt-1 justify-content-between"}>
                    <h5>Стоимость:</h5>
                    <h5>{Number(voyage.data.price) * Number(places)} ₽</h5>
                </Stack>
                <Stack direction={"horizontal"} gap={2} className={"pt-1 justify-content-between"}>
                    <h5>Количество мест:</h5>
                    <Form.Control style={{maxWidth: 100}} type={"number"} min={0} max={25} value={places} onChange={(event) => setPlaces(Number(event.target.value))}/>
                </Stack>
            </Modal.Body>}

            {step === '2' && <Modal.Body>
                <Stack direction={"horizontal"} className={"pt-1 justify-content-between"}>
                    <h5>ФИО получателя:</h5>
                    <Form.Control
                        value={bookingData.FIO}
                        style={{width: 250}}
                        required
                        placeholder={"Иванов Иван Иванович"}
                        onChange={(event) => setBookingData({...bookingData, FIO: event.target.value})}
                    />
                </Stack>
                <Stack direction={"horizontal"} className={"pt-1 justify-content-between"}>
                    <h5>Электронная почта:</h5>
                    <Form.Control
                        value={bookingData.email}
                        style={{width: 250}}
                        required
                        placeholder={"ivanov@mail.com"}
                        type={"email"}
                        onChange={(event) => setBookingData({...bookingData, email: event.target.value})}
                    />
                </Stack>
                <Stack direction={"horizontal"} className={"pt-1 justify-content-between"}>
                    <h5>Телефон для связи:</h5>
                    <Form.Control
                        value={bookingData.phone}
                        style={{width: 250}}
                        required
                        placeholder={"+79611234567"}
                        type={"text"}
                        onChange={(event) => setBookingData({...bookingData, phone: event.target.value})}
                    />
                </Stack>
            </Modal.Body>}

            {step === '3' && <Modal.Body>
                <Stack direction={"horizontal"} className={"pt-1 justify-content-between"}>
                    <h5>Номер карты:</h5>
                    <Form.Control
                        style={{width: 250}}
                        type={"number"} placeholder={"xxxxxxxxxxxxxxxx"}
                        min={16}
                        max={16}
                        onChange={(event) => setBookingData({...bookingData, cardNumber: event.target.value})}
                    />
                </Stack>
                <Stack direction={"horizontal"} className={"pt-1 justify-content-between"}>
                    <h5>CVV/CVC:</h5>
                    <Form.Control
                        style={{width: 250}}
                        type={"number"}
                        placeholder={"xxx"}
                        min={3}
                        max={3}
                        onChange={(event) => setBookingData({...bookingData, cvvNumber: event.target.value})}
                    />
                </Stack>
            </Modal.Body>}

            {step === '4' && <Modal.Body>
                <h5 className={"pt-1 text-center"}>Оплата прошла успешно!</h5>
                <h5 className={"pt-1 text-center"}>Чек отправлен на почту!</h5>
                <h5 className={"pt-3 text-center text-success"}>Счастливого пути!</h5>
            </Modal.Body>}

            <Modal.Footer className={`${step !== '4' ? 'justify-content-between' : 'justify-content-center'}`}>
                {step !== '4'
                    ? <Button variant="secondary" size={"lg"} onClick={() => setIsVisible(false)}>Отмена</Button>
                    : <Button variant="success" size={"lg"} onClick={() => navigate('/')}>Ок</Button>
                }
                {step === '1' && <Button variant="success" size={"lg"} onClick={() => setStep('2')}>Купить</Button>}
                {step === '2' && <>
                    <Button variant="warning" size={"lg"} onClick={() => setStep('1')}>Назад</Button>
                    <Button disabled={!bookingData.FIO || !bookingData.email || bookingData.phone.length !== 12} variant="success" size={"lg"} onClick={() => setStep('3')}>К оплате</Button>
                </>}
                {step === '3' && <>
                    <Button variant="warning" size={"lg"} onClick={() => setStep('2')}>Назад</Button>
                    <Button disabled={bookingData.cardNumber.length !== 16 || bookingData.cvvNumber.length !== 3} variant="success" size={"lg"} onClick={() => {
                        bookAPlaceOnVoyage({variables: {voyageId: voyage.id, mailTo: bookingData.email, places}})
                        setStep('4')
                    }}>Оплатить</Button>
                </>}
            </Modal.Footer>
        </Modal>
    );
};

export default BookingModal;