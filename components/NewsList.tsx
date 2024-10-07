import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import { NewsDataType } from '@/types'
import { Colors } from '@/constants/Colors'
import { Link } from 'expo-router'

type Props = {
    newsList: NewsDataType[]
}

const NewsList = ({newsList}: Props) => {
  return (
    
    <View style={styles.container}>
      {newsList.map((item,index)=>(
        <Link href={`/news/${item.article_id}`} asChild key={index}>
        <TouchableOpacity>
            <NewsItem item={item} />
        </TouchableOpacity></Link>
      ))}
    </View>
    
    
  )
}
export default NewsList

export const NewsItem = ({item}:{item:NewsDataType}) =>{
    return(
        <View style={styles.itemContainer}>
            <Image source={{uri :item.image_url}} style={styles.itemImage}/>
            <View style={styles.itemInfo}>
            <Text style={styles.itemCat}>{item.category}</Text>
            <Text style={styles.itemTitle}>{item.title}</Text>
            <View style={styles.SourceInfo}>
                <Image source={{uri:item.source_icon}} style={styles.icon}/>
                <Text style={styles.name}>{item.source_name}</Text>
            </View>
            </View>
            
        </View>
    )
}
const styles = StyleSheet.create({
    container:{
        marginHorizontal:20,
    },
    itemContainer:{
        flexDirection:'row',
        alignItems:'center',
        marginBottom:30,
        flex:1,
        gap:10
    },
    itemImage:{
        width:90,height:100,
        borderRadius:20,
        marginRight:10,
    },
    itemInfo:{
        flex:1,
        gap:10,
        justifyContent:'space-between'
    },
    itemCat:{
        fontSize:12,
        color:Colors.darkGrey,
        textTransform:'capitalize'
    },
    itemTitle:{
        fontSize:12,
        fontWeight:'600',
        color:Colors.black
    },
    SourceInfo:{
        flexDirection:'row',
        gap:5,
        alignItems:'center'
    },
    icon:{
        width:20,
        height:20,
        borderRadius:20,
    },
    name:{
        fontSize:10,
        fontWeight:'400',
        color:Colors.darkGrey
    },
    
})