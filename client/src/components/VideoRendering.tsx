import React, { useState } from "react";
import styled from "styled-components/native";
import WebView from "react-native-webview";
import { videoUrlModify } from "../utils/videoUrlModify";
import { Video } from "expo-av";
import { Feather } from "@expo/vector-icons";
import {
  downloadAsync,
  createDownloadResumable,
  documentDirectory,
} from "expo-file-system";
import { AsyncStorage } from "react-native";

interface VideoRenderingProps {
  videoUrl?: string;
  width?: boolean;
}

export default function VideoRendering({
  videoUrl,
  width,
}: VideoRenderingProps) {
  if (!videoUrl) return null;
  const token = videoUrl.split(".");

  if (token[token.length] !== "mp4") {
    const [progress, setProgress] = useState<number>(0);
    const video = "http://d23dyxeqlo5psv.cloudfront.net/big_buck_bunny.mp4";

    const downloadVideo = async () => {
      const callback = (downloadProgress: any) => {
        const value =
          (downloadProgress.totalBytesWritten * 100) /
          downloadProgress.totalBytesExpectedToWrite;
        setProgress(value);
      };

      const downloadResumable = createDownloadResumable(
        "http://d23dyxeqlo5psv.cloudfront.net/big_buck_bunny.mp4",
        documentDirectory + video.split("/")[video.split("/").length - 1],
        {},
        callback
      );

      try {
        const { uri } = await downloadResumable.downloadAsync();
        console.log("Finished downloading to ", uri);
      } catch (e) {
        console.error(e);
      }

      try {
        await downloadResumable.pauseAsync();
        console.log("Paused download operation, saving for future retrieval");
        AsyncStorage.setItem(
          "pausedDownload",
          JSON.stringify(downloadResumable.savable())
        );
      } catch (e) {
        console.error(e);
      }

      try {
        const { uri } = await downloadResumable.resumeAsync();
        console.log("Finished downloading to ", uri);
      } catch (e) {
        console.error(e);
      }
    };
    return (
      <>
        <Video
          source={{
            uri: "http://d23dyxeqlo5psv.cloudfront.net/big_buck_bunny.mp4",
          }}
          rate={1.0}
          volume={1.0}
          isMuted={false}
          resizeMode="cover"
          shouldPlay={false}
          isLooping={false}
          useNativeControls
          style={{ width: width ? "100%" : 250, height: width ? 200 : 150 }}
        />
        <DownloadButton onPress={() => downloadVideo()}>
          {progress !== 0 ? (
            <Text style={{ color: "#fff" }}>{progress} %</Text>
          ) : (
            <Feather name="download-cloud" size={24} color="white" />
          )}
        </DownloadButton>
      </>
    );
  }

  return (
    <WebView
      style={{
        width: width ? "100%" : 250,
        backgroundColor: "black",
      }}
      javaScriptEnabled={true}
      domStorageEnabled={true}
      source={{
        uri: videoUrlModify(videoUrl),
      }}
    />
  );
}

const DownloadButton = styled.TouchableOpacity`
  position: absolute;
  right: 55;
  top: 10;
`;

const Text = styled.Text``;
