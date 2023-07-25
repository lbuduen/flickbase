import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { Loader } from '../../utils/tools';
import { verifyAccount } from '../../store/actions/users';

const AccountVerify = () => {
  const dispatch = useDispatch();
  const [search] = useSearchParams();
  const navigate = useNavigate();

  const token = search.get("t");

  useEffect(() => {
    if (token) {
      dispatch(verifyAccount(token))
        .unwrap()
        .finally(() => { navigate("/"); })
    }
    else {
      navigate("/");
    }
  }, [dispatch, navigate]);

  return (
    <>
      <Loader />
    </>
  )
}

export default AccountVerify;