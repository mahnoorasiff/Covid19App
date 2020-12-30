import * as React from 'react';
import {   StyleSheet, Button, View, Text, ActivityIndicator, Image, AsyncStorageStatic} from 'react-native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';
import { FlatList, TouchableOpacity } from 'react-native-gesture-handler';
import { createStackNavigator } from '@react-navigation/stack';
import { Ionicons, FontAwesome } from "@expo/vector-icons";



 class WorldStats extends React.Component {
   constructor(props) {
    super(props);
    this.state = { isLoading: true };
  }

  componentDidMount() {
    this.getData();
  }

  getData() {
    return fetch('https://covid-19.mathdro.id/api')
      .then(response => response.json())
      .then(responseJson => {
        this.setState(
          {
            isLoading: false,
            dataSource: responseJson,
          },
        
        );
      })
      .catch(error => {
        console.error(error);
      });
  }

  render() {
    if (this.state.isLoading) {
      return (
        <View style={{ flex: 1, padding: 20 }}>
          <ActivityIndicator size="large" color="blue" />
          <Text>Loading Data from JSON Placeholder API ...</Text>
        </View>
      );
    }

    return (
      <View >
        <View style={{backgroundColor:"#383838", justifyContent:"center", alignItems:"center"}}>
        <Image source={require("./assets/covid-19.png")} style={{marginTop:6, width:"100%", height:"25%"}}/>
        <View style={styles.card1}>
        <Text>CONFIRMED CASES: {JSON.stringify(this.state.dataSource.confirmed.value)}</Text>      
        <View>                                          
        <Text>{((this.state.dataSource.confirmed.value/7594000000) *100).toFixed(2) +"%"}
        </Text>
        </View>

        </View>

        <View style={styles.card2}>
        <Text>RECOVERED: {JSON.stringify(this.state.dataSource.recovered.value)}</Text> 
        <View>
        <Text>{((this.state.dataSource.recovered.value/this.state.dataSource.confirmed.value) *100).toFixed(2) +"%"}</Text>
      </View>

        </View>
        <View style={styles.card3}>
        <Text>DEATHS: {JSON.stringify(this.state.dataSource.deaths.value)}</Text>
         <Text>{((this.state.dataSource.deaths.value/this.state.dataSource.confirmed.value) *100).toFixed(2) +"%"}
        </Text>
        </View>
        <View style={styles.card4}>
        <Text>LAST UPDATED: {JSON.stringify(this.state.dataSource.lastUpdate)}</Text>
         </View>   
            
      </View>
      </View>
    );
  } }

class CountryStats extends React.Component {
   constructor(props) {
    super(props);
    this.state = { isLoading: true,
    save:[]};
  }


  componentDidMount() {
    this.getData();
  }

  getData() {
    return fetch('https://coronavirus-19-api.herokuapp.com/countries')
      .then(response => response.json())
      .then(responseJson => {
        this.setState(
          {
            isLoading: false,
            dataSource: responseJson,
          },
        
        );
      })
      .catch(error => {
        console.error(error);
      });
  }


   storeData = async (value1, value2, value3) => {
    try {
      const save1 = JSON.stringify(value)
      const save2 = JSON.stringify(value)
      const save3 = JSON.stringify(value)
      await AsyncStorage.setItem('@storage_Key', save1, save2, save3)
    } catch (e) {
      // saving error
    }
  }



  render() {
    if (this.state.isLoading) {
      return (
        <View style={{ flex: 1, padding: 20 }}>
          <ActivityIndicator size="large" color="blue" />
          <Text>Loading Data from JSON Placeholder API ...</Text>
        </View>
      );
    }

    return (
      <View style={{ paddingTop: 30 }}>
     <FlatList
        data={this.state.dataSource}
        renderItem={({ item }) => (


          <TouchableOpacity onPress={() => this.props.navigation.navigate('CountryStatsDetails',{country:item.country, cases:item.cases, deaths:item.deaths, recovered: item.recovered, critical: item.critical})} activeOpacity={0.5}>
            <View
              style={{
                flexDirection: 'row',
                padding: 10,
                borderBottomWidth: 1,
                borderColor: 'grey',
                borderRadius: 8,
                justifyContent:"space-between",
                backgroundColor: '#f07167',
                width:"99%",
                marginBottom:10,
                
              }}>
                        
              
              
                <Text style={{}}>
                  {item.country}
                </Text>
                   
                <TouchableOpacity activeOpacity={0.6}>
                <View >
              <FontAwesome onPress={()=>this.storeData(item.country, item.cases, item.deaths)} name="heart" size={30} color="pink"/>
              </View>
            </TouchableOpacity>
            


              
              </View>
                </TouchableOpacity>
              
        )}
      />

    </View>
  );
}
}


class CountryStatsDetails extends React.Component {
   constructor(props) {
    super(props);
  }
render(){

    return (
      <View style={{ paddingTop: 30 }}>{
this.props.navigation.setOptions({
      headerTitle: () => (
        <View style={{ paddingBottom: 20, paddingLeft:20 }}>
            <Text>{this.props.route.params.country}</Text>
      </View>
      )})
      }      
 
     <TouchableOpacity  activeOpacity={0.6}>
            <View
              style={{
                padding: 15,
                borderBottomWidth: 1,
                borderColor: 'grey',
                flexDirection:"column",
                width:"100%",
                

    
              }}>
              
            <Text style={{  borderWidth: 5,
            fontSize:23,
                borderColor: 'white',
                borderRadius: 6,
                marginBottom:10,
                backgroundColor: '#ffff3f'}}>Cases: {"                           "+this.props.route.params.cases}</Text>
            <Text style={{  borderWidth: 5,
            fontSize:23,
                borderColor: 'white',
                borderRadius: 6,
                marginBottom:10,
                backgroundColor: '#468faf'}} >Critical:  {"                         "+this.props.route.params.critical}</Text>
            <Text style={{  borderWidth: 5,
                borderColor: 'white',
                fontSize:23,
                marginBottom:10,
                borderRadius: 6,
                backgroundColor: '#f07167'}}>Deaths:  {"                        "+this.props.route.params.deaths}</Text>
            <Text style={{  borderWidth: 5,
                borderColor: 'white',
                fontSize:23,
                borderRadius: 6,
                backgroundColor: '#55a630'}}>Recovered:  {"                 "+this.props.route.params.recovered}</Text>
        
</View>
  </TouchableOpacity>
  </View>
    );
}
}

class FavCountry extends React.Component {
   constructor(props) {
    super(props);
    this.state = { isLoading: true,
    saved:[]
     };
    
  }

   getData = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem('@storage_Key')
      return jsonValue != null ? JSON.parse(jsonValue) : null;
    } catch(e) {
      // error reading value
    }
  }




render(){
return{

}

}
}



const Stack = createStackNavigator();
const StackNavigator = () => {
  return (
    <Stack.Navigator
      initialRouteName={"WorldStats"}
    >
      <Stack.Screen
        name="CountryStats"
        component={CountryStats}
        options={({ navigation }) => ({
          title: 'Countries Statistics',
          headerLeft: () => <View style={{ paddingLeft: 10 }}>
            <Ionicons
              name="md-menu"
              size={32}
              color="black"
              onPress={() => navigation.toggleDrawer()}
            />
          </View>
        })
        }
      />
      <Stack.Screen
        name="CountryStatsDetails"
        component={CountryStatsDetails}
        options={({ navigation }) => ({
          
          headerLeft: () => <View style={{paddingLeft: 10 }}>
            <Ionicons
              name="md-arrow-round-back"
              size={32}
              color="black"
              onPress={() => navigation.goBack()}
            />
          </View>
          })
        }
      />

<Stack.Screen
        name="FavCountry"
        component={FavCountry}
        options={({ navigation }) => ({
          title: 'Favourite Countries',
          headerLeft: () => <View style={{paddingLeft: 10 }}>
            <Ionicons
              name="md-arrow-round-back"
              size={32}
              color="black"
              onPress={() => navigation.goBack()}
            />
          </View>
          })
        }
      />    



      
    </Stack.Navigator>
  )
}

const Drawer = createDrawerNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Drawer.Navigator initialRouteName="World Stats"
    >


        <Drawer.Screen name="World Statistics" component={WorldStats}
          />
        <Drawer.Screen name="Country Statistics" component={StackNavigator} />
        
        <Drawer.Screen name="FavCountry" component={FavCountry} />
      </Drawer.Navigator>
      
    </NavigationContainer>
  
  );
}



const styles = StyleSheet.create({

card1:{
    padding: '10%',
    paddingLeft:"7%",
    backgroundColor: '#ffff3f',
    display: 'flex',
    width: '95%',
    borderWidth: 5,
    borderColor: 'white',
    borderRadius: 6,
    marginTop: '5%',
    flexDirection:"row",
    justifyContent:"space-between"
  },

card2:{
    padding: '10%',
    paddingLeft:"7%",
    backgroundColor: '#55a630',
    display: 'flex',
    width: '95%',
    borderWidth: 5,
    borderColor: 'white',
    borderRadius: 6,
    marginTop: '5%',
    justifyContent:"space-between",
    flexDirection:"row"
  },

card3:{
    padding: '10%',
    paddingLeft:"7%",
    backgroundColor: '#f07167',
    display: 'flex',
    width: '95%',
    borderWidth: 5,
    borderColor: 'white',
    borderRadius: 6,
    marginTop: '5%',
    justifyContent:"space-between",
    flexDirection:"row"
  },

card4:{
    paddingTop: '10%',
    paddingBottom: '10%',
    paddingLeft:"7%",
    backgroundColor: '#468faf',
    display: 'flex',
    width: '95%',
    borderWidth: 5,
    borderColor: 'white',
    borderRadius: 6,
    marginTop: '5%',
    justifyContent:"center",
  }



  })