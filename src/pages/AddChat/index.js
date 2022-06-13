import React, {useState, useEffect} from 'react'
import Header from '../../components/Header'
import { View, ScrollView, Text, TextInput, TouchableOpacity } from 'react-native' 
import ProfilePicture from '../../components/ProfilePicture'
import ChatItem from '../../components/ChatItem'
import { colors, SCREEN_WIDTH } from '../../constants'
import chats from '../../constants/chats'
import ImageIcon from './../../assets/images/image.svg'
import SendIcon from './../../assets/images/send.svg'
import { addNewChat, saveUserChatData } from '../../services/helper'
import users from '../../constants/users'
import { useNavigation } from '@react-navigation/native'

export default ChatRoom = () => {

    const navigation = useNavigation()

    const handleAddChat = async (userData) => {
        await addNewChat(userData)
        navigation.goBack()
        navigation.navigate('ChatRoom', {userId:userData.id})
    }

    return(
        <View
            style={{flex:1, backgroundColor:'white'}}
        >
            <Header title={"Add New Chat"} />
            <ScrollView>
                <View
                    style={{
                        padding:16,
                        borderBottomColor:colors.background, 
                        borderBottomWidth:1
                    }}
                >
                    <Text style={{color:'#555', }}>Select user to chat with</Text>
                </View>
                {
                    users.map((user, index) => 
                        <TouchableOpacity
                            onPress={() => handleAddChat(user)}
                            style={{
                                borderBottomColor:colors.border,
                                borderBottomWidth:1,
                                paddingVertical:12,
                                paddingHorizontal:16,
                                flexDirection:'row',
                                alignItems:'center',
                            }}
                        >
                            <ProfilePicture size={52} fontSize={20} name={user.name}/>
                            <Text style={{fontSize:16, marginLeft:16,fontWeight:'500', color:colors.text}}>{user.name}</Text>
                        </TouchableOpacity>
                    )
                }
            </ScrollView>
        </View>
    )
}