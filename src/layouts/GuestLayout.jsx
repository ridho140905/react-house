import React, { Suspense } from 'react';
import { Outlet } from 'react-router-dom';
import GuestNavigation from '../components/Guest/GuestNavigation';
import Loading from '../components/Loading';

const GuestLayout = () => {
  return (
    <div className="flex flex-col min-h-screen bg-[#F8F9FA] font-['Cairo']">
      <GuestNavigation />
      <main className="flex-1 w-full flex flex-col">
        <Suspense fallback={<Loading />}>
          <Outlet />
        </Suspense>
      </main>
    </div>
  );
};

export default GuestLayout;
