import React, {Component} from 'react';
import { View, ScrollView,TouchableOpacity, Text, StyleSheet, Dimensions, Button } from 'react-native';
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
        console.log(title)
        this.setState({title})     
        setTimeout(() => {
             (async () => {
            let url = `https://www.mixesdb.com/db/api.php?action=query&prop=info&titles=${this.state.title}&inprop=url`;
            try{
                let res = await fetch(url);
               console.log(res);
            }catch(e){
                console.log(e);
            }
        })();
        }, 250);
       
    }
   
    render(){
        return (
            <View><Text>Mix</Text> 
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
    },
    flatListContainer: {
        marginTop: 20,
        height: 320,
        shadowColor: '#000',
        shadowOpacity: 0.5,
        shadowOffset: {width: 0.2, height: 0.2},
        shadowRadius: 10, 
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