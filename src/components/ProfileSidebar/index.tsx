import Box from "../Box";

interface Props {
    githubUser: string;
}

const ProfileSidebar: React.FC<Props> = ({githubUser}: Props) => {
    return(
        <Box>
          <img src={`https://github.com/${githubUser}.png`} style={{ borderRadius: 8 }}/>
        </Box>
    )
}

export default ProfileSidebar;