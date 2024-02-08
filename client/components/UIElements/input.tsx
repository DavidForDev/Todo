import { useEffect, useState } from "react";

// ========== Components ========= \\
import { InputDiv } from "./index";
import Wrapper from "./wrapper";

// ========== Types ========= \\
import { InputTypes } from "../../types/type";

const Input = ({
  placeholder,
  type,
  label,
  giveValue,
  requireSign,
  defaultValue,
  disabledStatus,
  value,
}: InputTypes) => {
  const [currentValue, setCurrentValue] = useState<any>("");

  useEffect(() => {
    giveValue(currentValue);
  }, [currentValue, giveValue]);

  useEffect(() => {
    if (!defaultValue) return;

    setCurrentValue(defaultValue);
  }, [defaultValue]);

  return (
    <Wrapper label={label} requireSign={requireSign}>
      <InputDiv color="white" className="shadow-sm">
        <input
          type={type ? type : "text"}
          placeholder={placeholder ? placeholder : ""}
          onChange={(input) => setCurrentValue(input.target.value)}
          className="w-full text-sm"
          defaultValue={currentValue}
          value={value ? value : currentValue}
          disabled={disabledStatus}
        />
      </InputDiv>
    </Wrapper>
  );
};

export default Input;
