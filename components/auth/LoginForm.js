import { useState } from "react";
import {
  Button,
  InputGroup,
  InputGroupText,
  InputGroupAddon,
  Input,
} from "reactstrap";

const SignInForm = ({ onSubmit }) => {
  const initialState = {
    email: "",
    password: "",
  };
  const [userData, setUserData] = useState(initialState);
  const { email, password } = userData;
  const handleChangeInput = (e) => {
    const { name, value } = e.target;
    setUserData({ ...userData, [name]: value });
  };
  return (
    <form className="mt-3" onSubmit={(e) => onSubmit(e, userData)}>
      <InputGroup>
        <InputGroupAddon addonType="prepend">
          <InputGroupText>
            <i className="ri-mail-send-fill"></i>
          </InputGroupText>
        </InputGroupAddon>
        <input
          className="form-control"
          placeholder="Email"
          name="email"
          value={email}
          onChange={handleChangeInput}
          required
        />
      </InputGroup>
      <InputGroup className="mt-3">
        <InputGroupAddon addonType="prepend">
          <InputGroupText>
            <i className="ri-lock-2-fill"></i>
          </InputGroupText>
        </InputGroupAddon>
        <input
          className="form-control"
          type="password"
          placeholder="password"
          name="password"
          value={password}
          onChange={handleChangeInput}
          required
        />
      </InputGroup>
      <InputGroup>
        <Button type="submit" className="btn-signin mt-3" block>
          Submit
        </Button>
      </InputGroup>
    </form>
  );
};

export default SignInForm;
