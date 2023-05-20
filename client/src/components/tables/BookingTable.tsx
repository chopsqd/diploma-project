import React, {useContext, useEffect, useState} from 'react';
import {Button, Card, Container, DropdownButton, Form, Spinner, Stack, Table} from "react-bootstrap";
import {IStopData, IVoyage} from "../../types/voyages";
import {useMutation, useQuery} from "@apollo/client";
import {FETCH_VOYAGES_QUERY, UPDATE_VOYAGES_QUERY} from "../../gql/voyages";
import Alert from "../Alert";
import BusSchema from "../BusSchema";
import CloseButton from "../buttons/CloseButton";
import Dropdown from 'react-bootstrap/Dropdown';
import {parseData} from "../../utils/parseData";
import PrintButton from "../buttons/PrintButton";
import {useAppSelector} from "../../hooks/useRedux";

const BookingTable = () => {
    const user = useAppSelector(state=> state.auth.user)

    const [busyPlaces, setBusyPlaces] = useState<number[]>([])
    const [choosedPlaces, setChoosedPlaces] = useState<number[]>([])
    const [formValues, setFormValues] = useState<any>({})
    const {loading: loadingR, data: {getVoyages: voyages} = {}, error: errorR} = useQuery(FETCH_VOYAGES_QUERY)

    const printCheck = (): void => {
        let mywindow = window.open('', 'PRINT', 'height=600,width=600');
        mywindow?.document.write(`
            <h3>АВТОВОКЗАЛЫ ДОНБАССА</h3><hr>
            Откуда: ${formValues.from}<br>
            Куда: ${formValues.to}<br>
            Отправление: ${formValues.createInput.startTime}<br>
            Прибытие: ${formValues.createInput.endTime}<br>
            АС отправления: ${formValues.createInput.fromStation}<br>
            АС прибытия: ${formValues.createInput.toStation}<br>
            Время в пути: ${formValues.createInput.wayTime}<br>
            Стоимость: <b>${(busyPlaces.length - formValues.createInput.places.length) * formValues.createInput.price} ₽</b><br><hr>
            Места: ${choosedPlaces.join(', ')}<br><hr>
            Информация об автобусе: ${formValues.createInput.busInfo}<br>
            Чек выдал: ${user?.username}<br><hr>${new Date().toLocaleString()}
        `);

        mywindow?.document.close(); // necessary for IE >= 10
        mywindow?.focus(); // necessary for IE >= 10*/
        mywindow?.print();
    }

    const printReport = (): void => {
        let mywindow = window.open('', 'PRINT', 'height=600,width=600');
        mywindow?.document.write(`
            <h3>АВТОВОКЗАЛЫ ДОНБАССА</h3><hr>
            Откуда: ${formValues.from}<br>
            Куда: ${formValues.to}<br>
            Отправление: ${formValues.createInput.startTime}<br>
            Прибытие: ${formValues.createInput.endTime}<br>
            АС отправления: ${formValues.createInput.fromStation}<br>
            АС прибытия: ${formValues.createInput.toStation}<br>
            Время в пути: ${formValues.createInput.wayTime}<br>
            Остановки: ${formValues.createInput.stops.map((stop: IStopData) => `${stop.name}: ${stop.time}`)}<br>
            Пассажиров: ${busyPlaces.length}<br><hr>
            Информация об автобусе: ${formValues.createInput.busInfo}<br>
            Отчет выдал: ${user?.username}<br><hr>${new Date().toLocaleString()}
        `);

        mywindow?.document.close(); // necessary for IE >= 10
        mywindow?.focus(); // necessary for IE >= 10*/
        mywindow?.print();
    }

    const [update, { loading: loadingU, error: errorU }] = useMutation(UPDATE_VOYAGES_QUERY, {
        variables: {...formValues, ...parseData(formValues.from, formValues.to, formValues.fromCode, formValues.toCode), createInput: {...formValues.createInput, places: busyPlaces}},
        update() {
            setFormValues({})
        },
        refetchQueries: [
            {query: FETCH_VOYAGES_QUERY}
        ]
    })

    if (loadingR || loadingU) return <Spinner animation="border" variant="primary" className={"mt-3"}/>
    if(errorR || errorU) return <Alert message={`Произошла ошибка: ${errorR || errorU}`}/>

    return (
        <Container>
            <Stack direction={"horizontal"} gap={3} className={"pb-3"}>
                <Card style={{width: '100%'}}>
                    <Card.Body>
                        <Card.Title className={"d-flex justify-content-between align-content-center"}>
                            <div>Бронирование билетов</div>
                            {Object.keys(formValues).length ? <><PrintButton onClick={() => {
                                if(!window.confirm('Распечатать отчёт?')) return
                                printReport()
                                update({variables: {...formValues, ...parseData(formValues.from, formValues.to, formValues.fromCode, formValues.toCode), createInput: {...formValues.createInput, places: []}}})
                            }} /><CloseButton onClick={() => setFormValues({})}/></> : <></>}
                        </Card.Title>
                        <hr/>
                        {!Object.keys(formValues).length
                            ? <div>Выберите рейс...</div>
                            : <Stack direction={"horizontal"} className={"justify-content-between"}>
                                <Stack direction={"vertical"} style={{maxWidth: 350}}>
                                    <Stack direction={"horizontal"} gap={2}>
                                        <Form.Control value={formValues.from} disabled/>
                                        <Form.Control value={formValues.to} disabled/>
                                    </Stack>
                                    <Stack direction={"horizontal"} gap={2} className={"pt-1"}>
                                        <Form.Control value={formValues.createInput.startTime} disabled/>
                                        <Form.Control value={formValues.createInput.endTime} disabled/>
                                    </Stack>
                                    <Stack direction={"horizontal"} gap={2} className={"pt-1"}>
                                        <Form.Control value={formValues.createInput.fromStation} disabled/>
                                        <Form.Control value={formValues.createInput.toStation} disabled/>
                                    </Stack>
                                    <Stack direction={"horizontal"} gap={2} className={"pt-1"}>
                                        <Form.Control value={`${formValues.createInput.price} ₽`} disabled/>
                                        <Form.Control value={formValues.createInput.days} disabled/>
                                    </Stack>
                                    <Stack direction={"horizontal"} gap={2} className={"pt-1"}>
                                        <Form.Control value={`${formValues.createInput.placesCount} мест`} disabled/>
                                        <Form.Control value={`В пути: ${formValues.createInput.wayTime}`} disabled/>
                                    </Stack>
                                    <Stack direction={"horizontal"} className={"pt-1"}>
                                        <Form.Control className={"pt-1"} value={formValues.createInput.busInfo} disabled/>
                                    </Stack>
                                    <Stack direction={"horizontal"} gap={5} className={"pt-1"}>
                                        <DropdownButton variant={"outline-secondary"} title="Остановки">
                                            {formValues.createInput.stops.map((stop: IStopData) => <Dropdown.Item key={stop.name}><b>{stop.name}: {stop.time}</b></Dropdown.Item>)}
                                        </DropdownButton>
                                        <Button variant={"success"} onClick={() => {
                                            if(busyPlaces.length === formValues.createInput.places.length) return alert('Выберите место')
                                            printCheck()
                                            update()
                                            window.location.reload();
                                        }}>БРОНИРОВАТЬ</Button>
                                    </Stack>
                                </Stack>

                                <Stack direction={"horizontal"}>
                                    <BusSchema busyPlaces={busyPlaces} setBusyPlaces={setBusyPlaces} setChoosedPlaces={setChoosedPlaces}/>
                                    <iframe title={"way-map"} style={{border: '1px solid #ccc', borderRadius: '10px'}} src={`https://yandex.ru/map-widget/v1/?ll=38.367264%2C47.993049&mode=routes&rtext=48.050724%2C38.760274~47.991273%2C37.795709&rtt=auto&ruri=${formValues.toCode}~${formValues.fromCode}`} width={`${window.screen.width > 1400 ? "650" : window.screen.width < 1200 ? "300" : "400"}`} height="300"/>
                                </Stack>
                            </Stack>
                        }
                    </Card.Body>
                </Card>
            </Stack>

            <Table striped bordered hover>
                <thead>
                <tr>
                    <th>Откуда</th>
                    <th>Куда</th>
                    <th>Отправление</th>
                    <th>Прибытие</th>
                    <th>АС отправления</th>
                    <th>АС прибытия</th>
                    <th>Регулярность</th>
                </tr>
                </thead>
                <tbody>
                {voyages.map((voyage: IVoyage) => {
                    const [from, to] = voyage.title.split('->');
                    const [fromCode, toCode] = voyage.name.split('->');

                    return <tr key={voyage.title} style={{cursor: 'pointer'}} onClick={() => {
                        setFormValues({voyageId: voyage.id, from: from, to: to, fromCode: fromCode, toCode: toCode, createInput: {...voyage.data}})
                        setBusyPlaces(voyage.data.places)
                    }}>
                        <td>{from}</td>
                        <td>{to}</td>
                        <td>{voyage.data.startTime}</td>
                        <td>{voyage.data.endTime}</td>
                        <td>{voyage.data.fromStation}</td>
                        <td>{voyage.data.toStation}</td>
                        <td>{voyage.data.days}</td>
                    </tr>
                })}
                </tbody>
            </Table>
        </Container>
    );
};

export default BookingTable;