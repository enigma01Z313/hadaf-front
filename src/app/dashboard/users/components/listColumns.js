import Link from "next/link";
import EditIcon from "@mui/icons-material/Edit";

const listColumns = () => {
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
      field: "fullName",
      headerName: "نام کامل",
      width: 170,
      renderCell: (data) => (
        <Link href={`/dashboard/users/${data.row.id}`} prefetch={false}>
          {data.row.fullName}
        </Link>
      ),
    },
    {
      field: "phone",
      headerName: "شماره تماس",
      width: 120,
      renderCell: (data) => (
        <Link href={`/dashboard/users/${data.row.id}`} prefetch={false}>
          {data.row.phone}
        </Link>
      ),
    },
    {
      field: "email",
      headerName: "ایمیل",
      width: 220,
      renderCell: (data) => (
        <Link href={`/dashboard/users/${data.row.id}`} prefetch={false}>
          {data.row.email}
        </Link>
      ),
    },
    // {
    //   field: "userCode",
    //   headerName: "کد کاربری",
    //   width: 130,
    // },
    {
      field: "status",
      headerName: "وضعیت",
      width: 110,
      valueGetter: (data) => `${data?.row?.status?.label || ""}`,
    },
    {
      field: "usage",
      headerName: "نوع استفاده",
      width: 160,
      valueGetter: (data) => `${data?.row?.usage?.label || ""}`,
    },
    {
      field: "",
      headerName: "ویرایش",
      width: 70,
      renderCell: (data) => (
        <Link
          className="w-100 text-center"
          href={`/dashboard/users/${data.row.id}`}
          prefetch={false}>
          <EditIcon />
        </Link>
      ),
    },
  ];

  return columns;
};

export default listColumns;
