import React, { Component } from 'react';
import { connect } from 'react-redux';
import '../Assets/listbook.css';
import { Link } from 'react-router-dom';
import Add from './add'

import { getBook, getPagination } from '../Publics/redux/actions/book';



class Book extends Component {
  state = {
    index: '',
    books: [],
    page: 1,
    sumPage: ''
  };
  componentDidMount = () => {
    this.makeRequest()
  }
  makeRequest = async () => {
    const page = this.state.page;
    await this.props.dispatch(getPagination(page));
    this.setState({
      books: this.props.book,
    });
    await this.props.dispatch(getBook());
    this.setState({
      sumPage: this.props.book.bookList.length
    });
  };

  next = () => {
    this.setState({
      page: this.state.page + 1,
    }, () => {
      this.makeRequest()
    })
  }
  prev = () => {
    this.setState({
      page: this.state.page - 1,
    }, () => {
      this.makeRequest()
    })
  }


  render() {
    const { books } = this.state;
    const list = books.bookList;
    // console.log(list);
    const sum = Math.ceil(this.state.sumPage / 4)
    console.log(sum)
    return (
      <div>
        <Add />
        <div className="list-item">
          <ul>
            {list &&
              list.length > 0 &&
              list.map((item, index) => {
                return (
                  <Link to={`/book/${item.idBook}`} key={index}>
                    <div className="item" id="items" bookid={item.bookid}>
                      <img src={item.image} alt="gambar" />
                      <div>
                        <p>{(item.name)}</p>
                        <p style={{ fontSize: '12px' }}>by : {(item.writer)}</p>
                        <p>{item.StatusBorrow === 1 ? <p style={{ fontSize: '14px', fontWeight: 'bold', backgroundColor: 'red', textAlign: 'center', borderRadius: '8px', width: '100px', float: 'right', marginTop: '20px' }}> Not  Available</p> : <p style={{ fontSize: '14px', fontWeight: 'bold', backgroundColor: 'green', textAlign: 'center', borderRadius: '8px', width: '100px', float: 'right', marginTop: '20px' }}>Available</p>}</p>
                      </div>
                    </div>
                  </Link>
                )
              }
              )
            }
          </ul>
        </div>
        <div className='button-next'>
          {this.state.page == 1 ?
            (<button
              style={{
                color: 'white',
                backgroundColor: 'black',
                marginRight: '10px'
              }}
              onClick={this.prev}
              disabled>Prev
            </button>) :
            (<button
              style={{
                color: 'white',
                backgroundColor: 'black',
                marginRight: '10px'
              }}
              onClick={this.prev}>Prev</button>)}

          {this.state.page == sum ?
            (<button
              style={{
                color: 'white',
                backgroundColor: 'black',
                marginRight: '10px'
              }}
              onClick={this.next}
              disabled>Next
                </button>) :
            (<button
              style={{
                color: 'white',
                backgroundColor: 'black',
                marginRight: '10px'
              }}
              onClick={this.next}>Next
                </button>)}
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
