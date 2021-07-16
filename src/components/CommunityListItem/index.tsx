interface Props {
  item: any;
  index: number;
}

const CommunityListItem: React.FC<Props> = ({ item, index }: Props) => {
  return (
    <li key={`${item.id}-${index}`} title={item.title}>
      <a href={item.communityurl}>
        <img src={item.imageurl} />
        <span>{item.title}</span>
        <span>Creators url{item.creatorslug}</span>
      </a>
    </li>
  );
};

export default CommunityListItem;
