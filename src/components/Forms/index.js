import React, { Component } from "react";
import { connect } from "react-redux";
import { expenses } from '../../actions';
import currencies from "../../Fetch";

export class Form extends Component {
  constructor() {
    super();

    this.state = {
      id: 0,
      value: '',
      description: '',
      currency: [],
      method: "Dinheiro",
      tag: "Alimentação",
      exchangeRates: {},
      keys: [],
    }

    this.handleChange = this.handleChange.bind(this);
  }

  handleChange({ target: { name, value } }) {
    this.setState({
      [name]: value,
    })
  }

  async componentDidMount() {
    const moedas = await currencies();
    const keys = Object.keys(moedas);
    this.setState({
      keys,
    })
  }

  render() {
    const { forms } = this.props;
    const { keys, id, value, description, currency, method, tag, exchangeRates } = this.state;
    return (
      <div>
        <label htmlFor="value">
          Valor
          <input
            onChange={this.handleChange}
            type="text"
            data-testid="value-input"
            id="value"
            name="value"
          />
        </label>

        <label htmlFor="description">
          Descrição
          <input
            onChange={this.handleChange}
            type="text"
            data-testid="description-input"
            id="description"
            name="description"
          />
        </label>

        <label htmlFor="currency">
          Moeda
          <select
            onChange={this.handleChange}
            data-testid="currency-input"
            name="currency"
            id="currency"
          >
            {keys.filter((moeda) => moeda !== 'USDT')
              .map((moeda) =>
                <option
                  key={moeda}
                  value={`${[moeda]}`}
                  data-testid={[moeda]}
                >
                  {moeda}
                </option>)}
          </select>
        </label>

        <label htmlFor="method">
          Método de Pagamento
          <select
            onChange={this.handleChange}
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
            onChange={this.handleChange}
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
          onClick={() => {
            forms({ id, value, description, currency, method, tag, exchangeRates });
            this.setState((prevState) => ({
              id: prevState.id + 1,
            }))
          }}
        >
          Adicionar despesa
        </button>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  forms: (state) => dispatch(expenses(state)),
})

export default connect(null, mapDispatchToProps)(Form);
