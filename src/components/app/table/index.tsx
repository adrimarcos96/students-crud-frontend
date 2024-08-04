"use client";

import { TableContextProvider } from "@/context/tableStore";

// - Components
import TableComponent, { ComponentProps } from "./tableComponent";


// - Styles
import './tableComponent.scss';

export default function MainTableComponent({ columns, data, hideCheckboxs, hideActions }: ComponentProps) {
  return (
    <TableContextProvider>
        <TableComponent columns={columns} data={data} hideCheckboxs={hideCheckboxs} hideActions={hideActions} />
    </TableContextProvider>
  );
}
