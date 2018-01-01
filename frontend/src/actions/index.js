import axios from 'axios'

var webserver = 'http://localhost:3000/'

// PAGE LOADING FUNCTIONS
export const pageLoaded = (data) => ({
  type: 'PAGE_LOADED',
  payload: data
})

export function loadFrontPageData() {
  return function(dispatch){
    axios({
      method:'get',
      url:webserver+'api/recommendations/'
    })
    .then( (response) => {
      dispatch(pageLoaded(response.data))
    })
  }
}

// USER ACCOUNT FUNCTIONS
export const userDataLoaded = (data) => ({
  type: 'USERDATA_LOADED',
  payload: data
})

export const userDataLoadFailed = () => ({
  type: 'USERDATA_LOADFAILED'
})

export function loadUserData() {
  return function(dispatch){
    axios({
      method:'get',
      url:webserver+'api/users/verify',
      headers: {
        Authorization: 'Bearer '+localStorage.getItem('token')
      }
    })
    .then( (response) => {
      dispatch(userDataLoaded(response.data))
    })
    .catch( (err) => {
      dispatch(userDataLoadFailed())
    })
  }
}

export function changeUserName(userId, userName) {
  return function(dispatch){
    axios({
      method:'put',
      url:webserver+'api/users/'+userId+'/username',
      headers: {
        Authorization: 'Bearer '+localStorage.getItem('token')
      },
      data: {userName: userName}
    })
    .then( (response) => {
      if (response.data.changed === 'true') {
        dispatch(updateUserName(response.data.userName))
      }
    })
    .catch( (err) => {
      // dispatch(userDataLoadFailed())
    })
  }
}

export const updateUserName = (userName) => ({
  type: 'UPDATE_USER_NAME',
  payload: userName
})

// export function changeUserEmail(userId, userEmail) {
//   return function(dispatch){
//     axios({
//       method:'put',
//       url:webserver+'api/users/'+userId+'/useremail',
//       headers: {
//         Authorization: 'Bearer '+localStorage.getItem('token')
//       },
//       data: {userEmail: userEmail}
//     })
//     .then( (response) => {
//       // dispatch(userDataLoaded(response.data))
//     })
//     .catch( (err) => {
//       // dispatch(userDataLoadFailed())
//     })
//   }
// }

export const logout = () => ({
  type: 'LOGOUT'
})

// USER PROFILE FUNCTIONS
export const userProfileLoaded = (data) => ({
  type: 'USER_PROFILE_LOADED',
  payload: data
})

export function loadUserProfile(userId) {
  return function(dispatch){
    axios({
      method:'get',
      url:webserver+'api/users/'+userId,
      headers: {
        // Authorization: 'Bearer '+localStorage.getItem('token')
      }
    })
    .then( (response) => {
      dispatch(userProfileLoaded(response.data))
      dispatch(pageLoaded(response.data.submitted))
    })
    .catch( (err) => {
      // dispatch(userDataLoadFailed())
    })
  }
}

export function loadUserHistoryByField(userId, field)  {
  return function(dispatch){
    axios({
      method:'get',
      url:webserver+'api/users/'+userId+'/'+field,
      headers: {
        Authorization: 'Bearer '+localStorage.getItem('token')
      }
    })
    .then( (response) => {
      dispatch(pageLoaded(response.data))
    })
    .catch( (err) => {
      // dispatch(userDataLoadFailed())
    })
  }
}

// NEW POST FUNCTIONS
export const showPostBox = (parentId) => ({
  type: 'SHOW_POST_BOX',
  payload: parentId
})

export const closePostBox = () => ({
  type: 'CLOSE_POST_BOX'
})

export const addPostToState = (data) => ({
  type: 'UPDATE_NEW_POST',
  payload: data
})

export function newPost(data) {
  return function(dispatch){
    axios({
      method:'post',
      url:webserver+'api/posts',
      headers: {
        Authorization: 'Bearer '+localStorage.getItem('token')
      },
      data: data
    })
    .then( (response) => {
      dispatch(addPostToState(response.data))
      dispatch(closePostBox())
    })
    .catch( (err) => {
      // dispatch(userDataLoadFailed())
    })
  }
}

// POST VOTING FUNCTIONS
export function vote(postId, priorVote, currentVote) {
  if (priorVote === currentVote) {
    currentVote = 0
  }
  return function(dispatch){
    axios({
      method:'put',
      url:webserver+'api/posts/'+postId+'/vote',
      headers: {
        Authorization: 'Bearer '+localStorage.getItem('token')
      },
      data: {vote: currentVote}
    })
    .then( (response) => {
      dispatch(updateNewVote(postId, priorVote, currentVote))
    })
    .catch( (err) => {
      // dispatch(userDataLoadFailed())
    })
  }
}

export const updateNewVote = (postId, priorVote, currentVote) => ({
  type: 'UPDATE_NEW_VOTE',
  payload: {
    postId: postId,
    priorVote: priorVote,
    currentVote: currentVote
  }
})

// DELETING POST FUNCTIONS
export function deletePost(postId) {
  return function(dispatch){
    axios({
      method:'delete',
      url:webserver+'api/posts/'+postId,
      headers: {
        Authorization: 'Bearer '+localStorage.getItem('token')
      }
    })
    .then( (response) => {
      dispatch(updateNewDeletedPost(postId))
    })
    .catch( (err) => {
      // dispatch(userDataLoadFailed())
    })
  }
}

export const updateNewDeletedPost = (postId) => ({
  type: 'UPDATE_NEW_DELETED_POST',
  payload: postId
})

// SAVE POST FUNCTIONS
export function savePost(postId) {
  return function(dispatch){
    axios({
      method:'put',
      url:webserver+'api/users/saved/'+postId,
      headers: {
        Authorization: 'Bearer '+localStorage.getItem('token')
      }
    })
    .then( (response) => {
      dispatch(updateNewSavedPost(postId))
    })
    .catch( (err) => {
      // dispatch(userDataLoadFailed())
    })
  }
}

export const updateNewSavedPost = (postId) => ({
  type: 'UPDATE_NEW_SAVED_POST',
  payload: postId
})

// REPORT POST FUNCTIONS
export function reportPost(postId) {
  return function(dispatch){
    axios({
      method:'post',
      url:webserver+'api/reports/'+postId,
      headers: {
        Authorization: 'Bearer '+localStorage.getItem('token')
      }
    })
    .then( (response) => {
      dispatch(showReportConfirmation(postId))
    })
    .catch( (err) => {
      // dispatch(userDataLoadFailed())
    })
  }
}

export const showReportConfirmation = (postId) => ({
  type: 'SHOW_REPORT_CONFIRMATION',
  payload: postId
})

// SHOW POST DESCRIPTION FUNCTION
export const showPostDescription = (postId) => ({
  type: 'SHOW_POST_DESCRIPTION',
  payload: postId
})

// LOAD POST FUNCTIONS
export function loadPost(postId) {
  return function(dispatch){
    axios({
      method:'get',
      url:webserver+'api/posts/'+postId+'/graph'
    })
    .then( (response) => {
      dispatch(pageLoaded(response.data))
    })
  }
}