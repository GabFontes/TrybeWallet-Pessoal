import React from 'react';
import { userLogin } from '../actions';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class Login extends React.Component {
  constructor() {
    super();

    this.state = {
      email: '',
      senha: '',
      isButtonDisabled: true,
    };

    this.handleChange = this.handleChange.bind(this);
    this.formValidation = this.formValidation.bind(this);
  }

  handleChange({ target: { name, value } }) {
    this.setState(
      { [name]: value },
      this.formValidation,
    );
  }

  formValidation() {
    const minLenght = 6
    const { email, senha } = this.state;
    const emailRegex = /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/;
    // créditos do 'emailRegex' ao Luiz Wanderson
    const emailValidation = emailRegex.test(String(email).toLowerCase());
    const senhaValidation = senha.length >= minLenght;
    if (emailValidation && senhaValidation) {
      this.setState(
        { isButtonDisabled: false },
      );
    }
    else {
      this.setState(
        { isButtonDisabled: true },
      );
    }
  }

  render() {
    const { emailDispatch, history } = this.props;
    const { email, isButtonDisabled } = this.state;
    return (
      <div>
        <form>
          <label htmlFor="email">
            Email:
            <input
              type="text"
              name="email"
              id="email"
              data-testid="email-input"
              onChange={this.handleChange}
            />
          </label>
          <label htmlFor="password">
            Senha:
            <input
              type="text"
              name="senha"
              id="password"
              data-testid="password-input"
              onChange={this.handleChange}
            />
          </label>
          <button type="button" onClick={() => { emailDispatch(email); history.push('/carteira') }} disabled={isButtonDisabled}>Entrar</button>
        </form>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  emailDispatch: (state) => dispatch(userLogin(state)),
})

Login.propTypes = {
  emailDispatch: PropTypes.instanceOf(Object).isRequired,
  history: PropTypes.instanceOf(Object).isRequired,
}


export default connect(null, mapDispatchToProps)(Login);
