import React from 'react'
import UserHeader from '../components/User/UserHeader'
import Banner from '../components/User/Banner'
import UserFooter from '../components/User/UserFooter'
import SectionLandPage from '../components/User/SectionLandPage'

function LandPage() {
  


  return (
    <div>
      <section className=''>
        <UserHeader />
        <Banner />
        <SectionLandPage/>
        <UserFooter/>
      </section>


    </div>
  )
}

export default LandPage