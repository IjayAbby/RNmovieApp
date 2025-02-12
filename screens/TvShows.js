import {
  Alert,
  StyleSheet,
  Pressable,
  Modal,
  Text,
  FlatList,
  TouchableOpacity,
  View,
  Dimensions,
  Image,
} from "react-native";
import React, { useContext, useEffect, useState } from "react";
import { AntDesign } from "@expo/vector-icons";
import { Entypo, Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import axios from "axios";
import { ACCESS_TOKEN } from "@env";
import { ScrollView } from "react-native-gesture-handler";

const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;

const url = "https://api.themoviedb.org/3/trending/tv/day?language=en-US";

const TvShows = ({ navigation }) => {
  const [TrendingMovies, setTrendingMovies] = useState();
  const [TrendingMovie, setTrendingMovie] = useState();
  const [ModalVisible, setModalVisible] = useState(false);
  const [CurrentMovie, setCurrentMovie] = useState();

  useEffect(() => {
    getTrendingTv();
  }, []);

  const getTrendingTv = async () => {
    try {
      // Step 1: Get a request token
      const response = await axios({
        method: "GET",
        url: url,
        headers: {
          Authorization: `Bearer ${ACCESS_TOKEN}`,
        },
      });
      setTrendingMovies(response.data.results);
      //console.log("response", response.data.results[0]);
    } catch (error) {
      // Handle authentication errors
      console.log("there is an error:", error);
    }
  };

  const renderTrendingMovies = ({ item }) => {
    //https://image.tmdb.org/t/p/w600_and_h900_bestv2//mmSSn8Yn3GbJv9MsSnD4J1LnN9l.jpg
    return (
      <>
        <TouchableOpacity
          onPress={() => {
            setCurrentMovie(item);
            setModalVisible(!ModalVisible);
          }}
          style={{
            marginTop: 20,
            marginBottom: 30,
            flexDirection: "column",
            height: 190,
            width: 160,

            marginHorizontal: 10,
          }}
        >
          <Image
            source={{
              uri: `https://image.tmdb.org/t/p/w600_and_h900_bestv2/${item.poster_path}`,
            }}
            style={{ height: "100%", width: "100%", borderRadius: 10 }}
          />
          <Text
            style={{
              color: "white",
              marginHorizontal: 20,
              textAlign: "center",
              alignSelf: "center",
            }}
          >
            {item.name}
          </Text>
        </TouchableOpacity>
      </>
    );
  };

  const MovieModal = () => {
    return (
      <>
        {CurrentMovie && (
          <Modal
            animationType="slide"
            transparent={true}
            visible={ModalVisible}
          >
            <LinearGradient
              style={{ flex: 1, backgroundColor: "#49494b", height: "100%" }}
              colors={["#49494b", "#01010b", "#01010b"]}
            >
              <View
                style={{
                  alignItems: "center",
                }}
              >
                <Image
                  style={{
                    height: "100%",
                    width: "100%",
                    borderRadius: 2,
                    marginHorizontal: 2,
                  }}
                  source={{
                    uri: `https://image.tmdb.org/t/p/w600_and_h900_bestv2/${CurrentMovie.backdrop_path}`,
                  }}
                />

                <View style={styles.overLay}>
                  <View
                    style={{
                      flexDirection: "row",
                      alignItems: "center",
                      justifyContent: "space-between",
                      marginTop: 10,
                      marginHorizontal: 10,
                    }}
                  >
                    <Pressable onPress={() => setModalVisible(!ModalVisible)}>
                      <AntDesign
                        name="down"
                        size={24}
                        color="white"
                        style={{ margin: 10, fontWeight: "bold" }}
                      />
                    </Pressable>
                    <Pressable>
                      <Ionicons
                        name="ellipsis-vertical"
                        size={24}
                        color="white"
                        style={{ margin: 10 }}
                      />
                    </Pressable>
                  </View>
                  <ScrollView>
                    <View style={{ height: 240 }} />
                    <Text
                      style={{
                        color: "white",
                        fontSize: 39,
                        fontWeight: "bold",
                        justifyContent: "center",
                        textAlign: "center",
                        alignSelf: "center",
                        marginTop: 20,
                      }}
                    >
                      {CurrentMovie.name}
                    </Text>

                    <View style={{ height: 20 }} />
                    <Text
                      style={{
                        color: "white",
                        fontSize: 20,
                        justifyContent: "center",
                        textAlign: "center",
                        alignSelf: "center",
                        marginTop: 20,
                      }}
                    >
                      {CurrentMovie.overview}
                    </Text>

                    <Text
                      style={{
                        color: "white",
                        fontSize: 20,
                        justifyContent: "center",
                        textAlign: "center",
                        alignSelf: "center",
                        marginTop: 20,
                      }}
                    >
                      First Air Date: {CurrentMovie.first_air_date}
                    </Text>

                    <Text
                      style={{
                        color: "white",
                        fontSize: 20,
                        justifyContent: "center",
                        textAlign: "center",
                        alignSelf: "center",
                        marginTop: 20,
                      }}
                    >
                      Country  Of Origin: {CurrentMovie.origin_country}
                    </Text>

                    <Text
                      style={{
                        color: "white",
                        fontSize: 20,
                        justifyContent: "center",
                        textAlign: "center",
                        alignSelf: "center",
                        marginTop: 20,
                      }}
                    >
                      Votes: {CurrentMovie.vote_count}
                    </Text>
                  </ScrollView>
                </View>
              </View>
            </LinearGradient>
          </Modal>
        )}
      </>
    );
  };

  return (
    <LinearGradient
      style={{ flex: 1 }}
      colors={["#49494b", "#01010b", "#01010b"]}
    >
      <View style={{ height: 40 }} />
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <TouchableOpacity onPress={() => navigation.navigate("Home")}>
          <AntDesign
            name="arrowleft"
            size={24}
            color="white"
            style={{ fontWeight: "bold", margin: 10 }}
          />
        </TouchableOpacity>
        <Text
          style={{
            color: "white",
            fontSize: 26,
            marginHorizontal: 10,
            fontWeight: "bold",
          }}
        >
          Trending Tv Shows
        </Text>
      </View>
      <MovieModal />
      <FlatList
        data={TrendingMovies}
        renderItem={renderTrendingMovies}
        numColumns={2}
      />
    </LinearGradient>
  );
};

export default TvShows;

const styles = StyleSheet.create({
  overLay: {
    position: "absolute",
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
    backgroundColor: "#01010b",
    opacity: 0.5,
  },
});
