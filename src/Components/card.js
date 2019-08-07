import React, { Component } from 'react';
import '../Assets/listbook.css';
import { Link } from 'react-router-dom';
import Add from './add';
import { getPagination, getBook } from '../Publics/redux/actions/book';


const Cards = ({ list }) => {


    return (
        <div className=''>
            {localStorage.status == 0 ?
                (<Add />) : ('')}
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
        </div>
    )
}

export default Cards;