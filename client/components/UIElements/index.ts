import styled from "styled-components";

export const InputDiv = styled.div`
  width: 100%;
  padding: 13px;
  border-radius: 4px;
  background-color: ${(props) => (props.color ? props.color : "white")};
  border: 1px solid #ececec8b;
  box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 2px 0px;
`;

export const PrimaryButton = styled.button`
  background: ${(props) => (props.color ? props.color : "#1d2939")};
  padding: 9px 15px;
  color: white;
  border-radius: 4px;
  gap: 3px;
  display: flex;
  align-items: center;
  justify-content: center;
  &:hover {
    opacity: 0.95;
  }
  &:active {
    opacity: 0.85;
  }
`;
