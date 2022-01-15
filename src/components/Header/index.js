import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

class Header extends Component {
  someValues = () => {
    const { expense } = this.props;
    const total = expense.reduce((acc, cur) => {
      const cambio = cur.exchangeRates[cur.currency].ask;
      return acc + (Number(cur.value) * cambio);
    }, 0);
    return Math.round(total * 100) / 100;
  }

  render() {
    const { userEmail } = this.props;
    return (
      <div>
        <p data-testid="email-field">{`Usuário: ${userEmail}`}</p>
        <p data-testid="total-field">{this.someValues()}</p>
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
  userEmail: PropTypes.string.isRequired,
  expense: PropTypes.instanceOf(Array).isRequired,
};

export default connect(mapStateToProps)(Header);
