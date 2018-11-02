import * as React from 'react';
import { connect } from 'react-redux';

import * as Actions from '../../store/actions/Actions';
import { State } from '../../lib/State/State';

import RequireTxnPasswordContainer from '../containers/RequireTxnPasswordContainer';
import RequireAuthContainer from '../containers/RequireAuthContainer';
import { JSONEditorComponent } from '../JSONEditor/JSONEditorComponent';

import { APIError } from '../../lib/APIError/APIError';
import { ErrorComponent } from '../Error/Error';

import { Category } from '@hyperbudget/hyperbudget-core';

import * as User from '../../lib/User/User';

interface EditorProps {
  categories: Category[],
  txnPassword: string,
  email: string,
};

interface EditorState {
  error: APIError,
  success: boolean,
};

class CategoryEditorComponent extends React.Component<EditorProps, EditorState> {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      success: null,
    };
  }

  doUpdate(params: { categories: Category[] }) {
    User.set_categories({
      categories: params.categories,
      password: this.props.txnPassword,
      email: this.props.email,
    }).then(
      () => {
        this.setState({
          success: true,
          error: null,
        })
      },
      (err) => {
        this.setState({
          success: null,
          error: {
            message: 'Error updating categories',
          }
        })
      }
    )
  }

  render() {
    return (
      <div style={{ margin: '80px 10px' }}>
      <RequireAuthContainer>
        <RequireTxnPasswordContainer>
          { this.state.error ? <ErrorComponent error={this.state.error} /> : '' }
          { this.state.success ? <div className='alert alert-success'>Success</div> : '' }
          <JSONEditorComponent categories={this.props.categories} onUpdate={this.doUpdate.bind(this)} />
        </RequireTxnPasswordContainer>
      </RequireAuthContainer>
      </div>
    )
  }
}

const mapStateToProps = (state: State): EditorProps => {
  return {
    categories: state.user.categories,
    txnPassword: state.user.txnPassword,
    email: state.user.email,
  }
};

export default connect(mapStateToProps, null)(CategoryEditorComponent);
