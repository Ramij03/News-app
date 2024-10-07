import { StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'
import SearchBar from '@/components/SearchBar'
import Categories from '@/components/Categories'
import { NewsDataType } from '@/types'
import axios from 'axios'
import Countries from '@/components/Countries'

type Props = {}

const Page = (props: Props) => {
  const [News, setNews] = useState<NewsDataType[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [NewsCountry, setNewsCountry] = useState<NewsDataType[]>([]);
  const getNews = async (category:string='') => {
    try {
      let categoryString='';
      if(category.length!=0){
        categoryString=`&category=${category}`
      }
      const URL = `https://newsdata.io/api/1/news?apikey=${process.env.EXPO_PUBLIC_API_KEY}&language=ar,en&image=1&removeduplicate=1&size=10&${categoryString}`;
      const response = await axios.get(URL);
      if (response && response.data) {
        setNews(response.data.results);
        setIsLoading(false);
      }
    } catch (err) {
      console.log(err);
    }
  };
  const onCatChanged = (category: string) => {
    setNews([]);
    getNews(category);
  };
  const getNewsCountry = async (country:string='') => {
    try {
      let countryString='';
      if(country.length!=0){
        countryString=`&country=${country}`
      }
      const URL = `https://newsdata.io/api/1/news?apikey=${process.env.EXPO_PUBLIC_API_KEY}&language=ar,en&image=1&removeduplicate=1&size=10&${countryString}`;
      const response = await axios.get(URL);
      if (response && response.data) {
        setNews(response.data.results);
        setIsLoading(false);
      }
    } catch (err) {
      console.log(err);
    }
  };
  const onCountryChanged = (category: string) => {
    setNewsCountry([]);
    getNewsCountry(category);
  };

  return (
    <View style={styles.container}>
      <SearchBar />
      <Categories onCategoryChanged={onCatChanged}/>
      <Countries onCountryChanged={onCountryChanged}/>
    </View>
  )
}

export default Page

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop:60,
  },
})