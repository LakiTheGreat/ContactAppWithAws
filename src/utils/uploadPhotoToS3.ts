import { Storage } from "aws-amplify";

export default async function uploadPhotoToS3(photo: File) {
  try {
    const result = await Storage.put(photo.name, photo, {
      contentType: photo.type,
    });

    const imageUrl = await Storage.get(result.key);
    return imageUrl;
  } catch (e) {
    console.log("uploadPhotoToS3-error", e);
  }
}
