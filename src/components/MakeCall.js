
import React, { useState } from 'react';
import { StyleSheet, TouchableOpacity, View, Text } from 'react-native';
import { Button } from 'react-native-paper';
import call from 'react-native-phone-call';
import Modal from 'react-native-modal';
const MakeCall = ({PhoneNo}) => {

    const [isModalVisible, setModalVisible] = useState(false);

    const toggleModal = () => {
        setModalVisible(!isModalVisible);
    };

    const args = {
        number: PhoneNo, // Use commas to add time between digits.
        prompt: true,
    };

    const MakingCall = () => {
        call(args).catch((err) => console.log(err));
        toggleModal();
    };
    const handleModal = () => {
        toggleModal();
    };
    return (<>
        <TouchableOpacity style={styles.callContainer}>
            <Button mode="contained" icon={'phone-dial'} labelStyle={styles.label} style={styles.callBtn} onPress={handleModal}>Call</Button>
        </TouchableOpacity>
        <View>
            <Modal isVisible={isModalVisible}  animationIn={'fadeInLeft'} swipeDirection={'right'} style={{ backgroundColor: 'white',borderRadius: 10, maxHeight: 250, marginTop: '60%'}}>
                <View style={styles.modal}>
                    <Text style={[styles.label, {color:'black', fontSize: 25}]}>Make a Call to Saller ?</Text>
                    <View style={styles.btnSection}>
                        <Button mode="contained" icon={'phone-cancel'} style={[styles.callBtn, {padding: 4, backgroundColor: 'red', width: 120}]} onPress={toggleModal}>Cancle</Button>
                        <Button mode="contained" icon={'phone'} style={[styles.callBtn, {padding: 4, width: 120}]} onPress={MakingCall}>Call</Button>
                    </View>
                </View>
            </Modal>
        </View>
    </>
    );
};

export default MakeCall;

const styles = StyleSheet.create({
    callContainer: {
        marginBottom: 20,
        paddingHorizontal: 30,
    },
    callBtn: {
        borderRadius: 25,
        backgroundColor: '#F28a89',
        fontFamily:'Poppins-Bold'
    },
    label: {
        fontFamily: 'Poppins-Bold',
        padding: 4,
        fontSize: 20,
    },
    modal: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    btnSection: {
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        alignItems: 'center',
        padding:30,
    },
});
