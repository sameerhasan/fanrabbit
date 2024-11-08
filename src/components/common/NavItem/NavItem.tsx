import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { Typography } from "@mui/material";
import styles from "./NavItem.module.css";

interface INavItem {
  img?: string;
  title: string;
  route: string;
  lightImg?: string;
  hoverImage?: string;
}

const NavItem: React.FC<INavItem> = ({
  img,
  title,
  route,
  lightImg,
  hoverImage,
}) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <NavLink
      to={route}
      className={({ isActive }) =>
        isActive ? `${styles.navLink} ${styles.active}` : styles.navLink
      }
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {({ isActive }) => (
        <>
          {img && (
            <img
              src={isActive ? lightImg : isHovered ? hoverImage : img}
              alt="icon"
              className={styles.img}
            />
          )}
          <Typography
            className={styles.title}
            sx={{
              marginLeft: "14px",
              fontSize: "14px",
              fontWeight: "600",
              lineHeight: "17px",
              color: "#000000",
              fontFamily: "Inter",
            }}
          >
            {title}
          </Typography>
        </>
      )}
    </NavLink>
  );
};

export default NavItem;
