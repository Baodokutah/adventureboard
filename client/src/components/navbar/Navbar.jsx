import { Component } from "react";
import "./navbar.css";
import { Link } from "react-router-dom";
import { styled } from '@mui/material/styles';
import SearchIcon from '@mui/icons-material/Search';
import Input from '@mui/joy/Input';
import clsx from 'clsx';
import { useSwitch } from '@mui/base/useSwitch';
import { useNavigate, useLocation } from 'react-router-dom';
import { AuthContext } from "../../context/auth/firebase-context";
import { NotificationsButton } from "../notifications-button";
import { AccountButton } from "../account-button";
import { withAuth } from "../../hooks/use-auth";

function MUISwitch(props) {

  const navigate = useNavigate();
  const location = useLocation();
  const isCtxh = location.pathname.startsWith('/ctxh');
  const isStudy = location.pathname.startsWith('/study');

  const handleChange = (event) => {
    navigate(event.target.checked ? '/study' : '/ctxh');
  };
  
  const { getInputProps } = useSwitch({
    ...props,
    onChange: handleChange,
  });

  const stateClasses = {
    checked: isStudy,
    disabled: isCtxh,
    focusVisible: props.focusVisible,
  };

  return (
    <SwitchRoot className={clsx(stateClasses)}>
      <SwitchTrack>
        <SwitchThumb className={clsx(stateClasses)} />
      </SwitchTrack>
      <SwitchInput {...getInputProps()} aria-label="Demo switch" />
    </SwitchRoot>
  );
}


const grey = {
  50: '#F3F6F9',
  100: '#E5EAF2',
  200: '#DAE2ED',
  300: '#C7D0DD',
  400: '#B0B8C4',
  500: '#9DA8B7',
  600: '#6B7A90',
  700: '#434D5B',
  800: '#303740',
  900: '#1C2025',
};

const SwitchRoot = styled('span')`
  display: inline-block;
  position: relative;
  width: 85px;
  height: 55px;
  padding: 8px;
`;

const SwitchInput = styled('input')`
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  opacity: 0;
  z-index: 1;
  margin: 0;
  cursor: pointer;
`;

const SwitchThumb = styled('span')`
  position: absolute;
  display: block;
  background-color: #8B5A2B;
  width: 35px;
  height: 35px;
  border-radius:50px;
  top: 10px;
  left: 13.5px;
  transition: transform 150ms cubic-bezier(0.4, 0, 0.2, 1);

  &::before {
    display: block;
    content: '';
    width: 100%;
    height: 100%;

    /* false positive: */
    /* stylelint-disable unit-no-unknown */
    background: url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" height="22" width="24" viewBox="0 0 22 24"><path fill="${encodeURIComponent(
        '#fff',
      )}" d="M16.9276 13.2H11.0016V19.2H16.9276V13.2ZM15.7424 0V2.4H6.26089V0H3.89052V2.4H2.70533C1.38978 2.4 0.346813 3.48 0.346813 4.8L0.334961 21.6C0.334961 22.92 1.38978 24 2.70533 24H19.2979C20.6016 24 21.6683 22.92 21.6683 21.6V4.8C21.6683 3.48 20.6016 2.4 19.2979 2.4H18.1127V0H15.7424ZM19.2979 21.6H2.70533V8.4H19.2979V21.6Z"/></svg>')
      center center no-repeat;
    /* stylelint-enable unit-no-unknown */
  }

  &.focusVisible {
    background-color: #79b;
  }

  &.checked {
    transform: translateX(24px);

    &::before {
      /* false positive: */
      /* stylelint-disable unit-no-unknown */
      background-image: url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="22" height="18" viewBox="0 0 22 18"><path fill="${encodeURIComponent(
        '#fff',
      )}" d="M4 10.18V14.18L11 18L18 14.18V10.18L11 14L4 10.18ZM11 0L0 6L11 12L20 7.09V14H22V6L11 0Z"/></svg>');
      /* stylelint-enable unit-no-unknown */
    }
  }
`;

const SwitchTrack = styled('span')(
  ({ theme }) => `
  background-color: ${theme.palette.mode === 'dark' ? grey[800] : grey[400]};
  border-radius: 50px;
  width: 100%;
  height: 100%;
  display: block;
`,
);
export function withLocation(Component) {
  return function WrappedComponent(props) {
    const location = useLocation();
    console.log(location); // Thêm dòng này để kiểm tra giá trị của location
    return <Component {...props} location={location} />;
  }
}




class Navbar extends Component{
    state = {
        clicked: false,
      };
   
      static contextType = AuthContext;

handleClick = () => {
    this.setState({clicked: !this.state.clicked})
}
handleLogin = async () => {
    // This is where you might have actual login logic in a real application.
    // For now, we'll just update the state to simulate a login.
    const { signInWithGoogle } = this.props;
    await signInWithGoogle();
  };



render(){
  const { location } = this.props;
  const { isAuthenticated } = this.context;

return (
    <>
      <nav className={isAuthenticated ? "logged" : "nav"}>
            <Link to="/">
                <img src={process.env.PUBLIC_URL + '/assets/logo/logo.svg'} alt="logo" style={{width: '75px', height: '75px'}} />
            </Link>
            {isAuthenticated  ? (
                <div>
                <ul id="navbar" className={this.state.clicked ? "#navbar active" : "#navbar"}>
                {location.pathname !== "/"  ? (
                  <>
                    <li id="switch">
                      <MUISwitch  defaultChecked />
                    </li>
                    <li>
                    <Input

                        color="neutral"
                        placeholder="Tìm kiếm bài đăng"
                        variant="outlined"
                    />
                    </li>
                    <li><SearchIcon   fontSize="large"  /></li>
                    <li>
                  <NotificationsButton/>
                    </li>
                    <li>
                    {/* <Link to="/profile">    
                    <Avatar
                      alt="Avatar"
                      fontSize="large" 
                      src={process.env.PUBLIC_URL +'/assets/avatar/avatar.png'}
                        />
                      </Link> */}
                      <AccountButton />
                      </li>
                    </>
            ) : (
                    <div id="navhome" >
                    <li>
                   <NotificationsButton />               
                    </li>
                    <li>
                    {/* <Link to="/profile">
                    <Avatar
                      fontSize="large" 
                      alt="Avatar"
                      src={process.env.PUBLIC_URL +'/assets/avatar/avatar.png'}
                        />
                    </Link> */}
                    <AccountButton />
                    </li>
                    </div>
            )}
                </ul>
            </div>
            )
            : (
            <div>
                <ul id="navbar" className={this.state.clicked ? "#navbar active" : "#navbar"}>
                    <li><Link to="/">Trang chủ</Link></li>
                    <li><Link to="ctxh">CTXH</Link></li>
                    <li><Link to="study">Nhóm môn học</Link></li>
                    <li><div onClick={this.handleLogin}><span className="login">Đăng nhập</span></div></li>
                </ul>
            </div>
            )}

            <div className="mobile" onClick={this.handleClick}>
            <i id="bar" className={this.state.clicked ? "fas fa-times" : "fas fa-bars"}></i>
            </div>

        </nav>
    </>
);
}
}

export default withLocation(withAuth(Navbar));