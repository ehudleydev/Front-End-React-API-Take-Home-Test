import React from 'react';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Spinner from 'react-bootstrap/Spinner';

import LoadingSpinner from './LoadingSpinner';
import {fetchSchool} from './Requests/SchoolsApi';
import './styles/Article.scss';

interface Props {
    schoolID : string;
    schoolData? : any;
}

interface State {
    schoolShortName?: string
    phone?: string;
    addressStreet?: string;
    addressCity?: string;
    addressState?: string;
    addressZipCode?: string;
    introduction?: string;
    programTypes?: string[]
}

const Article : React.FC < Props > = ({schoolID, schoolData} : Props) => {
    let data : State = {
        schoolShortName: "",
        phone: "",
        addressStreet: "",
        addressCity: "",
        addressState: "",
        addressZipCode: "",
        introduction: "",
        programTypes: []
    } 
    
    const [school,
        setSchool] = React.useState(data);
    const [showModal,
        setShowModal] = React.useState(false);

    React.useEffect(() => {
        if (schoolData !== undefined) {
            try {
            const ProgramsTypes : any = {};
            schoolData?.Programs
                .forEach((item : any, index : number) => {
                    ProgramsTypes[item
                            ?.ProgramType || index] = item;
                });

            data = {
                schoolShortName: schoolData
                    ?.SchoolShortName || '',
                phone: schoolData
                    ?.Phone || '',
                addressStreet: schoolData
                    ?.AddressStreet,
                addressCity: schoolData
                    ?.AddressCity,
                addressState: schoolData
                    ?.AddressState,
                addressZipCode: schoolData
                    ?.AddressZipCode,
                introduction: String(schoolData
                    ?.Introduction).toString(),
                programTypes: Object.keys(ProgramsTypes)
            }
            setSchool(data);
        } catch (e) {
                 console.log(e)
           }
        }
    }, []);

    return (
        <div className={'article'}>
            <div
                style={{
                display: 'block',
                position: 'initial'
            }}>
                <Modal show={showModal} onHide={() => setShowModal(false)}>
                    <Modal.Header closeButton>
                        <Modal.Title>{school
                                ?.schoolShortName}</Modal.Title>
                    </Modal.Header>

                    <Modal.Dialog>
                        <Modal.Body>
                            <ul>
                                {school.programTypes !.map((item, index) => {
                                    return <li key={`program-types-list-${index}`}>{item}</li>
                                })}
                            </ul>
                        </Modal.Body>
                    </Modal.Dialog>
                </Modal>
            </div>

            <Card style={{
                width: '100%'
            }}>
                {schoolData === undefined ? <LoadingSpinner /> : <Card.Body>
                    <Card.Title>
                        <span>{school
                                ?.schoolShortName || ''}
                        </span>
                    </Card.Title>
                    <Card.Text>
                        <span>{school
                                ?.phone || ''}
                        </span>
                    </Card.Text>

                    <Card.Text>
                        <span>{school
                                ?.addressStreet || ''}
                        </span>

                        <span>, {school
                                ?.addressCity || ''}
                        </span>
                    </Card.Text>

                    <Card.Text>
                        <span>{school
                                ?.addressState || ''}
                        </span>

                        <span>, {school
                                ?.addressZipCode || ''}

                        </span>
                    </Card.Text>

                    <Card.Text>
                        <div
                            className='card-text-introduction'
                            dangerouslySetInnerHTML={{
                            __html: school
                                ?.introduction || ''
                        }}></div>
                    </Card.Text>
                    <Card.Footer >
                        <Button className='card-button' onClick={() => setShowModal(!showModal)}>Read More</Button>
                    </Card.Footer>
                </Card.Body >}
            </Card>
        </div>
    )
}

export default Article;