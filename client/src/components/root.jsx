import { useEffect, useLayoutEffect } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Container } from 'react-bootstrap';
import { ToastContainer } from 'react-toastify'

import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-toastify/dist/ReactToastify.css';
import '../styles/main.css';

import Header from "./nav/header";
import { clearNotifications } from '../store/reducers/notifications';
import { setLayout } from '../store/reducers/site';
import { isAuth } from '../store/actions/users'
import { showToast } from '../utils/tools';

const Root = () => {
  const notifications = useSelector(state => state.notifications);
  const site = useSelector(state => state.site);
  const dispatch = useDispatch();
  const location = useLocation();

  useLayoutEffect(() => {
    async function autoLogin() {
      await dispatch(isAuth()).unwrap();
    }
    autoLogin();
  }, []);

  useEffect(() => {
    const pathname = location.pathname.split("/");

    if (pathname[1] === "dashboard") {
      dispatch(setLayout("dash_layout"));
    }
    else {
      dispatch(setLayout(""));
    }
  }, [location.pathname, dispatch]);

  useEffect(() => {
    if (notifications) {
      if (notifications.global.error) {
        showToast('ERROR', notifications.global.msg);
        dispatch(clearNotifications());
      }
      if (notifications.global.success) {
        showToast('SUCCESS', notifications.global.msg);
        dispatch(clearNotifications());
      }
    }
  }, [notifications]);

  return (
    <>
      <Header />
      <Container className={`app_container mb-5 ${site.layout}`}>
        <Outlet />
        <ToastContainer />
      </Container>
    </>
  )
}

export default Root;