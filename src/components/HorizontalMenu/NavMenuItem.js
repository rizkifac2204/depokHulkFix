import Link from "next/link";
import classnames from "classnames";
import formatMenuTitle from "utils/formatMenuTitle";

function NavMenuItem(props) {
  const { menu } = props;
  return (
    <>
      {menu.child_routes !== null ? (
        <li className="menu-item-has-child">
          <a href="javasacript:;" onClick={(e) => e.preventDefault()}>
            {menu.icon}
            <span>{formatMenuTitle(menu.menu_title)}</span>
          </a>
          <ul
            className={classnames("list-unstyled sub-menu", {
              "deep-level": menu.child_routes.length > 10,
            })}
          >
            {menu.child_routes.map((subMenu, subKey) => {
              if (!subMenu.third_child_routes) {
                return (
                  <li key={subKey}>
                    <Link
                      href={subMenu.path}
                      className="nav-link no-arrow"
                      activeclassname="active"
                    >
                      <span>{formatMenuTitle(subMenu.menu_title)}</span>
                    </Link>
                  </li>
                );
              }
              return (
                <li key={subKey} className="menu-item-has-child">
                  <a href="javasacript:;" onClick={(e) => e.preventDefault()}>
                    <span>{formatMenuTitle(subMenu.menu_title)}</span>
                  </a>
                  <ul className="list-unstyled sub-menu hjh">
                    {subMenu.third_child_routes.map((nestedMenu, nestedKey) => (
                      <li key={nestedKey}>
                        <Link href={nestedMenu.path}>
                          <span>{formatMenuTitle(nestedMenu.menu_title)}</span>
                        </Link>
                      </li>
                    ))}
                  </ul>
                </li>
              );
            })}
          </ul>
        </li>
      ) : (
        <li>
          <Link href={menu.path}>
            {menu.icon}
            <span>{formatMenuTitle(menu.menu_title)}</span>
          </Link>
        </li>
      )}
    </>
  );
}

export default NavMenuItem;
