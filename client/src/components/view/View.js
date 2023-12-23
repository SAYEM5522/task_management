import React, { useState } from 'react';
import { DragDropContext } from 'react-beautiful-dnd';
import TaskList from './TaskList';
import useFetch from './useData';
import { toast } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import { useEffect } from 'react';
import Loader from '../model/checklist/Loader';

function View() {
  const {data,loading}=useFetch("task/gettasks")
  const [columns, setColumns] = useState()

  const onDragEnd = ({ source, destination }) => {
    if (destination === undefined || destination === null) return null;

    if (
      source.droppableId === destination.droppableId &&
      destination.index === source.index
    )
      return null;

    // Set start and end variables
    const start = columns[source.droppableId];
    const end = columns[destination.droppableId];
    const itemName = start.list[source.index].name;

    // If start is the same as end, we're in the same column
    if (start === end) {
      // Move the item within the list
      // Start by making a new list without the dragged item
      const newList = start.list.filter(
        (_, idx) => idx !== source.index
      );

      // Then insert the item at the right location
      newList.splice(destination.index, 0, start.list[source.index]);

      // Then create a new copy of the column object
      const newCol = {
        id: start.id,
        list: newList
      };

      // Update the state
      setColumns((state) => ({ ...state, [newCol.id]: newCol }));

      return null;
    } else {
      // If start is different from end, we need to update multiple columns
      // Filter the start list like before
      const newStartList = start.list.filter(
        (_, idx) => idx !== source.index
      );

      // Create a new start column
      const newStartCol = {
        id: start.id,
        list: newStartList
      };

      // Make a new end list array
      const newEndList = end.list;

      // Insert the item into the end list
      newEndList.splice(destination.index, 0, start.list[source.index]);

      // Create a new end column
      const newEndCol = {
        id: end.id,
        list: newEndList
      };

      // Update the state
      setColumns((state) => ({
        ...state,
        [newStartCol.id]: newStartCol,
        [newEndCol.id]: newEndCol
      }));
      updateDatabase(newEndCol.id, itemName);
      return null;
    }
  };
  const addTask = async(columnId, taskText) => {
    const column = columns[columnId];
    const newColumn = {
      ...column,
      list: [...column.list,{name:taskText}],
    };
    const apiUrl = "https://task-management-wqn5.onrender.com/task/createTask";

    fetch(apiUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id: columnId, 
        list: [{name:taskText}],
      }),
    })
      .then(response => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
      })
      .then(data => {
        toast.success("Task added successfully:");
        // Update state or perform any other actions on success
        setColumns((state) => ({
          ...state,
          [columnId]: newColumn,
        }));
      })
      .catch(error => {
        toast.error("Task already in the list")
      });
  };
  useEffect(() => {
    if (data) {
      setColumns(data);
    }
  }, [data]);
  const updateDatabase = (columnId, newList) => {
    const apiUrl = "https://task-management-wqn5.onrender.com/task/updateTask"; 
    console.log(columnId)
    fetch(apiUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id: columnId,
        list: [{name:newList}],
      }),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        console.log(data)
      })
      .catch((error) => {
        console.error("Error updating database:", error);
      });
  };
  return (
    <DragDropContext onDragEnd={onDragEnd}>
      {
        loading?
        <div className=' flex items-center justify-center h-screen'>
          <Loader size={35}/>
        </div>:
        <div className="grid xl:grid-cols-4 lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-6  auto ">
        {Object?.values(columns||{}).map((col) => (
          <TaskList col={col} key={col.id} addTask={addTask} />
        ))}
      </div>
      }
      
    </DragDropContext>
  );
}

export default View;
