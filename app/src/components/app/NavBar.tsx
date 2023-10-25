import "@/assets/navbar.less";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import {
  selectAuthenticated,
  selectUsername,
  validateToken,
} from "../../store/auth.ts";
import { Button } from "../ui/button.tsx";
import { Menu } from "lucide-react";
import { useEffect } from "react";
import { login, tokenField } from "../../conf.ts";
import { toggleMenu } from "../../store/menu.ts";
import ProjectLink from "../ProjectLink.tsx";
import ModeToggle from "../ThemeProvider.tsx";
import I18nProvider from "../I18nProvider.tsx";
import router from "../../router.tsx";
import MenuBar from "./MenuBar.tsx";

function NavMenu() {
  const username = useSelector(selectUsername);

  return (
    <div className={`avatar`}>
      <MenuBar>
        <Button variant={`ghost`} size={`icon`}>
          <img src={`https://api.deeptrain.net/avatar/${username}`} alt="" />
        </Button>
      </MenuBar>
    </div>
  );
}

function NavBar() {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  useEffect(() => {
    validateToken(dispatch, localStorage.getItem(tokenField) ?? "");
  }, []);
  const auth = useSelector(selectAuthenticated);

  return (
    <nav className={`navbar`}>
      <div className={`items`}>
        <Button
          size={`icon`}
          variant={`ghost`}
          onClick={() => dispatch(toggleMenu())}
        >
          <Menu />
        </Button>
        <img
          className={`logo`}
          src="/favicon.ico"
          alt=""
          onClick={() => router.navigate("/")}
        />
        <div className={`grow`} />
        <ProjectLink />
        <ModeToggle />
        <I18nProvider />
        {auth ? (
          <NavMenu />
        ) : (
          <Button size={`sm`} onClick={login}>
            {t("login")}
          </Button>
        )}
      </div>
    </nav>
  );
}

export default NavBar;
