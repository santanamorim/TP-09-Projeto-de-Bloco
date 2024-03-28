import { Text, View, Image, StyleSheet, Dimensions, ScrollView } from "react-native";
import app from "../../services/Firebase";
import { getDownloadURL, getStorage, listAll, ref } from "firebase/storage";
import { useState, useEffect, useCallback } from "react";
import { useFocusEffect } from '@react-navigation/native';

export default function GalleryContainer() {

    const url = "https://firebasestorage.googleapis.com/v0/b/";
    const service = "tp-09-projeto-de-bloco.appspot.com";

    const [photos, setPhotos] = useState([]);

    async function getPhotos() {
        try {
            const firebaseStorage = getStorage(app);
            const photosRef = ref(firebaseStorage);
            const list = await listAll(photosRef);
            const urls = [];
            for (let fileRef of list.items) {
                const photoRef = ref(firebaseStorage, fileRef);
                const url = await getDownloadURL(photoRef);
                urls.push(url);
            }
            setPhotos(urls);

        } catch (error) {
            console.error("Error fetching photos: ", error);
        }
    }

    useFocusEffect(
        useCallback(() => {getPhotos()}, [])
    );

    return (
        <ScrollView contentContainerStyle={styles.container}>
            <Text style={styles.title}>Galeria de Fotos</Text>
            <View style={styles.imageContainer}>
                {photos.map((uri, index) => (
                    <Image key={index} style={styles.image} source={{ uri }} />
                ))}
            </View>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        backgroundColor: '#ffffff'
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        textAlign: 'center',
        marginTop: 20,
        marginBottom: 10
    },
    imageContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 10
    },
    image: {
        width: Dimensions.get('window').width / 3 - 15,
        height: Dimensions.get('window').width / 3 - 15,
        margin: 5,
        borderRadius: 10
    }
});


