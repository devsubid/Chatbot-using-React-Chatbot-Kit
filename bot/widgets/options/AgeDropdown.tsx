import React from "react";
import { useDispatch } from "react-redux";
import { styled } from "styled-components";
import { AppDispatch } from "../../../redux/store";
import { startCount } from "../../../redux/features/messages-slice";

const StyledSelect = styled.select`
  position: relative;
  padding: 0.5rem 1rem;
  border-radius: 5rem;
  appearance: none;
`;

const AgeDropdown: React.FC<any> = (props) => {
  const dispatch = useDispatch<AppDispatch>();
  const handleAge = (e: React.ChangeEvent<HTMLSelectElement>) => {
    props.actionProvider.handleUserInput(parseInt(e.target.value));
    setTimeout(() => {
      dispatch(startCount());
    }, 5000);
  };
  return (
    <StyledSelect onChange={handleAge} title="Enter your Age">
      <option>Select an Option</option>
      {Array.from({ length: 24 }, (_, i) => i + 18).map((age) => (
        <option key={age} value={age}>
          {age}
        </option>
      ))}
    </StyledSelect>
  );
};

export default AgeDropdown;
