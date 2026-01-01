import React, { useState, useMemo } from 'react';
import { 
  FiChevronUp, 
  FiChevronDown, 
  FiChevronsLeft, 
  FiChevronsRight, 
  FiChevronLeft, 
  FiChevronRight,
  FiSearch,
  FiFilter,
  FiDownload,
  FiEye,
  FiEdit,
  FiTrash2
} from 'react-icons/fi';

const DataTable = ({ 
  columns, 
  data, 
  onRowClick, 
  actions = [], 
  keyField = 'id',
  searchable = false,
  exportable = false,
  onExport,
  loading = false,
  selectable = false,
  onSelectionChange,
  title,
  className = ''
}) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [sortConfig, setSortConfig] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedRows, setSelectedRows] = useState(new Set());

  // Filter data based on search term
  const filteredData = useMemo(() => {
    if (!searchTerm) return data;
    
    return data.filter(item => 
      columns.some(column => {
        const value = item[column.key];
        if (typeof value === 'string') {
          return value.toLowerCase().includes(searchTerm.toLowerCase());
        }
        if (typeof value === 'number') {
          return value.toString().includes(searchTerm);
        }
        return false;
      })
    );
  }, [data, searchTerm, columns]);

  // Sort data
  const sortedData = useMemo(() => {
    const sortableData = [...filteredData];
    if (sortConfig) {
      sortableData.sort((a, b) => {
        const aValue = a[sortConfig.key];
        const bValue = b[sortConfig.key];
        
        if (aValue < bValue) {
          return sortConfig.direction === 'ascending' ? -1 : 1;
        }
        if (aValue > bValue) {
          return sortConfig.direction === 'ascending' ? 1 : -1;
        }
        return 0;
      });
    }
    return sortableData;
  }, [filteredData, sortConfig]);

  // Handle sort
  const handleSort = (key) => {
    let direction = 'ascending';
    if (sortConfig && sortConfig.key === key && sortConfig.direction === 'ascending') {
      direction = 'descending';
    }
    setSortConfig({ key, direction });
  };

  // Pagination logic
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = sortedData.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(sortedData.length / itemsPerPage);

  // Handle row selection
  const handleSelectRow = (itemId, checked) => {
    const newSelected = new Set(selectedRows);
    if (checked) {
      newSelected.add(itemId);
    } else {
      newSelected.delete(itemId);
    }
    setSelectedRows(newSelected);
    onSelectionChange?.(Array.from(newSelected));
  };

  // Handle select all
  const handleSelectAll = (checked) => {
    if (checked) {
      const allIds = currentItems.map(item => item[keyField]);
      setSelectedRows(new Set(allIds));
      onSelectionChange?.(allIds);
    } else {
      setSelectedRows(new Set());
      onSelectionChange?.([]);
    }
  };

  // Generate page numbers to display
  const getPageNumbers = () => {
    const pages = [];
    const maxPagesToShow = 5;
    
    if (totalPages <= maxPagesToShow) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      if (currentPage <= 3) {
        for (let i = 1; i <= 4; i++) pages.push(i);
        pages.push('...');
        pages.push(totalPages);
      } else if (currentPage >= totalPages - 2) {
        pages.push(1);
        pages.push('...');
        for (let i = totalPages - 3; i <= totalPages; i++) pages.push(i);
      } else {
        pages.push(1);
        pages.push('...');
        for (let i = currentPage - 1; i <= currentPage + 1; i++) pages.push(i);
        pages.push('...');
        pages.push(totalPages);
      }
    }
    
    return pages;
  };

  // Default actions if none provided but onRowClick exists
  const defaultActions = onRowClick ? [
    {
      label: 'View',
      icon: FiEye,
      handler: onRowClick,
      color: 'bg-blue-500 hover:bg-blue-600 text-white'
    }
  ] : [];

  const displayActions = actions.length > 0 ? actions : defaultActions;

  return (
    <div className={`bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-200 ${className}`}>
      {/* Table Header with Controls */}
      {(title || searchable || exportable || selectable) && (
        <div className="px-6 py-4 bg-gradient-to-r from-indigo-50 via-purple-50 to-pink-50 border-b border-gray-200 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          {/* Title and selection info */}
          <div className="flex items-center space-x-4">
            {title && (
              <h3 className="text-lg font-bold text-gray-800">{title}</h3>
            )}
            {selectable && selectedRows.size > 0 && (
              <span className="text-sm text-indigo-600 font-medium">
                {selectedRows.size} selected
              </span>
            )}
          </div>

          {/* Controls */}
          <div className="flex items-center space-x-3 flex-wrap gap-2">
            {/* Search */}
            {searchable && (
              <div className="relative">
                <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                <input
                  type="text"
                  placeholder="Search..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-white w-48"
                />
              </div>
            )}

            {/* Export button */}
            {exportable && (
              <button
                onClick={() => onExport?.(sortedData)}
                className="flex items-center space-x-2 px-4 py-2 border border-green-500 text-green-600 rounded-lg hover:bg-green-50 transition-colors"
              >
                <FiDownload size={16} />
                <span className="text-sm font-medium">Export</span>
              </button>
            )}
          </div>
        </div>
      )}

      {/* Table wrapper */}
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          {/* Table header */}
          <thead className="bg-gradient-to-r from-indigo-50 via-purple-50 to-pink-50">
            <tr>
              {/* Select all checkbox */}
              {selectable && (
                <th className="w-12 px-4 py-4">
                  <input
                    type="checkbox"
                    checked={currentItems.length > 0 && selectedRows.size === currentItems.length}
                    onChange={(e) => handleSelectAll(e.target.checked)}
                    className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                  />
                </th>
              )}

              {columns.map((column) => (
                <th
                  key={column.key}
                  className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider cursor-pointer hover:bg-purple-100 transition-colors group"
                  onClick={() => column.sortable !== false && handleSort(column.key)}
                >
                  <div className="flex items-center space-x-2">
                    <span>{column.title}</span>
                    {column.sortable !== false && (
                      <div className="flex flex-col opacity-50 group-hover:opacity-100 transition-opacity">
                        {sortConfig?.key === column.key ? (
                          sortConfig.direction === 'ascending' ? (
                            <FiChevronUp className="text-indigo-600" size={16} />
                          ) : (
                            <FiChevronDown className="text-indigo-600" size={16} />
                          )
                        ) : (
                          <div className="flex flex-col -space-y-1">
                            <FiChevronUp size={12} className="text-gray-400" />
                            <FiChevronDown size={12} className="text-gray-400" />
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                </th>
              ))}
              
              {displayActions.length > 0 && (
                <th className="px-6 py-4 text-right text-xs font-bold text-gray-700 uppercase tracking-wider w-32">
                  Actions
                </th>
              )}
            </tr>
          </thead>

          {/* Table body */}
          <tbody className="bg-white divide-y divide-gray-200">
            {loading ? (
              // Loading state
              <tr>
                <td 
                  colSpan={columns.length + (displayActions.length > 0 ? 1 : 0) + (selectable ? 1 : 0)} 
                  className="px-6 py-12 text-center"
                >
                  <div className="flex flex-col items-center justify-center space-y-3">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
                    <p className="text-gray-500 font-medium">Loading data...</p>
                  </div>
                </td>
              </tr>
            ) : currentItems.length === 0 ? (
              // Empty state
              <tr>
                <td 
                  colSpan={columns.length + (displayActions.length > 0 ? 1 : 0) + (selectable ? 1 : 0)} 
                  className="px-6 py-12 text-center"
                >
                  <div className="flex flex-col items-center justify-center space-y-3">
                    <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center">
                      <svg className="w-8 h-8 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
                      </svg>
                    </div>
                    <p className="text-gray-500 font-medium">
                      {searchTerm ? 'No results found for your search' : 'No data available'}
                    </p>
                    {searchTerm && (
                      <button
                        onClick={() => setSearchTerm('')}
                        className="text-indigo-600 hover:text-indigo-700 font-medium"
                      >
                        Clear search
                      </button>
                    )}
                  </div>
                </td>
              </tr>
            ) : (
              currentItems.map((item, idx) => (
                <tr 
                  key={item[keyField]} 
                  className={`hover:bg-gradient-to-r hover:from-indigo-50 hover:to-purple-50 cursor-pointer transition-all duration-200 group ${
                    idx % 2 === 0 ? 'bg-white' : 'bg-gray-50/50'
                  } ${selectedRows.has(item[keyField]) ? 'bg-indigo-50 border-l-4 border-l-indigo-500' : ''}`}
                  onClick={() => onRowClick && onRowClick(item)}
                >
                  {/* Row selection checkbox */}
                  {selectable && (
                    <td className="px-4 py-4 whitespace-nowrap" onClick={(e) => e.stopPropagation()}>
                      <input
                        type="checkbox"
                        checked={selectedRows.has(item[keyField])}
                        onChange={(e) => handleSelectRow(item[keyField], e.target.checked)}
                        className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                      />
                    </td>
                  )}

                  {columns.map((column) => (
                    <td 
                      key={`${item[keyField]}-${column.key}`} 
                      className="px-6 py-4 text-sm text-gray-900 whitespace-nowrap group-hover:text-gray-900"
                    >
                      {column.render ? column.render(item) : item[column.key]}
                    </td>
                  ))}
                  
                  {displayActions.length > 0 && (
                    <td className="px-6 py-4 text-sm text-right whitespace-nowrap" onClick={(e) => e.stopPropagation()}>
                      <div className="flex justify-end space-x-2">
                        {displayActions.map((action, actionIdx) => {
                          const IconComponent = action.icon;
                          return (
                            <button
                              key={actionIdx}
                              onClick={(e) => {
                                e.stopPropagation();
                                action.handler(item);
                              }}
                              className={`flex items-center space-x-1 px-3 py-2 rounded-lg font-medium transition-all duration-200 transform hover:scale-105 hover:shadow-lg ${
                                action.color || 'bg-indigo-500 text-white hover:bg-indigo-600'
                              }`}
                              title={action.label}
                            >
                              {IconComponent && <IconComponent size={14} />}
                              <span>{action.label}</span>
                            </button>
                          );
                        })}
                      </div>
                    </td>
                  )}
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="px-6 py-4 bg-gradient-to-r from-gray-50 to-gray-100 border-t border-gray-200 flex flex-col sm:flex-row items-center justify-between gap-4">
          {/* Results info */}
          <div className="flex items-center space-x-4 flex-wrap gap-2">
            <p className="text-sm text-gray-700">
              Showing <span className="font-bold text-indigo-600">{indexOfFirstItem + 1}</span> to{' '}
              <span className="font-bold text-indigo-600">{Math.min(indexOfLastItem, sortedData.length)}</span> of{' '}
              <span className="font-bold text-indigo-600">{sortedData.length}</span> results
              {searchTerm && (
                <span className="text-gray-500 ml-2">
                  (filtered from {data.length} total)
                </span>
              )}
            </p>
            
            {/* Items per page selector */}
            <select
              value={itemsPerPage}
              onChange={(e) => {
                setItemsPerPage(Number(e.target.value));
                setCurrentPage(1);
              }}
              className="px-3 py-1.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-white"
            >
              <option value={5}>5 per page</option>
              <option value={10}>10 per page</option>
              <option value={25}>25 per page</option>
              <option value={50}>50 per page</option>
              <option value={100}>100 per page</option>
            </select>
          </div>

          {/* Pagination controls */}
          <div className="flex items-center space-x-2">
            {/* First page */}
            <button
              onClick={() => setCurrentPage(1)}
              disabled={currentPage === 1}
              className="p-2 rounded-lg border border-gray-300 text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-all hover:shadow-md"
              title="First page"
            >
              <FiChevronsLeft size={18} />
            </button>

            {/* Previous page */}
            <button
              onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
              disabled={currentPage === 1}
              className="p-2 rounded-lg border border-gray-300 text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-all hover:shadow-md"
              title="Previous page"
            >
              <FiChevronLeft size={18} />
            </button>

            {/* Page numbers */}
            <div className="flex items-center space-x-1">
              {getPageNumbers().map((page, idx) => (
                page === '...' ? (
                  <span key={`ellipsis-${idx}`} className="px-3 py-2 text-gray-500">
                    ...
                  </span>
                ) : (
                  <button
                    key={page}
                    onClick={() => setCurrentPage(page)}
                    className={`min-w-[2.5rem] px-3 py-2 rounded-lg text-sm font-medium transition-all ${
                      currentPage === page
                        ? 'bg-gradient-to-r from-blue-500/50 to-blue-600/50 text-white shadow-lg scale-110'
                        : 'bg-white border border-gray-300 text-gray-700 hover:bg-gray-50 hover:shadow-md'
                    }`}
                  >
                    {page}
                  </button>
                )
              ))}
            </div>

            {/* Next page */}
            <button
              onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
              disabled={currentPage === totalPages}
              className="p-2 rounded-lg border border-gray-300 text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-all hover:shadow-md"
              title="Next page"
            >
              <FiChevronRight size={18} />
            </button>

            {/* Last page */}
            <button
              onClick={() => setCurrentPage(totalPages)}
              disabled={currentPage === totalPages}
              className="p-2 rounded-lg border border-gray-300 text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-all hover:shadow-md"
              title="Last page"
            >
              <FiChevronsRight size={18} />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default DataTable;