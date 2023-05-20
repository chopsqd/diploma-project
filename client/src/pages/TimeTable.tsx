import React, {useState} from 'react';
import {useNavigate, useParams} from "react-router-dom";
import {Button, Container, DropdownButton, Form, Spinner, Stack, Table} from "react-bootstrap";
import {useQuery} from "@apollo/client";
import {FETCH_ONE_VOYAGE, FETCH_VOYAGES_QUERY} from "../gql/voyages";
import Alert from "../components/Alert";
import {IStopData, IVoyage} from "../types/voyages";
import Dropdown from "react-bootstrap/Dropdown";
import BookingModal from "../components/modals/BookingModal";

const TimeTable = () => {
    const navigate = useNavigate()
    const {voyageId} = useParams()
    const [isVisible, setIsVisible] = useState<boolean>(false)

    let {loading: loadingR, data: {getOneVoyage: voyage} = {}, error: errorR} = useQuery(FETCH_ONE_VOYAGE, {variables: {voyageId}})
    let {loading: loadingF, data: {getVoyages: voyages} = {}, error: errorF} = useQuery(FETCH_VOYAGES_QUERY)

    if (loadingR || loadingF) return <Spinner animation="border" variant="primary" className={"mt-3"}/>
    if (errorR || errorF) return <Alert message={`Произошла ошибка: ${errorR || errorF}`}/>

    return (
        <Container>
            <Stack className={"my-5"}><h1>Информация о рейсе</h1></Stack>

            <Stack direction={"horizontal"} gap={5}>
                <Stack direction={"horizontal"} className={"justify-content-between"}>
                    <Stack direction={"vertical"} style={{maxWidth: 350}}>
                        <Stack direction={"horizontal"} gap={2}>
                            <Form.Control value={voyage.title.split('->')[0]} disabled/>
                            <Form.Control value={voyage.title.split('->')[1]} disabled/>
                        </Stack>
                        <Stack direction={"horizontal"} gap={2} className={"pt-1"}>
                            <Form.Control value={voyage.data.startTime} disabled/>
                            <Form.Control value={voyage.data.endTime} disabled/>
                        </Stack>
                        <Stack direction={"horizontal"} gap={2} className={"pt-1"}>
                            <Form.Control value={voyage.data.fromStation} disabled/>
                            <Form.Control value={voyage.data.toStation} disabled/>
                        </Stack>
                        <Stack direction={"horizontal"} gap={2} className={"pt-1"}>
                            <Form.Control value={`${voyage.data.price} ₽`} disabled/>
                            <Form.Control value={voyage.data.days} disabled/>
                        </Stack>
                        <Stack direction={"horizontal"} gap={2} className={"pt-1"}>
                            <Form.Control value={`${voyage.data.placesCount} мест`} disabled/>
                            <Form.Control value={`В пути: ${voyage.data.wayTime}`} disabled/>
                        </Stack>
                        <Stack direction={"horizontal"} className={"pt-1"}>
                            <Form.Control className={"pt-1"} value={voyage.data.busInfo} disabled/>
                        </Stack>
                        <Stack direction={"horizontal"} gap={5} className={"pt-1"}>
                            <DropdownButton variant={"outline-secondary"} title="Остановки">
                                {voyage.data.stops.map((stop: IStopData) => <Dropdown.Item key={stop.name}><b>{stop.name}: {stop.time}</b></Dropdown.Item>)}
                            </DropdownButton>
                            <Button variant={"success"} size={"lg"} onClick={() => setIsVisible(true)}>БРОНИРОВАТЬ</Button>
                        </Stack>
                    </Stack>
                </Stack>

                <Stack>
                    <iframe title={"way-map"} style={{border: '1px solid #ccc', borderRadius: '10px'}} src={`https://yandex.ru/map-widget/v1/?ll=38.367264%2C47.993049&mode=routes&rtext=48.050724%2C38.760274~47.991273%2C37.795709&rtt=auto&ruri=${voyage.name.split('->')[1]}~${voyage.name.split('->')[0]}`} width={`${window.screen.width > 1400 ? "900" : window.screen.width > 1200 ? "700" : window.screen.width > 1000 ? "500" : "300"}`} height="300"/>
                </Stack>
            </Stack>

            <h5 className={"mt-3"}>Другие рейсы по этому направлению</h5>
            <Table striped bordered hover className={"my-3"}>
                <thead>
                <tr>
                    <th>Откуда</th>
                    <th>Куда</th>
                    <th>Отправление</th>
                    <th>Прибытие</th>
                    <th>Время в пути</th>
                    <th>Регулярность</th>
                    <th>Покупка</th>
                </tr>
                </thead>
                <tbody>
                {
                    voyages.filter((voyageFilter: IVoyage) => voyageFilter.title === voyage.title && String(voyageFilter.id) !== voyageId).map((voyage: IVoyage) => {
                        const [from, to] = voyage.title.split('->');
                        return <tr key={`${voyage.title}-${voyage.data.startTime}`}>
                            <td>{from}</td>
                            <td>{to}</td>
                            <td>{voyage.data.startTime}</td>
                            <td>{voyage.data.endTime}</td>
                            <td>{voyage.data.wayTime}</td>
                            <td>{voyage.data.days}</td>
                            <td><Button variant={"success"} onClick={() => navigate(`timetable/${voyage.id}`)}>Купить билет</Button></td>
                        </tr>
                    })
                }
                </tbody>
            </Table>

            <BookingModal isVisible={isVisible} setIsVisible={setIsVisible} voyage={voyage}/>
        </Container>
    );
};

export default TimeTable;