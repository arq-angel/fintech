import React, {Fragment, useEffect, useState} from 'react';
import {View, Text, StyleSheet, TouchableOpacity, Platform, Alert} from 'react-native';
import {Link, useLocalSearchParams} from "expo-router";
import {isClerkAPIResponseError, useSignIn, useSignUp} from "@clerk/clerk-expo";
import {defaultStyles} from "@/constants/Styles";
import {
    CodeField,
    Cursor,
    useBlurOnFulfill,
    useClearByFocusCell,
} from 'react-native-confirmation-code-field';
import Colors from "@/constants/Colors";

const CELL_COUNT = 6;


const Page = () => {
    const {phone, signin} = useLocalSearchParams<{ phone: string; signin: string }>();
    const [code, setCode] = useState('');
    const {signIn} = useSignIn();
    const {signUp, setActive} = useSignUp();
    const [value, setValue] = useState('');
    const ref = useBlurOnFulfill({ value: code, cellCount: CELL_COUNT });
    const [props, getCellOnLayoutHandler] = useClearByFocusCell({
        value: code,
        setValue: setCode,
    });

    useEffect(() => {
        if (code.length === 6) {
            if (signin == 'true') {
                verifySignIn();
            } else {
                verifyCode();
            }

        }
    }, [code]);

    /*useEffect(() => {
        console.log("Code:", code, "Code Length:", code.length);
        const isSignin = signin === 'true';
        if (code.length === 6) {
            if (isSignin) {
                console.log("Triggering Sign-In Verification");
                verifySignIn();
            } else {
                console.log("Triggering Sign-Up Verification");
                verifyCode();
            }
        }
    }, [code]);*/


    const verifyCode = async () => {
        try {
            await signUp!.attemptPhoneNumberVerification({
                code,
            });
            await setActive!({ session: signUp!.createdSessionId });
        } catch (err) {
            console.log('error', JSON.stringify(err, null, 2));
            if (isClerkAPIResponseError(err)) {
                Alert.alert('Error', err.errors[0].message);
            }
        }
    };

    /*const verifyCode = async () => {
        try {
            const response = await signUp!.attemptPhoneNumberVerification({
                code,
            });
            console.log("Sign-Up Verification Response:", JSON.stringify(response, null, 2));
            await setActive!({ session: signUp!.createdSessionId });
            console.log("Active session for sign-up:", signUp!.createdSessionId);
        } catch (err) {
            console.log('Error during sign-up verification:', JSON.stringify(err, null, 2));
            if (isClerkAPIResponseError(err)) {
                Alert.alert('Error', err.errors[0].message);
            }
        }
    };*/


    const verifySignIn = async () => {
        try {
            await signIn!.attemptFirstFactor({
                strategy: 'phone_code',
                code,
            });
            await setActive!({ session: signIn!.createdSessionId });
        } catch (err) {
            console.log('error', JSON.stringify(err, null, 2));
            if (isClerkAPIResponseError(err)) {
                Alert.alert('Error', err.errors[0].message);
            }
        }
    };

    /*const verifySignIn = async () => {
        try {
            const response = await signIn!.attemptFirstFactor({
                strategy: 'phone_code',
                code,
            });
            console.log("Sign-In Response:", JSON.stringify(response, null, 2));
            if (response.status === 'complete') {
                await setActive!({ session: signIn!.createdSessionId });
                console.log("Active session for sign-in:", signIn!.createdSessionId);
            } else {
                console.log("Sign-In incomplete:", response);
            }
        } catch (err) {
            console.log('Error during sign-in:', JSON.stringify(err, null, 2));
            if (isClerkAPIResponseError(err)) {
                Alert.alert('Error', err.errors[0].message);
            }
        }
    };*/


    return (
        <View style={defaultStyles.container}>
            <Text style={defaultStyles.header}>6-digit code</Text>
            <Text style={defaultStyles.descriptionText}>
                Code sent to {phone} unless you already have an account
            </Text>

            <CodeField
                ref={ref}
                {...props}
                value={code}
                onChangeText={setCode}
                cellCount={CELL_COUNT}
                rootStyle={styles.codeFieldRoot}
                keyboardType="number-pad"
                textContentType="oneTimeCode"
                renderCell={({ index, symbol, isFocused }) => (
                    <Fragment key={index}>
                        <View
                            // Make sure that you pass onLayout={getCellOnLayoutHandler(index)} prop to root component of "Cell"
                            onLayout={getCellOnLayoutHandler(index)}
                            key={index}
                            style={[styles.cellRoot, isFocused && styles.focusCell]}>
                            <Text style={styles.cellText}>{symbol || (isFocused ? <Cursor /> : null)}</Text>
                        </View>
                        {index === 2 ? <View key={`separator-${index}`} style={styles.separator} /> : null}
                    </Fragment>
                )}
            />

            <Link href={'/login'} replace asChild>
                <TouchableOpacity>
                    <Text style={[defaultStyles.textLink]}>Already have an account? Log in</Text>
                </TouchableOpacity>
            </Link>
        </View>
    );
};

const styles = StyleSheet.create({
    codeFieldRoot: {
        marginVertical: 20,
        marginLeft: 'auto',
        marginRight: 'auto',
        gap: 12,
    },
    cellRoot: {
        width: 45,
        height: 60,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: Colors.lightGray,
        borderRadius: 8,
    },
    cellText: {
        color: '#000',
        fontSize: 36,
        textAlign: 'center',
    },
    focusCell: {
        paddingBottom: 8,
    },
    separator: {
        height: 2,
        width: 10,
        backgroundColor: Colors.gray,
        alignSelf: 'center',
    }
});

export default Page;