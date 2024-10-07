import { View, StyleSheet,TextInput } from 'react-native'
import React from 'react'
import { Ionicons } from '@expo/vector-icons'
import { Colors } from '@/constants/Colors'


type Props = {
  setSreachQuery: Function
}

const SearchBar = ({setSreachQuery}: Props) => {
  return (
    <View  style={styles.container}>
        <Ionicons name="search-outline" size={20} color={Colors.lightGrey}/>
      <TextInput style={styles.text} 
      placeholder='Search' 
      placeholderTextColor={Colors.lightGrey} 
      autoCapitalize="none"
      onChangeText={query => setSreachQuery(query)}
      />
    </View>
  )
}

export default SearchBar

const styles = StyleSheet.create({
    container: {
        marginHorizontal:15,
        paddingHorizontal:10,
        paddingVertical:12,
        backgroundColor:Colors.greybackground,
        flexDirection:'row',
        alignItems: 'center',
        borderRadius:10,
        gap:10,
        marginBottom:20
        },
    text:{
        flex:1,
        fontSize: 16,
        color:Colors.darkGrey
    },
})