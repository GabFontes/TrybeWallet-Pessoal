import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class ExpenseTable extends Component {
  currenciesNames(exchangeRates, currency) {
    const values = Object.values(exchangeRates);
    const obj = values.filter((element) => element.code === currency);
    const nomeMoeda = obj[0].name.split('/');
    return nomeMoeda[0];
  }

  render() {
    const { expenses } = this.props;
    return (
      <div>
        {expenses.map((expense) => (
          <header key={ expense.id }>
            <p>{expense.id}</p>
            <p>
              Valor:
              {expense.value}
            </p>
            <p>
              Descrição:
              {expense.description}
            </p>
            <p>
              Moeda:
              {this.currenciesNames(expense.exchangeRates, expense.currency)}
            </p>
            <p>
              Método de Pagamento:
              {expense.method}
            </p>
            <p>
              Categoria:
              {expense.tag}
            </p>
          </header>
        ))}
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
