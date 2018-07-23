import * as React from 'react';
import JSONEditor from 'jsoneditor';
import 'jsoneditor/dist/jsoneditor.min.css';

import { Category, JSONSchema } from '@hyperbudget/hyperbudget-core';

interface JSONEditorProps {
  onUpdate: (JSONText: string) => void;
  categories: Category[];
};

interface JSONEditorState {
  btnDisabled: boolean;
};

export class JSONEditorComponent extends React.Component<JSONEditorProps, JSONEditorState> {
  JSONInputRef: React.RefObject<HTMLDivElement>;
  editor: JSONEditor;

  constructor(props: JSONEditorProps) {
    super(props);
    this.JSONInputRef = React.createRef();

    this.state = {
      btnDisabled: false,
    };
  }

  componentDidMount() {
    const catSchema = JSONSchema.Category;
    // HACK: to make Ajv accept the schema...
    delete catSchema['$schema'];

    // create the editor
    const container = this.JSONInputRef.current;
    this.editor = new JSONEditor(container, {
      mode: 'code',
      schema: {
        "type": "object",
        "properties": {
          categories: {
            "type": "array",
            "items": { "$ref": "category" }
          }
        }
      },
      schemaRefs: {
        "category": catSchema,
      },
      // HACK HACK HACK HACK HACK
      onChange: () => {
        setTimeout(() => {
          let hasErrors = document.getElementsByClassName('ace_error').length > 0 ||
                          document.getElementsByClassName('jsoneditor-text-errors').length > 0;
          this.setState({
            ...this.state,
            btnDisabled: hasErrors,
          })
        }, 500);
      },
    });

    this.editor.set({
      categories: this.props.categories,
    });
  }

  doUpdate() {
    this.props.onUpdate(this.editor.get());
  }

  render() {
    return (
      <>
      <div style={{ width: '100%', height: '500px' }} ref={this.JSONInputRef}></div>
      <input type='button' value='Update' disabled={this.state.btnDisabled} className='btn btn-primary' onClick={this.doUpdate.bind(this)} />
      { this.state.btnDisabled ? <div className='alert alert-error'>Errors found, check the editor.</div> : '' }
      </>
    );
  }

}
