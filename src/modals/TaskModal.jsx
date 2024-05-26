import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import ellipsis from '../assets/icon-vertical-ellipsis.svg'
import ElipsIsMenu from '../components/ElipsIsMenu';
import Subtask from '../components/Subtask';
import boardsSlice from '../redux/boardsSlice';
import DeleteModal from './DeleteModal'
import AddEditTaskModal from './AddEditTaskModal';

export default function TaskModal({ 
  colIndex, taskIndex, setIsTaskModalOpen 
}) {
  const dispatch = useDispatch();
  const boards = useSelector((state) => state.boards);
  const board = boards.find((board) => board.isActive);
  const columns = board.columns
  const col = columns.find((column, i)=> colIndex === i)
  const task = col.tasks.find((col, i) => taskIndex === i)
  const subtasks = task.subtasks
  
  let completed = 0
  subtasks.forEach((subtask) => {
    if(subtask.isCompleted){
      completed++
    }
  });

  const [status, setStatus] = React.useState(task.status);
  const [newColIndex, setNewColIndex] = React.useState(columns.indexOf(col))
  const [ellipsisMenuOpen, setEllipsisMenuOpen] = React.useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = React.useState(false)
  const [isAddTaskModalOpen, setIsAddTaskModalOpen] = React.useState(false)

  const setOpenEditModal = () => {
    setIsAddTaskModalOpen(true)
    setEllipsisMenuOpen(false)
  }

  const setOpenDeleteModal = () => {
    setEllipsisMenuOpen(false)
    setIsDeleteModalOpen(true)
  }

  const onClose = (e) => {
    if(e.target !== e.currentTarget){return }
    dispatch(
      boardsSlice.actions.setTaskStatus({
        taskIndex, colIndex, newColIndex, status
      })
    )
    setIsTaskModalOpen(false)
  }

  const onChange = (e) => {
    setStatus(e.target.value)
    setNewColIndex(e.target.selectedIndex)
  }

  const onDeleteBtnClick = () => {
    dispatch(boardsSlice.actions.deleteTask({taskIndex, colIndex}))
    setIsTaskModalOpen(false)
    setIsDeleteModalOpen(false)
  }

  return (
    <div
     onClick={onClose}
     className='fixed right-0 left-0 top-0 px-2 py-4 overflow-scroll 
      scrollbar-hide z-50 bottom-0 bg-[#00000080]
      justify-center items-center flex'
    >
      {/* Modal Section */}
      <div
       className='scrollbar-hide overflow-y-scroll max-h-[95vh] my-auto
        bg-white dark:bg-[#2b2c37] text-black dark:text-white
        font-bold shadow-md shadow-[#364e7e1a] max-w-md mx-auto
        w-full px-8 py-8 rounded-xl '
      >
        <div
         className='relative flex justify-between w-full 
          items-center'
        >
          <h1
           className='text-lg'
          >
           {task.title}
          </h1>
          <img 
            src={ellipsis}
            className='cursor-pointer h-6 '
            onClick={() => {
              setEllipsisMenuOpen(state => !state)
            }}
          />

          {
            ellipsisMenuOpen && <ElipsIsMenu 
               setOpenEditModal={setOpenEditModal}
               setOpenDeleteModal={setOpenDeleteModal}
               type="Task"
              />
          }

        </div>
        <p
         className='text-sm text-gray-500 font-semibold tracking-wide  
          pt-6'
        >
          {task.description}
        </p>
        <p
         className='pt-6 text-gray-500 tracking-widest text-sm'
        >
          Subtasks ({completed}) of ({subtasks.length})
        </p>

        {/* Subtasks Section 03:55:59 */}
        <div
         className='mt-3 space-y-2'
        >
          {
            subtasks.map((subtask, i) => {
              return (
                <Subtask 
                 index={i}
                 taskIndex={taskIndex}
                 colIndex={colIndex}
                 key={i}
                />
              )
            })
          }
        </div>

        {/* Current Status Section */}
        <div
         className='mt-8 flex flex-col space-y-3 '
        >
          <label
           className='text-sm dark:text-white text-gray-500'
          >
            Current Status
          </label>
          <select
           className='select-status flex-grow px-4 py-2 rounded-md
            text-sm bg-transparent focus:border-0 border border-gray-300
            focus:outline-[#635fc7] outline-none'
            value={status}
            onChange={onChange}
          >
            {
              columns.map((column, index) => (
                <option
                 key={index}
                 className='status-option'
                >
                  {column.name}
                </option>
              ))
            }
          </select>

        </div>

      </div>
      {
        isDeleteModalOpen && (
          <DeleteModal
           onDeleteBtnClick={onDeleteBtnClick}
           setIsDeleteModalOpen={setIsDeleteModalOpen}
           type="task"
           title={task.title}
          />
        )
      }

      {
        isAddTaskModalOpen && (
          <AddEditTaskModal 
            setOpenAddEditTask={setIsAddTaskModalOpen}
            type="edit"
            taskIndex={taskIndex}
            prevColIndex={colIndex}
            setIsTaskModalOpen={setIsTaskModalOpen}
          />
        )
      }

    </div>
  )
}
