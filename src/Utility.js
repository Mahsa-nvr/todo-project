import React from 'react';


export function HandleChange(e) {
    const {name, value} = e.target;
    this.setState({
        [name]: value
    })
}


export const Icon = (props) => {
    const {icon, className, ...other} = props;
    return (
        <i {...other} className={`fa fa-${icon} ${className}`}/>
    )
}