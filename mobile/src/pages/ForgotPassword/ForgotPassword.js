import React, { useState, useEffect } from 'react';
import { View, Text } from 'react-native';
import { Formik } from 'formik';
import * as Yup from 'yup';

import api from '../../service/api';

import globalCSS from '../../globalCSS';
import forgotPasswordCSS from './ForgotPasswordCSS';

import i18n from '../../translation/translationMessage.json';

export default function ForgotPassword() {
    return (
        <View>
            <Text>ForgotPassword</Text>
        </View>
    );
}