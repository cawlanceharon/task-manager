import React from 'react';
import TaskList from '../../components/TaskList';
import PageBuilder from '../../components/PageBuilder';

const TasksPage: React.FC = () => {
  return (
    <PageBuilder title="Task Manager" width="lg">
      <TaskList />
    </PageBuilder>
  );
};

export default TasksPage;