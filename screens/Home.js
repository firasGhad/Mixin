import React from 'react';
import { NavigateTo } from '../constants/GeneralMethods';


import {
    StyleSheet,
    ScrollView,
    View,
    Text,
    Image,
    TouchableOpacity,
} from 'react-native';



export default class Home extends React.Component {
    constructor(props) {
        super(props)
    }

    state = { 
        mixes: []
     }

    componentDidMount(){
        let mixes;
        (async () => {
            let url = 'https://www.mixesdb.com/db/api.php?action=query&format=json&list=recentchanges&rcnamespace=0&rcstart=&rcprop=user%7Ctimestamp%7Ctitle&rclimit=75&rctype=new&redirects=';
            try{
                let res = await fetch(url);
                let response = await res.json();
                 mixes =response.query.recentchanges;
                this.setState({ mixes });

            }catch(e){
                console.log(e);
            }
        })();
    }

    onPressHandler = (mix) => {
        NavigateTo(this.props.navigation, 'MixPlay', {mix: mix});
   }
  

    render() {
        return (
            <View id="home">
                <ScrollView>
                        <View>
                            <View title='Welcome'>
                                <Text style={styles.header}>All Mixes</Text>
                            </View>
                            { !!this.state.mixes ? this.state.mixes.map((item, index) => 
                               <TouchableOpacity key={index} title={item.title} onPress={() =>this.onPressHandler(item.title)}>
                               <Text style={styles.Welcome}>{item.title}</Text>
                               </TouchableOpacity>
                            ) : <Text>Loading...</Text>}
                           
                             
                        </View>
                </ScrollView>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        paddingTop: 50,
        justifyContent: 'center',
        alignItems: 'center',
    },
       Welcome: {
        fontSize: 28,
        backgroundColor: '#4252a0',
        fontWeight: 'bold',
        marginVertical: 25,
        textAlign: 'center',
        color: '#f2f2f2',
        paddingHorizontal: 35,
        paddingVertical: 15,
        elevation: 5,
        padding: 10,  
        fontSize: 18,  
        borderWidth: 1,
        borderColor: 'white',                                    
        paddingHorizontal: 35,
        paddingVertical: 15,
    },
    header: {
        borderColor: 'white',                                    
        paddingHorizontal: 35,
        paddingVertical: 15,
        borderRadius: 50
    }
});



