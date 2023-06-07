import React from "react";
import { AiOutlineTwitter, AiFillFacebook, AiFillGithub } from "react-icons/ai";
import { Link } from "react-router-dom";
const Footer = () => {
  return (
    <>
      <footer>
        <section className="newsletter">
          <div className="left-side">
            <img src="images/newsletter.png" alt="" />
            <h1>Sign Up For Newsletter</h1>
          </div>
          <div className="right-side">
            <input type="text" placeholder="Your Email" />
            <div className="button">
              <p>Subscribe</p>
            </div>
          </div>
        </section>
        <section className="main-footer">
          <div className="links-container">
            <h2>Contact Us</h2>
            <ul>
              <li>
                DigiCom Store.
                <br />
                No 29,Lal Bagh Shujabad,Multan <br />
                Pakistan
              </li>
              <li>+92-3064799034</li>
              <li>mukhtarhamza294@gmail.com</li>
            </ul>
            <div className="social-icons">
              <AiOutlineTwitter className="social-icon" />
              <AiFillFacebook className="social-icon" />
              <AiFillGithub className="social-icon" />
            </div>
          </div>
          <div className="links-container">
            <h2>Information</h2>
            <ul>
              <li>
                <Link to="privacy-policy">Privacy Policy</Link>
              </li>
              <li>
                <Link to="refund-policy">Refund Policy</Link>
              </li>
              <li>
                <Link to="shipping-policy">Shipping Policy</Link>
              </li>
              <li>
                <Link to="tos">Terms of Service</Link>
              </li>
            </ul>
          </div>
          <div className="links-container">
            <h2>Account</h2>
            <ul>
              <li>
                <Link to="/">Search</Link>
              </li>
              <li>
                <Link to="contact">About Us</Link>
              </li>
              <li>
                <Link to="contact">Faq</Link>
              </li>
              <li>
                <Link to="contact">Contact</Link>
              </li>
            </ul>
          </div>
          <div className="links-container">
            <h2>Quick Links</h2>
            <ul>
              <li>
                <Link to="store">Accessories</Link>
              </li>
              <li>
                <Link to="store">Laptops</Link>
              </li>
              <li>
                <Link to="store">Headphones</Link>
              </li>
              <li>
                <Link to="store">Smart Watches</Link>
              </li>
            </ul>
          </div>
        </section>
        <section className="banner-bottom">
          <p>&copy;2023, DigiCom.Powered By HRao</p>
        </section>
      </footer>
    </>
  );
};

export default Footer;
