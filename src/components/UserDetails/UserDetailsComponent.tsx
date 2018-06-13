import * as React from 'react';
import { connect } from 'react-redux';
import * as Actions from '../../store/actions/Actions';

import * as User from '../../lib/User/User';

interface UserDetailsComponentProps {
    isLoggedIn: boolean;
    doLogin(): React.MouseEventHandler<HTMLButtonElement>;
    token: string;
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
        token: state.user.token,
    }
};

const mapDispatchToProps = dispatch => {
    return {
        doLogin: () => dispatch(Actions.do_login()),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(UserDetailsComponent);