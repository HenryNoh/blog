import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { Search } from './index.js';
import queryString from 'query-string';
import './main.css';

class list extends Component {
  constructor(props) {
    super(props)
    this.state = {
      data: [],
      page : 1,
      limit : 10,
      all_page : [],
    }
  }
  componentDidMount() {
    this._getListData()
    this._setPage()
  }
  // componentDidUpdate(){
  //   this._getListData()
  // }

  _getListData = async function() {
    const { limit } = this.state;
    const page = this._setPage();
    
    let search = queryString.parse(this.props.location.search);
    // console.log(this.props)
    // console.log(search);
    if(search) {
      search = search.search;
    }
    // console.log(search);
    const total_cnt = await axios('/get/board_cnt',{
      method : 'POST',
      headers: new Headers(),
      data : {search : search}
    });
    const data_list = await axios('/get/board', {
      method : 'POST',
      headers: new Headers(),
      data : {limit : limit, page : page, search : search}
    })
    
    let page_arr = [];

    for(let i=1;i<=Math.ceil(total_cnt.data.cnt / limit);i++){
      page_arr.push(i);
    }
    this.setState({ data : data_list, all_page : page_arr })
  }

  _changePage = function(el){
    this.setState({ page : el })
    sessionStorage.setItem('page', el)

    return this._getListData();
  }

  _setPage = function() {
    if(sessionStorage.page) {
      this.setState({ page : Number(sessionStorage.page) })
      return Number(sessionStorage.page);
    }
    
    this.setState({ page : 1 })
    return 1;
  }

  render() {
    const list = this.state.data.data
    const { all_page, page } = this.state;
    // console.log(list);
    return(
      <div>
        {list ? list.map( (list, key) => {
          const view_url = '/view/' + list.board_id;
          return(
            <div className='List' key={key}>
              <div className='lArticle'>
                <div className='list_content' key={key}>
                    <Link to="/" className="thumbnail_post"> img</Link>
                    <div className="link_post"> 
                      <strong className='tit_post'> <Link to={view_url}> {list.title} </Link> </strong>
                      <p dangerouslySetInnerHTML={{__html: list.contents}} className='txt_post'/>
                    </div>
                  <div className='detail_info'>
                      {list.date.slice(0,10)}
                  </div>
                </div>
              </div>
            </div>
          )
        })
        : null }
        <div className='paging_div'>
          <div> </div>
          <div>
            <ul>
              {all_page ? all_page.map( (el, key) => {
                return(
                  el === page ? <li key={key} className='page_num'> <b> {el} </b> </li>
                              : <li key={key} className='page_num' onClick={() => this._changePage(el)}> {el} </li>
                )
              })
              
              : null}
            </ul>
            <Search />
          </div>
          <div> </div>
        </div>
      </div>
    );
  }
}


export default list;