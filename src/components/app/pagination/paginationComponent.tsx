"use client";

import ButtonComponent from "@/components/app/button/buttonComponent";
import variables from "@/styles/variables.module.scss";

interface ComponentProps {
  description: string
  totalPages: number
  activePage: number
  goNextPage: Function
  goPrevPage: Function
  goToPage: Function
}

export default function PaginationComponent({ description, totalPages, activePage, goNextPage, goPrevPage, goToPage }: ComponentProps) {

  const PageButtons = () => {
    const buttons: any[] = [];

    for (let i = 0; i < totalPages; i++) {
      buttons.push((<ButtonComponent
        key={i}
        text={`${i + 1}`}
        backgroundColor={activePage - 1 === i ? variables.colorSecondary : variables.colorWhite}
        textColor={activePage - 1 === i ? variables.colorWhite : variables.colorPrimary}
        onClick={() => goToPage(i + 1)}
      />));
    }

    return buttons;
  };

  return (
    <div className="row flex-wrap justify-between">
      <div>
        <p>{description}</p>
      </div>

      <div style={{ marginTop: 8, marginBottom: 8 }}>
        <ButtonComponent
          text="Previous"
          backgroundColor={variables.colorWhite}
          textColor={variables.colorPrimary}
          onClick={goPrevPage}
        />
        {PageButtons()}
        <ButtonComponent
          text="Next"
          backgroundColor={variables.colorWhite}
          textColor={variables.colorPrimary}
          onClick={goNextPage}
        />
      </div>
    </div>
  );
}
