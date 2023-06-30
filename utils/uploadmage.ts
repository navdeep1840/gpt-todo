import { ID, storage } from "@/appwrite";

const uploadImage = async (file: File) => {
  const fileUploaded = await storage.createFile(
    process.env.NEXT_PUBLIC_PROJECT_BUCKET!,
    ID.unique(),
    file
  );

  return fileUploaded;
};

export default uploadImage;
