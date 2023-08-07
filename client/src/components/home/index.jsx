import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getHomeArticles } from '../../store/actions/articles';

import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button'
import Divider from '@mui/material/Divider';

import topbar from 'topbar';

import ArticleCard from '../../utils/articleCard';

const Home = () => {
  const articles = useSelector(state => state.articles);
  const dispatch = useDispatch();

  useEffect(() => {
    if (!articles.articles.length) {
      dispatch(getHomeArticles(articles.homeSort));
    }
  }, [dispatch]);

  useEffect(() => {
    articles.loading ? topbar.show() : topbar.hide()
  }, [articles.loading])

  const getNextArticles = () => {
    const skip = articles.homeSort.skip + articles.homeSort.limit;
    dispatch(getHomeArticles({ ...articles.homeSort, skip }));
  }

  return (
    <>
      {articles && articles.articles ?
        <>
          <Grid spacing={2} className='article_card' container>
            {
              articles.articles.map(art => (
                <Grid key={art._id} xs={12} sm={6} lg={3} item>
                  <ArticleCard article={art} />
                </Grid>
              ))
            }
          </Grid>
          <Divider className='mt-3 mb-3' />
          <Button variant='outlined' onClick={getNextArticles}>Load more</Button>
        </>
        :
        <p>There are no public articles at the moment</p>
      }
    </>
  )
}

export default Home