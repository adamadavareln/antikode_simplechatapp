import React from 'react'
import { View, Text } from 'react-native'
import { colors } from '../../constants';
import { getInitialName } from '../../services/helper'

export default ProfilePicture = ({name, size = 52, fontSize=20}) => {

    const color = "hsl(" + Math.random() * 360 + ", 100%, 75%)";;

    return(
        <View
            style={{
                height:size,
                width:size,
                borderRadius:size,
                alignItems:'center',
                justifyContent:'center',
                flexDirection:'row',
                backgroundColor:"#" + color,
                borderBottomColor:colors.border,
                borderBottomWidth:1,
            }}
        >
            <Text style={{fontSize:fontSize, fontWeight:'700'}}>{getInitialName(name)}</Text>
        </View>
    )
}