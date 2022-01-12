import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

class Header extends Component {
  someValues(expense) {
    let value = 0;
    expense.forEach((gasto) => {
      value += Number(gasto.value);
    });
    return value.toFixed(2);
  }

  render() {
    const { userEmail, expense } = this.props;
    return (
      <div>
        <p data-testid="email-field">{`Usuário: ${userEmail}`}</p>
        <p data-testid="total-field">{this.someValues(expense)}</p>
        <p data-testid="header-currency-field">BRL</p>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  userEmail: state.user.email,
  expense: state.wallet.expenses,
});

Header.propTypes = {
  userEmail: PropTypes.instanceOf(Object).isRequired,
  expense: PropTypes.instanceOf(Array).isRequired,
};

export default connect(mapStateToProps)(Header);
