import React, {Component} from 'react'
import {Link} from 'react-router'

import {convertToTimePassed} from '../libraryHelper'
import PostBox from './PostBox'
import ContentPreview from './ContentPreview'

class ListItem extends Component{
  showPostBox = (e) => {
    e.preventDefault()
    this.props.showPostBox(this.props.post._id)
  }

  upVote = (e) => {
    e.preventDefault()
    this.props.vote(this.props.post._id, this.props.voteState, 1)
  }

  downVote = (e) => {
    e.preventDefault()
    this.props.vote(this.props.post._id, this.props.voteState, -1)
  }

  showPostDescription = (e) => {
    e.preventDefault()
    this.props.showPostDescription(this.props.post._id)
  }

  deletePost = (e) => {
    e.preventDefault()
    this.props.deletePost(this.props.post._id)
  }

  savePost = (e) => {
    e.preventDefault()
    this.props.savePost(this.props.post._id)
  }

  showReportConfirmation = (e) => {
    e.preventDefault()
    this.props.showReportConfirmation(this.props.post._id)
  }

  reportPost = (e) => {
    e.preventDefault()
    this.props.reportPost(this.props.post._id)
  }

  sharePost = (e) => {
    e.preventDefault()
    this.props.showSharePostPopup(this.props.post)
  }

  render() {
    var post = this.props.post
    var scoreColor = {}
    if (this.props.voteState === 1) {
      scoreColor['color'] = 'orange'
    } else if (this.props.voteState === -1) {
      scoreColor['color'] = 'blue'
    }

    return (
      <div className="content-block w-container">
        <div className="content-block-inner w-row">

          <div 
          style={{
            width:75*this.props.depth
          }}
          className="score-block w-col w-col-1">
          </div>

          <div className="score-block w-col w-col-1">
            <h3 style={scoreColor}>{post.score}</h3>
          </div>

          <div className="vote-block w-col w-col-1">
            <div>
              <a 
              onClick={this.upVote}
              style={(this.props.voteState===1)?{color:'orange'}:{}}
              href="#" 
              className="button-2 fontawesome w-button">&#xf062;</a>
            </div>
            <div>
              <a 
              onClick={this.downVote}
              style={(this.props.voteState===-1)?{color:'blue'}:{}}
              href="#" 
              className="button-3 fontawesome w-button">&#xf063;</a>
            </div>
          </div>

          <div className="content-title-options w-col w-col-10">
            <div>
              <Link to={'/post/'+post._id}><h4>{post.contentTitle}</h4></Link>
              <span style={{color:'red'}}>{post.contentTag}</span>
              <a href={post.contentLink}>{post.contentLink}</a>
              <ContentPreview url={post.contentLink} />
              {(post.contentDescription!=='')
                ?<button onClick={this.showPostDescription}>Show more</button>
                :''}
              {(this.props.showPostDescriptionState)
                ?<div>{post.contentDescription}</div>
                :''}
              <div>
                Posted by{' '}
                <Link to={'/userprofile/'+post.submittedByUserId}>{post.submittedByUserName}</Link> 
                {' '}{convertToTimePassed(post.dateSubmitted)}{' ago'}
              </div>
            </div>

            <div>
              <a 
              onClick={this.showPostBox} 
              style={(this.props.showPostBoxId===post._id)?{color:'blue'}:{}}
              href="#" 
              className="w-button">
              Reply</a>

              {(post.parent !== '')
                ?<Link to={'/post/'+post.parent}>{'Parent '}</Link>
                :''}

              <span onClick={this.sharePost}>{'Share '}</span>

              <a onClick={this.savePost} href="#" className="w-button">
              {(this.props.savedState===true)
                ?'Unsave'
                :'Save'}</a>

              {(this.props.showReportConfirmationState===true)
                ?<a onClick={this.reportPost} href="#" className="w-button">
                Report Confirm?</a>
                :<a onClick={this.showReportConfirmation} href="#" className="w-button">
                Report</a>}

              {(this.props.submittedByCurrentUser
                ?<a onClick={this.deletePost} href="#" className="w-button">
                Delete</a>
                :'')}
            </div>

          </div>

        </div>
        {(this.props.showPostBoxId === post._id) 
          ?<PostBox newPost={this.props.newPost} parent={post._id} /> 
          : ''}
      </div>
      )}
}

export default ListItem