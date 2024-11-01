import React, { useState } from "react";
import * as XLSX from "xlsx";
// import { Button } from "@mui/material";
function ExcelApp() {
  const [data, setData] = useState([]);
  const [newData, setNewData] = useState({});

  const handleDownload = () => {
    const ws = XLSX.utils.json_to_sheet(data);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Sheet1");
    XLSX.writeFile(wb, "generated_file.xlsx");
  };

  const handleDownloadUpdatedFile = () => {
    const ws = XLSX.utils.json_to_sheet(data);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Sheet1");
    XLSX.writeFile(wb, "updated_file.xlsx");
  };


  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();

    reader.onload = (e) => {
      const data = new Uint8Array(e.target.result);
      const workbook = XLSX.read(data, { type: "array" });
      const worksheet = workbook.Sheets[workbook.SheetNames[0]];
      const fileData = XLSX.utils.sheet_to_json(worksheet);
      setData(fileData);
    };
    reader.readAsArrayBuffer(file);
  };

  const handleAddData = () => {
    const updatedData = [...data, newData];
    setData(updatedData);
    setNewData({});
  };


  const handleNewData = (label, value) => {
    setNewData((prev) => ({ ...prev, [label]: value }));
  };

  return (
    <div>
      {/* <Button>MUI button</Button> */}
      <input
        type="text"
        value={newData.Name || ""}
        onChange={(e) => handleNewData("Name", e.target.value)}
        placeholder="Product name"
      />
      <input
        type="number"
        value={newData.Price || ""}
        onChange={(e) => handleNewData("Price", e.target.value)}
        placeholder="Price"
      />
      <input
        type="text"
        value={newData.PaymentMethod || ""}
        onChange={(e) => handleNewData("PaymentMethod", e.target.value)}
        placeholder="Payment method"
      />
      <input
        type="date"
        value={newData.Date || ""}
        onChange={(e) => handleNewData("Date", e.target.value)}
      />
      <button onClick={handleAddData}>Add</button>

      <br />
      <br />

      <button onClick={handleDownloadUpdatedFile}>Download Updated File</button>
      {/* <button onClick={handleDownload}>Download File</button> */}
      <br />
      <br />

      <input type="file" onChange={handleFileUpload} />

      {/* <h2>Uploaded Data:</h2>
      <pre>{JSON.stringify(data, null, 2)}</pre> */}
    </div>
  );
}

export default ExcelApp;
