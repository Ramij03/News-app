import { Dimensions, StyleSheet, Image,Text, View, TouchableOpacity } from 'react-native'
import React from 'react'
import { NewsDataType } from '@/types'
import Animated,{ Extrapolation, interpolate, SharedValue, useAnimatedStyle } from 'react-native-reanimated'
import { LinearGradient } from 'expo-linear-gradient'
import { Colors } from '@/constants/Colors'
import { Link } from 'expo-router'

type Props = {
    slideItem: NewsDataType,
    index:number
    scrollX:SharedValue<number>
}

const {width}= Dimensions.get('screen');

const SliderItem = ({slideItem,index, scrollX}: Props) => {

    const rnStyle = useAnimatedStyle(() =>{
        return {
            transform:[
            {
                translateX: interpolate(
                    scrollX.value,
                    [(index - 1)*width, index *width, (index + 1)*width],
                    [ -width *0.15 , 0, width *0.15],
                    Extrapolation.CLAMP
                ),
            },
            {
                scale: interpolate(
                    scrollX.value,
                    [(index - 1)*width, index *width, (index + 1)*width],
                    [0.9, 1, 0.9],
                    Extrapolation.CLAMP
                ),
            },
            ],
        };
    });
  return (
    <Link href={`/news/${slideItem.article_id}`} asChild>
    <TouchableOpacity>
    <Animated.View 
    style={[styles.itemWrapper, rnStyle]}
    key={slideItem.article_id}
    >
      <Image source={{uri: slideItem.image_url}} style={styles.image} />
      <LinearGradient 
      colors={["transparent", 'rgba(0,0,0,0.8)']}
      style={styles.gradient} 
      >
    <View style={styles.info}>
        {slideItem.source_icon &&(
            <Image source={{uri: slideItem.source_icon}} style={styles.icon} />
        )}
    <Text style={styles.title}>{slideItem.source_name}</Text>
    </View>
    
    <Text style={styles.desc} numberOfLines={2}>{slideItem.title}</Text>
    
      </LinearGradient>
      
    </Animated.View>
    </TouchableOpacity>
    </Link>
  )
}

export default SliderItem

const styles = StyleSheet.create({
    itemWrapper: {
        //position:'relative',
        width: width,
        justifyContent:'center',
        alignItems:'center'
        },
    image:{
        width:width-60,
        height:180,
        borderRadius:20,
    },
    gradient:{
        position:'absolute',
        width:width-60,
        height:180,
        borderRadius:20,
        left:30,
        right:0,
        top:0,
        padding:20,
    },
    info:{
        top:85,
        gap:10,
        flexDirection:'row',
        alignItems:'center',
       
    },
    title:{
        fontSize:14,
        color:Colors.white,
        fontWeight:'600',
    },
    desc:{
        fontSize:12,
        color:Colors.white,
        position:'absolute',
        paddingHorizontal:20,
        top:140,
        fontWeight:'600',
        marginTop:5
    },
    icon:{
        width:35,
        height:35,
        borderRadius:20
    }
})