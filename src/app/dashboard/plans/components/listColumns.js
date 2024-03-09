import Link from "next/link";
import EditIcon from "@mui/icons-material/Edit";
import { format } from "date-fns-jalali-3";
import TexedInherit from "@/app/components/Button/TexedInherit";
import TexedError from "@/app/components/Button/TextedError";
import TextedInfo from "@/app/components/Button/TextedInfo";

import formatReadableNumber from "@/app/utils/formatNumber";

const listColumns = (setSingleTeam, handleActivate, handleDeactivate) => {
  const columns = [
    {
      field: "id",
      headerName: "",
      width: 20,
      renderCell: (data) => <span></span>,
    },
    {
      field: "name",
      headerName: "نام پلن",
      width: 100,
      renderCell: (data) => (
        <span
          style={{
            opacity: data.row?.status?.code === 0 ? ".5" : 1,
            textDecoration:
              data.row?.status?.code === 0 ? "line-through" : "none",
          }}
        >
          {data.row.name}
        </span>
      ),
    },
    {
      field: "duration",
      headerName: "مدت پلن",
      width: 100,
      renderCell: (data) => (
        <span
          style={{
            opacity: data.row?.status?.code === 0 ? ".5" : 1,
            textDecoration:
              data.row?.status?.code === 0 ? "line-through" : "none",
          }}
        >
          {data.row.duration}
        </span>
      ),
    },
    {
      field: "freeDays",
      headerName: "مدت رایگان پلن",
      width: 140,
      renderCell: (data) => (
        <span
          style={{
            opacity: data.row?.status?.code === 0 ? ".5" : 1,
            textDecoration:
              data.row?.status?.code === 0 ? "line-through" : "none",
          }}
        >
          {data.row.freeDays}
        </span>
      ),
    },
    {
      field: "amount",
      headerName: "قیمت",
      width: 170,
      renderCell: (data) => (
        <span
          style={{
            opacity: data.row?.status?.code === 0 ? ".5" : 1,
            textDecoration:
              data.row?.status?.code === 0 ? "line-through" : "none",
          }}
        >
          {formatReadableNumber(data.row.amount)} تومان
        </span>
      ),
    },

    {
      field: "createdAt",
      headerName: "تاریخ ایجاد",
      width: 140,
      renderCell: (data) => (
        <span
          style={{
            opacity: data.row?.status?.code === 0 ? ".5" : 1,
            textDecoration:
              data.row?.status?.code === 0 ? "line-through" : "none",
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
      headerName: "نمایش برای کاربر",
      width: 150,
      renderCell: (data) =>
        (data.row.salable?.code === 0 && (
          <TextedInfo onClick={() => handleActivate(data.row.id)}>
            نمایش در لیست
          </TextedInfo>
        )) || (
          <TexedError onClick={() => handleDeactivate(data.row.id)}>
            عدم نمایش در لیست
          </TexedError>
        ),
    },
  ];

  return columns;
};

export default listColumns;
