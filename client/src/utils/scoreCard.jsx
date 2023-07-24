import { List, ListItem, ListItemText, ListItemAvatar, Avatar, Divider, Chip } from '@mui/material';
import MovieIcon from '@mui/icons-material/Movie';
import PersonIcon from '@mui/icons-material/Person';
import StarIcon from '@mui/icons-material/Star';

const ScoreCard = ({ article }) => {
  return (
    <>
      <Divider className='mt-2 mb-2' />
      <List className='scorecard'>
        <ListItem>
          <ListItemAvatar>
            <Avatar>
              <StarIcon />
            </Avatar>
          </ListItemAvatar>
          <ListItemText primary="Our score" secondary={article?.score} className='rating' />
        </ListItem>
        <ListItem>
          <ListItemAvatar>
            <Avatar>
              <PersonIcon />
            </Avatar>
          </ListItemAvatar>
          <div>
            {
              article?.actors.map((actor, i) => (
                <Chip key={actor + i} item={actor} label={actor} className='chip' clickable />
              ))
            }
          </div>
        </ListItem>
        <ListItem>
          <ListItemAvatar>
            <Avatar>
              <MovieIcon />
            </Avatar>
          </ListItemAvatar>
          <ListItemText primary="Director" secondary={article?.director} />
        </ListItem>
      </List>
    </>
  )
}

export default ScoreCard;