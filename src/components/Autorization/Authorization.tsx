import { useState } from "react";
import Tabs, { Tab } from "../Tabs/Tabs";

import styles from "./Authorization.module.css";
import SignIn from "../SignIn/SignIn";
import SignUp from "../SignUp/SignUp";

const tabs: Tab[] = [
  {
    label: "SignIn",
    value: "SignIn",
  },
  {
    label: "SignUp",
    value: "SignUp",
  },
];

const Authorization = () => {
  const [activeTab, setActiveTab] = useState(tabs[0].value);

  const handleChangeTab = (tab: Tab) => setActiveTab(tab.value);

  return (
    <div className={styles.authorization}>
      <Tabs
        className={styles.tabs}
        activeTab={activeTab}
        tabs={tabs}
        onTabClick={handleChangeTab}
      />
      <div className={styles.tabsСontainer}>
        {activeTab === "SignIn" && <SignIn />}
        {activeTab === "SignUp" && <SignUp />}
      </div>
    </div>
  );
};

export default Authorization;
