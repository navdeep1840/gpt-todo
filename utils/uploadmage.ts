import { create } from "zustand";
import { ID, storage } from "@/appwrite";

const uploadImage = async (file: File) => {
  const fileUploaded = await storage.createFile(
    "6499d6404ba2fb9f84de",
    ID.unique(),
    file
  );

  return fileUploaded;
};

export default uploadImage;
