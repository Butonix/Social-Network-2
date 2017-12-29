import React, { Component } from 'react';
import {Link} from 'react-router'
import List from '../containers/ListContainer.js';
import PostBox from '../components/PostBox.js';
import Header from './Header.js'

class UserProfile extends Component {
  componentWillMount() {
    this.props.loadUserProfile(this.props.params.userId);
  }

  loadSubmittedPosts = (e) => {
    var userAccount = this.props.userAccount;
    this.props.loadUserProfile(this.props.params.userId);
  }

  loadUpvotedPosts = (e) => {
    var userAccount = this.props. userAccount;
    this.props.loadUserHistoryByField(userAccount.userId, 'upvoted');
  }

  loadDownvotedPosts = (e) => {
    var userAccount = this.props. userAccount;
    this.props.loadUserHistoryByField(userAccount.userId, 'downvoted');
  }

  loadSavedPosts = (e) => {
    var userAccount = this.props. userAccount;
    this.props.loadUserHistoryByField(userAccount.userId, 'saved');
  }

  render() {
    var userAccount = this.props.userAccount;
    var userProfile = this.props.userProfile;
    var userProfileId = this.props.params.userId;

    if (userProfileId === userAccount.userId) {
      return (
        <div>
          <Header /> <br/>
          {this.props.showPostBoxId==='frontPage'? 
          <PostBox newPost={this.props.newPost} parent='' /> : <span/>}
          <div className="w-container">
            <div className="userprofilemetrics w-row">
              <div className="w-col w-col-4">
                <h1>{userAccount.userName}</h1>
                <div onClick={this.loadSubmittedPosts}>Submitted Posts</div>
                <div onClick={this.loadUpvotedPosts}>Upvoted posts</div>
                <div onClick={this.loadDownvotedPosts}>Downvoted Posts</div>
                <div onClick={this.loadSavedPosts}>Saved Posts</div>
                <div>Settings</div>
              </div>
              <div className="w-col w-col-4">
                <h1>Total Posts</h1>
                <h1>{userAccount.submitted.length}</h1>
              </div>
              <div className="w-col w-col-4">
                <h1>Total Votes</h1>
                <h1>{userAccount.totalVotes}</h1>
              </div>
            </div>
          </div>
          <List />
        </div>
      );
    } else {
      userAccount = userProfile;
      return (
        <div>
          <Header /> <br/>
          {this.props.showPostBoxId==='frontPage'? 
          <PostBox newPost={this.props.newPost} parent='' /> : <span/>}
          <div className="w-container">
            <div className="userprofilemetrics w-row">
              <div className="w-col w-col-4">
                <h1>{userAccount.userName}</h1>
                <div>Submitted Posts</div>
              </div>
              <div className="w-col w-col-4">
                <h1>Total Posts</h1>
                <h1>{userAccount.submitted.length}</h1>
              </div>
              <div className="w-col w-col-4">
                <h1>Total Votes</h1>
                <h1>{userAccount.totalVotes}</h1>
              </div>
            </div>
          </div>
          <List />
        </div>
      );
    }
  }
}

export default UserProfile;