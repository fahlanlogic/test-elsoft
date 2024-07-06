/* eslint-disable react/prop-types */
import { Button, Checkbox, Label, Modal, TextInput } from "flowbite-react";
import { useState } from "react";
import { useCookies } from "react-cookie";
import toast from "react-hot-toast";

export default function ModalEditItem({
  openModal,
  setOpenModal,
  item,
  items,
}) {
  console.log("ini Oid", item.Oid);
  const [cookie] = useCookies(["authToken"]);
  const [formData, setFormData] = useState({
    Company: item.Company,
    ItemType: item.ItemType,
    Code: item.Code,
    Label: item.Label,
    ItemGroup: item.ItemGroup,
    ItemAccountGroup: item.ItemAccountGroup,
    ItemUnit: item.ItemUnit,
    IsActive: item.IsActive,
  });

  const handleChange = e => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? (checked ? "true" : "false") : value,
    });
  };

  // function yg diperlukan untuk menghapus duplikasi ItemGroup
  const uniqueItemGroups = [...new Set(items.map(item => item.ItemGroup))];

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      const res = await fetch(
        `https://app.api.elsoft.id/admin/api/v1/item/save?Oid=${item.Oid}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${cookie.authToken}`,
          },
          body: JSON.stringify(formData),
        }
      );
      if (!res.ok) {
        const data = res.json();
        return toast.error(data.message || "Fail to add item!");
      }

      toast.success("Item updated successfully!");
      setOpenModal(false);
    } catch (error) {
      console.log(error);
    }
  };

  const onCloseModal = () => {
    setOpenModal(false);
  };

  return (
    <>
      <Modal
        className="font-quicksand"
        show={openModal}
        onClose={onCloseModal}
        popup>
        {openModal && (
          <div className="fixed inset-0 flex items-center justify-center z-50">
            <div className="fixed inset-0 bg-black bg-opacity-50"></div>
            <div className="relative bg-white dark:bg-gray-700 p-4 rounded-lg shadow-lg max-w-2xl w-full z-10">
              <Modal.Header className="px-0 pb-6">
                <span className="text-xl font-bold text-gray-900 dark:text-white">
                  Edit Product
                </span>
              </Modal.Header>
              <Modal.Body>
                <form
                  onSubmit={handleSubmit}
                  className="space-y-6">
                  <div className="flex gap-6">
                    <div className="flex-1 text-sm">
                      <span>Company</span>
                      <p className="font-semibold bg-neutral-100 py-1 px-2 rounded-md mt-2">
                        {item.CompanyName}
                      </p>
                    </div>
                    <div className="flex-1 text-sm">
                      <span>Item Type</span>
                      <p className="font-semibold bg-neutral-100 py-1 px-2 rounded-md mt-2">
                        {item.ItemTypeName}
                      </p>
                    </div>
                  </div>
                  <div className="flex gap-6">
                    <div className="flex-1">
                      <div className="mb-2 block">
                        <Label
                          htmlFor="Code"
                          value="Code/SKU"
                        />
                      </div>
                      <TextInput
                        name="Code"
                        type="text"
                        onChange={handleChange}
                        className="rounded-sm"
                        id="code"
                        defaultValue={item.Code}
                        placeholder="ex. HP/KK/LK/0001"
                        required
                      />
                    </div>
                    <div className="flex-1">
                      <div className="mb-2 block">
                        <Label
                          htmlFor="Label"
                          value="Title"
                        />
                      </div>
                      <TextInput
                        name="Label"
                        type="text"
                        onChange={handleChange}
                        id="Label"
                        defaultValue={item.Label}
                        placeholder="ex. Smartphone"
                        required
                      />
                    </div>
                  </div>
                  <div className="flex gap-6">
                    <div className="flex-1">
                      <div className="mb-2 block">
                        <Label
                          htmlFor="ItemGroup"
                          value="Item Group"
                        />
                      </div>
                      <select
                        className="text-sm rounded-md w-full"
                        name="ItemGroup"
                        id="ItemGroup"
                        onChange={handleChange}
                        defaultValue={formData.ItemGroup}>
                        {uniqueItemGroups.map(itemGroup => {
                          // untuk memetakan agar ItemGroup dengan ItemGroupName sinkron
                          const item = items.find(
                            item => item.ItemGroup === itemGroup
                          );
                          return (
                            <option
                              key={itemGroup}
                              value={itemGroup}>
                              {item ? item.ItemGroupName : itemGroup}
                            </option>
                          );
                        })}
                      </select>
                    </div>
                    <div className="flex-1">
                      <div className="mb-2 block">
                        <Label
                          htmlFor="ItemAccountGroup"
                          value="Item Account Group"
                        />
                      </div>
                      <select
                        className="text-sm rounded-md w-full"
                        name="ItemAccountGroup"
                        id="ItemAccountGroup"
                        value={formData.ItemAccountGroup}
                        onChange={handleChange}>
                        <option value="5daf6a23-472d-4921-9945-57674d5fd1aa">
                          DEFAULT - DEF
                        </option>
                      </select>
                    </div>
                  </div>
                  <div className="flex gap-6 items-center">
                    <div className="max-w-[50%] w-full">
                      <div className="mb-2 block">
                        <Label
                          htmlFor="itemUnit"
                          value="Item Unit"
                        />
                      </div>
                      <select
                        className="rounded-md text-sm"
                        name="ItemUnit"
                        id="ItemUnit"
                        placeholder="ex. PCS/PAX"
                        onChange={handleChange}
                        value="5daf6a23-472d-4921-9945-57674d5fd1aa"
                        required>
                        <option value="5daf6a23-472d-4921-9945-57674d5fd1aa">
                          PCS
                        </option>
                      </select>
                    </div>
                    <div className="flex justify-between max-w-[50%] w-full pt-7">
                      <div className="flex items-center gap-2">
                        <Checkbox
                          id="IsActive"
                          className="w-5 h-5 rounded-md shadow-sm accent-blue-900"
                          name="IsActive"
                          // value="true"
                          checked={formData.IsActive === "true"}
                          onChange={handleChange}
                        />
                        <Label htmlFor="IsActive">Is Active?</Label>
                      </div>
                    </div>
                  </div>
                  <div className="w-full">
                    <Button
                      type="submit"
                      className="w-full bg-gradient-to-b from-blue-800 to-blue-900 text-white font-semibold py-2 px-4 rounded-md hover:opacity-80 shadow-lg duration-300">
                      Save
                    </Button>
                  </div>
                </form>
              </Modal.Body>
            </div>
          </div>
        )}
      </Modal>
    </>
  );
}
