import React from "react";
import Banner from "../../layouts/Banner/Banner";
import MainLayout from "../../layouts/MainLayout/MainLayout";
import SideNavBarLayout from "../../layouts/SideNavBarLayout/SideNavBarLayout";
function HomePage() {
  return (
    <MainLayout>
      <SideNavBarLayout />
      <Banner />
    </MainLayout>
  );
}

export default HomePage;
