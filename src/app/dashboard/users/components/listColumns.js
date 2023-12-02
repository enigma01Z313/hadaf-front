import Link from "next/link";

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
        <Link href={`/dashboard/users/${data.row.id}`}>{data.row.fullName}</Link>
      ),
    },
    { field: "phone", headerName: "شماره تماس", width: 130,
    renderCell: (data) => (
      <Link href={`/dashboard/users/${data.row.id}`}>{data.row.phone}.</Link>
    ), },
    { field: "email", headerName: "ایمیل", width: 130,
    renderCell: (data) => (
      <Link href={`/dashboard/users/${data.row.id}`}>{data.row.email}.</Link>
    ), },
    {
      field: "userCode",
      headerName: "کد کاربری",
      width: 130,
    },
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
  ];

  return columns;
};

export default listColumns;
