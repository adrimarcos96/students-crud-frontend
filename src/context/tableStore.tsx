"use client";
import {
  createContext,
  useContext,
  Dispatch,
  SetStateAction,
  useState
} from "react";

export interface CheckboxStatusType {
  [key: string]: boolean
}

interface ContextProps {
  checkboxStatuses: CheckboxStatusType
  allCheckboxes: boolean
  setCheckboxStatuses: Dispatch<SetStateAction<CheckboxStatusType>>
  setAllCheckboxes: Dispatch<SetStateAction<boolean>>
  changeStatus: Function
  changeAllStatuses: Function
}

const TableContext = createContext<ContextProps>({
  checkboxStatuses: {},
  allCheckboxes: false,
  setCheckboxStatuses: (): CheckboxStatusType => ({}),
  setAllCheckboxes: (): boolean => false,
  changeStatus: (): void => {},
  changeAllStatuses: (): void => {}
});

export const TableContextProvider = ({ children }: { children: React.ReactNode }) => {
  const [checkboxStatuses, setCheckboxStatuses] = useState<CheckboxStatusType>({});
  const [allCheckboxes, setAllCheckboxes] = useState<boolean>(false);

  const changeStatus = (key: string) => {
    const newStatuses: CheckboxStatusType = {
      ...checkboxStatuses,
      [key]: !checkboxStatuses[key]
    };

    let areCheckedAll = true;
    Object.keys(newStatuses).forEach(key => {
      if (!newStatuses[key]) {
        areCheckedAll = false;
      }
    });

    setAllCheckboxes(areCheckedAll);
    setCheckboxStatuses(newStatuses);
  };

  const changeAllStatuses = () => {
    const newStatus = !allCheckboxes;
    const newStatuses: CheckboxStatusType = {};
    Object.keys(checkboxStatuses).forEach(key => {
      newStatuses[key] = newStatus;
    });

    setAllCheckboxes(newStatus);
    setCheckboxStatuses(newStatuses);
  };

  return (
    <TableContext.Provider value={{
      checkboxStatuses,
      allCheckboxes,
      setCheckboxStatuses,
      setAllCheckboxes,
      changeStatus,
      changeAllStatuses
    }}>
      {children}
    </TableContext.Provider>
  );
};

export const useTableContext = () => useContext(TableContext);
