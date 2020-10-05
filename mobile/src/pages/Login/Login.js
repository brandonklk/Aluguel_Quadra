import React, { useRef } from 'react';
import { View, Text, TextInput, TouchableOpacity } from 'react-native';
import { Formik } from 'formik';
import * as Yup from 'yup';

import api from '../../service/api';

import globalCSS from '../../globalCSS';
import loginCSS from './LoginCSS';

import i18n from '../../translation/translationMessage.json';

export default function Login() {
    const email = useRef(null);
    const password = useRef(null);

    const validationShema = Yup.object().shape({
        email: Yup.string().email(i18n.mailInvalid).required(i18n.fieldRequired),
        password: Yup.string().min(6, i18n.value6Min).max(12, i18n.value12Max).required(i18n.fieldRequired)
    });

    const formikInitialValues = ({
        email: '',
        password: ''
    });

    return (
        <Formik initialValues={{ formikInitialValues }} 
            onSubmit={ values => { values } }
            validationSchema={ validationShema }
        >

            {({ values, handleChange, handleSubmit, errors }) => (

                <View style={globalCSS.container}>

                    <Text>Login</Text>

                    <TextInput style={{ height: 40, borderColor: 'gray', borderWidth: 1 }} 
                        ref={email} value={values.email} onChangeText={handleChange('email')} >
                    </TextInput>

                    { errors.email && <Text>{ errors.email }</Text> }

                    <TouchableOpacity onPress={ handleSubmit }>
                        <Text>{i18n.nameButtonDefault}</Text>
                    </TouchableOpacity>

                    <Text>{values.email}</Text>

                </View>
            )}

        </Formik>
        );
}