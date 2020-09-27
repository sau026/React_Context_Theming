import React from "react";
import Header from "../../components/header";
import Table from "../../components/data-table";
import "./index.scss";

const Dashboard = () => {
  const getAppHeaderJSX = () => {
     /*
     * returning header JSX.
     */
    return (
      <>
        <Header headerTitle={"Task List"} />
      </>
    );
  };

  const getTableJSX = () => {
     /*
     * returning table JSX.
     */
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
