import SyntaxHighlighter from "react-syntax-highlighter/dist/esm/default-highlight";
import { a11yDark } from "react-syntax-highlighter/dist/esm/styles/hljs";
import styled from "styled-components";

interface CodeRendererProps {
  node?: any;
  inline?: boolean;
  className?: string;
  children?: React.ReactNode;
}

const CodeBlock = ({
  inline,
  className,
  children,
  ...props
}: CodeRendererProps) => {
  const match = /language-(\w+)/.exec(className || "");
  const parsedCode = String(children).replace(/\n$/, "");
  return !inline && match ? (
    <SCodeContainer>
      <SSyntaxHighlighter
        children={parsedCode}
        style={a11yDark}
        language={match[1]}
        indention={false}
        PreTag="div"
        {...props}
      />
    </SCodeContainer>
  ) : (
    <SCode className={className} {...props}>
      {parsedCode}
    </SCode>
  );
};

const SCodeContainer = styled.div`
  padding: 4px;
  margin: 8px 0;
  background-color: #2b2b2b;
  border-radius: 4px;
`;

const SSyntaxHighlighter = styled(SyntaxHighlighter)<{ indention: boolean }>`
  pre {
    white-space: ${(props) => (props.indention ? "pre-wrap!important" : "pre")};
    overflow-x: scroll;
  }
`;

const SCode = styled.code`
  white-space: pre-wrap;
`;
export default CodeBlock;
