import * as React from 'react';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { State } from '../../lib/State/State';
import { ActionTypes } from '../../store/actions/Actions';

import * as Util from '../../lib/Util/Util';

interface NavComponentProps {
  email: string,
  doLogout(),
};

class NavComponent extends React.Component<NavComponentProps, {}> {
  render() {
    return (
      <>
        <nav className="bg-secondary main-nav">
          <ul >
            <li><NavLink exact className="btn btn-secondary" to="/">Home</NavLink></li>
            {
              this.props.email ?
                <>
                  <li><NavLink role="button" className="btn btn-secondary" to="/report">Report</NavLink></li>
                  <li><NavLink role="button" className="btn btn-secondary" to='/breakdown'>Breakdown</NavLink></li>
                  <li><NavLink role="button" className="btn btn-secondary" to="/categories/editor">Category Editor</NavLink></li>
                  <li><a role="button" className="btn btn-secondary" href='javascript:;' onClick={ this.props.doLogout }>Log out</a></li>
                </>
                :
                <>
                  <li><NavLink exact  className="btn btn-secondary" to="/login">Login</NavLink></li>
                  <li><NavLink exact  className="btn btn-secondary" to="/register">Register</NavLink></li>
                </>
            }
          </ul>
        </nav>
      </>
    );
  }
}

const mapStateToProps = (state: State) => {
    return {
        email: state.user.email,
    }
};

const mapDispatchToProps = dispatch => {
  return {
    doLogout: () => {
      return dispatch({ type: ActionTypes.DO_LOGOUT });
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps, null, { pure: false } )(NavComponent);
