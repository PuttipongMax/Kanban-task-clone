import React from 'react'
import { v4 as uuidv4 } from 'uuid'
import crossIcon from '../assets/icon-cross.svg'
import { useDispatch, useSelector } from 'react-redux';
import boardsSlice from '../redux/boardsSlice';

export default function AddEditTaskModal({ 
 type, device, setOpenAddEditTask, taskIndex, 
 prevColIndex = 0, setIsTaskModalOpen
}) {
 const dispatch = useDispatch();
 const [title, setTitle] = React.useState('');
 const [description, setDescription] = React.useState('');
 const [isValid, setIsValid] = React.useState(true);

 const board = useSelector((state) => state.boards).find((board) => board.isActive);

 const columns = board.columns;
 const col = columns.find((col, index) => index === prevColIndex)
 const [status, setStatus] = React.useState(columns[prevColIndex].name)
 const [newColIndex, setNewColIndex] = React.useState(prevColIndex)
 const [subtasks, setSubtasks] = React.useState(
  [
   { title: '', isCompleted : false, id: uuidv4() },
   { title: '', isCompleted : false, id: uuidv4() }
  ]
 )
 const [isFirstLoad, setIsFirstLoad] = React.useState(true)
 const task = col ? col.tasks.find(( task, index ) => index === taskIndex) : []

 if( type === 'edit' && isFirstLoad){
  setSubtasks(
    task.subtasks.map((subtask) => {
      return { ...subtask, id: uuidv4() }
    })
  )
  setTitle(task.title)
  setDescription(task.description)
  setIsFirstLoad(false)
 }

 const onChange = (id, newValue) => {
  setSubtasks((pervState) => {
   const newState = [...pervState]
   const subtask = newState.find((subtask) => subtask.id === id)
   subtask.title = newValue
   return newState;
  })
 }

 const onChangeStatus = (e) => {
  setStatus(e.target.value)
  setNewColIndex(e.target.selectedIndex)
 }

 const onDelete = (id) => {
  setSubtasks((perState) => perState.filter((el) => el.id !== id))
 }

 const validate = () => {
  setIsValid(false);
  if(!title.trim()){
    return false;
  }
  for(let i=0; i<subtasks.length; i++){
    if(!subtasks[i].title.trim()){
      return false
    }
  }
  setIsValid(true);
  return true;
 }

 const onSubmit = (type) => {
  if(type === 'add'){
   dispatch(boardsSlice.actions.addTask({
    title,
    description,
    subtasks,
    status,
    newColIndex
   }))
  } else{
   dispatch(
    boardsSlice.actions.editTask({
     title,
     description,
     subtasks,
     status,
     taskIndex,
     prevColIndex,
     newColIndex
    })
   )
  }
 }
 
 return (
    <div
     onClick={(e) => {
      if(e.target !== e.currentTarget){
       return;
      }
      setOpenAddEditTask(false);
     }}
     className={
      device === 'mobile' 
       ? `py-6 px-6 pb-40 absolute overflow-y-scroll left-0 flex right-0
          bottom-[-100vh] top-0 bg-[#00000080] 
         `
       : `py-5 px-6 pb-40 absolute overflow-y-scroll left-0 flex right-0
          bottom-0 top-0 bg-[#00000080]`
     }
    >
     {/* Modal Section */}
     <div
      className='scrollbar-hide  bg-white dark:bg-[#2b2c37] text-black
       max-h-[95vh] my-auto overflow-y-scroll dark:text-white font-bold
       shadow-md shadow-[#364e7e1a] max-w-md mx-auto w-full px-8 py-8
       rounded-xl'
     >
      <h3
       className='text-lg'
      >
       {type === 'edit' ? 'Edit' : 'Add New'} Task
      </h3>

      {/* task Name */}
      <div
       className='mt-8 flex flex-col space-y-1'
      >
       <label
        className='text-sm dark:text-white text-gray-500'
       >
        Task Name
       </label>
       <input 
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className={`bg-transparent px-4 py-2 focus:outline-[#635fc7] 
         focus:border-0 rounded-md border border-gray-600 outline-none 
         text-sm
        `}
        type="text"
        placeholder='e.g Take coffee break'
       />
      </div>

      {/* Description */}
      <div
       className='mt-8 flex flex-col space-y-1'
      >
       <label
        className='text-sm dark:text-white text-gray-500'
       >
        Description
       </label>
       <textarea
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        className={`bg-transparent px-4 py-2 focus:outline-[#635fc7] 
         focus:border-0 rounded-md border border-gray-600 outline-none 
         text-sm min-h-[200px] justify-start ring-0 
        `}
        type="text"
        placeholder="e.g It's always good to take a break. This is minute break will recharge the batteries a little."
        
       />
      </div>

      {/* Subtasks Section */}
      <div
       className='mt-8 flex flex-col space-y-1'
      >
       <label
        className='text-sm dark:text-white text-gray-500'
       >
        Subtasks
       </label>   

       {
        subtasks.map((subtasks, index) => (        
         <div
          key={index}
          className={`flex items-center w-full`}
         >
          <input 
           onChange={(e) => {
            onChange(subtasks.id, e.target.value)
           }}
           type='text'
           value={subtasks.title}
           className={`bg-transparent outline-none focus:border-0 
            text-sm border-gray-600 focus:outline-[#635fc7]
            px-4 py-2 rounded-md flex-grow border
           `} 
           placeholder=' e.g Task coffee break'
          />
          <img
           onClick={() => {
            onDelete(subtasks.id)
           }} 
           src={crossIcon} 
           className='m-4 cursor-pointer'
          />
         </div>
        ))     
       }

       <button
        onClick={() => {
         setSubtasks((state) => [
          ...state,
          { title: '', isCompleted : false, id: uuidv4() }
         ])
        }}
        className='w-full items-center dark:text-[#635fc7] text-white
         py-2 dark:bg-white bg-[#635fc7] rounded-full
        '
       >
        + Add New Subtask
       </button>

      </div>

      {/* Current Status Section */}
      <div
       className='mt-0 flex flex-col space-y-3'
      >
       <label className='text-sm dark:text-white text-gray-500'>
        Current status
       </label>
       <select
        value={status}
        onChange={(e) => onChangeStatus(e)}
        className='select-status flex flex-grow px-4 py-2 border-gray-300
        rounded-md text-sm bg-transparent focus:outline-[#635fc7]
        focus:border-0 border outline-none'
       >
        { columns.map((column, index) => (
          <option
           value={column.name}
           key={index}
           className='dark:bg-[#2b2c37]'
          >
           {column.name}
          </option>
         )) 
        }
       </select>

       <button
        onClick={() => {
         const isValid = validate()
         if(isValid){
          onSubmit(type)
          setOpenAddEditTask(false)
         }
        }}
        className='w-full items-center text-white bg-[#635fc7]
         py-2 rounded-full'
       >
        {type === 'edit' ? 'Save Edit' : 'Create Task'}
       </button>

      </div>

     </div>
    </div>
  )
}
