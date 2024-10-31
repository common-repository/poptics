/**
 * Wordpress Dependencies
 */
import { useState, useEffect } from "@wordpress/element";

import { Menu } from "../../../common/components";
import { CAMPAIGN_PATH } from "../../router/routeDefinition";
import { useLocation, useNavigate } from "react-router-dom";
import { items } from "./MenuItems";

const TopMenuBar = () => {
  const [defaultKey, setDefaultKey] = useState(CAMPAIGN_PATH);

  const navigate = useNavigate();
  const location = useLocation();

  const onClick = (e) => {
    setDefaultKey(e.key);
    navigate(e.key);
  };

  useEffect(() => {
    setDefaultKey(location.pathname);
  }, [location]);

  return (
    <Menu
      onClick={onClick}
      items={items}
      current={defaultKey}
      className="pt-nav"
    />
  );
};

export default TopMenuBar;
