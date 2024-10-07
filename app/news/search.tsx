import { ActivityIndicator, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { Link, router, Stack, useLocalSearchParams } from 'expo-router'
import axios from 'axios'
import { NewsDataType } from '@/types'
import { Ionicons } from '@expo/vector-icons'
import { Colors } from '@/constants/Colors'
import { FlatList } from 'react-native-gesture-handler'
import { NewsItem } from '@/components/NewsList'

type Props = {}

const search = (props: Props) => {
    const {query,category,country}= useLocalSearchParams<{query:string, category:string, country:string}>();
    const [News, setNews]=useState<NewsDataType[]>([]);
    const [Loading, setLoading]=useState(true);

    const getNews = async (category:string='') => {
        try {
          let categoryString='';
          let countryString='';
          let queryString= '';
          if(category){
            categoryString=`&category=${category}`
          }
          if(country){
            countryString=`&country=${country}`
          }
          if(query){
            queryString=`&q=${query}`
          }
          const URL = `https://newsdata.io/api/1/news?apikey=${process.env.EXPO_PUBLIC_API_KEY}&language=ar,en&image=1&removeduplicate=1&size=10&${categoryString}${countryString}${queryString}`;
          const response = await axios.get(URL);
          if (response && response.data) {
            setNews(response.data.results);
            setLoading(false);
          }
        } catch (err) {
          console.log(err);
        }
      };
    useEffect(()=>{
        getNews();
    }, []);

  return (
    <>
    <Stack.Screen options={{
        headerLeft:() =>(
            <TouchableOpacity onPress={() => router.back()}>
                <Ionicons name="arrow-back" size={22} />
            </TouchableOpacity>
        ),
        title:"Search Results"
    }}/>
    <View style={styles.container}>
    {Loading ? (
          <ActivityIndicator size="large" color={Colors.black} />
        ) : (
         <FlatList 
         data={News}
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

export default search

const styles = StyleSheet.create({
    container:{
        flex:1,
        marginHorizontal:20,
        marginVertical:20,
    },
    itemList:{

    },
    itemTitle:{

    },
})