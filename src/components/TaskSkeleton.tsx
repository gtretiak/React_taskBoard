import "../../styles/TaskSkeleton.css";

function TaskSkeleton() {
  return (
    <div className="task-list-skeleton">
      <div className="task-skeleton" />
      <div className="task-skeleton" />
      <div className="task-skeleton" />
      <div className="task-skeleton" />
    </div>
  );
}

export default TaskSkeleton;
