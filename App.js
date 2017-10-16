/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {FlatList,View,Button} from 'react-native';
import {ListItem} from "react-native-elements";

export default class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: false,
      data: [],
      page: 1,
      //seed: 1,
      error: null,
      refreshing: false,
      columns : 1,
      key:1
    };
  }

  componentDidMount() {
    this.fetchData();
  }

  fetchData = () => {
    //const { page, seed } = this.state;
    const {page} = this.state
    //const url = `https://randomuser.me/api/?seed=${seed}&page=${page}&results=20`;
    const url = `https://reqres.in/api/users?page=${page}`
    this.setState({ loading: true });
    fetch(url)
      .then(res => res.json())
      .then(res => {
        if (page === 1) {
            this.setState({
                data: res.data,
                error: res.error || null,
                loading: false,
                refreshing: false
            });
        } else {
            this.setState({
                data: [...this.state.data, ...res.data],
                error: res.error || null,
                loading: false,
                refreshing: false
            });
        }
    })
    .catch(error => {
      this.setState({ error, loading: false });
    });
  };

  LoadMore = () => {
      this.setState ({
        page: this.state.page + 1
      },
      () => {
        this.fetchData();
      }
    );
  }

  render() {
    return (
      <View>
        <Button onPress = {() => {
          let {columns,key} = this.state
          columns = columns === 1 ? 2:1
          this.setState({columns:columns,key:key+1})
        }} title = "Toggle"></Button>
        <FlatList
          key={this.state.key}
          data={this.state.data}
          numColumns={this.state.columns}
          renderItem={({ item }) => (
            <ListItem
              roundAvatar
              title={`${item.first_name} ${item.last_name}`}
              //subtitle={item.email}
              avatar={{ uri: item.avatar }}
              style = {{flex :1}}
            />
          )}
          keyExtractor={item => item.id}
          onEndReached = {this.LoadMore}
        /> 
      </View>  
    );
  }
}

