import React from 'react'
import Header from './Header'
import DashboardHeading from './DashboardHeading'

const Dashboard = () => {
  return (
    <>
    
    <Header isLogin={false}/>
    <div className="mt-5">
        <DashboardHeading/>
    </div>
    </>
  )
}

export default Dashboard