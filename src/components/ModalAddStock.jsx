import { Button, Label, Modal, TextInput } from "flowbite-react";
import { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import toast from "react-hot-toast";
import { TiPlus } from "react-icons/ti";

export default function ModalAddStock(stocks) {
  const [cookie] = useCookies(["authToken"]);
  const [openModal, setOpenModal] = useState(false);
  const [formData, setFormData] = useState({
    Company: "d3170153-6b16-4397-bf89-96533ee149ee",
    CompanyName: "testcase",
    Code: "",
    Date: "",
    Account: "",
    AccountName: "",
    Note: "",
  });
  console.log(formData);

  useEffect(() => {
    if (stocks.stocks) {
      const fetchAccountStocks = async () => {
        try {
          const res = await fetch(
            "https://app.api.elsoft.id/admin/api/v1/stockissue/list",
            {
              method: "GET",
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${cookie.authToken}`,
              },
            }
          );

          const data = await res.json();
          setFormData({
            ...formData,
            Account: data.data[0].Account,
            AccountName: data.data[0].AccountName,
          });
        } catch (error) {
          console.log(error);
        }
      };

      fetchAccountStocks();
    }
  }, [cookie.authToken]);

  const handleChange = e => {
    const { name, value } = e.target;
    setFormData(prevFormData => {
      const updatedFormData = { ...prevFormData, [name]: value };
      if (name === "AccountName") {
        const selectedAccount = stocks.stocks.find(
          stockAccount => stockAccount.AccountName === value
        );
        if (selectedAccount) {
          updatedFormData.Account = selectedAccount.Account;
        }
      }
      return updatedFormData;
    });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      const res = await fetch(
        "https://app.api.elsoft.id/admin/api/v1/stockissue",
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
        return toast.error(data.message || "Fail to add stock!");
      }

      toast.success("Stock added successfully!");
    } catch (error) {
      console.log(error);
    }
  };

  const onCloseModal = () => {
    setOpenModal(false);
  };

  return (
    <>
      <Button
        className="bg-gradient-to-b px-2 rounded-md shadow-md from-blue-800 to-blue-900 text-white h-fit py-0.5 w-fit text-sm font-medium hover:translate-x-[2px] hover:translate-y-[2px] duration-300"
        onClick={() => setOpenModal(true)}>
        <TiPlus className="font-medium" /> Add Stock
      </Button>
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
                  Add Stock
                </span>
              </Modal.Header>
              <Modal.Body>
                <form
                  onSubmit={handleSubmit}
                  className="space-y-6">
                  <div className="flex-1 text-sm">
                    <span>Company</span>
                    <p className="font-semibold bg-neutral-100 py-1 px-2 rounded-md mt-2">
                      {formData.CompanyName}
                    </p>
                  </div>

                  <div className="flex gap-6">
                    <div className="flex-1">
                      <div className="mb-2 block">
                        <Label
                          htmlFor="Code"
                          value="Code"
                        />
                      </div>
                      <TextInput
                        name="Code"
                        type="text"
                        onChange={handleChange}
                        className="rounded-sm"
                        defaultValue="<<AutoGenerate>>"
                        id="Code"
                        placeholder="ex. 0001"
                        required
                      />
                    </div>
                    <div className="flex-1">
                      <div className="mb-2 block">
                        <Label
                          htmlFor="Date"
                          value="Date"
                        />
                      </div>
                      <TextInput
                        name="Date"
                        type="date"
                        onChange={handleChange}
                        id="Date"
                        required
                      />
                    </div>
                  </div>
                  <div className="flex gap-6">
                    <div className="flex-1">
                      <div className="mb-2 block">
                        <Label
                          htmlFor="AccountName"
                          value="Account"
                        />
                      </div>
                      <select
                        className="text-sm rounded-md w-full"
                        name="AccountName"
                        id="AccountName"
                        onChange={handleChange}
                        value={formData.AccountName}>
                        {stocks.stocks.map(stockAccount => {
                          return (
                            <option
                              key={stockAccount.Oid}
                              value={stockAccount.AccountName}>
                              {stockAccount.AccountName}
                            </option>
                          );
                        })}
                      </select>
                    </div>
                  </div>
                  <div>
                    <div className="mb-2">
                      <Label
                        htmlFor="Note"
                        value="Note"
                      />
                    </div>
                    <textarea
                      name="Note"
                      id="Note"
                      onChange={handleChange}
                      value={formData.Note}
                      className="w-full rounded-md"></textarea>
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
