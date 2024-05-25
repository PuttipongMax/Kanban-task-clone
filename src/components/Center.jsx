import React, { useEffect } from 'react'
import SideBar from './SideBar';
import { useSelector } from 'react-redux';
import Column from './Column';

export default function Center({ boardModalOpen, setBoardModalOpen }) {
  const [ windowSize, setWindowSize ] = React.useState(
    [
     window.innerWidth,
     window.innerHeight
    ]
  );
  const [isSideBarOpen, setIsSideBarOpen] = React.useState(true);
  const boards = useSelector((state) => state.boards)
  const board = boards.find((board) => board.isActive === true)
  const columns = board.columns

  React.useEffect(() => {
    const handleWindowResize = () => {
      setWindowSize([window.innerWidth, window.innerHeight])
    }
    window.addEventListener('resize', handleWindowResize)

    return () => {
      window.removeEventListener('resize', handleWindowResize)
    }
  });

  return (
    <div
     className={
      windowSize[0] >= 768 && isSideBarOpen 
      ? `scrollbar-hide bg-[#f4f7fd] h-screen flex dark:bg-[#20212c]
        overflow-x-scroll gap-6 ml-[261px]`
      : `scrollbar-hide bg-[#f4f7fd] h-screen flex dark:bg-[#20212c]
        overflow-x-scroll gap-6`
     }
    >
     {
      windowSize[0] >= 768 && (
        <SideBar 
         
        />
      )
     }

     {/* Columns Section */}
     {
      columns.map((col, index) => (
        <Column key={index} colIndex={index} />
      ))
     }

    </div>
  )
}
