import React, { useState } from "react";
import styled from "styled-components";
import axios from "axios";
import { useDispatch } from "react-redux";
import { loginFailure, loginStart, loginSuccess } from "../redux/userSlice";
import { auth, provider } from "../firebase";
import { signInWithPopup } from "firebase/auth";
import { useNavigate } from "react-router-dom";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: calc(100vh - 56px);
  color: ${({ theme }) => theme.text};
`;

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  background-color: ${({ theme }) => theme.bgLighter};
  border: 1px solid ${({ theme }) => theme.soft};
  padding: 20px 50px;
  gap: 10px;
`;

const Title = styled.h1`
  font-size: 24px;
`;

const Input = styled.input`
  border: 1px solid ${({ theme }) => theme.soft};
  border-radius: 3px;
  padding: 10px;
  background-color: transparent;
  width: 100%;
  color: ${({ theme }) => theme.text};
`;

const Button = styled.button`
  border-radius: 3px;
  border: none;
  padding: 10px 20px;
  font-weight: 500;
  cursor: pointer;
  background-color: ${({ theme }) => theme.soft};
  color: ${({ theme }) => theme.textSoft};
`;

const SignIn = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSignInForm, setIsSignInForm] = useState(true);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    dispatch(loginStart());
    try {
      if (isSignInForm) {
        const res = await axios.post("/auth/signin", { name, password });
        dispatch(loginSuccess(res.data));
      } else {
        const res = await axios.post("/auth/signup", { name, email, password });

        dispatch(loginSuccess(res.data));
      }
      navigate("/");
    } catch (err) {
      dispatch(loginFailure());
    }
  };

  const signInWithGoogle = async () => {
    dispatch(loginStart());
    signInWithPopup(auth, provider)
      .then((result) => {
        axios
          .post("/auth/google", {
            name: result.user.displayName,
            email: result.user.email,
            img: result.user.photoURL,
          })
          .then((res) => {
            dispatch(loginSuccess(res.data));
            navigate("/");
          });
      })
      .catch((error) => {
        dispatch(loginFailure());
      });
  };

  const toggleForm = () => {
    setIsSignInForm(!isSignInForm);
  };

  return (
    <Container>
      {isSignInForm ? (
        <Wrapper>
          <Title>Sign in</Title>
          <Input
            placeholder="username"
            onChange={(e) => setName(e.target.value)}
          />
          <Input
            type="password"
            placeholder="password"
            onChange={(e) => setPassword(e.target.value)}
          />
          <Button onClick={handleLogin}>Sign in</Button>
          <Title>or</Title>
          <Button onClick={signInWithGoogle}>Signin with Google</Button>
          <p>
            Don't have an account?{" "}
            <span style={{ color: "blue", cursor: "pointer" }} onClick={toggleForm}>
              Sign up
            </span>
          </p>
        </Wrapper>
      ) : (
        <Wrapper>
          <Title>Sign up</Title>
          <Input
            placeholder="username"
            onChange={(e) => setName(e.target.value)}
          />
          <Input placeholder="email" onChange={(e) => setEmail(e.target.value)} />
          <Input
            type="password"
            placeholder="password"
            onChange={(e) => setPassword(e.target.value)}
          />
          <Button onClick={handleLogin}>Sign up</Button>
          <Title>or</Title>
          <Button onClick={signInWithGoogle}>Signup with Google</Button>
          <p>
            Already have an account?{" "}
            <span style={{ color: "blue", cursor: "pointer" }} onClick={toggleForm}>
              Sign in
            </span>
          </p>
        </Wrapper>
      )}
    </Container>
  );
};

export default SignIn;
