import React, { Component } from 'react';
import MaterialTable from 'material-table';
import { getBorrow } from '../Publics/redux/actions/borrow';
import {connect} from 'react-redux';
import moment from "moment";

class History extends Component {
  state = {
    borrow: [],
  };
  componentDidMount = async () => {
    await this.props.dispatch(getBorrow());
    this.setState({
      borrow: this.props.borrow,
    });
  };

  render() {
    const {borrow} = this.state;
    const list = borrow.borrowList;
    console.log(list);
    return (
      <div style={{ maxWidth: '100%' }}>
      <link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons"></link>
        <MaterialTable
          columns={[
            { title: 'Name', field: 'fullname' },
            { title: 'Book Name', field: 'name' },
            { title: 'Borrow Date', field: 'TanggalPinjam' },
            { title: 'Return Date', field: 'TanggalKembali' },
            { title: 'Expire Date', field: 'MaksPinjam' },
            { title: 'Penalty', field: 'Penalty' },
            
          ]}
          data={list &&
            list.length > 0 &&
            list.map((item, index) =>{
            const Borrow = moment(item.TanggalPinjam).format("DD-MM-YYYY");
            const Return = moment(item.TanggalBalik).format("DD-MM-YYYY");
            const expire = moment(item.MaksPinjam).format("DD-MM-YYYY");

            return(
              {fullname: item.fullname, name: item.name, TanggalPinjam:  Borrow,  TanggalKembali: Return , MaksPinjam: expire, Penalty: item.Penalty}
            ) 
           })
          }
          title="History List"
        />
      </div>
    )
  }
}
const mapStateToProps = state => {
  return {
    borrow: state.borrow,
  };
};

export default connect(mapStateToProps)(History);