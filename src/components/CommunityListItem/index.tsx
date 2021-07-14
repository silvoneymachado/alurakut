interface Props {
  item: any;
  index: number;
}

const CommunityListItem: React.FC<Props> = ({ item, index }: Props) => {
  return (
    <li key={`${item.title}-${index}`}>
      <a href={item.url}>
        <img src={item.imgUrl} />
        <span>{item.title}</span>
      </a>
    </li>
  );
};

export default CommunityListItem;
