import { View, Text,StyleSheet, Image, TouchableOpacity } from 'react-native'
import React from 'react'
import { Ionicons } from '@expo/vector-icons'
import { Colors } from '@/constants/Colors'

type Props = {}

const Header = (props: Props) => {
  return (
    <View style={styles.container}>
        <View style={styles.userinfo}>
        <Image 
        source={{uri:"https://xsgames.co/randomusers/avatar.php?g=male"}} 
        style={styles.user}/>
        <View style={{gap:3, flexDirection:'column'}}>
        <Text style={styles.subText}>Welcome!</Text>
        <Text style={styles.text}>UserName</Text>
        </View>
        </View>
        <TouchableOpacity onPress={() => {}}>
        <Ionicons name='notifications-outline' size={24} color={Colors.black} />
        </TouchableOpacity>
    </View>
  )
}

export default Header

const styles= StyleSheet.create({
    container: {
        paddingHorizontal:20,
        flexDirection:'row',
        justifyContent:'space-between',
        alignItems:'center',
        marginBottom:20,
        marginTop:5
    },
    userinfo:{
        flexDirection:'row',
       alignItems:'center',
       gap:10, 
    },
    user:{
        height:50,
        width:50,
        borderRadius:30,
    },
    text:{
        fontSize:14,
        fontWeight:'700',
        color:Colors.black
    },
    subText:{
        fontSize:12,
        fontWeight:'500',
        color:Colors.darkGrey
    },
})