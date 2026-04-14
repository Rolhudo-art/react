import { useEffect } from "react";
import { ImageBackground, Image, StyleSheet } from "react-native";



export default function Splash({navigation}){

    useEffect(()=>{

        const time = setTimeout(()=>{


            navigation.replace("Login");

        },3000)

        return ()=>clearTimeout(time);


    },[])


    return(

        <ImageBackground source={require('../assets/background.jpg')}>

<Image         />
        </ImageBackground>
    )
}

const style = StyleSheet.create({
    colorback:{

        flex:1,
        justifyContent:"center",
        alignItems:"center",
        backgroundColor:"#FFFFFF"
    },


    ImgLogo:{
        height:350,
        width:350,
    },
})