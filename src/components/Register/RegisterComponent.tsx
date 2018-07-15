import * as React from 'react';
import { connect } from 'react-redux';
import * as Actions from '../../store/actions/Actions';
import { Redirect } from 'react-router';
import { APIError } from '../../lib/APIError/APIError';
import { ErrorComponent } from '../Error/Error';
import { State } from '../../lib/State/State';

interface RegisterComponentProps {
    doRegister: (params: {
        username: string,
        firstname: string,
        lastname: string,
        password: string,
    }) => void;
    isLoggedIn: boolean,
    token: string;
    loginErrors: APIError[],
};

class RegisterComponent extends React.Component<RegisterComponentProps, {}> {
    userNameRef: React.RefObject<HTMLInputElement>;
    passwordRef: React.RefObject<HTMLInputElement>;
    nameRef: React.RefObject<HTMLInputElement>;
    lastNameRef: React.RefObject<HTMLInputElement>;

    componentDidUpdate(prevProps, prevState) {
    }

    disableButton() {
        return !(
            this.userNameRef.current &&
            this.passwordRef.current &&
            this.nameRef.current &&
            this.userNameRef.current.value &&
            this.passwordRef.current.value &&
            this.nameRef.current.value
        );
    }

    constructor(props) {
        super(props);

        this.userNameRef = React.createRef();
        this.passwordRef = React.createRef();
        this.nameRef = React.createRef();
        this.lastNameRef = React.createRef();
    }

    render() {
        return (
        this.props.token
        ?
        <>
            <Redirect to="/report" />
        </>
        :
        <div className="home">
            <div className='home-text'>
                <form className='loginForm'>
                    {
                        (this.props.loginErrors ? <ErrorComponent errors={this.props.loginErrors} /> : '')
                    }
                    <div className='form-group'>
                        <label htmlFor="email">
                            Email:
                        </label>
                        <input className='form-control' id="email" name="email" type="email" ref={this.userNameRef} />
                    </div>
                    <div className='form-group'>
                        <label htmlFor="firstname">
                            Firstname:
                        </label>
                        <input className='form-control' id="firstname" name="firstname" type="text" ref={this.nameRef} />
                    </div>
                    <div className='form-group'>
                        <label htmlFor="lastname">
                            Last:
                        </label>
                        <input className='form-control' id="last" name="lastname" type="text" ref={this.lastNameRef} />
                    </div>
                    <div className='form-group'>
                        <label htmlFor="password">
                            Login Password:
                        </label>
                        <input className='form-control' id="password" type="password" name="password" ref={this.passwordRef} />
                    </div>
                    <div className='form-group'>
                        <input className='form-control btn btn-primary' type='button'  onClick={() => this.props.doRegister({
                            username: this.userNameRef.current.value,
                            firstname: this.nameRef.current.value,
                            lastname: this.lastNameRef.current.value,
                            password: this.passwordRef.current.value
                        }) } value="Login" />
                    </div>
                </form>
            </div>
        </div>
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
        doRegister: (params) => {
            return dispatch(Actions.do_register(
                {
                    firstname: params.firstname,
                    lastname: params.lastname,
                    username: params.username,
                    password: params.password,
                }
            ));
        },
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(RegisterComponent);
