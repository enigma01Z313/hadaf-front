import React from "react";
import { Draggable, Droppable } from "react-beautiful-dnd";

const Column = ({ column, tasks }) => {
  return (
    <div className="wrapper-box d-flex direction-column">
      <div>
        <span fontSize="17px" fontWeight={600} color="subtle-text">
          {column.title}
        </span>
      </div>

      <Droppable droppableId={column.id}>
        {(droppableProvided, droppableSnapshot) => (
          <div
            className="grow-1"
            ref={droppableProvided.innerRef}
            {...droppableProvided.droppableProps}>
            {tasks.map((task, index) => (
              <Draggable key={task.id} draggableId={`${task.id}`} index={index}>
                {(draggableProvided, draggableSnapshot) => (
                  <div
                    onClick={() => {console.log('1111111111----------------');}}
                    ref={draggableProvided.innerRef}
                    {...draggableProvided.draggableProps}
                    {...draggableProvided.dragHandleProps}>
                    <span>{task.content}</span>
                  </div>
                )}
              </Draggable>
            ))}
          </div>
        )}
      </Droppable>
    </div>
  );
};

export default Column;
