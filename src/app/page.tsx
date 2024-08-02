'use server'
import styles from "./page.module.scss";
import NavbarComponent from "@/components/app/navbar/navbarComponent";
import StudentsTableComponent from "@/components/students/studentsTableComponent";
import { fetchStudents } from "@/services/usersService";
import { StudentsContextProvider } from "@/context/studentsStore";

export default async function Home() {
  const { data } = await fetchStudents(1, 10);

  return (
    <main className={styles.main}>
      <StudentsContextProvider>
        <NavbarComponent title="Manage Students" />

        <div className={styles.pageContainer}>
          <StudentsTableComponent initialData={data?.data || []} totalItems={data?.totalItems || 0} />
        </div>
      </StudentsContextProvider>
    </main>
  );
}
