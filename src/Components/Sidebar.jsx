import React from 'react';
import styled from 'styled-components';
import HomeIcon from '@mui/icons-material/Home';
import FolderOpenIcon from '@mui/icons-material/FolderOpen';
import DevicesIcon from '@mui/icons-material/Devices';
import PeopleIcon from '@mui/icons-material/People';
import QueryBuilderIcon from '@mui/icons-material/QueryBuilder';
import StarBorderIcon from '@mui/icons-material/StarBorder';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import CloudDownloadIcon from '@mui/icons-material/CloudDownload';
import { Modal } from '@mui/material';
import { useState } from 'react';
import { db } from '../firebase';
import {uploadToCloudinary } from '../storage'
// import firebase from '../firebase';
// import {  uploadBytes, getDownloadURL } from "firebase/storage";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";



const SidebarContainer = styled.div`
    margin-top: 10px;
    
`;
const SidebarBtn = styled.div`
    button {
        background: transparent;
        border: 1px solid lightgray;
        display: flex;
        align-items: center;
        border-radius: 40px;
        padding:5px 10px;
        box-shadow:2px 2px 2px #ccc;
        margin-left: 20px;
        cursor:pointer;
        span {
            font-size: 16px;
            margin-right: 20px;
            margin-left: 10px;
        }
    }
`
const SidebarOptions = styled.div`
    margin-top: 10px;
    .progress_bar {
        padding: 0px 20px;
    }
    .progress_bar span {
        display: block;
        color:#333;
        font-size: 13px;
    }
`
const SidebarOption = styled.div`
    display: flex;
    align-items: center;
    padding: 10px 20px;
    border-radius: 0px 20px 20px 0px;
    margin-right: 10px;
    &:hover{
        background: whitesmoke;
        cursor: pointer;
    }
    svg.MuiSvgIcon-root {
        color:rgb(53, 53, 53);
    }
    span {
        margin-left: 15px;
        font-size: 16px;
        font-weight: 500;
        color:rgb(78, 78, 78)
    }
`

const ModalPopup = styled.div`
    top: 50%;
    background-color: #fff;
    width: 500px;
    margin: 0px auto;
    position: relative;
    transform: translateY(-50%);
    padding: 10px;
    border-radius: 10px;
`

const ModalHeading = styled.div`
    text-align: center;
    border-bottom: 1px solid lightgray;
    height: 40px;
`
const ModalBody = styled.div`
    input.modal__submit {
        width: 100%;
        background: darkmagenta;
        padding: 10px 20px;
        color: #fff;
        text-transform: uppercase;
        letter-spacing: 5px;
        font-size: 16px;
        border: 0;
        outline: 0;
        border-radius: 5px;
        cursor: pointer;
        margin-top:20px
    }
    input.modal__file {
        background: whitesmoke;
        padding: 20px;
        color: #000;
        display: block;
        margin-top:20px
    }
`
const UploadingPara = styled.p`
    background: green;
    color: #fff;
    margin: 20px;
    text-align: center;
    padding: 10px;
    letter-spacing: 1px;
`



const Sidebar = () => {
    
    const [open, setOpen] = useState(false); 
    const [uploading, setUploading] = useState(false); 
    const [file, setFile] = useState(null); 


    const handleFile = (e) => {
        if (e.target.files[0]) {
            setFile(e.target.files[0]);
            console.log("Selected file:", e.target.files[0]); // Debugging log
        }
    };
   
    const handleUpload = async (e) => {
        e.preventDefault();

        if (!file) return alert("Please select a file!"); // Ensure file is selected
        setUploading(true); // Start uploading

        try {
            // Upload the file to Cloudinary
            const fileUrl = await uploadToCloudinary(file);

            if (fileUrl) {
                // Add file details to Firestore
                await addDoc(collection(db, "myfiles"), {
                    filename: file.name,
                    fileURL: fileUrl,
                    size: file.size,
                    timestamp: serverTimestamp(),
                });

                alert("File uploaded successfully!"); // Show success message
                setFile(null); // Clear the file state
                setUploading(false); // Stop the uploading state
                setOpen(false); // Close the modal
            } else {
                throw new Error("File upload failed!"); // If no URL returned, throw an error
            }
        } catch (error) {
            console.error("Error uploading file:", error);
            setUploading(false); // Stop uploading spinner on error
        }
    };


  return (
    <>
<Modal open={open} onClose={() => setOpen(false)}>
            <ModalPopup>
                <form onSubmit={handleUpload}>
                    <ModalHeading>
                        <h3>Select file you want to upload</h3>
                    </ModalHeading>
                    <ModalBody>
                        {uploading ? <UploadingPara>Uploading...</UploadingPara> : (
                            <>
                                <input type="file" className='modal__file' onChange={handleFile} />
                                <input type="submit" className='modal__submit' />
                            </>
                        )}
                    </ModalBody>
                </form>
            </ModalPopup>
        </Modal>
    <SidebarContainer>
        <SidebarBtn>
                <button onClick={() => setOpen(true)}>
                    <img src="data:image/svg+xml;charset=UTF-8,%3Csvg xmlns=%22http://www.w3.org/2000/svg%22 width=%2236%22 height=%2236%22 viewBox=%220 0 36 36%22%3E%3Cpath fill=%22%2334A853%22 d=%22M16 16v14h4V20z%22/%3E%3Cpath fill=%22%234285F4%22 d=%22M30 16H20l-4 4h14z%22/%3E%3Cpath fill=%22%23FBBC05%22 d=%22M6 16v4h10l4-4z%22/%3E%3Cpath fill=%22%23EA4335%22 d=%22M20 16V6h-4v14z%22/%3E%3Cpath fill=%22none%22 d=%22M0 0h36v36H0z%22/%3E%3C/svg%3E" />
                    <span>New</span>
                </button>
            </SidebarBtn>
            <SidebarOptions>
                <SidebarOption>
                  <HomeIcon/>
                  <span>Home</span>
                </SidebarOption>
                <SidebarOption>
                    <FolderOpenIcon />
                    <span>My Drive</span>
                </SidebarOption>
                <SidebarOption>
                    <DevicesIcon />
                    <span>Computers</span>
                </SidebarOption>
                <SidebarOption>
                    <PeopleIcon />
                    <span>Shared with me</span>
                </SidebarOption>
                <SidebarOption>
                    <QueryBuilderIcon />
                    <span>Recent</span>
                </SidebarOption>
                <SidebarOption>
                    <StarBorderIcon />
                    <span>Starred</span>
                </SidebarOption>
                <SidebarOption>
                    <ErrorOutlineIcon />
                    <span>Spam</span>
                </SidebarOption>
                <SidebarOption>
                    <DeleteOutlineIcon />
                    <span>Trash</span>
                </SidebarOption>
                <SidebarOption>
                    <CloudDownloadIcon />
                    <span>Storage</span>
                </SidebarOption>
                <SidebarOption>
                <div className="progress_bar">
                    <progress size="tiny" value="60" max="100"  />
                    <span>125 GB  of 200 GB used</span>
                </div>
                </SidebarOption>
            </SidebarOptions>
    </SidebarContainer>
    </>
  )
  
}

export default Sidebar;