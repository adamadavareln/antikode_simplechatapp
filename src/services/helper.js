import AsyncStorage from "@react-native-async-storage/async-storage"
import moment from "moment"

export const getInitialName = (name) => {
    const fragments = name.split(/[ ,]+/)
    console.log(fragments)
    var initials = ""
    if(fragments.length == 1) {
        console.log("CUMA 1 KATA")
        initials = fragments[0].charAt(0)
    } else if(fragments.length > 1) {
        console.log("LEBIH DARI 1 KATA")
        for(var i = 0; i <2 ; i++){
            console.log(fragments[i])
            initials += fragments[i].charAt(0)
        }
    }
    return initials.toUpperCase()
}

export const getAllChat = async () => {
    const allChatData = JSON.parse(await AsyncStorage.getItem('allChatData')) || []
    console.log(allChatData)
    return allChatData
} 

export const getUserChatMessages = async (userId) => {
    const allChatData = JSON.parse(await AsyncStorage.getItem('allChatData')) || []
    console.log("ALL CHAT", allChatData)
    const searchChatDataIndex = allChatData.findIndex((v) => v.userId == userId)
    return allChatData[searchChatDataIndex]
} 

export const saveUserChatMessages = async (userChatMessages, userId) => {
    const allChatData = JSON.parse(await AsyncStorage.getItem('allChatData')) || []
    const searchChatDataIndex = allChatData.findIndex((v) => v.userId == userId)
    console.log("CHAT INDEX", searchChatDataIndex)
    if(searchChatDataIndex >= 0){
        const temp_allChat = []
        allChatData[searchChatDataIndex].messages = userChatMessages
        const currentUserChatData = allChatData[searchChatDataIndex]
        temp_allChat.push(currentUserChatData)
        allChatData.splice(searchChatDataIndex,1)
        temp_allChat.push(...allChatData)
        await AsyncStorage.setItem('allChatData', JSON.stringify(temp_allChat))
    }
} 

export const autoReply = async (userId) => {
    const allChatData = JSON.parse(await AsyncStorage.getItem('allChatData')) || []
    const searchChatDataIndex = allChatData.findIndex((v) => v.userId == userId)
    if(searchChatDataIndex >= 0){
        allChatData[searchChatDataIndex].messages.push({userId,message:'Hi, this is auto-reply messages.', image:null, time:moment()})
        await AsyncStorage.setItem('allChatData', JSON.stringify(allChatData))
    }
} 

export const addNewChat = async (userData) => {
    const allChatData = JSON.parse(await AsyncStorage.getItem('allChatData')) || []
    const searchChatData = allChatData.findIndex((v) => v.userId == userData.id)
    if(searchChatData < 0){
        allChatData.push({
            userId:userData.id,
            name:userData.name,
            messages:[]
        })
        await AsyncStorage.setItem('allChatData', JSON.stringify(allChatData))
    }
} 

export const timeSince = (date) => {

    console.log(moment(), date)
    var seconds = moment().diff(date, 'seconds');

    console.log(seconds)
  
    var interval = seconds / 31536000;
  
    if (interval > 1) {
      return Math.floor(interval) + " years ago";
    }
    interval = seconds / 2592000;
    if (interval > 1) {
      return Math.floor(interval) + " months ago";
    }
    interval = seconds / 86400;
    if (interval > 1) {
      return Math.floor(interval) + " days ago";
    }
    interval = seconds / 3600;
    if (interval > 1) {
      return Math.floor(interval) + " hours ago";
    }
    interval = seconds / 60;
    if (interval > 1) {
      return Math.floor(interval) + " minutes ago";
    }
    return Math.floor(seconds) + " seconds ago";
  }