import { Table, Pagination, Button, ButtonGroup } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';

import Moment from 'react-moment';
import { Loader } from '../../../utils/tools';

const PaginateComponent = ({ articles, goToPage, handleDeleteModal, handleStatusChange }) => {
  return (
    <>
      {articles && articles.docs ?
        <>
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>Created</th>
                <th>Title</th>
                <th>Score</th>
              </tr>
            </thead>
            <tbody>
              {articles.docs.map(art => (
                <tr key={art._id}>
                  <td><Moment to={art.date} /></td>
                  <td>{art.title}</td>
                  <td>{art.score}</td>
                  <td>
                    <ButtonGroup aria-label="Article actions">
                      <LinkContainer to={`/dashboard/articles/edit/${art._id}`}>
                        <Button variant="outline-primary">Edit</Button>
                      </LinkContainer>
                      <Button
                        variant="outline-info"
                        onClick={() => handleStatusChange(art._id, art.status)}>
                        {art.status === 'draft' ? 'Publish' : 'Unpublish'}
                      </Button>
                      <Button variant="outline-danger" onClick={() => handleDeleteModal(art._id)}>Delete</Button>
                    </ButtonGroup>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
          <Pagination>
            {articles.hasPrevPage ?
              <>
                <Pagination.Prev onClick={() => goToPage(articles.prevPage)} />
                <Pagination.Item onClick={() => goToPage(articles.prevPage)}>
                  {articles.prevPage}
                </Pagination.Item>
              </>
              : null}

            <Pagination.Item active>
              {articles.page}
            </Pagination.Item>

            {articles.hasNextPage ?
              <>
                <Pagination.Item onClick={() => goToPage(articles.nextPage)}>
                  {articles.nextPage}
                </Pagination.Item>
                <Pagination.Next onClick={() => goToPage(articles.nextPage)} />
              </>
              : null}
          </Pagination>
        </>
        :
        <Loader />
      }
    </>
  )
}

export default PaginateComponent;