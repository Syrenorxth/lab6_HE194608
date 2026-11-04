import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function Syllabus() {
  const [subjects, setSubjects] = useState([]);
  const [filteredSubjects, setFilteredSubjects] = useState([]);
  const [searchBy, setSearchBy] = useState("code");
  const [searchKey, setSearchKey] = useState("");

  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    const res = await axios.get("http://localhost:9000/subjects");
    setSubjects(res.data);
    setFilteredSubjects(res.data);
  };

  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate("/login");
  };

  return (
    <div className="container-fluid">
      <div className="row bg-dark text-white p-3">
        <div className="col">
          <h4>FPT Education Learning Materials Portal</h4>
        </div>
        <div className="col text-end">
          Hello, {user?.fullName} ({user?.role})
          <button className="btn btn-outline-light ms-3" onClick={handleLogout}>
            Logout
          </button>
        </div>
      </div>

      <div className="container mt-3">
        <h2>Syllabus Management</h2>

        <div className="row mb-3 align-items-center">
          <div className="col-auto">
            <p className="mb-0">Search by:</p>
          </div>

          <div className="col-md-2">
            <select
              className="form-select"
              value={searchBy}
              onChange={(e) => setSearchBy(e.target.value)}
            >
              <option value="code">Code</option>
              <option value="name">Name</option>
            </select>
          </div>

          <div className="col-md-4">
            <input
              type="text"
              className="form-control"
              placeholder="Enter keyword..."
              value={searchKey}
              onChange={(e) => setSearchKey(e.target.value)}
            />
          </div>

          <div className="col-auto">
            <button className="btn btn-primary">
              Search
            </button>
          </div>
        </div>

        <table className="table table-bordered">
          <thead>
            <tr>
              <th>Code</th>
              <th>Name</th>
              <th>Curriculum</th>
              <th>Semester</th>
              <th>Credits</th>
              <th>Pre-requisites</th>
              <th>Description</th>
            </tr>
          </thead>
          <tbody>
            {filteredSubjects?.map((p) => (
              <tr key={p.id}>
                <td>{p.code}</td>
                <td>{p.name}</td>
                <td>{p.curriculum}</td>
                <td>{p.semester}</td>
                <td>{p.credits}</td>
                <td>{p.preRequisites.join(", ")}</td>
                <td>{p.description}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
