import React from 'react'
import './header.styles.scss'
import {Link} from 'react-router-dom'
import {ReactComponent as Logo} from '../../assets/crown.svg'
import {connect} from 'react-redux'
import {createStructuredSelector} from 'reselect'
import {selectCartHidden} from '../../redux/cart/cart.selectors'
import {selectCurrentUser} from '../../redux/user/user.selectors'

import {HeaderContainer, OptionsContainer, TextContainer, LogoContainer, OptionDiv, OptionLink} from './header.styles'

import CartIcon from '../cart-icon/cart-icon.component'

import CartDropdown from '../cart-dropdown/cart-dropdown.component'
import {signOutStart} from '../../redux/user/user.actions'

const Header=({currentUser, hidden, signOutStart})=> (
    <HeaderContainer>
        <LogoContainer to="/">
            <Logo className='logo'></Logo>
        </LogoContainer>
        <TextContainer to='/'>SYMPA CLOTHING</TextContainer>
        <OptionsContainer>
            <OptionLink to="/shop">
            SHOP
            </OptionLink>
            <OptionLink to="/shop">
            CONTACT
            </OptionLink>
            {
                currentUser ? <OptionLink as="div" onClick={signOutStart}>SIGN OUT</OptionLink>
                :<OptionLink to='/signin'>SIGN IN</OptionLink>
            }
            <CartIcon/>
        </OptionsContainer>
        {
            hidden ? null: <CartDropdown/>
        }
        
    </HeaderContainer>
)

const mapStateToProps = (state) => createStructuredSelector({
    currentUser:selectCurrentUser,
    hidden:selectCartHidden
})

const mapDispatchToProps = (dispatch)=>({
    signOutStart:()=>dispatch(signOutStart())
})
export default connect(mapStateToProps, mapDispatchToProps)(Header)
