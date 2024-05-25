import React from 'react'
import AddEditBoardModal from '../modals/AddEditBoardModal'

export default function EmptyBoard({ type}) {
 const [isBoardModalOpen, setIsBoardModalOpen] = React.useState(false)


  return (
    <div
     className='bg-white dark:bg-[#2b2c37] h-screen w-screen
      flex flex-col items-center justify-center'
    >
     <h3
      className='font-bold text-gray-500'     
     >
      {
       type === 'edit' 
       ? 'This board is empty . create a new column to get started' 
       : 'There are no boards available. Create a new board to get started.'
      }
     </h3>
     <button
      onClick={() => {
       setIsBoardModalOpen(true)
      }}
      className='w-full items-center max-w-xs hover:opacity-70
       font-bold dark:text-white dark:bg-[#635fc7] relative
       mt-8 text-white bg-[#635fc7] py-2 rounded-full'
     >
      { type === 'edit' ? "+ Add New Column" : "+ Add New Board"}
     </button>

     {
      isBoardModalOpen && (
       <AddEditBoardModal 
        type={type}
        setBoardModalOpen={setIsBoardModalOpen}
       />
      )
     }

    </div>
  )
}
