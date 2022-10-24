import React from 'react'

const AdCard = ({ adItem }) => {
  return (
    <div className='card_container border border-primary h-100 shadow'>
      <div className='col-md-12'>
        <img src={adItem?.imageUrl} alt="image" crossOrigin="" className='w-100 h-50'/>
        <div className='adHeader p-3'>
          <h4> {adItem?.headline} </h4>
          <p> {adItem?.primaryText} </p>
        </div>
          <div className='adDescription py-2'>
            <p> {adItem?.description} </p> 
          </div>
        <div className='adFooter py-3'>
          <p className='fs-5'> {adItem?.companyDetails[0]?.name || adItem?.companyDetails?.name} </p>
        </div>
        <button 
          type={'button'} 
          className='adCTABtn py-2 px-5 my-2 bg-primary text-white border-0'
        > {adItem?.CTA} </button>
      </div>
    </div>
  )
}

export default AdCard