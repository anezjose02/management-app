import React, { useState, useMemo } from 'react';
import { useTable, useSortBy, usePagination } from 'react-table';
import { FaEye, FaEdit, FaFilePdf } from 'react-icons/fa';
import { Button } from 'react-bootstrap';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';


const DataTableComponent = ({ data = [], onEdit, onView }) => {
  const [filters, setFilters] = useState({});

  const columns = useMemo(
    () => [
      { Header: 'ID', accessor: 'cedula' },
      { Header: 'Full Name', accessor: 'nombre' },
      { Header: 'Patron', accessor: 'patrono' },
      { Header: 'Company Name', accessor: 'razonSocial' },
      { Header: 'Phone 1', accessor: 'tel1' },
      { Header: 'Phone 2', accessor: 'tel2' },
      { Header: 'Salary', accessor: 'salario' },
      {
        Header: 'Actions',
        accessor: 'actions',
        disableSortBy: true,
        Cell: ({ row }) => (
          <div style={{ display: 'inline-flex', alignItems: 'center' }}>
            <FaEye
              onClick={() => onView(row.original)}
              style={{ cursor: 'pointer', marginRight: '10px' }}
            />
            <FaEdit
              onClick={() => onEdit(row.original)}
              style={{ cursor: 'pointer', marginRight: '10px' }}
            />
          </div>
        ),
      },
    ],
    [onEdit, onView]
  );

  const filteredData = useMemo(() => {
    if (!Array.isArray(data)) return [];
    return data.filter(row => {
      return columns.every(column => {
        if (column.accessor && filters[column.accessor]) {
          return String(row[column.accessor] || '').toLowerCase().includes(filters[column.accessor].toLowerCase());
        }
        return true;
      });
    });
  }, [data, filters, columns]);

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    page,
    prepareRow,
    canPreviousPage,
    canNextPage,
    pageOptions,
    pageCount,
    gotoPage,
    nextPage,
    previousPage,
    setPageSize,
    state: { pageIndex, pageSize },
  } = useTable(
    { columns, data: filteredData, initialState: { pageIndex: 0, pageSize: 5 } },
    useSortBy,
    usePagination
  );

  const handleExportPDF = () => {
    const doc = new jsPDF();
    const table = document.querySelector('.table');

    if (table) {
      const thead = table.querySelector('thead');
      const actionsColumn = table.querySelectorAll('thead th:nth-last-child(1), tbody td:nth-last-child(1)');
      const filtersRow = table.querySelector('thead tr.filters');

      if (thead) {
        if (filtersRow) filtersRow.style.display = 'none';
      }
      actionsColumn.forEach(cell => cell.style.display = 'none');

      html2canvas(table).then(canvas => {
        const imgData = canvas.toDataURL('image/png');
        doc.addImage(imgData, 'PNG', 10, 10, 190, 0);
        doc.save('data-table.pdf');

        if (thead) {
          if (filtersRow) filtersRow.style.display = '';
        }
        actionsColumn.forEach(cell => cell.style.display = '');
      });
    }
  };

  return (
    <div className="bg-light py-3 py-md-5 mt-5">
      <div className="container">
        <div className="row justify-content-md-center">
          <div className="">
            <div className="bg-white p-4 p-md-5 rounded shadow-sm">
              <div className="d-flex justify-content-end mb-3">
                <Button
                  variant="outline-primary"
                  className="d-flex align-items-center"
                  onClick={handleExportPDF}
                >
                  <FaFilePdf className="me-1" /> Export in PDF
                </Button>
              </div>
              <table {...getTableProps()} className="table table-bordered">
                <thead>
                  <tr className="filters">
                    {headerGroups[0].headers.map(column => (
                      <th
                        key={column.id}
                        className="text-center"
                        style={{ cursor: column.disableSortBy ? 'default' : 'pointer' }}
                      >
                        {column.id !== 'actions' && (
                          <input
                            type="text"
                            value={filters[column.id] || ''}
                            onChange={e =>
                              setFilters({
                                ...filters,
                                [column.id]: e.target.value,
                              })
                            }
                            style={{
                              marginLeft: '10px',
                              width: '80%',
                              boxSizing: 'border-box',
                              borderColor: 'black',
                              borderRadius: '5px',
                              borderWidth: '1px',
                              padding: '2px 5px',
                              fontSize: '0.9rem',
                            }}
                          />
                        )}
                      </th>
                    ))}
                  </tr>
                  <tr>
                    {headerGroups[0].headers.map(column => (
                      <th
                        key={column.id}
                        {...column.getSortByToggleProps()}
                        className="text-center"
                        style={{ cursor: column.disableSortBy ? 'default' : 'pointer' }}
                      >
                        {column.render('Header')}
                        {column.isSorted ? (column.isSortedDesc ? ' 🔽' : ' 🔼') : ''}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody {...getTableBodyProps()}>
                  {page.map(row => {
                    prepareRow(row);
                    return (
                      <tr {...row.getRowProps()} key={row.id}>
                        {row.cells.map(cell => (
                          <td {...cell.getCellProps()} key={cell.column.id} className="text-center">
                            {cell.render('Cell')}
                          </td>
                        ))}
                      </tr>
                    );
                  })}
                </tbody>
              </table>
              <div className="pagination d-flex justify-content-center align-items-center mt-3">
                <Button variant="outline-primary" onClick={() => gotoPage(0)} disabled={!canPreviousPage} className="mx-1">
                  {'<<'}
                </Button>{' '}
                <Button variant="outline-primary" onClick={() => previousPage()} disabled={!canPreviousPage} className="mx-1">
                  {'<'}
                </Button>{' '}
                <Button variant="outline-primary" onClick={() => nextPage()} disabled={!canNextPage} className="mx-1">
                  {'>'}
                </Button>{' '}
                <Button variant="outline-primary" onClick={() => gotoPage(pageCount - 1)} disabled={!canNextPage} className="mx-1">
                  {'>>'}
                </Button>{' '}
                <span className="mx-2">
                  Page{' '}
                  <strong>
                    {pageIndex + 1} de {pageOptions.length}
                  </strong>{' '}
                </span>
                <span className="mx-2">
                  | Show{' '}
                  <select
                    value={pageSize}
                    onChange={e => setPageSize(Number(e.target.value))}
                    style={{ marginLeft: '5px', padding: '5px', borderRadius: '5px', borderColor: 'lightgray' }}
                  >
                    {[5, 10].map(pageSize => (
                      <option key={pageSize} value={pageSize}>
                        {pageSize}
                      </option>
                    ))}
                  </select>{' '}
                  rows per page
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DataTableComponent;
