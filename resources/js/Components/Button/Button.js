import React from "react";
import "./Button.css";
import styled, {css} from "styled-components";

const Button = styled.button`
    outline: none;
    transition: all 0.3s ease-in-out;
    cursor: pointer;
    padding: 8px 20px;
    border-radius: 10px;
    color: white;
    border: none;
    text-transform: uppercase;
    line-height: 2;
    position: relative;
    text-decoration: none;
    
    background-color: ${props => props.primary
    ? 'var(--blue-primary)'
    : props.success
        ? 'var(--green-primary)'
        : props.error && 'var(--red-primary)'};
    
    ${props => props.small && css`
        padding: 5px 10px !important;
        font-size: 11px !important;
    `}
    
    &:hover {
      background-color: ${props => props.primary
    ? 'var(--blue-dark)'
    : props.success
        ? 'var(--green-dark)'
        : props.error && 'var(--red-dark)'};
    }
    
    &:disabled {
        background-color: #eee;
        color: #111 !important;
        cursor: not-allowed;
    }
    
    .fa {
      margin-right: 1rem;
    }
`

export default function ({children, onClick, className, loading, disabled, type, primary, success, error, small}) {
    return (
        <Button type={type ? type : 'button'}
                primary={primary}
                success={success}
                error={error}
                small={small}
                className={className}
                onClick={onClick}
                disabled={loading || disabled}>
            {loading && <i className="fa fa-spinner fa-spin"/>}
            {children}
        </Button>
    )
}