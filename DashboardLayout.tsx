import React from 'react';
import WorkerCard from './WorkerCard';
import { useWorkerData } from '../context/WorkerDataContext';

const DashboardLayout: React.FC = () => {
  const { workers } = useWorkerData();

  return (
    <main className="container mx-auto p-6">
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
        {workers.map((worker) => (
          <WorkerCard key={worker.id} worker={worker} />
        ))}
      </div>
    </main>
  );
};

export default DashboardLayout;