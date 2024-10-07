import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import SearchBar from '@/components/SearchBar'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { Colors } from '@/constants/Colors'
import CheckBox from '@/components/CheckBox'
import useNewsCategories from '@/constants/useNewsCategories'
import useNewsCountries from '@/constants/useNewsCountries'
import { Link } from 'expo-router'

type Props = {}

const Page = (props: Props) => {
  const { top: safeTop } = useSafeAreaInsets();

  const {newsCategories,toggleNewsCategory}= useNewsCategories();
  const {newsCountry,toggleNewsCountry}= useNewsCountries();
  const [searchQuery,setsearchQuery]=useState("");
  const [category,setCategory]=useState("");
  const [country,setCountry]=useState("");
  return (

    <View style={[styles.container, { paddingTop: safeTop +20 }]} >
      <SearchBar setSreachQuery={setsearchQuery}/>
      <View style={styles.catContainer}>
        <Text style={styles.title}>Categories</Text>
        <View style={styles.listcontainer}>{newsCategories.map((item) =>(
          <CheckBox key={item.id} label={item.title} checked={item.selected} onPress={()=>{
            toggleNewsCategory(item.id)
            setCategory(item.slug)
          }}/>
        ))}</View>
      </View>

      <View style={styles.catContainer}>
        <Text style={styles.title}>Countries</Text>
        <View style={styles.listcontainer}>{newsCountry.map((item,index) =>(
          <CheckBox key={item.code} label={item.name} checked={item.selected} onPress={()=>{
            toggleNewsCountry(index)
            setCountry(item.code)
          }}/>
        ))}</View>
      </View>
      <Link href={{
        pathname: `/newssearch`,
        params:{query:searchQuery, category,country}
        
      }} asChild>
      <TouchableOpacity style={styles.searchBtn}>
        <Text style={styles.searchbtnText}>Search</Text>
      </TouchableOpacity>
      </Link>
    </View>
  )
}

export default Page

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  catContainer:{
    paddingHorizontal:20,
  },
  listcontainer:{

  },
  title:{
    fontSize:24,
    fontWeight:'600',
    color:Colors.black,
    marginBottom:10,
  },
  searchBtn:{
    backgroundColor:Colors.tint,
    alignItems:'center',
    padding:14,borderRadius:10,
    marginVertical:10,
  },
  searchbtnText:{
    color:Colors.white,
    fontSize:16,
    fontWeight:'600'
  },
})