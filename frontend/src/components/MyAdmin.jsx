import React, { useEffect, useState } from "react";
import axios from "axios";

const MyAdmin = () => {
   const [users, setUsers] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:8080/users", { withCredentials: true })
      .then((response) => {
        setUsers(response.data.users);
      })
      .catch((error) => {
        console.error("Error fetching users", error);
      });
  }, []);

  return (
    <div className="grow ml-4 md:ml-64 h-full lg:h-screen bg-gray-100 text-gray-900 p-4">
  <h2 className="text-2xl font-bold mb-4 text-blue-500">All Users</h2>

  {/* Responsive Table Container */}
  <div className="overflow-x-auto bg-white rounded-lg shadow">
    <table className="min-w-full divide-y divide-gray-200">
      <thead className="bg-gray-100">
        <tr>
          <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
            UserName
          </th>
          <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
            Email
          </th>
          <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
            Role
          </th>
        </tr>
      </thead>
      <tbody className="bg-white divide-y divide-gray-200">
        {users.map((user) => (
          <tr key={user._id} className="hover:bg-gray-50">
            <td className="px-6 py-4 font-bold text-gray-900 whitespace-nowrap">
              {user.username}
            </td>
            <td className="px-6 py-4 text-gray-600 whitespace-nowrap">
              {user.email}
            </td>
            <td className="px-6 py-4 text-gray-600 whitespace-nowrap">
                {user.role}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
</div>

  );
};

export default MyAdmin;
