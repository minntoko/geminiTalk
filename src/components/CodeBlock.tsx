import SyntaxHighlighter from "react-syntax-highlighter/dist/esm/default-highlight";
import { a11yDark } from 'react-syntax-highlighter/dist/esm/styles/hljs';
import styled from "styled-components";

interface CodeRendererProps {
  node?: any;
  inline?: boolean;
  className?: string;
  children?: React.ReactNode;
}

const CodeBlock = ({ inline, className, children, ...props }: CodeRendererProps) => {
  const match = /language-(\w+)/.exec(className || "");
  const parsedCode = String(children).replace(/\n$/, "");
  return !inline && match ? (
    <SCodeContainer>
      <SyntaxHighlighter
        children={parsedCode}
        style={a11yDark}
        language={match[1]}
        PreTag="div"
        {...props}
      />
    </SCodeContainer>
  ) : (
    <code className={className} {...props}>
      {parsedCode}
    </code>
  )
};

const SCodeContainer = styled.div`
  padding: 4px;
  margin: 8px 0;
  background-color: #2b2b2b;
  border-radius: 4px
`;

export default CodeBlock;
