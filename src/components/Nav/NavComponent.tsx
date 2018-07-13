import * as React from 'react';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { State } from '../../lib/State/State';

interface NavComponentProps {
  token: string,
};

class NavComponent extends React.Component<NavComponentProps, {}> {
  render() {
    return (
      <>
        <nav className="bg-secondary main-nav">
          <ul >
            <li><NavLink exact className="btn btn-secondary" to="/">Home</NavLink></li>
            {
              this.props.token ?
                <>
                  <li><NavLink role="button" className="btn btn-secondary" to="/report">Report</NavLink></li>
                  <li><NavLink role="button" className="btn btn-secondary" to='/report/breakdown'>Breakdown</NavLink></li>
                </>
                :
                <>
                  <li><NavLink exact  className="btn btn-secondary" to="/login">Login</NavLink></li>
                </>
            }
          </ul>
        </nav>

        <div className="mt-5" />
      </>
    );
  }
}

const mapStateToProps = (state: State) => {
    return {
        token: state.user.token,
    }
};

export default connect(mapStateToProps, null, null, { pure: false } )(NavComponent);