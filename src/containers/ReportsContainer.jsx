import * as React from 'react';
import PropTypes from 'prop-types';
import {
  Box, Table, TableBody, TableCell, TableContainer, TableHead,
  TablePagination, TableRow, TableSortLabel, Toolbar, Typography,
  Paper, Button, IconButton, Grid, Select, MenuItem, InputLabel, FormControl,
  Container,
  Tooltip
} from '@mui/material';
import { visuallyHidden } from '@mui/utils';
import AddIcon from '@mui/icons-material/Add';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import ThumbDownIcon from '@mui/icons-material/ThumbDown';
import { useNavigate } from 'react-router-dom';

const rows = [
  { id: 1, contenido: "sarasa@gmail.com", autor: "Matheo", fecha: "15/06/2024", aprobaciones: 4, tipo: "Email" },
  { id: 2, contenido: "https://www.phishing.com", autor: "Esteban Quito", fecha: "09/03/2024", aprobaciones: 10, tipo: "URL" },
  { id: 3, contenido: "1189765467", autor: "Roberto Gonzalez", fecha: "15/04/2024", aprobaciones: 0, tipo: "Teléfono" },
];

function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) return -1;
  if (b[orderBy] > a[orderBy]) return 1;
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
  { id: 'contenido', numeric: false, disablePadding: false, label: 'Contenido' },
  { id: 'autor', numeric: false, disablePadding: false, label: 'Autor' },
  { id: 'fecha', numeric: false, disablePadding: false, label: 'Fecha' },
  { id: 'aprobaciones', numeric: false, disablePadding: false, label: 'Aprobaciones' },
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
            sx={{ fontWeight: 'bold', color: 'black', fontSize: '1.2rem' }}
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
  const [filter, setFilter] = React.useState('');
  const navigate = useNavigate();
  let valor = true

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

  const handleFilterChange = (event) => {
    setFilter(event.target.value);
    setPage(0);
  };

  const filteredRows = filter
    ? rows.filter((row) => row.tipo === filter)
    : rows;

  const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - filteredRows.length) : 0;

  const visibleRows = React.useMemo(
    () =>
      stableSort(filteredRows, getComparator(order, orderBy)).slice(
        page * rowsPerPage,
        page * rowsPerPage + rowsPerPage,
      ),
    [order, orderBy, page, rowsPerPage, filteredRows],
  );

  return (
    <div className='reports'>
      <Container sx={{ width: '100%', marginTop: 5 }} maxWidth="xl">
        <Grid container alignItems="center" justifyContent="space-between" sx={{ marginBottom: 2 }}>
          <Typography
            variant="h4"
            sx={{ fontWeight: 'bold', color: 'black' }}
          >
            Reportes
          </Typography>

          {
            valor ?
              <Button
                variant='contained'
                size='large'
                onClick={handleCreateReportView}
                endIcon={<AddIcon />}
              >
                Crear reporte
              </Button>
              :
              <Button
                disabled
                variant='contained'
                size='large'
                onClick={handleCreateReportView}
                endIcon={<AddIcon />}
              >
                Crear reporte
              </Button>
          }

        </Grid>
        <Grid container spacing={2} alignItems="center" sx={{ marginBottom: 2 }}>
          <Grid item>
            <FormControl variant="outlined" sx={{ minWidth: 120 }}>
              <InputLabel id="filter-label">Tipo</InputLabel>
              <Select
                labelId="filter-label"
                value={filter}
                onChange={handleFilterChange}
                label="Tipo"
              >
                <MenuItem value="">
                  <em>Todos</em>
                </MenuItem>
                <MenuItem value="Email">Email</MenuItem>
                <MenuItem value="URL">URL</MenuItem>
                <MenuItem value="Teléfono">Teléfono</MenuItem>
              </Select>
            </FormControl>
          </Grid>
        </Grid>
        <Paper sx={{ width: '100%', mb: 2 }}>
          <TableContainer>
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

                  return (
                    <TableRow hover tabIndex={-1} key={row.id}>
                      <TableCell component="th" id={labelId} scope="row" padding="normal">
                        {row.contenido}
                      </TableCell>
                      <TableCell align="center" sx={{ paddingRight: "40px" }}>{row.autor}</TableCell>
                      <TableCell align="center" sx={{ paddingRight: "40px" }}>{row.fecha}</TableCell>
                      <TableCell align="center" sx={{ paddingRight: "40px" }}>{row.aprobaciones}</TableCell>
                      <TableCell align="center" sx={{ paddingRight: "40px" }}>
                        <Tooltip title='Aprobar'>
                        <ThumbUpIcon
                          onClick={() => { console.log('Aprobado') }}
                          sx={{ marginRight: '10px', cursor: 'pointer' }}
                          color='success'
                        />
                        </Tooltip>
                        <Tooltip title='Desaprobar'>
                          <ThumbDownIcon
                            color='error'
                            onClick={() => { console.log('Desaprobado') }}
                            sx={{ cursor: 'pointer' }}
                          />
                        </Tooltip>
                      </TableCell>
                    </TableRow>
                  );
                })}
                {emptyRows > 0 && (
                  <TableRow style={{ height: (53) * emptyRows }}>
                    <TableCell colSpan={6} />
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </TableContainer>
          <TablePagination
            rowsPerPageOptions={[5, 10, 25]}
            component="div"
            count={filteredRows.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </Paper>
      </Container>
    </div>
  );
}
