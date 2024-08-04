"use client";

import { useTableContext } from "@/context/tableStore";
import { TableColumnDataType } from "./table.types";

// - Styles
import variables from "@/styles/variables.module.scss";

interface ComponentProps {
  useInlineFlex: boolean
  columns: TableColumnDataType[]
  hideCheckbox: boolean
  hideActions: boolean
}

export default function TableRowComponent({
  useInlineFlex,
  columns,
  hideCheckbox,
  hideActions
}: ComponentProps) {

  const { allCheckboxes, changeAllStatuses } = useTableContext();

  const handleOnChangeCheckbox = () => {
    changeAllStatuses();
  };

  return (
    <div className={`table-row table-header justify-between ${useInlineFlex ? 'inline-flex' : 'row'}`}>
      {!hideCheckbox && (
        <div className="row row-center table-cell" style={{ width: 80 }}>
          <input
            id={`checkbox-input-all`}
            name={`checkbox-input-all`}
            type="checkbox"
            style={{ width: 18, height: 18 }}
            onChange={handleOnChangeCheckbox}
            checked={allCheckboxes}
            />
        </div>
      )}
      {columns.map((column, index) => (
        <div key={index} className="row table-cell" style={{ width: column.width }}>
          <span className="font-size-20" style={{ color: variables.colorPrimary, fontWeight: 'bold' }}>
            {column.title}
          </span>
        </div>
      ))}
      {!hideActions && (
        <div className="row row-center table-cell font-size-20">
          <span style={{ color: variables.colorPrimary, width: 160, fontWeight: 'bold' }}>Actions</span>
        </div>
      )}
    </div>
  );
}