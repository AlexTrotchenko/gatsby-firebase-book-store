import { Link } from "gatsby"
import PropTypes from "prop-types"
import React,{useContext} from "react"
import FirebaseContext from '../firebase/context'
import styled from 'styled-components';

const HeaderWrapper = styled.header`
  background: rebeccapurple;
  margin-bottom: 1.45rem;
`
const Divider =styled.span`
  margin: 0 8px;
  padding-right:1px;
  background:#ddd;
`
const HeaderContent = styled.div`
  margin:0 auto;
  max-width:960px;
  padding:1.45rem 1.0875rem;
  display:flex;

  >h1{
    margin:0;
    flex-grow:1;
  
  >a{
    color:white;
    text-decoration:none;
    cursor:pointer;
  }}
`
const UserInfo = styled.div`
  margin:auto 0;
  text-align:right;
  div{
    text-decoration:none;
  color:white;
  }
  a{
  text-decoration:none;
  color:white;
  cursor:pointer;
  }
`
const LogoutLink =styled.div`
  text-decoration:none;
  color:white;
  cursor:pointer;
`
const AdminLink = styled.span`
  a{
    color:white;
    text-decoration:none;
    cursor:pointer;}
`

const Header = ({ siteTitle }) => {
  const{user,loading,firebase} = useContext(FirebaseContext)
  console.log(user)
  const handleLogOut = () =>firebase.logout()
  return(
  <HeaderWrapper>
    <HeaderContent>
      <h1 >
        <Link to="/">
          {siteTitle}
        </Link>
      </h1>
        <UserInfo>
          {
            !loading&&user
            ?<div>Hello {user.userName || user.email}</div>
            :null
          }
          {
            !loading && user && !!user.isAdmin &&
            <>
            <AdminLink>
              <Link to="/add-book">Add book</Link>
            </AdminLink>
              <Divider/>
            <AdminLink>
              <Link to="/add-author">Add author</Link>
            </AdminLink>
            </>
          }
          {
            !loading&&!user
            ?<>
              <Link to = "/login">Login</Link>
              <Divider/>
              <Link to = "/register">Register</Link>
            </>
            :<LogoutLink onClick={handleLogOut}>Logout</LogoutLink>
          }
        </UserInfo>
    </HeaderContent>
  </HeaderWrapper>
)}

Header.propTypes = {
  siteTitle: PropTypes.string,
}

Header.defaultProps = {
  siteTitle: ``,
}

export default Header
