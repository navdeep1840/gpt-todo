import { Image } from "next/image";
interface Board {
  columns: Map<TypedColumn, Column>;
}

type TypedColumn = "todo" | "progress" | "done";

interface Column {
  id: TypedColumn;
  todos: ToDo[];
}

interface ToDo {
  $id: string;
  $createdAt: string;
  status: TypedColumn;
  title: string;
  image?: Image;
}

interface Image {
  bucketId: string;
  fileId: string;
}
