import React from 'react';
import { useDrag } from 'react-dnd';

const EventBlock = ({ type, label }) => {
  const [{ isDragging }, drag] = useDrag({
    type: 'EVENT', 
    item: { type, category: 'event' },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  });

  return (
    <div
      ref={drag}
      className={`p-2 m-2 bg-red-200 rounded cursor-pointer ${
        isDragging ? 'opacity-50' : 'opacity-100'
      }`}
    >
      {label}
    </div>
  );
};

export default EventBlock;
