import React, {useState} from 'react';
import {useNavigate} from "react-router-dom";
import {useForm} from "../hooks/useForm";
import {ApolloError, useMutation} from "@apollo/client";
import {Button, Card, Container, Form, Spinner} from "react-bootstrap";
import Alert from "../components/Alert";
import {LOGIN_USER} from "../gql/manager";
import {useAppDispatch} from "../hooks/useRedux";
import {login} from "../store/slices/authSlice";

const Login = () => {
    const navigate = useNavigate();
    const dispatch = useAppDispatch()
    const [error, setError] = useState<string>('')
    const {onChange, onSubmit, formValues} = useForm(loginUserCallback, {
        username: '',
        password: ''
    })

    const [loginUser, {loading}] = useMutation(LOGIN_USER, {
        onError(error: ApolloError) {
            setError(error.graphQLErrors[0].message)
        },
        update(_, {data: {login: userData}}) {
            dispatch(login(userData))
            navigate("/admin")
        },
        variables: formValues
    })

    function loginUserCallback() {
        loginUser()
    }

    if(loading) return <Spinner animation="border" variant="primary" className={"mt-3"}/>

    return (
        <Container>
            <Card className={"mx-auto w-50 mt-5"}>
                <Card.Header as="h5">Авторизация</Card.Header>
                <Card.Body>
                    <Form onSubmit={onSubmit} className={"mb-3"}>
                        <Form.Group className="mb-3">
                            <Form.Label>Username</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Введите имя пользователя"
                                name={"username"}
                                required
                                onChange={onChange}
                            />
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Label>Password</Form.Label>
                            <Form.Control
                                type="password"
                                placeholder="Введите пароль"
                                name={"password"}
                                required
                                onChange={onChange}
                            />
                        </Form.Group>

                        <Button variant="primary" type={"submit"}>Войти</Button>
                    </Form>
                    {error && <Alert message={error} />}
                </Card.Body>
            </Card>
        </Container>
    );
};

export default Login;