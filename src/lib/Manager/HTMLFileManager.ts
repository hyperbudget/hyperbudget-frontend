export class HTMLFileManager {

  static read_file(file: File): Promise<string> {
    var reader: FileReader = new FileReader();
    reader.readAsText(file, "UTF-8");

    return new Promise(function (resolve, reject) {
      reader.onload = function (evt: ProgressEvent) {
        resolve(reader.result.toString());
      }
      reader.onerror = function (evt) {
        reject(evt);
      }
    });
  }
}
