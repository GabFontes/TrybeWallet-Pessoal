import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class ExpenseTable extends Component {
  constructor() {
    super();
  }

  currenciesNames(exchangeRates, currency) {
    const values = Object.values(exchangeRates);
    const obj = values.filter((element) => element.code === currency);
    const nomeMoeda = obj[0].name.split('/');
    return nomeMoeda;
  }

  render() {
    const { expenses } = this.props;
    return (
      <div>
        <table border="1">
          <tr>
            <th>Id</th>
            <th>Value</th>
            <th>Descrição</th>
            <th>Moeda</th>
            <th>Método de pagamento</th>
            <th>Tag</th>
            <th>Moeda de conversão</th>
            <th>Câmbio utilizado</th>
            <th>Valor convertido</th>
            <th>Editar/Excluir</th>
          </tr>
          {expenses.map((expense) => (
            <tr key={ expense.id }>
              <td>{expense.id}</td>
              <td>{expense.value}</td>
              <td>{expense.description}</td>
              <td>{expense.currency}</td>
              <td>{expense.method}</td>
              <td>{expense.tag}</td>
              <td>{() => this.currenciesNames(expenses.exchangeRates, expenses.currency)}</td>
            </tr>
          ))}
        </table>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  expenses: state.wallet.expenses,
});

ExpenseTable.propTypes = {
  expenses: PropTypes.instanceOf(Object).isRequired,
};

export default connect(mapStateToProps)(ExpenseTable);
