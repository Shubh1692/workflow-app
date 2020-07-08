import React from 'react';
import { Button, Form, } from 'react-bootstrap';
import { useCookies } from 'react-cookie';

const LoginPage = ({ history }) => {
    const [cookies, setCookie] = useCookies(['']);
    return (
        <div className='d-flex align-items-center justify-content-center h-100'>
            <Form onSubmit={(e) => {
                e.preventDefault();
                const form = e.currentTarget;
                const email = form.elements.email.value;
                const password = form.elements.password.value;
                setCookie('user', JSON.stringify({
                    email, password
                }));
                history.push('/home')
            }}>
                <Form.Group controlId='email'>
                    <Form.Label>Email</Form.Label>
                    <Form.Control autoFocus type='text' placeholder='Enter email' required />
                </Form.Group>
                <Form.Group controlId='password'>
                    <Form.Label>Password</Form.Label>
                    <Form.Control autoFocus type='text' placeholder='Enter Password' required />
                </Form.Group>
                <div className='d-flex align-item-center justify-content-between'>
                    <Button type='submit'>Submit</Button>
                </div>
            </Form>
        </div>
    )
}

export default LoginPage;