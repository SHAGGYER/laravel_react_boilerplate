import React, {useContext, useEffect, useState} from "react";
import {Link, useHistory} from "react-router-dom";
import HttpClient from "../../../../Services/HttpClient";
import Button from "../../../../Components/Button/Button";
import AppContext from "../../../Contexts/AppContext";
import Pagination from "react-js-pagination";
import Card from "../../../../Components/Card/Card";
import Input from "../../../../Components/Input/Input";
import Roles from "../../../Data/Roles";
import Select from "../../../../Components/Select/Select";

export default function () {
    const history = useHistory();
    const {user, setLoading} = useContext(AppContext);
    const [users, setUsers] = useState([]);
    const [total, setTotal] = useState(0);
    const [page, setPage] = useState(1);
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [role, setRole] = useState('');

    useEffect(() => {
        getUsers(0, true)
    }, []);

    useEffect(() => {
        if (page) {
            getUsers((page - 1) * 10);
        }
    }, [page]);

    const getUsers = async (skip, reset) => {
        let url = `/api/admin/user/browse?page=${page}`;
        if (!reset) {
            if (name) {
                url += '&name=' + name;
            }
            if (email) {
                url += '&email=' + email;
            }
            if (role) {
                url += '&role=' + role;
            }
        }
        setLoading(true)
        const {data} = await HttpClient().get(url);
        setUsers(data.data);
        setTotal(data.last_page);
        setLoading(false)
    }

    const deleteUser = async (id, index) => {
        await HttpClient().post('/api/admin/user/delete/'+id);
        setUsers(prevState => {
            const _users = [...prevState];
            _users.splice(index, 1);
            return _users;
        })
    }

    const resetSearch = () => {
        setName('');
        setEmail('');
        getUsers(0, true);
    }

    return (
        <section className='page-with-sidebar'>
            <Card className='mb-1'>
                <div className='row mb-1'>
                    <div className='col--3 mr-1'>
                        <Input value={name} onChange={e => setName(e.target.value)} label='Name'/>
                    </div>
                    <div className='col--3 mr-1'>
                        <Input value={email} onChange={e => setEmail(e.target.value)} label='Email'/>
                    </div>
                    <div className='col--3 mr-1'>
                        <Select value={role} onChange={e => setRole(e.target.value)} label='Role'>
                            <option value=''>Choose One</option>
                            {Object.keys(Roles).map((key, index) => (
                                <option key={index} value={Roles[key]}>{Roles[key]}</option>
                            ))}
                        </Select>
                    </div>
                </div>

                <Button className='btn--primary btn--small mr-1' onClick={() => getUsers(0)}>Search</Button>
                <Button className='btn--error btn--small' onClick={() => resetSearch()}>Reset</Button>
            </Card>
            <div className='list mb-1'>
                {users.map((_user, index) => (
                    <div key={index} className='list__item flex flex--align-center'>
                        <p style={{width: '30%'}}>{_user.name}</p>
                        <p style={{width: '30%'}}>{_user.email}</p>
                        <p style={{width: '10%'}}>{_user.role}</p>
                        <div className='flex'>
                            <Button className='btn--primary btn--small mr-1'
                                    disabled={user.role !== 'root-admin' && user.role !== 'admin'}
                                    onClick={() => history.push(`/users/${_user.id}/edit`)}>
                                Edit
                            </Button>
                            <Button className='btn--error btn--small'
                                    disabled={_user.role === 'root-admin' || user.id === _user._id}
                                    onClick={() => deleteUser(_user.id, index)}>Delete</Button>

                        </div>
                    </div>
                ))}
            </div>
            <Pagination activePage={page}
                        itemsCountPerPage={10}
                        totalItemsCount={total}
                        pageRangeDisplayed={5}
                        onChange={page => setPage(page)}/>
        </section>
    )
}
