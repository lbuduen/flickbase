import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getGuestArticleById } from '../../store/actions/articles'

import { htmlDecode } from '../../utils/tools';
import { useEffect } from 'react';
import ScoreCard from '../../utils/scoreCard';
import topbar from 'topbar';

const Article = () => {
  const { articleId: id } = useParams();
  const articles = useSelector(state => state.articles);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getGuestArticleById(id));
  }, [dispatch, id]);

  useEffect(() => {
    articles.loading ? topbar.show() : topbar.hide()
  }, [articles.loading])

  return (
    <>
      {
        articles.loading ?
          null
          :
          <div className='article_container'>
            <div
              style={{ background: `url(https://picsum.photos/1920/1080)` }}
              className='image'></div>
            <h1>{articles.current?.title}</h1>
            <div className="mt-3 content">
              <div dangerouslySetInnerHTML={{ __html: htmlDecode(articles.current?.content) }}></div>
            </div>
            <ScoreCard article={articles.current} />
          </div>
      }
    </>
  )
}

export default Article;
