import React, { Component } from 'react';
import axios from 'axios';
import './main.css';

class view extends Component {
  constructor(props) {
    super(props)
    this.state = {
        data : [],
        date : "",
    }
  }
  componentDidMount() {
    this._getData()
  }

  _getData = async function() {
    const board_id = this.props.match.params.data;

    const getData = await axios('/get/board_data', {
      method : 'POST',
      headers: new Headers(),
      data : { id : board_id }
    });
    const date = getData.data.data[0].date.slice(0, 10) + ' ' + getData.data.data[0].date.slice(11, 16);
    // console.log(getData.data.data[0].title)
    return this.setState({ data : getData.data.data[0], date : date })
  }
  render() {
    const { data, date } = this.state;
    // console.log(data,date);
    return (
        <div className='Write'>
          {data
          ? <div>

              <div className='top_title'>
                <div type='text' id='title_txt' name='title'>
                  {data.title}
                </div>

                <div className='date_div'>
                  {date}
                </div>
              </div>
              
              <div className='test'>
                <div id='content_txt' name='contents' dangerouslySetInnerHTML={{__html: data.contents}} readOnly></div>
              </div>
            </div>
          : null}
        </div>
        // <div/>
    )
  }
}

export default view;