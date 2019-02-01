import * as React from 'react';
import { connect } from 'react-redux';
import { State } from '../../lib/State/State';
import { Redirect } from 'react-router';

interface RequireAuthContainerProps {
    has_email: boolean;
};


class RequireAuthContainer extends React.Component<RequireAuthContainerProps, {}> {
    render() {
        return (
            this.props.has_email ?
            <>
                { this.props.children }
            </> :
            <Redirect to="/login" />
        );
    }
}

const mapStateToProps = (state: State) => {
    return {
        has_email: !!state.user.email,
    }
};

export default connect(mapStateToProps, () => ({}))(RequireAuthContainer);
