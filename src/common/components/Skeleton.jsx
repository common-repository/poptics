import { Skeleton as LoaderSkeleton } from "antd";

const Skeleton = (props) => {
  const { children = null, ...rest } = props;
  return (
    <LoaderSkeleton active {...rest}>
      {children}
    </LoaderSkeleton>
  );
};

export const AvatarSkeleton = (props) => {
  const { shape = "circle", ...rest } = props;
  return <LoaderSkeleton.Avatar shape={shape} active {...rest} />;
};

export const ImgSkeleton = (props) => (
  <LoaderSkeleton.Image active {...props} />
);

export const BlockSkeleton = (props) => {
  const { block = true, ...rest } = props;
  return <LoaderSkeleton.Input active block={block} {...rest} />;
};

export const RowSkeleton = (props) => {
  const { children = null, rows = 4, ...rest } = props;
  return (
    <LoaderSkeleton active paragraph={{ rows }} {...rest}>
      {children}
    </LoaderSkeleton>
  );
};

export default Skeleton;
