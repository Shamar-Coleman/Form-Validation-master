import React, { useReducer } from 'react';
import styles from './Form.module.css';

const initialState = {
    firstName: {
        value: "",
        error: null
    },
    lastName: {
        value: "",
        error: null
    },
    email: {
        value: "",
        error: null
    },
    formValid: true
}

const reducer = (state, action) => {
    switch (action.type) {
        case 'firstName':
            return {
                ...state,
                firstName: {
                    value: action.payload,
                    error: action.valid
                }
            }
        case 'lastName':
            return {
                ...state,
                lastName: {
                    value: action.payload,
                    error: action.valid
                }
            }
        case 'email':
            return {
                ...state,
                email: {
                    value: action.payload,
                    error: action.valid
                }
            }
        case 'formValid':
            return {
                ...state,
                formValid: action.payload
            }
        default:
    }
}

export default () => {
    const [state,dispatch] = useReducer(reducer, initialState)

    
    const validation = () => {
        if (state.firstName.error !== null) {
            dispatch({
                type: 'formValid',
                payload: false
            })
        } else if (state.lastName.error !== null) {
            dispatch({
                type: 'formValid',
                payload: false
            })
        } else if (state.email.error !== null) {
            dispatch({
                type: 'formValid',
                payload: false
            })
        } else {
            dispatch({
                type: 'formValid',
                payload: true
            })
        }
    }

    const handleChange = (e) => {
        const {name,value} = e.target;

        switch (name) {
            case 'firstName':
                value.length<2
                ? dispatch({
                    type: name,
                    payload: value,
                    valid: "First name must be more than 2 characters"
                })
                : dispatch({
                    type: name,
                    payload: value,
                    valid: null
                })
                break;
            case 'lastName':
                value.length<2
                ? dispatch({
                    type: name,
                    payload: value,
                    valid: "Last name must more than 2 characters"
                })
                : dispatch({
                    type: name,
                    payload: value,
                    valid: null
                })
                break;
            case 'email':
                (/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(value))
                ? dispatch({
                    type: name,
                    payload: value,
                    valid: null
                })
                : dispatch({
                    type: name,
                    payload: value,
                    valid: "Invalid email address entered"
                })
                break;
            default:
        }
    }

    return (
        <div className={styles.form}>
            <form onSubmit={(e) => e.preventDefault()}>
                <div className={styles.inputGroup}>
                    <label>First name:</label>
                    <input type="text" name="firstName" onChange={handleChange}/>
                </div>
                {(state.firstName.error != null && state.formValid === false ) && (
                    <p className={styles.error}>{state.firstName.error}</p>
                )}
                <div className={styles.inputGroup}>
                    <label>Last Name:</label>
                    <input type="text" name="lastName" onChange={handleChange}/>
                </div>
                {(state.lastName.error != null && state.formValid === false ) && (
                    <p className={styles.error}>{state.lastName.error}</p>
                )}
                <div className={styles.inputGroup}>
                    <label>Email:</label>
                    <input type="text" name="email" onChange={handleChange}/>
                </div>
                {(state.email.error != null && state.formValid === false ) && (
                    <p className={styles.error}>{state.email.error}</p>
                )}
                <div className={styles.inputGroup}>
                <input type="submit" value="Submit" onClick={validation}/>
                </div>
            </form>
        </div>
    )
}
