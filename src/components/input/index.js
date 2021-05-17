import React from 'react';

const Input = (props) => {
    const { label, value, changeText, minValue, controlled } = props;
    const onTextChange = (event)=> {
        changeText(event.target.value);
    }
    return (
        <div className="form-group">
            <label>{label}</label>
            <input type="number" className="form-control" {...(controlled ? {value} : {defaultValue: value})} onChange={onTextChange} min={minValue}/>
        </div>
    );
}

export default Input