"use client";
import { useEffect, useState } from "react";
import { fetchStudents } from "@/services/usersService";
import TableComponent from "@/components/app/table/tableComponent"
import PaginationComponent from "@/components/app/pagination/paginationComponent"
import { Student } from "@/models/student.model";
import { useStudentsContext } from "@/context/studentsStore";

interface Props {
  initialData: Student[]
}

export default function StudentsTableComponent({ initialData }: Props) {
  const { students, setStudents } = useStudentsContext();
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [pageSize, setPageSize] = useState<number>(10);

  useEffect(() => {
    setStudents(initialData)
  }, [])

  const getStudents = async (page: number, size: number) => {
    const { data } = await fetchStudents(page, size);

    setStudents(data || []);
  };

  const handleChangePage = async (newPage: number) => {
    if (newPage <= 0) return
    setCurrentPage(newPage);
    await getStudents(newPage, pageSize);
  }

  const handleChangePageSize = async (newPageSize: number) => {
    if (newPageSize <= 0) return
    setPageSize(newPageSize);
    await getStudents(currentPage, newPageSize);
  }

  return (
    <div>
      <TableComponent />

      <h5>Page: {currentPage}</h5>
      <button onClick={() => handleChangePage(currentPage + 1)}>Next page</button>
      <button onClick={() => handleChangePage(currentPage - 1)}>Prev page</button>
      {students.map(student => (
        <p key={student.id}>- {student.id} - {student.firstName} {student.lastName}</p>
      ))}

      <PaginationComponent />
    </div>
  );
}
