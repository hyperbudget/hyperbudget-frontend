import * as React from 'react';
import { connect } from 'react-redux';
import LoginComponent from '../Login/LoginComponent';
import { State } from '../../lib/State/State';

interface RequireAuthContainerProps {
    token: string;
};


class RequireAuthContainer extends React.Component<RequireAuthContainerProps, {}> {
    render() {
        return (
            this.props.token ?
            <>
                { this.props.children }
            </> :
            <LoginComponent />
        );
    }
}

const mapStateToProps = (state: State) => {
    return {
        token: state.user.token,
    }
};

export default connect(mapStateToProps, () => ({}))(RequireAuthContainer);