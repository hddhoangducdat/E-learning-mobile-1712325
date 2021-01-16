import React, { useRef, useState } from "react";
import styled from "styled-components/native";
import WebView from "react-native-webview";
import { videoUrlModify } from "../utils/videoUrlModify";
import { AVPlaybackStatus, Video } from "expo-av";
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
  setTime?: React.Dispatch<React.SetStateAction<number>>;
  time?: number;
}

export default function VideoRendering({
  videoUrl,
  width,
  setTime,
  time,
}: VideoRenderingProps) {
  if (!videoUrl) return null;

  if (videoUrl.includes("mp4")) {
    const [progress, setProgress] = useState<number>(0);
    const video = videoUrl;
    const videoStatus = useRef<Video>();

    const downloadVideo = async () => {
      const callback = (downloadProgress: any) => {
        const value =
          (downloadProgress.totalBytesWritten * 100) /
          downloadProgress.totalBytesExpectedToWrite;
        setProgress(value);
      };

      const downloadResumable = createDownloadResumable(
        videoUrl,
        documentDirectory + video.split("/")[video.split("/").length - 1],
        {},
        callback
      );

      try {
        const { uri }: any = await downloadResumable.downloadAsync();
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
        const { uri }: any = await downloadResumable.resumeAsync();
        console.log("Finished downloading to ", uri);
      } catch (e) {
        console.error(e);
      }
    };
    return (
      <>
        <Video
          ref={(component: Video) => {
            videoStatus.current = component;
            // if (time) {
            //   component?.playFromPositionAsync(time);
            // }
          }}
          source={{
            uri: videoUrl,
          }}
          onLoad={() => {
            if (time) {
              videoStatus.current?.playFromPositionAsync(time);
            }
          }}
          rate={1.0}
          volume={1.0}
          isMuted={false}
          resizeMode="cover"
          onPlaybackStatusUpdate={(status: AVPlaybackStatus) => {
            setTime(status?.positionMillis);
          }}
          shouldPlay={false}
          isLooping={false}
          useNativeControls
          style={{ width: width ? "100%" : 250, height: width ? 200 : 150 }}
        />
        <DownloadButton onPress={() => downloadVideo()}>
          {progress !== 0 ? (
            <Text style={{ color: "#fff" }}>{Math.round(progress)} %</Text>
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
