"use client";

import variables from "@/styles/variables.module.scss"
import ButtonComponent from "@/components/app/button/buttonComponent";

import './tableComponent.scss'
import { useEffect, useState } from "react";
interface TableColumn {
  title: string
  width: number
  prop: string
}

interface ComponentProps {
  columns: TableColumn[]
  data: any[]
  hideCheckboxs?: boolean
  hideActions?: boolean
}

interface CheckboxesStatus {
  [key: string]: boolean
}

export default function TableComponent({columns, data, hideCheckboxs, hideActions }: ComponentProps) {
  const [tableWidth, setTableWidth] = useState<number>(240) ;
  const [viewportWidth, setViewportWidth] = useState<number>(0);
  const [checkboxesStatus, setCheckboxesStatus] = useState<CheckboxesStatus>({});
  const [allCheckboxes, setAllCheckboxes] = useState<boolean>(false);

  const useInlineFlex = viewportWidth <= tableWidth;

  useEffect(() => {
    setViewportWidth(document.body.getBoundingClientRect().width);
    updateTableWidth();

    addEventListener('resize', handleResizeScreen);

    return () => {
      removeEventListener('resize', handleResizeScreen);
    };
  }, [])

  useEffect(() => {
    const newCheckboxesStatus: CheckboxesStatus = {};
    data.forEach(item => {
      newCheckboxesStatus[item.id] = false;
    });

    setCheckboxesStatus(newCheckboxesStatus);
    setAllCheckboxes(false);
    console.log('HERE')
  }, [data])

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

  const handleCheckboxChange = (id: string) => {
    const newStatuses: CheckboxesStatus = {
      ...checkboxesStatus,
      [id]: !checkboxesStatus[id]
    };

    let areCheckedAll = true;
    Object.keys(newStatuses).forEach(key => {
      if (!newStatuses[key]) {
        areCheckedAll = false;
      }
    });

    setCheckboxesStatus(newStatuses);

    if (areCheckedAll) {
      setAllCheckboxes(true);
    } else {
      setAllCheckboxes(false);
    }
  };

  const handleChangeAllCheckboxes = () => {
    const newStatuses: CheckboxesStatus = {};

    Object.keys(checkboxesStatus).forEach(key => {
      newStatuses[key] = !allCheckboxes
    });

    setCheckboxesStatus(newStatuses);
    setAllCheckboxes(!allCheckboxes);
  };

  return (
    <div className="table-container">
      <div
        className={`table-row table-header justify-between ${useInlineFlex ? 'inline-flex' : 'row'}`}
      >
        {!hideCheckboxs && (
          <div className="row row-center table-cell" style={{ width: 80 }}>
            <input type="checkbox" style={{ width: 18, height: 18 }} onChange={handleChangeAllCheckboxes} checked={allCheckboxes} />
          </div>
        )}
        {columns.map((column, index) => (
          <div key={index} className="row table-cell" style={{ width: column.width }}>
            <span className="font-size-20" style={{ color: variables.colorPrimary, fontWeight: 'bold' }}>{column.title}</span>
          </div>
        ))}
        {!hideActions && <div className="row row-center table-cell font-size-20"><span style={{ color: variables.colorPrimary, width: 160, fontWeight: 'bold' }}>Actions</span></div>}
      </div>

      {data.length === 0
        ? (<div className="width-100 table-row row-center" style={{ display: useInlineFlex ? 'inline-flex' : 'flex' }}>
            <p>No data</p>
          </div>)
        : (<div>
          {data.map((item, rowIndex) => (
            <div key={item.id} className="table-row justify-between" style={{ display: useInlineFlex ? 'inline-flex' : 'flex' }}>
              {!hideCheckboxs && (
                <div className="row row-center table-cell" style={{ width: 80 }}>
                  <input
                    type="checkbox"
                    style={{ width: 18, height: 18 }}
                    onChange={() => handleCheckboxChange(item.id)}
                    checked={checkboxesStatus[item.id]}
                  />
                </div>
              )}

              {columns.map((column, columnIndex) => (
                <div key={columnIndex} style={{ width: column.width }} className="table-cell row flex-wrap text-ellipsis">
                  <p>{item[column.prop]}</p>
                </div>
              ))}

              {!hideActions && <div className="row row-center-vertical table-cell" style={{ width: 160 }}>
                <ButtonComponent text="Icon" backgroundColor={variables.colorError} textColor={variables.colorWhite} onClick={() => {}} />
                <ButtonComponent text="icon" backgroundColor={variables.colorWarn} textColor={variables.colorWhite} onClick={() => {}} />
              </div>}
            </div>
          ))}
        </div>)
      }

    </div>
  );
}
