import classnames from 'classnames'
import React from 'react'
import style from './Button.module.scss'
import './Button.module.scss'

interface ButtonProps {
    color?: string;
    type: 'button' | 'submit';
    disabled?: boolean;
    size?: 'small' | 'large';
}

const Button: React.FC<ButtonProps> = ({color = 'primary', children, size="small", disabled, type = 'submit'}) => {
    
    return (
        <button disabled={disabled} type={type}
                className={classnames(style.button, style[color], style.size, disabled ? style.disableButton : null)}>{children}</button>
    )
}

export default Button;
