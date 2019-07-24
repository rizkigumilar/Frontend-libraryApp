import React, {Component} from 'react';
import {connect} from 'react-redux';
import '../Assets/detailbook.css';
import { Link } from 'react-router-dom';

import {getBookid} from '../Publics/redux/actions/book';
import {deleteBook} from '../Publics/redux/actions/book';
import Borrow from './borrow'
import Return from './return'


class Book extends Component {
  state = {
    books: [],
  };
  componentDidMount = async () => {
    const bookid = this.props.match.params.idBook
    await this.props.dispatch(getBookid(bookid));
    this.setState({
      books: this.props.book,
    });
  };
  delete = async ()=>{
		await this.props.dispatch(deleteBook(this.props.match.params.idBook));		
	}

  
  render() {
    const {books} = this.state;
    let list = books.bookList;
    console.log(list);
    return (
      <div>  
      
          {list &&
            list.length > 0 &&
            list.map(item =>  {
                      return (
                        <div className="book-detail">
                              <div>
                              <ul>
                                  <li><Link to="/book" className="back">BACK</Link></li>
                                  {localStorage.status === 0  ?
                                  (<li className="buttonDel" ><Link to={`/book/${item.idBook}/edit`}>Edit</Link></li>) : ''}
                                  {localStorage.status === 0 ?
                                    (<li className="buttonDel" ><Link to={'/book'} onClick={this.delete.bind(this)}>Delete</Link></li>): ''}
                              </ul>
                                  <img className='Gambar1' src={item.image} alt="gambar" />
                                  </div>
                                  <div className="content">
                                  <img className={'imageBook'} src={item.image} alt={item.name} />
                                  {localStorage.name != null ?
                                  (<p>{item.StatusBorrow === 1 ?  <Return id={item.idBook}/>: <Borrow/> }</p>) : ('')}
                                      <p className='title'>{(item.name)}</p>
                                      <p className='writer'>by : {(item.writer)}</p>
                                      <p>{item.StatusBorrow === 1 ? <p style={{fontSize:'14px',fontWeight:'bold',backgroundColor:'red',textAlign:'center',borderRadius:'8px',width:'100px',marginTop:'20px', color:'white'}}>Not Available</p> : <p style={{fontSize:'14px',fontWeight:'bold',backgroundColor:'green',textAlign:'center',borderRadius:'8px',width:'100px',marginTop:'20px',color:'white'}}>Available</p>}</p>
                                      <p>{(item.description)}</p>
                                  </div>
                              </div>
                      )
                  }
              )
                }
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
