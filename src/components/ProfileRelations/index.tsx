import { ReactNode } from "react";
import { ProfileRelationsWrapper } from "./styles";
interface Props {
  children?: ReactNode;
  title?: string;
  listItems?: any[];
  RenderItem?: ReactNode;
}

const ProfileRelationsBoxWrapper: React.FC<Props> = ({
  children,
  title,
  listItems,
  RenderItem,
}: Props) => {
  return (
    <ProfileRelationsWrapper>
      {children}
      {listItems && (
        <>
          <h2 className="smallTitle">
            {title} ({listItems.length})
          </h2>
          <ul>
            {listItems.map((item, index) => (
              <RenderItem item={item} key={index} />
            ))}
          </ul>
        </>
      )}
    </ProfileRelationsWrapper>
  );
};

export default ProfileRelationsBoxWrapper;
