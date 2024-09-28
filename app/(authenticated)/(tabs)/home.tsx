import React from 'react';
import {ScrollView, View, Text, StyleSheet, Button} from 'react-native';
import Colors from "@/constants/Colors";
import RoundBtn from "@/components/RoundBtn";
import DropDown from "@/components/DropDown";

const onAddMoney = () => {

};

const Page = () => {
    const balance = 1235;
    return (
        <ScrollView style={{backgroundColor: Colors.background}}>
            <View style={styles.account}>
                <View style={styles.row}>
                    <Text style={styles.balance}>{balance}</Text>
                    <Text style={styles.currency}>€</Text>
                </View>
            </View>
            <View style={styles.actionRow}>
                <RoundBtn icon={'add'} text={'Add money'} onPress={onAddMoney} />
                <RoundBtn icon={'refresh'} text={'Exchange'}/>
                <RoundBtn icon={'list'} text={'Details'}/>
                <DropDown />
            </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    account: {
        margin: 80,
        alignItems: 'center',
    },
    row: {
        flexDirection: 'row',
        alignItems: 'flex-end',
        justifyContent: 'center',
        gap: 10
    },
    balance: {
        fontSize: 50,
        fontWeight: 'bold',
    },
    currency: {
        fontSize: 20,
        fontWeight: '500',
    },
    actionRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: 20
    }
})

export default Page;