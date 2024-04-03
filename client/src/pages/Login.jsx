import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";
import Logo from "../assets/react.svg";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import { loginRoute } from "../utils/APIRoutes";

export default function Login() {
	const navigate = useNavigate();
	const [values, setValues] = useState({
		username: "",
		password: "",
	});

	const toastOptions = {
		position: "bottom-right",
		autoClose: 1500,
		pauseOnHover: true,
		draggable: true,
		theme: "dark",
	};

	useEffect(() => {
		if (localStorage.getItem("chat-app-user")) {
			navigate("/");
		}
	}, []);

	const handleSubmit = async (e) => {
		e.preventDefault();
		const { username, password } = values;

		if (handleValidation()) {
			const { data } = await axios.post(loginRoute, {
				username,
				password,
			});

			if (data.status === false) {
				toast.error(data.msg, toastOptions);
			}
			if (data.status === true) {
				localStorage.setItem(
					"chat-app-user",
					JSON.stringify(data.user),
					navigate("/"),
				);
			}
		}
	};

	const handleChange = (e) => {
		setValues({
			...values,
			[e.target.name]: e.target.value,
		});
	};

	const handleValidation = () => {
		const { username, password } = values;

		if (username === "") {
			toast.error("Email and Password are required.", toastOptions);
			return false;
		} else if (password === "") {
			toast.error("Email and Password are required.", toastOptions);
			return false;
		}

		return true;
	};

	// console.log(values);
	return (
		<>
			<FormContainer>
				<form onSubmit={handleSubmit}>
					<div className="brand">
						<img
							src={Logo}
							alt="logo"
						/>
						<h1>chat gor</h1>
					</div>
					<input
						type="text"
						placeholder="Username"
						name="username"
						value={values?.username}
						onChange={handleChange}
						min="3"
					/>
					<input
						type="password"
						placeholder="Password"
						name="password"
						value={values?.password}
						onChange={handleChange}
					/>
					<button type="submit">Login</button>
					<span>
						Don't have an account?
						<Link to="/register">Register</Link>
					</span>
				</form>
			</FormContainer>
			<ToastContainer />
		</>
	);
}

const FormContainer = styled.div`
	height: 100vh;
	width: 100vw;
	display: flex;
	flex-direction: column;
	justify-content: center;
	gap: 1rem;
	align-items: center;
	background-color: #131324;

	.brand {
		display: flex;
		align-items: center;
		justify-content: center;
		gap: 1rem;

		img {
			height: 5rem;
		}

		h1 {
			color: white;
			text-transform: uppercase;
		}
	}

	form {
		display: flex;
		flex-direction: column;
		gap: 2rem;
		background-color: #00000076;
		border-radius: 2rem;
		padding: 3rem 5rem;

		input {
			background-color: transparent;
			padding: 1rem;
			border: 0.1rem solid #4e0eff;
			border-radius: 0.4rem;
			color: white;
			font-size: 14px;
			&:focus {
				border: 0.1rem solid #997af0;
				outline: none;
			}
		}

		button {
			background-color: #997af0;
			color: white;
			padding: 1rem 2rem;
			border: none;
			font-weight: bold;
			cursor: pointer;
			border-radius: 0.4rem;
			font-size: 1rem;
			text-transform: uppercase;
			transition: 0.5s ease-in-out;
			&:hover {
				background-color: #4e0eff;
			}
		}
		
		span {
			color: white;
			text-transform: uppercase;

			a {
				color: #4e0eff
				text-transform: none;
				text-decoration: none;
				font-weight: bold;
			}
		}
	}
`;
