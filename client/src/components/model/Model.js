import React from 'react'

const Model = ({open,children,width,height}) => {

  return (
    <div class="relative z-10" aria-labelledby="modal-title" role="dialog" aria-modal="true">
      {
        open&&(
          <div>
  <div class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"></div>

  <div class="fixed inset-0 z-10 ">
    <div  class="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
     
      <div class="relative transform no-scrollbar  overflow-y-auto rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 ">
        <div style={{
          width,
          height
        }} class="bg-white w-full   px-4  pt-5 sm:p-6 sm:pb-4">
          {
            children
          }
        </div>
        
      </div>
    </div>
  </div>
  </div>
        )
      }
 

</div>

  )
}

export default Model