import React, { useState } from "react";
import styled from "styled-components/native";
import { FontAwesome } from "@expo/vector-icons";
import {
  useAddToMyFavoriteMutation,
  useGetThemeQuery,
  useMeQuery,
  useRemoveFromFavoriteMutation,
} from "../generated/graphql";
import { themeModify } from "../utils/themeModify";
import { AntDesign } from "@expo/vector-icons";
import { TouchableOpacity } from "react-native-gesture-handler";
import LottieView from "lottie-react-native";

export default function Card({
  logo,
  image,
  subtitle,
  caption,
  rate,
  participant,
  isBestSeller,
  price,
  navigation,
  id,
  categoryId,
  categoryName,
  favorite,
}: any) {
  const [theme] = useGetThemeQuery();
  const [, addToFavorite] = useAddToMyFavoriteMutation();
  const [, removeFromFavorite] = useRemoveFromFavoriteMutation();

  const [fav, setFav] = useState(favorite);
  const [load, setLoad] = useState(false);

  const [{ data }] = useMeQuery();

  return (
    <Container
      style={{
        shadowColor: themeModify("#000", theme.data?.getTheme),
        shadowOffset: {
          width: 0,
          height: 3,
        },
        shadowOpacity: 0.29,
        shadowRadius: 4.65,

        elevation: 7,
        backgroundColor: themeModify("#ffff", theme.data?.getTheme),
      }}
    >
      {isBestSeller ? (
        <BestSeller source={require("../assets/images/best_seller.png")} />
      ) : null}

      <TouchableOpacity
        onPress={() => {
          navigation.push("Section", {
            courseId: id,
            categoryUrl: logo,
            categoryId,
            categoryName,
            isBestSeller,
          } as any);
        }}
      >
        <Cover>
          <Image source={{ uri: image }} resizeMode="cover" />
        </Cover>
        <Content>
          <Logo
            source={{
              uri: logo,
            }}
          />
          <Wrapper>
            <Caption>{caption.slice(0, 23)}</Caption>
            <Subtitle>{subtitle}</Subtitle>
          </Wrapper>
        </Content>
      </TouchableOpacity>
      <RateContainer>
        {rate / 2 <= 1 ? (
          <FontAwesome name="star-o" size={12} color="#f2b20f" />
        ) : rate / 2 <= 3 ? (
          <FontAwesome name="star-half-empty" size={12} color="#f2b20f" />
        ) : (
          <FontAwesome name="star" size={12} color="#f2b20f" />
        )}
        <Rate style={{ color: "#f2b20f" }}>{rate / 2}</Rate>
        <MarginStatus />

        <FontAwesome name="user-o" size={10} color={"#009a59"} />
        <Text style={{ color: "#009a59" }}>{participant}</Text>
        <MarginStatus />

        <RightText>{price}</RightText>

        {data?.me ? (
          fav ? (
            <>
              <MarginStatus />
              {load ? (
                <>
                  <MarginStatus />
                  <View>
                    <LottieView
                      style={{
                        width: 42,
                        height: 42,
                        position: "absolute",
                        right: 12,
                      }}
                      autoPlay
                      loop
                      source={require("../assets/json/322-favorite.json")}
                      // OR find more Lottie files @ https://lottiefiles.com/featured
                      // Just click the one you like, place that file in the 'assets' folder to the left, and replace the above 'require' statement
                    />
                    <Text
                      style={{
                        position: "absolute",
                        right: 10,
                        color: "#e30e5f",
                        marginLeft: 5,
                      }}
                    >
                      load
                    </Text>
                  </View>
                </>
              ) : (
                <TouchableOpacity
                  style={{ flexDirection: "row", alignItems: "center" }}
                  onPress={() => {
                    setTimeout(() => {
                      setFav(false);
                      setLoad(false);
                    }, 2000);
                    setLoad(true);
                    removeFromFavorite({
                      courseId: id,
                    });
                  }}
                >
                  <AntDesign name="heart" size={12} color="#e30e5f" />
                  <Text
                    style={{
                      color: "#e30e5f",
                      marginLeft: 5,
                    }}
                  >
                    remove
                  </Text>
                </TouchableOpacity>
              )}
            </>
          ) : (
            <>
              <MarginStatus />
              {load ? (
                <>
                  <MarginStatus />
                  <View>
                    <LottieView
                      style={{
                        width: 42,
                        height: 42,
                        position: "absolute",
                        right: 12,
                      }}
                      autoPlay
                      loop
                      source={require("../assets/json/322-favorite.json")}
                      // OR find more Lottie files @ https://lottiefiles.com/featured
                      // Just click the one you like, place that file in the 'assets' folder to the left, and replace the above 'require' statement
                    />
                    <Text
                      style={{
                        position: "absolute",
                        color: "#e30e5f",
                        right: 10,
                      }}
                    >
                      load
                    </Text>
                  </View>
                </>
              ) : (
                <TouchableOpacity
                  style={{ flexDirection: "row", alignItems: "center" }}
                  onPress={() => {
                    setTimeout(() => {
                      setFav(true);
                      setLoad(false);
                    }, 2000);
                    setLoad(true);
                    addToFavorite({
                      courseId: id,
                    });
                  }}
                >
                  <AntDesign name="hearto" size={12} color="#e30e5f" />
                  <Text style={{ color: "#e30e5f", marginLeft: 5 }}>add</Text>
                </TouchableOpacity>
              )}
            </>
          )
        ) : null}
      </RateContainer>
    </Container>
  );
}

const View = styled.View`
  width: 100%;
  right: 10;
  flex-direction: row;
  position: absolute;
  align-items: center;
  justify-content: center;
`;

const MarginStatus = styled.View`
  width: 30px;
`;

const RightText = styled.Text`
  color: #1a9dee;
  font-size: 12px;
`;

const BestSeller = styled.Image`
  transform: translate(12px, -12px);
  position: absolute;
  width: 30px;
  height: 30px;
  z-index: 1000;
  right: 0;
`;

const Text = styled.Text`
  font-size: 12px;
  margin-left: 3px;
`;

const RateContainer = styled.View`
  flex-direction: row;
  justify-content: center;
  align-items: center;
  height: 30px;
  width: 100%;
  padding: 10px;
`;

const Rate = styled.Text`
  font-size: 12px;
  color: #000;
  margin: 0 5px;
`;

const Content = styled.View`
  margin-top: 3px;
  padding-left: 20px;
  flex-direction: row;
  align-items: center;
  height: 60px;
`;

const Wrapper = styled.View`
  margin-left: 10px;
`;

const Logo = styled.Image`
  margin-right: 8px;
  width: 35px;
  height: 35px;
`;

const Caption = styled.Text`
  color: #3c4560;
  font-size: 18px;
  font-weight: 600;
`;

const Subtitle = styled.Text`
  color: #b8bece;
  font-weight: 600;
  font-size: 12px;
  text-transform: uppercase;
  margin-top: 4px;
`;

const Container = styled.View`
  position: relative;
  background-color: white;
  width: 280px;
  height: 245px;
  border-radius: 14px;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.15);
  margin-left: 20px;
  margin-right: 20px;
  margin-top: 20px;
`;

const Cover = styled.View`
  background-color: #423d3d;
  align-items: center;
  width: 100%;
  height: 150px;
  border-top-left-radius: 14px;
  border-top-right-radius: 14px;
  overflow: hidden;
`;

const Image = styled.Image`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
`;

const Title = styled.Text`
  color: white;
  font-size: 24px;
  font-weight: bold;
  width: 170px;
  margin-top: 20px;
  margin-left: 20px;
`;
