import { useRef, useState } from 'react';

//REDUX
import { useDispatch, useSelector } from 'react-redux';
import { addArticle } from '../../../store/actions/articles';

///ROUTER
import { useNavigate } from 'react-router-dom';

///FORMIK
import { FieldArray, FormikProvider, useFormik } from 'formik';
import { formValues, validation } from './validationSchema'

///UTILS
import { errorHelper, AdminTitle, Loader } from '../../../utils/tools';
import WYSIWYG from '../../../utils/wysiwyg';

///MUI
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'
import Divider from '@mui/material/Divider'
import Chip from '@mui/material/Chip'
import Paper from '@mui/material/Paper'
import InputBase from '@mui/material/InputBase'
import IconButton from '@mui/material/IconButton'
import Select from '@mui/material/Select'
import MenuItem from '@mui/material/MenuItem'
import FormControl from '@mui/material/FormControl'
import FormHelperText from '@mui/material/FormHelperText'
import InputLabel from '@mui/material/InputLabel';

import AddIcon from '@mui/icons-material/Add';


const ArticleForm = () => {
  const articles = useSelector(state => state.articles);
  const dispatch = useDispatch();
  const navigate = useNavigate()

  const actorsValue = useRef('');

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: formValues,
    validationSchema: validation,
    onSubmit: async (values) => {
      await dispatch(addArticle(values)).unwrap();
      navigate("/dashboard/articles");
    }
  });

  const [editorBlur, setEditorBlur] = useState(false);

  const handleEditorBlur = (blur) => {
    console.log(blur);
    setEditorBlur(true);
  }

  const handleEditorState = (state) => {
    formik.setFieldValue('content', state, true);
  }

  return (
    <>
      <AdminTitle title="Add article" />
      <form className='mt-3 article_form' onSubmit={formik.handleSubmit}>
        <div className="form-group">
          <TextField
            style={{ width: '100%' }}
            id='title'
            label='Enter a title'
            variant='outlined'
            {...formik.getFieldProps('title')}
            {...errorHelper(formik, 'title')}
          />
        </div>

        <div className="form-group">
          <WYSIWYG
            setEditorState={(state) => handleEditorState(state)}
            setEditorBlur={(blur) => handleEditorBlur(blur)}
            onError={formik.errors.content}
            editorBlur={editorBlur}
          />
          {formik.errors.content || (formik.errors.content && editorBlur) ?
            <FormHelperText error={true}>{formik.errors.content}</FormHelperText>
            : null
          }
        </div>

        <div className="form-group">
          <TextField
            style={{ width: '100%' }}
            id='excerpt'
            label='Enter a short description'
            variant='outlined'
            multiline
            rows={4}
            {...formik.getFieldProps('excerpt')}
            {...errorHelper(formik, 'excerpt')}
          />
        </div>

        <Divider className='mt-3 mb-3' />

        <div className="form-group">
          <TextField
            style={{ width: '100%' }}
            id='score'
            label='Enter a score'
            variant='outlined'
            {...formik.getFieldProps('score')}
            {...errorHelper(formik, 'score')}
          />
        </div>

        <div className="form-group">
          <FormikProvider value={formik}>
            <FieldArray
              name='actors'
              render={arrayHelpers => (
                <div>
                  <Paper className='actors_form'>
                    <InputBase
                      inputRef={actorsValue}
                      className='input'
                      placeholder='Add actors names here'
                    />
                    <IconButton onClick={() => {
                      if (actorsValue.current.value !== "") {
                        arrayHelpers.push(actorsValue.current.value);
                        actorsValue.current.value = "";
                      }
                    }}>
                      <AddIcon />
                    </IconButton>
                  </Paper>
                  {formik.errors.actors && formik.touched.actors ?
                    <FormHelperText error={true}>{formik.errors.actors}</FormHelperText>
                    : null
                  }
                  <div className="chip_container">
                    {formik.values.actors.map((actor, i) => (
                      <div key={i}>
                        <Chip
                          label={actor}
                          color='primary'
                          onDelete={() => arrayHelpers.remove(i)}
                        />
                      </div>
                    ))}
                  </div>
                </div>
              )}
            />
          </FormikProvider>
        </div>

        <div className="form-group">
          <TextField
            style={{ width: '100%' }}
            id='director'
            label='Enter a director'
            variant='outlined'
            {...formik.getFieldProps('director')}
            {...errorHelper(formik, 'director')}
          />
        </div>

        <Divider className='mt-3 mb-3' />

        <FormControl fullWidth>
          <InputLabel>Select a status</InputLabel>
          <Select
            id='status'
            label='Select a status'
            error=
            {formik.errors.status && formik.touched.status}
            {...formik.getFieldProps('status')}>
            <MenuItem value=""><em>None</em></MenuItem>
            <MenuItem value="draft">Draft</MenuItem>
            <MenuItem value="public">Public</MenuItem>
          </Select>
          {formik.errors.status && formik.touched.status ?
            <FormHelperText error={true}>{formik.errors.status}</FormHelperText>
            : null
          }
        </FormControl>

        <Divider className='mt-3 mb-3' />

        {articles.loading ?
          <Loader />
          :
          <Button
            variant='contained'
            color='primary'
            type='submit'>Add article
          </Button>
        }
      </form>
    </>
  )
}

export default ArticleForm;