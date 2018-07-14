import * as React from 'react';
import { connect } from 'react-redux';
import { State } from '../../lib/State/State';
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
            <Redirect to="/login" />
        );
    }
}

const mapStateToProps = (state: State) => {
    return {
        token: state.user.token,
    }
};

export default connect(mapStateToProps, () => ({}))(RequireAuthContainer);
