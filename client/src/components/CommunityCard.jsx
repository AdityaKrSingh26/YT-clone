import * as React from 'react';
import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import ThumbDownIcon from "@mui/icons-material/ThumbDown";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import Avatar from '@mui/material/Avatar';
import { red } from '@mui/material/colors';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShareIcon from '@mui/icons-material/Share';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import MoreVertIcon from '@mui/icons-material/MoreVert';

const ExpandMore = styled((props) => {
    const { expand, ...other } = props;
    return <IconButton {...other} />;
})(({ theme, expand }) => ({
    transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
        duration: theme.transitions.duration.shortest,
    }),
}));

export default function RecipeReviewCard() {
    const [expanded, setExpanded] = React.useState(false);

    const handleExpandClick = () => {
        setExpanded(!expanded);
    };

    return (
        <Card sx={{ maxWidth: 345, backgroundColor: "#202020", color: "white" }}>
            <CardHeader
                avatar={
                    <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
                        R
                    </Avatar>
                }
                action={
                    <IconButton aria-label="settings">
                        <MoreVertIcon sx={{ color: red[50] }} />
                    </IconButton>
                }
                title="Shrimp and Chorizo Paella"
                subheader={
                    <Typography variant="subtitle2" color="white">
                        September 14, 2016
                    </Typography>
                }
            />
            <CardMedia
                component="img"
                height="194"
                image="https://cdn.pixabay.com/photo/2016/05/05/02/37/sunset-1373171_1280.jpg"
                alt="Paella dish"
            />
            <CardContent>
                <Typography variant="body2" color="white">
                    This impressive paella is a perfect party dish and a fun meal to cook
                    together with your guests. Add 1 cup of frozen peas along with the mussels,
                    if you like.
                </Typography>
            </CardContent>
            <CardActions disableSpacing>
                <IconButton aria-label="add to favorites">
                    <ThumbUpIcon sx={{ color: red[50] }} />
                    <p style={{ color: "white", marginLeft: "5px" }}>0</p>
                </IconButton>
                <IconButton aria-label="share">
                    <ThumbDownIcon sx={{ color: red[50] }} />
                    <p style={{ color: "white", marginLeft: "5px" }}>0</p>
                </IconButton>


            </CardActions>
        </Card>
    );
}
