import React from 'react';
import Form from '../components/Forms';
import Header from '../components/Header';
import ExpenseTable from '../components/Table';

class Wallet extends React.Component {
  render() {
    return (
      <div>
        <Header />
        <Form />
        <ExpenseTable />
      </div>
    );
  }
}

export default Wallet;
