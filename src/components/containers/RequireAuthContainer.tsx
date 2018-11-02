import * as React from 'react';
import { connect } from 'react-redux';
import { State } from '../../lib/State/State';
import { Redirect } from 'react-router';

interface RequireAuthContainerProps {
    email: string;
};


class RequireAuthContainer extends React.Component<RequireAuthContainerProps, {}> {
    render() {
        return (
            this.props.email ?
            <>
                { this.props.children }
            </> :
            <Redirect to="/login" />
        );
    }
}

const mapStateToProps = (state: State) => {
    return {
        email: state.user.email,
    }
};

export default connect(mapStateToProps, () => ({}))(RequireAuthContainer);
