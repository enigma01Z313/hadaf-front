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
      field: "name",
      headerName: "نام",
      width: 170,
      renderCell: (data) => (
        <Link href={`/dashboard/workspaces/${data.row.id}`}>{data.row.name}</Link>
      ),
    },
    { field: "membersNumber", headerName: "تعداد اعضا", width: 130, },
    {
      field: "usage",
      headerName: "نوع استفاده",
      width: 160,
      valueGetter: (data) => `${data?.row?.usageType?.label || ""}`,
    },
  ];

  return columns;
};

export default listColumns;
