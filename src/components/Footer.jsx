import React from "react";

function Footer() {
  return (
    <footer className="footer footer-center bg-base-200/90  p-8 text-base-content ">
      <aside>
        <p>Copyright © {new Date().getFullYear()} - Vitalie Lozan.</p>
      </aside>
    </footer>
  );
}

export default Footer;
