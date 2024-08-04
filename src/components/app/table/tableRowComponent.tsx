import { useTableContext } from "@/context/tableStore";
import { TableColumnDataType, TableRowDataType } from "./table.types";

// Components
import ButtonComponent from "@/components/app/button/buttonComponent";

// - Styles
import variables from "@/styles/variables.module.scss";

interface ComponentProps {
  rowData: TableRowDataType
  columns: TableColumnDataType[]
  defaultCheckboxStatus: boolean
  useInlineFlex: boolean
  hideCheckbox?: boolean
  hideActions?: boolean
  handleClickOnEdit?: Function
  handleClickOnDelete?: Function
}

export default function TableRowComponent({
  useInlineFlex,
  rowData,
  columns,
  hideCheckbox,
  hideActions,
  handleClickOnEdit,
  handleClickOnDelete
}: ComponentProps) {
  const { checkboxStatuses, changeStatus } = useTableContext();

  const handleCheckboxChange = (): void => {
    changeStatus(rowData.id);
  };

  const handleAction = (actionType: 'edit' | 'delete'): void => {
    switch (actionType) {
      case 'delete':
        if (typeof handleClickOnDelete === 'function') handleClickOnDelete(rowData.id);
        break;

      case 'edit':
        if (typeof handleClickOnEdit === 'function') handleClickOnEdit(rowData.id);
        break;

      default:
        break;
    }
  };

  return (
    <div key={rowData.id} className="table-row justify-between" style={{ display: useInlineFlex ? 'inline-flex' : 'flex' }}>
      {!hideCheckbox && (
        <div className="row row-center table-cell" style={{ width: 80 }}>
          <input
            id={`checkbox-input-${rowData.id}`}
            name={`checkbox-input-${rowData.id}`}
            type="checkbox"
            style={{ width: 18, height: 18 }}
            onChange={handleCheckboxChange}
            checked={checkboxStatuses[rowData.id]}
          />
        </div>
      )}

      {columns.map((column, columnIndex) => (
        <div key={columnIndex} style={{ width: column.width }} className="table-cell row flex-wrap text-ellipsis">
          <p>{rowData[column.prop]}</p>
        </div>
      ))}

      {!hideActions && <div className="row row-center-vertical table-cell" style={{ width: 160 }}>
        <ButtonComponent
          text="Icon"
          backgroundColor={variables.colorError}
          textColor={variables.colorWhite}
          onClick={() => handleAction('delete')}
        />
        <ButtonComponent
          text="icon"
          backgroundColor={variables.colorWarn}
          textColor={variables.colorWhite}
          onClick={() => handleAction('edit')}
        />
      </div>}
    </div>
  );
}