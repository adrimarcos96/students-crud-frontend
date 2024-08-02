"use client";

import { useEffect, useState } from "react";
import { fetchStudents } from "@/services/usersService";
import TableComponent from "@/components/app/table/tableComponent"
import PaginationComponent from "@/components/app/pagination/paginationComponent"
import { Student } from "@/models/student.model";
import { useStudentsContext } from "@/context/studentsStore";

interface Props {
  initialData: Student[]
  totalItems: number
}

export default function StudentsTableComponent({ initialData, totalItems }: Props) {
  const tableColumns = [
    { title: 'First name', width: 200, prop: 'firstName' },
    { title: 'Last name', width: 250, prop: 'lastName' },
    { title: 'Email', width: 300, prop: 'email' },
    { title: 'Age', width: 100, prop: 'age' },
    { title: 'Grade', width: 100, prop: 'grade' },
  ];
  const { students, totalStudents, setStudents, setTotalStudents } = useStudentsContext();
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [lastPage, setLastPage] = useState<number>(1);
  const [pageSize, setPageSize] = useState<number>(10);

  useEffect(() => {
    setStudents(initialData);
    setTotalStudents(totalItems);
    setLastPage(Math.ceil(totalItems / pageSize));
  }, [])

  const getStudents = async (page: number, size: number) => {
    const { data } = await fetchStudents(page, size);
    const total = data?.totalItems || 0;

    setStudents(data?.data || []);
    setTotalStudents(total);
    setLastPage(Math.ceil(total / pageSize));
  };

  const handleChangePage = async (newPage: number) => {
    if (newPage <= 0) return
    setCurrentPage(newPage);
    await getStudents(newPage, pageSize);
  };

  const handleGoNextpage = () => {
    if (currentPage >= lastPage) return;

    handleChangePage(currentPage + 1);
  };

  const handleGoPrevPage = () => {
    if (currentPage <= 1) return;

    handleChangePage(currentPage - 1);
  };

  const handleGoToPage = (page: number) => {
    if (page <= 0 || page > lastPage) return;

    handleChangePage(page);
  }

  return (
    <div style={{ paddingLeft: 10, paddingRight: 10 }}>
      <TableComponent columns={tableColumns} data={students} />

      <div style={{ marginTop: 10 }}>
        <PaginationComponent
          totalPages={lastPage}
          activePage={currentPage}
          description={`Showing ${students.length} out of ${totalStudents} entries`}
          goNextPage={handleGoNextpage}
          goPrevPage={handleGoPrevPage}
          goToPage={handleGoToPage}
        />
      </div>
    </div>
  );
}
