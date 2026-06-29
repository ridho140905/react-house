import React, { Suspense } from 'react';
import { Outlet } from 'react-router-dom';
import Navigation from '../components/Navigation';
import Loading from '../components/Loading';

const MemberLayout = () => {
  return (
    <div className="flex flex-col min-h-screen bg-[#F8F9FA] font-['Cairo']">
      <Navigation />
      <main className="flex-1 w-full overflow-y-auto">
        <Suspense fallback={<Loading />}>
          <Outlet />
        </Suspense>
      </main>
    </div>
  );
};

export default MemberLayout;
