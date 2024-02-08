const ItemQuantity = ({ quantityElement, quantity }: any) => {
  if (!quantity) return;

  return (
    <span
      className="flex items-center justify-center bg-[#F2F4F7] w-5 h-5 text-xs text-[#1D2939] rounded-md group-hover:bg-[#F94C10] group-hover:text-white"
      style={quantityElement}
    >
      {quantity}
    </span>
  );
};

export default ItemQuantity;
