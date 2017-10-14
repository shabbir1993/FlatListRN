/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {View,FlatList,Text} from 'react-native';

import { List, ListItem} from "react-native-elements";


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
      <List>
        <FlatList
          data={this.state.data}
          renderItem={({ item }) => (
            <ListItem
              roundAvatar
              title={`${item.first_name} ${item.last_name}`}
              //subtitle={item.email}
              avatar={{ uri: item.avatar }}
            />
          )}
          keyExtractor={item => item.id}
          onEndReached = {this.LoadMore}
        />
      </List>
    );
  }
}

