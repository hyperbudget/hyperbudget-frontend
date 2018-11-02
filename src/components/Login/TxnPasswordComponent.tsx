import * as React from 'react';
import { connect } from 'react-redux';
import * as Actions from '../../store/actions/Actions';
import { Redirect } from 'react-router';
import { ErrorComponent } from '../Error/Error';
import { State } from '../../lib/State/State';
import { APIError } from '../../lib/APIError/APIError';

import { LoadingSpinner } from '../LoadingSpinner';
import './LoginComponent.css';

interface TxnPasswordComponentProps {
  doGetTransactions?: (password: string, email: string) => void;
  txn_password: string;
  email: string;
  api_error: APIError
};

interface TxnPasswordComponentState {
  explanation: boolean;
  loading: boolean;
}

class LoginComponent extends React.Component<TxnPasswordComponentProps, TxnPasswordComponentState> {
  passwordRef: React.RefObject<HTMLInputElement>;

  toggleExplanation() {
    this.setState({
      explanation: !this.state.explanation
    });
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps !== this.props) {
      if (this.props.txn_password || this.props.api_error) {
        this.setState({
          loading: false,
        })
      }
    }
  }

  disableButton() {
    return !(this.passwordRef.current && this.passwordRef.current.value);
  }

  componentDidMount() {
  }

  constructor(props) {
    super(props);
    this.passwordRef = React.createRef();
    this.state = { explanation: false, loading: false };
  }

  render() {
    return (
    this.props.txn_password
    ?
    <>
      <Redirect to="/report" />
    </>
    :
    <>
    <div className="jumbotron mt-5 text-center">
      <div className='loginForm'>
          <h1>Enter transaction password</h1>
          { this.props.api_error ? <ErrorComponent error={this.props.api_error} /> : ''}
          <div>
            <span className='what' onClick={() => this.toggleExplanation()}>What is this?</span>
          </div>
          <div className='form-group'>
            {
              this.state.explanation ?
              <div className='alert alert-info'>
                This is the password used to show your transactions. If you've never set one, you can set one now. This password is required to decrypt your transaction data and cannot be recovered. However, you can reset the password and lose all your data.
              </div> : ''
            }
            <label htmlFor='txnPassword'>
              Transaction password:
            </label>
            <input className='form-control' id="txnPassword" type="password" name="password" ref={this.passwordRef} />
          </div>
          <div>
            <input className='btn btn-primary form-control' type='button'  onClick={ () => this.doGetTransactions() } value="Login" />
          </div>
          { this.state.loading ? <LoadingSpinner /> : '' }
        </div>
      </div>
    </>
    );
  }

  doGetTransactions (): void {
    this.setState({
      loading: true
    });

    this.props.doGetTransactions(this.passwordRef.current.value, this.props.email);
  }
}

const mapStateToProps = (state: State): TxnPasswordComponentProps => {
  return {
      txn_password: state.user.txnPassword,
      email: state.user.email,
      api_error: state.user.APIError,
  }
};

const mapDispatchToProps = dispatch => {
  return {
    doGetTransactions: (password: string, email: string) => {
      return dispatch(Actions.get_transactions(
        {
          txnPassword: password,
          email: email,
        }
      ));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(LoginComponent);
