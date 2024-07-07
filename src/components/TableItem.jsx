/* eslint-disable no-unused-vars */
import { Dropdown } from "flowbite-react";
import { IoMdArrowDropdown } from "react-icons/io";
import { FiEdit } from "react-icons/fi";
import { RiDeleteBin2Line } from "react-icons/ri";
import { useState } from "react";
import ModalEditItem from "./ModalEditItem";
import { useCookies } from "react-cookie";
import toast from "react-hot-toast";

/* eslint-disable react/prop-types */
export default function TableItem({ items }) {
  const [openModal, setOpenModal] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [cookie] = useCookies(["authToken"]);
  const [itemList, setItemList] = useState(items);

  const handleEditClick = item => {
    setSelectedItem(item);
    setOpenModal(true);
  };

  const handleDeleteItem = async item => {
    try {
      const res = await fetch(
        `https://app.api.elsoft.id/admin/api/v1/data/item/${item.Oid}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${cookie.authToken}`,
          },
        }
      );
      const data = res.json();
      if (res.ok) {
        toast.success("Item deleted successfully");
        setItemList(prevItems => prevItems.filter(i => i.Oid !== item.Oid));
        setTimeout(() => {
          window.location.reload();
        }, 2000);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error);
    }
  };

  return (
    <div className="rounded-md overflow-hidden">
      <table className="table-auto w-full border-spacing-0.5">
        <thead className="bg-blue-900 text-white text-sm">
          <tr>
            <th className="border-l border border-white py-1.5">Action</th>
            <th className="border-l border border-white py-1.5">Title</th>
            <th className="border-l border border-white py-1.5">Company</th>
            <th className="border-l border border-white py-1.5">Code</th>
            <th className="border-l border border-white py-1.5">Item Group</th>
            <th className="border-l border border-white py-1.5">Is Active</th>
            <th className="border-l border border-white py-1.5">Balance</th>
          </tr>
        </thead>
        <tbody>
          {items.map(item => (
            <tr
              key={item.Oid}
              className="text-sm odd:bg-neutral-100 font-semibold">
              <td className="px-2 py-1 inline-flex justify-center w-full">
                <Dropdown
                  label={
                    <IoMdArrowDropdown className="text-xl text-neutral-700" />
                  }
                  dismissOnClick={false}>
                  <Dropdown.Item
                    onClick={() => handleEditClick(item)}
                    className="flex gap-2 hover:bg-neutral-100">
                    <span>
                      <FiEdit className="text-sm text-neutral-700" />
                    </span>{" "}
                    Edit Product
                  </Dropdown.Item>
                  <Dropdown.Item
                    onClick={() => handleDeleteItem(item)}
                    className="flex gap-2 hover:bg-neutral-100">
                    <span>
                      <RiDeleteBin2Line className="text-sm text-neutral-700" />
                    </span>{" "}
                    Delete Product
                  </Dropdown.Item>
                </Dropdown>
              </td>
              <td className="px-2 py-1">{item.Label}</td>
              <td className="px-2 py-1">{item.CompanyName}</td>
              <td className="px-2 py-1">{item.Code}</td>
              <td className="px-2 py-1">{item.ItemGroupName}</td>
              <td className="px-2 py-1 text-center ">{item.IsActive}</td>
              <td className="px-2 py-1">{item.BalanceAmount}</td>
            </tr>
          ))}
        </tbody>
      </table>
      {selectedItem && (
        <ModalEditItem
          openModal={openModal}
          setOpenModal={setOpenModal}
          item={selectedItem}
          items={items}
        />
      )}
    </div>
  );
}
