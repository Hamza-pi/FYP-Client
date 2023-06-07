import React from "react";
import PageTopBanner from "../components/PageTopBanner";
import { AiFillHome, AiFillMail, AiOutlineInfo } from "react-icons/ai";
import { BsFillTelephoneFill } from "react-icons/bs";
import useScroll from "../hooks/useScroll";

const Contact = () => {
  useScroll();
  return (
    <>
      <PageTopBanner pagename={"Contact"} />
      <div className="main-container">
        <iframe
          title="Map"
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3459.522220452138!2d71.29391271458955!3d29.87804983336985!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x393b19f09bbb3f81%3A0x850c30e7b6a05a3d!2sQawar%20Idrees%20House!5e0!3m2!1sen!2s!4v1681195508603!5m2!1sen!2s"
          width="600"
          height="450"
          style={{ border: "0px", padding: "20px 12px", width: "100%" }}
          allowFullscreen=""
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        ></iframe>
        <div className="form-container">
          <form>
            <h2>Contact</h2>
            <div className="contact-inputs">
              <input type="text" placeholder="Name" />
              <input type="email" placeholder="Email *" />
              <input type="text" placeholder="Phone Number" />
              <textarea cols="30" rows="5" placeholder="Comment"></textarea>
            </div>
            <button
              type="submit"
              className="slide-btn"
              style={{ textTransform: "capitalize" }}
            >
              Send
            </button>
          </form>
          <span className="contact-details">
            <h2>Get In Touch With Us.</h2>
            <ul className="details">
              <li>
                <span className="icon">
                  <AiFillHome />
                </span>
                <p>
                  House no 29, Jalalpur road, Lal Bagh Shujabad,District Multan.
                </p>
              </li>
              <li>
                <span className="icon">
                  <BsFillTelephoneFill />
                </span>
                <p>(+92)306-4799034</p>
              </li>
              <li>
                <span className="icon">
                  <AiFillMail />
                </span>
                <p>mukhtarhamza@gmail.com</p>
              </li>
              <li>
                <span className="icon">
                  <AiOutlineInfo />
                </span>
                <p>Monday - Friday 10 AM - 7PM</p>
              </li>
            </ul>
          </span>
        </div>
      </div>
    </>
  );
};

export default Contact;
