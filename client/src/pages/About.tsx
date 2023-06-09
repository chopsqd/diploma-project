import React from 'react';
import {Accordion, Container, Stack} from "react-bootstrap";

const About = () => {
    return (
        <Container>
            <Stack className={"my-5"}><h1>Информация для пассажиров</h1></Stack>
            <Stack>
                <p>АВТОВОКЗАЛЫ ДОНБАССА — официальный сайт, на котором можно купить билеты на автобус и посмотреть
                    расписание на рейсы в более чем 200 000 активных направлениях по России и СНГ.</p>

                <p>Компания «АВТОВОКЗАЛЫ ДОНБАССА» развивается с 2015 года и сегодня является одной из ведущих на рынке
                    онлайн-продажи билетов на автобусы. Информацию о каждом пассажире мы в автоматическом режиме
                    передаём в систему автовокзала. Покупка билета на сайте аналогична покупке в кассе автовокзала, но
                    онлайн вы можете приобретать билеты в любое время и в удобном для вас месте.</p>
            </Stack>
        </Container>
    );
};

export default About;