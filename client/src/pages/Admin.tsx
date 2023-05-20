import React, {useContext, useState} from 'react';
import {Button, Container, Stack} from "react-bootstrap";
import WayTable from "../components/tables/WayTable";
import {Navigate} from "react-router-dom";
import VoyageTable from "../components/tables/VoyageTable";
import BookingTable from "../components/tables/BookingTable";
import {useAppSelector} from "../hooks/useRedux";

const Admin = () => {
    const user = useAppSelector(state=> state.auth.user)
    const [table, setTable] = useState<'way' | 'voyage' | 'booking' | 'null'>('null')

    if (!user) return <Navigate to="/" replace />

    return (
        <Container>
            <Stack className={"my-5"}><h1>Панель управления</h1></Stack>
            <Stack direction={"horizontal"} gap={3}>
                <Button variant={"primary"} onClick={() => setTable('way')}>Маршруты</Button>
                <Button variant={"primary"} onClick={() => setTable('voyage')}>Рейсы</Button>
                <Button variant={"outline-primary"} className={"ms-auto"} onClick={() => setTable('booking')}>Бронирование билетов</Button>
            </Stack><hr/>

            {table === 'null' && <h3 className={"text-center"}>Выберите категорию</h3>}
            {table === 'way' && <WayTable />}
            {table === 'voyage' && <VoyageTable />}
            {table === 'booking' && <BookingTable />}
        </Container>
    );
};

export default Admin;