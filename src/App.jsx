import React from 'react';
import Header from './components/Header';
import Center from './components/Center';

function App() {
  const [boardModalOpen, setBoardModalOpen] = React.useState(false);

  return (
    <div className='text-xl'>
     
      {/* Header Section */}
      <Header 
       boardModalOpen={boardModalOpen} 
       setBoardModalOpen={setBoardModalOpen} 
      />

      {/* Center Section */}
      <Center />

    </div>
  )
}

export default App
