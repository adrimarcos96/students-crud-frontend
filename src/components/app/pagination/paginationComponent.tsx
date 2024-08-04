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
      buttons.push(
        (<ButtonComponent
          key={i}
          id={`pagination-button-${i}`}
          backgroundColor={activePage - 1 === i ? variables.colorSecondary : undefined}
          paddingLeft={14}
          paddingRight={14}
          textColor={activePage - 1 === i ? variables.colorWhite : variables.colorPrimary}
          onClick={() => goToPage(i + 1)}
        >
          <span className="font-size-16" style={{ fontFamily: variables.fontFamily, fontWeight: 500 }}>{`${i + 1}`}</span>
        </ButtonComponent>)
      );
    }

    return buttons;
  };

  return (
    <div className="row flex-wrap justify-between">
      <div>
        <p className="font-size-16" style={{ color: variables.colorPrimary, fontWeight: 500 }}>{description}</p>
      </div>

      <div style={{ marginTop: 8, marginBottom: 8 }}>
        <ButtonComponent
          id="pagination-button-next"
          backgroundColor={variables.colorWhite}
          onClick={goPrevPage}
        >
          <span className="font-size-16" style={{ fontFamily: variables.fontFamily, color: variables.colorPrimary, fontWeight: 500 }}>Previous</span>
        </ButtonComponent>
        {PageButtons()}
        <ButtonComponent
          id="prev-button-next"
          backgroundColor={variables.colorWhite}
          onClick={goNextPage}
        >
          <span className="font-size-16" style={{ fontFamily: variables.fontFamily, color: variables.colorPrimary, fontWeight: 500 }}>Next</span>
        </ButtonComponent>
      </div>
    </div>
  );
}
