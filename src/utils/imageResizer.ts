import Resizer from "react-image-file-resizer";

const extractFileFormat = (fileType: string): string | null => {
  const match = fileType.match(/^image\/(.+)$/);

  if (match) {
    return match[1];
  }

  return null;
};

export const imageResizer = (file: File): Promise<File> => {
  const fileFormat = extractFileFormat(file.type);

  return new Promise((resolve) => {
    Resizer.imageFileResizer(
      file,
      200,
      200,
      fileFormat || "JPEG",
      100,
      0,
      (resizedFile) => {
        resolve(resizedFile as File);
      },
      "file"
    );
  });
};
