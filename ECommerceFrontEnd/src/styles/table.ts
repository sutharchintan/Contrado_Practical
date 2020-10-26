/**
 * table styles
 * @param theme 
 */
export const tableStyles = theme => ({
    marginPaddingZero: {
      margin: 0,
      padding: 0
    },
    table: {
      fontFamily: theme.typography.fontFamily,
      position: "relative"
    },
    tableHead: {
      fontWeight: "bold",
      borderRight: "1px solid silver",
      backgroundColor: theme.palette.grey[200],
      paddingLeft: 4,
      paddingRight: 4,
      "&:hover": {
        cursor: "pointer"
      }
    },
    tableHeadReceiver: {
      fontWeight: "bold",
      borderRight: "1px solid silver",
      backgroundColor: "yellow",
      paddingLeft: 4,
      paddingRight: 4,
      "&:hover": {
        cursor: "pointer"
      }
    },
    tableHeadDeliver: {
      fontWeight: "bold",
      borderRight: "1px solid silver",
      backgroundColor: 'orange',
      paddingLeft: 4,
      paddingRight: 4,
      "&:hover": {
        cursor: "pointer"
      }
    },
    tableHeadCompleted: {
      fontWeight: "bold",
      borderRight: "1px solid silver",
      backgroundColor: 'lime',
      paddingLeft: 4,
      paddingRight: 4,
      "&:hover": {
        cursor: "pointer"
      }
    },
    tableHeadCell: {
      fontWeight: "bold",
      "&:hover": {
        color: theme.palette.primary.main
      }
    },
    flexContainer: {
      display: "flex",
      alignItems: "center",
      boxSizing: "border-box"
    },
    tableRow: {
      cursor: "pointer",
      "&:hover": {
        backgroundColor: theme.palette.grey[200]
      }
    },
    tableRowHover: {
      "&:hover": {
        backgroundColor: theme.palette.grey[200]
      }
    },
    tableCell: {
      borderRight: "1px solid silver",
      flex: 1,
      paddingTop: 2,
      paddingBottom: 2,
      paddingLeft: 14,
      paddingRight: 4,
    },
    iconButton: {
      paddingLeft: 2,
      paddingRight: 2,
      paddingBottom: 0,
      paddingTop: 0,
    },
    noClick: {
      cursor: "initial"
    },
    noTextDecoration: {
      textDecoration: 'none',
      color: theme.palette.primary.contrastText
    },
  });
  