import React from 'react';
import Box from '@mui/material/Box';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Input from '@material-ui/core/Input';
import IconButton from '@material-ui/core/IconButton';
import EditIcon from '@material-ui/icons/EditOutlined';
import DoneIcon from '@material-ui/icons/DoneAllTwoTone';
import RevertIcon from '@material-ui/icons/NotInterestedOutlined';
import TablePagination from '@material-ui/core/TablePagination';
import './_users.scss';
import { TableContainer } from '@material-ui/core';
import { useSelector } from 'react-redux';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { storedData } from './../../slices/users';
import { Link } from 'react-router-dom';
import { fetchUsers, deleteUsers, putUsers } from './../../slices/users';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import dateFormat from 'dateformat';
import Alert from '@material-ui/lab/Alert';
import Snackbar from '@material-ui/core/Snackbar';
import Fade from '@mui/material/Fade';
import Slide from '@material-ui/core/Slide';
const useStyles = makeStyles((theme) => ({
  tableCell: {
    color: 'black',
    fontWeight: 'bold',
    fontSize: 15,
  },
}));
const CustomTableCell = ({ row, name, id, onChange }) => {
  const classes = useStyles();
  const { isEditMode } = row;
  return (
    <TableCell align="center" className={classes.tableCell}>
      {isEditMode ? (
        <Input value={row[name]} name={name} onChange={(e) => onChange(e, row)} />
      ) : (
        <Link to="/details" className="link_to_details_user">
          {row[name]}
          {row[id]}
        </Link>
      )}
    </TableCell>
  );
};
const ListUsers = (props) => {
  const { user, deleteStatus, poststatus, putstatus } = useSelector((state) => state.users);
  const dispatch = useDispatch();

  const { data } = props;
  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch]);
  useEffect(() => {
    if (deleteStatus === 'succeeded' || poststatus === 'succeeded' || putstatus === 'succeeded')
      dispatch(fetchUsers());
  }, [deleteStatus, poststatus, dispatch]);
  const [rows, setRows] = React.useState(user);

  let formdata = new FormData();
  const [previous, setPrevious] = React.useState({});

  useEffect(() => {
    setRows(user);
  }, [user]);

  const onToggleEditMode = (id) => {
    setRows((state) => {
      return rows.map((row) => {
        if (row._id === id) {
          return { ...row, isEditMode: !row.isEditMode };
        }
        return row;
      });
    });
  };

  const onChange = (e, row) => {
    if (!previous[row.id]) {
      setPrevious((state) => ({ ...state, [row.id]: row }));
    }
    const value = e.target.value;
    const name = e.target.name;
    const { _id } = row;
    const newRows = rows.map((row) => {
      if (row._id === _id) {
        return { ...row, [name]: value };
      }
      return row;
    });
    setRows(newRows);
  };

  const onRevert = (id) => {
    const newRows = rows.map((row) => {
      if (row._id === id) {
        return previous[id] ? previous[id] : row;
      }
      return row;
    });
    setRows(newRows);
    setPrevious((state) => {
      delete state[id];
      return state;
    });
    onToggleEditMode(id);
  };
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };
  const [snackstate, setSnack] = React.useState({
    open: false,
    Transition: Fade,
  });
  const handleClick = (Transition) => () => {
    setSnack({
      open: true,
      Transition,
    });
  };
  setTimeout(() => {}, 3050);
  const handleClosesnack = () => {
    setSnack({
      ...snackstate,
      open: false,
    });
  };
  function SlideTransition(props) {
    return <Slide {...props} direction="down" />;
  }
  const filterObject = (obj, user) => {
    const currentUser = user.find((el) => el._id === obj._id);
    const newCurrentUser = { ...obj };

    if (obj.phone == currentUser.phone) {
      delete newCurrentUser.phone;
    }
    if (obj.email == currentUser.email) {
      delete newCurrentUser.email;
    }
    return newCurrentUser;
  };

  const updateUser = (row) => {
    onToggleEditMode(row._id);
    const newUser = filterObject(row, user);

    dispatch(putUsers(newUser));
  };
  return (
    <>
      <Snackbar
        open={snackstate.open}
        onClose={handleClosesnack}
        transitionDuration={250}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
        autoHideDuration={3000}
      >
        <Alert
          severity={
            deleteStatus === 'succeeded'
              ? 'success'
              : putstatus === 'succeeded'
              ? 'success'
              : 'success'
          }
        >
          {deleteStatus === 'loading'
            ? 'يرجى الانتضار'
            : deleteStatus === 'succeeded'
            ? 'تم ازالة المستعمل بنجاح'
            : putstatus === 'succeeded'
            ? 'تم تعديل معطيات المستعمل بنجاح'
            : ''}
        </Alert>
      </Snackbar>
      <Box
        sx={{
          display: 'flex',
          flexWrap: 'wrap',
          '& > :not(style)': {
            width: '100%',
            height: '100%',
          },
        }}
      >
        <TableContainer>
          <Table>
            <TableHead className="header_table_user">
              <TableRow>
                <TableCell className="id_user"></TableCell>
                <TableCell align="center" className="id_user">
                  المعرف
                </TableCell>
                <TableCell align="center" className="id_user">
                  الصورة
                </TableCell>
                <TableCell align="center" className="id_user">
                  الاسم و&nbsp; اللقب
                </TableCell>
                <TableCell align="center" className="id_user">
                  البريد &nbsp;الالكتروني
                </TableCell>
                <TableCell align="center" className="id_user">
                  الهاتف
                </TableCell>
                <TableCell align="center" className="id_user">
                  {' '}
                  صنع&nbsp; في
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {rows
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row, index) => {
                  formdata.append('fullName', row.fullName);
                  formdata.append('_id', row._id);
                  formdata.append('phone', row.phone);
                  formdata.append('avatar', row.avatar);
                  return (
                    <TableRow
                      key={row._id}
                      className="body_table_user"
                      onClick={() => {
                        dispatch(
                          storedData({
                            id: row._id,
                            image: row.avatar,
                            full_name: row.fullName,
                            tel: row.phone,
                            adresseMail: row.email,
                            createdAt: row.createdAt,
                          })
                        );
                      }}
                    >
                      <TableCell align="right">
                        {row.isEditMode ? (
                          <>
                            <IconButton
                              aria-label="done"
                              onClick={() => {
                                updateUser(row);
                              }}
                            >
                              <DoneIcon onClick={handleClick(SlideTransition)} />
                            </IconButton>
                            <IconButton
                              aria-label="revert"
                              onClick={() => {
                                onRevert(row._id);
                              }}
                            >
                              <RevertIcon />
                            </IconButton>
                          </>
                        ) : (
                          <IconButton
                            aria-label="delete"
                            onClick={() => {
                              onToggleEditMode(row._id);
                            }}
                          >
                            <EditIcon />
                          </IconButton>
                        )}
                        <IconButton
                          onClick={() => {
                            dispatch(deleteUsers(row._id));
                            handleClick(SlideTransition);
                          }}
                        >
                          <DeleteOutlineIcon onClick={handleClick(SlideTransition)} />
                        </IconButton>
                      </TableCell>
                      <TableCell align="center" className="user-id-table">
                        {' '}
                        {row._id}
                      </TableCell>

                      <TableCell className="user_photo">
                        {' '}
                        <img
                          src={row.avatar}
                          alt="photo_users_table"
                          className="photo_users_table"
                        />{' '}
                      </TableCell>
                      <CustomTableCell {...{ row, name: 'fullName', onChange }}> </CustomTableCell>
                      <CustomTableCell {...{ row, name: 'email', onChange }} />
                      <CustomTableCell {...{ row, name: 'phone', onChange }} />

                      <TableCell align="center" className="user-id-table">
                        {' '}
                        {dateFormat(row.createdAt, 'yyyy-mm-dd')}
                      </TableCell>
                    </TableRow>
                  );
                })}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
      <TablePagination
        rowsPerPageOptions={[5, 10, 50]}
        labelRowsPerPage="عدد الصفوف في الصفحة"
        count={rows.length}
        component="div"
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </>
  );
};

export default ListUsers;
