var React = require('react');
var ReactDOM = require('react-dom');

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            number: "",
            name: "",
            date: "",
            cvc: "",
            won: 0,
            deposit: "",
            error: ""
        };
        this.handleUpdate = this.handleUpdate.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleClick = this.handleClick.bind(this);
    }

    handleUpdate(key) {
        return event => this.setState({
            [key]: event.target.value
        });
    }

    handleSubmit(event) {
        event.preventDefault();
        if (!this.state.number ||
            !this.state.name ||
            !this.state.date ||
            !this.state.cvc ||
            !this.state.deposit) {
            this.setState({
                error: <p className="error">
                    Please select/fill out all fields to make a deposit
        </p>
            });
        } else if (this.state.number.match(/[a-z]/)) {
            this.setState({
                error: <p className="error">
                    Please enter a valid credit card number
        </p>
            });
        } else if (!this.state.date.match(/\d{2}\/\d{2}/)) {
            this.setState({
                error: <p className="error">
                    Please enter a valid expiration date
        </p>
            });
        } else if (!this.state.cvc.match(/\d{3}/)) {
            this.setState({
                error: <p className="error">
                    Please enter a valid CVC code
        </p>
            });
        } else {
            document.querySelector('.selected').classList.remove('selected');
            document.querySelector('.money-won').classList.add('flash-green');
            this.setState({
                number: "",
                name: "",
                date: "",
                cvc: "",
                won: this.state.won + this.state.deposit,
                deposit: 0,
                error: ""
            });
        }
    }

    handleClick(denomination) {
        return event => {
            document.querySelector('.money-won').classList.remove('flash-green');
            if (this.state.deposit) {
                document.querySelector('.selected').classList.remove('selected');
            }
            event.target.classList.add('selected');
            this.setState({
                deposit: denomination
            });
        }
    }

    render() {
        const denominations = [5, 10, 20, 40, 100, 250, 1000];
        return (
            <article>
                <h1 className="title">Deposit Funds</h1>
                <h3 className="money-won">
                    ${this.state.won} won in the last 24 hours
        </h3>
                {this.state.error}
                <div className="outer-container">
                    <section className="denomination-container">
                        {
                            denominations.map((denomination, idx) =>
                                <button
                                    key={ idx }
                                    onClick={this.handleClick(denomination)}
                                    className="denomination">
                                    ${denomination}
                                </button>
                            )
                        }
                    </section>
                    <form
                        className="card-form"
                        onSubmit={this.handleSubmit}>
                        <input
                            className="card-number"
                            placeholder="Credit card number"
                            maxLength="19"
                            value={this.state.number}
                            onChange={this.handleUpdate('number')} />
                        <div className="card-info">
                            <input
                                className="card-name"
                                placeholder="Name on card"
                                value={this.state.name}
                                onChange={this.handleUpdate('name')} />
                            <input
                                className="card-date"
                                placeholder="MM/YY"
                                maxLength="5"
                                value={this.state.date}
                                onChange={this.handleUpdate('date')} />
                            <input
                                className="card-cvc"
                                placeholder="CVC"
                                maxLength="3"
                                value={this.state.cvc}
                                onChange={this.handleUpdate('cvc')} />
                        </div>
                        <input
                            type="submit"
                            value="Deposit funds"
                            className="submit" />
                    </form>
                </div>
            </article>
        );
    }
}

ReactDOM.render(<App />, document.getElementById('root'));