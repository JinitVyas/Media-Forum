const AdminUsers = ({ users, darkMode }) => {
    return (
      <div>
        <h1 className="text-3xl font-bold mb-4 m-2">User Management</h1>
        <div className="overflow-x-auto">
          <table className={`min-w-full border-collapse ${darkMode ? 'border-gray-700' : 'border-gray-300'}`}>
            <thead>
              <tr className={`${darkMode ? 'bg-gray-700' : 'bg-gray-200'}`}>
                <th className="border border-gray-300 p-2">First Name</th>
                <th className="border border-gray-300 p-2">Last Name</th>
                <th className="border border-gray-300 p-2">Street Address</th>
                <th className="border border-gray-300 p-2">Town</th>
                <th className="border border-gray-300 p-2">State</th>
                <th className="border border-gray-300 p-2">Pincode</th>
                <th className="border border-gray-300 p-2">Phone</th>
                <th className="border border-gray-300 p-2">Email</th>
                <th className="border border-gray-300 p-2">Nominee Name</th>
                <th className="border border-gray-300 p-2">Current Balance</th>
                <th className="border border-gray-300 p-2">Vigilance Officer</th>
                <th className="border border-gray-300 p-2">Account Username</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user, index) => (
                <tr key={index} className={`hover:bg-${darkMode ? 'gray-800' : 'gray-100'}`}>
                  <td className="border border-gray-300 p-2">{user.firstName}</td>
                  <td className="border border-gray-300 p-2">{user.lastName}</td>
                  <td className="border border-gray-300 p-2">{user.streetAddress}</td>
                  <td className="border border-gray-300 p-2">{user.town}</td>
                  <td className="border border-gray-300 p-2">{user.state}</td>
                  <td className="border border-gray-300 p-2">{user.pincode}</td>
                  <td className="border border-gray-300 p-2">{user.phone}</td>
                  <td className="border border-gray-300 p-2">{user.email}</td>
                  <td className="border border-gray-300 p-2">{user.nomineeName}</td>
                  <td className="border border-gray-300 p-2">{user.currentBalance}</td>
                  <td className="border border-gray-300 p-2">{user.vigilanceOfficer}</td>
                  <td className="border border-gray-300 p-2">{user.accountUsername}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    );
  };
  
  export default AdminUsers;