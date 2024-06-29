import * as React from 'react';
import PropTypes from 'prop-types';
import {
    Box, Table, TableBody, TableCell, TableContainer, TableHead,
    TablePagination, TableRow, TableSortLabel, Typography,
    Paper, Button, Grid, Drawer, List, ListItem, Divider,
    Container, IconButton, MenuItem, FormControl, InputLabel, Select
} from '@mui/material';
import { visuallyHidden } from '@mui/utils';
import AddIcon from '@mui/icons-material/Add';
import FilterListIcon from '@mui/icons-material/FilterList';
import { useNavigate } from 'react-router-dom';
import ContextoAuth from '../../Context/AuthContext';
import "toastify-js/src/toastify.css";
import { CSVLink } from "react-csv";
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import ContextoReports from '../../Context/PersonalReportsContext';
import Swal from 'sweetalert2';
import axios from 'axios';
import Toastify from 'toastify-js';
import "toastify-js/src/toastify.css";

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
    { id: 'content', numeric: true, disablePadding: false, label: 'Contenido' },
    { id: 'pretends', numeric: false, disablePadding: false, label: 'Simula ser' },
    { id: 'date', numeric: false, disablePadding: false, label: 'Fecha' },
    { id: 'likes', numeric: false, disablePadding: false, label: 'Aprobaciones' },
    { id: 'actions', numeric: false, disablePadding: false, label: 'Eliminar' },
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
    const [filter, setFilter] = React.useState('');
    const [drawerOpen, setDrawerOpen] = React.useState(false);
    const navigate = useNavigate();
    const { isLogged, user } = React.useContext(ContextoAuth);
    const { MyReports } = React.useContext(ContextoReports)

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

    const handleDelete = async (id, content) => {
        Swal.fire({
            title: "¿Confirmar Acción?",
            text: "Esto eliminará el reporte.",
            icon: "info",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Confirmar",
            cancelButtonText: "Cancelar"
        }).then(async (result) => {
            if (result.isConfirmed) {
                try {
                    const token = localStorage.getItem('token').replace(/^"|"$/g, '');
                    const response = await axios.delete('https://backendseminario.onrender.com/reports/', {
                        headers: {
                            'x-access-token': token
                        },
                        data: {
                            reportId: id,
                            email: user.email,
                            content: content,
                            username: user.username
                        }
                    });
                    console.log(response);
                    Swal.fire({
                        title: "¡Listo!",
                        text: "El reporte ha sido eliminado.",
                        icon: "success"
                    }).then(() => window.location.reload());
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
    }

    const toggleDrawer = (open) => (event) => {
        if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
            return;
        }
        setDrawerOpen(open);
    };

    const filteredRows = filter
        ? MyReports.filter((report) => report.type === filter)
        : MyReports;

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
            onClick={toggleDrawer(false)}
            onKeyDown={toggleDrawer(false)}
        >
            <List>
                <ListItem>
                    <Typography variant="h6">Filtros</Typography>
                </ListItem>
                <Divider />
                <ListItem>
                    <FormControl variant="outlined" sx={{ width: '100%' }}>
                        <InputLabel id="filter-label">Tipo</InputLabel>
                        <Select
                            labelId="filter-label"
                            value={filter}
                            onChange={handleFilterChange}
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
                <Typography variant="h6">Que simula</Typography>

                <ListItem>
                    <FormControl variant="outlined" sx={{ width: '100%' }}>
                        <InputLabel id="filter-label">Tipo</InputLabel>
                        <Select
                            labelId="filter-label"
                            value={filter}
                            onChange={handleFilterChange}
                            label="Tipo"
                            sx={{ backgroundColor: 'white', borderRadius: 1 }}
                        >
                            <MenuItem value="">
                                <em>Todos</em>
                            </MenuItem>
                            <MenuItem value="Ecommerce">Ecommerce</MenuItem>
                            <MenuItem value="Servicio de Correo">Servicio de Correo</MenuItem>
                            <MenuItem value="Entidad Bancaria">Entidad Bancaria</MenuItem>
                            <MenuItem value="Compañía telefónica">Compañía telefónica</MenuItem>
                            <MenuItem value="Otros">Otros</MenuItem>
                        </Select>
                    </FormControl>
                </ListItem>
            </List>
        </Box>
    );

    const csvData = visibleRows.map(row => ({
        Contenido: row.content,
        'Simula ser': row.pretends,
        Fecha: formatDateTime(row.date),
        Aprobaciones: row.likes
    }));

    return (
        <div className='reports'>
            <Container sx={{ width: '100%', marginTop: 5, backgroundColor: '#f5f5f5', padding: 4, borderRadius: 2 }} maxWidth="xl">
                <Grid container alignItems="center" justifyContent="space-between" sx={{ marginBottom: 2 }}>
                    <Typography variant="h4" sx={{ fontWeight: 'bold', color: '#3f51b5' }}>
                        Mis Reportes
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
                            sx={{ backgroundColor: '#3f51b5', color: 'white', '&:hover': { backgroundColor: '#303f9f' } }}
                        >
                            Crear reporte
                        </Button>
                        <CSVLink data={csvData} filename={"reports.csv"} style={{ textDecoration: 'none' }}>
                            <Button
                                variant='contained'
                                size='large'
                                sx={{ backgroundColor: '#3f51b5', color: 'white', '&:hover': { backgroundColor: '#303f9f' }, marginLeft: 2 }}
                            >
                                Exportar CSV
                            </Button>
                        </CSVLink>
                    </Box>
                </Grid>
                <Drawer anchor='right' open={drawerOpen} onClose={toggleDrawer(false)}>
                    {list()}
                </Drawer>
                <Paper sx={{ width: '100%', mb: 2, mt: 2 }}>
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
                                                {row.content}
                                            </TableCell>
                                            <TableCell align="center" sx={{ paddingRight: "40px" }}>{row.pretends}</TableCell>
                                            <TableCell align="center" sx={{ paddingRight: "40px" }}>{formatDateTime(row.date)}</TableCell>
                                            <TableCell align="center" sx={{ paddingRight: "40px" }}>{row.likes}</TableCell>
                                            <TableCell align="center" sx={{ paddingRight: "40px" }}><Button onClick={() => handleDelete(row._id, row.content)}><DeleteForeverIcon sx={{ color: 'red' }} /></Button></TableCell>
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
                        sx={{ backgroundColor: '#f5f5f5', borderTop: '1px solid #e0e0e0' }}
                    />
                </Paper>
            </Container>
        </div>
    );
}
