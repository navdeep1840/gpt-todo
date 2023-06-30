import { storage } from "@/appwrite";

const getUrl = async (image: any) => {
  console.log(image);

  const url = storage.getFilePreview(image.bucketId, image.fileId);

  return url;
};

export default getUrl;
