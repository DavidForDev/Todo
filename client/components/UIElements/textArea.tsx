import { useState, useEffect } from "react";

// =========== Components =========== \\
import { InputDiv } from ".";
import Wrapper from "./wrapper";

// =========== Types =========== \\
import { TextAreaTypes } from "../../types/type";

const TextArea = ({
  placeholder,
  label,
  giveValue,
  requireSign,
  defaultValue,
}: TextAreaTypes) => {
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
      <InputDiv color="white" className="shadow-sm h-28">
        <textarea
          placeholder={placeholder ? placeholder : ""}
          onChange={(textarea) => setCurrentValue(textarea.target.value)}
          className="w-full resize-none h-full outline-none"
          defaultValue={defaultValue}
        />
      </InputDiv>
    </Wrapper>
  );
};

export default TextArea;
