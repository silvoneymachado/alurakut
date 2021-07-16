interface Props {
    item: any,
    index: number;
}

const FavoritesPeopleListItem: React.FC<Props> = ({item, index}: Props) => {
    return (
        <li key={`${item}-${index}`}>
            <a href={`/users/${item}`}>
                <img src={`https://github.com/${item}.png`} />
                <span>{item}</span>
            </a>
        </li>
    )
}

export default FavoritesPeopleListItem;