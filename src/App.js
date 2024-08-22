import React from "react";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import Sidebar from "./components/Sidebar";
import DragDropArea from "./components/DragDropArea";
import Preview from "./components/Preview";

const App = () => {
  return (
    <DndProvider backend={HTML5Backend}>
      <div className="flex">
        <div className="w-1/4 p-4">
          <Sidebar />
        </div>
        <div className="w-1/4 p-4">
          <DragDropArea />
        </div>
        <div className="w-1/2 p-4">
          <Preview />
        </div>
      </div>
    </DndProvider>
  );
};

export default App;
