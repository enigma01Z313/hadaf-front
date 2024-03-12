import Link from "next/link";
import EditIcon from "@mui/icons-material/Edit";
import { format } from "date-fns-jalali-3";
import TexedInherit from "@/app/components/Button/TexedInherit";
import TexedError from "@/app/components/Button/TextedError";
import TextedInfo from "@/app/components/Button/TextedInfo";

const listColumns = (setSingleTeam, handleActivate, handleDeactivate) => {
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
      renderCell: (data) => (
        <span
          style={{
            opacity: data.row.status.code === 0 ? ".5" : 1,
            textDecoration:
              data.row.status.code === 0 ? "line-through" : "none",
          }}
        >
          {data.row.name}
        </span>
      ),
    },
    {
      field: "target",
      headerName: "هدف تیم",
      width: 170,
      renderCell: (data) => (
        <span
          style={{
            opacity: data.row.status.code === 0 ? ".5" : 1,
            textDecoration:
              data.row.status.code === 0 ? "line-through" : "none",
          }}
        >
          {data.row.target}
        </span>
      ),
    },
    {
      field: "createdAt",
      headerName: "تاریخ ایجاد",
      width: 170,
      renderCell: (data) => (
        <span
          style={{
            opacity: data.row.status.code === 0 ? ".5" : 1,
            textDecoration:
              data.row.status.code === 0 ? "line-through" : "none",
          }}
        >
          {format(new Date(data.row.createdAt), "yyyy/MM/d")}
        </span>
      ),
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
    {
      field: " ",
      headerName: "عملیات",
      width: 120,
      mobileDisableHeader: true,
      renderCell: (data) => {
        const className =
          data.targetW && window.innerWidth < data.targetW
            ? "w-100 justify-center"
            : "";

        return (
          (data.row.status.code === 0 && (
            <TextedInfo
              className={`${className}`}
              onClick={() => handleActivate(data.row.id)}
            >
              فعال کردن
            </TextedInfo>
          )) || (
            <TexedError
              className={`${className}`}
              onClick={() => handleDeactivate(data.row.id)}
            >
              غیر فعلا کردن
            </TexedError>
          )
        );
      },
    },
  ];

  return columns;
};

export default listColumns;
