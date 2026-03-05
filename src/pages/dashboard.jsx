import React, { useContext, useEffect, useState } from 'react'
import cn from '../utils/cn';
import Loader from '../components/Loader';
import DashboardLayout from '../layout/DashboardLayout';
import { useGetAnylaticsQuery } from '../services/anylatics';
import Card from '../components/Card';
import CardContiner from '../components/CardContiner';
import RecentDocument from '../components/RecentDocument';

const Dashboard = () => { 

 

  return (
    <DashboardLayout>
      {/* <div> */}
        <CardContiner/>
        <RecentDocument/>
      {/* </div> */}
    </DashboardLayout>
  )
}

export default Dashboard