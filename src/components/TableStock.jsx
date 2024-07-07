/* eslint-disable no-unused-vars */
import { Dropdown } from "flowbite-react";
import { IoMdArrowDropdown } from "react-icons/io";
import { FiEdit } from "react-icons/fi";
import { RiDeleteBin2Line } from "react-icons/ri";
import { useState } from "react";
import ModalEditItem from "./ModalEditItem";
import { useCookies } from "react-cookie";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

/* eslint-disable react/prop-types */
export default function TableStocks({ stocks }) {
  const [openModal, setOpenModal] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [cookie] = useCookies(["authToken"]);
  const [itemList, setItemList] = useState(stocks);
  const navigate = useNavigate();

  const handleEditClick = item => {
    setSelectedItem(item);
    setOpenModal(true);
  };

  const handleDeleteItem = async item => {
    try {
      const res = await fetch(
        `https://app.api.elsoft.id/admin/api/v1/data/item/delete?Oid=${item.Oid}`,
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
        setItemList(prevstocks => prevstocks.filter(i => i.Oid !== item.Oid));
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error);
    }
  };

  const handleDetailStock = item => {
    navigate(`/form/stock?item=${item.Oid}`);
  };

  return (
    <div className="rounded-md overflow-hidden">
      <table className="table-auto w-full border-spacing-0.5">
        <thead className="bg-blue-900 text-white text-sm">
          <tr>
            <th className="border-l border border-white py-1.5">Action</th>
            <th className="border-l border border-white py-1.5">No</th>
            <th className="border-l border border-white py-1.5">Company</th>
            <th className="border-l border border-white py-1.5">Code</th>
            <th className="border-l border border-white py-1.5">Date</th>
            <th className="border-l border border-white py-1.5">Account</th>
            <th className="border-l border border-white py-1.5">Status</th>
          </tr>
        </thead>
        <tbody>
          {stocks.map(stock => (
            <tr
              key={stock.Oid}
              className="text-sm odd:bg-neutral-100 font-semibold hover:bg-neutral-200">
              <td className="px-2 py-1 inline-flex justify-center w-full">
                <Dropdown
                  label={
                    <IoMdArrowDropdown className="text-xl text-neutral-700" />
                  }
                  dismissOnClick={false}>
                  <Dropdown.Item
                    onClick={() => handleEditClick(stock)}
                    className="flex gap-2 hover:bg-neutral-100">
                    <span>
                      <FiEdit className="text-sm text-neutral-700" />
                    </span>{" "}
                    Edit Product
                  </Dropdown.Item>
                  <Dropdown.Item
                    onClick={() => handleDeleteItem(stock)}
                    className="flex gap-2 hover:bg-neutral-100">
                    <span>
                      <RiDeleteBin2Line className="text-sm text-neutral-700" />
                    </span>{" "}
                    Delete Product
                  </Dropdown.Item>
                </Dropdown>
              </td>
              <td
                onClick={() => handleDetailStock(stock)}
                className="px-2 py-1 text-center">
                {stock.RowCountNumber}
              </td>
              <td
                onClick={() => handleDetailStock(stock)}
                className="px-2 py-1">
                {stock.CompanyName}
              </td>
              <td
                onClick={() => handleDetailStock(stock)}
                className="px-2 py-1">
                {stock.Code}
              </td>
              <td
                onClick={() => handleDetailStock(stock)}
                className="px-2 py-1 text-center">
                {stock.Date}
              </td>
              <td
                onClick={() => handleDetailStock(stock)}
                className="px-2 py-1">
                {stock.AccountName}
              </td>
              <td
                onClick={() => handleDetailStock(stock)}
                className="px-2 py-1 text-center">
                {stock.StatusName}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {selectedItem && (
        <ModalEditItem
          openModal={openModal}
          setOpenModal={setOpenModal}
          item={selectedItem}
          // items={items}
        />
      )}
    </div>
  );
}
