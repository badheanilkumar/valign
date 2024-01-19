// App.js
import React, { useState } from 'react';
import { Tree, TreeNode } from 'react-organizational-chart';
import styled from 'styled-components';
import IndividualForm from './IndividualForm';
import CompanyForm from './CompanyForm';

const App = () => {
    const [showIndividualForm, setShowIndividualForm] = useState(false);
    const [showCompanyForm, setShowCompanyForm] = useState(false);
    const [companyFormData, setCompanyFormData] = useState([]);

    const [updatedJsonData, setUpdatedJsonData] = useState({
        "AB Company": []
    });

    const [updatedL3JsonData, setUpdatedL3JsonData] = useState({
        "A Company": []
    });

    const [jsonData, setJsonData] = useState({
        "ABC Company": [
            { "name": "Individual" },
            { "name": "Company" }
        ]
    });

    const [abCompanyCreated, setABCompanyCreated] = useState(false);

    const generateTreeNodes = (data) => {
        if (!data || data.length === 0) {
            return null;
        }


        return data.map((item, index) => (
            <TreeNode key={index} label={<StyledNode>
                <button onClick={() => handleButtonClick(item.name)}>{item.name}</button>
            </StyledNode>}>
                {item.children && generateTreeNodes(item.children)}
            </TreeNode>
        ));
    };

    const handleButtonClick = (buttonName) => {
        if (buttonName === 'Individual') {
            setShowIndividualForm(true);
            setShowCompanyForm(false);
        } else if (buttonName === 'Company') {
            setShowIndividualForm(false);
            setShowCompanyForm(true);
        }
    };

    const handleCompanyFormSubmit = (formData) => {
        // Extract relevant data from formData
        const { textFiled, selectedCities } = formData;

        // Create a new company node
        const newCompanyNode = {
            "name": textFiled,
            "children": selectedCities.map(city => ({ "name": city.name }))
        };

        if (!abCompanyCreated) {
            // If "AB Company" hasn't been created, create it
            setUpdatedJsonData({
                "AB Company": [newCompanyNode]
            });

            // Set the flag to indicate that "AB Company" has been created
            setABCompanyCreated(true);
        } else {
            // If "AB Company" has been created, add to "A Company"
            setUpdatedL3JsonData((prevData) => ({
                "A Company": [...prevData["A Company"], newCompanyNode]
            }));
        }

        // Update the companyFormData state
        setCompanyFormData((prevData) => [...prevData, formData]);
        setShowCompanyForm(false);
    };

    return (
        <>
            <Tree
                lineWidth={'2px'}
                lineColor={'green'}
                lineBorderRadius={'10px'}
                label={<StyledNode>ABC Company</StyledNode>}
            >
                {generateTreeNodes(jsonData["ABC Company"])}
            </Tree>

            {showIndividualForm && <IndividualForm />}
            {showCompanyForm && <CompanyForm onFormSubmit={handleCompanyFormSubmit} />}

            {companyFormData.length > 0 && (
                <>
                    <Tree
                        lineWidth={'2px'}
                        lineColor={'blue'}
                        lineBorderRadius={'10px'}
                        label={<StyledNode>Company Data (AB Company)</StyledNode>}
                    >
                        {generateTreeNodes(updatedJsonData["AB Company"])}
                    </Tree>

                    {abCompanyCreated && (
                        <Tree
                            lineWidth={'2px'}
                            lineColor={'red'}
                            lineBorderRadius={'10px'}
                            label={<StyledNode>Company Data (A Company)</StyledNode>}
                        >
                            {generateTreeNodes(updatedL3JsonData["A Company"])}
                        </Tree>
                    )}
                </>
            )}
        </>
    );
};

const StyledNode = styled.div`
  padding: 5px;
`;

export default App;
