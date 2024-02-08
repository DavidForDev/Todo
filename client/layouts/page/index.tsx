import { useState, useContext, useEffect, ReactNode } from "react";
import { useRouter } from "next/dist/client/router";

// ========== Components ========= \\
import TaskNavigation from "../../components/navigation/taskNavigation";
import Navigation from "../../components/navigation";
import Modal from "../../components/modals";

// ========== Layout ========= \\
import HeadLayout from "../head.layout";

// ========== Context ========= \\
import { modalContext } from "../../context/modal.context";
import LayoutHeader from "./header";
import LayoutMain from "./main";
import { GetServerSideProps } from "next";

const PageContainer = ({ children, pageTitle }: any) => {
  // ========== Router Id
  const router = useRouter();
  const { taskId } = router.query;

  // ========== Modals
  const { modals } = useContext(modalContext);

  const [navStatus, setNavStatus] = useState<boolean>(true);

  const navigations = taskId ? (
    <TaskNavigation navToggle={setNavStatus} />
  ) : (
    <Navigation navToggle={setNavStatus} />
  );

  // ================ transformation of navigation according to size of window
  useEffect(() => {
    // ============ Check size without refreshing
    const handleResize = () => {
      const newScreenWidth = window.innerWidth;

      if (newScreenWidth < 1024) {
        setNavStatus(false);
      } else {
        setNavStatus(true);
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <div className="flex h-full">
      <HeadLayout title={pageTitle} />

      <LayoutHeader navStatus={navStatus}>{navigations}</LayoutHeader>

      <LayoutMain setNavStatus={setNavStatus} navStatus={navStatus}>
        {children}
      </LayoutMain>

      {/* all modals: creator // editor // barier */}
      {modals.map((detail: any, index: number) => {
        return <Modal detail={detail} key={index} />;
      })}
    </div>
  );
};

export default PageContainer;
