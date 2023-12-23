import React from 'react'
import { RxCross2 } from "react-icons/rx";
import { RiAttachment2 } from "react-icons/ri";
import { CiCircleCheck } from "react-icons/ci";
import { useState } from 'react';
import { FaRegFileLines } from "react-icons/fa6";
import { toast } from 'react-toastify';
import useFetch from '../../view/useData';
import { HiOutlineDotsVertical } from "react-icons/hi";
import { useEffect } from 'react';
import { CiCirclePlus } from "react-icons/ci";
import Loader from './Loader';

const CheckList = ({handleOpen,id,name}) => {
  const {data,loading}=useFetch(`card/getCard/${id}`)
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [cardList, setCardList] = useState([{ title: 'Checklist Block 1', tasks: [], newTask: '' }]);
  const handleFileChange = (event) => {
    const files = event.target.files;
    const currentTime = new Date();
    const filesWithTimestamp = Array.from(files).map((file) => ({
      file,
      timestamp: currentTime,
    }));
    setSelectedFiles([...selectedFiles, ...filesWithTimestamp]);
  };

  const handleCardList=()=>{
    const newCard = { title: `Checklist Block${cardList?.length + 1}`, tasks: [], newTask: '' };
    setCardList([...cardList, newCard]);
  }
  const handleClose=()=>{
    handleOpen(false)
  }
  
  const handleTaskInputChange = (event, cardIndex) => {
    const updatedCardList = [...cardList];
    updatedCardList[cardIndex].newTask = event.target.value;
    setCardList(updatedCardList);
  };

  const handleAddTask = (cardIndex) => {
    const updatedCardList = [...cardList];
    updatedCardList[cardIndex].tasks.push({ name: updatedCardList[cardIndex].newTask, completed: false });
    updatedCardList[cardIndex].newTask = ''; 
    setCardList(updatedCardList);
  };

  const handleSave=()=>{
    const apiUrl="https://task-management-wqn5.onrender.com/card/createCard"
    const formData = new FormData();
    const completedTasks = cardList.map(card => ({
      checklist: card.tasks.filter(task => task.completed === true).map(item=>({name:item.name}))
    }));
    formData.append("taskId",id);
    formData.append("checkList",JSON.stringify(completedTasks))
    selectedFiles.forEach((file) => {
      formData.append("file", file.file);
      formData.append("time", file.timestamp);
    });
    
    fetch(apiUrl, {
      method: "POST",
      body:formData
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
      })
      .catch(error => {
        toast.error(error)
      });

  }
  useEffect(() => {

    if (data?.length>0) {
      setCardList(data)
    }
  }, [data]);
  return (
    <div className='pb-10'>
      {
        loading?
        <div className=' flex items-center justify-center h-screen'>
          <Loader size={35}/>
        </div>:
<div className='relative'>
      <div className='absolute top-5 -right-5'>
      <div className='flex w-10 py-5 bg-[#F1F5F9] rounded-lg items-center flex-col'>
      <RxCross2 onClick={handleClose} size={25} className="my-1 cursor-pointer" />
      <label htmlFor="file-input">
        <RiAttachment2 size={25} className="my-1 cursor-pointer" />
      </label>
      <input
        id="file-input"
        type="file"
        multiple
        style={{ display: 'none' }}
        onChange={handleFileChange}
      />
      <CiCircleCheck onClick={handleCardList} size={25} className="my-1 cursor-pointer" />
    </div>
      </div>
      <div className='w-[90%]'>
      <div className=''>
       <div>
        <label className='text-lg font-serif font-medium'>Title</label>
        <p className='p-1 border rounded-md'>
        {name}
        </p>
       </div>
     </div>
      <div className=' mt-5 flex border-b  items-center flex-row'>
     <RiAttachment2/>
     <label className='text-lg font-serif ml-3 font-medium'>Attachment</label>
     </div>
     <div className='flex p-2 items-center flex-row flex-wrap'>
     {
      selectedFiles.map((item,index)=>(
       <div className='flex items-center cursor-pointer m-3 flex-row'>
        <FaRegFileLines size={26} />
        <p className='ml-3 w-28 overflow-hidden whitespace-nowrap overflow-ellipsis'>{item?.file?.name}</p>
       </div>
      ))
     }
     </div>

     <div className='mt-5'>
     {cardList?.map((card, cardIndex) => (
          <div key={cardIndex}>
            <div className='flex items-center flex-row justify-between'>
            <div className='flex items-center flex-row'>
              <CiCircleCheck size={24}/>
              <p className='p-1 mt-2 font-medium'>{card.title}</p>
            </div>
            <HiOutlineDotsVertical/>
            </div>
            <div>
              {card?.tasks.map((task, taskIndex) => (
                <div key={taskIndex} className='flex mt-2 items-center flex-row'>
                  <input
                    type="checkbox"
                    checked={task.completed}
                    className='w-6 h-6'
                    onChange={() => {
                      const updatedCardList = [...cardList];
                      updatedCardList[cardIndex].tasks[taskIndex].completed = !task.completed;
                      setCardList(updatedCardList);
                    }}
                  />
                  <span className='ml-3 text-lg w-full border p-1  rounded-md '>{task.name}</span>
                </div>
              ))}
            </div>

            <div>
              <input
                type="text"
                value={card.newTask}
                className='w-full border p-1 mt-2 rounded-md'
                onChange={(event) => handleTaskInputChange(event, cardIndex)}
                placeholder="New task"
              />
              <div className='flex-1 flex flex-row items-center mt-2'>
              <button className='flex-[0.95] p-1 border rounded-md text-left' onClick={() => handleAddTask(cardIndex)}>Create New Item</button>
              <CiCirclePlus className="flex-[0.05] cursor-pointer" size={24}/>

              </div>
            </div>
          </div>
        ))}
      </div>
        <button onClick={handleSave} className='px-10 py-2 bg-black items-center  text-white justify-center flex  rounded-md mt-5'>Save the card</button>
      </div>
      
    </div>
      }
    
    </div>
  )
}

export default CheckList