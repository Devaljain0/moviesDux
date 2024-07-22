import React from 'react'
import '../styles.css';

export default function Footer(){
    const currYear= new Date().getFullYear();
    return(
        <footer className='footer'>
            <p className='footer-text'>
            © {currYear}  Moviesdux, All rights reserved.
            </p>
        </footer>
    );
}