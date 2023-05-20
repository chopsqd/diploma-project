import React from 'react';
import {Accordion, Container, Stack} from "react-bootstrap";

const Contacts = () => {
    return (
        <Container>
            <Stack className={"my-5"}><h1>Контактная информация</h1></Stack>
            <Stack direction={"horizontal"}>
                <Stack className={"w-50"}>
                    <Stack direction={"horizontal"} className={"justify-content-between"}>
                        <p><b className={"text-primary"}>Адрес:</b></p>
                        <p><b>г. Донецк, пр. Ильича, 3</b></p>
                    </Stack>
                    <Stack direction={"horizontal"} className={"justify-content-between"}>
                        <p><b className={"text-primary"}>Справочное бюро:</b></p>
                        <p><b>тел. +7(949) 303-03-30</b></p>
                    </Stack>
                    <Stack direction={"horizontal"} className={"justify-content-between"}>
                        <p><b className={"text-primary"}>Аренда помещений и рекламных площадей:</b></p>
                        <p><b>arenda@donavto.ru</b></p>
                    </Stack>
                    <Stack direction={"horizontal"} className={"justify-content-between"}>
                        <p><b className={"text-primary"}>Организация пассажирских перевозок:</b></p>
                        <p><b>perevozki@donavto.ru</b></p>
                    </Stack>
                    <Stack direction={"horizontal"} className={"justify-content-between"}>
                        <p><b className={"text-primary"}>Электронная почта</b></p>
                        <p><b>info@donavto.ru</b></p>
                    </Stack>
                    <Stack direction={"horizontal"} className={"align-items-start"}>
                        <p><b className={"text-primary"}>Как к нам добраться</b></p>
                        <Stack className={"text-end"}>
                            <p><b>Автобусы № 3, 42, 42А, 78б</b></p>
                            <p><b>Троллейбусы № 17, 18</b></p>
                            <p><b>Трамваи № 3, 5, 8, 13</b></p>
                        </Stack>
                    </Stack>
                </Stack>
                <Stack className={"w-50 ms-5"}>
                        <iframe src="https://yandex.ru/map-widget/v1/?ll=37.807378%2C48.001676&mode=whatshere&whatshere%5Bpoint%5D=37.807377%2C48.001676&whatshere%5Bzoom%5D=17&z=15" width="600" height="350"/>
                </Stack>
            </Stack>

            <hr/>

            <Stack className={"my-3"}><h1>Автовокзалы</h1></Stack>
            <Stack>
                <Accordion className={"mb-5"}>
                    <Accordion.Item eventKey="0">
                        <Accordion.Header><b>Автостанция «Амвросиевка»</b></Accordion.Header>
                        <Accordion.Body>
                            <Stack direction={"horizontal"} className={"justify-content-between"}>
                                <p><b className={"text-primary"}>Адрес:</b></p>
                                <p><b>г. Амвросиевка, улица Мичурина, дом 34</b></p>
                                <p><b className={"text-primary"}>Справочное бюро:</b></p>
                                <p><b>тел. +7(949) 202-02-20</b></p>
                            </Stack>
                        </Accordion.Body>
                    </Accordion.Item>
                    <Accordion.Item eventKey="2">
                        <Accordion.Header><b>Автостанция «Горловка»</b></Accordion.Header>
                        <Accordion.Body>
                            <Stack direction={"horizontal"} className={"justify-content-between"}>
                                <p><b className={"text-primary"}>Адрес:</b></p>
                                <p><b>г. Горловка, улица Пушкинская, дом 1</b></p>
                                <p><b className={"text-primary"}>Справочное бюро:</b></p>
                                <p><b>тел. +7(949) 203-03-21</b></p>
                            </Stack>
                        </Accordion.Body>
                    </Accordion.Item>
                    <Accordion.Item eventKey="3">
                        <Accordion.Header><b>Автостанция «Дебальцево»</b></Accordion.Header>
                        <Accordion.Body>
                            <Stack direction={"horizontal"} className={"justify-content-between"}>
                                <p><b className={"text-primary"}>Адрес:</b></p>
                                <p><b>г. Дебальцево, улица Шевченко, дом 1</b></p>
                                <p><b className={"text-primary"}>Справочное бюро:</b></p>
                                <p><b>тел. +7(949) 204-33-29</b></p>
                            </Stack>
                        </Accordion.Body>
                    </Accordion.Item>
                    <Accordion.Item eventKey="4">
                        <Accordion.Header><b>Автовокзал «Донецк «Южный»</b></Accordion.Header>
                        <Accordion.Body>
                            <Stack direction={"horizontal"} className={"justify-content-between"}>
                                <p><b className={"text-primary"}>Адрес:</b></p>
                                <p><b>г. Донецк, Ворошиловский район, площадь Коммунаров, дом 4</b></p>
                                <p><b className={"text-primary"}>Справочное бюро:</b></p>
                                <p><b>тел. +7(949) 205-30-21</b></p>
                            </Stack>
                        </Accordion.Body>
                    </Accordion.Item>
                    <Accordion.Item eventKey="5">
                        <Accordion.Header><b>Автостанция «Енакиево»</b></Accordion.Header>
                        <Accordion.Body>
                            <Stack direction={"horizontal"} className={"justify-content-between"}>
                                <p><b className={"text-primary"}>Адрес:</b></p>
                                <p><b>г. Енакиево, улица Щербакова, дом 64</b></p>
                                <p><b className={"text-primary"}>Справочное бюро:</b></p>
                                <p><b>тел. +7(949) 206-10-91</b></p>
                            </Stack>
                        </Accordion.Body>
                    </Accordion.Item>
                    <Accordion.Item eventKey="6">
                        <Accordion.Header><b>Автостанция «Снежное»</b></Accordion.Header>
                        <Accordion.Body>
                            <Stack direction={"horizontal"} className={"justify-content-between"}>
                                <p><b className={"text-primary"}>Адрес:</b></p>
                                <p><b>г. Снежное, улица Советская, дом 99</b></p>
                                <p><b className={"text-primary"}>Справочное бюро:</b></p>
                                <p><b>тел. +7(949) 207-11-11</b></p>
                            </Stack>
                        </Accordion.Body>
                    </Accordion.Item>
                    <Accordion.Item eventKey="7">
                        <Accordion.Header><b>Автостанция «Харцызск»</b></Accordion.Header>
                        <Accordion.Body>
                            <Stack direction={"horizontal"} className={"justify-content-between"}>
                                <p><b className={"text-primary"}>Адрес:</b></p>
                                <p><b>г. Харцызск, улица Октябрьская, дом 32</b></p>
                                <p><b className={"text-primary"}>Справочное бюро:</b></p>
                                <p><b>тел. +7(949) 209-44-31</b></p>
                            </Stack>
                        </Accordion.Body>
                    </Accordion.Item>
                </Accordion>
            </Stack>
        </Container>
    );
};

export default Contacts;