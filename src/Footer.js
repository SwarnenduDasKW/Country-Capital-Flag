import React from "react";
import "./Footer.css";
import TwitterIcon from "@material-ui/icons/Twitter";
import GitHubIcon from "@material-ui/icons/GitHub";
import LinkedInIcon from "@material-ui/icons/LinkedIn";

function Footer() {
  return (
    <div className="footer">
      <div className="footer__texts">
        <h1 className="footer__appname">
          Country Capital Currency Flag (C3F) ||
        </h1>
        <a
          href={"https://www.linkedin.com/in/swarnendu-das-41479531/"}
          target="_blank"
        >
          © Swarnendu Das ||
        </a>
        <h1 className="footer__disclaimer">Disclaimer ||</h1>
        <h1 className="footer__privacypolicy">Privacy Policy ||</h1>
        <h1 className="footer__sitemap">Sitemap ||</h1>
      </div>
      <div className="footer_social">
        <a
          href={"https://www.linkedin.com/in/swarnendu-das-41479531/"}
          target="_blank"
        >
          <LinkedInIcon fontSize="small" />
        </a>
        <GitHubIcon fontSize="small" />
        <a href={"https://twitter.com/SwarnenduDasgm1"} target="_blank">
          <TwitterIcon fontSize="small" />
        </a>
      </div>
    </div>
  );
}

export default Footer;
