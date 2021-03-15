import {
  Button,
  InputGroup,
  InputGroupText,
  InputGroupAddon,
  Input,
} from "reactstrap";

const SignInForm = ({ onSubmit }) => {
  return (
    <form
      className="mt-3"
      // onSubmit={handleSubmit(onSubmit)}
    >
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
