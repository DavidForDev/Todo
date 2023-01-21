// ========== Icons ========== \\
import LeftArrowSvg from "../public/icons/leftArrow";
import EditFolderSvg from "../public/icons/editFolder";

// ========== UIElement ========== \\
import { SecondaryButton } from "../UIElements/ui.elements";

// ========== Layout ========== \\
import Header from "./head.layout";
import Link from "next/link";
import UseModal from "./useModal";

const BodyLayout = ({
  pageTitle,
  backButton,
  children,
  className,
  modalComponent,
  editorOpener,
}) => {
  return (
    <>
      <Header pageTitle={pageTitle} />
      <div
        className={`lg:w-1/2 m-auto w-full h-full ${
          className ? className : ""
        } m-auto flex flex-col gap-10`}
      >
        <header className="flex items-center justify-between w-full">
          <div className="flex items-center gap-4">
            {backButton && (
              <Link href={`/${backButton}`}>
                <SecondaryButton padding="9px">
                  <LeftArrowSvg width="18px" height="18px" />
                </SecondaryButton>
              </Link>
            )}
            <h2 className="text-white text-xl font-semibold whitespace-nowrap">
              {pageTitle}
            </h2>
          </div>
          {modalComponent ? (
            <EditFolderSvg
              className={`Opener${editorOpener}`}
              width="20px"
              height="20px"
              aria-label={`#${pageTitle}`}
            />
          ) : (
            ""
          )}
        </header>
        <main className="w-full">{children}</main>
      </div>
      <UseModal modalName={pageTitle}>{modalComponent}</UseModal>
    </>
  );
};

export default BodyLayout;
