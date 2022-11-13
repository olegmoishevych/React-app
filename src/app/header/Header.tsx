import React from 'react';
import {NavLink} from "react-router-dom";
import style from './Header.module.css'

export const Header = () => {

    const isActiveLink = (param: any) => {
        return {color: param.isActive ? 'red' : 'black'}}

    return (
        <div className={style.wrapper}>
            <div>
                <NavLink to={'/login'}
                          style={isActiveLink}>login</NavLink></div>
            <div>
                <NavLink
                to={'/registration'}
                style={isActiveLink}>registration</NavLink></div>
            <div>
                <NavLink
                    to={'/profile'}
                    style={isActiveLink}>profile</NavLink></div>
            <div>
                <NavLink
                    to={'/password'}
                    style={isActiveLink}>password_recovery</NavLink>
            </div>
            <div>
                <NavLink
                    to={'/entered'}
                    style={isActiveLink}>entering a new passwordy</NavLink>
            </div>
            <div>
                <NavLink
                    to={'/test'}
                    style={isActiveLink}>test</NavLink>
            </div>
        </div>
    );
};