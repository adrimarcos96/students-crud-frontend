"use client";

import ButtonComponent from "@/components/app/button/buttonComponent"
import variables from "@/styles/variables.module.scss";
import "./navbarComponent.scss";
import { MinusCircleIcon, PlusCircleIcon } from "@heroicons/react/24/solid";

interface ComponentProps {
  title: string
}

export default function NavbarComponent({ title }: ComponentProps) {
  return (
    <header className="header">
      <div className="headerContent">
        <div className="titleContainer">
          <span className={`font-size-32 colorWhite`} style={{ fontFamily: variables.fontFamily }}>{title}</span>
        </div>
        <div className="row row-center-vertical">
          <ButtonComponent height={38} backgroundColor={variables.colorError} textColor={variables.colorWhite} paddingLeft={15} paddingRight={15} onClick={() => {}}>
            <div className="row row-center">
              <MinusCircleIcon width={24} height={24} style={{ color: variables.colorWhite }} />
              <span className="font-size-16" style={{ marginLeft: 5, fontFamily: variables.fontFamily, fontWeight: 500 }}>Delete</span>
            </div>
          </ButtonComponent>
          <ButtonComponent height={38} backgroundColor={variables.colorSuccess} textColor={variables.colorWhite} paddingLeft={15} paddingRight={15} onClick={() => {}}>
            <div className="row row-center">
              <PlusCircleIcon width={24} height={24} style={{ color: variables.colorWhite }} />
              <span className="font-size-16" style={{ marginLeft: 5, fontFamily: variables.fontFamily, fontWeight: 500 }}>Add new student</span>
            </div>
          </ButtonComponent>
        </div>
      </div>
    </header>
  );
}
