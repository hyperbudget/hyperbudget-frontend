import * as React from 'react';
import { connect } from 'react-redux';
import TxnPasswordComponent from '../Login/TxnPasswordComponent';

interface RequireTxnPasswordContainerProps {
    txn_password: string;
};


class RequireTxnPasswordContainer extends React.Component<RequireTxnPasswordContainerProps, {}> {
    render() {
        return (
            this.props.txn_password ?
            <>
                { this.props.children }
            </> :
            <TxnPasswordComponent />
        );
    }
}

const mapStateToProps = state => {
    return {
        txn_password: state.user.txn_password,
    }
};

export default connect(mapStateToProps, () => ({}))(RequireTxnPasswordContainer);