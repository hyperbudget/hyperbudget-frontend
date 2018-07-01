import * as React from 'react';
import { connect } from 'react-redux';
import * as Actions from '../../store/actions/Actions';
import { Redirect } from 'react-router';
import { ErrorComponent } from '../Error/Error';

interface TxnPasswordComponentProps {
  doGetTransactions?: (password: string, token: string) => void;
  txn_password: string;
  token: string;
  login_errors: any[];
};

class LoginComponent extends React.Component<TxnPasswordComponentProps, {}> {
  passwordRef: React.RefObject<HTMLInputElement>;

  componentDidUpdate(prevProps, prevState) {
    if (prevProps !== this.props) {
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
      <div>
        { this.props.login_errors ? <ErrorComponent errors={this.props.login_errors} /> : ''}
        <label>
          Transaction password:
          <input type="password" name="password" ref={this.passwordRef} />
        </label>
      </div>
      <div>
        <input type='button'  onClick={() => this.props.doGetTransactions(this.passwordRef.current.value, this.props.token) } value="Login" />
      </div>
    </>
    );
  }
}


const mapStateToProps = (state): TxnPasswordComponentProps => {
  return {
      txn_password: state.user.txn_password,
      token: state.user.token,
      login_errors: state.user.login_errors,
  }
};

const mapDispatchToProps = dispatch => {
  return {
    doGetTransactions: (password: string, token: string) => {
      return dispatch(Actions.get_transactions(
        {
          password: password,
          token: token,
        }
      ));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(LoginComponent);