import React from 'react'

export default function DeleteModal({ 
  type, title, onDeleteBtnClick, setIsDeleteModalOpen
}) {
  return (
   // Modal Container
    <div
     className='fixed right-0 left-0 top-0 bottom-0 px-2 py-4
      scrollbar-hide z-50 justify-center overflow-scroll
      items-center flex bg-[#00000080]'
     onClick={(e) => {
      if(e.target !== e.currentTarget){
        return 
      }
      setIsDeleteModalOpen(false)
     }}
    >
      {/* Delete Modal */}
      <div
        className=' scrollbar-hide overflow-scroll max-h-[95vh] my-auto
         w-full bg-white dark:bg-[#2b2c37] text-black dark:text-white
         px-8 py-8 rounded-xl max-w-md'
      >
        <h3
         className='font-bold text-red-500 text-xl'
        > 
          Delete this {type} ?
        </h3>

        { type === 'task' ? (
          <div
            className='text-gray-500 font-semibold tracking-wide text-sm
             pt-6 '
          >
            Are you sure you want to delete the {title}
            task and its subtasks? 
            This action cannot be reversed.
          </div>
        ) : (
          <div
           className='text-gray-500 font-semibold tracking-wide text-sm 
            pt-6'
          >
            Are you sure you want to delete the {title} board?
            This action will remove all columns and tasks and cannot
            be reversed.
          </div>
        )}

        <div
         onClick={onDeleteBtnClick}
         className='flex w-full items-center justify-center 
          space-x-4 mt-4'
        >
          <button
           className='w-full items-center text-white bg-red-500
            hover:opacity-75 py-2 rounded-full font-semibold'
          >
            Delete
          </button>
          <button
           onClick={() => setIsDeleteModalOpen(false)}
           className='w-full items-center text-[#635fc7] py-2
            hover:opacity-75 font-semibold bg-[#635fc71a] 
            rounded-full'
          >
            Cancel
          </button>
        </div>

      </div>
    </div>
  )
}
