/* eslint-disable no-unused-vars */
import { RiHomeSmile2Fill } from "react-icons/ri";
import { IoBagAdd } from "react-icons/io5";
import { LuBoxes } from "react-icons/lu";
import { Link, useNavigate } from "react-router-dom";
import { IoLogOut } from "react-icons/io5";
import { Button, Modal, Popover } from "flowbite-react";
import { useCookies } from "react-cookie";
import { useState } from "react";

export default function SideMenu() {
  const [cookies, setCookie, removeCookie] = useCookies(["authToken"]);
  const [openModal, setOpenModal] = useState(false);
  const navigate = useNavigate();
  const paramItems = new URLSearchParams({
    TypeName: "Product",
    Type: "Product",
    Company: "d3170153-6b16-4397-bf89-96533ee149ee",
    CompanyName: "testcase",
  });
  const paramStock = new URLSearchParams({
    Company: "d3170153-6b16-4397-bf89-96533ee149ee",
    CompanyName: "testcase",
    DateFrom: "2024-07-01",
    DateTo: "2024-07-31",
    Status: "all",
    page: "1",
  });

  const contentPopover = content => (
    <div className="w-fit text-xs outline-0 font-medium rounded-none border-0 text-neutral-700">
      <div className="px-1.5 py-0.5">
        <p>{content}</p>
      </div>
    </div>
  );

  const handleLogout = () => {
    setOpenModal(true);
  };

  const confirmLogout = () => {
    removeCookie("authToken", { path: "/" });
    navigate("/login", { replace: true });
  };

  return (
    <>
      <nav className="shadow-lg py-7 bg-white text-blue-900 max-w-20 min-h-[98vh] flex-1 inline-flex flex-col items-center justify-between gap-8">
        <div className="flex flex-col items-center gap-1">
          <img
            src="/logo-elsoft.png"
            alt=""
            className="rounded-full object-cover w-10"
          />
          <p className="text-sm">testcase</p>
        </div>
        <div className="border border-b border-neutral-200 w-[70%]"></div>
        <div className="flex flex-col gap-8 flex-1">
          <Popover
            className="border-0 outline-0 rounded-sm shadow-md bg-white"
            trigger="hover"
            content={contentPopover("Dashboard")}
            placement="right">
            <Link to="/dashboard">
              <RiHomeSmile2Fill className="text-3xl hover:-translate-x-1 duration-300" />
            </Link>
          </Popover>
          <Popover
            className="border-0 outline-0 rounded-sm shadow-md bg-white"
            trigger="hover"
            content={contentPopover("Items")}
            placement="right">
            <Link to={`/list/item?${paramItems.toString()}`}>
              <IoBagAdd className="text-3xl hover:-translate-x-1 duration-300" />
            </Link>
          </Popover>
          <Popover
            className="border-0 outline-0 rounded-sm shadow-md bg-white"
            trigger="hover"
            content={contentPopover("Stocks")}
            placement="right">
            <Link to={`/list/stock?${paramStock.toString()}`}>
              <LuBoxes className="text-3xl hover:-translate-x-1 duration-300" />
            </Link>
          </Popover>
        </div>
        <Popover
          className="border-0 outline-0 rounded-sm shadow-md bg-white"
          trigger="hover"
          content={contentPopover("Logout")}
          placement="right">
          <button onClick={handleLogout}>
            <IoLogOut className="text-3xl hover:-translate-x-1 duration-300 cursor-pointer" />
          </button>
        </Popover>
      </nav>
      {openModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50">
          <Modal
            className="max-w-xl mx-auto"
            show={openModal}
            onClose={() => setOpenModal(false)}
            size="md"
            popup={true}>
            <Modal.Header />
            <Modal.Body>
              <div className="text-center">
                <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
                  Are you sure you want to log out?
                </h3>
                <div className="flex justify-center gap-4 mb-6">
                  <Button
                    className="bg-gradient-to-b from-blue-800 to-blue-900 px-3 py-1 rounded-md shadow-md text-white hover:opacity-80 duration-300"
                    onClick={confirmLogout}>
                    Yes
                  </Button>
                  <Button
                    className="bg-gradient-to-b from-red-800 to-red-900 px-3 py-1 rounded-md shadow-md text-white hover:opacity-80 duration-300"
                    onClick={() => setOpenModal(false)}>
                    Back
                  </Button>
                </div>
              </div>
            </Modal.Body>
          </Modal>
        </div>
      )}
    </>
  );
}
