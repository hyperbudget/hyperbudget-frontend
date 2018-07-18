import * as React from 'react';
import JSONEditor from 'jsoneditor';
import 'jsoneditor/dist/jsoneditor.min.css';

import { Category } from '@hyperbudget/hyperbudget-core';

interface JSONEditorProps {
  onUpdate: (JSONText: string) => void;
  categories: Category[];
};

export class JSONEditorComponent extends React.Component<JSONEditorProps, {}> {
  JSONInputRef: React.RefObject<HTMLDivElement>;
  editor: JSONEditor;

  constructor(props: JSONEditorProps) {
    super(props);
    this.JSONInputRef = React.createRef();
  }

  componentDidMount() {
    // create the editor
    const container = this.JSONInputRef.current;
    this.editor = new JSONEditor(container, {
      mode: 'code',
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
      <input type='button' value='Update' className='btn btn-primary' onClick={this.doUpdate.bind(this)} />
      </>
    );
  }

}
