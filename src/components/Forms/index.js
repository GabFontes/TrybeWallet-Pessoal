import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { expenses } from '../../actions';
import currencies from '../../Fetch';

const INITIAL_STATE = {
  id: 0,
  value: 0,
  description: '',
  currency: 'USD',
  method: 'Dinheiro',
  tag: 'Alimentação',
};

export class Form extends Component {
  constructor() {
    super();

    this.state = {
      ...INITIAL_STATE,
      exchangeRates: {},
      keys: [],
    };

    this.handleChange = this.handleChange.bind(this);
    this.resetInputs = this.resetInputs.bind(this);
  }

  componentDidMount() {
    this.fetchApi();
  }

  handleChange({ target: { name, value } }) {
    this.setState({
      [name]: value,
    });
  }

  async fetchApi() {
    const exchangeRates = await currencies();
    const keys = Object.keys(exchangeRates);
    this.setState({
      keys,
      exchangeRates,
    });
  }

  async updateExchanges() {
    const exchangeRates = await currencies();
    this.setState({
      exchangeRates,
    });
  }

  resetInputs() {
    this.setState({
      ...INITIAL_STATE,
    });
  }

  render() {
    const { forms } = this.props;
    const {
      keys,
      id,
      value,
      description,
      currency,
      method,
      tag,
      exchangeRates,
    } = this.state;
    return (
      <div>
        <label htmlFor="value">
          Valor
          <input
            value={ value }
            onChange={ this.handleChange }
            type="number"
            data-testid="value-input"
            id="value"
            name="value"
          />
        </label>

        <label htmlFor="description">
          Descrição
          <input
            value={ description }
            onChange={ this.handleChange }
            type="text"
            data-testid="description-input"
            id="description"
            name="description"
          />
        </label>

        <label htmlFor="currency">
          Moeda
          <select
            value={ currency }
            onChange={ this.handleChange }
            data-testid="currency-input"
            name="currency"
            id="currency"
          >
            {
              keys.filter((moeda) => moeda !== 'USDT')
                .map((moeda) => (
                  <option
                    key={ moeda }
                    value={ `${[moeda]}` }
                    data-testid={ [moeda] }
                  >
                    {moeda}
                  </option>))
            }
          </select>
        </label>

        <label htmlFor="method">
          Método de Pagamento
          <select
            value={ method }
            onChange={ this.handleChange }
            data-testid="method-input"
            name="method"
            id="method"
          >
            <option value="dinheiro">Dinheiro</option>
            <option value="credito">Cartão de Crédito</option>
            <option value="debito">Cartão de Débito</option>
          </select>
        </label>

        <label htmlFor="tag">
          Categoria
          <select
            value={ tag }
            onChange={ this.handleChange }
            data-testid="tag-input"
            name="tag"
            id="tag"
          >
            <option>Alimentação</option>
            <option>Lazer</option>
            <option>Trabalho</option>
            <option>Transporte</option>
            <option>Saúde</option>
          </select>
        </label>

        <button
          type="button"
          onClick={ () => {
            forms({ id, value, description, currency, method, tag, exchangeRates });
            this.setState((prevState) => ({
              id: prevState.id + 1,
            }), this.updateExchanges);
          } }
        >
          Adicionar despesa
        </button>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  forms: (state) => dispatch(expenses(state)),
});

export default connect(null, mapDispatchToProps)(Form);

Form.propTypes = {
  forms: PropTypes.instanceOf(Object).isRequired,
};
