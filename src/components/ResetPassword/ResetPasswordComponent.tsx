import * as React from 'react';
import { connect } from 'react-redux';
import * as Actions from '../../store/actions/Actions';
import { Redirect } from 'react-router';

import { State } from '../../lib/State/State';
import { APIError } from '../../lib/APIError/APIError';
import { ErrorComponent } from '../Error/Error';

import LoadingSpinner from '../LoadingSpinner';

interface ResetPasswordComponentProps {
    doResetPassword: (userId: string, token: string, password: string) => void;
    userId: string;
    token: string;
    APIError: APIError,
    isLoggedIn: boolean,
};

interface ResetPasswordComponentState {
    loading: boolean;
}

class ResetPasswordComponent extends React.Component<ResetPasswordComponentProps, ResetPasswordComponentState> {
    passwordRef: React.RefObject<HTMLInputElement>;

    componentDidUpdate(prevProps, prevState) {
        if (prevProps !== this.props) {
            if (this.props.isLoggedIn || this.props.APIError) {
                this.setState({
                    loading: false,
                })
            }
        }
    }

    disableButton() {
        return !(this.passwordRef.current && this.passwordRef.current.value);
    }

    constructor(props) {
        super(props);

        this.state = {
            loading: false
        };

        this.passwordRef = React.createRef();
    }

    render() {
        return (
        this.props.isLoggedIn
        ?
        <>
            <Redirect to="/report" />
        </>
        :
        <>
          <form className='main' style={{marginTop: '40px'}}>
              {
                  (this.props.APIError ? <ErrorComponent error={this.props.APIError} /> : '')
              }
              <div className='alert alert-warning'>
                Resetting transaction password.<br/>
                Enter your new password below.<br/>
                <b>Note:</b> By doing this, you will lose all your data!
              </div>
              <div className='form-group'>
                  <label htmlFor='password'>
                      Password:
                  </label>
                  <input id='password' className='form-control' type="password" name="password" ref={this.passwordRef} />
              </div>
              <div>
                  <input className='btn btn-primary form-control' type='button'  onClick={() => this.doResetPassword() } value="Reset Password" />
              </div>
              { this.state.loading ? <LoadingSpinner /> : '' }
          </form>
        </>
        );
    }

    doResetPassword(): void {
        this.setState({
            loading: true,
        })
        this.props.doResetPassword(this.props.userId, this.props.token, this.passwordRef.current.value);
    }
}


const mapStateToProps = (state: State, ownProps) => {
    return {
        isLoggedIn: state.user.isLoggedIn,
        APIError: state.user.APIError,
        ...ownProps,
    }
};

const mapDispatchToProps = dispatch => {
    return {
        doResetPassword: (userId: string, token: string, password: string) => {
            return dispatch(Actions.reset_password(
                {
                  userId,
                  token,
                  password,
                }
            ));
        },
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ResetPasswordComponent);
