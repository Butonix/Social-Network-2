import { connect } from 'react-redux'
import { loadUserProfile, loadUserHistoryByField, newPost } from '../actions'
import UserProfile from '../components/UserProfile'

const mapStateToProps = (state, ownProps) => ({
  pageLoading: state.displayState.pageLoading,
  userAccount: state.userAccount,
  userProfile: state.userProfile
})

const mapDispatchToProps = (dispatch, ownProps) => ({
  loadUserProfile: (userId, page) => {
    dispatch(loadUserProfile(userId, page))
  },
  loadUserHistoryByField: (userId, field, page) => {
    dispatch(loadUserHistoryByField(userId, field, page))
  },
  newPost: (data) => {
    dispatch(newPost(data))
  }
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(UserProfile)