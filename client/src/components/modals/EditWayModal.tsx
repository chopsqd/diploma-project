import React from 'react';
import {Button, Form, Modal} from "react-bootstrap";
import {IEditWayModalProps} from "../../types/ways";

const EditWayModal = ({showEditModal, setShowEditModal, update, formValues, setFormValues}: IEditWayModalProps) => {
    return (
        <Modal show={showEditModal} onHide={(): void => {
            setShowEditModal(false)
        }}>
            <Modal.Header closeButton>
                <Modal.Title>Редактирование маршрута</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form.Group className="mb-3">
                    <Form.Label>Откуда</Form.Label>
                    <Form.Control
                        type="text"
                        onChange={(event) => setFormValues({ ...formValues, from: event.target.value })}
                        value={formValues.from}
                        required
                    />
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label>Куда</Form.Label>
                    <Form.Control
                        type="text"
                        onChange={(event) => setFormValues({ ...formValues, to: event.target.value })}
                        value={formValues.to}
                        required
                    />
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label>Откуда-код</Form.Label>
                    <Form.Control
                        type="text"
                        onChange={(event) => setFormValues({ ...formValues, fromCode: event.target.value })}
                        value={formValues.fromCode}
                        required
                    />
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label>Куда-код</Form.Label>
                    <Form.Control
                        type="text"
                        onChange={(event) => setFormValues({ ...formValues, toCode: event.target.value })}
                        value={formValues.toCode}
                        required
                    />
                </Form.Group>
            </Modal.Body>
            <Modal.Footer className={"d-flex justify-content-between"}>
                <Button variant="danger" onClick={() => {setShowEditModal(false)}}>Закрыть</Button>
                <Button variant="success" onClick={() => update()}>Сохранить</Button>
            </Modal.Footer>
        </Modal>
    );
};



export default EditWayModal;