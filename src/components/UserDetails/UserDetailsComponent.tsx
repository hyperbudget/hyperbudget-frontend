import * as React from 'react';
import { connect } from 'react-redux';

interface UserDetailsComponentProps {
    isLoggedIn: boolean;
    email: string;
};

class UserDetailsComponent extends React.Component<UserDetailsComponentProps, {}> {

    render() {
        return (
        <>
        { this.props.isLoggedIn ? <span>Hello, user</span> : <span>not logged in</span>}
        </>
        );
    }
}


const mapStateToProps = state => {
    return {
        isLoggedIn: state.user.isLoggedIn,
        email: state.user.email,
    }
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(UserDetailsComponent);
