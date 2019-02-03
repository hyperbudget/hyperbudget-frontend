import * as React from 'react';

import { connect } from 'react-redux';
import { Redirect } from 'react-router';

import { RouteComponentProps } from 'react-router-dom';

import * as Actions from '../../store/actions/Actions';

import { State } from '../../lib/State/State';
import { APIError } from '../../lib/APIError/APIError';
import { ErrorComponent } from '../Error/Error';


import '../HomeComponent/HomeComponent.css';
import './LoginComponent.css';
import FooterComponent from '../FooterComponent/FooterComponent';
import LoadingSpinner from '../LoadingSpinner';

interface LoginRouterProps {
  next?: string;
}

interface LoginComponentProps extends RouteComponentProps<LoginRouterProps> {
    doLogin: (username: string, password: string, remember: boolean) => void;
    isLoggedIn: boolean,
    APIError: APIError,
    email: string,
};

interface LoginComponentState {
    loading: boolean;
    remember: boolean;
}

class LoginComponent extends React.Component<LoginComponentProps, LoginComponentState> {
    userNameRef: React.RefObject<HTMLInputElement>;
    passwordRef: React.RefObject<HTMLInputElement>;

    componentDidUpdate(prevProps, prevState) {
        if (prevProps !== this.props) {
            if (this.props.isLoggedIn || this.props.APIError) {
              this.setState({
                loading: false,
              });
              if (this.props.location.state && this.props.location.state.next) {
                this.props.history.push(this.props.location.state.next);
              }
            }
        }
    }

    disableButton() {
        return !(this.userNameRef.current && this.passwordRef.current && this.userNameRef.current.value && this.passwordRef.current.value);
    }

    constructor(props) {
        super(props);

        this.state = {
            loading: false,
            remember: !!this.props.email,
        };

        this.userNameRef = React.createRef();
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
        <div className='home'>
            <div className='home-text'>
                <form className='loginForm'>
                    {
                        (this.props.APIError ? <ErrorComponent error={this.props.APIError} /> : '')
                    }
                    <div className='form-group'>
                        <label htmlFor='email'>
                            Username:
                        </label>
                        <input id='email' defaultValue={this.props.email||''} className='form-control' name="email" type="email" ref={this.userNameRef} />
                    </div>
                    <div className='form-group'>
                        <label htmlFor='password'>
                            Login Password:
                        </label>
                        <input id='password' className='form-control' type="password" name="password" ref={this.passwordRef} />
                    </div>
                    <div className='form-check'>
                        <input onChange={ () => this.toggleRemember() } id='remember' className='form-check-input' type="checkbox" name="remember" />
                        <label htmlFor='remember' className='form-check-label'>
                            Remember me?
                        </label>
                    </div>
                    <div className='mt10'>
                        <input className='btn btn-primary form-control' type='button'  onClick={() => this.doLogin() } value="Login" />
                    </div>
                    <div style={{paddingTop: '10px'}}>
                        Forgot your password? <a href='/reset-password'>Request a password reset email</a>.
                    </div>
                    { this.state.loading ? <LoadingSpinner /> : '' }
                </form>
            </div>
        </div>
        <FooterComponent />
        </>
        );
    }

    toggleRemember() : void {
        this.setState({
            remember: !this.state.remember,
        });
    }

    doLogin(): void {
        this.setState({
            loading: true,
        })
        this.props.doLogin(this.userNameRef.current.value, this.passwordRef.current.value, this.state.remember);
    }
}


const mapStateToProps = (state: State) => {
    return {
        isLoggedIn: state.user.isLoggedIn,
        APIError: state.user.APIError,
        email: state.user.email,
    }
};

const mapDispatchToProps = dispatch => {
    return {
        doLogin: (email: string, password: string, remember:boolean=false) => {
            return dispatch(Actions.get_transactions(
                {
                    email,
                    remember,
                    txnPassword: password,
                }
            ));
        },
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(LoginComponent);
