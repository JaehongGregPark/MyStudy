import React from "react";
import axios from 'axios';
import SearchBar from './SearchBar';
import ImageList from './ImageList';

//import unsplash from '../api/unsplash';
//import GallaryMain from "./container/GallaryMain";

import "./App.css";

//const App = () => {
//  return (
//    <div className="App">
//      <GallaryMain />
//    </div>
// );
//};


/*
class App extends React.Component {
  state = { images: [] };
  onSearchSubmit = async (term) => {
    const response = await unsplash.get('/search/photos', {
      params: { query: term }
    });
   
     this.setState({ images: response.data.results });
  };

  render() {
    return (
      <div className="ui container" style={{ marginTop: '10px'}}>
      <SearchBar onSubmit={this.onSearchSubmit}/>
      <ImageList images={this.state.images}/>
      </div>
    );
  }
}
*/
/*
const App = () => {
  return (
      <div>
        <SearchBar />
      </div>
  )
}
*/
//const API_KEY = env.REACT_APP_UNSPLASH_ACCESS_KEY


class App extends React.Component  {
  state = { images: [] };

  onSearchSubmit = async (term) => {
     
    const response = await axios.get('https://api.unsplash.com/search/photos', {
          params: { query: term},
          headers: {
              Authorization: 'Client-ID -HoxePXCmq0V5vDn1RsZEgMy67x_wPWMH1kAagJifFA'
          }
      })

      this.setState({ images: response.data.results })
    
 
    /*  
    const getResponse = async() => {
      const response = await axios.get('https://api.unsplash.com/search/photos', {
          params: { query: term},
          headers: {
              Authorization: 'Client-ID -HoxePXCmq0V5vDn1RsZEgMy67x_wPWMH1kAagJifFA'
          }
      }) 
      this.setState({ images: response.data.results })
    };
  
  useEffect(()=>{
    getResponse();
   },[]);
  */
  }
  
  
  render() {
      return (
          <div>
              <SearchBar userSubmit={this.onSearchSubmit}/>
              <span>Found: {this.state.images.length} images</span>
              <ImageList foundImages={this.state.images} />
          </div>
      )
  }

}

export default App;
