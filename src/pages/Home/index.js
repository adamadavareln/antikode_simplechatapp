import React, { useEffect, useState } from 'react'
import Header from '../../components/Header'
import { View, ScrollView, Text, TouchableOpacity } from 'react-native' 
import ProfilePicture from '../../components/ProfilePicture'
import ChatItem from '../../components/ChatItem'
import PlusIcon from '../../assets/images/plus.svg'
import { useIsFocused, useNavigation } from '@react-navigation/native'
import { getAllChat, getUserChatMessages } from '../../services/helper'
import { colors } from '../../constants'

export default Home = () => {

    const navigation = useNavigation()
    const isFocused = useIsFocused()

    const [ chats, setChats ] = useState([])


    useEffect(() => {
        getChats()
    },[isFocused])

    const getChats = async () => {
        const temp_chats = await getAllChat()
        setChats(temp_chats)
    }

    return(
        <View
            style={{flex:1,}}
        >
            <Header 
                withBack={false} 
                title="Mini Chat" 
                rightComponent={
                    <TouchableOpacity
                        onPress={() => navigation.navigate('AddChat')}
                    >
                        <PlusIcon/>
                    </TouchableOpacity> 
                } 
            />
            <ScrollView>
                {
                    chats.length > 0 ? chats.map((chat,index) => 
                        <ChatItem data={chat}/>
                    ) :
                    <View
                        style={{
                            alignItems:"center",
                            justifyContent:'center',
                            marginTop:64,
                        }}
                    >
                        <TouchableOpacity
                            onPress={() => navigation.navigate('AddChat')}
                            style={{
                                backgroundColor:colors.green,
                                height:52,
                                flexDirection:'row',
                                alignItems:'center',
                                paddingHorizontal:16,
                                borderRadius:16,
                            }}
                        >
                            <Text style={{color:colors.white, fontSize:16,}}>Add New Chat</Text>
                        </TouchableOpacity>
                    </View>
                }
            </ScrollView>
        </View>
    )
}