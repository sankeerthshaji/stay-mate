import React, { useEffect, useState } from "react";
import AdminSideBar from "../../components/admin/AdminSideBar";
import Loader from "../../components/user/Loader";
import AdminTable from "../../components/admin/AdminTable";
import useAdminLogout from "../../hooks/admin/useAdminLogout";
import { useSelector } from "react-redux";
import axios from "../../axios/axios";
import { useNavigate } from "react-router-dom";

function PaidRents() {
  const [loader, setLoader] = useState(true);
  const [paidRents, setPaidRents] = useState([]);
  const { adminLogout } = useAdminLogout();
  const admin = useSelector((state) => state.admin);
  const navigate = useNavigate();

  useEffect(() => {
    fetchPaidRents();
  }, []);

  const fetchPaidRents = async () => {
    try {
      setLoader(true);
      const response = await axios.get("/admin/paidRents", {
        headers: {
          Authorization: `Bearer ${admin.token}`,
        },
      });
      console.log(response.data.paidRents);
      setPaidRents(response.data.paidRents);
    } catch (err) {
      console.log(err);
      if (err.response && err.response.status === 401) {
        if (
          err.response.data.error === "Session timed out. Please login again."
        ) {
          // Handle "Session timed out" error
          adminLogout();
        }
      }
    } finally {
      setLoader(false);
    }
  };

  const fetchUnpaidRents = async () => {
    try {
      setLoader(true);
      const response = await axios.get("/admin/unpaidRents", {
        headers: {
          Authorization: `Bearer ${admin.token}`,
        },
      });
      console.log(response.data.paidRents);
      setPaidRents(response.data.paidRents);
    } catch (err) {
      console.log(err);
      if (err.response && err.response.status === 401) {
        if (
          err.response.data.error === "Session timed out. Please login again."
        ) {
          // Handle "Session timed out" error
          adminLogout();
        }
      }
    } finally {
      setLoader(false);
    }
  };

  const columns = [
    {
      Header: "User",
      Cell: ({ row }) => row.original.user.fullName,
    },
    {
      Header: "Room No",
      Cell: ({ row }) => row.original.user.roomNo,
    },
    {
      Header: "Amount Paid",
      Cell: ({ row }) => row.original.rentAmount,
    },
    {
      Header: "Date of Payment",
      Cell: ({ row }) => new Date(row.original.dateOfPayment).toLocaleDateString(),
    },
  ];

  return (
    <div>
      {loader ? (
        <Loader />
      ) : (
        <div className="flex h-screen">
          <div className="w-16 flex-shrink-0">
            <AdminSideBar />
          </div>
          <div className="flex-1 overflow-x-auto p-5 bg-gray-100">
            <div className="flex justify-between p-3">
              <h1 className="flex text-2xl font-bold text-center">
                Rent Management
              </h1>
              <div className="flex gap-2">
                <button
                  className="text-gray-900 border border-gray-900 hover:bg-gray-900 hover:text-white font-bold p-1 sm:p-2 rounded-md transition duration-300"
                  onClick={fetchPaidRents}
                >
                  Paid Rents
                </button>
                <button
                  className="text-gray-900 border border-gray-900 hover:bg-gray-900 hover:text-white font-bold p-1 sm:p-2 rounded-md transition duration-300"
                  onClick={()=>navigate("/admin/unpaidRents")}
                >
                  Unpaid Rents
                </button>
              </div>
            </div>
            <AdminTable columns={columns} data={paidRents} />
          </div>
        </div>
      )}
    </div>
  );
}

export default PaidRents;
