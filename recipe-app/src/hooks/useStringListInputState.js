import {useState} from "react";

export default initialValue => {
    const [values, setValues] = useState(initialValue);

    const addBlankValue = (e) => {
        e.preventDefault();
        setValues([...values, ""]);
    }

    const handleChange = (e, idx) => {
        e.preventDefault();
        setValues([...values.slice(0, idx), e.target.value, ...values.slice(idx + 1)]);
    }

    const removeValue = (e, idx) => {
        e.preventDefault();
        setValues([...values.slice(0, idx), ...values.slice(idx + 1)]);
    }

    const reset = () => {
        setValues([]);
    }

    return [values, addBlankValue, handleChange, removeValue, reset];
};