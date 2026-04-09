import React, { useState, useEffect } from "react";
import axios from "axios";
function App() {
  const [students, setStudents] = useState([]);
  const [regNo, setRegNo] = useState("");
  const [name, setName] = useState("");
  const [branch, setBranch] = useState("");
  const baseURL = "http://localhost:8088/student";
  useEffect(() => {
    axios.get(baseURL + "/getAll")
      .then(res => setStudents(res.data));
  }, []);
  const addStudent = () => {
    axios.post(baseURL + "/add", {
      regNo, name, branch
    }).then(() => window.location.reload());
  };
  const deleteStudent = async (id) => {
  await axios.delete(`http://localhost:8088/student/delete/${id}`);
  window.location.reload();
};
  const updateStudent = () => {
    axios.put(baseURL + "/update/" + regNo, {
      regNo, name, branch
    }).then(() => window.location.reload());
  };
  return (
    <div>
      <h2>Student App</h2>
      <input placeholder="RegNo" onChange={e => setRegNo(e.target.value)} />
      <input placeholder="Name" onChange={e => setName(e.target.value)} />
      <input placeholder="Branch" onChange={e => setBranch(e.target.value)} />
      <br /><br />
      <button onClick={addStudent}>Add</button>
      <button onClick={updateStudent}>Update</button>
      <h3>Students</h3>
      {students.map(s => (
        <div key={s.regNo}>
          {s.regNo} - {s.name} - {s.branch}
          <button onClick={() => deleteStudent(s.regNo)}>Delete</button>
        </div>))}</div>  );}
export default App;