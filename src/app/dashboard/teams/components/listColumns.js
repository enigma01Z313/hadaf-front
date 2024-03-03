import Link from "next/link";
import EditIcon from "@mui/icons-material/Edit";
import { format } from "date-fns-jalali-3";
import TexedInherit from "@/app/components/Button/TexedInherit";

const listColumns = (setSingleTeam) => {
  const columns = [
    // {
    //   field: "no",
    //   headerName: "ردیف",
    //   width: 70,
    //   valueGetter: (params) => {
    //     console.log('-----------------------------------');
    //     console.log(params.row);

    //     return `11`;
    //   },
    // },
    {
      field: "name",
      headerName: "نام",
      width: 170,
      renderCell: (data) => data.row.name,
    },
    {
      field: "target",
      headerName: "هدف تیم",
      width: 170,
      renderCell: (data) => data.row.target,
    },
    {
      field: "createdAt",
      headerName: "تاریخ ایجاد",
      width: 170,
      renderCell: (data) => format(new Date(data.row.createdAt), "yyyy/MM/d"),
    },
    {
      field: "",
      headerName: "ویرایش",
      width: 70,
      renderCell: (data) => (
        <TexedInherit onClick={() => setSingleTeam(data.row.id)}>
          <EditIcon />
        </TexedInherit>
      ),
    },
  ];

  return columns;
};

export default listColumns;
