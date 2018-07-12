import * as React from 'react';
import { connect } from 'react-redux';

interface NavComponentProps {
  token: string,
};

class NavComponent extends React.Component<NavComponentProps, {}> {
  render() {
    return (
      <>
        <nav className="bg-secondary main-nav">
          <ul >
            <li><a role="button" className="btn btn-secondary" href="/">Home</a></li>
            {
              this.props.token ?
                <>
                  <li><a role="button" className="btn btn-secondary" href="/report">Report</a></li>
                  <li><a role="button" className="btn btn-secondary" href='/report/breakdown'>Breakdown</a></li>
                </>
                : ''
            }
          </ul>
        </nav>

        <div className="mt-5" />
      </>
    );
  }
}

const mapStateToProps = state => {
    return {
        token: state.user.token,
    }
};

export default connect(mapStateToProps, () => ({}))(NavComponent);