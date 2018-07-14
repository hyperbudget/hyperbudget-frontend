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

interface LoginComponentProps {
    doLogin: (username: string, password: string) => void;
    isLoggedIn: boolean,
    token: string;
    loginErrors: APIError[],
};

class LoginComponent extends React.Component<LoginComponentProps, {}> {
    userNameRef: React.RefObject<HTMLInputElement>;
    passwordRef: React.RefObject<HTMLInputElement>;

    componentDidUpdate(prevProps, prevState) {
        if (prevProps !== this.props) {
            console.log("moo");
            if (this.props.token) {
                console.log(this.props.token);
            }
        }
    }

    disableButton() {
        return !(this.userNameRef.current && this.passwordRef.current && this.userNameRef.current.value && this.passwordRef.current.value);
    }

    constructor(props) {
        super(props);

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
                        (this.props.loginErrors ? <ErrorComponent errors={this.props.loginErrors} /> : '')
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
                        <input className='btn btn-primary form-control' type='button'  onClick={() => this.props.doLogin(this.userNameRef.current.value, this.passwordRef.current.value) } value="Login" />
                    </div>
                </form>
            </div>
        </div>
        <FooterComponent />
        </>
        );
    }
}


const mapStateToProps = (state: State) => {
    console.log(state);
    return {
        isLoggedIn: state.user.isLoggedIn,
        token: state.user.token,
        loginErrors: state.user.loginErrors,
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
