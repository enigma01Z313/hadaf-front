import Link from "next/link";
import EditIcon from "@mui/icons-material/Edit";
import ApartmentIcon from "@mui/icons-material/Apartment";

import TexedInherit from "@/app/components/Button/TexedInherit";
import TexedError from "@/app/components/Button/TextedError";
import TextedInfo from "@/app/components/Button/TextedInfo";

const listColumns = (
  setSingleUserId,
  adminAccess,
  handleActivate,
  handleDeactivate,
  isOwner
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

  if (adminAccess || isOwner) {
    columns.push({
      field: "",
      headerName: "ویرایش",
      width: 70,
      renderCell: (data) => {
        const className =
          data.targetW && window.innerWidth < data.targetW
            ? "w-100 text-left"
            : "w-100 text-center";

        return (
          <Link
            className={className}
            href={`/dashboard/users/${data.row.id}`}
            prefetch={false}
          >
            <TexedInherit>
              <EditIcon />
            </TexedInherit>
          </Link>
        );
      },
    });
  }

  if (adminAccess) {
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
  }

  if (adminAccess || isOwner) {
    columns.push({
      field: "  ",
      headerName: "عملیات",
      mobileDisableHeader: true,
      width: 120,
      renderCell: (data) => {
        const className =
          data.targetW && window.innerWidth < data.targetW
            ? "w-100 justify-center"
            : "";

        return (
          (data.row?.workspaceStatus?.code === 0 && (
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
    });
  }

  return columns;
};

export default listColumns;
