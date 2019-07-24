import React, {Component} from 'react';
import {connect} from 'react-redux';
import '../Assets/listbook.css';
import { Link } from 'react-router-dom';
import Add from './add'

import {getBook} from '../Publics/redux/actions/book';



class Book extends Component {
  state = {
    books: [],
  };
  componentDidMount = async () => {
    let search = ""
    await this.props.dispatch(getBook(search));
    this.setState({
      books: this.props.book,
    });
  };

  
  render() {
    const {books} = this.state;
    const list = books.bookList;
    console.log(list);
    return (
     <div>
      <Add/>
      <div className="list-item">  
      <ul>
          {list &&
            list.result.length > 0 &&
            list.result.map((item, index) =>  {
                      return (
                          <Link to={`/book/${item.idBook}`} key={index}>
                              <div className="item" id="items" bookid={item.bookid}>
                                  <img src={item.image} alt="gambar" />
                                  <div>
                                      <p>{(item.name)}</p>
                                      <p style={{fontSize:'12px'}}>by : {(item.writer)}</p>
                                      <p>{item.StatusBorrow === 1 ? <p style={{fontSize:'14px',fontWeight:'bold',backgroundColor:'red',textAlign:'center',borderRadius:'8px',width:'100px',float:'right',marginTop:'20px'}}> Not  Available</p> : <p style={{fontSize:'14px',fontWeight:'bold',backgroundColor:'green',textAlign:'center',borderRadius:'8px',width:'100px',float:'right',marginTop:'20px'}}>Available</p>}</p>
                                  </div>
                              </div>
                          </Link>
                      )
                  }
              )
                }
              </ul>
      </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    book: state.book,
  };
};

export default connect(mapStateToProps)(Book);
