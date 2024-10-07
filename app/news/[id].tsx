import { ActivityIndicator,Image, StyleSheet, Text, TouchableOpacity, View,ScrollView } from 'react-native'
import React, { useEffect, useState } from 'react'
import {router, Stack, useLocalSearchParams } from 'expo-router'
import { Ionicons } from '@expo/vector-icons'
import { NewsDataType } from '@/types'
import axios from 'axios'
import { Colors } from '@/constants/Colors'
import Moment from 'moment'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { NewsItem } from '@/components/NewsList'

type Props = {}

const NewsDetails = (props: Props) => {
    const {id} = useLocalSearchParams<{id:string}>();
    const [News, setNews] = useState<NewsDataType[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [Bookmark, setBookmark]=useState(false);
    const getNews = async () => {
        try {
          const URL = `https://newsdata.io/api/1/news?apikey=${process.env.EXPO_PUBLIC_API_KEY}&id=${id}`;
          const response = await axios.get(URL);
          if (response && response.data) {
            setNews(response.data.results);
            setIsLoading(false);
          }
        } catch (err) {
          console.log(err);
        }
      };
      useEffect(() => {
        getNews();
      }, []);

      useEffect(() => {
        if(!isLoading){
        renderBookmark(News[0].article_id);
        }
      }, [isLoading]);
      
    const saveBookMark = async (NewsId:string) => {
        setBookmark(true);
        await AsyncStorage.getItem("bookmark").then((token) =>{
            if(token){
                const res= JSON.parse(token);
            if (res!==null){
                let data=res.find((value:string)=>value===NewsId);
                if(data==null){
                    res.push(NewsId);
                    AsyncStorage.setItem("bookmark", JSON.stringify(res));
                    alert("News Saved");
                }
            }
            else{
                let bookmark=[];
                bookmark.push(NewsId);
                AsyncStorage.setItem("bookmark", JSON.stringify(bookmark));
                alert("News Saved");
            }
            }
        });
    }
    const removeBookmark =async (newsId:string) => {
        setBookmark(false);
        const bookmark= await AsyncStorage.getItem("bookmark").then((token) =>{
            if(token){
                const res= JSON.parse(token);
                return res.filter ((id:string) => id!==newsId);
            }
        });
        await AsyncStorage.setItem("bookmark", JSON.stringify(bookmark));
        alert("News Removed")
    }
    const renderBookmark = async(newsId:string)=>{
        await AsyncStorage.getItem("bookmark").then((token)=> {
            if(token){
            const res=JSON.parse(token);
            if(res!=null){
                let data=res.dinf((value:string) => value===newsId);
                return data== null ? setBookmark(false):setBookmark(true)
            }
        }
        });
    }
  return (
    <>
    <Stack.Screen options={{
        headerLeft:() =>(
            <TouchableOpacity onPress={() => router.back()}>
                <Ionicons name='arrow-back' size={22} />
            </TouchableOpacity>
        ),
        headerRight:() =>(
            <TouchableOpacity onPress={() =>Bookmark?removeBookmark(News[0].article_id):saveBookMark(News[0].article_id)}>
                <Ionicons name={Bookmark?'heart' : 'heart-outline'} size={22} color={Bookmark?"red":"black"} />
            </TouchableOpacity>
        ),
        title:''
    }} />
    {isLoading ? (
          <ActivityIndicator size="large" color={Colors.black} />
        ) : (
            <ScrollView contentContainerStyle={styles.container} style={styles.contentContainer}>
            <Text style={styles.title} >{News[0].title}</Text>
            <View style={styles.Sourceinfo}>
                <View style={styles.source}>
                <Image source={{uri: News[0].source_icon}} style={styles.icon}/>
                <Text style={styles.Newsinfo}>{News[0].source_name}</Text>
                </View>
                <Text style={styles.Newsinfo}>{News[0].pubDate}</Text>
            </View>
            <Image source={{uri:News[0].image_url}} style={styles.newsImage}/>
            {News[0].content ? (
                <Text style={styles.newsContent}>{News[0].content}</Text>
            ):
            (
                <Text style={styles.newsContent}>{News[0].description}</Text>
            )
        }
            
          </ScrollView>
        )}
    
    </>
    
  )
}

export default NewsDetails

const styles = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:Colors.white,
        marginHorizontal:2,
        paddingBottom:30,
    },
    contentContainer:{
     paddingBottom:30,
    },
    newsImage:{
        width:'100%',
        height:300,
        marginBottom:20,
        borderRadius:10,
    },
    Sourceinfo:{
        flexDirection:'row',
        justifyContent:'space-between',
        marginBottom:20,
    },
    Newsinfo:{
        fontSize:12,
        color:Colors.darkGrey
    },
    title:{
        fontSize:16,
        fontWeight:'600',
        marginVertical:10,
        color:Colors.black,
        letterSpacing:0.6
    },
    newsContent:{
        fontSize:14,
        letterSpacing:0.8,
        lineHeight:22,
        color:Colors.lightGrey,
    },
    icon:{
        width:20,
        height:20,
        borderRadius:20,
    },
    source:{
        marginHorizontal:10,
        flexDirection:'row',
        gap:5
    }
})