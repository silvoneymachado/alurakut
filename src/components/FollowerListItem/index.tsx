interface Props {
    item: any,
    index: number;
}

const FollowerListItem: React.FC<Props> = ({item, index}: Props) => {
    return (
        <li key={`${item.id}-${index}`}>
            <a href={`/users/${item.login}`}>
                <img src={`https://github.com/${item.login}.png`} />
                <span>{item.login}</span>
            </a>
        </li>
    )
}

export default FollowerListItem;