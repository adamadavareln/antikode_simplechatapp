import React, {useState, useEffect, createRef, useRef} from 'react'
import Header from '../../components/Header'
import { View, ScrollView, Text, TextInput, TouchableOpacity, Image, Keyboard } from 'react-native' 
import ProfilePicture from '../../components/ProfilePicture'
import ChatItem from '../../components/ChatItem'
import { colors, SCREEN_WIDTH } from '../../constants'
import chats from '../../constants/chats'
import ImageIcon from './../../assets/images/image.svg'
import SendIcon from './../../assets/images/send.svg'
import { autoReply, getUserChatMessages, saveUserChatData, saveUserChatMessages, timeSince } from '../../services/helper'
import {launchImageLibrary} from 'react-native-image-picker'
import moment from 'moment'

const MessageItem = ({data}) => {

    const isMe = data.userId == 0

    const time = moment(data.time).format("hh:mm A")
    // const image = "data:image/png;base64,"+
    
    return(
        <View
            style={{
                alignItems: isMe ?'flex-end' : 'flex-start',
                padding:12,
            }}
        >
            {
                data.image ?
                <Image
                    style={{
                        width:SCREEN_WIDTH*(3/5),
                        height:SCREEN_WIDTH*(3/5),
                        backgroundColor:colors.gray,
                        borderRadius:16,
                    }}
                    source={{uri:data.image}}
                /> :
                <View
                    style={{
                        backgroundColor: isMe ? colors.myChatBackgruond : colors.opponentChatBackground,
                        paddingHorizontal:12,
                        paddingVertical:8,
                        borderRadius:12,
                        maxWidth:SCREEN_WIDTH*(3/5)
                    }}
                >
                    <Text style={{color: isMe ? colors.white : colors.text, fontWeight:'500'}}>{data.message}</Text>
                </View>
            }
            <Text style={{fontSize:12, marginTop:4,}}>{time}</Text>
        </View>
    )
}

export default ChatRoom = ({route}) => {

    const {
        userId = 0
    } = route.params

    const [ chatData, setChatData ] = useState()
    const [ messages, setMessages ] = useState([])
    const [ message, setMessage] = useState("")

    const scrollViewRef = useRef()

    useEffect(() => {
        getMessages()
    },[])

    const getMessages = async () => {
        const chatData = await getUserChatMessages(userId)
        setChatData(chatData)
        setMessages(chatData?.messages || [])
    }

    const handleSendMessage = (image = null) => {
        if( image != null || message != "" ) {
            var temp_messages = [...messages]
            temp_messages.push({
                userId:0,
                message,
                image,
                time : moment()
            })
            setMessage("")
            saveUserChatMessages(temp_messages, userId)
            setMessages(temp_messages)
            setTimeout(() => {
                autoReplyUser()
            }, 1500)
        }
        Keyboard.dismiss()
    }
    
    const autoReplyUser = async () => {
        await autoReply(userId)
        getMessages()
    }

    const handleSendImage = async () => {
        const result = await launchImageLibrary()
        console.log(result)
        handleSendMessage(result.assets[0].uri)
    }

    return(
        <View
            style={{flex:1, backgroundColor:colors.white}}
        >
            <Header title={chatData?.name} />
            <ScrollView
                ref={scrollViewRef}
                onContentSizeChange={() => scrollViewRef.current.scrollToEnd({animated: true})}
            >
                {
                    messages.map((message, index) => 
                        <MessageItem data={message}/>
                    )
                }
            </ScrollView>
            <View
                style={{
                    flexDirection:'row',
                    paddingVertical:16,
                    paddingHorizontal:12,
                }}
            >
                <View
                    style={{
                        height:52,
                        flex:1,
                        borderRadius:52,
                        marginRight:16,
                        backgroundColor:colors.inputBackground,
                        flexDirection:'row',
                        alignItems:'center',
                    }}
                >
                    <TextInput
                        placeholder='Type text here'
                        placeholderTextColor={"#aaa"}
                        value={message}
                        style={{
                            backgroundColor:colors.inputBackground,
                            height:52,
                            borderRadius:52,
                            paddingLeft:16,
                            flex:1,
                        }}
                        onChangeText={(text) => setMessage(text)}
                    />
                    <TouchableOpacity
                        style={{
                            marginHorizontal:24
                        }}
                        onPress={handleSendImage}
                    >
                        <ImageIcon/>
                    </TouchableOpacity>
                </View>
                <TouchableOpacity
                    onPress={() => handleSendMessage()}
                    activeOpacity={0.8}
                    style={{
                        height:52,
                        width:52,
                        borderRadius:52,
                        backgroundColor:colors.blue,
                        alignItems:'center',
                        justifyContent:'center',
                    }}
                >
                    <SendIcon/>
                </TouchableOpacity>

            </View>
        </View>
    )
}