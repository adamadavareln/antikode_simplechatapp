import { useNavigation } from '@react-navigation/native'
import React from 'react'
import { View, Text, TouchableOpacity, Keyboard } from 'react-native'
import { colors } from '../../constants'
import BackIcon from './../../assets/images/back.svg'

export default Header = ({
    title,
    withBack = true,
    rightComponent,
}) => {

    const navigation = useNavigation()

    const handleBack = async () => {
        await Keyboard.dismiss()
        setTimeout(() => {
            navigation.goBack()
        }, 100)
    }

    return(
        <View
            style={{
                height:52,
                alignItems:'center',
                flexDirection:'row',
                backgroundColor:colors.white,
                paddingHorizontal:16,
                borderBottomColor:colors.border,
                borderBottomWidth:1,
            }}
        >
            {
                withBack &&
                <TouchableOpacity style={{marginRight:16,}} onPress={handleBack}>
                    <BackIcon/>
                </TouchableOpacity>
            }
            <Text style={{fontSize:24, fontWeight:'700', flex:1, color:colors.text}}>{title}</Text>
            {
                rightComponent
            }
        </View>
    )
}