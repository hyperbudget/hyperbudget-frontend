import * as React from 'react';
import { connect } from 'react-redux';


interface UserDetailsComponentProps {
    isLoggedIn: boolean;
    doLogin(): React.MouseEventHandler<HTMLButtonElement>;
};

class UserDetailsComponent extends React.Component<UserDetailsComponentProps, {}> {
    render() {
        return (
        <>
        { this.props.isLoggedIn ? <span>Hello, user</span> : <button onClick={this.props.doLogin}>Login</button> }
        </>
        );
    }
}


const mapStateToProps = state => {
    console.log(state);
    return {
        isLoggedIn: state.user.isLoggedIn,
    }
};

const mapDispatchToProps = dispatch => {
    return {
        doLogin: () => dispatch({ type: 'DO_LOGIN' }),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(UserDetailsComponent);