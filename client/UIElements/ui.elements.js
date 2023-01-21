import styled from "styled-components";

export const PrimaryButton = styled.button`
  width: 100%;
  padding: ${(props) => props.padding || "12px"};
  font-size: 14px;
  white-space: nowrap;
  color: white;
  cursor: pointer;
  border: none;
  outline: none;
  display: flex;
  justify-content: center;
  align-items: center;
  background: linear-gradient(
    45deg,
    rgba(199, 72, 210, 1) 3%,
    rgba(230, 94, 186, 1) 17%,
    rgba(251, 114, 164, 1) 38%,
    rgba(251, 110, 167, 1) 57%,
    rgba(254, 156, 126, 1) 92%
  );
  border-radius: 7px;
  font-weight: bold;
`;

export const SecondaryButton = styled.button`
  width: 100%;
  padding: ${(props) => props.padding || "12px"};
  font-size: 14px;
  color: white;
  cursor: pointer;
  border: none;
  outline: none;
  background: #32323f;
  border-radius: 7px;
  font-weight: bold;
`;

export const PrimaryInput = styled.input`
  width: 100%;
  max-width: 500px;
  padding: 10px 18px;
  font-size: 16px;
  color: #bcbcbf;
  border-radius: 10px;
  border: 2px solid #32323f;
  background: transparent;
`;

export const PrimaryTextArea = styled.textarea`
  width: 100%;
  height: 130px;
  padding: 10px 18px;
  font-size: 16px;
  color: #bcbcbf;
  border-radius: 10px;
  border: 2px solid #32323f;
  background: transparent;
`;

export const CheckBox = styled.input`
  width: 22px;
  height: 22px;
  border: 3px solid #dba1b5;
  cursor: pointer;
  border-radius: 8px;
  appearance: none;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: transparent;
  &:checked {
    background: #dba1b5;
    box-shadow: 0px 0px 4px 1px #dba1b5;
  }
`;
