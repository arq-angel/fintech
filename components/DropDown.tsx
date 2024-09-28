import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import * as DropDownMenu from 'zeego/dropdown-menu';
import RoundBtn from "@/components/RoundBtn";

const DropDown = () => {
    return (
        <DropDownMenu.Root>
            <DropDownMenu.Trigger>
                <RoundBtn icon={'ellipsis-horizontal'} text={'More'} />
            </DropDownMenu.Trigger>

            <DropDownMenu.Content>
                <DropDownMenu.Item key="statement">
                    <DropDownMenu.ItemTitle>Statement</DropDownMenu.ItemTitle>
                    <DropDownMenu.ItemIcon ios={{
                        name: 'list.bullet.rectangle.fill',
                        pointSize: 24,
                    }} />
                </DropDownMenu.Item>
                <DropDownMenu.Item key="converter">
                    <DropDownMenu.ItemTitle>Converter</DropDownMenu.ItemTitle>
                    <DropDownMenu.ItemIcon ios={{
                        name: 'coloncurrencysign.arrow.circlepath',
                        pointSize: 24,
                    }} />
                </DropDownMenu.Item>
                <DropDownMenu.Item key="background">
                    <DropDownMenu.ItemTitle>Background</DropDownMenu.ItemTitle>
                    <DropDownMenu.ItemIcon ios={{
                        name: 'photo.fill',
                        pointSize: 24,
                    }} />
                </DropDownMenu.Item>
                <DropDownMenu.Item key="account">
                    <DropDownMenu.ItemTitle>Account</DropDownMenu.ItemTitle>
                    <DropDownMenu.ItemIcon ios={{
                        name: 'plus.rectangle.on.folder.fill',
                        pointSize: 24,
                    }} />
                </DropDownMenu.Item>
            </DropDownMenu.Content>
        </DropDownMenu.Root>
    );
};

export default DropDown;