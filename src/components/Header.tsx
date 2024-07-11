import styled from "styled-components";

interface Props {
  headding: string;
}

const Header = ({headding}: Props) => {
  return (
    <SHeader>
      <SHeading>{headding}</SHeading>
    </SHeader>
  );
};

const SHeader = styled.header`
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #fff;
  color: #333;
  text-align: center;
  height: 60px;
  width: 100%;
  border-bottom: 1px solid #eee;
`;

const SHeading = styled.h1`
  font-size: 1.3em;
`;

export default Header;
