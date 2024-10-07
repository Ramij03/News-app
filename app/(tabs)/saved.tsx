import { ActivityIndicator, FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { Link, Stack } from 'expo-router';
import { Colors } from '@/constants/Colors';
import { NewsItem } from '@/components/NewsList';
import { useIsFocused } from '@react-navigation/native';

type Props = {}

const Page = (props: Props) => {
  const [bookmarkNews, setbookmarkNews]=useState([]);
  const [isLoading, setisLoading]=useState(true);
  const isFocused= useIsFocused();
  useEffect(()=>{
    fetchBookmark();
  },[isFocused]);
  const fetchBookmark = async () =>{
    await AsyncStorage.getItem('bookmark').then(async (token)=>{
      if (token){
        const res=JSON.parse(token);
        setisLoading(true);
        if(res){
          let query_string = res.join(',');
          const response =await axios.get(`https://newsdata.io/api/1/news?apikey=${process.env.EXPO_PUBLIC_API_KEY}&id=${query_string}`);
          const news=response.data.results;
          setbookmarkNews(news);
          setisLoading(false)
        }
      }
      else{
        setisLoading(false);
        setbookmarkNews([]);
      }
    })
  }
  return (
    <>
    <Stack.Screen options={{headerShown:true,
    }}/>
    <View style={styles.container}>
    {isLoading ? (
          <ActivityIndicator size="large" color={Colors.black} />
        ) : (
         <FlatList 
         data={bookmarkNews}
         keyExtractor={(_, index) => `list_item${index}`}
         showsVerticalScrollIndicator={false}
         renderItem={({index,item}) =>{
            return(
                <Link href={`/news/${item.article_id}`} asChild key={index}>
            <TouchableOpacity>
                <NewsItem item={item} />
            </TouchableOpacity></Link>
            )
         }}
         />
        )}
    </View>
    </>
    
  )
}

export default Page

const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin:20,
  },
})