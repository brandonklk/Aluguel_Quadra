import React, { useState, useEffect } from 'react';
import { View, Text } from 'react-native';
import { Formik } from 'formik';
import * as Yup from 'yup';

import api from '../../service/api';

import globalCSS from '../../globalCSS';
import userRegistrationCSS from './UserRegistrationCSS';

import i18n from '../../translation/translationMessage.json';

export default function UserRegistration() {
    return (
        <View>
            <Text>UserRegistration</Text>
        </View>
    );
}