import React, { useEffect, useState } from "react";
import {
  MDBTable,
  MDBTableBody,
  MDBTableHead,
  MDBRow,
  MDBCol,
  MDBContainer,
  MDBBtn,
  MDBBtnGroup,
  MDBPagination,
  MDBPaginationItem,
  MDBPaginationLink,
} from "mdb-react-ui-kit";
import axios from "axios";

export default function Dashboard() {
  const [data, setData] = useState([]);
  const [value, setValue] = useState("");
  const [sortValue, setSortValue] = useState("");
  const token = localStorage.getItem("token");
  const sortOptions = [
    "company_name",
    "company_email",
    "company_phone",
    "status",
  ];

  useEffect(() => {
    loadUserData();
  }, []);

  const loadUserData = async () => {
    const url = "http://localhost:3000/api/v1/company?page=1&limit=10";
    const config = {
      headers: {
        Accept: "application/json",
        Authorization: `JWT ${token}`,
      },
    };

    return await axios
      .get(url, config)
      .then((response) => setData(response.data))
      .catch((err) => console.log(err));
  };

  const handleReset = (e) => {
    e.preventDefault();
    loadUserData();
  };

  const handleSearch = async (e) => {
    e.preventDefault();
    const config = {
      headers: {
        Accept: "application/json",
        Authorization: `JWT ${token}`,
      },
    };
    return await axios
      .get(
        `http://localhost:3000/api/v1/company?page=1&limit=10&query=${value}`,
        config
      )
      .then((response) => {
        setData(response.data);
        setValue("");
      })
      .catch((error) => console.log(error));
  };

  const handleSort = async (e) => {
    let sortValue = e.target.value;
    setSortValue(e.target.value);
    const config = {
      headers: {
        Accept: "application/json",
        Authorization: `JWT ${token}`,
      },
    };
    return await axios
      .get(
        `http://localhost:3000/api/v1/company?page=1&limit=10&query=${value}&sort=${sortValue}`,
        config
      )
      .then((response) => {
        setData(response.data);
      })
      .catch((error) => console.log(error));
  };

  return (
    <MDBContainer>
      <form
        style={{
          margin: "auto",
          padding: "15px",
          maxWidth: "400px",
          alignContent: "center",
        }}
        onSubmit={handleSearch}
        className="d-flex input-group w-auto"
      >
        <input
          type="text"
          className="form-control"
          placeholder="Search Name..."
          value={value}
          onChange={(e) => setValue(e.target.value)}
        />
        <MDBBtnGroup>
          <MDBBtn type="submit" color="dard">
            Search
          </MDBBtn>
          <MDBBtn className="mx-2" color="info" onClick={(e) => handleReset(e)}>
            Reset
          </MDBBtn>
        </MDBBtnGroup>
      </form>
      <div style={{ marginTop: "100px" }}>
        <h2 className="text-center">Search filter and sort pagination</h2>
        <MDBRow>
          <MDBCol size="12">
            <MDBTable>
              <MDBTableHead dark>
                <tr>
                  <th scope="col">No.</th>
                  <th scope="col">Name</th>
                  <th scope="col">Email</th>
                  <th scope="col">Phone</th>
                  <th scope="col">Status</th>
                </tr>
              </MDBTableHead>
              {data.length === 0 ? (
                <MDBTableBody className="align-center md-0">
                  <tr>
                    <td colSpan={5} className="text-center md-0">
                      No data found
                    </td>
                  </tr>
                </MDBTableBody>
              ) : (
                data.docs.map((item, index) => (
                  <MDBTableBody>
                    <tr key={index}>
                      <td scope={index}>{item._id}</td>
                      <td>{item.company_name}</td>
                      <td>{item.company_email}</td>
                      <td>{item.company_phone}</td>
                      <td>{item.status}</td>
                    </tr>
                  </MDBTableBody>
                ))
              )}
              <MDBTableBody></MDBTableBody>
            </MDBTable>
          </MDBCol>
        </MDBRow>
      </div>

      <MDBRow>
        <MDBCol size={8}>
          <h5>Sort By:</h5>
          <select
            style={{ width: "50%", borderRadius: "2px", height: "35px" }}
            onChange={handleSort}
            value={sortValue}
          >
            <option>All</option>
            {sortOptions.map((item, index) => (
              <option value={item}>{item}</option>
            ))}
          </select>
        </MDBCol>
        <MDBCol size={4}>
          <h5>Filter by status:</h5>
        </MDBCol>
      </MDBRow>
    </MDBContainer>
  );
}
