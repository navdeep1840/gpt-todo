"use client";
import { useBoardStore } from "@/store/BoardStore";
import { useEffect } from "react";
import { DragDropContext, DropResult, Droppable } from "react-beautiful-dnd";
import { Column } from "@/typings";
import Col from "./Column";
import { finished } from "stream";

type Props = {};

const Board = (props: Props) => {
  const [getBoard, board, setBoardState, updateTodoDB] = useBoardStore(
    (state) => [
      state.getBoard,
      state.board,
      state.setBoardState,
      state.updateTodoDB,
    ]
  );

  useEffect(() => {
    getBoard();
  }, [getBoard]);

  const handleOnDragEnd = (result: DropResult) => {
    const { source, destination, type } = result;

    //to avoid dropp outside the board
    if (!destination) return;

    // handle column drag
    if (type === "column") {
      const entries = Array.from(board.columns.entries());
      const [removed] = entries.splice(source.index, 1);

      entries.splice(destination.index, 0, removed);

      const rearrangedColumns = new Map(entries);

      setBoardState({
        ...board,
        columns: rearrangedColumns,
      });
    }

    // { thisssss}

    const columns = Array.from(board.columns);
    const startColumnIndex = columns[Number(source.droppableId)];
    const endColumnIndex = columns[Number(destination.droppableId)];

    const startCol: Column = {
      id: startColumnIndex[0],
      todos: startColumnIndex[1].todos,
    };

    const endCol: Column = {
      id: endColumnIndex[0],
      todos: endColumnIndex[1].todos,
    };

    if (!startCol || !endCol) return;

    if (startCol === endCol && source.index === destination.index) return;

    const newTodos = startCol.todos;
    const [todoMoved] = newTodos.splice(source.index, 1);
    if (startCol.id === endCol.id) {
      // same column drag
      newTodos.splice(destination.index, 0, todoMoved);

      const newCol = {
        id: startCol.id,
        todos: newTodos,
      };

      const newColumns = new Map(board.columns);
      newColumns.set(startCol.id, newCol);

      setBoardState({
        ...board,
        columns: newColumns,
      });
    } else {
      // drag to another column

      const endTodos = Array.from(endCol.todos);
      endTodos.splice(destination.index, 0, todoMoved);

      const newColumns = new Map(board.columns);

      const newCol = {
        id: startCol.id,
        todos: newTodos,
      };

      newColumns.set(startCol.id, newCol);
      newColumns.set(endCol.id, {
        id: endCol.id,
        todos: endTodos,
      });

      updateTodoDB(todoMoved, endCol.id);

      setBoardState({
        ...board,
        columns: newColumns,
      });
    }
  };

  return (
    <DragDropContext onDragEnd={handleOnDragEnd}>
      <Droppable droppableId="board" direction="horizontal" type="column">
        {(provided) => (
          <div
            className=" grid grid-cols-1 md:grid-cols-3 gap-5 mx-auto max-w-7xl "
            {...provided.droppableProps}
            ref={provided.innerRef}
          >
            {Array.from(board.columns.entries()).map(([id, column], index) => (
              <Col key={id} id={id} todos={column.todos} index={index} />
            ))}
          </div>
        )}
      </Droppable>
    </DragDropContext>
  );
};

export default Board;
