import React, { useRef } from 'react';
import { KeyboardAvoidingView, View, Text, TextInput, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
//import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Formik } from 'formik';
import * as Yup from 'yup';

import api from '../../service/api';

import globalCSS from '../../globalCSS';
import loginCSS from './LoginCSS';

import i18n from '../../translation/translationMessage.json';

export default function Login() {
    const email = useRef(null);
    const password = useRef(null);
    const navigation = useNavigation();

    const validationShema = Yup.object().shape({
        email: Yup.string().email(i18n.mailInvalid).required(i18n.fieldRequired),
        password: Yup.string().min(6, i18n.value6Min).max(12, i18n.value12Max).required(i18n.fieldRequired)
    });

    const formikInitialValues = ({
        email: '',
        password: ''
    });

    const navigateToUserRegistration = () => {
        navigation.navigate('UserRegistration');
    }

    const navigateToForgotPassword = () => {
        navigation.navigate('ForgotPassword');
    }

    return (
        <Formik initialValues={{ formikInitialValues }} 
            onSubmit={ values => { values } }
            validationSchema={ validationShema }
        >

            {({ values, handleChange, handleSubmit, errors }) => (
                <KeyboardAvoidingView style={globalCSS.keyboardAvoidingView}>
                    <View style={loginCSS.img}>
                        {/* <MaterialCommunityIcons name="tennis" size={200} color="black" />*/}
                    </View>

                    <View style={globalCSS.container}>

                        <TextInput placeholder={i18n.mail} style={globalCSS.inputDefault} 
                            ref={email} value={values.email} onChangeText={handleChange('email')}
                        ></TextInput>

                        { errors.email && <Text style={globalCSS.msgError}>{ errors.email }</Text> }

                        <TextInput placeholder={i18n.password} style={globalCSS.inputDefault} 
                            ref={password} value={values.password} onChangeText={handleChange('password')}
                        ></TextInput>

                        { errors.password && <Text style={globalCSS.msgError}>{ errors.password }</Text> }

                        <TouchableOpacity style={globalCSS.buttonDefault} onPress={ handleSubmit }>
                            <Text style={globalCSS.textButton}>{i18n.nameButtonDefault}</Text>
                        </TouchableOpacity>

                        <View style={loginCSS.containerActions}>
                            <TouchableOpacity style={loginCSS.action} onPress={ navigateToUserRegistration }>
                                <Text style={loginCSS.textLink}>{i18n.createAccount}</Text>
                            </TouchableOpacity>

                            <Text style={loginCSS.action}> | </Text>

                            <TouchableOpacity style={loginCSS.action} onPress={ navigateToForgotPassword }>
                                <Text style={loginCSS.textLink}>{i18n.forgotPassword}</Text>
                            </TouchableOpacity>
                        </View>

                    </View>
                </KeyboardAvoidingView>
            )}

        </Formik>
        );
}