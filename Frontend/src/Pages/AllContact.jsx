import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { Modal } from "react-bootstrap";
import Spinner from "../Component/Spinner";
import ToastContext from "../context/toastContext";

function AllContact() {
  const [loading, setLoading] = useState(false);
  const [contacts, setContacts] = useState([]);
  const [modalData, setModalData] = useState({});
  const [showModal, setShowModal] = useState(false);
  const { toast } = useContext(ToastContext);

  useEffect(() => {
    setLoading(true);
    const fetchContact = async () => {
      try {
        const result = await axios.get(
          "http://localhost:3000/api/contactname",
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        setContacts(result.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching contacts:", error);
        setLoading(false);
      }
    };
    fetchContact();
  }, []);

  const deleteContact = async (id) => {
    if (window.confirm("Are you sure you want to delete this contact?")) {
      try {
        const result = await fetch(`http://localhost:3000/api/delete/${id}`, {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        const data = await result.json();
          if (!data.error) {
          setContacts(data.myContact);
          toast.success("Deleted contact");
          setShowModal(false);
        } else {
          toast.error(data.error);
        }
      } catch (err) {
        console.log(err);
      }
    }
  };

  return (
    <>
      <div className="jumbotron">
        <h1>Your Contacts</h1>
        <hr className="my-4" />
        {loading ? (
          <Spinner splash="Loading Contact..." />
        ) : (
          <>
            {contacts.length == 0 ? (
              <h3>No contacts created yet</h3>
            ) : (
              <table className="table table-hover">
                <thead>
                  <tr className="table-dark">
                    <th scope="col">Name</th>
                    <th scope="col">Address</th>
                    <th scope="col">Email</th>
                    <th scope="col">Phone</th>
                  </tr>
                </thead>
                <tbody>
                  {contacts.map((contact) => (
                    <tr
                      key={contact._id}
                      onClick={() => {
                        setModalData({});
                        setModalData(contact);
                        setShowModal(true);
                      }}
                    >
                      <th scope="row">{contact.name}</th>
                      <td>{contact.address}</td>
                      <td>{contact.email}</td>
                      <td>{contact.phone}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </>
        )}
      </div>

      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>{modalData.name}</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <h3>{modalData.name}</h3>
          <p>
            <strong>Address</strong>: {modalData.address}
          </p>
          <p>
            <strong>Email</strong>: {modalData.email}
          </p>
          <p>
            <strong>Phone Number</strong>: {modalData.phone}
          </p>
        </Modal.Body>

        <Modal.Footer>
          <Link className="btn btn-info" to={`/contact/${modalData._id}`}>
            Edit
          </Link>
          <button
            className="btn btn-danger"
            onClick={() => deleteContact(modalData._id)}
          >
            Delete
          </button>
          <button
            className="btn btn-warning"
            onClick={() => setShowModal(false)}
          >
            Close
          </button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default AllContact;

{
  /* <Link className="btn btn-info" to={`/edit/${modalData._id}`}>
            Edit
          </Link>
           */
}
