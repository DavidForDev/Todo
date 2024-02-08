import Link from "next/dist/client/link";
import { useRouter } from "next/router";

// ========== Helper ========== \\
import { GiveChildrenProp } from "../../hooks/childrenProp";
import { NavCardTypes } from "../../types/type";

// ========== Components ========== \\
import ItemQuantity from "./quantity";

const NavCard = ({ detail }: NavCardTypes) => {
  const { name, svg, href, quantity, toggleModal } = detail;

  // ========== Router
  const router = useRouter();
  const route = router.route;

  // ========== Active according to route
  const activeStyle: any = {
    parentElement: {
      backgroundColor: "#F2F4F7",
    },
    quantityElement: {
      color: "white",
      backgroundColor: "#F94C10",
    },
    elementName: {
      color: "#1D2939",
    },
    svgElement: {
      stroke: "#1D2939",
    },
  };

  const parentElement = route === href ? activeStyle.parentElement : {};
  const quantityElement = route === href ? activeStyle.quantityElement : {};
  const elementName = route === href ? activeStyle.elementName : {};
  const svgElement = route === href ? activeStyle.svgElement : {};

  return (
    <Link href={href} onClick={toggleModal}>
      <li
        className="px-2 py-3 hover:bg-[#F2F4F7] cursor-pointer rounded-lg flex justify-between items-center group"
        style={parentElement}
      >
        <div className="flex items-center gap-2">
          {GiveChildrenProp(svg, {
            stroke: "#F94C10",
            className: "group-hover:stroke-[#1D2939] w-6 h-6",
            style: svgElement,
          })}
          <p
            className="first-letter:uppercase text-xs font-bold text-[#667085] group-hover:text-[#1D2939]"
            style={elementName}
          >
            {name}
          </p>
        </div>
        <ItemQuantity quantityElement={quantityElement} quantity={quantity} />
      </li>
    </Link>
  );
};

export default NavCard;
