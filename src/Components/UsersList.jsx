import React, { useEffect, useState } from "react";
import "./UsersList.css";
import "antd/dist/antd.css";
import ReactPaginate from "react-paginate";
import { AiFillDelete, AiFillEdit } from "react-icons/ai";
import { Pagination } from "antd";

function UsersList() {
  const [users, setUsers] = useState([]);
  const [searchUser, setSearchUser] = useState("");
  const [pageCount, setPageCount] = useState(0);

  const itemPerPage = 10;
  let pageVisited = pageCount * itemPerPage;

  const totalPages = Math.ceil(users.length / itemPerPage);
  const pageChange = ({ selected }) => {
    setPageCount(selected);
  };

  useEffect(() => {
    getUsersDetails();
  }, []);

  const getUsersDetails = () => {
    fetch(
      `https://geektrust.s3-ap-southeast-1.amazonaws.com/adminui-problem/members.json`
    )
      .then((res) => res.json())
      .then((data) => {
        setUsers(data);
      })
      .catch((err) => {
        console.log("Error:", err);
      });
  };

  const deleteUser = (selectedUser) => {
    let userAfterDeletion = users.filter((user) => {
      return user.id !== selectedUser;
    });
    setUsers(userAfterDeletion);
  };

  const editUserDetails = () => { };

  return (
    <div className="container">
      <br />
      <input
        type="text"
        name="name"
        placeholder=" Search by any field "
        onChange={(e) => setSearchUser(e.target.value)}
      />

      <table className="table">
        <thead>
          <tr>
            <th>
              <input type="checkbox" />{" "}
            </th>
            <th>Name </th>
            <th>Email </th>
            <th> Role</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {users
            .filter((user) => {
              if (searchUser === "") return user;
              else if (
                user.name.includes(searchUser) ||
                user.email.includes(searchUser) ||
                user.role.includes(searchUser)
              ) {
                return user;
              }
            })
            .slice(pageVisited, pageVisited + itemPerPage)
            .map((user) => (
              <tr key={user.id}>
                <td>
                  <input type="checkbox" />
                </td>
                <td> {user.name} </td>
                <td> {user.email} </td>
                <td> {user.role} </td>
                <td className="btn">
                  <button onClick={editUserDetails}>
                    {" "}
                    <AiFillEdit />{" "}
                  </button>
                  <button onClick={() => deleteUser(user.id)}>
                    {" "}
                    <AiFillDelete />{" "}
                  </button>
                </td>
              </tr>
            ))}
        </tbody>
      </table>
      <br />
      <br />

      {/* pagination */}
      <ReactPaginate
        previousLabel={"Prev"}
        nextLabel={"Next"}
        pageCount={totalPages}
        onPageChange={pageChange}
        containerClassName={"pagination"}
        pageClassName={"page-item"}
        pageLinkClassName={"page-link"}
        breakClassName={"page-item"}
        breakLinkClassName={"page-link"}
        activeClassName={"active"}
      />
    </div>
  );
}

export default UsersList;
