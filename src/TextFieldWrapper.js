import React from 'react';
import styled from "styled-components";



const TextFieldWrapper = () => {


    return(
        <div>

            <input type={"text"} style={StyledNode}/>
        </div>
    )
}


const StyledNode = styled.div`
  padding: 5px;
  border-radius: 8px;
  display: inline-block;
  border: 1px solid red;
`;


export default TextFieldWrapper;