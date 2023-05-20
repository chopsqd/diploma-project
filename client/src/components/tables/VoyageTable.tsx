import React, {useState} from 'react';
import {Button, Spinner, Table} from "react-bootstrap";
import {useMutation, useQuery} from "@apollo/client";
import {CREATE_VOYAGE, DELETE_VOYAGE, FETCH_VOYAGES_QUERY, UPDATE_VOYAGES_QUERY} from "../../gql/voyages";
import Alert from "../Alert";
import {IVoyage} from "../../types/voyages";
import EditButton from "../buttons/EditButton";
import DeleteButton from "../buttons/DeleteButton";
import VoyageModal from "../modals/VoyageModal";
import {parseData} from "../../utils/parseData";
import {FETCH_WAYS_QUERY} from "../../gql/ways";

const VoyageTable = () => {
    const [isVisible, setIsVisible] = useState<boolean>(false)
    const [isEdit, setIsEdit] = useState<boolean>(false)
    const [formValues, setFormValues] = useState<any>({})

    const {loading: loadingR, data: {getVoyages: voyages} = {}, error: errorR} = useQuery(FETCH_VOYAGES_QUERY)

    const [update, { loading: loadingU, error: errorU }] = useMutation(UPDATE_VOYAGES_QUERY, {
        variables: {...formValues, ...parseData(formValues.from, formValues.to, formValues.fromCode, formValues.toCode)},
        update() {
            setIsVisible(false)
            setFormValues({})
        },
        refetchQueries: [
            {query: FETCH_VOYAGES_QUERY}
        ]
    })

    const [deleteVoyage, {loading: loadingD, error: errorD}] = useMutation(DELETE_VOYAGE, {
        refetchQueries: [
            {query: FETCH_WAYS_QUERY}
        ]
    })

    const [createVoyage, {loading: loadingC, error: errorC}] = useMutation(CREATE_VOYAGE, {
        variables: {...formValues, ...parseData(formValues.from, formValues.to, formValues.fromCode, formValues.toCode)},
        update() {
            setIsVisible(false)
            setFormValues({})
        },
        refetchQueries: [
            {query: FETCH_VOYAGES_QUERY}
        ]
    })

    if (loadingC || loadingR || loadingU || loadingD) return <Spinner animation="border" variant="primary" className={"mt-3"}/>
    if(errorC || errorR || errorU || errorD) return <Alert message={`Произошла ошибка: ${errorC || errorR || errorU || errorD}`}/>

    return (
        <>
            <Table striped bordered hover>
                <thead>
                <tr>
                    <th>Откуда</th>
                    <th>Куда</th>
                    <th>Отправление</th>
                    <th>Прибытие</th>
                    <th>Время в пути</th>
                    <th></th>
                </tr>
                </thead>
                <tbody>
                {voyages.map((voyage: IVoyage) => {
                    const [from, to] = voyage.title.split('->');
                    const [fromCode, toCode] = voyage.name.split('->');

                    return <tr key={voyage.title}>
                        <td>{from}</td>
                        <td>{to}</td>
                        <td>{voyage.data.startTime}</td>
                        <td>{voyage.data.endTime}</td>
                        <td>{voyage.data.wayTime}</td>
                        <td><EditButton onClick={(): void => {
                            setIsEdit(true)
                            setIsVisible(true)
                            setFormValues({voyageId: voyage.id, from: from, to: to, fromCode: fromCode, toCode: toCode, createInput: {...voyage.data}})
                        }} /></td>
                        <td><DeleteButton onClick={(): void => {
                            if(window.confirm('Удалить рейс?')) {
                                deleteVoyage({variables: {voyageId: voyage.id}})
                            }
                        }} /></td>
                    </tr>
                })}
                </tbody>
            </Table>

            {!isVisible && <Button variant={"success"} onClick={(): void => {
                setIsEdit(false)
                setIsVisible(true)
            }}>Добавить рейс</Button>}

            {isVisible && <VoyageModal isVisible={isVisible} setIsVisible={setIsVisible} isEdit={isEdit} formValues={formValues} setFormValues={setFormValues} update={update} create={createVoyage}/>}
        </>
    );
};

export default VoyageTable;