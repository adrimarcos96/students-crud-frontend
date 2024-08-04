"use client";

import { useEffect, useState } from "react";
import { useTableContext, CheckboxStatusType } from "@/context/tableStore";
import { TableColumnDataType, TableRowDataType } from "./table.types";

// - Components
import TableRowComponent from "./tableRowComponent";
import TableHeaderComponent from "./tableHeaderComponent";

// - Styles
import './tableComponent.scss';

export interface ComponentProps {
  columns: TableColumnDataType[]
  data: TableRowDataType[]
  hideCheckboxs?: boolean
  hideActions?: boolean
}

export default function TableComponent({columns, data, hideCheckboxs, hideActions }: ComponentProps) {
  const { allCheckboxes, checkboxStatuses, setCheckboxStatuses, setAllCheckboxes } = useTableContext();
  const [tableWidth, setTableWidth] = useState<number>(240) ;
  const [viewportWidth, setViewportWidth] = useState<number>(0);

  const useInlineFlex = viewportWidth <= tableWidth;

  useEffect(() => {
    setViewportWidth(document.body.getBoundingClientRect().width);
    updateTableWidth();

    addEventListener('resize', handleResizeScreen);

    return () => {
      removeEventListener('resize', handleResizeScreen);
    };
  }, []);

  useEffect(() => {
    const defaultCheckboxStatuses: CheckboxStatusType = {};
    data.forEach(item => {
      defaultCheckboxStatuses[item.id] = false;
    });

    setAllCheckboxes(false);
    setCheckboxStatuses(defaultCheckboxStatuses);
  }, [data]);

  const handleResizeScreen = () => {
    setViewportWidth(document.body.getBoundingClientRect().width);
  };

  const updateTableWidth = () => {
    let newTableWidth = tableWidth;
    columns.forEach(column => {
      newTableWidth += column.width;
    });
    setTableWidth(newTableWidth);
  };

  const handleClickOnEditRow = (id: string) => {
    console.log(`Editing row with ${id} ...`);
  };

  const handleClickOnDeleteRow = (id: string) => {
    console.log(`Deleting row with ${id} ...`);
  };

  return (
    <div className="table-container">
      {/* Table header */}
      <TableHeaderComponent
        columns={columns}
        useInlineFlex={useInlineFlex}
        hideCheckbox={!!hideCheckboxs}
        hideActions={!!hideActions}
      />

      {/* Table body */}
      {data.length === 0
        ? (<div className="width-100 table-row row-center" style={{ display: useInlineFlex ? 'inline-flex' : 'flex' }}>
            <p>No data</p>
          </div>)
        : (<div>
          {data.map((rowData) => typeof checkboxStatuses[rowData.id] !== "undefined" &&
            <TableRowComponent
              key={rowData.id}
              rowData={rowData}
              columns={columns}
              useInlineFlex={useInlineFlex}
              defaultCheckboxStatus={false}
              hideActions={false}
              hideCheckbox={false}
              handleClickOnEdit={handleClickOnEditRow}
              handleClickOnDelete={handleClickOnDeleteRow}
            />
          )}
        </div>)
      }

    </div>
  );
}
