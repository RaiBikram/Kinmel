import React from "react";
import { Link } from "react-router-dom";
import { FaFacebook } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa";
import { RiTwitterXFill } from "react-icons/ri";
import { FaWhatsapp } from "react-icons/fa";

export default function Footer() {
  return (
    <div
      className="container-fluid"
      style={{
        backgroundColor: "#232F3E",
        color:"white"
      }}
    >
      <div className="row border-top  ">
        <div className="col-lg-3  mt-4">
          <h3 className="fs-5">Kinmel </h3>
          <p className="my-2" style={{ fontSize: "14px" }}>
            &copy;2024, Kinmel Ltd.
            <br />
            All rights reserved.
          </p>
          <h5 className="footer">
            <a href="#">
              <FaFacebook /> &nbsp; &nbsp;
            </a>
            <a href="#">
              <FaInstagram />
              &nbsp; &nbsp;
            </a>
            <a href="#">
              <RiTwitterXFill />
              &nbsp; &nbsp;
            </a>
            <a href="#">
              <FaWhatsapp />
            </a>
          </h5>
        </div>
        <div className="col-lg-3 mt-4">
          <h5 className=" fs-6 ">Company</h5>
          <p className="footer">
            <a href="#"> About</a>
            <br />
            <a href="#">Products</a>
            <br />
            <a href="">Pricing</a>
            <br />
            <a href="#">Referral programme</a>
            <br />
            <a href="#">Careers</a>
            <br />
            <a href="#">Press & media</a>
            <br />
            <a href="#">Kinmel Cares</a>
            <br />
          </p>
        </div>
        <div className="col-lg-3 mt-4">
          <h3 className="fs-6">Support</h3>
          <p className="footer">
            <a href="#">Contact us</a> <br />
            <a href="#">Kinmel blog</a>
            <br />
            <a href="#">List of charges</a>
            <br />
            <a href="#">Downloads & resources</a>
            <br />
            <a href="#">How to file a complaint?</a>
            <br />
            <a href="#">Status of your complaints</a>
          </p>
        </div>
        <div className="col-lg-3 mt-4">
          <h3 className="fs-6">Account</h3>
          <p className="footer">
            <a href="">Open an account</a>
            <br />
            <a
              href="#
"
            >
              Fund transfer
            </a>
            <br />
          </p>
        </div>
        <div className="row my-4 ">
          <div className="col-10  text-center footer mt-2" 
          style={{fontSize:"13px"}}
          >
            <Link to="/about">About &nbsp; </Link> <Link to="/contact">Contact &nbsp;</Link>

            <Link
              to="/p
        olicy"
            >
              Privacy and policy
            </Link>
          </div>
          {/* <div className="col-2"></div> */}
          <div className="col-2 footer mt-2" style={{ fontSize: "10px" }}>
            Designed & Developed by: &nbsp;
            <a href="https://bikramrai-portfolio.vercel.app/">Bikram Rai</a>
          </div>
        </div>
      </div>
    </div>
  );
}
