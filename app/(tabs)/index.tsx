import { ActivityIndicator, StyleSheet, View, FlatList } from 'react-native';
import React, { useEffect, useState } from 'react';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Header from "@/components/Header";
import SearchBar from '@/components/SearchBar';
import axios from 'axios';
import { NewsDataType } from '@/types';
import BreakingNews from '@/components/BreakingNews';
import Categories from '@/components/Categories';
import NewsList from '@/components/NewsList';
import { Colors } from '@/constants/Colors';

const Page = () => {
  const { top: safeTop } = useSafeAreaInsets();
  const [breakingNews, setBreakingNews] = useState<NewsDataType[]>([]);
  const [News, setNews] = useState<NewsDataType[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState<string>('business'); // Default category

  useEffect(() => {
    getBreakingNews();
    getNews();
  }, []);

  const getBreakingNews = async () => {
    try {
      const URL = `https://newsdata.io/api/1/news?apikey=${process.env.EXPO_PUBLIC_API_KEY}&country=lb&language=ar,en&category=business,education,politics,sports,technology&image=1&removeduplicate=1&size=6`;
      const response = await axios.get(URL);
      if (response && response.data) {
        setBreakingNews(response.data.results);
        setIsLoading(false);
      }
    } catch (err) {
      console.log(err);
    }
  };
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
  const onCategoryChanged = (category: string) => {
    setSelectedCategory(category); // Update the category state when changed
    setNews([]);
    getNews(category);
  };

  const renderItem = () => {
    return (
      <>
        <Header />
        <SearchBar />
        {isLoading ? (
          <ActivityIndicator size="large" color={Colors.black} />
        ) : (
          <BreakingNews newsList={breakingNews} />
        )}
        <Categories onCategoryChanged={onCategoryChanged} />
        {isLoading ? (
          <ActivityIndicator size="large" color={Colors.black} />
        ) : (
          <NewsList newsList={News}/>
        )}
        
      </>
    );
  };

  return (
    <View style={[styles.container, { paddingTop: safeTop }]}>
      <FlatList
        data={['']} // Using a dummy data array to render the items
        renderItem={renderItem}
        keyExtractor={(item, index) => index.toString()} // Dummy key extractor
        showsVerticalScrollIndicator={false} // Hides the scrollbar
      />
    </View>
  );
};

export default Page;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});
