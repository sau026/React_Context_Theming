import React from "react";
import Header from "../../components/header";
import Table from "../../components/data-table";
import "./index.scss";

const Dashboard = (props) => {
  const getAppHeaderJSX = () => {
    return (
      <>
        <Header headerTitle={"Task List"} />
      </>
    );
  };

  const getTableJSX = () => {
    return (
      <>
        <Table />
      </>
    );
  };

  return (
    <div className="dashboard__page-conatiner -site-text-size">
      <div className="main-body">
        {getAppHeaderJSX()}
        {getTableJSX()}
      </div>
    </div>
  );
};

export default Dashboard;
