import React, {Component} from 'react';
import { View, ScrollView,TouchableOpacity, Text, StyleSheet, Dimensions, Button } from 'react-native';
import SoundPlayer from 'react-native-sound-player'

import { NavigateTo } from '../constants/GeneralMethods';
import {connect} from 'react-redux';
import {saveScreen} from '../redux/actions/navigator';

class MixPlay extends Component{

    constructor(props) {
        super(props);
        this.state = { title: ''};
      }

    componentDidMount(){
        this.props.saveScreen('MixPlay');
        let title =  this.props.route.params && this.props.route.params.mix || ''
        this.setState({title})     
        setTimeout(() => {
             (async () => {
            let url = `https://www.mixesdb.com/db/api.php?action=query&prop=info&titles=${this.state.title}&inprop=url&format=json`;
            try{
                let res = await fetch(url);
               let response = await res.json();
               let key = Object.keys(response.query.pages)[0];
               console.log(response.query.pages[key]['canonicalurl'])
               let mixUrl= response.query.pages[key]['canonicalurl'] 
               console.log(mixUrl) 
             // !!mixUrl && SoundPlayer.playUrl(mixUrl)
            }catch(e){
                console.log(e);
            }
        })();
        }, 250);
       
    }
   
    render(){
        return (
            <View><Text style={styles.listItem}> Mix: {this.state.title}</Text> 
                  <Button title="Go back" onPress={() => NavigateTo(this.props.navigation, 'Home')} />    
            </View>
        );
    }
}


const styles = StyleSheet.create({
    listItem: {
        fontSize: 28,
        backgroundColor: '#4252a0',
        fontWeight: 'bold',
        marginVertical: 25,
        textAlign: 'center',
        color: '#f2f2f2',
        paddingHorizontal: 35,
        paddingVertical: 15,
        borderRadius: 50
        ,elevation: 5,
        padding: 10,  
        fontSize: 18,  
        borderWidth: 1,
        borderColor: 'white',                                    
        paddingHorizontal: 35,
        paddingVertical: 15,
        borderRadius: 50
    }
});

const mapStateToProps = (state) => {
    return {
      screen: state.navigatorReducer.lastPage,
    }
}

const mapDispatchToProps = (dispatch) => {
  return {
    saveScreen: (screen) => {
        dispatch(saveScreen(screen))
    }
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(MixPlay);