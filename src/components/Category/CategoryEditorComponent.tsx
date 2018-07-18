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
import { formatError } from '../../lib/Util/Util';

interface EditorProps {
  categories: Category[],
  txnPassword: string,
  token: string,
};

interface EditorState {
  errors: APIError[],
  success: boolean,
};

class CategoryEditorComponent extends React.Component<EditorProps, EditorState> {
  constructor(props) {
    super(props);
    this.state = {
      errors: [],
      success: null,
    };
  }

  doUpdate(params: { categories: Category[] }) {
    User.set_categories({
      categories: params.categories,
      password: this.props.txnPassword,
      token: this.props.token,
    }).then(
      () => {
        this.setState({
          success: true,
          errors: [],
        });
      },
      (err) => {
        this.setState({
          success: null,
          errors: [{
            msg: 'Error updating categories',
          }]
        })
      }
    )
  }

  render() {
    return (
      <div style={{ margin: '80px 10px' }}>
      <RequireAuthContainer>
        <RequireTxnPasswordContainer>
          { this.state.errors.length ? <ErrorComponent errors={this.state.errors} /> : '' }
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
    token: state.user.token,
  }
};

export default connect(mapStateToProps, null)(CategoryEditorComponent);
