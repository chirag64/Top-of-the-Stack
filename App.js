import React, { Component } from 'react';
import { Platform, StyleSheet, Text, View, ScrollView } from 'react-native';
import axios from 'axios';
import PostCard from './src/components/PostCard';

// const instructions = Platform.select({
//   ios: 'Press Cmd+R to reload,\n' + 'Cmd+D or shake for dev menu',
//   android:
//     'Double tap R on your keyboard to reload,\n' +
//     'Shake or press menu button for dev menu',
// });

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      posts: [],
      queryTags: ['angular', 'reactjs'],
      query: '%5Bangular%5D%20OR%20%5Breact%5D'
    }
    const queryTags = this.state.queryTags.map((query) => {
      return `%5B${query}%5D`;
    })
    this.state.query = queryTags.join('%20OR%20');
    console.log(`query: ${this.state.query}`);
    axios.get(`https://api.stackexchange.com/2.2/search/advanced?key=U4DMV*8nvpm3EOpvf69Rxw((&site=stackoverflow&fromdate=1547078400&order=desc&sort=votes&q=${this.state.query}&filter=default`)
      .then(response => {
        this.setState({ posts: response.data.items });
      }).catch(error => {
        console.error(error);
      })
  }
  render() {
    return (
      <ScrollView>
        <View style={styles.container}>
          {this.state.posts.map((post, id) => {
            return (<PostCard key={`card-${id}`} post={post} queryTags={this.state.queryTags}>
            </PostCard>
            )
          })}
        </View>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 50,
    justifyContent: 'center',
    alignItems: 'stretch',
    backgroundColor: '#F5FCFF'
  },
  // welcome: {
  //   fontSize: 20,
  //   textAlign: 'center',
  //   margin: 10,
  // },
  // instructions: {
  //   textAlign: 'center',
  //   color: '#333333',
  //   marginBottom: 5,
  // },
});
