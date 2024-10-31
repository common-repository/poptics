import { Typography } from "antd";
const { Text: AntdText, Title: AntdTitle, Link: AntdLink } = Typography;

export const Text = (props) => {
  const { type, text, ...rest } = props;
  return (
    <AntdText type={type} {...rest}>
      {text}
    </AntdText>
  );
};

export const Title = (props) => {
  const { level, text, ...rest } = props;
  return (
    <AntdTitle level={level} {...rest}>
      {text}
    </AntdTitle>
  );
};

export const Link = (props) => {
  const { href, text, ...rest } = props;
  return (
    <AntdLink href={href} {...rest}>
      {text}
    </AntdLink>
  );
};

export const Description = (props) => {
  const { className = "", text, ...rest } = props;
  return (
    <p className={`pt-description ${className}`} {...rest}>
      {text}
    </p>
  );
};
