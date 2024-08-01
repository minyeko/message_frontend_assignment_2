import React, {useEffect, useState} from 'react';
import axios from "axios";
import {BaseUrl} from "./constants";

function ChatRoom(props) {
    const [users, setUsers] = useState([])
    const [selectUsers, setSelectedUsers] = useState({});
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
                console.log(JSON.stringify(response.data));
                setUsrs(response.data);
            })
            .catch((error) => {
                console.log(error);
            });


    }, []);

    function createChatRoom() {

        let data = {
            name: document.getElementById('name').value,
            created_by: document.getElementById('created_by').value,
            members: Object.keys(sltU).filter((key) => sltU[key])
        }
        let config = {
            method: 'post',
            maxBodyLength: Infinity,
            url: BaseUrl + '/api/chatroom/',
            headers: {
                'Authorization': `Token ${localStorage.getItem('token')}`,
                'Content-Type': 'application/json'
            },
            data: data
        };
        axios.request(config)
            .then((response) => {
                console.log(JSON.stringify(response.data));
                setCreateChatroomStatus("Chatroom created successfully !");
            })
            .catch((error) => {
                console.log(error);
            });

    }

    function handleChange(e) {
        const { name, checked } = e.target;
        setSltU({ ...sltU, [name]: checked });
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
                        {users.map((i) => {
                            return <option key={i.id} value={i.id}>{i.username}</option>;
                        })}
                    </select></p>
            </div>
            <div>
                <p>Select members:</p>
                {users.map((j) => (
                    <div className="user-list" key={j.id}>
                        <input
                            type="checkbox"
                            name={j.id}
                            checked={sltU[j.id] || false}
                            onChange={handleChange}
                        />
                        <label>{j.username}</label>
                    </div>
                ))}
            </div>
            <div>
                <h2>Selected Items:</h2>
                <ul>
                    {usrs
                        .filter((option) =>
                            sltU[option.id])
                        .map((option) => (
                            <li key={option.id}>{option.username}</li>
                        ))}
                </ul>
            </div>
            <button onClick={createChatRoom}>Create</button>
            <div id={"chatroom-status"}>{createChatroomStatus}</div>
        </div>
    );
}

export default ChatRoom;