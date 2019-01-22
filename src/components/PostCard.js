import React, { Component } from 'react';
import { Platform, StyleSheet, Text, View, Linking } from 'react-native';

export default class PostCard extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    console.log(this.props.queryTags);
    console.log(this.props.post.tags);
    return (
      <View style={styles.card}>
        <Text onPress={() => Linking.openURL(this.props.post.link)}>
          {this.props.post.title}
        </Text>
        <View style={styles.tagContainer}>
          {this.props.post.tags.map((tag, id) => {
            if (this.props.queryTags.includes(tag)) {
              return (
                <Text key={`tag-${id}`} style={styles.tag}>
                  {tag}
                </Text>
              )
            }
          }
          )}
        </View>
      </View>

    );
  }
}

const styles = StyleSheet.create({
  card: {
    borderBottomColor: 'black',
    borderBottomWidth: 1,
    flex: 1,
    paddingHorizontal: 10,
    paddingVertical: 15,
    justifyContent: 'flex-start',
    backgroundColor: '#eff0f1'
  },
  tagContainer: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap'
  },
  tag: {
    backgroundColor: '#cccccc',
    borderRadius: 100,
    padding: 5,
    margin: 5
  }
})