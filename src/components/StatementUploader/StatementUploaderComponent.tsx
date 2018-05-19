import * as React from 'react';

interface StatementUploaderProps {
  onFileSelected(file: File, type: string): void,
}


export class StatementUploaderComponent extends React.Component<StatementUploaderProps, {}> {
  fileInput: React.RefObject<HTMLInputElement>;
  textInput: React.RefObject<HTMLInputElement>;

  constructor(props: StatementUploaderProps) {
    super(props);
    this.fileInput = React.createRef();
    this.textInput = React.createRef();
  }

  componentDidMount() {
  }

  onSubmit = ():void => {
    console.log(this, this.fileInput);
    let fileInputElement: HTMLInputElement = this.fileInput.current;
    let textInputElement: HTMLInputElement = this.textInput.current;

    let file: File = fileInputElement.files[0];
    let type: string = textInputElement.value;
    
    if (!file || !type) {
      console.log("no file or type", file, type);
      return;
    }

    this.props.onFileSelected(file, type);
  }

  render() {
    return (
      <div className='StatementUploader'>
      <label>File: <input type="file" ref={ this.fileInput } name="file" /></label>
      <label>Type: <input type="text" ref={ this.textInput } defaultValue="lloyds" name="type" /></label>
      <input type="submit" onClick={ this.onSubmit } />
      </div>
    );
  }
}