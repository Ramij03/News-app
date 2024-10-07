import { ImageBackground, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import { useRouter } from "expo-router";
import {Colors} from "@/constants/Colors"
import Animated, { FadeInDown, FadeInRight } from "react-native-reanimated";
import { StatusBar } from "expo-status-bar";
const Page = () => {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <StatusBar style="light"/>
      <ImageBackground source={require("@/assets/images/getting-started.jpg")}
      style={{flex:1}}
      resizeMode="cover"
      >
      <View style={styles.wrapper}>
      <Animated.Text style={styles.title}
      entering={FadeInRight.delay(300).duration(500)}
      >Stay Up-To-date</Animated.Text>
      <Animated.Text style={styles.desc}
      entering={FadeInRight.delay(700).duration(500)}
      >Get All Breaking News Around You!</Animated.Text>
      <Animated.View entering={FadeInDown.delay(1200).duration(500)}>
      <TouchableOpacity onPress={() => router.replace("/(tabs)")
      }
        style={styles.btn}> 
      
        <Animated.Text style={styles.btntext}>Get Started</Animated.Text>
      </TouchableOpacity>
      </Animated.View>
      </View>
      </ImageBackground>
    </View>
  );
};

export default Page;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    
  },
  wrapper:{
    flex:1,
    justifyContent:"flex-end",
    paddingBottom:30,
    paddingHorizontal:30,
    gap:10,
    backgroundColor:'rgba(0,0,0,0.5)'
  },
  title:{
    fontSize:24,
    fontWeight:'600',
    color:Colors.white,
    letterSpacing:1.5,
    lineHeight:36,
    textAlign:'center',
  },
  desc:{
    color:Colors.white,
    fontSize:16,
    fontWeight:'500',
    letterSpacing:1.2,
    lineHeight:22,
    textAlign:'center',
  },
  btn:{
    backgroundColor:Colors.tint,
    paddingVertical:15,
    marginVertical:20,
    borderRadius:15,
    alignItems:'center',
  },
  btntext:{
    fontSize:20,
    fontWeight:'700',
    color:Colors.white,
  }
});

//if we put router.push the user will be able to move back to the welcome screen but since we dont want that we use router.replace