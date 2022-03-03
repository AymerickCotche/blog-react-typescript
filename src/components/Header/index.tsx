import * as React from 'react';
import * as PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';
import './styles.scss';

type MyProps = {
  categories: { route: string; label: string }[];
  zenModeStatus: boolean;
  onClickZenBtn: Function;
};
const Header = ({ categories, onClickZenBtn, zenModeStatus }: MyProps) => {
  const handleClickZenBtn = () => {
    onClickZenBtn(!zenModeStatus);
  };
  return (
    <header className="menu">
      <nav>
        {categories.map(({ route, label }) => (
          <NavLink
            to={route}
            className={({ isActive }: { isActive: boolean }) =>
              isActive ? 'menu-link menu-link--selected' : 'menu-link'
            }
            key={label}
            end
          >
            {label}
          </NavLink>
        ))}
        <button className="menu-btn" type="button" onClick={handleClickZenBtn}>
          Activer le mode zen
        </button>
      </nav>
    </header>
  );
};

Header.propTypes = {
  categories: PropTypes.arrayOf(
    PropTypes.shape({
      route: PropTypes.string.isRequired,
      label: PropTypes.string.isRequired,
    }).isRequired,
  ).isRequired,
};

export default Header;
