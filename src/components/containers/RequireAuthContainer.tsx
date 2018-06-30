import * as React from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router';

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
            <>
            {/* <Redirect to={`/login`} /> */}
            Not logged in
            </>
        );
    }
}

const mapStateToProps = state => {
    return {
        token: state.user.token,
    }
};

export default connect(mapStateToProps, () => ({}))(RequireAuthContainer);