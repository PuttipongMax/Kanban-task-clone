import React from 'react';
import logo from '../assets/logo-mobile.svg';
import iconDown from '../assets/icon-chevron-down.svg';
import iconUp from '../assets/icon-chevron-up.svg';
import ellipsis from '../assets/icon-vertical-ellipsis.svg';
import HeaderDropdown from './HeaderDropdown';
import AddEditBoardModal from '../modals/AddEditBoardModal';
import { useDispatch, useSelector } from 'react-redux';
import AddEditTaskModal from '../modals/AddEditTaskModal';
import ElipsIsMenu from './ElipsIsMenu';
import DeleteModal from '../modals/DeleteModal';
import boardsSlice from '../redux/boardsSlice';

export default function Header({ boardModalOpen, setBoardModalOpen }){
 const dispatch = useDispatch();
 const [ openDropdown, setOpenDropdown ] = React.useState(false);
 const [ openAddEditTask, setOpenAddEditTask ] = React.useState(false);
 const [ boardType, setBoardType ] = React.useState("add");
 const [ isElipsIsOpen, setIsElipsIsOpen ] = React.useState(false);
 const [ isDeleteModalOpen, setIsDeleteModalOpen ] = React.useState(false);

 const boards = useSelector((state) => state.boards);
 const board = boards.find((board) => board.isActive);

 const setOpenEditModal = () => {
  setBoardModalOpen(true);
  setIsElipsIsOpen(false);
 }

 const setOpenDeleteModal = () => {
  setIsDeleteModalOpen(true);
  setIsElipsIsOpen(false);
 }

 const onDeleteBtnClick = () => {
  dispatch( boardsSlice.actions.deleteBoard())
  dispatch(boardsSlice.actions.setBoardActive({ index : 0 }))
  setIsDeleteModalOpen(false)
 }

 const onDropdownClick = () => {
  setOpenDropdown( state => !state)
  setIsElipsIsOpen(false);
  setBoardType('add')
 }

 return (
  <div className='p-4 fixed left-0 bg-white dark:bg-[#2b2c37] z-50 right-0'>
   <header className='flex justify-between dark:text-white items-center'>
    {/* Left side */}
    <div className='flex items-center space-x-2 md:space-x-4'>
     <img src={logo} alt="logo" className='h-6 w-6' />
     <h3 className='hidden md:inline-block font-bold font-sans
      md:text-4xl'>
      Kanban
     </h3>
     <div className='flex items-center'>
      <h3 className='truncate max-w-[200px] md:text-2xl text-xl font-bold
       md:ml-20 font-sans'>
       {board.name}
      </h3>
      <img src={openDropdown ? iconUp : iconDown} alt="dropdown icon" 
       className='w-3 ml-2 md:hidden cursor-pointer'
       onClick={onDropdownClick}
      />
     </div>
    </div>
    {/* Right side */}
    <div className='flex space-x-4 items-center md:space-x-6'>
     <button 
      onClick={
       () => {
        setOpenAddEditTask(state => !state) 
       }
      }
      className=' button hidden md:block'>
      + Add New Task
     </button>
     <button 
      onClick={
       () => {
        setOpenAddEditTask(state => !state)
       }
      }
      className='button py-1 px-3 md:hidden'
     >
      +
     </button>
     <img src={ellipsis} alt="ellipsis" 
      onClick={() => {
       setBoardType('edit')
       setOpenDropdown(false)
       setIsElipsIsOpen(state => !state)
      }}
      className='cursor-pointer h-6' 
     />

      {
       isElipsIsOpen && <ElipsIsMenu
        type='Boards' 
        setOpenDeleteModal={setOpenDeleteModal}
        setOpenEditModal={setOpenEditModal}
       />
      }

    </div>

   </header>

   {openDropdown && <HeaderDropdown 
    setOpenDropdown={setOpenDropdown} 
    setBoardModalOpen={setBoardModalOpen}
    />}

   {
    boardModalOpen && <AddEditBoardModal
     type={boardType}
     setBoardModalOpen={setBoardModalOpen}
    />
   }

   {
    openAddEditTask && <AddEditTaskModal 
     device='mobile' 
     setOpenAddEditTask={setOpenAddEditTask}
     type='add'
    />
   }

   {
    isDeleteModalOpen && <DeleteModal 
      type='board'
      title={<p className='text-red-500 inline'>{board.name}</p>} 
      setIsDeleteModalOpen={setIsDeleteModalOpen} 
      onDeleteBtnClick={onDeleteBtnClick}
    />
   }

  </div>
 )
}