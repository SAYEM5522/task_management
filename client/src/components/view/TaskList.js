import React from 'react';
import { Droppable } from 'react-beautiful-dnd';
import Task from "./Task"
import { useState } from 'react';
import { GoPlus } from "react-icons/go";
import { toast } from 'react-toastify';
const TaskList = ({ col: { list, id },addTask }) => {
  const [newTaskText, setNewTaskText] = useState('');
  const handleAddTask = () => {
    if(newTaskText===""){
      toast.warn("Card name is requored")
    }else{
      if (newTaskText.trim() !== '') {
        addTask(id, newTaskText);
        setNewTaskText('');
      }
    }
    
  };
  return (
    <Droppable droppableId={id}>
      {(provided) => (
        <div className="bg-[#F1F5F9] rounded-md shadow-[rgba(50,_50,_105,_0.15)_0px_2px_5px_0px,_rgba(0,_0,_0,_0.05)_0px_1px_1px_0px] mt-4 px-2 h-fit flex  flex-col">
          <div
            className=" p-4 flex-grow"
            {...provided.droppableProps}
            ref={provided.innerRef}
          >
            <div className='flex items-center flex-row justify-between'>
            <h2 className="m-0 capitalize font-medium text-lg p-4">{id}</h2>
            <p className='p-2 bg-[#d8e9fa] rounded-2xl'>{list?.length}</p>
            </div>
            {list.map((text, index) => (
              <Task key={text} text={text} index={index} />
            ))}
            {provided.placeholder}
            <div className="mt-4">
            <input
              type="text"
              value={newTaskText}
              onChange={(e) => setNewTaskText(e.target.value)}
              placeholder="Card Name"
              className="p-1 w-full border rounded"
            />
            <div className='flex items-center mt-2 flex-row'>
              <GoPlus/>
              <button onClick={handleAddTask} className="p-2 text-black  rounded">
              Add Another Card
            </button>
            </div>
            
          </div>
          </div>
        </div>
      )}
    </Droppable>
  );
}

export default TaskList;
