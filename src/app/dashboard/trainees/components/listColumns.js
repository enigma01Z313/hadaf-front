import Link from "next/link";
import EditIcon from "@mui/icons-material/Edit";
import ApartmentIcon from "@mui/icons-material/Apartment";

import TexedInherit from "@/app/components/Button/TexedInherit";
import TexedError from "@/app/components/Button/TextedError";
import TextedInfo from "@/app/components/Button/TextedInfo";

const listColumns = (
  setSingleUserId,
) => {
  const columns = [
    {
      field: "fullName",
      headerName: "نام کامل",
      width: 170,
      renderCell: (data) => (
        <Link
          href={`/dashboard/users/${data.row.id}`}
          prefetch={false}
          style={{
            opacity: data.row?.workspaceStatus?.code === 0 ? ".5" : 1,
            textDecoration:
              data.row?.workspaceStatus?.code === 0 ? "line-through" : "none",
          }}
        >
          {data.row.fullName}
        </Link>
      ),
    },
    {
      field: "phone",
      headerName: "شماره تماس",
      width: 120,
      renderCell: (data) => (
        <Link
          href={`/dashboard/users/${data.row.id}`}
          prefetch={false}
          style={{
            opacity: data.row?.workspaceStatus?.code === 0 ? ".5" : 1,
            textDecoration:
              data.row?.workspaceStatus?.code === 0 ? "line-through" : "none",
          }}
        >
          {data.row.phone}
        </Link>
      ),
    },
    {
      field: "email",
      headerName: "ایمیل",
      width: 220,
      renderCell: (data) => (
        <Link
          href={`/dashboard/users/${data.row.id}`}
          prefetch={false}
          style={{
            opacity: data.row?.workspaceStatus?.code === 0 ? ".5" : 1,
            textDecoration:
              data.row?.workspaceStatus?.code === 0 ? "line-through" : "none",
          }}
        >
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
  ];

  columns.push({
    field: " ",
    headerName: "لیست فضاهای کاری",
    width: 130,
    renderCell: (data) => {
      const className =
        data.targetW && window.innerWidth < data.targetW
          ? "w-100 justify-end"
          : "w-100 justify-center";

      return (
        <TexedInherit
          className={className}
          onClick={() => setSingleUserId(data.row.id)}
        >
          <ApartmentIcon />
        </TexedInherit>
      );
    },
  });

  return columns;
};

export default listColumns;
