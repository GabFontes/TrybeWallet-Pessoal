import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

class Header extends Component {
  render() {
    const { userEmail } = this.props;
    return (
      <div>
        <p data-testid="email-field">{`Usuário: ${userEmail}`}</p>
        <p data-testid="total-field">Despesas: 0</p>
        <p data-testid="header-currency-field">Câmbio: BRL</p>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  userEmail: state.user.email,
});

Header.propTypes = {
  userEmail: PropTypes.instanceOf(Object).isRequired,
};

export default connect(mapStateToProps)(Header);
