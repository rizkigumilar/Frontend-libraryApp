import React, { Component } from 'react';
import { connect } from 'react-redux';
import moment from 'moment';
import '../Assets/profile.css'

import { userBorrow } from '../Publics/redux/actions/borrow';

class Profile extends Component {
    constructor(props) {
        super(props)
        this.state = {
            borrow: []
        }
    }
    componentDidMount = async () => {
        const idNum = localStorage.idNum
        console.log(idNum)
        await this.props.dispatch(userBorrow(idNum));
        this.setState({
            borrow: this.props.borrow,
        });
    };
    render() {
        const { borrow } = this.state;
        const list = borrow.borrowList;
        console.log(list);
        return (
            <div style={{ paddingTop: '0px' }}>
                <div style={{backgroundColor:'rgb(43, 195, 206)',boxShadow: '0px 5px 20px rgb(4, 83, 83)'}}>
                    <h3>Name : {localStorage.name}</h3>
                    <h3>Id Number : {localStorage.idNum}</h3>
                    {localStorage.status == 1 ? (<h3>Status : Member</h3>):('')}
                </div>
                <div style={{ paddingTop: '50px' }}>
                    <h1>Loan History</h1>     
                </div>
                <div>
                <table class="darkTable">
                    <thead>
                        <tr>
                            <th >No</th>
                            <th>Book Name</th>
                            <th>Borrow Date</th>
                            <th>Return Date</th>
                            <th>Expired Date</th>    
                            <th>Penalty Fee</th>    
                        </tr>
                    </thead>
                    {list &&
                        list.length > 0 &&
                        list.map((item, index) => {
                            return (
                                <tbody>
                                    <tr key={index}>
                                        <td style={{ textAlign: 'center' }}>{index + 1}</td>
                                        <td style={{ textAlign: 'center' }}>{item.name}</td>
                                        <td style={{ textAlign: 'center' }}>{moment(item.TanggaPinjam).format("DD-MM-YYYY")}</td>
                                        <td style={{ textAlign: 'center' }}>{moment(item.TanggalBalik).format("DD-MM-YYYY")}</td>
                                        <td style={{ textAlign: 'center' }}>{moment(item.MaksPinjam).format("DD-MM-YYYY")}</td>
                                        <td style={{ textAlign: 'center' }}>{item.Penalty}</td>
                                    </tr>
                                </tbody>

                            )
                        })}
                </table>
                </div>

            </div>
        );
    }
};


const mapStateToProps = (state) => {
    return {
        borrow: state.borrow
    };
};
export default connect(mapStateToProps)(Profile);