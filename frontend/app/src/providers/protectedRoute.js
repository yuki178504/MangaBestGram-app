import { withAuthenticationRequired } from "@auth0/auth0-react";
import ReactLoading from "react-loading";

const ProtectedRoute = ({ component, ...args }) => {
  const Cp = withAuthenticationRequired(component, {
    onRedirecting: () => <ReactLoading type="spin" color='blue' className='loading' />
  });
  return <Cp {...args} />
};

export default ProtectedRoute;
