import React from 'react'

const Alert = (props) => {
    const capitalize= (word) => {
        if(word==="danger"){
            word= "Error";
        const lower = word.toLowerCase();
        return lower.charAt(0).toUpperCase() + lower.slice(1);
    }}
    return (
        <div style={{height: "50px"}}>
            {props.alert && <div className={`alert alert-${props.alert.type} alert-dismissable fade show`} role="alert">
                <strong>{capitalize(props.alert.type)}</strong>: {props.alert.message}
                {props.message}
                </div>}
        </div>
    )
}

export default Alert
