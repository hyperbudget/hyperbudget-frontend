import * as React from 'react';
import { connect } from 'react-redux';
import * as Actions from '../../store/actions/Actions';
import { Redirect } from 'react-router';

interface LoginComponentProps {
    doLogin: (username: string, password: string) => void;
    isLoggedIn: boolean,
    token: string;
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
            <div>
                <label>
                    Username:
                    <input name="email" type="email" ref={this.userNameRef} />
                </label>
            </div>
            <div>
                <label>
                    Login Password:
                    <input type="password" name="password" ref={this.passwordRef} />
                </label>
            </div>
            <div>
                <input type='button'  onClick={() => this.props.doLogin(this.userNameRef.current.value, this.passwordRef.current.value) } value="Login" />
            </div>
        </>
        );
    }
}


const mapStateToProps = state => {
    console.log(state);
    return {
        isLoggedIn: state.user.isLoggedIn,
        token: state.user.token,
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