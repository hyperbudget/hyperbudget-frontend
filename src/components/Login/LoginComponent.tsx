import * as React from 'react';
import { connect } from 'react-redux';
import * as Actions from '../../store/actions/Actions';
import { Redirect } from 'react-router';

import { State } from '../../lib/State/State';
import { APIError } from '../../lib/APIError/APIError';
import { ErrorComponent } from '../Error/Error';

import '../HomeComponent/HomeComponent.css';
import './LoginComponent.css';
import FooterComponent from '../FooterComponent/FooterComponent';
import LoadingSpinner from '../LoadingSpinner';

interface LoginComponentProps {
    doLogin: (username: string, password: string) => void;
    isLoggedIn: boolean,
    token: string;
    APIErrors: APIError[],
};

interface LoginComponentState {
    loading: boolean;
}

class LoginComponent extends React.Component<LoginComponentProps, LoginComponentState> {
    userNameRef: React.RefObject<HTMLInputElement>;
    passwordRef: React.RefObject<HTMLInputElement>;

    componentDidUpdate(prevProps, prevState) {
        if (prevProps !== this.props) {
            if (this.props.token || this.props.APIErrors) {
                this.setState({
                    loading: false,
                })
            }
        }
    }

    disableButton() {
        return !(this.userNameRef.current && this.passwordRef.current && this.userNameRef.current.value && this.passwordRef.current.value);
    }

    constructor(props) {
        super(props);

        this.state = {
            loading: false
        };

        this.userNameRef = React.createRef();
        this.passwordRef = React.createRef();
    }

    render() {
        return (
        this.props.token
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
                        (this.props.APIErrors ? <ErrorComponent errors={this.props.APIErrors} /> : '')
                    }
                    <div className='form-group'>
                        <label htmlFor='email'>
                            Username:
                        </label>
                        <input id='email' className='form-control' name="email" type="email" ref={this.userNameRef} />
                    </div>
                    <div className='form-group'>
                        <label htmlFor='password'>
                            Login Password:
                        </label>
                        <input id='password' className='form-control' type="password" name="password" ref={this.passwordRef} />
                    </div>
                    <div>
                        <input className='btn btn-primary form-control' type='button'  onClick={() => this.doLogin() } value="Login" />
                    </div>
                    { this.state.loading ? <LoadingSpinner /> : '' }
                </form>
            </div>
        </div>
        <FooterComponent />
        </>
        );
    }

    doLogin(): void {
        this.setState({
            loading: true,
        })
        this.props.doLogin(this.userNameRef.current.value, this.passwordRef.current.value);
    }
}


const mapStateToProps = (state: State) => {
    return {
        isLoggedIn: state.user.isLoggedIn,
        token: state.user.token,
        APIErrors: state.user.APIErrors,
    }
};

const mapDispatchToProps = dispatch => {
    return {
        doLogin: (username: string, password: string) => {
            return dispatch(Actions.do_login(
                {
                    username: username,
                    password: password,
                }
            ));
        },
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(LoginComponent);
