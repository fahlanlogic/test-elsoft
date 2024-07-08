import { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import toast from "react-hot-toast";

export default function EditStockForm(detailStock) {
  const stock = detailStock.detailStock;
  const [cookie] = useCookies(["authToken"]);
  const [isEditing, setIsEditing] = useState(false);
  const [editedStock, setEditedStock] = useState({});
  const [originalStock, setOriginalStock] = useState(stock);
  const [stocks, setStocks] = useState([]);
  // console.log(editedStock);

  useEffect(() => {
    // update editedStock dan originalStock setelah stock terinisialisasi
    if (stock && stock.Oid) {
      setEditedStock({
        Oid: stock.Oid,
        Company: stock.Company,
        CompanyName: stock.CompanyName,
        Code: stock.Code || "",
        Date: stock.Date || "",
        Account: stock.Account || "",
        AccountName: stock.AccountName || "",
        Status: stock.Status,
        StatusName: stock.StatusName,
        Note: stock.Note || "",
      });
      setOriginalStock(stock);
    }
  }, [stock]);

  useEffect(() => {
    const fetchStock = async () => {
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
        setStocks(data.data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchStock();
  }, [cookie.authToken]);

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleSaveClick = async () => {
    if (isEditing) {
      try {
        const response = await fetch(
          `https://app.api.elsoft.id/admin/api/v1/stockissue/${stock.Oid}`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${cookie.authToken}`,
            },
            body: JSON.stringify(editedStock),
          }
        );
        // console.log(editedStock);
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        setOriginalStock(stock);
        setIsEditing(false);
        toast.success("Stock has been updated successfully");
      } catch (error) {
        toast.error("Failed to save changes:", error);
      }
    } else {
      setOriginalStock({ ...editedStock });
    }

    setIsEditing(!isEditing);
  };

  const handleInputChange = event => {
    const { name, value } = event.target;
    // mencocokan Account dengan AccountName
    if (name === "AccountName") {
      const selectedAccount = stocks.find(stock => stock.AccountName === value);
      setEditedStock(prevState => ({
        ...prevState,
        AccountName: value,
        Account: selectedAccount ? selectedAccount.Account : "",
      }));
    } else {
      setEditedStock(prevState => ({
        ...prevState,
        [name]: value,
      }));
    }
  };

  const handleCancelClick = () => {
    setEditedStock(originalStock); // kembalikan ke originalStock
    setIsEditing(false);
  };

  return (
    <>
      {stock && (
        <form
          onSubmit={handleSaveClick}
          className="space-y-6">
          <div className="flex justify-between w-full gap-6">
            <div className="flex-1">
              <h1 className="mb-1">Company</h1>
              <p className="bg-neutral-50 px-2 py-1 rounded-md font-bold">
                {detailStock.detailStock.CompanyName}
              </p>
            </div>
            <div className="flex-1">
              <h1 className="mb-1">Code</h1>
              {isEditing ? (
                <input
                  placeholder={stock.Code}
                  type="text"
                  className="block w-full p-1.5 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  name="Code"
                  value={editedStock.Code}
                  onChange={handleInputChange}
                />
              ) : (
                <p className="font-bold">{detailStock.detailStock.Code}</p>
              )}
            </div>
          </div>
          <div className="flex justify-between w-full gap-6">
            <div className="flex-1">
              <h1 className="mb-1">Date</h1>
              {isEditing ? (
                <input
                  type="date"
                  className="block w-full p-1.5 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  name="Date"
                  value={editedStock.Date}
                  onChange={handleInputChange}
                />
              ) : (
                <p className="font-bold">{detailStock.detailStock.Date}</p>
              )}
            </div>
            <div className="flex-1">
              <h1 className="mb-1">Account</h1>
              {isEditing ? (
                <select
                  className="text-sm rounded-md w-full"
                  name="AccountName"
                  id="AccountName"
                  onChange={handleInputChange}
                  value={editedStock.AccountName}>
                  {stocks.map(account => (
                    <option
                      key={account.Oid}
                      value={account.AccountName}>
                      {account.AccountName}
                    </option>
                  ))}
                </select>
              ) : (
                <p className="font-bold">
                  {detailStock.detailStock.AccountName}
                </p>
              )}
            </div>
          </div>
          <div className="flex justify-between w-full gap-6">
            <div className="flex-1">
              <h1 className="mb-1">Status</h1>
              <p className="bg-neutral-50 px-2 py-1 rounded-md font-bold">
                {detailStock.detailStock.StatusName}
              </p>
            </div>
            <div className="flex-1">
              <h1 className="mb-1">Note</h1>
              {isEditing ? (
                <textarea
                  placeholder={stock.Note}
                  className="block w-full p-1.5 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  name="Note"
                  value={editedStock.Note}
                  onChange={handleInputChange}
                />
              ) : (
                <p className="font-bold">{detailStock.detailStock.Note}</p>
              )}
            </div>
          </div>
          <div className="flex gap-4">
            <button
              className="w-fit shadow-lg bg-gradient-to-b from-blue-800 to-blue-900 text-white font-bold py-1.5 px-4 rounded-md"
              type="button"
              onClick={isEditing ? handleSaveClick : handleEditClick}>
              {isEditing ? "Save" : "Edit"}
            </button>
            {isEditing && (
              <button
                className="w-fit shadow-lg bg-gradient-to-b from-red-800 to-red-900 text-white font-bold py-1.5 px-4 rounded-md"
                onClick={handleCancelClick}>
                Cancel
              </button>
            )}
          </div>
        </form>
      )}
    </>
  );
}
