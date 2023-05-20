import React, {useState} from 'react';
import {Button, Form, Spinner, Table} from "react-bootstrap";
import {useMutation, useQuery} from "@apollo/client";
import Alert from "../Alert";
import DeleteButton from "../buttons/DeleteButton";
import EditButton from "../buttons/EditButton";
import AddButton from "../buttons/AddButton";
import CloseButton from "../buttons/CloseButton";
import EditWayModal from "../modals/EditWayModal";
import {CREATE_WAY, DELETE_WAY, FETCH_WAYS_QUERY, UPDATE_WAY} from "../../gql/ways";
import {IWay, IWayFormValues} from "../../types/ways";
import {parseData} from "../../utils/parseData";

const WayTable = () => {
    const [isVisible, setIsVisible] = useState<boolean>(false)
    const [showEditModal, setShowEditModal] = useState<boolean>(false);
    const [editWay, setEditWay] = useState<IWay>({} as IWay)
    const [formValues, setFormValues] = useState<IWayFormValues>({from: '', to: '', fromCode: '', toCode: ''})

    const {loading: loadingR, data: {getWays: ways} = {}, error: errorR} = useQuery(FETCH_WAYS_QUERY)

    const [createWay, {loading: loadingC, error: errorC}] = useMutation(CREATE_WAY, {
        variables: parseData(formValues.from, formValues.to, formValues.fromCode, formValues.toCode),
        update() {
            setFormValues({from: '', to: '', fromCode: '', toCode: ''})
            setIsVisible(false)
        },
        refetchQueries: [
            {query: FETCH_WAYS_QUERY}
        ]
    })

    const [update, { loading: loadingU, error: errorU }] = useMutation(UPDATE_WAY, {
        variables: {wayId: editWay.id, ...parseData(formValues.from, formValues.to, formValues.fromCode, formValues.toCode)},
        update() {
            setFormValues({from: '', to: '', fromCode: '', toCode: ''})
            setShowEditModal(false)
            setEditWay({} as IWay)
        },
        refetchQueries: [
            {query: FETCH_WAYS_QUERY}
        ]
    })

    const [deleteWay, {loading: loadingD, error: errorD}] = useMutation(DELETE_WAY, {
        refetchQueries: [
            {query: FETCH_WAYS_QUERY}
        ]
    })

    const handleEditClick = (way: IWay): void => {
        const [from, to] = way.title.split('->');
        const [fromCode, toCode] = way.name.split('->');
        setFormValues({from: from, to: to, fromCode: fromCode, toCode: toCode})
        setShowEditModal(true);
        setEditWay(way)
    }

    if (loadingC || loadingR || loadingU || loadingD) return <Spinner animation="border" variant="primary" className={"mt-3"}/>
    if (errorC || errorR || errorU || errorD) return <Alert message={`Произошла ошибка: ${errorC || errorR || errorU || errorD}`}/>

    return (<>
            <Table striped bordered hover>
                <thead>
                <tr>
                    <th>#</th>
                    <th>Откуда</th>
                    <th>Куда</th>
                    <th></th>
                    <th></th>
                </tr>
                </thead>
                <tbody>
                {ways && ways.map((way: IWay, index: number) => {
                    const [from, to] = way.title.split('->');

                    return <tr key={way.title}>
                        <td>{index + 1}</td>
                        <td>{from}</td>
                        <td>{to}</td>
                        <td><EditButton onClick={() => handleEditClick(way)} /></td>
                        <td><DeleteButton onClick={() => {
                            if(window.confirm('Удалить маршрут?')) {
                                deleteWay({variables: {wayId: way.id}})
                                // ways.filter((wayId) => wayId !== way.id)
                            }
                        }} /></td>
                    </tr>
                })
                }
                {isVisible && <><tr>
                    <td>#</td>
                    <td>
                        <Form.Control
                            type="text"
                            placeholder="Откуда"
                            onChange={(event) => setFormValues({ ...formValues, from: event.target.value })}
                            value={formValues.from}
                            required
                        />
                    </td>
                    <td>
                        <Form.Control
                            type="text"
                            placeholder="Куда"
                            onChange={(event) => setFormValues({ ...formValues, to: event.target.value })}
                            value={formValues.to}
                            required
                        />
                    </td>
                    <td><AddButton onClick={() => createWay()} /></td>
                    <td><CloseButton onClick={(): void => {
                        setFormValues({from: '', to: '', fromCode: '', toCode: ''})
                        setIsVisible(false)
                    }}/></td>
                </tr>
                    <tr>
                        <td>Код</td>
                        <td>
                            <Form.Control
                                type="text"
                                placeholder="From-code"
                                onChange={(event) => setFormValues({ ...formValues, fromCode: event.target.value })}
                                value={formValues.fromCode}
                                required
                            />
                        </td>
                        <td>
                            <Form.Control
                                type="text"
                                placeholder="To-code"
                                onChange={(event) => setFormValues({ ...formValues, toCode: event.target.value })}
                                value={formValues.toCode}
                                required
                            />
                        </td>
                    </tr></>}
                </tbody>
            </Table>
            {!isVisible && <Button variant={"success"} onClick={() => setIsVisible(true)}>Добавить маршрут</Button>}

            {showEditModal && <EditWayModal showEditModal={showEditModal} setShowEditModal={setShowEditModal} update={update} formValues={formValues} setFormValues={setFormValues}/>}
        </>
    );
};

export default WayTable;