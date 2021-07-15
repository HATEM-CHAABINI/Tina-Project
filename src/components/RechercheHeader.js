import React from 'react';
import { View, Text } from 'react-native';
import { Actions } from 'react-native-router-flux';
import { em, hm } from '../common/constants';
import MenuBtn from './MenuBtn';

const RechercheHeader = (props) => {
    return (
        <View style={styles.header}>

            <View style={styles.menuWrapper}>
                <MenuBtn image={"close"} onPress={() => Actions.pop()} />
            </View>
            <Text style={styles.titleText}>Rechercher</Text>

        </View>
    );
};

const styles = {
    header: { paddingLeft: 21 * hm },
    menuWrapper: {
        position: "absolute",
        right: 20 * em,
        top: 10 * em,
        backgroundColor: "#FFF"
    },
    titleText: {
        fontSize: 30 * em,
        color: "#251b4d",
        fontFamily: "Merriweather-Black",
        marginBottom: 10 * em,
        marginTop: 70 * hm
    },
};

export default RechercheHeader;