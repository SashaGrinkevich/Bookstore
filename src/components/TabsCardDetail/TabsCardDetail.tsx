import React, { useState } from "react";
import styles from "./TabsCardDetail.module.css";
import Tabs, { Tab } from "../Tabs/Tabs";
import Typography from "../Typography/Typography";
import { Book } from "../../api/Books/getBook";
import { useSelector } from "react-redux";
import { getSlice } from "../../store/books/bookscards.selectors";



interface TabsDetailProps {
  book: Book;
}

const tabs: Tab[] = [
    {
      label: "Description",
      value: "description",
    },
    { label: "Authors", value: "authors" },
    { label: "Reviews", value: "reviews" },
  ];

const TabsCardDetail: React.FC<TabsDetailProps> = ({ book }) => {
  const [activeTab, setActiveTab] = useState(tabs[0].value);

  const handleChangeTab = (tab: Tab) => {setActiveTab(tab.value);};

  return (
    <div>
       <Tabs
              className={styles.tabs}
              activeTab={activeTab}
              tabs={tabs}
              onTabClick={handleChangeTab}
            />
            {activeTab === "description" && (
              <Typography variant="p" children={book.desc} />
            )}
            {activeTab === "authors" && (
              <Typography variant="p" children={book.authors} />
            )}
            {activeTab === "reviews" && (
              <Typography variant="p" children={book.subtitle} />
            )}
      
    </div>
  );
};

export default TabsCardDetail;