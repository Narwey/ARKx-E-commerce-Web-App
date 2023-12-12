import {
  DataGrid,
  GridColDef,
  GridToolbar,
} from "@mui/x-data-grid";
import "./dataTable.scss";
import { Link } from "react-router-dom";
import { useMutation, useQueryClient } from "@tanstack/react-query";

type Props = {
  columns: GridColDef[];
  rows: object[];
  slug: string;
}

const DataTable = (props: Props) => {

  // TEST THE API

  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: (id: number) => {
      return fetch(`http://localhost:4000/v1/${props.slug}/${id}`, {
        method: "delete",
      });
    },
    onError: (error: any) => {
      console.error('Error deleting item:', error);
    },
    onSuccess: ()=>{
      queryClient.invalidateQueries([`all${props.slug}`]);
    }
  });

  const handleDelete = (id: number) => {
    //delete the item
    mutation.mutate(id)
  };

  const actionColumn = {
    field: "action",
    headerName: "Action",
    width: 100,
    renderCell: (params) => {
      return (
          <div className="action">
            {props.slug !== "customers" ? (
            <Link to={`/${props.slug}/${params.row._id}`}>
              <img src="/view.svg" alt="View" />
            </Link>  ) : null}
            
            <div className="delete" onClick={() => handleDelete(params.row._id)}>
            {props.slug !== "orders" ? (
              <img src="/delete.svg" alt="Delete" />
              ) : null}
            </div>
          </div>
      );
    }
  };

  return (
    <div className="dataTable">
      <DataGrid getRowId={(row) => row._id}
        className="dataGrid"
        rows={props.rows}
        columns={[...props.columns, actionColumn]}
        initialState={{
          pagination: {
            paginationModel: {
              pageSize: 10,
            },
          },
        }}
        slots={{ toolbar: GridToolbar }}
        slotProps={{
          toolbar: {
            showQuickFilter: true,
            quickFilterProps: { debounceMs: 500 },
          },
        }}
        pageSizeOptions={[10]}
        // checkboxSelection
        disableRowSelectionOnClick
        disableDensitySelector
        disableColumnSelector
      />
    </div>
  );
};

export default DataTable;
