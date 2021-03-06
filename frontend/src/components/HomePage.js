import React, { Component } from 'react'
import List from '../containers/ListContainer'
import Pagination from '../containers/PaginationContainer'
import {defaultPage} from '../libraryHelper'

class HomePage extends Component {
  componentWillMount() {
    this.props.loadFrontPageData(defaultPage(this.props.location.query.page))
  }

  componentWillReceiveProps(nextProps) {
      if (this.props.location.query !== nextProps.location.query) {
        this.props.loadFrontPageData(defaultPage(nextProps.location.query.page))
      }
  }

  render() {
    if (this.props.pageLoading === true) {
      return ''
    }
    
    return (
      <div>
        <List />
        <Pagination 
          urlStem='' 
          query={{page: defaultPage(this.props.location.query.page)}} />
      </div>
    )
  }
}

export default HomePage