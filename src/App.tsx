import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import Header from './Components/Header';
import Footer from './Components/Footer';
import DismissableAlert from './Components/DismissableAlert';
import './App.scss';
import Article from './Components/Article';
import Spacer from './Components/Spacer';
import {fetchSchools} from './Components/Requests/SchoolsApi';
import SortableGrid from './Components/SortableGrid';

function App() {
    const schoolIDs = [
        '609759',
        '609720',
        '609695',
        '609738',
        '609704',
        '609739',
        '609755',
        '609740',
        '609727',
        '609679'
    ]

    const myObj : {
        [key : string] : any
    } = {}

    const [schools,
        setSchools] = React.useState();

    React.useEffect(() => {
        try {
            fetchSchools(schoolIDs)
                .then(data => {
                return data
            })
                .then((result) => {
                    setSchools(result);
                    return result;
                });
        } catch (e) {
            console.log(e);
        }
    }, []);


    return (
        <div className="app">
            {schools !== undefined && <Container fluid>
                <Row>
                    <Header/>
                </Row>

                <Row>
                    <DismissableAlert
                        messageStr={'Schools will be closed on Memorial Day, Monday, May 28, 2018.'}></DismissableAlert>
                </Row>

                <Spacer/>

                <div className={'articles'}>
                    <Row>
                        <Col>
                            <Article schoolID='609759' schoolData={schools ![609759]}/>
                        </Col>

                        <Col>
                            <Article schoolID='609720' schoolData={schools ![609720]}/>
                        </Col>

                        <Col>
                            <Article schoolID='609738' schoolData={schools ![609738]}/>
                        </Col>
                    </Row>
                </div>

                <Spacer/>
                <SortableGrid schoolDataList={schools || {}}/>
            </Container>
            }
            <Footer/>
        </div>
    );
}

export default App;
