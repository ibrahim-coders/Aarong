import { useState } from 'react';

const UserManagment = () => {
  const [users, setUsers] = useState([
    {
      _id: 1221,
      name: 'John Doe',
      email: 'abc@gmail.com',
      role: 'admin',
    },
  ]);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    role: 'customer',
  });

  const handleChange = e => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle form submission
  const handleSubmit = e => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.password) {
      alert('Please fill out all fields.');
      return;
    }

    setUsers([
      ...users,
      { name: formData.name, email: formData.email, role: formData.role },
    ]);
    setFormData({ name: '', email: '', password: '', role: 'customer' });
  };

  // Handle Role Change
  const handleRoleChanges = (index, newRole) => {
    const updatedUsers = users.map((user, i) =>
      i === index ? { ...user, role: newRole } : user
    );
    setUsers(updatedUsers);
    console.log(updatedUsers);
  };
  const handleDeleteUser = id => {
    console.log(id);
  };
  return (
    <div className="max-w-3xl mx-auto p-6">
      <h2 className="text-2xl font-bold mb-4">User Management</h2>

      {/* User List */}
      <div className="mb-6">
        <h3 className="text-xl font-semibold mb-2">Users</h3>
        <table className="w-full border-collapse border border-gray-200">
          <thead className="bg-gray-100">
            <tr>
              <th className="border p-2">Name</th>
              <th className="border p-2">Email</th>
              <th className="border p-2">Role</th>
              <th className="border p-2">Action</th>
            </tr>
          </thead>
          <tbody>
            {users.length > 0 ? (
              users.map(user => (
                <tr key={user._id} className="border">
                  <td className="border p-2">{user.name}</td>
                  <td className="border p-2">{user.email}</td>
                  <td className="border p-2 capitalize">
                    <select
                      value={user.role}
                      onChange={e =>
                        handleRoleChanges(user._id, e.target.value)
                      }
                      className="p-2 rounded border"
                    >
                      <option value="customer">Customer</option>
                      <option value="admin">Admin</option>
                    </select>
                  </td>
                  <td className="p-4">
                    <button
                      onClick={() => handleDeleteUser(user._id)}
                      className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-700 cursor-pointer"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="4" className="text-center p-2 text-gray-500">
                  No users found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* User Form */}
      <h3 className="text-xl font-semibold mb-2">Add New User</h3>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="w-full md:w-1/2">
            <label className="block text-gray-500 text-sm">Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Enter name"
              className="w-full p-2 border rounded"
            />
          </div>
          <div className="w-full md:w-1/2">
            <label className="block text-gray-500 text-sm">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter email"
              className="w-full p-2 border rounded"
            />
          </div>
        </div>
        <div className="flex flex-col md:flex-row gap-4">
          <div className="w-full md:w-1/2">
            <label className="block text-gray-500 text-sm">Password</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Enter password"
              className="w-full p-2 border rounded"
            />
          </div>
          <div className="w-full md:w-1/2">
            <label className="block text-gray-500 text-sm">Role</label>
            <select
              name="role"
              value={formData.role}
              onChange={handleChange}
              className="w-full p-2 border rounded"
            >
              <option value="customer">Customer</option>
              <option value="admin">Admin</option>
            </select>
          </div>
        </div>

        <button
          type="submit"
          className="w-full bg-green-600 text-white py-2 rounded cursor-pointer hover:bg-green-700"
        >
          Add User
        </button>
      </form>
    </div>
  );
};

export default UserManagment;
