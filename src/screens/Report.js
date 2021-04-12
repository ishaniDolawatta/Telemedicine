import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Auth } from 'aws-amplify';
import { listSongs } from '../graphql/queries';
import { API, graphqlOperation } from 'aws-amplify';
import { white, yellowNew, darkRed } from "../theme/Colors";
import {
    TranscribeClient,
    StartTranscriptionJobCommand,
    StartMedicalTranscriptionJobCommand,
} from '@aws-sdk/client-transcribe';
import { CognitoIdentityClient } from '@aws-sdk/client-cognito-identity';
import { fromCognitoIdentityPool } from '@aws-sdk/credential-provider-cognito-identity';
import Predictions from '@aws-amplify/predictions';
import RNFetchBlob from 'rn-fetch-blob';
import Spinner from 'react-native-loading-spinner-overlay';
import Modal from 'react-native-modal';

export default function Report({ navigation }) {
    const [username, setUsername] = useState('');
    const [songs, setSongs] = useState([]);
    const [spinner, setSpinner] = useState(false);
    const [modalText, setModalText] = useState("");
    const [modalVisible, setModalVisible] = useState(false);

    const tclient = new TranscribeClient({
        region: "eu-west-2",
        credentials: fromCognitoIdentityPool({
            client: new CognitoIdentityClient({ region: "eu-west-2" }),
            identityPoolId: 'eu-west-2:8f6891de-682e-458a-b715-e1758e6088cc',
        }),
    });

    const fetchRecordings = async () => {
        try {
            const recordingData = await API.graphql(graphqlOperation(listSongs));
            const songList = recordingData.data.listSongs.items;
            setSongs(songList);
        } catch (error) {
            console.log('error on fetching songs', error);
        }
    };

    useEffect(() => {
        checkUser();
        fetchRecordings();
    }, []);

    function checkUser() {
        Auth.currentAuthenticatedUser()
            .then((user) => setUsername(user.username))
            .catch((err) => console.log(err));
    }

    const transcribe = async (song) => {
        //Param for Medical Transcription Job
        // const params = {
        //     MedicalTranscriptionJobName: `${song.id}`,
        //     OutputBucketName: 'telemedicineoutput',
        //     Specialty: 'PRIMARYCARE',
        //     Type: 'CONVERSATION',
        //     LanguageCode: 'en-US',
        //     MediaFormat: 'wav',
        //     MediaSampleRateHertz: 8000,
        //     Media: {
        //         MediaFileUri: song.audioFilePath,
        //     },
        // };

        const params = {
            TranscriptionJobName: `${song.id}`,
            LanguageCode: 'en-US',
            OutputBucketName: 'telemedicineoutput',
            MediaFormat: 'wav',
            ShowSpeakerLabels: true,
            Media: {
                MediaFileUri: song.audioFilePath,
            },
        };
        try {
            setSpinner(true);
            console.log('Start Medical Transcription JobCommand REQUEST', params);

            //Request for Medical Transcription
            // const data = await tclient.send(
            //     new StartMedicalTranscriptionJobCommand(params),
            // );

            const data = await tclient.send(
                new StartTranscriptionJobCommand(params),
            );
            setTimeout(async () => {
                await fetchRecordings();
                setSpinner(false);
            }, 50000);
            console.log('Success - put', data);
        } catch (err) {
            console.log('Error', err);
        }

        //@aws-amplify/prediction (This method has un resolved bug)
        // readFile("/Users/ishanidolawatta/Downloads/333.mp3").then(buffer => {
        //     Predictions.convert({
        //         transcription: {
        //             source: {
        //                 bytes: buffer,
        //             },
        //             language: "en-US",
        //         }
        //     }) .then(({ transcription}) => console.log({ transcription }))
        //        .catch(err => console.log({ err }));
        //   }).catch(e => {
        //     console.log(e);
        //   });

    };

    const view = async (id) => {
        await fetchRecordings();
        const song = songs.find((s) => s.id === id);
        setModalText(song.transcribeText);
        setModalVisible(true);
    }

    function readFile(filePath) {
        return RNFetchBlob.fs.readFile(filePath, 'base64').then(data => new Buffer(data, 'base64'));
    }

    function wrapperComponent() {
        return (
            <Modal isVisible={modalVisible} onBackdropPress={() => setModalVisible(false)} onRequestClose={() => this.setModalVisible(false)}>
                <TouchableOpacity
                    activeOpacity={1}
                    onPressOut={() => {this.setModalVisible(false)}}
                >
                    <View style={{
                        flex: 1,
                        flexDirection: 'column',
                        justifyContent: 'center',
                        alignItems: 'center',
                    }}>
                        <View style={{
                            width: 300,
                            height: 300,
                            backgroundColor: yellowNew,
                            color: darkRed,
                            alignContent: "center",
                            padding: 10
                        }}>
                            <Text>{modalText}</Text>
                        </View>
                    </View>
                </TouchableOpacity>

            </Modal>
        )
    }

    return (
        <View>
            <Spinner
                visible={spinner}
                textContent={"Wait 50 seconds for processing your document"}
                textStyle={styles.spinnerTextStyle}
            />
            {songs.map((song, idx) => {
                return (
                    <View key={`song${idx}`} style={styles.container}>
                        <Text weigth="semibold" style={styles.text}> {song.description}</Text>
                        <TouchableOpacity onPress={() => song.transcribeText ? view(song.id) : transcribe(song)}>
                            <View style={styles.button} >
                                <Text weigth="semibold" > {song.transcribeText ? "View report" : "Generate report"} </Text>
                            </View>
                        </TouchableOpacity>
                    </View>
                );
            })}
            {modalVisible && wrapperComponent()}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        height: 40,
        width: "95%",
        backgroundColor: white,
        margin: 10,
        display: "flex",
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
        borderColor: darkRed,
        borderWidth: 1,
        borderRadius: 10,
        alignItems: "center",
        alignContent: "center"
    },
    text:{
        textAlign: "center"
    },
    button: {
        backgroundColor: yellowNew,
        color: darkRed,
        height: 38,
        width: 150,
        borderRadius: 10,
        alignItems: "center",
        justifyContent: 'center',
    },
    spinnerTextStyle: {
        color: '#FFF',
        textAlign: "center"
    },
    modalStyles: {
        backgroundColor: yellowNew,
        color: darkRed,
        alignContent: "center",
        padding: 10,
        height: 100
    }
});
