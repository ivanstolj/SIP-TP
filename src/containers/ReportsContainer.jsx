import * as React from 'react';
import PropTypes from 'prop-types';
import {
  Box, Table, TableBody, TableCell, TableContainer, TableHead,
  TablePagination, TableRow, TableSortLabel, Typography,
  Paper, Button, Grid, Drawer, List, ListItem, Divider,
  Container, Tooltip, IconButton, MenuItem, FormControl, InputLabel, Select, TextField, Skeleton, Stack
} from '@mui/material';
import { visuallyHidden } from '@mui/utils';
import AddIcon from '@mui/icons-material/Add';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import ThumbDownIcon from '@mui/icons-material/ThumbDown';
import FilterListIcon from '@mui/icons-material/FilterList';
import { Link, useNavigate } from 'react-router-dom';
import ContextoAuth from '../Context/AuthContext';
import { useEffect } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import Toastify from 'toastify-js';
import "toastify-js/src/toastify.css";
import './ReportsContainer.css';

function descendingComparator(a, b, orderBy) {
  let aValue = a[orderBy];
  let bValue = b[orderBy];

  if (orderBy === 'username') {
    aValue = a.user.username;
    bValue = b.user.username;
  }

  if (bValue < aValue) return -1;
  if (bValue > aValue) return 1;
  return 0;
}


function getComparator(order, orderBy) {
  return order === 'desc'
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

function stableSort(array, comparator) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });
  return stabilizedThis.map((el) => el[0]);
}

const headCells = [
  { id: 'content', numeric: true, disablePadding: false, label: 'Contenido' },
  { id: 'pretends', numeric: false, disablePadding: false, label: 'Simula ser' },
  { id: 'username', numeric: false, disablePadding: false, label: 'Usuario Autor' },
  { id: 'date', numeric: false, disablePadding: false, label: 'Fecha' },
  { id: 'likes', numeric: false, disablePadding: false, label: 'Aprobaciones' },
  { id: 'dislikes', numeric: false, disablePadding: false, label: 'Desaprobaciones' },
  { id: 'acciones', numeric: false, disablePadding: false, label: 'Acciones' },
];

function EnhancedTableHead(props) {
  const { order, orderBy, onRequestSort } = props;
  const createSortHandler = (property) => (event) => {
    onRequestSort(event, property);
  };

  return (
    <TableHead>
      <TableRow>
        {headCells.map((headCell) => (
          <TableCell
            key={headCell.id}
            align={headCell.numeric ? 'left' : 'center'}
            padding={headCell.disablePadding ? 'none' : 'normal'}
            sortDirection={orderBy === headCell.id ? order : false}
            sx={{ fontWeight: 'bold', color: '#424242', fontSize: '1rem' }}
          >
            <TableSortLabel
              active={orderBy === headCell.id}
              direction={orderBy === headCell.id ? order : 'asc'}
              onClick={createSortHandler(headCell.id)}
            >
              {headCell.label}
              {orderBy === headCell.id ? (
                <Box component="span" sx={visuallyHidden}>
                  {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                </Box>
              ) : null}
            </TableSortLabel>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}

EnhancedTableHead.propTypes = {
  onRequestSort: PropTypes.func.isRequired,
  order: PropTypes.oneOf(['asc', 'desc']).isRequired,
  orderBy: PropTypes.string.isRequired,
};

export default function EnhancedTable() {
  const [order, setOrder] = React.useState('asc');
  const [orderBy, setOrderBy] = React.useState('contenido');
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const [rows, setRows] = React.useState([]);
  const [filterType, setFilterType] = React.useState('');
  const [filterPretends, setFilterPretends] = React.useState('');
  const [minLikes, setMinLikes] = React.useState('');
  const [maxLikes, setMaxLikes] = React.useState('');
  const [drawerOpen, setDrawerOpen] = React.useState(false);
  const [filters, setFilters] = React.useState({
    type: '',
    pretends: '',
    minLikes: '',
    maxLikes: ''
  });
  const [loading, setLoading] = React.useState(false);

  const navigate = useNavigate();
  const { isLogged, user } = React.useContext(ContextoAuth);


  const handleLike = async (id, content) => {
    Swal.fire({
      title: "¿Confirmar Acción?",
      text: "Esto aprobará el reporte.",
      icon: "info",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Confirmar",
      cancelButtonText: "Cancelar"
    }).then(async (result) => {
      if (result.isConfirmed) {
        const token = localStorage.getItem('token').replace(/^"|"$/g, '');
        try {
          const response = await axios.put(`https://backendseminario.onrender.com/reports/like`, { reportId: id, userId: user._id, content: content, email: user.email }, {
            headers: {
              'x-access-token': token
            }
          });
          console.log(response);
          // Actualiza el estado de los reportes
          setRows(prevRows => prevRows.map(row => {
            if (row._id === id) {
              const isDisliked = row.dislikesBy.includes(user._id);
              return {
                ...row,
                likes: row.likes + 1,
                likesBy: [...row.likesBy, user._id],
                dislikes: isDisliked ? row.dislikes - 1 : row.dislikes,
                dislikesBy: isDisliked ? row.dislikesBy.filter(uid => uid !== user._id) : row.dislikesBy
              };
            }
            return row;
          }));
          Swal.fire({
            title: "¡Listo!",
            text: "El reporte ha sido aprobado.",
            icon: "success"
          });
        } catch (e) {
          console.log(e);
          Toastify({
            text: "Ha habido un error. Por favor, inténtelo de nuevo.",
            style: {
              background: "red",
            },
            duration: "3000",
            close: true,
          }).showToast();
        }
      }
    });
  };

  const handleDislike = async (id, content) => {
    Swal.fire({
      title: "¿Confirmar Acción?",
      text: "Esto desaprobará el reporte.",
      icon: "info",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Confirmar",
      cancelButtonText: "Cancelar"
    }).then(async (result) => {
      if (result.isConfirmed) {
        const token = localStorage.getItem('token').replace(/^"|"$/g, '');
        try {
          const response = await axios.put(`https://backendseminario.onrender.com/reports/dislike`, { reportId: id, userId: user._id, content: content, email: user.email }, {
            headers: {
              'x-access-token': token
            }
          });
          console.log(response);
          // Actualiza el estado de los reportes
          setRows(prevRows => prevRows.map(row => {
            if (row._id === id) {
              const isLiked = row.likesBy.includes(user._id);
              return {
                ...row,
                dislikes: row.dislikes + 1,
                dislikesBy: [...row.dislikesBy, user._id],
                likes: isLiked ? row.likes - 1 : row.likes,
                likesBy: isLiked ? row.likesBy.filter(uid => uid !== user._id) : row.likesBy
              };
            }
            return row;
          }));
          Swal.fire({
            title: "¡Listo!",
            text: "El reporte ha sido desaprobado.",
            icon: "success"
          });
        } catch (e) {
          console.log(e);
          Toastify({
            text: "Ha habido un error. Por favor, inténtelo de nuevo.",
            style: {
              background: "red",
            },
            duration: "3000",
            close: true,
          }).showToast();
        }
      }
    });
  };



  useEffect(() => {
    async function fetchData() {
      const response = await axios.get('https://backendseminario.onrender.com/reports');
      setRows(response.data.data.docs);
      setLoading(false);
    }
    setLoading(true);
    fetchData();
  }, []);

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };


  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleCreateReportView = () => {
    navigate('/reportes/crearReporte');
  };

  const handleFilterTypeChange = (event) => {
    setFilterType(event.target.value);
  };

  const handleFilterPretendsChange = (event) => {
    setFilterPretends(event.target.value);
  };

  const handleMinLikesChange = (event) => {
    const value = event.target.value;
    setMinLikes(value < 0 ? 0 : value);
  };

  const handleMaxLikesChange = (event) => {
    const value = event.target.value;
    setMaxLikes(value < 0 ? 0 : value);
  };

  const applyFilters = () => {
    setFilters({
      type: filterType,
      pretends: filterPretends,
      minLikes: minLikes,
      maxLikes: maxLikes
    });
    setDrawerOpen(false);
  };

  const resetFilters = () => {
    setFilterType('');
    setFilterPretends('');
    setMinLikes('');
    setMaxLikes('');
    setFilters({
      type: '',
      pretends: '',
      minLikes: '',
      maxLikes: ''
    });
    setPage(0);
    setDrawerOpen(false);
  };

  const toggleDrawer = (open) => (event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }
    setDrawerOpen(open);
  };

  const filteredRows = rows.filter((row) => {
    return (
      (!filters.type || row.type === filters.type) &&
      (!filters.pretends || row.pretends === filters.pretends) &&
      (!filters.minLikes || row.likes >= filters.minLikes) &&
      (!filters.maxLikes || row.likes <= filters.maxLikes)
    );
  });

  const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - filteredRows.length) : 0;

  const visibleRows = React.useMemo(
    () =>
      stableSort(filteredRows, getComparator(order, orderBy)).slice(
        page * rowsPerPage,
        page * rowsPerPage + rowsPerPage,
      ),
    [order, orderBy, page, rowsPerPage, filteredRows],
  );


  const formatDateTime = (isoString) => {
    const date = new Date(isoString);

    const options = {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour12: false,
    };

    const formattedDate = new Intl.DateTimeFormat('es-ES', options).format(date);

    return formattedDate.replace(',', 'HS');
  };

  const list = () => (
    <Box
      sx={{ width: 250 }}
      role="presentation"
    >
      <List>
        <ListItem>
          <Typography variant="h6">Filtros</Typography>
        </ListItem>
        <Divider />
        <ListItem>
          <FormControl variant="outlined" sx={{ width: '100%' }}>
            <InputLabel id="filter-type-label">Tipo</InputLabel>
            <Select
              labelId="filter-type-label"
              value={filterType}
              onChange={handleFilterTypeChange}
              label="Tipo"
              sx={{ backgroundColor: 'white', borderRadius: 1 }}
            >
              <MenuItem value="">
                <em>Todos</em>
              </MenuItem>
              <MenuItem value="Email">Email</MenuItem>
              <MenuItem value="URL">URL</MenuItem>
              <MenuItem value="Teléfono">Teléfono</MenuItem>
            </Select>
          </FormControl>
        </ListItem>
        <ListItem>
          <FormControl variant="outlined" sx={{ width: '100%' }}>
            <InputLabel id="filter-pretends-label">Simula ser</InputLabel>
            <Select
              labelId="filter-pretends-label"
              value={filterPretends}
              onChange={handleFilterPretendsChange}
              label="Simula ser"
              sx={{ backgroundColor: 'white', borderRadius: 1 }}
            >
              <MenuItem value="">
                <em>Todos</em>
              </MenuItem>
              <MenuItem value="Ecommerce">Ecommerce</MenuItem>
              <MenuItem value="Entidad Bancaria">Entidad Bancaria</MenuItem>
              <MenuItem value="Compañía telefónica">Compañía telefónica</MenuItem>
              <MenuItem value="Servicio de Correo">Servicio de Correo</MenuItem>
              <MenuItem value="Otros">Otros</MenuItem>
            </Select>
          </FormControl>
        </ListItem>
        <ListItem>
          <TextField
            label="Valoraciones mínimas"
            type="number"
            variant="outlined"
            value={minLikes}
            onChange={handleMinLikesChange}
            sx={{ width: '100%' }}
          />
        </ListItem>
        <ListItem>
          <TextField
            label="Valoraciones máximas"
            type="number"
            variant="outlined"
            value={maxLikes}
            onChange={handleMaxLikesChange}
            sx={{ width: '100%' }}
          />
        </ListItem>
        <ListItem>
          <Button
            variant="contained"
            color="primary"
            sx={{ width: '100%', mt: 2 }}
            onClick={applyFilters}
          >
            Aplicar filtros
          </Button>
        </ListItem>
        <ListItem>
          <Button
            variant="contained"
            color="secondary"
            sx={{ width: '100%', mt: 2 }}
            onClick={resetFilters}
          >
            Reiniciar filtros
          </Button>
        </ListItem>
      </List>
    </Box>
  );


  return (
    <div className='reports'>
      <Container sx={{ width: '100%', marginTop: 5, backgroundColor: '#f5f5f5', padding: 4, borderRadius: 2 }} maxWidth="xl">
        <Grid container alignItems="center" justifyContent="space-between" sx={{ marginBottom: 2 }}>
          <Typography variant="h4" sx={{ fontWeight: 'bold', color: '#3f51b5' }}>
            Reportes
          </Typography>
          <Box>
            <IconButton
              edge="end"
              color="inherit"
              aria-label="open drawer"
              onClick={toggleDrawer(true)}
              sx={{ marginRight: 2 }}
            >
              <FilterListIcon />
            </IconButton>
            <Button
              variant='contained'
              size='large'
              onClick={handleCreateReportView}
              endIcon={<AddIcon />}
              disabled={!isLogged}
              sx={{ backgroundColor: '#724ae8', color: 'white', '&:hover': { backgroundColor: '#6f5da5' } }}
            >
              Crear reporte
            </Button>
          </Box>
        </Grid>
        <Drawer anchor='right' open={drawerOpen} onClose={toggleDrawer(false)}>
          {list()}
        </Drawer>
        <Paper sx={{ width: '100%', mb: 2, mt: 2 }}>
          <TableContainer>
            {
              loading ? <Stack spacing={1}>
                <Skeleton variant="text" sx={{ fontSize: '5rem' }} />
                <Skeleton variant="rectangular" height={60} sx={{ width: '95%', alignSelf: 'center' }} />
                <Skeleton variant="rectangular" height={60} sx={{ width: '95%', alignSelf: 'center' }} />
                <Skeleton variant="rectangular" height={60} sx={{ width: '95%', alignSelf: 'center' }} />
                <Skeleton variant="rectangular" height={60} sx={{ width: '95%', alignSelf: 'center' }} />
                <Skeleton variant="rectangular" height={60} sx={{ width: '95%', alignSelf: 'center' }} />
              </Stack> :
                <Table sx={{ minWidth: 750 }} aria-labelledby="tableTitle">
                  <EnhancedTableHead
                    order={order}
                    orderBy={orderBy}
                    onRequestSort={handleRequestSort}
                    rowCount={filteredRows.length}
                  />
                  <TableBody>
                    {visibleRows.map((row, index) => {
                      const labelId = `enhanced-table-checkbox-${index}`;
                      const userLiked = user && row.likesBy && row.likesBy.includes(user._id);
                      const userDisliked = user && row.dislikesBy && row.dislikesBy.includes(user._id);

                      return (
                        <TableRow hover tabIndex={-1} key={row.id}>
                          <TableCell component="th" id={labelId} scope="row" padding="normal">
                            {row.content}
                          </TableCell>
                          <TableCell align="center" sx={{ paddingRight: "40px" }}>{row.pretends}</TableCell>
                          <TableCell align="center" sx={{ paddingRight: "40px" }}> {row.user.username}</TableCell>
                          <TableCell align="center" sx={{ paddingRight: "40px" }}>{formatDateTime(row.date)}</TableCell>
                          <TableCell align="center" sx={{ paddingRight: "40px" }}>{row.likes}</TableCell>
                          <TableCell align="center" sx={{ paddingRight: "40px" }}>{row.dislikes}</TableCell>
                          {
                            user ?
                              row.user._id === user._id ?
                                <TableCell align="center" sx={{ paddingRight: "40px" }}>
                                  <Typography variant="body2" sx={{ fontWeight: 'bold' }}>Reporte propio</Typography>
                                </TableCell> :
                                <TableCell align="center" sx={{ paddingRight: "40px" }}>
                                  <Tooltip title={userLiked ? 'Ya aprobado' : 'Aprobar'}>
                                    <ThumbUpIcon
                                      onClick={!userLiked ? () => { handleLike(row._id, row.content) } : null}
                                      sx={{ marginRight: '10px', cursor: userLiked ? 'not-allowed' : 'pointer' }}
                                      color={userLiked ? 'disabled' : 'success'}
                                    />
                                  </Tooltip>
                                  <Tooltip title={userDisliked ? 'Ya desaprobado' : 'Desaprobar'}>
                                    <ThumbDownIcon
                                      color={userDisliked ? 'disabled' : 'error'}
                                      onClick={!userDisliked ? () => { handleDislike(row._id, row.content) } : null}
                                      sx={{ cursor: userDisliked ? 'not-allowed' : 'pointer' }}
                                    />
                                  </Tooltip>
                                </TableCell> :
                              <TableCell align="center" sx={{ paddingRight: "40px" }}>
                                <Typography variant="body2" sx={{ fontWeight: 'bold' }}><Link to="/login" className="linkLogin">Inicie sesión</Link> para poder aprobar<br></br> o desaprobar reportes</Typography>
                              </TableCell>
                          }
                        </TableRow>
                      );
                    })}
                  </TableBody>

                </Table>
            }

          </TableContainer>
          <TablePagination
            rowsPerPageOptions={[5, 10, 25]}
            component="div"
            count={filteredRows.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
            sx={{ backgroundColor: '#f5f5f5', borderTop: '1px solid #e0e0e0' }}
          />
        </Paper>
      </Container>
    </div>
  );
}
