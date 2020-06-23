import React, {useContext, useEffect, useState} from "react";
import {Link, useHistory} from "react-router-dom";
import validator from "validator";
import HttpClient from "../../../../Services/HttpClient";
import Alert from "../../../../Components/Alert/Alert";
import Input from "../../../../Components/Input/Input";
import Button from "../../../../Components/Button/Button";
import AppContext from "../../../Contexts/AppContext";
import Select from "../../../../Components/Select/Select";
import Roles from "../../../Data/Roles";

export default function () {
    const history = useHistory();
    const {showNotification, user} = useContext(AppContext);
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [error, setError] = useState([]);
    const [password, setPassword] = useState("");
    const [passwordAgain, setPasswordAgain] = useState("");
    const [generalError, setGeneralError] = useState("");
    const [role, setRole] = useState(Roles.USER);

    useEffect(() => {
    }, [])

    const onSubmit = async event => {
        event.preventDefault();
        let _error = {};
        setError({});

        if (!name.trim()) _error.name = "Name is required";
        if (!email.trim()) _error.email = "Email is required";
        else if (!validator.isEmail(email)) _error.email = "Email must be in correct format";
        if (!password) _error.password = "Password is required";
        if (!passwordAgain) _error.passwordAgain = "Password confirmation is required";
        else if (password !== passwordAgain) _error.passwordAgain = "Passwords must match";
        if (Object.keys(_error).length) return setError(_error);

        try {
            const data = {
                name,
                email,
                password,
                role
            };

            await HttpClient().post("/api/admin/user/create", data);
            setName('');
            setEmail('');
            setPassword('');
            setPasswordAgain('');
        } catch (e) {
            setGeneralError(e.response.data.message);
        }

    };

    return (
        <section className='page-with-sidebar'>
            <div className="row">
                <div className="col--6">
                    <Alert type='primary'>Here you can create a user.</Alert>
                    <form onSubmit={onSubmit}>
                        {generalError && <Alert type="error">{generalError}</Alert>}
                        <div className='form__group mb-1'>
                            <Select value={role} onChange={e => setRole(e.target.value)} error={error.role} label='Role'>
                                {Object.keys(Roles).filter(item => item !== 'ROOT_ADMIN').map((key, index) => (
                                    <option key={index} value={Roles[key]}>{Roles[key].toUpperCase()}</option>
                                ))}
                            </Select>
                        </div>
                        <div className="form__group mb-1">
                            <Input onChange={e => setName(e.target.value)} value={name} label="Name"
                                   error={error.name}/>
                        </div>
                        <div className="form__group mb-1">
                            <Input onChange={e => setEmail(e.target.value)} value={email} label="Email"
                                   error={error.email}/>
                        </div>
                        <div className="form__group mb-1">
                            <Input type="password" onChange={e => setPassword(e.target.value)} value={password}
                                   label="Password"
                                   error={error.password}/>
                        </div>

                        <div className="form__group mb-1">
                            <Input type="password" onChange={e => setPasswordAgain(e.target.value)}
                                   value={passwordAgain}
                                   label="Password Confirmation" error={error.passwordAgain}/>
                        </div>

                        <Button success type="submit">Create</Button>
                    </form>
                </div>
            </div>
        </section>
    )
}
