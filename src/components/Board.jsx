import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import IssueCard from "./IssueCard";

const columns = ["To Start", "In Progress", "Code Review", "Done"];

function Board({ issues, onMoveIssue }) {
  const handleDragEnd = (result) => {
    if (!result.destination) return;

    const issueId = result.draggableId;
    const newStatus = result.destination.droppableId;

    onMoveIssue(issueId, newStatus);
  };

  const getIssuesByStatus = (status) => {
    return issues.filter((issue) => issue.status === status);
  };

  return (
    <DragDropContext onDragEnd={handleDragEnd}>
      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4'>
        {columns.map((column) => (
          <div key={column} className='bg-gray-50 rounded-lg p-4'>
            <h2 className='font-semibold text-lg mb-4 text-gray-700 flex items-center justify-between'>
              <span>{column}</span>
              <span className='text-sm bg-gray-200 rounded-full px-2 py-1'>
                {getIssuesByStatus(column).length}
              </span>
            </h2>
            <Droppable droppableId={column}>
              {(provided, snapshot) => (
                <div
                  ref={provided.innerRef}
                  {...provided.droppableProps}
                  className={`min-h-[200px] ${
                    snapshot.isDraggingOver ? "bg-blue-50" : ""
                  } rounded-lg transition-colors`}
                >
                  {getIssuesByStatus(column).map((issue, index) => (
                    <Draggable
                      key={issue.id}
                      draggableId={issue.id}
                      index={index}
                    >
                      {(provided, snapshot) => (
                        <div
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                          className={`mb-3 ${
                            snapshot.isDragging ? "opacity-50" : ""
                          }`}
                        >
                          <IssueCard issue={issue} />
                        </div>
                      )}
                    </Draggable>
                  ))}
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          </div>
        ))}
      </div>
    </DragDropContext>
  );
}

export default Board;
