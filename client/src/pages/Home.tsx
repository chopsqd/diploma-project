import React, {useState} from 'react';
import {Badge, Button, Card, Container, Form, Spinner, Stack, Table} from "react-bootstrap";
import {IVoyage} from "../types/voyages";
import {useLazyQuery, useQuery} from "@apollo/client";
import {FETCH_SEARCH_VOYAGES_QUERY, FETCH_VOYAGES_QUERY} from "../gql/voyages";
import Alert from "../components/Alert";
import {useNavigate} from "react-router-dom";
import {debounce} from "../utils/debounce";

const Home = () => {
    const navigate = useNavigate()
    let {loading: loadingR, data: {getVoyages: voyages} = {}, error: errorR} = useQuery(FETCH_VOYAGES_QUERY)
    let [getSearchedVoyages, {loading: loadingS, data, error: errorS}] = useLazyQuery(FETCH_SEARCH_VOYAGES_QUERY)

    const search = (event: React.ChangeEvent<HTMLInputElement>) => getSearchedVoyages({variables: { term: event.target.value, key: event.target.name }})
    const searchWithDebounce = debounce(search, 1000)

    const [inputValues, setInputValues] = useState({from: '', to: ''})

    if(loadingR) return <Spinner animation="border" variant="primary" className={"mt-3"}/>
    if(errorR) return <Alert message={`Произошла ошибка: ${errorR}`}/>

    return (
        <Container>
            <div style={{height: 300, margin: '10px 0', overflow: "hidden", borderRadius: 15, backgroundImage: `url('http://localhost:5000/static/${(new Date().getHours() > 18 || new Date().getHours() < 4) ? "night" : "day"}.jpg')`, backgroundPosition: 'top'}}/>
            <Card>
                <Card.Body>
                    <Stack direction={"horizontal"} gap={5}>
                        <Form.Control
                            type="text"
                            placeholder="Откуда"
                            name={"from"}
                            value={inputValues.from}
                            onChange={(event: React.ChangeEvent<HTMLInputElement>): void => {
                                setInputValues({...inputValues, from: event.target.value})
                                searchWithDebounce(event)
                            }}
                        />
                        <Button variant={"outline-primary"} onClick={(): void => {
                            setInputValues({from: inputValues.to, to: inputValues.from})
                            getSearchedVoyages({variables: {
                                term: `${inputValues.from && inputValues.to ? `${inputValues.to}->${inputValues.from}` : `${inputValues.from}${inputValues.to}`}`,
                                key: `${inputValues.from && inputValues.to ? 'all' : inputValues.from ? 'to' : 'from'}`
                            }})
                        }}>⇄</Button>
                        <Form.Control
                            type="text"
                            placeholder="Куда"
                            name={"to"}
                            value={inputValues.to}
                            onChange={(event: React.ChangeEvent<HTMLInputElement>): void => {
                                setInputValues({...inputValues, to: event.target.value})
                                searchWithDebounce(event)
                            }}
                        />
                    </Stack>
                </Card.Body>
            </Card>

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
                    <th>Покупка</th>
                </tr>
                </thead>
                <tbody>
                {loadingS
                    ? <td colSpan={6}><Spinner animation="border" variant="primary" className={"mt-3"}/></td>
                    : data?.getSearchedVoyages !== undefined
                        ? data?.getSearchedVoyages.length
                            ? data?.getSearchedVoyages.map((voyage: IVoyage) => {
                            const [from, to] = voyage.title.split('->');
                            return <tr key={`${voyage.title}-${voyage.data.startTime}`}>
                                <td>{from}</td>
                                <td>{to}</td>
                                <td>{voyage.data.startTime}</td>
                                <td>{voyage.data.endTime}</td>
                                <td>{voyage.data.wayTime}</td>
                                <td>{voyage.data.price} ₽</td>
                                <td>{voyage.data.days}</td>
                                <td><Button variant={"success"} onClick={() => navigate(`timetable/${voyage.id}`)}>Купить билет</Button></td>
                            </tr>
                        })
                            : <td colSpan={6}>Ничего не найдено...</td>
                    : [...voyages].sort((a: IVoyage,b: IVoyage) => (a.data.startTime > b.data.startTime) ? 1 : ((b.data.startTime > a.data.startTime) ? -1 : 0)).map((voyage: IVoyage) => {
                        const [from, to] = voyage.title.split('->');
                        // Выводим только доступные
                        if(voyage.data.places.length !== voyage.data.placesCount) return <tr key={`${voyage.title}-${voyage.data.startTime}`}>
                            <td>{from}</td>
                            <td>{to}</td>
                            <td>{voyage.data.startTime}</td>
                            <td>{voyage.data.endTime}</td>
                            <td>{voyage.data.wayTime}</td>
                            <td>{voyage.data.price} ₽</td>
                            <td>{voyage.data.days}</td>
                            <td style={{position: 'relative'}}>
                                <Button variant={"success"} onClick={() => navigate(`timetable/${voyage.id}`)}>Купить билет</Button>
                                {voyage.data.places.length > voyage.data.placesCount/2
                                    ? <Badge style={{position: 'absolute', top: 0, left: -15}} bg={voyage.data.places.length >= voyage.data.placesCount-5 ? "danger" : "warning"}>{voyage.data.places.length}/{voyage.data.placesCount}</Badge>
                                    : <></>
                                }
                            </td>
                        </tr>
                    })
                }
                </tbody>
            </Table>
        </Container>
    );
};

export default Home;