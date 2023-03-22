// import { useTable, useSortBy, useFilters, usePagination } from "react-table";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faChevronDown, faChevronUp } from "@fortawesome/free-solid-svg-icons";
// import { useMemo } from "react";

// export default function Table({ columns, data }) {

//     const defaultColumn = useMemo(
//         () => ({
//             Filter: TextFilter,
//         }),
//         []
//     );

//     const {
//         getTableProps,
//         getTableBodyProps,
//         headerGroups,
//         state: { pageIndex, pageSize },
//         canPreviousPage,
//         canNextPage,
//         previousPage,
//         nextPage,
//         pageOptions,
//         page,
//         prepareRow,
//     } = useTable(
//         {
//             columns,
//             data,
//             defaultColumn,
//         },
//         useFilters,
//         useSortBy,
//         usePagination
//     );

//     function TextFilter({
//         column: { filterValue, preFilteredRows, setFilter },
//     }) {
//         const count = preFilteredRows.length;

//         return (
//             <input
//                 type = "number"
//                 value={filterValue || ""}
//                 onChange={(e) => {
//                     setFilter(e.target.value || undefined);
//                 }}
//                 className="border-gray-300 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-300 focus:border-indigo-500 dark:focus:border-indigo-600 focus:ring-indigo-500 dark:focus:ring-indigo-600 rounded-md shadow-sm mt-1 block"
//                 placeholder={`Filter Records...`}
//             />
//         );
//     }

//     function Pagination({
//         canPreviousPage,
//         canNextPage,
//         previousPage,
//         nextPage,
//         pageOptions,
//         pageIndex,
//     }) {
//         return (
//             <div>
//                 <button
//                     className="m-3"
//                     onClick={() => previousPage()}
//                     disabled={!canPreviousPage}
//                 >
//                     Previous
//                 </button>{" "}
//                 <button
//                     className="m-3"
//                     onClick={() => nextPage()}
//                     disabled={!canNextPage}
//                 >
//                     Next
//                 </button>
//                 <div>
//                     Showing{" "}
//                     <em>
//                         {pageIndex + 1} /{" "}
//                         {pageOptions.length == 0 ? 1 : pageOptions.length}
//                     </em>{" "}
//                     Page
//                 </div>
//             </div>
//         );
//     }
    
//     return (
//         <>
//             <table className="w-full table-auto" {...getTableProps()}>
//                 <thead>
//                     {headerGroups.map((headerGroup) => (
//                         <tr {...headerGroup.getHeaderGroupProps()}>
//                             {headerGroup.headers.map((column) => (
//                                 <th
//                                     {...column.getHeaderProps(
//                                         column.getSortByToggleProps()
//                                     )}
//                                 >
//                                     {column.render("Header")}
//                                     <div onClick={(e) => e.stopPropagation()}>
//                                         {column.canFilter
//                                             ? column.render("Filter")
//                                             : null}
//                                     </div>
//                                     <span>
//                                         {column.isSorted ? (
//                                             column.isSortedDesc ? (
//                                                 <FontAwesomeIcon
//                                                     icon={faChevronDown}
//                                                 />
//                                             ) : (
//                                                 <FontAwesomeIcon
//                                                     icon={faChevronUp}
//                                                 />
//                                             )
//                                         ) : (
//                                             ""
//                                         )}
//                                     </span>
//                                 </th>
//                             ))}
//                         </tr>
//                     ))}
//                 </thead>
//                 <tbody {...getTableBodyProps()}>
//                     {page.map((row) => {
//                         prepareRow(row);
//                         return (
//                             <tr {...row.getRowProps()}>
//                                 {row.cells.map((cell) => {
//                                     return (
//                                         <td {...cell.getCellProps()}>
//                                             {cell.render("Cell")}
//                                         </td>
//                                     );
//                                 })}
//                             </tr>
//                         );
//                     })}
//                 </tbody>
//             </table>
//             <Pagination
//                 canPreviousPage={canPreviousPage}
//                 canNextPage={canNextPage}
//                 previousPage={previousPage}
//                 nextPage={nextPage}
//                 pageOptions={pageOptions}
//                 pageIndex={pageIndex}
//             />
//         </>
//     );
// }