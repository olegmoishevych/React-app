import React from 'react';
import s from './Registration.module.css'
import {Button, Paper, TextField} from "@mui/material";
import {InputPasswordMui} from "../../components/regisrationInputComponent/InputPasswordMui";
import {useFormik} from "formik";
import {useDispatch} from "react-redux";
import {SingUpTC} from "../../redux/auth-reducer";
import {AppDispatch} from "../../redux/store";

export type dataFormType = {
    email?: string
    password?: string
    currPassword?: string
}


export const Registration = () => {

    const dispatch = useDispatch<AppDispatch>()

    const formik = useFormik({
        initialValues: {
            email: '',
            password: '',
            currPassword: '',
        },
        onSubmit: values => {
            dispatch(SingUpTC(values))
        },
        validate(values) {

            const errors: dataFormType = {}

            if (values.password !== values.currPassword) {
                errors.currPassword = 'Confirmed password should match the password'
            }
            if (!values.password) {
                errors.password = 'Password required'
            }
            if (!values.currPassword) {
                errors.currPassword = 'Confirm password required'
            }
            if (!values.email) {
                errors.email = 'Email required'
            } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
                errors.email = 'Invalid email address'
            }
            return errors
        }
    });

    return (
        <form onSubmit={formik.handleSubmit}>
            <div className={s.mainContainer}>
                <Paper elevation={2}>
                    <div className={s.content}>
                        <h1 className={s.title}>Sing Up</h1>
                        <div className={s.groupInputs}>
                            <TextField className={s.input} label='Email' {...formik.getFieldProps('email')}
                                       variant="standard" value={formik.values.email}/>
                            {formik.errors.email && formik.touched.email ?
                                <div className={s.errorText}>{formik.errors.email}</div> : <br/>}

                            <InputPasswordMui name={"password"} title={'Password'} valuePassword={formik.values.password}
                                              onChange={formik.handleChange}
                                              restFormikProps={formik.getFieldProps('password')}/>
                            {formik.errors.password && formik.touched.password ?
                                <div className={s.errorText}>{formik.errors.password}</div> : <br/>}

                            <InputPasswordMui name={"currPassword"} title={'Confirm password'}
                                              valuePassword={formik.values.currPassword}
                                              onChange={formik.handleChange}
                                              restFormikProps={formik.getFieldProps('currPassword')}
                            />
                            {formik.errors.currPassword && formik.touched.currPassword ?
                                <div className={s.errorText}>{formik.errors.currPassword}</div> : <br/>}

                        </div>
                        <Button type="submit" className={s.button}>Sing Up</Button>
                        <h3 className={s.textInfo}>Already have an account?</h3>
                        <a href="#" className={s.singIn}>Sing In</a>
                    </div>
                </Paper>
            </div>
        </form>
    );
};

