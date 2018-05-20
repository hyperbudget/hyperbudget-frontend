import * as React from 'react';

interface StatementUploaderProps {
  onFileSelected(file: File, type: string): void,
}


export class StatementUploaderComponent extends React.Component<StatementUploaderProps, {}> {
  fileInputRef: React.RefObject<HTMLInputElement>;
  typeSelectRef: React.RefObject<HTMLSelectElement>;

  constructor(props: StatementUploaderProps) {
    super(props);
    this.fileInputRef = React.createRef();
    this.typeSelectRef = React.createRef();
  }

  componentDidMount() {
  }

  onSubmit = (): void => {
    let fileInputElement: HTMLInputElement = this.fileInputRef.current;
    let selectElement: HTMLSelectElement = this.typeSelectRef.current;

    let file: File = fileInputElement.files[0];
    let type: string = selectElement.value;

    if (!file || !type) {
      console.log("no file or type", file, type);
      return;
    }

    this.props.onFileSelected(file, type);
  }

  render() {
    return (
      <div className='StatementUploader'>
        <label>File: <input type="file" ref={this.fileInputRef} name="file" /></label>

        <label>
          Type:
          <select name="type"  ref={this.typeSelectRef}>
            <option selected value="lloyds">Lloyds Bank</option>
            <option value="hsbc">HSBC</option>
            <option value="fairfx-corp">FairFX Corp</option>
            <option value="midata" >Midata</option>
            <option value="rbs">RBS (UNTESTED)</option>
          </select>
        </label>

        <input type="submit" onClick={this.onSubmit} />
      </div>
    );
  }
}