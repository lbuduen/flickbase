import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { getPaginateArticles, deleteArticle, changeArticleStatus } from '../../../store/actions/articles';

import { AdminTitle } from '../../../utils/tools';
import PaginateComponent from './paginate';

import { Button, ButtonGroup, ButtonToolbar, FormControl, InputGroup, Modal } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';

const AdminArticles = () => {
  const articles = useSelector(state => state.articles);
  const [showDeleteDialog, handleShowDeleteDialog] = useState(false);
  const [id2Del, setId2Del] = useState(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(getPaginateArticles({}));
  }, []);

  /// START PAGINATION COMMANDS
  const go2Page = (page) => {
    dispatch(getPaginateArticles({ page }));
  }

  const handleShow = (_id) => {
    setId2Del(_id);
    handleShowDeleteDialog(true);
  }

  const handleStatusChange = (_id, status) => {
    const newStatus = status === "draft" ? 'public' : 'draft';
    dispatch(changeArticleStatus({_id, newStatus}));
  }
  /// END PAGINATION COMMANDS

  const handleClose = () => handleShowDeleteDialog(false);

  const handleDeleteArticle = async () => {
    await dispatch(deleteArticle(id2Del)).unwrap();
    handleClose();
    setId2Del(null);
  }

  return (
    <>
      <AdminTitle title="Articles" />
      <div className="articles_table">
        <ButtonToolbar className='mb-3'>
          <ButtonGroup className='me-2'>
            <LinkContainer to='/dashboard/articles/add'>
              <Button variant='secondary'>Add articles</Button>
            </LinkContainer>
          </ButtonGroup>
          <form>
            <InputGroup>
              <InputGroup.Text id='btngrp1'>@</InputGroup.Text>
              <FormControl type='text' placeholder='Search' />
            </InputGroup>
          </form>
        </ButtonToolbar>
        <>
          <PaginateComponent
            articles={articles.adminArticles}
            goToPage={(page) => go2Page(page)}
            handleDeleteModal={(_id) => handleShow(_id)}
            handleStatusChange={(_id, status) => handleStatusChange(_id, status)} />
        </>
      </div>

      <Modal show={showDeleteDialog} onHide={handleClose}>
        <Modal.Body>Are you sure you want to delete this article?</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Cancel
          </Button>
          <Button variant="danger" onClick={handleDeleteArticle}>
            Delete article
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  )
}

export default AdminArticles;