import React from 'react';
import { useCallback } from 'react';
import { useState } from 'react';
import { Draggable } from 'react-beautiful-dnd';
import Model from '../model/Model';
import CheckList from '../model/checklist/CheckList';


const Task = ({ text, index }) => {
  const [open,setOpen]=useState(false)
 const handleClick=useCallback(()=>{
   setOpen(true)
  },[open])
  const handleOpen=(data)=>{
    setOpen(data)
   }
  return (
    <div>
    <Draggable draggableId={text?.name} index={index}>
      {(provided) => (
        <div 
         onClick={handleClick}
          className="bg-white rounded p-2 transition-all duration-800 ease-out mt-4 hover:bg-white"
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
        >
          <p className='text-left text-[16px] ml-2 font-medium'>{text?.name}</p>
        </div>
      )}
    </Draggable>
    {
      open&&(
        <Model  width={700} height={600} open={open}>
         <CheckList name={text?.name} id={text?._id} handleOpen={handleOpen}/>
        </Model>
      )
    }
    </div>
  );
}

export default Task;
