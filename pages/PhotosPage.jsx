import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { View, Text } from "react-native";
import GalleryContainer from "../containers/Photos/GalleryContainer";
import CameraContainer from "../containers/Photos/CameraContainer";

const tabs = createBottomTabNavigator();

export default function PhotosPage() {
    return (
        <tabs.Navigator screenOptions={{ headerShown: false }}>
            <tabs.Screen name="galeria" component={GalleryContainer} />
            <tabs.Screen name="camera" component={CameraContainer} />
        </tabs.Navigator>
    )
}