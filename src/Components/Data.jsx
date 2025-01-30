import React from "react";
import styled from "styled-components";
import HomeIcon from "@mui/icons-material/Home";
import MenuIcon from "@mui/icons-material/Menu";
import GridViewIcon from "@mui/icons-material/GridView";
import InsertDriveFileIcon from "@mui/icons-material/InsertDriveFile";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase";

const DataContainer = styled.div`
  flex: 1 1;
  padding: 10px 10px 0px 20px;
  background-color: rgb(241, 241, 241);
  border-radius: 5px;
`;
const DataHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 40px;
  .headerLeft {
    display: flex;
    align-items: center;
    cursor: pointer;
  }
  .headerRight svg {
    margin: 0px 10px;
    cursor: pointer;
  }
`;
const DataGrid = styled.div`
  display: flex;
  flex-wrap: wrap; 
  gap: 20px; 
  margin-top: 30px;
  margin-bottom: 30px;
  width: 100%;

  @media (max-width: 768px) {
    flex-direction: column; 
`;
const DataFile = styled.div`
  text-align: center;
  border: 1px solid rgb(204 204 204 / 46%);
  margin: 10px;
  min-width: 200px;
  padding: 10px 0px 0px 0px;
  border-radius: 5px;
  display flex;
  flex-direction: row;
  flex-wrap: wrap; 
  svg {
    font-size: 60px;
    color: gray;
  }
  p {
    border-top: 1px solid #ccc;
    margin-top: 5px;
    font-size: 12px;
    background: whitesmoke;
    padding: 10px 0px;
  }
`;
const DataListRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-bottom: 1px solid #ccc;
  padding: 10px;
  p {
    display: flex;
    align-items: center;
    font-size: 13px;
    b {
      display: flex;
      align-items: center;
    }
    svg {
      font-size: 22px;
      margin: 10px;
    }
  }
`;

const Data = () => {
  const [files, setFiles] = useState([]);

  useEffect(() => {
    const fetchFiles = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "myfiles"));
        const filesList = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setFiles(filesList);
      } catch (error) {
        console.error("Error fetching files:", error);
      }
    };
    fetchFiles();
  }, []);

  const changeBytes = (bytes) => {
    if (!bytes || isNaN(bytes)) return "Unknown Size"; 
    if (bytes < 1024) return `${bytes} B`;
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(2)} KB`;
    if (bytes < 1024 * 1024 * 1024)
      return `${(bytes / (1024 * 1024)).toFixed(2)} MB`;
    return `${(bytes / (1024 * 1024 * 1024)).toFixed(2)} GB`;
  };
  return (
    <DataContainer>
      <DataHeader>
        <div className="headerLeft">
          <p>Home</p>
          <HomeIcon />
        </div>
        <div className="headerRight">
          <MenuIcon />
          <GridViewIcon />
        </div>
      </DataHeader>
      <div>
        <DataGrid>
          {files.map((file) => (
            <DataFile key={file.id}>
              <InsertDriveFileIcon />
              <p>{file.name || file.id || "Unnamed File"}</p>
            </DataFile>
          ))}
        </DataGrid>

        <>
          <DataListRow>
            <p>
              <b>
                Name <ArrowDownwardIcon />
              </b>
            </p>
           
            <p>
              <b>Last Modified</b>
            </p>
            <p>
              <b>File Size</b>
            </p>
          </DataListRow>
          {files.map((file) => (
            <DataListRow key={file.id}>

              <a href={file.url} target="_blank">
              <p>
                <InsertDriveFileIcon /> {file.name || file.id || "Unnamed File"}
              </p>
              </a>
              {/* <p>{file.metadata?.owner || "Unknown Owner"}</p> */}
              {/* Use the correct field here */}
            
              {/* Change as per your data */}
              {/* <p>{new Date(file.created_at).toLocaleString()}</p> */}
              <p>
                {file.created_at
                  ? new Date(file.created_at.seconds * 1000).toLocaleString()
                  : "Unknown Date"}
                  {/* {new Date(file.created_at.seconds *1000). toUTCString()} */}
              </p>
              {/* <p>{changeBytes(file.bytes)}</p> */}
              <p>{file.bytes ? changeBytes(file.bytes) : "Unknown Size"}</p>
            </DataListRow>
          ))}
        </>
      </div>
    </DataContainer>
  );
};

export default Data;
