import { Camera } from "expo-camera";
import React, { useEffect, useState } from "react";
import { Pressable, Text, View, StyleSheet, Image } from "react-native";
import app from '../../services/Firebase';
import { getStorage, uploadBytes, ref, uploadString } from 'firebase/storage';

export default function CameraContainer() {

    const [hasPermission, setPermission] = useState(false);
    const [camera, setCamera] = useState(null);
    const [uri, setUri] = useState(null);
    const [msg, setMsg] = useState(null);

    async function requestCamera() {
        const permission = await Camera.requestCameraPermissionsAsync();
        const { status } = permission;
        if (status == "granted") {
            setPermission(true);
        }
    }

    async function takePicture() {
        if (camera) {
            const photo = await camera.takePictureAsync();
            const { uri } = photo;
            setUri(uri);
        }
    }

    async function savePhoto() {
        try {
            const firebaseStorage = getStorage(app);
            const name = `photo${new Date().getTime()}.jpeg`;
            const photoRef = ref(firebaseStorage, name);
            await uploadPhoto(photoRef);
        } catch (error) {
            setMsg(error.message);
        }
    }

    async function uploadPhoto(photoRef) {
        const response = await fetch(uri);
        const photo = await response.blob();
        const uploadResult = await uploadBytes(photoRef, photo);
        if (uploadResult)
            setUri(null);
        else
            setMsg("Algo deu errado");
    }

    useEffect(() => {
        requestCamera();
    }, [])
    
    return (
        <View style={styles.container}>
            {msg && <Text style={styles.message}>{msg}</Text>}
            {hasPermission && !uri && (
                <>
                    <Camera
                        style={styles.camera}
                        ref={(ref) => {
                            setCamera(ref);
                        }}
                    />
                    <Pressable
                        style={styles.captureButton}
                        onPress={() => takePicture()}>
                        <Text style={styles.buttonText}>Capturar</Text>
                    </Pressable>
                </>
            )}
            {uri && (
                <>
                    <Image style={styles.photo} source={{ uri }} />
                    <View style={styles.buttonsContainer}>
                        <Pressable
                            style={styles.saveButton}
                            onPress={() => savePhoto()}>
                            <Text style={styles.buttonText}>Salvar</Text>
                        </Pressable>
                        <Pressable
                            style={styles.deleteButton}
                            onPress={() => setUri(null)}>
                            <Text style={styles.buttonText}>Excluir</Text>
                        </Pressable>
                    </View>
                </>
            )}
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#f0f0f0',
    },
    camera: {
        width: '100%',
        height: '70%',
        marginBottom: 20,
    },
    captureButton: {
        backgroundColor: 'blue',
        padding: 15,
        borderRadius: 10,
    },
    photo: {
        width: '100%',
        height: '70%',
        marginBottom: 20,
    },
    buttonsContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        width: '100%',
    },
    saveButton: {
        backgroundColor: 'green',
        padding: 15,
        borderRadius: 10,
    },
    deleteButton: {
        backgroundColor: 'red',
        padding: 15,
        borderRadius: 10,
    },
    buttonText: {
        color: 'white',
        fontWeight: 'bold',
        textAlign: 'center',
    },
    message: {
        color: 'red',
        marginBottom: 20,
    },
});
