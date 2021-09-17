import classnames from 'classnames'
import React, {useEffect, useState} from 'react'
import style from './Input.module.scss'
import './Input.module.scss'
import {InputProps} from "../../types";

const Input: React.FC<InputProps> = ({
                                         touched,
                                         onChange,
                                         onBlur,
                                         type = 'email',
                                         inputError,
                                         value,
                                         id,
                                         name,
                                         setInputValue,
                                         autoComplete = 'off',
                                         avatar =""
                                     }) => {
    return (
        <div className={style.wrap}>
            <label className={style.label} htmlFor={name}>{name}</label>
            <input
                type={type}
                id={id}
                className={classnames(style.input, (inputError && touched) ? style.borderError:null)}
                value={value}
                name={name}
                placeholder={`Enter your ${name.toLowerCase()}`}
                onChange={onChange}
                autoComplete={autoComplete}
                onBlur={onBlur}
            />
            <div className={style.errorMessage}>
                {inputError && touched ? inputError: null}
            </div>
        </div>
    )
}

export default Input;