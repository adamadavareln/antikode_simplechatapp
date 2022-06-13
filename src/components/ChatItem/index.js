import { useNavigation } from '@react-navigation/native'
import React from 'react'
import { View, Text, TouchableOpacity } from 'react-native'
import { colors } from '../../constants'
import { timeSince } from '../../services/helper'
import ProfilePicture from '../ProfilePicture'

export default ChatItem = ({data}) => {

    const navigation = useNavigation()

    const time = data.messages.length > 0 ? timeSince(data.messages[data.messages.length-1].time) : null

    return(
        <TouchableOpacity
            onPress={() => navigation.navigate('ChatRoom', {userId:data.userId})}
            style={{
                height:80,
                alignItems:'center',
                flexDirection:'row',
                backgroundColor:colors.white,
                paddingHorizontal:16,
                borderBottomColor:colors.border,
                borderBottomWidth:1,
            }}
        >
            <ProfilePicture name={data.name}/>
            <View style={{marginLeft:12,}} >
                <Text style={{fontSize:14, fontWeight:'700'}}>{data.name}</Text>
                {
                    time ?
                    <Text style={{fontSize:12, fontWeight:'400', color:'#aaa'}}>{time}</Text> : null
                }
            </View>
        </TouchableOpacity>
    )
}