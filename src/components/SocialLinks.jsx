import React from "react";
import { FaGithub, FaLinkedin, FaWhatsapp, FaTwitter } from "react-icons/fa";
import { HiOutlineMail } from "react-icons/hi";
import { BsFillPersonLinesFill } from "react-icons/bs";

const SocialLinks = () => {
  const links = [
    {
      id: 1,
      child: (
        <>
          GitHub <FaGithub size={30} />
        </>
      ),
      href: "https://github.com/hellosumitg",
      style: "rounded-tr-md"
    },
    {
      id: 2,
      child: (
        <>
          LinkedIn <FaLinkedin size={30} />
        </>
      ),
      href: "https://www.linkedin.com/in/hellosumitg/"
    },
    {
      id: 3,
      child: (
        <>
          Twitter <FaTwitter size={30} />
        </>
      ),
      href:"https://twitter.com/hellosumitg"
    },
    {
      id: 4,
      child: (
        <>
          WhatsApp <FaWhatsapp size={30} />
        </>
      ),
      href:"https://wa.me/919532477423"
    },
    {
      id: 5,
      child: (
        <>
          Mail <HiOutlineMail size={30} />
        </>
      ),
      href: "mailto:hellosumitg@yahoo.com",
      // href: "https://mail.google.com/mail/u/1/?view=cm&fs=1&to=sumitdev.tech@gmail.com&tf=1",
    },
    {
      id: 6,
      child: (
        <>
          Resume <BsFillPersonLinesFill size={30} />
        </>
      ),
      href: "/hellosumitg_resume.pdf",
      style: "rounded-br-md",
      download: true,
    },
  ];

  return (
    <div className="lg:flex flex-col top-[35%] left-[0%] fixed">
      <ul>
        {links.map(({ id, child, href, style, download }) => (
          <li
            key={id}
            className={
              "flex justify-between items-center w-40 h-14 px-4 ml-[-100px] hover:ml-[-10px] hover:rounded-md duration-300 bg-gray-500" +
              " " +
              style
            }
          >
            <a
              href={href}
              className="flex items-center justify-between w-full text-white"
              download={download}
              target="_blank"
              rel="noreferrer"
            >
              {child}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SocialLinks;
