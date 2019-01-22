import React, { Component } from 'react';
import { Platform, StyleSheet, Text, View, ScrollView } from 'react-native';
import axios from 'axios';
import PostCard from './src/components/PostCard';
import TagInput from 'react-native-tag-input';

// const instructions = Platform.select({
//   ios: 'Press Cmd+R to reload,\n' + 'Cmd+D or shake for dev menu',
//   android:
//     'Double tap R on your keyboard to reload,\n' +
//     'Shake or press menu button for dev menu',
// });

export default class App extends Component {
  fetchQuestions = () => {
    console.log('Fetching!!!');
    const query = this.updateQuery();
    // console.log(`query: ${this.state.query}`);
    axios.get(`https://api.stackexchange.com/2.2/search/advanced?key=U4DMV*8nvpm3EOpvf69Rxw((&site=stackoverflow&fromdate=1547078400&order=desc&sort=votes&q=${query}&filter=default`)
      .then(response => {
        this.setState({ posts: response.data.items, query: query });
      }).catch(error => {
        console.error(error);
      })
  }
  tagInputChange = (queryTags) => {
    this.setState({ queryTags });
  }
  updateQuery = () => {
    const queryTags = this.state.queryTags.map((query) => {
      return `%5B${query}%5D`;
    })
    const queryString = queryTags.join('%20OR%20');
    // this.setState({
    //   query: queryString
    // });
    return queryString;
    // console.log(`query: ${queryString}`);
    // console.log(`state: ${JSON.stringify(this.state)}`);
  }
  updateInputText = (tagInputText) => {
    let queryTags = [...this.state.queryTags];
    if (tagInputText[tagInputText.length - 1] === ' ') {
      queryTags = [...this.state.queryTags, tagInputText.trim()];
      tagInputText = '';
    }
    this.setState({ tagInputText, queryTags })
  }
  constructor(props) {
    super(props);
    this.state = {
      posts: [],
      queryTags: ['angular', 'reactjs'],
      query: '',
      tagInputText: 'Enter a tag here'
    }
    this.fetchQuestions();
  }
  componentDidUpdate(prevProps, prevState) {
    console.log('Updated');
    if (JSON.stringify(this.state.queryTags) !== JSON.stringify(prevState.queryTags)) {
      this.fetchQuestions();
    }
  }
  render() {
    return (
      <ScrollView>
        <View style={styles.container}>
          <View style={styles.inputContainer}>
            <TagInput value={this.state.queryTags}
              onChange={this.tagInputChange}
              labelExtractor={(label) => label}
              text={this.state.tagInputText}
              onChangeText={this.updateInputText}
              tagContainerStyle={{ height: 36 }}>
            </TagInput>
          </View>
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
  inputContainer: {
    height: 50
  }
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
