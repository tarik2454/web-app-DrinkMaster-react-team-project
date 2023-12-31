import styled from 'styled-components';

export const WrapperStyled = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 38px;
  border-radius: 200px;
  border: 1px solid ${({ theme }) => theme.colors.link};
  @media screen and (min-width: 768px) {
    height: 44px;
  }
`;

export const IncButtonStyled = styled.button`
  display: flex;
  font-size: 16px;
  align-items: center;
  padding: 11px 16px;
  background: transparent;
  border-radius: 0 200px 200px 0;
  border: none;
  & svg {
    width: 16px;
    height: 16px;
    stroke: ${({ theme }) => theme.colors.mainText};
    pointer-events: none;
  }
  &:disabled {
    opacity: 0.3;
  }

  @media screen and (min-width: 768px) {
    padding: 14px 18px;
  }
`;

export const DecButtonStyled = styled(IncButtonStyled)`
  border-radius: 200px 0 0 200px;
`;
export const CountViveStyled = styled.div`
  min-width: 25px;
  text-align: center;
  line-height: 1.28; /* 128.571% */

  @media screen and (min-width: 768px) {
    font-size: 17px;
    line-height: 1.56; /* 26.52px */
  }
`;
