import { useEffect, useState } from "react";
import {
  addAdmin,
  blockUser,
  getAllUsers,
  removeAdmin,
  unBlockUser,
} from "../../services/Http/FridgeApi/FridgeApiService";
import useAuth from "../../features/Hooks/useAuth";
import "./AdminPanelTable.css";
import { useNavigate } from "react-router-dom";
import { Container, Table, Button, Form } from "react-bootstrap";

export default function AdminPanelTable() {
  const [users, setUsers] = useState([]);
  const [currentUserId, setCurrentUserId] = useState(null);
  const auth = useAuth();
  const navigate = useNavigate();

  const handleError = () => {
    auth.logOut();
    navigate("/signin");
  };

  useEffect(() => {
    getAllUsers()
      .then((response) => {
        if (response.ok) {
          return response.json();
        }
      })
      .then((result) => {
        setUsers(result);
      });
  }, [auth, navigate]);

  const handleAddAdminClick = () => {
    if (currentUserId) {
      addAdmin(currentUserId).then((response) => {
        if (response.ok) {
          const newUsers = users.map((user) => {
            if (user.id === currentUserId && !user.roles.includes("Admin")) {
              const newRoles = user.roles;
              newRoles.push("Admin");
              return { ...user, roles: newRoles };
            } else {
              return user;
            }
          });

          setUsers(newUsers);
        } else {
          handleError();
        }
      });
    }
  };

  const handleRemoveAdminClick = () => {
    if (currentUserId) {
      removeAdmin(currentUserId).then((response) => {
        if (response.ok) {
          const newUsers = users.map((user) => {
            if (user.id === currentUserId && user.roles.includes("Admin")) {
              let newRoles = user.roles;
              newRoles = newRoles.filter((e) => e !== "Admin");
              return { ...user, roles: newRoles };
            } else {
              return user;
            }
          });

          setUsers(newUsers);
        } else {
          handleError();
        }
      });
    }
  };

  const handleblockClick = () => {
    if (currentUserId) {
      blockUser(currentUserId).then((response) => {
        if (response.ok) {
          const newUsers = users.map((user) => {
            if (user.id === currentUserId) {
              return { ...user, status: 2 };
            } else {
              return user;
            }
          });

          setUsers(newUsers);
        } else {
          handleError();
        }
      });
    }
  };

  const handleUnblockClick = () => {
    if (currentUserId) {
      unBlockUser(currentUserId).then((response) => {
        if (response.ok) {
          const newUsers = users.map((user) => {
            if (user.id === currentUserId) {
              return { ...user, status: 1 };
            } else {
              return user;
            }
          });
          setUsers(newUsers);
        } else {
          handleError();
        }
      });
    }
  };

  const handleEdit = (event) => navigate(`/users/${event.target.name}/Edit`);

  const handleSelectClick = (event) => {
    const checkBoxes = document.querySelectorAll(".form-check-input");

    checkBoxes.forEach((checkBox) => {
      checkBox.checked = false;
    });

    event.target.checked = true;
    setCurrentUserId(event.target.name);
  };

  const renderStatus = (status) => {
    switch (status) {
      case 1:
        return <span className="status-text status-active">Active</span>;
      case 2:
        return <span className="status-text status-blocked">Blocked</span>;
      default:
        return <></>;
    }
  };

  return (
    <>
      <Container>
        <div className="buttons-block text-center">
          <Button
            variant="outline-success"
            className="user-action-button"
            onClick={handleAddAdminClick}>
            Add admin
          </Button>
          <Button
            variant="outline-warning"
            className="user-action-button"
            onClick={handleRemoveAdminClick}>
            Remove admin
          </Button>
          <Button
            variant="outline-danger"
            className="user-action-button"
            onClick={handleblockClick}>
            Block
          </Button>
          <Button
            variant="outline-success"
            className="user-action-button"
            onClick={handleUnblockClick}>
            Unblock
          </Button>
        </div>
        <Table responsive striped>
          <thead>
            <tr>
              <th className="text-center">Select</th>
              <th>UserName</th>
              <th>Email</th>
              <th>Roles</th>
              <th>Status</th>
              <th className="text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {users && users.length > 0 ? (
              <>
                {users.map((user) => (
                  <tr key={user.id}>
                    <td className="checkbox-td">
                      <Form.Group>
                        <input
                          className="form-check-input"
                          type="checkbox"
                          name={user.id}
                          onClick={handleSelectClick}
                        />
                      </Form.Group>
                    </td>
                    <td>{user.userName}</td>
                    <td>{user.email}</td>
                    <td>
                      {user.roles.map((role) => (
                        <span key={role}>{role} </span>
                      ))}
                    </td>
                    <td>{renderStatus(user.status)}</td>
                    <td className="text-center">
                      <Button
                        variant="warning"
                        size="sm"
                        className="action-button"
                        name={user.id}
                        onClick={handleEdit}>
                        Edit
                      </Button>
                    </td>
                  </tr>
                ))}
              </>
            ) : (
              <></>
            )}
          </tbody>
        </Table>
      </Container>
    </>
  );
}
