import React, { Component } from 'react';
import './main.css';

import axios from 'axios';

class list extends Component {
  constructor(props) {
    super(props)
    this.state = {
      data : [],
      page : 1,
      limit : 10,
    }
  }

  componentDidMount() {
    this._getListData()
  }

  _getListData = async function() {
    const { limit, page } = this.state;
    
    const total_cnt = await axios('/get/board_cnt');
    console.log(total_cnt.data.cnt)

    const data_list = await axios('/get/board', {
      method : 'GET',
      headers: new Headers()
    })

    this.setState({ data : data_list })
  }

  render() {
    const list = this.state.data.data

    return (
      <div className='List'>

        <div className='list_grid list_tit'>
          <div> 제목 </div>
          <div> 조회수 </div>
          <div className='acenter'> 날짜 </div>
        </div>

          {list ? list.map( (el, key) => {
            return(
              <div className='list_grid list_data' key={key}>
                <div> {el.title} </div>
                <div> </div>
                <div className='acenter'> {el.date.slice(0, 10)} </div>
              </div>
            )
          })
            : null }
      </div>
    );
  }
}

export default list;