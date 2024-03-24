import React from 'react'
import { ButtonProps } from '../types'

const Button: React.FC<ButtonProps> = ({ style, title, type, onClick}) => {
    return (
        <button 
            onClick={onClick}
            type={type} 
            className={`btn btn-ghost ${style}`}>
                {title}
        </button>
    )
}

export default Button