import React from 'react';
import Table from 'react-bootstrap/Table';
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';
import './styles/SortableGrid.scss';

interface Props {
    schoolDataList : {
        [key : string]: any
    };
}

const SortableGrid : React.FC < Props > = ({schoolDataList} : Props) => {
    const defaultSort : any = 'StudentCount';

    const [selectedSortOption,
        setSelectedSortOption] = React.useState({
        option: defaultSort,
        data: Object
            .keys(schoolDataList)
            .map((item : any) => {
                return schoolDataList[item]
            })
            .sort((a, b) => {
                return a[defaultSort] - b[defaultSort]
            })
    });

    const onSelect = ((ev : any) => {
        let temp;

        if (ev === "SchoolShortName") {
            temp = selectedSortOption
                .data
                .sort(function (a, b) {
                    if (a[ev] < b[ev]) {
                        return -1;
                    }
                    if (a[ev] > b[ev]) {
                        return 1;
                    }
                    return 0;
                })
        } else {
            temp = selectedSortOption
                .data
                .sort((a : any, b : any) => a[ev] - b[ev])
        }

        setSelectedSortOption({option: ev, data: temp});
    });

    return (
        <div className='sortableGrid'>
            <div className={'sortSection'}>
                <span className='sortLabel'>Sort:</span>
                <DropdownButton
                    id="dropdown-basic-button"
                    title={selectedSortOption.option}
                    onSelect={(ev) => onSelect(ev)}>
                    <Dropdown.Item eventKey="SchoolID">School ID</Dropdown.Item>
                    <Dropdown.Item eventKey="SchoolShortName">School Name</Dropdown.Item>
                    <Dropdown.Item eventKey="StudentCount">Student Count</Dropdown.Item>
                </DropdownButton>
            </div>

            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>School ID</th>
                        <th>School Name</th>
                        <th>Student Count</th>
                    </tr>
                </thead>
                <tbody>
                    {selectedSortOption
                        .data
                        .map((item : any, index : number) => {
                            return <tr key={`grid-item-school-${index}`}>
                                <td>{item.SchoolID}</td>
                                <td>{item.SchoolShortName}</td>
                                <td>{item.StudentCount}</td>
                            </tr>
                        })}
                </tbody>
            </Table>
        </div>
    );
};

export default SortableGrid;