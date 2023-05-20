import React from 'react';
import {Button, Container, DropdownButton, Spinner, Stack, Table} from "react-bootstrap";
import {useQuery} from "@apollo/client";
import {FETCH_VOYAGES_QUERY} from "../gql/voyages";
import Alert from "../components/Alert";
import {IStopData, IVoyage} from "../types/voyages";
import {useNavigate} from "react-router-dom";
import Dropdown from "react-bootstrap/Dropdown";

const TimeTable = () => {
    const navigate = useNavigate()
    let {loading: loadingR, data: {getVoyages: voyages} = {}, error: errorR} = useQuery(FETCH_VOYAGES_QUERY)

    if (loadingR) return <Spinner animation="border" variant="primary" className={"mt-3"}/>
    if (errorR) return <Alert message={`Произошла ошибка: ${errorR}`}/>

    return (
        <Container>
            <Stack className={"my-5"}><h1>Расписание всех рейсов</h1></Stack>

            <Table striped bordered hover className={"my-3"}>
                <thead>
                <tr>
                    <th>Откуда</th>
                    <th>Куда</th>
                    <th>Отправление</th>
                    <th>Прибытие</th>
                    <th>Время в пути</th>
                    <th>Стоимость</th>
                    <th>Регулярность</th>
                    <th>Остановки</th>
                    <th>Покупка</th>
                </tr>
                </thead>
                <tbody>
                {voyages.map((voyage: IVoyage) => {
                        const [from, to] = voyage.title.split('->');
                        return <tr key={voyage.title}>
                            <td>{from}</td>
                            <td>{to}</td>
                            <td>{voyage.data.startTime}</td>
                            <td>{voyage.data.endTime}</td>
                            <td>{voyage.data.wayTime}</td>
                            <td>{voyage.data.price} ₽</td>
                            <td>{voyage.data.days}</td>
                            <td>
                                <DropdownButton variant={"outline-dark"} title="Остановки">
                                    {voyage.data.stops.map((stop: IStopData) =>
                                        <Dropdown.Item key={stop.name}><b>{stop.name}: {stop.time}</b></Dropdown.Item>)}
                                </DropdownButton>
                            </td>
                            <td><Button variant={"success"} onClick={() => navigate(`/timetable/${voyage.id}`)}>Купить билет</Button></td>
                        </tr>
                    })
                }
            </tbody>
        </Table>
</Container>
)
    ;
};

export default TimeTable;