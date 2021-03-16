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
    name: "",
    email: "",
    password: "",
    cf_password: "",
  };
  const [userData, setUserData] = useState(initialState);
  const { name, email, password, cf_password } = userData;

  const handleChangeInput = (e) => {
    const { name, value } = e.target;
    setUserData({ ...userData, [name]: value });
  };

  return (
    <form className="mt-3" onSubmit={(e) => onSubmit(e, userData)}>
      <InputGroup>
        <InputGroupAddon addonType="prepend">
          <InputGroupText>
            <i className="ri-user-fill"></i>
          </InputGroupText>
        </InputGroupAddon>
        <input
          className="form-control"
          name="name"
          placeholder="Name"
          required
          value={name}
          onChange={handleChangeInput}
        />
      </InputGroup>
      <InputGroup className="mt-3">
        <InputGroupAddon addonType="prepend">
          <InputGroupText>
            <i className="ri-mail-send-fill"></i>
          </InputGroupText>
        </InputGroupAddon>
        <input
          className="form-control"
          type="email"
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
      <InputGroup className="mt-3">
        <InputGroupAddon addonType="prepend">
          <InputGroupText>
            <i className="ri-lock-password-fill"></i>
          </InputGroupText>
        </InputGroupAddon>
        <input
          className="form-control"
          type="password"
          placeholder="Confirm password"
          name="cf_password"
          value={cf_password}
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

// import {
//   Button,
//   InputGroup,
//   InputGroupText,
//   InputGroupAddon,
//   Input,
// } from "reactstrap";

// const SignInForm = ({ onSubmit }) => {
//   return (
//     <form
//     // onSubmit={handleSubmit(onSubmit)}
//     >
//       <InputGroup>
//         <InputGroupAddon addonType="prepend">
//           <InputGroupText>
//             <i className="ri-user-fill"></i>
//           </InputGroupText>
//         </InputGroupAddon>
//         <input
//           className="form-control"
//           name="fullName"
//           placeholder="FullName"
//           required
//         />
//       </InputGroup>
//       <InputGroup>
//         <InputGroupAddon addonType="prepend">
//           <InputGroupText>
//             <i className="ri-mail-send-fill"></i>
//           </InputGroupText>
//         </InputGroupAddon>
//         <input
//           className="form-control"
//           placeholder="Email"
//           name="email"
//           required
//         />
//       </InputGroup>
//       <InputGroup>
//         <InputGroupAddon addonType="prepend">
//           <InputGroupText>
//             <i className="ri-smartphone-fill"></i>
//           </InputGroupText>
//         </InputGroupAddon>
//         <input
//           className="form-control"
//           placeholder="Phone no."
//           name="phoneno"
//           required
//         />
//       </InputGroup>
//       <InputGroup>
//         <InputGroupAddon addonType="prepend">
//           <InputGroupText>
//             <i className="ri-message-3-fill"></i>
//           </InputGroupText>
//         </InputGroupAddon>
//         <input
//           className="form-control"
//           type="textarea"
//           name="text"
//           id="exampleText"
//           placeholder="Message"
//           name="message"
//           required
//         />
//       </InputGroup>
//       <InputGroup>
//         <Button type="submit" className="btn-signin" block>
//           <i className="ri-save-2-line" style={{ float: "left" }}></i> Submit
//         </Button>
//       </InputGroup>
//     </form>
//   );
// };

// export default SignInForm;
