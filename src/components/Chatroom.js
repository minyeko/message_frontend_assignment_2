import React, {useEffect, useState} from 'react';
import axios from "axios";
import {BaseUrl} from "./constants";

function ChatRoom(props) {
    const [users, setUsers] = useState([])
    const [selectedUsers, setSelectedUsers] = useState({});
    const [createChatroomStatus, setCreateChatroomStatus] = useState("")
    useEffect(() => {
        let config = {
            method: 'get',
            maxBodyLength: Infinity,
            url: BaseUrl + '/api/users/',
            headers: {
                'Authorization': `Token ${localStorage.getItem('token')}`
            }

        };

        axios.request(config)
            .then((response) => {
                console.log("response from server" + JSON.stringify(response.data));
                setUsers(response.data);
            })
            .catch((error) => {
                console.log(error);
            });


    }, []);

    function createChatroom() {

        let data = {
            name: document.getElementById('name').value,
            created_by: document.getElementById('created_by').value,
            members: Object.keys(selectedUsers).filter((key) => selectedUsers[key])
        }
        let config = {
            method: 'post',
            maxBodyLength: Infinity,
            url: 'https://mis-assignment1-backend.vercel.app/api/chatroom/',
            headers: {
                'Authorization': `Token ${localStorage.getItem('token')}`,
                'Content-Type': 'application/json'
            },
            data: data
        };
        axios.request(config)
            .then((response) => {
                console.log(JSON.stringify(response.data));
                setCreateChatroomStatus("Chatroom created successfully!!");
            })
            .catch((error) => {
                console.log(error);
            });

    }

    function handleChange(e) {
        const { name, checked } = e.target;
        setSelectedUsers({ ...selectedUsers, [name]: checked });
    }

    return (
        <div>
            <h1>Chat Room</h1>
            <div>
                <label htmlFor="">Group name</label>
                <input type="text" id="name" placeholder="Enter group name"/>
            </div>
            <br/><br/>
            <div>
                <p>Created By:
                <select id="created_by">
                    {users.map((user) => {
                        return <option key={user.id} value={user.id}>{user.username}</option>;
                    })}
                </select></p>
            </div>
            <div>
                <p>Select members:</p>
                {users.map((user) => (
                <div className="user-list" key={user.id}>
                    <input
                        type="checkbox"
                        name={user.id}
                        checked={selectedUsers[user.id] || false}
                        onChange={handleChange}
                    />
                    <label>{user.username}</label>
                </div>
                 ))}
            </div>
            <div className="alert alert-success">{createChatroomStatus}</div>
            <div>
                <h2>Selected Items:</h2>
                <ul>
                    {users
                        .filter((option) =>
                            selectedUsers[option.id])
                        .map((option) => (
                            <li key={option.id}>{option.username}</li>
                        ))}
                </ul>
            </div>
            <button onClick={createChatroom}>Create</button>

        </div>
    );
}

export default ChatRoom;