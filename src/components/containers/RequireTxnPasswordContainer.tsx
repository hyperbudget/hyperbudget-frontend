import * as React from 'react';
import { connect } from 'react-redux';
import TxnPasswordComponent from '../Login/TxnPasswordComponent';
import { State } from '../../lib/State/State';

interface RequireTxnPasswordContainerProps {
    has_txn_password: boolean;
};


class RequireTxnPasswordContainer extends React.Component<RequireTxnPasswordContainerProps, {}> {
    render() {
        return (
            this.props.has_txn_password ?
            <>
                { this.props.children }
            </> :
            <TxnPasswordComponent />
        );
    }
}

const mapStateToProps = (state: State) => {
    return {
        has_txn_password: !!state.user.txnPassword,
    }
};

export default connect(mapStateToProps, () => ({}))(RequireTxnPasswordContainer);
