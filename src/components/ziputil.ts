import admZip from 'adm-zip';

export function unzip(fileName: string, targetPath?: string) {
    const unzip = new admZip(fileName);
    unzip.extractAllTo(targetPath, /*overwrite*/ true);
}