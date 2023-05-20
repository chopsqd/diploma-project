import React, {useEffect, useState} from 'react';
import {Button, Card, Form, Modal, Stack} from "react-bootstrap";
import {IInputData, IStopData, IVoyageModalProps} from "../../types/voyages";
import DeleteButton from "../buttons/DeleteButton";
import AddButton from "../buttons/AddButton";

const VoyageModal = ({isVisible, setIsVisible, isEdit, formValues, setFormValues, update, create}: IVoyageModalProps) => {
    const [stopObj, setStopObj] = useState<IStopData>({} as IStopData)
    const [stopObjArray, setStopObjArray] = useState<IStopData[]>([] as IStopData[])
    const [isBtnDisabled, setIsBtnDisabled] = useState<boolean>(true)

    const [data, setData] = useState<IInputData>({} as IInputData)

    useEffect(() => {
        setData({...data, ...formValues.createInput})
        if(formValues.createInput && formValues.createInput.stops) {
            setStopObjArray(formValues.createInput.stops)
        } else {
            setStopObjArray([])
        }

    }, [])

    return (
        <Modal show={isVisible} onHide={(): void => {
            setIsVisible(false)
            setFormValues({})
        }}>
            <Modal.Header closeButton>
                <Modal.Title>{isEdit ? 'Редактирование' : 'Добавление'} рейса</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Stack direction={"horizontal"} gap={5}>
                    <Form.Group className="mb-3">
                        <Form.Label>Откуда</Form.Label>
                        <Form.Control
                            type="text"
                            name="from"
                            onChange={(event: React.ChangeEvent<HTMLInputElement>) => setFormValues({...formValues, [event.target.name]: event.target.value})}
                            value={formValues.from || ''}
                            required
                        />
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>Куда</Form.Label>
                        <Form.Control
                            type="text"
                            name="to"
                            onChange={(event: React.ChangeEvent<HTMLInputElement>) => setFormValues({...formValues, [event.target.name]: event.target.value})}
                            value={formValues.to || ''}
                            required
                        />
                    </Form.Group>
                </Stack>
                <Stack direction={"horizontal"} gap={5}>
                    <Form.Group className="mb-3">
                        <Form.Label>Откуда-код</Form.Label>
                        <Form.Control
                            type="text"
                            name="toCode"
                            onChange={(event: React.ChangeEvent<HTMLInputElement>) => setFormValues({...formValues, [event.target.name]: event.target.value})}
                            value={formValues.toCode || ''}
                            required
                        />
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>Куда-код</Form.Label>
                        <Form.Control
                            type="text"
                            name="fromCode"
                            onChange={(event: React.ChangeEvent<HTMLInputElement>) => setFormValues({...formValues, [event.target.name]: event.target.value})}
                            value={formValues.fromCode || ''}
                            required
                        />
                    </Form.Group>
                </Stack>
                <Stack direction={"horizontal"} gap={5}>
                    <Form.Group className="mb-3">
                        <Form.Label>Отправление</Form.Label>
                        <Form.Control
                            type="text"
                            name={"startTime"}
                            onChange={(event: React.ChangeEvent<HTMLInputElement>) => setData({...data, [event.target.name]: event.target.value})}
                            value={data.startTime || ''}
                            required
                        />
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>Прибытие</Form.Label>
                        <Form.Control
                            type="text"
                            name={"endTime"}
                            onChange={(event: React.ChangeEvent<HTMLInputElement>) => setData({...data, [event.target.name]: event.target.value})}
                            value={data.endTime || ''}
                            required
                        />
                    </Form.Group>
                </Stack>
                <Stack direction={"horizontal"} gap={5}>
                    <Form.Group className="mb-3">
                        <Form.Label>Время в пути</Form.Label>
                        <Form.Control
                            type="text"
                            name={"wayTime"}
                            onChange={(event: React.ChangeEvent<HTMLInputElement>) => setData({...data, [event.target.name]: event.target.value})}
                            value={data.wayTime || ''}
                            required
                        />
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>Регулярность</Form.Label>
                        <Form.Control
                            type="text"
                            name={"days"}
                            onChange={(event: React.ChangeEvent<HTMLInputElement>) => setData({...data, [event.target.name]: event.target.value})}
                            value={data.days || ''}
                            required
                        />
                    </Form.Group>
                </Stack>
                <Stack direction={"horizontal"} gap={5}>
                    <Form.Group className="mb-3">
                        <Form.Label>Стоимость</Form.Label>
                        <Form.Control
                            type="number"
                            name={"price"}
                            onChange={(event: React.ChangeEvent<HTMLInputElement>) => setData({...data, [event.target.name]: event.target.value})}
                            value={data.price || ''}
                            required
                        />
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>Количество мест</Form.Label>
                        <Form.Control
                            type="number"
                            name={"placesCount"}
                            onChange={(event: React.ChangeEvent<HTMLInputElement>) => setData({...data, [event.target.name]: Number(event.target.value)})}
                            value={data.placesCount || ''}
                            required
                        />
                    </Form.Group>
                </Stack>
                <Stack direction={"horizontal"} gap={5}>
                    <Form.Group className="mb-3">
                        <Form.Label>Станция отправления</Form.Label>
                        <Form.Control
                            type="text"
                            name={"fromStation"}
                            onChange={(event: React.ChangeEvent<HTMLInputElement>) => setData({...data, [event.target.name]: event.target.value})}
                            value={data.fromStation || ''}
                            required
                        />
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>Станция прибытия</Form.Label>
                        <Form.Control
                            type="text"
                            name={"toStation"}
                            onChange={(event: React.ChangeEvent<HTMLInputElement>) => setData({...data, [event.target.name]: event.target.value})}
                            value={data.toStation || ''}
                            required
                        />
                    </Form.Group>
                </Stack>
                <Form.Group className="mb-3">
                    <Form.Label>Информация об автобусе</Form.Label>
                    <Form.Control
                        type="text"
                        name={"busInfo"}
                        onChange={(event: React.ChangeEvent<HTMLInputElement>) => setData({...data, [event.target.name]: event.target.value})}
                        value={data.busInfo || ''}
                        required
                    />
                </Form.Group>
                <Stack direction={"horizontal"} className={"justify-content-between pb-2"}>
                    <Form.Label>Остановки</Form.Label>
                </Stack>
                <Card>
                    <Card.Body>
                        {stopObjArray ?stopObjArray.map((stop: any) => <Stack key={stop.name} direction={"horizontal"} gap={1} className={"mb-2"}>
                            <Form.Control
                                type="text"
                                disabled
                                value={stop.name}
                            />
                            <Form.Control
                                type="text"
                                disabled
                                value={stop.time}
                            />
                            <DeleteButton onClick={() => setStopObjArray(prevState => prevState.filter(item => item.name !== stop.name))}/>
                        </Stack>) : <></>}

                        <Stack direction={"horizontal"} gap={1}>
                            <Form.Control
                                type="text"
                                name={"name"}
                                placeholder={"Остановка"}
                                onChange={(event: React.ChangeEvent<HTMLInputElement>) => setStopObj({...stopObj, [event.target.name]: event.target.value})}
                                value={stopObj.name || ''}
                                required
                            />
                            <Form.Control
                                type="text"
                                name={"time"}
                                placeholder={"Время"}
                                onChange={(event: React.ChangeEvent<HTMLInputElement>) => setStopObj({...stopObj, [event.target.name]: event.target.value})}
                                value={stopObj.time || ''}
                                required
                            />
                            <AddButton disabled={!stopObj.name || !stopObj.time} onClick={(): void => {
                                setStopObjArray([...stopObjArray, stopObj])
                                setStopObj({time: '', name: ''})
                            }}/>
                        </Stack>
                    </Card.Body>
                </Card>
            </Modal.Body>
            <Modal.Footer className={"d-flex justify-content-between"}>
                <Button variant="danger" onClick={(): void => {
                    setIsVisible(false)
                    setFormValues({})
                }}>Закрыть</Button>
                {isEdit
                    ? <>
                        <Button variant="info" onClick={(): void => {
                            setFormValues({...formValues, createInput: {...formValues.createInput, ...data, stops: stopObjArray}})
                            setIsBtnDisabled(false)
                        }}>Изменить</Button>
                        <Button disabled={isBtnDisabled} variant="success" onClick={(): void => {
                            update()
                        }}>Сохранить</Button>
                    </>
                    : <>
                        <Button variant="info" onClick={(): void => {
                            setFormValues({...formValues, createInput: {...formValues.createInput, ...data, stops: stopObjArray, places: []}})
                            setIsBtnDisabled(false)
                        }}>Сохранить</Button>
                        <Button disabled={isBtnDisabled} variant="success" onClick={(): void => {
                            create()
                        }}>Добавить</Button>
                    </>
                }
            </Modal.Footer>
        </Modal>
    );
};


export default VoyageModal;