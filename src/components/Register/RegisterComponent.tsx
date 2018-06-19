import * as React from 'react';
import { connect } from 'react-redux';
import * as Actions from '../../store/actions/Actions';
import { Redirect } from 'react-router';

interface RegisterComponentProps {
    doRegister: (username: string, password: string, firstname: string) => void;
    isLoggedIn: boolean,
    token: string;
};

class RegisterComponent extends React.Component<RegisterComponentProps, {}> {
    userNameRef: React.RefObject<HTMLInputElement>;
    passwordRef: React.RefObject<HTMLInputElement>;
    nameRef: React.RefObject<HTMLInputElement>;

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
                    Firstname:
                    <input name="firstname" type="text" ref={this.nameRef} />
                </label>
            </div>
            <div>
                <label>
                    Login Password:
                    <input type="password" name="password" ref={this.passwordRef} />
                </label>
            </div>
            <div>
                <input type='button'  onClick={() => this.props.doRegister(this.userNameRef.current.value, this.nameRef.current.value, this.passwordRef.current.value) } value="Login" />
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
        doRegister: (username: string, firstname, password: string) => {
            return dispatch(Actions.do_register(
                {
                    firstname: firstname,
                    username: username,
                    password: password,
                }
            ));
        },
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(RegisterComponent);