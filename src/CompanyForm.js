// CompanyForm.js
import React, {useEffect, useState} from 'react';
import { MultiSelect } from 'primereact/multiselect';
import ReactModal from 'react-modal';

const CompanyForm = ({ onFormSubmit }) => {

    const [disab, setDisab]= useState(false);
    const [formData, setFormData] = useState({
        companyName: '',
        registrationNumber: '',
        businessStructure: '',
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value
        }));

        if (formData.companyName === 'Sole Proprietorship') {
            setSelectedCities([{ name: 'Individual' }]);
            setDisab(true);
        } else{
            setDisab(false);
        }
    };

    const handleMultiSelectChange = (e) => {
        setSelectedCities(e.value);
    };

    const handleSubmit = () => {
        onFormSubmit({ formData, selectedCities });
    };

    const [selectedCities, setSelectedCities] = useState([]);
    const cities = [
        { name: 'Individual'},
        { name: 'Company'},
        { name: 'Trust'},
        { name: 'Invest'}
    ];

    const [isOpen, setIsOpen] = useState(false);

    return (
        <>

            <div>
                <button onClick={setIsOpen}>Open Modal</button>
                <ReactModal
                    isOpen={isOpen}
                    contentLabel="Example Modal"
                >
                    <div>
                        <h2>Company Form</h2>
                        <label>
                            Business Structure:
                            <input type="text" name="companyName" value={formData.companyName} onChange={handleInputChange} />
                        </label>
                        <br />
                        <label>
                            Registration Number:
                            <MultiSelect
                                disabled={disab}
                                value={selectedCities}
                                onChange={handleMultiSelectChange}
                                options={cities}
                                optionLabel="name"
                                placeholder="Select Cities"
                                maxSelectedLabels={3}
                                className="w-full md:w-20rem"
                            />
                        </label>
                        <br />
                        <button onClick={handleSubmit}>Submit</button>

                        {selectedCities && (
                            <div>
                                <h3>Selected Cities:</h3>
                                <ul>
                                    {selectedCities.map((city, index) => (
                                        <li key={index}>{city.name}</li>
                                    ))}
                                </ul>
                            </div>
                        )}
                    </div>

                    <button onClick={(e)=>setIsOpen(false)}>close</button>
                </ReactModal>
            </div>

        </>
    );
};

export default CompanyForm;
