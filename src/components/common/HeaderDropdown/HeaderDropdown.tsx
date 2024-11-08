import { useRef, useState } from "react";

import { Box, Divider } from "@mui/material";

import { IconButton } from "@mui/material";

import ClickAwayListener from "@mui/material/ClickAwayListener";
import Grow from "@mui/material/Grow";
import Paper from "@mui/material/Paper";
import Popper from "@mui/material/Popper";
import MenuItem from "@mui/material/MenuItem";
import MenuList from "@mui/material/MenuList";

import { useAuth } from "../../../context/Auth";

import styles from "./HeaderDropdown.module.css";

import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import logoutIcon from "../../../assets/header/logout.svg";

const HeaderDropdown = ({ isBurgerMenu }: { isBurgerMenu?: boolean }) => {
  const { logout } = useAuth();

  const [open, setOpen] = useState(false);
  const anchorRef = useRef<HTMLDivElement>(null);

  const handleToggle = () => {
    setOpen((prevOpen) => !prevOpen);
  };

  const handleLogOut = () => {
    logout();
    window.location.reload();
  };

  const handleClose = (event: Event) => {
    if (
      anchorRef.current &&
      anchorRef.current.contains(event.target as HTMLElement)
    ) {
      return;
    }

    setOpen(false);
  };
  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        paddingTop: "15px",
        paddingBottom: "15px",
      }}
    >
      <Box
        sx={{
          position: "relative",
        }}
      >
        <IconButton onClick={handleToggle}>
          <KeyboardArrowDownIcon className={open ? styles.rotate : undefined} />
        </IconButton>

        <Popper
          sx={{
            zIndex: 1,
            position: "absolute !important",
            top: isBurgerMenu ? "35px !important" : "50px !important",
            left: isBurgerMenu ? "0px !important" : "-170px !important",
            width: "200px !important",
          }}
          open={open}
          anchorEl={anchorRef.current}
          role={undefined}
          transition
          disablePortal
        >
          {({ TransitionProps, placement }) => (
            <Grow
              {...TransitionProps}
              style={{
                transformOrigin:
                  placement === "bottom" ? "center top" : "center bottom",
              }}
            >
              <Paper sx={{ padding: "5px", borderRadius: "8px" }}>
                <ClickAwayListener onClickAway={handleClose}>
                  <MenuList id="split-button-menu" autoFocusItem>
                    {
                      <>
                        {/* <NavLink
                          to={routes.index}
                          onClick={() => setSubPage("Personal_data")}
                          className={styles.link}
                        >
                          <MenuItem
                            sx={{
                              fontSize: "14px",
                              marginBottom: "7px",
                              color: "#000000",
                              fontWeight: "600",
                              fontFamily: "Inter",
                            }}
                          >
                            <img
                              src={user}
                              alt="Personal data"
                              className={styles.icon}
                            />
                            {t("Personal_data")}
                          </MenuItem>
                        </NavLink> */}
                        {/* <Divider /> */}
                        {/* <NavLink
                          to={routes.settings}
                          onClick={() => setSubPage("Billing")}
                          className={styles.link}
                        >
                          <MenuItem
                            sx={{
                              fontSize: "14px",
                              color: "#000000",
                              marginTop: "7px",
                              marginBottom: "7px",
                              fontWeight: "600",
                              fontFamily: "Inter",
                            }}
                          >
                            <img
                              src={credit}
                              alt="Billing & Payment"
                              className={styles.icon}
                            />
                            {t("Billing_Payment")}
                          </MenuItem>
                        </NavLink> */}
                        {/* <Divider /> */}
                        {/* <MenuItem
                          onClick={() =>
                            window.open("https://chatlix.eu/#kontakt", "_blank")
                          }
                          sx={{
                            color: "#000000",
                            fontWeight: "600",
                            fontSize: "14px",
                            fontFamily: "Inter",
                            marginTop: "5px",
                          }}
                        >
                          <img
                            src={help}
                            alt="support"
                            className={styles.icon}
                          />
                          {t("Support")}
                        </MenuItem> */}

                        {/* <Divider /> */}
                        <MenuItem
                          onClick={handleLogOut}
                          sx={{
                            color: "#000000",
                            fontWeight: "600",
                            fontSize: "14px",
                            fontFamily: "Inter",
                            marginTop: "5px",
                          }}
                        >
                          <img
                            src={logoutIcon}
                            alt="logout"
                            className={styles.icon}
                          />
                          Logout
                        </MenuItem>
                      </>
                    }
                  </MenuList>
                </ClickAwayListener>
              </Paper>
            </Grow>
          )}
        </Popper>
      </Box>
    </Box>
  );
};

export default HeaderDropdown;
