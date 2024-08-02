"use client";

import ButtonComponent from "@/components/app/button/buttonComponent"
import variables from "@/styles/variables.module.scss";
import "./navbarComponent.scss";

interface ComponentProps {
  title: string
}

export default function NavbarComponent({ title }: ComponentProps) {
  return (
    <header className="header">
      <div className="headerContent">
        <div className="titleContainer">
          <span className={`font-size-32 colorWhite`}>{title}</span>
        </div>
        <div className="titleContainer">
          <ButtonComponent text="Delete" backgroundColor={variables.colorError} textColor={variables.colorWhite} onClick={() => {}} />
          <ButtonComponent text="Add new student" backgroundColor={variables.colorSuccess} textColor={variables.colorWhite} onClick={() => {}} />
        </div>
      </div>
    </header>
  );
}
