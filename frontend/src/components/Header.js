import React, {Component} from 'react'
import { Link } from 'react-router'
import MenuBar from './MenuBar'
import HeaderModal from './HeaderModal'
import PostBox from '../containers/PostBoxContainer'
import logo from '../images/logo.png'

class Header extends Component {
  constructor(props){
    super(props)
    this.state={
      showPostForm: false
    }
  }

  togglePostForm = () => {
    if (this.state.showPostForm === false) {
      this.setState({showPostForm: true})
    } else {
      this.setState({showPostForm: false})
    }
  }

  render() {
    var props = this.props
    return (
      <div>
        {(props.bannerMsg !== '')
          ?<HeaderModal 
            updateBanner={this.props.updateBanner} 
            bannerMsg={this.props.bannerMsg} />
          :''}
        <div className="header">
          <div className='headerImgTitlePageCluster'>
            <Link to='/'>
              <img src={logo} max-width="40px" max-height="40px" width="40px" height="40px" />
            </Link>
            <Link to='/'>
              <h1 className="">GEDDIT</h1>
            </Link>
            <span className='headerSpacer'></span>
            <h3 className=''>{props.subheading}</h3>
          </div>
          <MenuBar 
            userAccount={props.userAccount} 
            logout={props.logout} 
            location={this.props.location}
            showPostForm={this.state.showPostForm}
            togglePostForm={this.togglePostForm} />
        </div>
        {this.state.showPostForm
          ?<PostBox 
            parent='' 
            post={{
              contentTitle: '',
              contentTag: '',
              contentLink: '',
              contentDescription: ''
            }}
            newOrEdit='new'
            closePostBox={this.togglePostForm} />
          :''}
      </div>
  )}
}

export default Header


