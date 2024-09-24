import Link from "next/link";
import TexedError from "@/app/components/Button/TextedError";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";

import updateWorkspace from "@/app/lib/workspaces/update";

const listColumns = (setRealoadList, setLoading) => {
  const deleteWorkSpace = async (id, body) => {
    setLoading(true)
    await updateWorkspace(id, body);
    setRealoadList((state) => !state);
  };

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
        <Link href={`/dashboard/workspaces/${data.row.id}`} prefetch={false}>
          {data.row.name}
        </Link>
      ),
    },
    { field: "membersNumber", headerName: "تعداد اعضا", width: 130 },
    {
      field: "usage",
      headerName: "نوع استفاده",
      width: 160,
      valueGetter: (data) => `${data?.row?.usageType?.label || ""}`,
    },
    {
      field: "",
      headerName: "ویرایش",
      width: 70,
      renderCell: (data) => {
        const className = data.targetW && window.innerWidth < data.targetW ? "w-100 text-left" : "w-100 text-center";

        return (
          <Link className={className} href={`/dashboard/workspaces/${data.row.id}`} prefetch={false}>
            <EditIcon />
          </Link>
        );
      },
    },
    {
      field: " ",
      headerName: "حذف",
      width: 70,
      renderCell: (data) => {
        const className = data.targetW && window.innerWidth < data.targetW ? "w-100 text-left" : "w-100 text-center";

        return (
          <TexedError className="p-1" onClick={() => deleteWorkSpace(data.row.id, { status: 0 })}>
            <DeleteIcon />
          </TexedError>
        );
      },
    },
  ];

  return columns;
};

export default listColumns;
