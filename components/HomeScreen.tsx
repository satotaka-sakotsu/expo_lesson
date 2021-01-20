import React, { useState } from "react";
import { StatusBar } from "expo-status-bar";
import {
  StyleSheet,
  Image,
  Button,
  Text,
  View,
  TouchableOpacity,
  Platform,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import * as Sharing from "expo-sharing";
import uploadToAnonymousFilesAsync from "anonymous-files";
import layoutStyles from "../styles/layout";

type selectedImageType = {
  loadUri: string;
} | null;

export default function HomeScreen(props: any) {
  const { navigation } = props;
  const [selectedImage, setSelectedImage] = useState<selectedImageType>(null);

  const handleOpenImageAsync = async () => {
    const permissionResult = await ImagePicker.requestCameraRollPermissionsAsync();
    if (permissionResult.granted === false) {
      alert("Permission to access camera roll is required!");
      return;
    }

    const pickerResult = await ImagePicker.launchImageLibraryAsync();
    if (pickerResult.cancelled === true) {
      return;
    }

    if (Platform.OS === "web") {
      const remoteUri = await uploadToAnonymousFilesAsync(pickerResult.uri);
      setSelectedImage({ localUri: pickerResult.uri, remoteUri });
    } else {
      setSelectedImage({ localUri: pickerResult.uri, remoteUri: null });
    }
  };

  const handleShareDialogAsync = async () => {
    if (!(await Sharing.isAvailableAsync())) {
      alert(
        `The image is available for sharing at: ${selectedImage.remoteUri}`
      );
      return;
    }

    await Sharing.shareAsync(selectedImage.localUri);
  };

  return selectedImage !== null ? (
    <View style={layoutStyles.container}>
      <Image
        source={{ uri: selectedImage.localUri }}
        style={styles.thumbnail}
      />
      <TouchableOpacity onPress={handleShareDialogAsync} style={styles.btnImg}>
        <Text style={styles.textBtn}>Share this photo</Text>
      </TouchableOpacity>
    </View>
  ) : (
    <View style={layoutStyles.container}>
      <Image
        source={{ uri: "https://i.imgur.com/TkIrScD.png" }}
        style={styles.logo}
      />
      <Text style={styles.instructions}>
        Open up App.tsx to start working on your app!
      </Text>
      <TouchableOpacity style={styles.btnImg} onPress={handleOpenImageAsync}>
        <Text style={styles.textBtn}>Pick a photo</Text>
      </TouchableOpacity>
      <Button
        title="Go Detail Page"
        onPress={() => navigation.navigate("Details")}
      />

      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  logo: {
    width: 305,
    height: 159,
    marginBottom: 16,
  },
  instructions: {
    color: "#888",
    fontSize: 18,
    marginHorizontal: 15,
    marginBottom: 16,
  },
  btnImg: {
    backgroundColor: "blue",
    padding: 15,
    marginBottom: 16,
  },
  textBtn: {
    fontSize: 20,
    color: "#fff",
  },
  thumbnail: {
    width: 300,
    height: 300,
    resizeMode: "contain",
    marginBottom: 16,
  },
});
