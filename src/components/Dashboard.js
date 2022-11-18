import React, { useEffect, useState } from "react";
import {
  MDBTable,
  MDBTableBody,
  MDBTableHead,
  MDBRow,
  MDBCol,
  MDBContainer,
} from "mdb-react-ui-kit";
import axios from "axios";

export default function Dashboard() {
  const [data, setData] = useState([]);

  useEffect(() => {
    loadUserData();
  }, []);

  const loadUserData = async () => {
    const token = localStorage.getItem("token");
    // var options = {
    //   method: "GET",

    //   params: { page: "1", limit: "10" },
    //   headers: { Authorization: `JWT ${token}` },
    // };
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
  console.log(data);
  // const navigate = useNavigate();
  // const token = localStorage.getItem("token");
  // const { decodedToken, isExpired } = useJwt(token);
  // console.log(decodedToken);
  // async function populateCompanies() {
  //   const token = localStorage.getItem("token");
  //   const req = await fetch(
  //     "http://localhost:3000/api/v1/company?page=1&limit=10",
  //     {
  //       headers: {
  //         Authorization: `JWT ${{ token }}`,
  //       },
  //     }
  //   );
  //   const data = req.json();
  //   console.log(data);
  // }

  // useEffect(() => {
  //   // populateCompanies();
  //   // }
  // }, []);
  return (
    <MDBContainer>
      <div style={{ marginTop: "100px" }}>
        <h2>Search filter and sort pagination</h2>
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
              {
                data.length === 0 ? (
                  <MDBTableBody className="align-center md-0">
                    <tr>
                      <td colSpan={5} className="text-center md-0">
                        No data found
                      </td>
                    </tr>
                </MDBTableBody>
              )}
              <MDBTableBody>

              </MDBTableBody>
            </MDBTable>
          </MDBCol>
        </MDBRow>
      </div>
    </MDBContainer>
  );
}
