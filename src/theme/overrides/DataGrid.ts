import { Theme } from '@mui/material/styles';

// ----------------------------------------------------------------------

export default function DataGrid(theme: Theme) {
  return {
    MuiDataGrid: {
      styleOverrides: {
        root: {
          border: `1px solid transparent`,
          '& .MuiTablePagination-root': {
            borderTop: 0,
          },
          '.MuiDataGrid-columnSeparator': {
            display: 'none',
          },
          '&.MuiDataGrid-root': {
            border: 'none',
          },
          '& .MuiDataGrid-columnHeaders': {
            color: theme.palette.text.secondary,
            borderBottom: 'none',
            marginLeft: theme.spacing(1),
            marginRight: theme.spacing(1),
            borderRadius: 8,
          },
          '& .MuiDataGrid-columnHeader--sorted': {
            color: theme.palette.text.primary,
          },
          '& .MuiDataGrid-cell:focus-within, & .MuiDataGrid-cell:focus': {
            outline: 'none',
          },
          '& .MuiDataGrid-columnHeader:focus-within, & .MuiDataGrid-columnHeader:focus': {
            outline: 'none',
          },
          '& .MuiDataGrid-toolbarContainer': {
            padding: theme.spacing(2),
            backgroundColor: theme.palette.background.paper,
            '& .MuiButton-root': {
              marginRight: theme.spacing(1.5),
              color: theme.palette.text.primary,
              '&:hover': {
                backgroundColor: theme.palette.action.hover,
              },
            },
          },
          '& .MuiDataGrid-cell, .MuiDataGrid-columnsContainer': {
            borderBottom: 'none',
            paddingLeft: 0,
          },
          '& .MuiDataGrid-columnSeparator': {
            color: theme.palette.divider,
          },
          '& .MuiDataGrid-columnHeader[data-field="__check__"]': {
            padding: 0,
          },
          '& .MuiDataGrid-columnHeader': {
            backgroundColor: theme.palette.background.neutral,
            padding: 0,
          },
          '& .MuiDataGrid-row': {
            paddingLeft: theme.spacing(1),
            paddingRight: theme.spacing(1),
          },
          '& .MuiDataGrid-row.Mui-selected': {
            backgroundColor: `${theme.palette.grey[500_16]} !important`,
          },
        },
      },
      defaultProps: {
        rowHeight: 72,
        autoHeight: true,
        checkboxSelection: true,
        disableColumnMenu: true,
        disableSelectionOnClick: true,
        hideFooterSelectedRowCount: true,
        componentsProps: {
          toolbar: {
            csvOptions: { disableToolbarButton: true },
            showQuickFilter: true,
            quickFilterProps: { debounceMs: 500 },
          },
        },
      },
    },
    MuiGridMenu: {
      styleOverrides: {
        root: {
          '& .MuiDataGrid-gridMenuList': {
            boxShadow: theme.customShadows.z20,
            borderRadius: theme.shape.borderRadius,
          },
          '& .MuiMenuItem-root': {
            ...theme.typography.body2,
          },
        },
      },
    },
    MuiGridFilterForm: {
      styleOverrides: {
        root: {
          padding: theme.spacing(1.5, 0),
          '& .MuiFormControl-root': {
            margin: theme.spacing(0, 0.5),
          },
          '& .MuiInput-root': {
            marginTop: theme.spacing(3),
            '&::before, &::after': {
              display: 'none',
            },
            '& .MuiNativeSelect-select, .MuiInput-input': {
              ...theme.typography.body2,
              padding: theme.spacing(0.75, 1),
              borderRadius: theme.shape.borderRadius,
              backgroundColor: theme.palette.background.neutral,
            },
            '& .MuiSvgIcon-root': {
              right: 4,
            },
          },
        },
      },
    },
    MuiGridPanelFooter: {
      styleOverrides: {
        root: {
          padding: theme.spacing(2),
          justifyContent: 'flex-end',
          '& .MuiButton-root': {
            '&:first-of-type': {
              marginRight: theme.spacing(1.5),
              color: theme.palette.text.primary,
              '&:hover': {
                backgroundColor: theme.palette.action.hover,
              },
            },
            '&:last-of-type': {
              color: theme.palette.common.white,
              backgroundColor: theme.palette.primary.main,
              '&:hover': {
                backgroundColor: theme.palette.primary.dark,
              },
            },
          },
        },
      },
    },
  };
}
