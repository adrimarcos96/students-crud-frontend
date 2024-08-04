export interface TableColumnDataType {
  title: string
  width: number
  prop: string
}

export interface TableRowDataType {
  id: string
  [key: string]: string | number
}
