import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Container} from "react-bootstrap";
import {Provider} from 'react-redux'
import {store} from './store'
import {Navigate, Route, Routes} from "react-router-dom";
import AuthRoute from "./utils/authRoute";
import NavBar from "./components/NavBar";
import {About, Admin, Contacts, Home, Login, TimeTable, TimeTableAll} from './pages'

const App = () => {
    return (
        <Provider store={store}>
            <NavBar />
            <Container>
                <Routes>
                    <Route path="/" element={<Home />}/>
                    <Route path="/about" element={<About />}/>
                    <Route path="/contacts" element={<Contacts />}/>
                    <Route path="/timetableAll" element={<TimeTableAll />}/>
                    <Route path="/timetable/:voyageId" element={<TimeTable />}/>
                    <Route path="/login" element={<Login />}/>
                    <Route path="/admin" element={
                        <AuthRoute>
                            <Admin />
                        </AuthRoute>
                    }/>
                    <Route path="*" element={<Navigate to="/" />}/>
                </Routes>
            </Container>
        </Provider>
    )
};

export default App;