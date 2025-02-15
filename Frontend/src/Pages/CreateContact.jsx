import { useContext, useState } from "react";
import ToastContext from "../context/toastContext";
import { useNavigate } from "react-router-dom";

function CreateContact() {
  const { toast } = useContext(ToastContext)
  const navigate = useNavigate()
  const url = import.meta.env.VITE_SERVER_URL

    const [userDetails, setUserDetails] = useState({
        name: "",
        address: "",
        email: "",
        phone: "",
      });

    const handleSubmit =async (event) => {
        event.preventDefault()
        const res = await fetch(`${url}/contact`,{
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${localStorage.getItem("token")}`
            },
            body: JSON.stringify(userDetails) 
        })
        const result = await res.json()
        if (!result.error) {
          toast.success(`Successfully Created ${userDetails.name} contact`)
          navigate("/mycontact", {replace: true})
            setUserDetails({name: "" , email:"" , address:"" ,phone:"" })
        } else {
            toast.error("Contact not created")           
        }
    }
    const handleInputChange = (e) => {
        const { name, value } = e.target 
        setUserDetails({...userDetails , [name] : value})
    }

   return (
    <>
      <h2>Create your contact</h2>

      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="nameInput" className="form-label mt-4">
            Name Of Person
          </label>
          <input
            type="text"
            className="form-control"
            id="nameInput"
            name="name"
            value={userDetails.name}
            onChange={handleInputChange}
            placeholder="John Doe"
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="addressInput" className="form-label mt-4">
            Address Of Person
          </label>
          <input
            type="text"
            className="form-control"
            id="addressInput"
            name="address"
            value={userDetails.address}
            onChange={handleInputChange}
            placeholder="WalkStreet 05, California"
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="emailInput" className="form-label mt-4">
            Email Of Person
          </label>
          <input
            type="email"
            className="form-control"
            id="emailInput"
            name="email"
            value={userDetails.email}
            onChange={handleInputChange}
            placeholder="johndoe@example.com"
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="phoneInput" className="form-label mt-4">
            Phone Number Of Person
          </label>
          <input
            type="number"
            className="form-control"
            id="phoneInput"
            name="phone"
            value={userDetails.phone}
            onChange={handleInputChange}
            placeholder="+977 987654321"
            required
          />
        </div>
        <input
          type="submit"
          value="Add Contact"
          className="btn btn-info my-2"
        />
      </form>
    </>
  );
}

export default CreateContact;
